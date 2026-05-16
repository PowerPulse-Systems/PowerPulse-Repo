import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

/**
 * Backend API client for the provisioning app.
 * Handles authentication, device registration, and claiming.
 */
export class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    // Add auth token to all requests
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  async login(email: string, password: string) {
    try {
      const response = await this.client.post('/auth/login', { email, password });
      this.token = response.data.access_token;
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return { success: false, error: message };
    }
  }

  async registerDevice(macAddress: string, type: string, firmwareVersion?: string) {
    try {
      const response = await this.client.post('/devices/register', {
        macAddress,
        type,
        firmwareVersion,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return { success: false, error: message };
    }
  }

  async claimDevice(deviceId: string) {
    try {
      const response = await this.client.post('/devices/claim', { deviceId });
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Claim failed';
      return { success: false, error: message };
    }
  }

  async getDevices() {
    try {
      const response = await this.client.get('/devices');
      return { success: true, data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to get devices';
      return { success: false, error: message };
    }
  }
}
