import 'package:flutter/material.dart';
import '../models/device.dart';

class SuccessPage extends StatefulWidget {
  final DeviceModel device;
  final VoidCallback onAddAnother;

  const SuccessPage({
    super.key,
    required this.device,
    required this.onAddAnother,
  });

  @override
  State<SuccessPage> createState() => _SuccessPageState();
}

class _SuccessPageState extends State<SuccessPage> with SingleTickerProviderStateMixin {
  late AnimationController _bounceController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _bounceController = AnimationController(vsync: this, duration: const Duration(milliseconds: 600));
    _scaleAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
      parent: _bounceController,
      curve: Curves.elasticOut,
    ));
    _bounceController.forward();
  }

  @override
  void dispose() {
    _bounceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 400,
        margin: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ScaleTransition(
              scale: _scaleAnimation,
              child: Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  color: const Color(0x1A10B981), // emerald-500/10
                  shape: BoxShape.circle,
                  border: Border.all(color: const Color(0xFF34D399), width: 2), // emerald-400
                ),
                child: const Icon(Icons.check, color: Color(0xFF34D399), size: 48),
              ),
            ),
            const SizedBox(height: 32),
            
            const Text('Device Provisioned!', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            const Text('Your PowerPulse device is connected and ready to monitor energy usage.', textAlign: TextAlign.center, style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14)),
            const SizedBox(height: 32),

            // Summary Card
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
                  const Text('DEVICE SUMMARY', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFFCBD5E1), letterSpacing: 1.2)),
                  const SizedBox(height: 16),
                  _buildSummaryRow('Device', widget.device.name, isMono: false),
                  const SizedBox(height: 12),
                  _buildSummaryRow('MAC Address', widget.device.mac, isMono: true),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Status', style: TextStyle(color: Color(0xFF64748B), fontSize: 14)),
                      Row(
                        children: [
                          Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFF34D399), shape: BoxShape.circle)),
                          const SizedBox(width: 4),
                          const Text('Online', style: TextStyle(color: Color(0xFF34D399), fontSize: 14, fontWeight: FontWeight.w500)),
                        ],
                      )
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 32),

            // Actions
            ElevatedButton(
              onPressed: () {
                // In a real app, use url_launcher to open the web dashboard
                // launchUrl(Uri.parse('http://localhost:5173/dashboard'));
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2563EB),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                minimumSize: const Size(double.infinity, 50),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('Open Dashboard →', style: TextStyle(fontWeight: FontWeight.w600)),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: widget.onAddAnother,
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                minimumSize: const Size(double.infinity, 50),
                side: const BorderSide(color: Color(0xFF334155)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                foregroundColor: const Color(0xFFCBD5E1),
              ),
              child: const Text('+ Add Another Device', style: TextStyle(fontWeight: FontWeight.w500)),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value, {required bool isMono}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 14)),
        Text(value, style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500, fontFamily: isMono ? 'monospace' : null)),
      ],
    );
  }
}
