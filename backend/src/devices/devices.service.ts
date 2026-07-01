import { Injectable, NotFoundException, ConflictException, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DevicesService.name);
  private watchdogInterval: NodeJS.Timeout | null = null;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.logger.log('🚀 Starting Active Device Watchdog Checker (60s check)...');
    this.watchdogInterval = setInterval(async () => {
      await this.scanAndCleanStaleDevices();
    }, 60000);
  }

  onModuleDestroy() {
    if (this.watchdogInterval) {
      clearInterval(this.watchdogInterval);
    }
  }

  async scanAndCleanStaleDevices() {
    try {
      const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
      const result = await this.prisma.device.updateMany({
        where: {
          onlineStatus: true,
          OR: [
            { lastSeen: { lt: threeMinutesAgo } },
            { lastSeen: null }
          ]
        },
        data: {
          onlineStatus: false
        }
      });

      if (result.count > 0) {
        this.logger.log(`⚠️ Watchdog: Marked ${result.count} stale devices as OFFLINE`);
      }
    } catch (error) {
      this.logger.error(`Error in watchdog scan: ${(error as Error).message}`);
    }
  }

  /**
   * Register a new device (called during provisioning).
   * If the device already exists (by MAC), return the existing record.
   */
  async register(macAddress: string, type: string, name?: string, firmwareVersion?: string) {
    const normalizedMac = macAddress.replace(/:/g, '').toUpperCase();
    
    let existing = await this.prisma.device.findUnique({
      where: { macAddress: normalizedMac },
    });

    // Fallback: Check if it was registered with colons or lowercase
    if (!existing) {
      existing = await this.prisma.device.findFirst({
        where: {
          macAddress: { mode: 'insensitive', equals: macAddress }
        }
      });
      
      if (existing && existing.macAddress !== normalizedMac) {
        // Upgrade it to normalized
        existing = await this.prisma.device.update({
          where: { id: existing.id },
          data: { macAddress: normalizedMac }
        });
      }
    }

    if (existing) {
      this.logger.log(`Device ${macAddress} already registered, returning existing`);
      return existing;
    }

    const device = await this.prisma.device.create({
      data: {
        macAddress,
        type,
        name,
        firmwareVersion: firmwareVersion || null,
      },
    });

    this.logger.log(`Registered new device: ${macAddress} (${type})`);
    return device;
  }

  /**
   * Claim a device for a user (associate ownership).
   */
  async claim(deviceId: string, userId: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    if (device.userId && device.userId !== userId) {
      throw new ConflictException('Device is already claimed by another user');
    }

    const updated = await this.prisma.device.update({
      where: { id: deviceId },
      data: { userId },
    });

    this.logger.log(`Device ${deviceId} claimed by user ${userId}`);
    return updated;
  }

  /**
   * Get all devices owned by a user.
   */
  async getByUser(userId: string) {
    return this.prisma.device.findMany({
      where: { userId },
      include: { breakers: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single device by ID.
   */
  async getById(deviceId: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
      include: { breakers: true },
    });

    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    return device;
  }

  /**
   * Factory reset a device — clear ownership, mark offline.
   */
  async reset(deviceId: string, userId: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    if (device.userId !== userId) {
      throw new ConflictException('You do not own this device');
    }

    const updated = await this.prisma.device.update({
      where: { id: deviceId },
      data: {
        userId: null,
        onlineStatus: false,
      },
    });

    this.logger.log(`Device ${deviceId} reset by user ${userId}`);
    return updated;
  }

  /**
   * Delete a device from the database including its relations.
   */
  async delete(deviceId: string, userId: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
      include: { breakers: true },
    });

    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    if (device.userId !== userId) {
      throw new ConflictException('You do not own this device');
    }

    const dashboard = await this.prisma.dashboard.findUnique({
      where: { deviceId },
    });

    if (dashboard) {
      await this.prisma.widget.deleteMany({
        where: { dashboardId: dashboard.id },
      });
      await this.prisma.dashboard.delete({
        where: { id: dashboard.id },
      });
    }

    const breakerIds = device.breakers.map(b => b.id);
    if (breakerIds.length > 0) {
      await this.prisma.energyReading.deleteMany({
        where: { breakerId: { in: breakerIds } },
      });
      await this.prisma.breaker.deleteMany({
        where: { deviceId },
      });
    }

    await this.prisma.device.delete({
      where: { id: deviceId },
    });

    this.logger.log(`Device ${deviceId} fully deleted by user ${userId}`);
    return { success: true, message: 'Device deleted' };
  }

  /**
   * Update device online status (called from MQTT service).
   */
  async updateStatus(macAddress: string, online: boolean) {
    const normalizedMac = macAddress.replace(/:/g, '').toUpperCase();
    try {
      let device = await this.prisma.device.findUnique({ where: { macAddress: normalizedMac } });
      
      if (!device) {
         // Fallback for non-normalized mac
         device = await this.prisma.device.findFirst({
           where: { macAddress: { mode: 'insensitive', equals: macAddress } }
         });
      }
      
      if (device) {
        const updated = await this.prisma.device.update({
          where: { id: device.id },
          data: {
            macAddress: normalizedMac, // Ensure it's normalized
            onlineStatus: online,
            lastSeen: new Date(),
          },
        });
        this.logger.log(`Device ${normalizedMac} status → ${online ? 'ONLINE' : 'OFFLINE'}`);
        return updated;
      }
      
      this.logger.warn(`Could not update status for device ${normalizedMac}: not found`);
      return null;
    } catch (error) {
      this.logger.warn(`Could not update status for device ${macAddress}: not found`);
      return null;
    }
  }

  /**
   * Activate a device after provisioning is confirmed.
   * Called by the Flutter app after the ESP sends PROVISIONED.
   */
  async activate(deviceId: string, userId: string) {
    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    if (device.userId && device.userId !== userId) {
      throw new ConflictException('You do not own this device');
    }

    const updated = await this.prisma.device.update({
      where: { id: deviceId },
      data: {
        onlineStatus: true,
        lastSeen: new Date(),
      },
    });

    this.logger.log(`Device ${deviceId} activated by user ${userId}`);
    return updated;
  }

  /**
   * Add a breaker to a device
   */
  async addBreaker(deviceId: string, userId: string, label: string, phase?: string, channelIndex?: number) {
    const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
    if (!device) throw new NotFoundException(`Device not found`);
    if (device.userId !== userId) throw new ConflictException('You do not own this device');
    
    // Check if user has a default building/panel, if not create one
    let panel = await this.prisma.panel.findFirst({
        where: { building: { name: 'Default Building' } }
    });
    if (!panel) {
        const building = await this.prisma.building.create({
            data: { name: 'Default Building', address: 'Auto-generated' }
        });
        panel = await this.prisma.panel.create({
            data: { name: 'Default Panel', buildingId: building.id }
        });
    }

    const breaker = await this.prisma.breaker.create({
      data: {
        label,
        phase: phase || null,
        channelIndex: channelIndex !== undefined ? channelIndex : 1,
        deviceId,
        panelId: panel.id
      }
    });

    this.logger.log(`Added breaker ${breaker.id} to device ${deviceId}`);
    return breaker;
  }

  /**
   * Remove a breaker
   */
  async removeBreaker(deviceId: string, breakerId: string, userId: string) {
    const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
    if (!device) throw new NotFoundException(`Device not found`);
    if (device.userId !== userId) throw new ConflictException('You do not own this device');

    const breaker = await this.prisma.breaker.findUnique({ where: { id: breakerId } });
    if (!breaker || breaker.deviceId !== deviceId) throw new NotFoundException('Breaker not found on this device');

    await this.prisma.energyReading.deleteMany({ where: { breakerId } });
    await this.prisma.breaker.delete({ where: { id: breakerId } });
    
    this.logger.log(`Removed breaker ${breakerId} from device ${deviceId}`);
    return { success: true };
  }

  /**
   * Update a breaker
   */
  async updateBreaker(deviceId: string, breakerId: string, userId: string, label?: string, phase?: string) {
    const device = await this.prisma.device.findUnique({ where: { id: deviceId } });
    if (!device) throw new NotFoundException(`Device not found`);
    if (device.userId !== userId) throw new ConflictException('You do not own this device');

    const breaker = await this.prisma.breaker.findUnique({ where: { id: breakerId } });
    if (!breaker || breaker.deviceId !== deviceId) throw new NotFoundException('Breaker not found on this device');

    const updated = await this.prisma.breaker.update({
      where: { id: breakerId },
      data: {
        ...(label !== undefined ? { label } : {}),
        ...(phase !== undefined ? { phase } : {})
      }
    });

    this.logger.log(`Updated breaker ${breakerId} on device ${deviceId}`);
    return updated;
  }
}
