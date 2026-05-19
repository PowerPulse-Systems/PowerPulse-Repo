import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);

  constructor(private prisma: PrismaService) {}

  async processTelemetry(buildingId: string, deviceId: string, payload: any) {
    try {
      // Find the breaker connected to this device, or we can just assume device level for now
      // The guide suggests topic: bems/building1/node3/current or bems/building1/breaker5/current
      // We will look up a breaker or device based on the ID.
      
      this.logger.log(`Processing telemetry for ${deviceId}:`, payload);
      
      // We need to map the incoming node ID to a Breaker to store the EnergyReading properly.
      const device = await this.prisma.device.findUnique({
        where: { macAddress: deviceId },
        include: { breakers: true }
      });

      if (!device) {
         this.logger.warn(`Device ${deviceId} not found in DB`);
         return;
      }

      if (device.breakers.length === 0) {
         this.logger.warn(`Device ${deviceId} has no attached breakers`);
         return;
      }
      
      const breaker = device.breakers[0]; // Assuming 1-to-1 for simplicity, can be expanded

      // Map the recommended telemetry payload to the EnergyReading table
      if (payload.energy_wh !== undefined) {
        await this.prisma.energyReading.create({
          data: {
            breakerId: breaker.id,
            periodStart: payload.period_start || Math.floor(Date.now() / 1000) - 60,
            periodEnd: payload.period_end || Math.floor(Date.now() / 1000),
            energyWh: payload.energy_wh,
            avgPowerW: payload.avg_power_w || 0,
            peakPowerW: payload.peak_power_w || 0,
          }
        });
        
        this.logger.log(`Saved energy reading for ${device.macAddress} / breaker ${breaker.id}`);
      }
      
      if (payload.event) {
         this.logger.warn(`Device ${device.macAddress} reported EVENT: ${payload.event}`);
         // TODO: Alert logic
      }
    } catch (error) {
      this.logger.error(`Error processing telemetry: ${(error as Error).message}`);
    }
  }

  async processDeviceTelemetry(macAddress: string, payload: any) {
    try {
      this.logger.log(`Processing ESP telemetry for ${macAddress}:`, payload);
      
      const device = await this.prisma.device.findUnique({
        where: { macAddress: macAddress },
        include: { breakers: true }
      });

      if (!device) {
         this.logger.warn(`Device ${macAddress} not found in DB`);
         return;
      }

      if (device.breakers.length === 0) {
         this.logger.warn(`Device ${macAddress} has no attached breakers`);
         return;
      }

      const currentTimeUnix = Math.floor(Date.now() / 1000);
      const startTimeUnix = currentTimeUnix - 60; // Represents the 1-minute window

      // Handle array of breakers from structured JSON format
      if (Array.isArray(payload.breakers)) {
         for (const b of payload.breakers) {
           // Match structured breaker info to DB breaker using a label, pin, or index
           // For simplicity, we just grab by index if hardwarePin matches (if not we fallback)
           const breakerRecord = device.breakers.find(db => db.hardwarePin?.toString() === b.id?.toString()) || device.breakers[0];

           if (b.energy_kwh !== undefined) {
             const energyWh = b.energy_kwh * 1000;
             await this.prisma.energyReading.create({
               data: {
                 breakerId: breakerRecord.id,
                 periodStart: startTimeUnix,
                 periodEnd: currentTimeUnix,
                 energyWh: energyWh,
                 avgPowerW: b.avg_power_w || 0,
                 peakPowerW: b.peak_power_w || 0,
               }
             });
           }
         }
         this.logger.log(`Saved structured minute-wise ESP energy reading for ${macAddress}`);
      } 
      // Handle simple legacy payload { energy_kwh: X }
      else if (payload.energy_kwh !== undefined) {
        const breaker = device.breakers[0];
        const energyWh = payload.energy_kwh * 1000;

        await this.prisma.energyReading.create({
          data: {
            breakerId: breaker.id,
            periodStart: startTimeUnix,
            periodEnd: currentTimeUnix,
            energyWh: energyWh,
            avgPowerW: 0,
            peakPowerW: 0,
          }
        });
        
        this.logger.log(`Saved basic minute-wise ESP energy reading for ${macAddress} / breaker ${breaker.id}`);
      }
    } catch (error) {
      this.logger.error(`Error processing ESP telemetry: ${(error as Error).message}`);
    }
  }
}
