import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../main.dart';
import '../models/device.dart';
import 'dart:async';

class ProvisioningPage extends StatefulWidget {
  final DeviceModel device;
  final String ssid;
  final String password;
  final VoidCallback onComplete;
  final VoidCallback onError;

  const ProvisioningPage({
    super.key,
    required this.device,
    required this.ssid,
    required this.password,
    required this.onComplete,
    required this.onError,
  });

  @override
  State<ProvisioningPage> createState() => _ProvisioningPageState();
}

class StepData {
  final String label;
  String status; // pending, active, done, error
  StepData(this.label, this.status);
}

class _ProvisioningPageState extends State<ProvisioningPage> {
  final List<StepData> _steps = [
    StepData('Sending configuration...', 'pending'),
    StepData('Connecting to WiFi...', 'pending'),
    StepData('Connecting to cloud...', 'pending'),
    StepData('Registering device...', 'pending'),
    StepData('Linking to account...', 'pending'),
  ];
  String? _errorMsg;
  StreamSubscription? _statusSub;

  @override
  void initState() {
    super.initState();
    _startProvisioning();
  }

  @override
  void dispose() {
    _statusSub?.cancel();
    super.dispose();
  }

  void _updateStep(int index, String status) {
    if (mounted) {
      setState(() {
        _steps[index].status = status;
      });
    }
  }

  Future<void> _startProvisioning() async {
    final state = context.read<AppState>();
    
    try {
      _updateStep(0, 'active');
      
      final payload = {
        'wifi_ssid': widget.ssid,
        'wifi_password': widget.password,
        'backend_url': 'http://localhost:3000',
        'device_id': widget.device.id,
      };

      _statusSub = state.ble.statusUpdates.listen((status) {
        if (status == 'RECEIVED') { _updateStep(0, 'done'); _updateStep(1, 'active'); }
        if (status == 'WIFI_CONNECTED') { _updateStep(1, 'done'); _updateStep(2, 'active'); }
        if (status == 'MQTT_CONNECTED') { _updateStep(2, 'done'); }
        if (status == 'WIFI_FAILED') { _updateStep(1, 'error'); setState(() => _errorMsg = 'WiFi failed'); }
        if (status == 'MQTT_FAILED') { _updateStep(2, 'error'); setState(() => _errorMsg = 'MQTT failed'); }
      });

      await state.ble.provision(payload);
      // Wait for MQTT step to be marked done visually
      await Future.delayed(const Duration(milliseconds: 500));

      if (_errorMsg != null) return;

      // Register step
      _updateStep(3, 'active');
      final dbDeviceId = await state.api.registerDevice(widget.device.mac);
      if (dbDeviceId == null) throw Exception('Registration failed');
      _updateStep(3, 'done');

      // Claim step
      _updateStep(4, 'active');
      final claimSuccess = await state.api.claimDevice(dbDeviceId);
      if (!claimSuccess) throw Exception('Claim failed');
      _updateStep(4, 'done');

      await Future.delayed(const Duration(milliseconds: 1000));
      if (mounted) widget.onComplete();

    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMsg = e.toString();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        child: Container(
          width: 500,
          margin: const EdgeInsets.all(24),
          child: Column(
            children: [
              const Text('Provisioning Device', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              Text('${widget.device.name} → ${widget.ssid}', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 14)),
              const SizedBox(height: 32),
  
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xCC0F172A),
                  border: Border.all(color: const Color(0xFF1E293B)),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  children: List.generate(_steps.length, (i) => _buildStepItem(_steps[i])),
                ),
              ),
  
              if (_errorMsg != null)
                Container(
                  margin: const EdgeInsets.only(top: 24),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0x1AEF4444),
                    border: Border.all(color: const Color(0x33EF4444)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      Text(_errorMsg!, style: const TextStyle(color: Color(0xFFF87171))),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: widget.onError,
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B)),
                        child: const Text('Start Over'),
                      )
                    ],
                  ),
                )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStepItem(StepData step) {
    final bool isActive = step.status == 'active';
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isActive ? const Color(0x0D3B82F6) : Colors.transparent,
        border: Border.all(color: isActive ? const Color(0x333B82F6) : Colors.transparent),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          SizedBox(width: 24, height: 24, child: _getIcon(step.status)),
          const SizedBox(width: 16),
          Text(
            step.label,
            style: TextStyle(
              fontSize: 14,
              color: step.status == 'done' ? const Color(0xFF34D399)
                  : step.status == 'error' ? const Color(0xFFF87171)
                  : isActive ? Colors.white : const Color(0xFF64748B),
            ),
          )
        ],
      ),
    );
  }

  Widget _getIcon(String status) {
    switch (status) {
      case 'done': return const Icon(Icons.check, color: Color(0xFF34D399), size: 20);
      case 'error': return const Icon(Icons.close, color: Color(0xFFF87171), size: 20);
      case 'active': return const CircularProgressIndicator(color: Color(0xFF60A5FA), strokeWidth: 2);
      default: return const Icon(Icons.radio_button_unchecked, color: Color(0xFF475569), size: 20);
    }
  }
}
