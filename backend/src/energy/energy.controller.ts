import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('energy')
@UseGuards(JwtAuthGuard)
export class EnergyController {
  constructor(private energyService: EnergyService) {}

  /**
   * Get energy summary for a breaker over a time period.
   * GET /energy/:breakerId/summary?hours=24
   */
  @Get(':breakerId/summary')
  getSummary(
    @Param('breakerId') breakerId: string,
    @Query('hours') hours: string,
  ) {
    return this.energyService.getSummary(breakerId, parseInt(hours) || 24);
  }
}
