import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':deviceId')
  getDashboard(@Param('deviceId') deviceId: string) {
    return this.dashboardService.getDashboard(deviceId);
  }

  @Post(':deviceId')
  saveDashboard(
    @Param('deviceId') deviceId: string,
    @Body('widgets') widgets: any[]
  ) {
    return this.dashboardService.saveDashboard(deviceId, widgets);
  }
}
