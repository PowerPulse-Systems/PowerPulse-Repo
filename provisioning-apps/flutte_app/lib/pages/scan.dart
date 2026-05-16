import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../main.dart'; // For AppState
import '../models/device.dart';

class ScanPage extends StatefulWidget {
  final Function(DeviceModel) onDeviceSelected;

  const ScanPage({super.key, required this.onDeviceSelected});

  @override
  State<ScanPage> createState() => _ScanPageState();
}

class _ScanPageState extends State<ScanPage> with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  bool _isScanning = false;
  String? _connectingTo;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(vsync: this, duration: const Duration(seconds: 2))..repeat();
    _startScan();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _startScan() {
    if (_isScanning) return;
    setState(() {
      _isScanning = true;
    });
    context.read<AppState>().ble.startScan();
  }

  Future<void> _stopScan() async {
    if (!_isScanning) return;
    setState(() {
      _isScanning = false;
    });
    await context.read<AppState>().ble.stopScan();
  }

  Future<void> _connect(DeviceModel device) async {
    setState(() {
      _connectingTo = device.id;
    });
    await _stopScan();
    
    final success = await context.read<AppState>().ble.connect(device.id);
    if (success && mounted) {
      widget.onDeviceSelected(device);
    }
    
    if (mounted) {
      setState(() {
        _connectingTo = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final ble = context.read<AppState>().ble;

    return Center(
      child: SingleChildScrollView(
        child: Container(
          width: 500,
          margin: const EdgeInsets.all(24),
          child: Column(
            children: [
              const Text('Scanning for Devices', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              const Text('Looking for PowerPulse devices in BLE range...', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14)),
              const SizedBox(height: 32),
  
              if (_isScanning) _buildRadar(),
              const SizedBox(height: 32),
  
              Container(
                constraints: const BoxConstraints(minHeight: 150, maxHeight: 300),
                child: StreamBuilder<List<DeviceModel>>(
                  stream: ble.scanResults,
                  builder: (context, snapshot) {
                    final devices = snapshot.data ?? [];
                    
                    if (!_isScanning && devices.isEmpty) {
                      return const Center(
                        child: Text('No devices found.\nMake sure your PowerPulse device is powered on.', textAlign: TextAlign.center, style: TextStyle(color: Color(0xFF64748B))),
                      );
                    }
  
                    return ListView.builder(
                      shrinkWrap: true,
                      itemCount: devices.length,
                      itemBuilder: (context, index) {
                        return _buildDeviceCard(devices[index]);
                      },
                    );
                  },
                ),
              ),
  
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _isScanning ? _stopScan : _startScan,
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isScanning ? const Color(0xFF1E293B) : const Color(0xFF2563EB),
                  foregroundColor: _isScanning ? const Color(0xFFCBD5E1) : Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text(_isScanning ? 'Stop Scanning' : 'Rescan'),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRadar() {
    return SizedBox(
      width: 96,
      height: 96,
      child: Stack(
        alignment: Alignment.center,
        children: [
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, child) {
              return Transform.scale(
                scale: 1.0 + (_pulseController.value * 0.5),
                child: Opacity(
                  opacity: 1.0 - _pulseController.value,
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: const Color(0x333B82F6), width: 2),
                    ),
                  ),
                ),
              );
            },
          ),
          const Icon(Icons.bluetooth_searching, color: Color(0xFF60A5FA), size: 32),
        ],
      ),
    );
  }

  Widget _buildDeviceCard(DeviceModel device) {
    final isConnecting = _connectingTo == device.id;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xCC0F172A),
        border: Border.all(color: const Color(0xFF1E293B)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: const Color(0x1A3B82F6),
              border: Border.all(color: const Color(0x333B82F6)),
              borderRadius: BorderRadius.circular(12),
            ),
            alignment: Alignment.center,
            child: const Text('📡', style: TextStyle(fontSize: 24)),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(device.name, style: const TextStyle(fontWeight: FontWeight.w600, color: Colors.white, fontSize: 16)),
                Text(device.mac, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontFamily: 'monospace')),
              ],
            ),
          ),
          const SizedBox(width: 16),
          ElevatedButton(
            onPressed: isConnecting ? null : () => _connect(device),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF2563EB),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            child: isConnecting 
              ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : const Text('Connect'),
          ),
        ],
      ),
    );
  }
}
