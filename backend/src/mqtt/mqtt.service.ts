import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from '../telemetry/telemetry.service';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  constructor(
    private configService: ConfigService,
    private telemetryService: TelemetryService
  ) {}

  onModuleInit() {
    this.connectToBroker();
  }

  private connectToBroker() {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');
    if (!brokerUrl) {
      this.logger.error('MQTT_BROKER_URL is not defined in the environment variables.');
      return;
    }

    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      this.logger.log(`Connected to MQTT broker at ${brokerUrl}`);
      
      // Subscribe to all telemetry topics
      this.client.subscribe('bems/+/+/current', (err) => {
        if (err) {
          this.logger.error('Failed to subscribe to topics', err);
        } else {
          this.logger.log('Subscribed to topics: bems/+/+/current');
        }
      });
    });

    this.client.on('message', (topic, payload) => {
      this.handleIncomingMessage(topic, payload.toString());
    });

    this.client.on('error', (err) => {
      this.logger.error('MQTT Connection Error', err);
    });
  }

  private handleIncomingMessage(topic: string, message: string) {
    // Expected topic: bems/buildingId/deviceId/current
    this.logger.log(`Received message on topic ${topic}: ${message}`);
    
    try {
      const parts = topic.split('/');
      const buildingId = parts[1];
      const deviceId = parts[2];
      const payload = JSON.parse(message);
      
      this.telemetryService.processTelemetry(buildingId, deviceId, payload);
    } catch (e) {
      this.logger.error(`Failed to parse MQTT payload: ${e.message}`);
    }
  }

  publish(topic: string, message: string) {
    if (this.client && this.client.connected) {
      this.client.publish(topic, message);
      this.logger.log(`Published to ${topic}`);
    } else {
      this.logger.error('Cannot publish. MQTT client is not connected.');
    }
  }
}
