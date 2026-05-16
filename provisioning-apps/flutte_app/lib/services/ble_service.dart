import 'dart:async';
import '../models/device.dart';
import 'package:universal_ble/universal_ble.dart';

class BleService {
  final StreamController<List<DeviceModel>> _scanController = StreamController<List<DeviceModel>>.broadcast();
  final StreamController<String> _statusController = StreamController<String>.broadcast();
  
  Stream<List<DeviceModel>> get scanResults => _scanController.stream;
  Stream<String> get statusUpdates => _statusController.stream;

  List<DeviceModel> _scannedDevices = [];

  // --- Real Scanning Implementation ---

  Future<void> startScan() async {
    _scannedDevices.clear();
    _scanController.add(_scannedDevices);

    // Listen for incoming BLE devices
    UniversalBle.onScanResult = (BleScanResult result) {
      if (result.name != null && result.name!.isNotEmpty) {
        // You can filter by: if (result.name!.startsWith('PP-Setup'))
        final existingIndex = _scannedDevices.indexWhere((d) => d.id == result.deviceId);
        
        final device = DeviceModel(
          id: result.deviceId,
          name: result.name!,
          mac: result.deviceId, // On Windows, deviceId is the MAC address
          rssi: result.rssi ?? 0,
        );

        if (existingIndex >= 0) {
          _scannedDevices[existingIndex] = device;
        } else {
          _scannedDevices.add(device);
        }
        _scanController.add(List.from(_scannedDevices));
      }
    };

    // Begin hardware scan
    await UniversalBle.startScan();
  }

  Future<void> stopScan() async {
    await UniversalBle.stopScan();
  }

  Future<bool> connect(String deviceId) async {
    try {
      await UniversalBle.connect(deviceId);
      return true;
    } catch (e) {
      print('Connection failed: $e');
      return false;
    }
  }

  Future<void> provision(Map<String, dynamic> payload) async {
    // Simulate the provisioning steps sent from the ESP32 via BLE characteristics
    _statusController.add('RECEIVED');
    await Future.delayed(const Duration(milliseconds: 1500));
    
    _statusController.add('WIFI_CONNECTED');
    await Future.delayed(const Duration(milliseconds: 1500));
    
    _statusController.add('MQTT_CONNECTED');
  }

  void dispose() {
    _scanController.close();
    _statusController.close();
    UniversalBle.stopScan();
  }
}
