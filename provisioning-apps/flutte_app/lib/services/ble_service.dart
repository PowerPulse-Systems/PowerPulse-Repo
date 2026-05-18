import 'dart:convert';
import 'dart:async';
import 'dart:typed_data';
import '../models/device.dart';
import 'package:universal_ble/universal_ble.dart';

class BleService {
  static const String provisionServiceUuid = "12345678-1234-1234-1234-123456789abc";
  static const String provisionWriteUuid = "12345678-1234-1234-1234-123456789abd";
  static const String provisionStatusUuid = "12345678-1234-1234-1234-123456789abe";
  static const String provisionInfoUuid = "12345678-1234-1234-1234-123456789abf";

  final StreamController<List<DeviceModel>> _scanController = StreamController<List<DeviceModel>>.broadcast();
  final StreamController<String> _statusController = StreamController<String>.broadcast();
  final StreamController<AvailabilityState> _bluetoothStateController = StreamController<AvailabilityState>.broadcast();
  
  Stream<List<DeviceModel>> get scanResults => _scanController.stream;
  Stream<String> get statusUpdates => _statusController.stream;
  Stream<AvailabilityState> get bluetoothState => _bluetoothStateController.stream;

  BleService() {
    UniversalBle.onAvailabilityChange = (AvailabilityState state) {
      _bluetoothStateController.add(state);
    };
  }

  Future<AvailabilityState> getBluetoothState() async {
    return await UniversalBle.getBluetoothAvailabilityState();
  }

  List<DeviceModel> _scannedDevices = [];
  String? _connectedDeviceId;

  // --- Real Scanning Implementation ---

  Future<void> startScan() async {
    _scannedDevices.clear();
    _scanController.add(_scannedDevices);

    // Listen for incoming BLE devices
    UniversalBle.onScanResult = (BleDevice result) {
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
      _connectedDeviceId = deviceId;
      
      // Discover services
      await UniversalBle.discoverServices(deviceId);
      
      // Setup notification listener
      UniversalBle.onValueChange = (String id, String characteristicId, Uint8List value, int? transactionId) {
        if (characteristicId == provisionStatusUuid || characteristicId == provisionStatusUuid.toUpperCase()) {
          final status = utf8.decode(value);
          _statusController.add(status);
        }
      };
      
      // Subscribe to status characteristic
      await UniversalBle.setNotifiable(deviceId, provisionServiceUuid, provisionStatusUuid, BleInputProperty.notification);
      
      return true;
    } catch (e) {
      print('Connection failed: $e');
      _connectedDeviceId = null;
      return false;
    }
  }

  Future<Map<String, dynamic>?> readDeviceInfo() async {
    if (_connectedDeviceId == null) return null;
    
    try {
      final value = await UniversalBle.readValue(_connectedDeviceId!, provisionServiceUuid, provisionInfoUuid);
      final jsonString = utf8.decode(value);
      return jsonDecode(jsonString) as Map<String, dynamic>;
    } catch (e) {
      print('Failed to read device info: $e');
      return null;
    }
  }

  Future<void> provision(Map<String, dynamic> payload) async {
    if (_connectedDeviceId == null) {
      throw Exception('Not connected to a device');
    }
    
    try {
      final jsonString = jsonEncode(payload);
      final data = Uint8List.fromList(utf8.encode(jsonString));
      
      await UniversalBle.writeValue(
        _connectedDeviceId!, 
        provisionServiceUuid, 
        provisionWriteUuid, 
        data, 
        BleOutputProperty.withResponse
      );
    } catch (e) {
      print('Failed to send provision data: $e');
      _statusController.add('MQTT_FAILED'); // Treat write error as failure to provision
      rethrow;
    }
  }

  void dispose() {
    _scanController.close();
    _statusController.close();
    UniversalBle.onValueChange = null;
    if (_connectedDeviceId != null) {
      UniversalBle.disconnect(_connectedDeviceId!);
    }
  }
}
