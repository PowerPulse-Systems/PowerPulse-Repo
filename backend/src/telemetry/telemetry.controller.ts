import { Body, Controller, Get, Param, Post, UseGuards, Req, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('telemetry')
export class TelemetryController {
  constructor(
    private readonly telemetryService: TelemetryService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Simple unauthenticated ESP endpoint for hardcoded HTTP testing.
   * POST /telemetry/http
   * Body: { "deviceId": "esp32-http-1", "current": 1.23, "voltage": 230.5 }
   */
  @Post('http')
  recordHttpTelemetry(
    @Body() dto: { deviceId?: string; current: number; voltage: number },
  ) {
    return this.telemetryService.recordHttpReading(dto);
  }

  /**
   * Returns the last HTTP telemetry packet received from the ESP.
   * GET /telemetry/latest
   */
  @Get('latest')
  getLatestHttpTelemetry() {
    return {
      data: this.telemetryService.getLatestHttpReading(),
    };
  }

  /**
   * Returns the latest in-memory live reading for a specific device.
   * GET /telemetry/live/:macAddress
   * Protected — only the device owner can access this.
   */
  @Get('live/:macAddress')
  @UseGuards(JwtAuthGuard)
  async getLiveTelemetry(
    @Param('macAddress') macAddress: string,
    @Req() req: any,
  ) {
    const userId = req.user.userId;

    // Verify device exists and belongs to this user
    const device = await this.prisma.device.findUnique({
      where: { macAddress },
    });

    if (!device) {
      throw new NotFoundException(`Device ${macAddress} not found`);
    }

    if (device.userId !== userId) {
      throw new ForbiddenException('You do not own this device');
    }

    const liveData = this.telemetryService.getLiveData(macAddress);

    return {
      data: liveData,
      stale: liveData ? (Date.now() - liveData.receivedAt > 10000) : true,
    };
  }
}
