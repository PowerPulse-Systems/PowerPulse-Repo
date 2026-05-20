import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private deviceCache = new Map<string, any>();
  private latestHttpReading: {
    deviceId: string;
    current: number;
    voltage: number;
    power: number;
    receivedAt: string;
  } | null = null;

  constructor(private prisma: PrismaService) {}

  clearDeviceCache(macAddress: string) {
    this.deviceCache.delete(macAddress);
  }

  recordHttpReading(payload: { deviceId?: string; current: number; voltage: number }) {
    const current = Number(payload.current);
    const voltage = Number(payload.voltage);

    if (!Number.isFinite(current) || !Number.isFinite(voltage)) {
      throw new BadRequestException('current and voltage must be valid numbers');
    }

    this.latestHttpReading = {
      deviceId: payload.deviceId || 'hardcoded-esp',
      current,
      voltage,
      power: current * voltage,
      receivedAt: new Date().toISOString(),
    };

    this.logger.log(
      `HTTP telemetry: ${this.latestHttpReading.deviceId} ${voltage}V ${current}A ${this.latestHttpReading.power}W`,
    );

    return { success: true, data: this.latestHttpReading };
  }

  getLatestHttpReading() {
    return this.latestHttpReading;
  }

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
      // Check in-memory cache first to save DB queries
      let device = this.deviceCache.get(macAddress);
      
      if (!device) {
        device = await this.prisma.device.findUnique({
          where: { macAddress },
          include: { breakers: true }
        });
        
        if (!device) {
           this.logger.warn(`Device ${macAddress} not found in DB`);
           return;
        }
        this.deviceCache.set(macAddress, device);
      }

      const currentTimeUnix = Math.floor(Date.now() / 1000);
      const startTimeUnix = payload.period_start || (currentTimeUnix - 60); 
      const endTimeUnix = payload.period_end || currentTimeUnix;
      
      // Support nested payload "channels" or "breakers" array formats
      const channelArray = payload.channels || payload.breakers;

      if (Array.isArray(channelArray)) {
         let cacheUpdated = false;
         
         for (const channelData of channelArray) {
           const channelId = typeof channelData.id === 'string' ? parseInt(channelData.id, 10) : channelData.id;
           
           // Look up the auto-discovered channel explicitly
           let breakerRecord = device.breakers.find((db: any) => db.channelIndex === channelId);
           
           if (!breakerRecord) {
             // AUTO-CREATE DISCOVERY: The hardware sent a channel we don't have yet!
             // We need a generic panel to attach it to initially.
             let panel = await this.prisma.panel.findFirst();
             if (!panel) {
                const building = await this.prisma.building.create({ data: { name: 'Auto Building', address: 'System Generated' } });
                panel = await this.prisma.panel.create({ data: { name: 'Auto Panel', buildingId: building.id } });
             }
             
             breakerRecord = await this.prisma.breaker.create({
               data: {
                 label: `Channel ${channelId}`,
                 channelIndex: channelId,
                 deviceId: device.id,
                 panelId: panel.id
               }
             });
             
             device.breakers.push(breakerRecord);
             cacheUpdated = true;
           }

           // Prepare energy saving (checking different naming variations in JSON)
           let energyWh = channelData.energy_wh !== undefined ? channelData.energy_wh : (channelData.energy_kwh !== undefined ? channelData.energy_kwh * 1000 : 0);

           if (energyWh > 0 || channelData.energy_kwh !== undefined || channelData.energy_wh !== undefined) {
             await this.prisma.energyReading.create({
               data: {
                 breakerId: breakerRecord.id,
                 periodStart: startTimeUnix,
                 periodEnd: endTimeUnix,
                 energyWh: energyWh,
                 avgPowerW: channelData.avg_power_w || 0,
                 peakPowerW: channelData.peak_power_w || 0,
               }
             });
           }
         }
         
         // Update the cached device mapping and database counts if we added novel channels
         if (cacheUpdated) {
            await this.prisma.device.update({
              where: { id: device.id },
              data: { channelsCount: device.breakers.length }
            });
            this.deviceCache.set(macAddress, device);
         }
         
         this.logger.log(`Saved dynamic ESP energy reading array for ${macAddress}`);
      } 
      else if (payload.energy_kwh !== undefined) {
         // Fallback legacy (Single channel only output)
         let breakerRecord = device.breakers[0];
         if (!breakerRecord) {
             let panel = await this.prisma.panel.findFirst();
             breakerRecord = await this.prisma.breaker.create({
               data: {
                 label: `Channel 1`,
                 channelIndex: 1,
                 deviceId: device.id,
                 panelId: panel!.id
               }
             });
             device.breakers.push(breakerRecord);
             this.deviceCache.set(macAddress, device);
         }
         
         await this.prisma.energyReading.create({
           data: {
             breakerId: breakerRecord.id,
             periodStart: startTimeUnix,
             periodEnd: endTimeUnix,
             energyWh: payload.energy_kwh * 1000,
             avgPowerW: 0,
             peakPowerW: 0,
           }
         });
         this.logger.log(`Saved basic ESP energy reading for ${macAddress} / channel 1`);
      }
    } catch (error) {
       this.logger.error(`Error processing ESP telemetry: ${(error as Error).message}`);
    }
  }
}
