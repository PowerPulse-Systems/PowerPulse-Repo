import 'package:flutter/material.dart';
import '../models/device.dart';

class ConfigurePage extends StatefulWidget {
  final DeviceModel device;
  final Function(String ssid, String password) onSubmit;
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
  final _ssidController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _showPassword = false;

  @override
  void dispose() {
    _ssidController.dispose();
    _passwordController.dispose();
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
                            onPressed: _ssidController.text.isNotEmpty ? () => widget.onSubmit(_ssidController.text, _passwordController.text) : null,
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
