import { contextBridge, ipcRenderer } from 'electron';

/**
 * Expose a safe, typed API to the renderer process via contextBridge.
 * The renderer accesses these via window.electronAPI
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // ========================
  // BLE Operations
  // ========================
  ble: {
    startScan: () => ipcRenderer.invoke('ble:scan-start'),
    stopScan: () => ipcRenderer.invoke('ble:scan-stop'),
    connect: (deviceId: string) => ipcRenderer.invoke('ble:connect', deviceId),
    disconnect: () => ipcRenderer.invoke('ble:disconnect'),
    provision: (payload: object) => ipcRenderer.invoke('ble:provision', payload),
    getDeviceInfo: (deviceId: string) => ipcRenderer.invoke('ble:device-info', deviceId),

    // Event listeners
    onDeviceFound: (callback: (device: any) => void) => {
      ipcRenderer.on('ble:device-found', (_event, device) => callback(device));
    },
    onStatusUpdate: (callback: (status: any) => void) => {
      ipcRenderer.on('ble:status', (_event, status) => callback(status));
    },
    onConnected: (callback: (info: any) => void) => {
      ipcRenderer.on('ble:connected', (_event, info) => callback(info));
    },
    onDisconnected: (callback: () => void) => {
      ipcRenderer.on('ble:disconnected', () => callback());
    },

    // Remove listeners
    removeAllListeners: () => {
      ipcRenderer.removeAllListeners('ble:device-found');
      ipcRenderer.removeAllListeners('ble:status');
      ipcRenderer.removeAllListeners('ble:connected');
      ipcRenderer.removeAllListeners('ble:disconnected');
    },
  },

  // ========================
  // Backend API Operations
  // ========================
  api: {
    login: (email: string, password: string) =>
      ipcRenderer.invoke('api:login', { email, password }),
    registerDevice: (macAddress: string, type: string, firmwareVersion?: string) =>
      ipcRenderer.invoke('api:register-device', { macAddress, type, firmwareVersion }),
    claimDevice: (deviceId: string) =>
      ipcRenderer.invoke('api:claim-device', { deviceId }),
    getDevices: () => ipcRenderer.invoke('api:get-devices'),
  },

  // ========================
  // Auth (protocol handler token)
  // ========================
  auth: {
    onTokenReceived: (callback: (data: { token: string }) => void) => {
      ipcRenderer.on('auth:token-received', (_event, data) => callback(data));
    },
  },

  // ========================
  // App Info
  // ========================
  app: {
    getVersion: () => ipcRenderer.invoke('app:get-version'),
    openExternal: (url: string) => ipcRenderer.invoke('app:open-external', url),
  },
});
