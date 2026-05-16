import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from '../telemetry/telemetry.service';
import { DevicesService } from '../devices/devices.service';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  constructor(
    private configService: ConfigService,
    private telemetryService: TelemetryService,
    private devicesService: DevicesService,
  ) {}

  onModuleInit() {
    this.connectToBroker();
  }

  private connectToBroker() {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');
    const username = this.configService.get<string>('MQTT_USERNAME');
    const password = this.configService.get<string>('MQTT_PASSWORD');

    if (!brokerUrl) {
      this.logger.error('MQTT_BROKER_URL is not defined in the environment variables.');
      return;
    }

    let isFirstConnect = true;
    let hasLoggedError = false;

    const options: mqtt.IClientOptions = {};
    if (username) options.username = username;
    if (password) options.password = password;
    
    // Using mqtts usually requires setting protocol properly, the URL schema (mqtts://) handles this mostly.

    this.client = mqtt.connect(brokerUrl, options);

    this.client.on('connect', () => {
      if (isFirstConnect) {
        this.logger.log('✅ MQTT Broker is up and running');
        isFirstConnect = false;
      } else {
        this.logger.log('✅ Reconnected to MQTT Broker');
      }
      hasLoggedError = false;
      
      // Subscribe to telemetry topics
      this.client.subscribe('bems/+/+/current', (err) => {
        if (err) {
          this.logger.error('Failed to subscribe to telemetry topics', err);
        } else {
          this.logger.log('Subscribed to topics: bems/+/+/current');
        }
      });

      // Subscribe to device status topics (connect/disconnect)
      this.client.subscribe('bems/+/status', (err) => {
        if (err) {
          this.logger.error('Failed to subscribe to status topics', err);
        } else {
          this.logger.log('Subscribed to topics: bems/+/status');
        }
      });

      // Subscribe to provisioning acknowledgment
      this.client.subscribe('bems/+/provisioning/ack', (err) => {
        if (err) {
          this.logger.error('Failed to subscribe to provisioning ack topics', err);
        } else {
          this.logger.log('Subscribed to topics: bems/+/provisioning/ack');
        }
      });
    });

    this.client.on('message', (topic, payload) => {
      this.handleIncomingMessage(topic, payload.toString());
    });

    this.client.on('error', (err) => {
      if (!hasLoggedError) {
        this.logger.error('❌ CRITICAL: MQTT Connection failed. Please check if your broker is running. Suppressing further error logs until reconnected.');
        hasLoggedError = true;
      }
    });
  }

  private handleIncomingMessage(topic: string, message: string) {
    this.logger.log(`Received message on topic ${topic}: ${message}`);
    
    try {
      const parts = topic.split('/');

      // Handle telemetry: bems/{buildingId}/{deviceId}/current
      if (parts.length === 4 && parts[3] === 'current') {
        const buildingId = parts[1];
        const deviceId = parts[2];
        const payload = JSON.parse(message);
        this.telemetryService.processTelemetry(buildingId, deviceId, payload);
        return;
      }

      // Handle device status: bems/{macAddress}/status
      if (parts.length === 3 && parts[2] === 'status') {
        const macAddress = parts[1];
        const payload = JSON.parse(message);
        const online = payload.status === 'online';
        this.devicesService.updateStatus(macAddress, online);
        return;
      }

      // Handle provisioning ack: bems/{macAddress}/provisioning/ack
      if (parts.length === 4 && parts[2] === 'provisioning' && parts[3] === 'ack') {
        const macAddress = parts[1];
        this.logger.log(`Provisioning acknowledged by device ${macAddress}`);
        this.devicesService.updateStatus(macAddress, true);
        return;
      }
    } catch (e) {
      this.logger.error(`Failed to parse MQTT payload: ${(e as Error).message}`);
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
