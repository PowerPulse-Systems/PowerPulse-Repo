import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelemetryService } from '../telemetry/telemetry.service';

@Injectable()
export class WidgetsService {
  constructor(
    private prisma: PrismaService,
    private telemetryService: TelemetryService,
  ) {}

  async getWidgetValue(widgetConfig: any) {
    const { deviceId, metric, breakers, timePreset } = widgetConfig;

    // ================================================================
    // LIVE METRICS — served from in-memory store, no database query
    // ================================================================
    if (metric === 'power' || metric === 'current_load') {
      const liveData = await this.telemetryService.getLiveDataForBreakers(breakers || []);
      return { value: liveData.power || 0, unit: 'W' };
    }

    if (metric === 'voltage') {
      const liveData = await this.telemetryService.getLiveDataForBreakers(breakers || []);
      return { value: liveData.voltage || 0, unit: 'V' };
    }

    // ================================================================
    // HISTORICAL METRICS — served from PostgreSQL
    // ================================================================

    // Build the query where clause
    const where: any = {};

    if (breakers && breakers.length > 0) {
      where.breakerId = { in: breakers };
    } else if (deviceId) {
      where.breaker = { deviceId };
    }

    // Handle standardized time presets (using Unix timestamps mapped to periodStart)
    if (timePreset) {
      const nowUnix = Math.floor(Date.now() / 1000);
      let sinceUnix = nowUnix;
      
      switch (timePreset) {
        case '24h':
        case 'last_24_hours':
          sinceUnix = nowUnix - 24 * 3600;
          break;
        case '7d':
        case 'this_week':
          sinceUnix = nowUnix - 7 * 24 * 3600;
          break;
        case '30d':
        case 'this_month':
          sinceUnix = nowUnix - 30 * 24 * 3600;
          break;
        case '1y':
        case 'this_year':
          sinceUnix = nowUnix - 365 * 24 * 3600;
          break;
        case 'today':
          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0);
          sinceUnix = Math.floor(startOfDay.getTime() / 1000);
          break;
        default:
          sinceUnix = nowUnix - 24 * 3600; // default 24h
          break;
      }
      where.periodStart = { gte: sinceUnix };
    }

    // Execute query for energy_usage
    if (metric === 'energy_usage') {
      const result = await this.prisma.energyReading.aggregate({
        _sum: {
          energyWh: true,
        },
        where,
      });
      return { value: result._sum.energyWh || 0, unit: 'Wh' };
    }

    // Default fallback
    return { value: 0, unit: '' };
  }
}
