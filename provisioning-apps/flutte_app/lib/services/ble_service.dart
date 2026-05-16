import 'dart:async';
import '../models/device.dart';
// Note: In a real app, you would import universal_ble here
// import 'package:universal_ble/universal_ble.dart';

class BleService {
  final StreamController<List<DeviceModel>> _scanController = StreamController<List<DeviceModel>>.broadcast();
  final StreamController<String> _statusController = StreamController<String>.broadcast();
  
  Stream<List<DeviceModel>> get scanResults => _scanController.stream;
  Stream<String> get statusUpdates => _statusController.stream;

  List<DeviceModel> _mockDevices = [];
  Timer? _scanTimer;

  // --- Simulated Implementation (matching the Electron mock) ---

  Future<void> startScan() async {
    _mockDevices.clear();
    _scanController.add(_mockDevices);

    // Simulate finding devices over time
    _scanTimer = Timer.periodic(const Duration(seconds: 2), (timer) {
      if (_mockDevices.isEmpty) {
        _mockDevices.add(DeviceModel(id: 'dev-1', name: 'PP-Setup-A1B2', mac: 'AA:BB:CC:DD:A1:B2', rssi: -42));
      } else if (_mockDevices.length == 1) {
        _mockDevices.add(DeviceModel(id: 'dev-2', name: 'PP-Setup-C3D4', mac: 'AA:BB:CC:DD:C3:D4', rssi: -58));
        timer.cancel();
      }
      _scanController.add(List.from(_mockDevices));
    });
  }

  Future<void> stopScan() async {
    _scanTimer?.cancel();
  }

  Future<bool> connect(String deviceId) async {
    // Simulate connection delay
    await Future.delayed(const Duration(milliseconds: 1500));
    return true;
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
    _scanTimer?.cancel();
  }
}
