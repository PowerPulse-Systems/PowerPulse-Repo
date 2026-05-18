import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Post('value')
  getWidgetValue(@Body() widgetConfig: any) {
    return this.widgetsService.getWidgetValue(widgetConfig);
  }
}
