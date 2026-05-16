import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Health endpoint for database wake-ups and uptime tracking
  @Get('health')
  async healthCheck() {
    try {
      // Send a quick ping to the database
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', database: 'connected', timestamp: new Date().toISOString() };
    } catch (error: any) {
      throw new HttpException({
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
