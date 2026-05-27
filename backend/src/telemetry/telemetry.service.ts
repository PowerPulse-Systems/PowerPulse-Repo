import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LiveTelemetryGateway } from './live-telemetry.gateway';

/** In-memory representation of a single channel's live reading */
export interface LiveChannelReading {
  channelId: number;   // Global current channel ID (matches Breaker.channelIndex)
  voltageId: number;   // Voltage input ID this channel belongs to
  voltage: number;     // Voltage RMS (V)
  current: number;     // Current RMS (A)
  power: number;       // Active power (W)
}

/** In-memory live snapshot for a device */
export interface DeviceLiveSnapshot {
  macAddress: string;
  channels: LiveChannelReading[];
  receivedAt: number;  // Unix timestamp ms
}

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private deviceCache = new Map<string, any>();

  /** In-memory store of latest live readings per device MAC */
  private liveStore = new Map<string, DeviceLiveSnapshot>();

  private latestHttpReading: {
    deviceId: string;
    current: number;
    voltage: number;
    power: number;
    receivedAt: string;
  } | null = null;

  constructor(
    private prisma: PrismaService,
    private liveGateway: LiveTelemetryGateway,
  ) {}

  clearDeviceCache(macAddress: string) {
    this.deviceCache.delete(macAddress);
  }

  // ====================================================================
  // HTTP telemetry (legacy — kept for backward compatibility)
  // ====================================================================

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

  // ====================================================================
  // STREAM 1: Live Data (fast, in-memory only, pushed via WebSocket)
  // ====================================================================

  /**
   * Process a live telemetry packet from MQTT topic bems/<mac>/live.
   * Parses the voltage-grouped payload, stores in memory, and broadcasts via WebSocket.
   * Does NOT write to the database.
   */
  async processLiveData(macAddress: string, payload: any) {
    try {
      const channels: LiveChannelReading[] = [];

      if (Array.isArray(payload.voltage_channels)) {
        for (const vc of payload.voltage_channels) {
          const voltageId = vc.id;
          const voltage = vc.v || 0;

          if (Array.isArray(vc.ct)) {
            for (const ct of vc.ct) {
              channels.push({
                channelId: ct.id,
                voltageId,
                voltage,
                current: ct.i || 0,
                power: ct.p || 0,
              });
            }
          }
        }
      }

      // Store in memory
      const snapshot: DeviceLiveSnapshot = {
        macAddress,
        channels,
        receivedAt: Date.now(),
      };
      this.liveStore.set(macAddress, snapshot);

      // Broadcast to WebSocket clients in this device's room
      this.liveGateway.broadcastLiveData(macAddress, {
        voltage_channels: payload.voltage_channels,
        timestamp: Date.now(),
      });

      // Refresh device status (reuse cached device lookup)
      await this.refreshDeviceStatus(macAddress);

    } catch (error) {
      this.logger.error(`Error processing live telemetry: ${(error as Error).message}`);
    }
  }

  /**
   * Get the latest in-memory live reading for a specific device.
   * Used by the REST fallback endpoint.
   */
  getLiveData(macAddress: string): DeviceLiveSnapshot | null {
    return this.liveStore.get(macAddress) || null;
  }

  /**
   * Aggregate live power/voltage/current across specific breaker channel IDs.
   * Used by widgets.service.ts for real-time metric widgets.
   */
  async getLiveDataForBreakers(breakerIds: string[]): Promise<{ power: number; voltage: number; current: number }> {
    if (!breakerIds || breakerIds.length === 0) {
      return { power: 0, voltage: 0, current: 0 };
    }

    // Look up the channel indices for the requested breaker IDs
    const breakers = await this.prisma.breaker.findMany({
      where: { id: { in: breakerIds } },
      include: { device: { select: { macAddress: true } } },
    });

    let totalPower = 0;
    let totalCurrent = 0;
    let voltageSum = 0;
    let voltageCount = 0;

    for (const breaker of breakers) {
      const snapshot = this.liveStore.get(breaker.device.macAddress);
      if (!snapshot) continue;

      const channelReading = snapshot.channels.find(ch => ch.channelId === breaker.channelIndex);
      if (channelReading) {
        totalPower += channelReading.power;
        totalCurrent += channelReading.current;
        voltageSum += channelReading.voltage;
        voltageCount++;
      }
    }

    return {
      power: totalPower,
      current: totalCurrent,
      voltage: voltageCount > 0 ? voltageSum / voltageCount : 0,
    };
  }

  // ====================================================================
  // STREAM 2: Energy Data (stored in PostgreSQL)
  // ====================================================================

  /**
   * Process an energy accumulation packet from MQTT topic bems/<mac>/energy.
   * Parses the voltage-grouped payload, auto-discovers channels, and stores in PostgreSQL.
   */
  async processEnergyData(macAddress: string, payload: any) {
    try {
      let device = this.deviceCache.get(macAddress);

      if (!device) {
        device = await this.prisma.device.findUnique({
          where: { macAddress },
          include: { breakers: true },
        });

        if (!device) {
          this.logger.warn(`Device ${macAddress} not found in DB (energy)`);
          return;
        }
        this.deviceCache.set(macAddress, device);
      }

      const tsStart = payload.ts_start || (Math.floor(Date.now() / 1000) - 60);
      const tsEnd = payload.ts_end || Math.floor(Date.now() / 1000);

      let cacheUpdated = false;

      if (Array.isArray(payload.voltage_channels)) {
        for (const vc of payload.voltage_channels) {
          if (!Array.isArray(vc.ct)) continue;

          for (const ct of vc.ct) {
            const channelId = typeof ct.id === 'string' ? parseInt(ct.id, 10) : ct.id;

            // Find or auto-create breaker for this channel
            let breakerRecord = device.breakers.find((db: any) => db.channelIndex === channelId);

            if (!breakerRecord) {
              let panel = await this.prisma.panel.findFirst();
              if (!panel) {
                const building = await this.prisma.building.create({
                  data: { name: 'Auto Building', address: 'System Generated' },
                });
                panel = await this.prisma.panel.create({
                  data: { name: 'Auto Panel', buildingId: building.id },
                });
              }

              breakerRecord = await this.prisma.breaker.create({
                data: {
                  label: `Channel ${channelId}`,
                  channelIndex: channelId,
                  deviceId: device.id,
                  panelId: panel.id,
                },
              });

              device.breakers.push(breakerRecord);
              cacheUpdated = true;
            }

            // Store energy reading
            const energyWh = ct.energy_wh !== undefined
              ? ct.energy_wh
              : (ct.energy_kwh !== undefined ? ct.energy_kwh * 1000 : 0);

            if (energyWh > 0 || ct.energy_wh !== undefined) {
              await this.prisma.energyReading.create({
                data: {
                  breakerId: breakerRecord.id,
                  periodStart: tsStart,
                  periodEnd: tsEnd,
                  energyWh,
                  avgPowerW: ct.avg_power_w || 0,
                  peakPowerW: ct.peak_power_w || 0,
                },
              });
            }
          }
        }
      }

      if (cacheUpdated) {
        await this.prisma.device.update({
          where: { id: device.id },
          data: { channelsCount: device.breakers.length },
        });
        this.deviceCache.set(macAddress, device);
      }

      await this.refreshDeviceStatus(macAddress);
      this.logger.log(`Saved energy data for ${macAddress} (${payload.voltage_channels?.length || 0} voltage channels)`);

    } catch (error) {
      this.logger.error(`Error processing energy telemetry: ${(error as Error).message}`);
    }
  }

  // ====================================================================
  // Legacy handler (backward compatibility for bems/<mac>/telemetry)
  // ====================================================================

  async processTelemetry(buildingId: string, deviceId: string, payload: any) {
    try {
      this.logger.log(`Processing telemetry for ${deviceId}:`, payload);

      const device = await this.prisma.device.findUnique({
        where: { macAddress: deviceId },
        include: { breakers: true },
      });

      if (!device) {
        this.logger.warn(`Device ${deviceId} not found in DB`);
        return;
      }

      if (device.breakers.length === 0) {
        this.logger.warn(`Device ${deviceId} has no attached breakers`);
        return;
      }

      const breaker = device.breakers[0];

      if (payload.energy_wh !== undefined) {
        await this.prisma.energyReading.create({
          data: {
            breakerId: breaker.id,
            periodStart: payload.period_start || Math.floor(Date.now() / 1000) - 60,
            periodEnd: payload.period_end || Math.floor(Date.now() / 1000),
            energyWh: payload.energy_wh,
            avgPowerW: payload.avg_power_w || 0,
            peakPowerW: payload.peak_power_w || 0,
          },
        });

        this.logger.log(`Saved energy reading for ${device.macAddress} / breaker ${breaker.id}`);
      }

      if (payload.event) {
        this.logger.warn(`Device ${device.macAddress} reported EVENT: ${payload.event}`);
      }
    } catch (error) {
      this.logger.error(`Error processing telemetry: ${(error as Error).message}`);
    }
  }

  /**
   * Legacy handler for bems/<mac>/telemetry — routes to processEnergyData
   * if the payload contains voltage_channels, otherwise uses flat channel format.
   */
  async processDeviceTelemetry(macAddress: string, payload: any) {
    // If the payload uses the new voltage-grouped format, route to processEnergyData
    if (payload.voltage_channels) {
      return this.processEnergyData(macAddress, payload);
    }

    // Otherwise, handle the legacy flat channel format
    try {
      let device = this.deviceCache.get(macAddress);

      if (!device) {
        device = await this.prisma.device.findUnique({
          where: { macAddress },
          include: { breakers: true },
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

      const channelArray = payload.channels || payload.breakers;

      if (Array.isArray(channelArray)) {
        let cacheUpdated = false;

        for (const channelData of channelArray) {
          const channelId = typeof channelData.id === 'string' ? parseInt(channelData.id, 10) : channelData.id;

          let breakerRecord = device.breakers.find((db: any) => db.channelIndex === channelId);

          if (!breakerRecord) {
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
                panelId: panel.id,
              },
            });

            device.breakers.push(breakerRecord);
            cacheUpdated = true;
          }

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
              },
            });
          }
        }

        if (cacheUpdated) {
          await this.prisma.device.update({
            where: { id: device.id },
            data: { channelsCount: device.breakers.length },
          });
          this.deviceCache.set(macAddress, device);
        }

        this.logger.log(`Saved dynamic ESP energy reading array for ${macAddress}`);
      }
      else if (payload.energy_kwh !== undefined) {
        let breakerRecord = device.breakers[0];
        if (!breakerRecord) {
          let panel = await this.prisma.panel.findFirst();
          breakerRecord = await this.prisma.breaker.create({
            data: {
              label: `Channel 1`,
              channelIndex: 1,
              deviceId: device.id,
              panelId: panel!.id,
            },
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
          },
        });
        this.logger.log(`Saved basic ESP energy reading for ${macAddress} / channel 1`);
      }

      // Always update lastSeen & onlineStatus
      await this.refreshDeviceStatus(macAddress);

    } catch (error) {
      this.logger.error(`Error processing ESP telemetry: ${(error as Error).message}`);
    }
  }

  // ====================================================================
  // Shared Helpers
  // ====================================================================

  /**
   * Update device lastSeen and onlineStatus in both DB and cache.
   */
  private async refreshDeviceStatus(macAddress: string) {
    try {
      let device = this.deviceCache.get(macAddress);
      if (!device) {
        device = await this.prisma.device.findUnique({
          where: { macAddress },
          include: { breakers: true },
        });
        if (!device) return;
      }

      const updatedDevice = await this.prisma.device.update({
        where: { id: device.id },
        data: {
          onlineStatus: true,
          lastSeen: new Date(),
        },
        include: { breakers: true },
      });
      this.deviceCache.set(macAddress, updatedDevice);
    } catch (error) {
      this.logger.error(`Error refreshing device status for ${macAddress}: ${(error as Error).message}`);
    }
  }
}
