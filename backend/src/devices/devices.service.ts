import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Register a new device (called during provisioning).
   * If the device already exists (by MAC), return the existing record.
   */
  async register(macAddress: string, type: string, name?: string, firmwareVersion?: string) {
    const existing = await this.prisma.device.findUnique({
      where: { macAddress },
    });

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
   * Update device online status (called from MQTT service).
   */
  async updateStatus(macAddress: string, online: boolean) {
    try {
      const device = await this.prisma.device.update({
        where: { macAddress },
        data: {
          onlineStatus: online,
          lastSeen: new Date(),
        },
      });
      this.logger.log(`Device ${macAddress} status → ${online ? 'ONLINE' : 'OFFLINE'}`);
      return device;
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
}
