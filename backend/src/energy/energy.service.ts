import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnergyService {
  constructor(private prisma: PrismaService) {}

  async getSummary(breakerId: string, hours: number) {
    const since = Math.floor(Date.now() / 1000) - (hours * 3600);
    const readings = await this.prisma.energyReading.findMany({
      where: {
        breakerId,
        periodStart: { gte: since }
      },
      orderBy: { periodStart: 'asc' }
    });

    const totalEnergy = readings.reduce((sum, r) => sum + r.energyWh, 0);
    const peakPower = readings.length > 0 ? Math.max(...readings.map(r => r.peakPowerW)) : 0;

    return { totalEnergy, peakPower, numberOfReadings: readings.length, readings };
  }
}
