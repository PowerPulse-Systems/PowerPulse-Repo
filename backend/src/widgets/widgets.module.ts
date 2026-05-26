import { Module } from '@nestjs/common';
import { WidgetsController } from './widgets.controller';
import { WidgetsService } from './widgets.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TelemetryModule } from '../telemetry/telemetry.module';

@Module({
  imports: [PrismaModule, TelemetryModule],
  controllers: [WidgetsController],
  providers: [WidgetsService],
})
export class WidgetsModule {}
