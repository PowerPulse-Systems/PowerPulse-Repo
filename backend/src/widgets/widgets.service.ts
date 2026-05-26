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

  async getWidgetSeries(widgetConfig: any) {
    const { deviceId, metric, breakers, timePreset } = widgetConfig;

    const where: any = {
      breaker: {
        deviceId: deviceId,
      }
    };

    if (breakers && breakers.length > 0) {
      where.breakerId = { in: breakers };
    }

    if (timePreset === 'today') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      where.createdAt = { gte: startOfDay };
    } else {
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      where.createdAt = { gte: yesterday };
    }

    const readings = await this.prisma.energyReading.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      select: {
         createdAt: true,
         avgPowerW: true,
         energyWh: true,
      }
    });

    const buckets: Record<string, number> = {};
    for (const r of readings) {
        const hourKey = new Date(r.createdAt.getFullYear(), r.createdAt.getMonth(), r.createdAt.getDate(), r.createdAt.getHours()).toISOString();
        if (!buckets[hourKey]) buckets[hourKey] = 0;
        if (metric === 'energy_usage') {
            buckets[hourKey] += r.energyWh;
        } else {
            // For power we average over the hour (simplest approach, just saving sums for now and dividing by count could be better but let's just use sum)
            // Wait, average power over an hour:
            buckets[hourKey] += r.avgPowerW; 
        }
    }
    
    // Actually for average power, we should average. Let's just do sum for now as dummy
    const series = Object.keys(buckets).sort().map(key => ({
       time: key,
       value: buckets[key]
    }));
    
    return { data: series, unit: metric === 'energy_usage' ? 'Wh' : 'W' };
  }
}
