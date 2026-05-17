import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WidgetsService {
  constructor(private prisma: PrismaService) {}

  async getWidgetValue(widgetConfig: any) {
    const { deviceId, metric, breakers, aggregation, timePreset } = widgetConfig;

    // Build the query where clause
    const where: any = {
      breaker: {
        deviceId: deviceId,
      }
    };

    if (breakers && breakers.length > 0) {
      where.breakerId = { in: breakers };
    }

    // Handle time constraints
    if (timePreset === 'today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      where.createdAt = { gte: startOfDay };
    } else if (timePreset === 'last_24_hours') {
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      where.createdAt = { gte: yesterday };
    }

    // Execute query based on metric
    if (metric === 'energy_usage') {
      const result = await this.prisma.energyReading.aggregate({
        _sum: {
          energyWh: true,
        },
        where,
      });
      return { value: result._sum.energyWh || 0, unit: 'Wh' };
    } 
    
    if (metric === 'current_load') {
      // For current load, we want the most recent records
      const latestLogs = await this.prisma.energyReading.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: breakers?.length || 1, // If specific breakers are selected, get latest for each. For now, just take a simple approach.
      });

      const totalPower = latestLogs.reduce((sum, log) => sum + log.avgPowerW, 0);
      return { value: totalPower || 0, unit: 'W' };
    }

    // Default fallback
    return { value: 0, unit: '' };
  }
}
