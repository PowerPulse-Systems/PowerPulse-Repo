import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  /**
   * Register a new device from the provisioning app.
   * POST /devices/register
   */
  @Post('register')
  register(@Body() dto: { macAddress: string; type: string; firmwareVersion?: string }) {
    return this.devicesService.register(dto.macAddress, dto.type, dto.firmwareVersion);
  }

  /**
   * Claim a device for the authenticated user.
   * POST /devices/claim
   */
  @Post('claim')
  claim(@Body() dto: { deviceId: string }, @Request() req: any) {
    return this.devicesService.claim(dto.deviceId, req.user.userId);
  }

  /**
   * List all devices owned by the authenticated user.
   * GET /devices
   */
  @Get()
  getMyDevices(@Request() req: any) {
    return this.devicesService.getByUser(req.user.userId);
  }

  /**
   * Get a single device by ID.
   * GET /devices/:id
   */
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.devicesService.getById(id);
  }

  /**
   * Factory reset a device (clear ownership).
   * POST /devices/:id/reset
   */
  @Post(':id/reset')
  reset(@Param('id') id: string, @Request() req: any) {
    return this.devicesService.reset(id, req.user.userId);
  }
}
