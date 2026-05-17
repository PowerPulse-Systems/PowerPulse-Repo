import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    
    // Add Connection Pooling and Keep-Alive settings for Supabase
    const pool = new Pool({ 
      connectionString,
      max: 10, // Maximum number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection could not be established
      keepAlive: true, // Prevent connections from dropping silently
    });

    pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle PostgreSQL client', err);
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database is up and running');
    } catch (error) {
      this.logger.error('❌ CRITICAL: Database connection failed. Please ensure your database is running.', error);
      // Exit process to prevent running backend without a DB, and avoid exposing sensitive stack traces
      process.exit(1); 
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
