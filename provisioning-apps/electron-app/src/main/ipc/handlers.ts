import { ipcMain, BrowserWindow, shell } from 'electron';
import { BleScanner } from '../ble/scanner';
import { ApiClient } from '../api/client';

let bleScanner: BleScanner;
let apiClient: ApiClient;

export function registerIpcHandlers(mainWindow: BrowserWindow) {
  bleScanner = new BleScanner(mainWindow);
  apiClient = new ApiClient();

  // ========================
  // BLE Handlers
  // ========================
  ipcMain.handle('ble:scan-start', async () => {
    return bleScanner.startScan();
  });

  ipcMain.handle('ble:scan-stop', async () => {
    return bleScanner.stopScan();
  });

  ipcMain.handle('ble:connect', async (_event, deviceId: string) => {
    return bleScanner.connectToDevice(deviceId);
  });

  ipcMain.handle('ble:disconnect', async () => {
    return bleScanner.disconnect();
  });

  ipcMain.handle('ble:provision', async (_event, payload: object) => {
    return bleScanner.sendProvisioningPayload(payload);
  });

  ipcMain.handle('ble:device-info', async (_event, deviceId: string) => {
    return bleScanner.getDeviceInfo(deviceId);
  });

  // ========================
  // API Handlers
  // ========================
  ipcMain.handle('api:login', async (_event, { email, password }) => {
    return apiClient.login(email, password);
  });

  ipcMain.handle('api:register-device', async (_event, { macAddress, type, firmwareVersion }) => {
    return apiClient.registerDevice(macAddress, type, firmwareVersion);
  });

  ipcMain.handle('api:claim-device', async (_event, { deviceId }) => {
    return apiClient.claimDevice(deviceId);
  });

  ipcMain.handle('api:get-devices', async () => {
    return apiClient.getDevices();
  });

  // ========================
  // App Handlers
  // ========================
  ipcMain.handle('app:get-version', () => {
    const { app } = require('electron');
    return app.getVersion();
  });

  ipcMain.handle('app:open-external', async (_event, url: string) => {
    await shell.openExternal(url);
  });
}
