import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
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
  register(@Body() dto: { macAddress: string; type: string; name?: string; firmwareVersion?: string }) {
    return this.devicesService.register(dto.macAddress, dto.type, dto.name, dto.firmwareVersion);
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

  /**
   * Delete a device from the database entirely.
   * DELETE /devices/:id
   */
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    return this.devicesService.delete(id, req.user.userId);
  }

  /**
   * Activate a device after successful provisioning.
   * POST /devices/:id/activate
   */
  @Post(':id/activate')
  activate(@Param('id') id: string, @Request() req: any) {
    return this.devicesService.activate(id, req.user.userId);
  }

  /**
   * Add a breaker to a device.
   * POST /devices/:id/breakers
   */
  @Post(':id/breakers')
  addBreaker(@Param('id') id: string, @Body() dto: { label: string; phase?: string; channelIndex?: number }, @Request() req: any) {
    return this.devicesService.addBreaker(id, req.user.userId, dto.label, dto.phase, dto.channelIndex);
  }

  /**
   * Remove a breaker from a device.
   * DELETE /devices/:id/breakers/:breakerId
   */
  @Delete(':id/breakers/:breakerId')
  removeBreaker(@Param('id') id: string, @Param('breakerId') breakerId: string, @Request() req: any) {
    return this.devicesService.removeBreaker(id, breakerId, req.user.userId);
  }

  /**
   * Update a breaker on a device.
   * PATCH /devices/:id/breakers/:breakerId
   */
  @Post(':id/breakers/:breakerId')
  updateBreaker(@Param('id') id: string, @Param('breakerId') breakerId: string, @Body() dto: { label?: string; phase?: string }, @Request() req: any) {
    return this.devicesService.updateBreaker(id, breakerId, req.user.userId, dto.label, dto.phase);
  }
}
