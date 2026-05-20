import { Body, Controller, Get, Post } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

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
}
