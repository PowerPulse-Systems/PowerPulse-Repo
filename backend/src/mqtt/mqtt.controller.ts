import { Controller, Get, Delete, UseGuards } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mqtt')
@UseGuards(JwtAuthGuard)
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  /**
   * Fetch captured MQTT messages.
   * GET /mqtt/messages
   */
  @Get('messages')
  getMessages() {
    return this.mqttService.getDebugMessages();
  }

  /**
   * Clear in-memory debug buffer.
   * DELETE /mqtt/messages
   */
  @Delete('messages')
  clearMessages() {
    this.mqttService.clearDebugMessages();
    return { success: true, message: 'In-memory MQTT buffer cleared successfully' };
  }
}
