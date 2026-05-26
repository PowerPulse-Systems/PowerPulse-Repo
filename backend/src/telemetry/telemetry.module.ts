import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { LiveTelemetryGateway } from './live-telemetry.gateway';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'supersecret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [TelemetryService, LiveTelemetryGateway],
  controllers: [TelemetryController],
  exports: [TelemetryService, LiveTelemetryGateway],
})
export class TelemetryModule {}
