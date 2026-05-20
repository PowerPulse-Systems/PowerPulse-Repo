import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../main.dart';
import '../models/device.dart';
import 'dart:async';

class ProvisioningPage extends StatefulWidget {
  final DeviceModel device;
  final String deviceName;
  final String ssid;
  final String password;
  final String mqttHost;
  final int mqttPort;
  final String mqttUser;
  final String mqttPass;
  final VoidCallback onComplete;
  final VoidCallback onError;

  const ProvisioningPage({
    super.key,
    required this.device,
    required this.deviceName,
    required this.ssid,
    required this.password,
    required this.mqttHost,
    required this.mqttPort,
    required this.mqttUser,
    required this.mqttPass,
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
    StepData('Connecting to MQTT...', 'pending'),
    StepData('Registering with backend...', 'pending'),
    StepData('Saving to device...', 'pending'),
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

  /// Wait for a specific BLE status string from the ESP, with a timeout.
  /// Returns true if the expected status was received, false on timeout.
  Future<bool> _waitForStatus(String expected, Duration timeout) async {
    final completer = Completer<bool>();
    StreamSubscription? sub;
    Timer? timer;

    final state = context.read<AppState>();

    sub = state.ble.statusUpdates.listen((status) {
      if (status == expected) {
        timer?.cancel();
        sub?.cancel();
        if (!completer.isCompleted) completer.complete(true);
      } else if (status.startsWith('ERROR') || status.endsWith('_FAILED')) {
        // Any failure status from ESP
        timer?.cancel();
        sub?.cancel();
        if (!completer.isCompleted) completer.complete(false);
      }
    });

    timer = Timer(timeout, () {
      sub?.cancel();
      if (!completer.isCompleted) completer.complete(false);
    });

    return completer.future;
  }

  Future<void> _rollbackAndFail(String errorMessage) async {
    final state = context.read<AppState>();
    
    // Tell ESP to discard credentials and return to provisioning mode
    try {
      await state.ble.sendCommand('ROLLBACK');
      // Wait briefly for ROLLBACK_OK
      await _waitForStatus('ROLLBACK_OK', const Duration(seconds: 5));
    } catch (_) {
      // Best effort — even if rollback command fails, still show the error
    }

    if (mounted) {
      setState(() {
        _errorMsg = errorMessage;
      });
    }
  }

  Future<void> _startProvisioning() async {
    final state = context.read<AppState>();
    state.api.clearDebugLog();
    
    try {
      // =======================================
      // Step 1: Send credentials to ESP via BLE
      // =======================================
      _updateStep(0, 'active');
      
      final backendUrl = dotenv.env['API_URL'] ?? 'http://localhost:3000';
      final payload = {
        'wifi_ssid': widget.ssid,
        'wifi_password': widget.password,
        'backend_url': backendUrl,
        'device_id': widget.device.id,
        'mqtt_host': widget.mqttHost,
        'mqtt_port': widget.mqttPort,
        'mqtt_username': widget.mqttUser,
        'mqtt_password': widget.mqttPass,
      };

      // Set up the listener BEFORE sending the data to avoid race conditions 
      final receivedFuture = _waitForStatus('RECEIVED', const Duration(seconds: 10));
      await state.ble.provision(payload);
      
      // Wait for RECEIVED acknowledgment
      final received = await receivedFuture;
      if (!received) {
        _updateStep(0, 'error');
        await _rollbackAndFail('ESP did not acknowledge the configuration payload.');
        return;
      }
      _updateStep(0, 'done');

      // =======================================
      // Step 2: Wait for WiFi connection on ESP
      // =======================================
      _updateStep(1, 'active');
      
      final wifiOk = await _waitForStatus('WIFI_CONNECTED', const Duration(seconds: 30));
      if (!wifiOk) {
        _updateStep(1, 'error');
        await _rollbackAndFail('ESP failed to connect to WiFi. Check SSID and password.');
        return;
      }
      _updateStep(1, 'done');

      // =======================================
      // Step 3: Wait for MQTT connection on ESP
      // =======================================
      _updateStep(2, 'active');
      
      final mqttOk = await _waitForStatus('MQTT_CONNECTED', const Duration(seconds: 30));
      if (!mqttOk) {
        _updateStep(2, 'error');
        await _rollbackAndFail('ESP failed to connect to MQTT broker. Check host and credentials.');
        return;
      }
      _updateStep(2, 'done');

      // =======================================
      // Step 4: Register + Claim device with backend
      // =======================================
      _updateStep(3, 'active');
      
      final dbDeviceId = await state.api.registerDevice(widget.device.mac, name: widget.deviceName);
      if (dbDeviceId == null) {
        _updateStep(3, 'error');
        await _rollbackAndFail('Backend rejected device registration. Please try again.');
        return;
      }

      final claimSuccess = await state.api.claimDevice(dbDeviceId);
      if (!claimSuccess) {
        _updateStep(3, 'error');
        await _rollbackAndFail('Failed to link device to your account.');
        return;
      }
      _updateStep(3, 'done');

      // =======================================
      // Step 5: Send COMMIT to ESP (save to NVS)
      // =======================================
      _updateStep(4, 'active');
      
      // Listen BEFORE sending the command to ensure we don't miss the BLE notification
      final provisionedFuture = _waitForStatus('PROVISIONED', const Duration(seconds: 15));
      await state.ble.sendCommand('COMMIT');
      
      final provisioned = await provisionedFuture;
      if (!provisioned) {
        _updateStep(4, 'error');
        setState(() {
          _errorMsg = 'ESP failed to save configuration. Try again.';
        });
        return;
      }
      _updateStep(4, 'done');

      // Final: Activate device in backend (non-critical)
      await state.api.activateDevice(dbDeviceId);

      // Done!
      await Future.delayed(const Duration(milliseconds: 1000));
      if (mounted) widget.onComplete();

    } catch (e) {
      // Unexpected error — rollback
      await _rollbackAndFail('Unexpected error: ${e.toString()}');
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
                      const SizedBox(height: 8),
                      const Text(
                        'The device has been rolled back to provisioning mode. You can try again.',
                        style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: widget.onError,
                        style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E293B)),
                        child: const Text('Start Over'),
                      )
                    ],
                  ),
                ),

              const SizedBox(height: 16),
              _buildDebugPanel(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDebugPanel(BuildContext context) {
    final state = context.read<AppState>();

    return ValueListenableBuilder(
      valueListenable: state.api.debugLog,
      builder: (context, entries, _) {
        if (entries.isEmpty) {
          return const SizedBox.shrink();
        }

        return Container(
          width: double.infinity,
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: const Color(0xCC020617),
            border: Border.all(color: const Color(0xFF334155)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'API Debug',
                style: TextStyle(
                  color: Color(0xFFCBD5E1),
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 10),
              ...entries.map((entry) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: SelectableText(
                      entry.label,
                      style: const TextStyle(
                        color: Color(0xFF94A3B8),
                        fontSize: 11,
                        fontFamily: 'monospace',
                        height: 1.3,
                      ),
                    ),
                  )),
            ],
          ),
        );
      },
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
