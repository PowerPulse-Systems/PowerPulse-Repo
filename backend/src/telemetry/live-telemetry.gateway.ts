import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveTelemetryGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LiveTelemetryGateway.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  /**
   * Authenticate incoming WebSocket connections via JWT.
   * On success, auto-join the client to rooms for all their owned devices.
   */
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn(`WS client ${client.id} rejected — no token`);
        client.emit('error', { message: 'Authentication required' });
        client.disconnect();
        return;
      }

      const secret = this.configService.get<string>('JWT_SECRET') || 'supersecret';
      const payload = this.jwtService.verify(token, { secret });
      const userId = payload.sub;

      if (!userId) {
        client.disconnect();
        return;
      }

      // Store userId on socket for later use
      (client as any).userId = userId;

      // Auto-join rooms for all devices owned by this user
      const devices = await this.prisma.device.findMany({
        where: { userId },
        select: { macAddress: true },
      });

      for (const device of devices) {
        const room = `device:${device.macAddress}`;
        client.join(room);
      }

      this.logger.log(`WS client ${client.id} connected (user: ${userId}, ${devices.length} device rooms)`);
    } catch (err) {
      this.logger.warn(`WS client ${client.id} rejected — invalid token: ${(err as Error).message}`);
      client.emit('error', { message: 'Invalid token' });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`WS client ${client.id} disconnected`);
  }

  /**
   * Allow clients to subscribe to specific device rooms on demand.
   * Validates ownership before joining.
   */
  @SubscribeMessage('subscribe')
  async handleSubscribe(client: Socket, payload: { macAddresses: string[] }) {
    const userId = (client as any).userId;
    if (!userId || !payload?.macAddresses) return;

    for (const mac of payload.macAddresses) {
      // Verify ownership
      const device = await this.prisma.device.findFirst({
        where: { macAddress: mac, userId },
      });

      if (device) {
        client.join(`device:${mac}`);
      }
    }
  }

  /**
   * Broadcast live telemetry data to all clients in the device's room.
   * Called by TelemetryService when a live MQTT packet arrives.
   */
  broadcastLiveData(macAddress: string, data: any) {
    this.server.to(`device:${macAddress}`).emit('live:data', {
      mac: macAddress,
      ...data,
    });
  }
}
