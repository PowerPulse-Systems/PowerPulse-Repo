import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(deviceId: string) {
    let dashboard = await this.prisma.dashboard.findUnique({
      where: { deviceId },
      include: { widgets: true },
    });

    if (!dashboard) {
      // Create a default dashboard if one doesn't exist
      dashboard = await this.prisma.dashboard.create({
        data: {
          deviceId,
          widgets: {
            create: [
              {
                title: 'Total Energy',
                type: 'card',
                metric: 'energy_usage',
                breakers: [], // Empty means all breakers
                aggregation: 'sum',
                timePreset: 'today',
                position: 0,
                size: 'small',
              },
              {
                title: 'Current Load',
                type: 'card',
                metric: 'current_load',
                breakers: [],
                aggregation: 'sum',
                position: 1,
                size: 'small',
              }
            ]
          }
        },
        include: { widgets: true },
      });
    }

    return dashboard;
  }

  async saveDashboard(deviceId: string, widgets: any[]) {
    // 1. Get or create dashboard
    let dashboard = await this.prisma.dashboard.findUnique({
      where: { deviceId },
    });

    if (!dashboard) {
      dashboard = await this.prisma.dashboard.create({
        data: { deviceId },
      });
    }

    // 2. Delete existing widgets
    await this.prisma.widget.deleteMany({
      where: { dashboardId: dashboard.id },
    });

    // 3. Create new widgets
    if (widgets && widgets.length > 0) {
      await this.prisma.widget.createMany({
        data: widgets.map((w, index) => ({
          dashboardId: dashboard.id,
          title: w.title,
          type: w.type || 'card',
          metric: w.metric,
          breakers: w.breakers || [],
          aggregation: w.aggregation || 'sum',
          timePreset: w.timePreset,
          customHours: w.customHours,
          customStart: w.customStart ? new Date(w.customStart) : null,
          customEnd: w.customEnd ? new Date(w.customEnd) : null,
          size: w.size || 'small',
          position: w.position ?? index,
          config: w.config || {},
        })),
      });
    }

    return this.getDashboard(deviceId);
  }
}
