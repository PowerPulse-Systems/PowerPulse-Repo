import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/device.dart';
import '../main.dart';

import 'package:flutter_dotenv/flutter_dotenv.dart';

class ConfigurePage extends StatefulWidget {
  final DeviceModel device;
  final Function(String name, String ssid, String password, String mqttHost, int mqttPort, String mqttUser, String mqttPass) onSubmit;
  final VoidCallback onBack;

  const ConfigurePage({
    super.key,
    required this.device,
    required this.onSubmit,
    required this.onBack,
  });

  @override
  State<ConfigurePage> createState() => _ConfigurePageState();
}

class _ConfigurePageState extends State<ConfigurePage> {
  final _nameController = TextEditingController();
  final _ssidController = TextEditingController();
  final _passwordController = TextEditingController();
  final _mqttHostController = TextEditingController();
  final _mqttPortController = TextEditingController();
  final _mqttUserController = TextEditingController();
  final _mqttPassController = TextEditingController();
  
  bool _showPassword = false;
  bool _showMqtt = false;

  @override
  void initState() {
    super.initState();
    // Default device name to something sensible
    _nameController.text = '${widget.device.name} Device';
    
    // Pre-fill MQTT settings from .env
    _mqttHostController.text = dotenv.env['MQTT_HOST'] ?? '';
    _mqttPortController.text = dotenv.env['MQTT_PORT'] ?? '1883';
    _mqttUserController.text = dotenv.env['MQTT_USERNAME'] ?? '';
    _mqttPassController.text = dotenv.env['MQTT_PASSWORD'] ?? '';
  }

  @override
  void dispose() {
    _nameController.dispose();
    _ssidController.dispose();
    _passwordController.dispose();
    _mqttHostController.dispose();
    _mqttPortController.dispose();
    _mqttUserController.dispose();
    _mqttPassController.dispose();
    super.dispose();
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
              const Text('Configure Device', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 8),
              RichText(
                text: TextSpan(
                  style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 14),
                  children: [
                    const TextSpan(text: 'WiFi setup for '),
                    TextSpan(text: widget.device.name, style: const TextStyle(color: Color(0xFF60A5FA), fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Connection indicator
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0x0D10B981), // emerald-500/5
                  border: Border.all(color: const Color(0x3310B981)), // emerald-500/20
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 12,
                      height: 12,
                      decoration: const BoxDecoration(color: Color(0xFF34D399), shape: BoxShape.circle),
                    ),
                    const SizedBox(width: 12),
                    Text('Connected to ${widget.device.name}', style: const TextStyle(color: Color(0xFF34D399), fontSize: 14)),
                    const SizedBox(width: 8),
                    Text(widget.device.mac, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, fontFamily: 'monospace')),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Form
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xCC0F172A),
                  border: Border.all(color: const Color(0xFF1E293B)),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text('Device Identity', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 16),
                    const Text('Device Name', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                    const SizedBox(height: 4),
                    const Text("e.g. 'Building A Main Board', 'Lab 3 Panel', or 'Ground Floor DB'", style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _nameController,
                      style: const TextStyle(color: Colors.white),
                      decoration: _inputDecoration('Memorable name for this device'),
                      onChanged: (v) => setState(() {}),
                    ),
                    const SizedBox(height: 24),
                    const Divider(color: Color(0xFF1E293B)),
                    const SizedBox(height: 24),

                    const Text('WiFi Configuration', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 16),
                    const Text('WiFi SSID', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _ssidController,
                      style: const TextStyle(color: Colors.white),
                      decoration: _inputDecoration('Your WiFi network'),
                      onChanged: (v) => setState(() {}),
                    ),
                    const SizedBox(height: 16),
                    
                    const Text('WiFi Password', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _passwordController,
                      obscureText: !_showPassword,
                      style: const TextStyle(color: Colors.white),
                      decoration: _inputDecoration('••••••••').copyWith(
                        suffixIcon: IconButton(
                          icon: Text(_showPassword ? '🙈' : '👁️'),
                          onPressed: () => setState(() => _showPassword = !_showPassword),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Divider(color: Color(0xFF1E293B)),
                    const SizedBox(height: 8),

                    InkWell(
                      onTap: () => setState(() => _showMqtt = !_showMqtt),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          children: [
                            Text(_showMqtt ? '▼ Advanced (MQTT)' : '▶ Advanced (MQTT)', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ),
                    ),
                    
                    if (_showMqtt) ...[
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            flex: 2,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('MQTT Host', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                                const SizedBox(height: 8),
                                TextField(
                                  controller: _mqttHostController,
                                  style: const TextStyle(color: Colors.white),
                                  decoration: _inputDecoration('broker.hivemq.com'),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            flex: 1,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Port', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                                const SizedBox(height: 8),
                                TextField(
                                  controller: _mqttPortController,
                                  style: const TextStyle(color: Colors.white),
                                  decoration: _inputDecoration('1883'),
                                  keyboardType: TextInputType.number,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Username (Optional)', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                                const SizedBox(height: 8),
                                TextField(
                                  controller: _mqttUserController,
                                  style: const TextStyle(color: Colors.white),
                                  decoration: _inputDecoration('user'),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Password (Optional)', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14, fontWeight: FontWeight.w500)),
                                const SizedBox(height: 8),
                                TextField(
                                  controller: _mqttPassController,
                                  style: const TextStyle(color: Colors.white),
                                  obscureText: true,
                                  decoration: _inputDecoration('••••••••'),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                    
                    const SizedBox(height: 32),

                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton(
                            onPressed: widget.onBack,
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              side: const BorderSide(color: Color(0xFF334155)),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              foregroundColor: const Color(0xFFCBD5E1),
                            ),
                            child: const Text('← Back'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: (_ssidController.text.isNotEmpty && _nameController.text.isNotEmpty) ? () => widget.onSubmit(
                              _nameController.text,
                              _ssidController.text, 
                              _passwordController.text,
                              _mqttHostController.text,
                              int.tryParse(_mqttPortController.text) ?? 1883,
                              _mqttUserController.text,
                              _mqttPassController.text
                            ) : null,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF2563EB),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child: const Text('Start Provisioning →', style: TextStyle(fontWeight: FontWeight.w600)),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    TextButton.icon(
                      onPressed: () async {
                        final ble = context.read<AppState>().ble;
                        try {
                          await ble.provision({
                            'wifi_ssid': 'TEST_DEBUG_SSID',
                            'wifi_password': 'TEST_PASSWORD',
                            'backend_url': 'http://test.local',
                            'device_id': 'test-1234',
                            'mqtt_host': 'test.mosquitto.org',
                            'mqtt_port': 1883,
                            'mqtt_username': '',
                            'mqtt_password': ''
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Test payload sent! Check ESP serial monitor.', style: TextStyle(color: Colors.white)), backgroundColor: Color(0xFF10B981)),
                          );
                        } catch (e) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Failed to send test payload: $e', style: const TextStyle(color: Colors.white)), backgroundColor: const Color(0xFFEF4444)),
                          );
                        }
                      },
                      icon: const Icon(Icons.bug_report, size: 16),
                      label: const Text('Send Debug Test Payload'),
                      style: TextButton.styleFrom(foregroundColor: const Color(0xFFFBBF24)), // Amber color for debug
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String hint) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(color: Color(0xFF64748B)),
      filled: true,
      fillColor: const Color(0xCC1E293B),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0xFF334155))),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0xFF334155))),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: Color(0x803B82F6))),
    );
  }
}
