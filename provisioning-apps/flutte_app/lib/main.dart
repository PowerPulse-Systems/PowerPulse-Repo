import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/api_service.dart';
import 'services/ble_service.dart';
import 'models/device.dart';

import 'pages/welcome.dart';
import 'pages/scan.dart';
import 'pages/configure.dart';
import 'pages/provisioning.dart';
import 'pages/success.dart';

// App State to hold data passed between screens
class AppState extends ChangeNotifier {
  final ApiService api = ApiService();
  final BleService ble = BleService();

  String? token;
  DeviceModel? selectedDevice;
  String wifiSsid = '';
  String wifiPassword = '';

  void setAuth(String newToken) {
    token = newToken;
    notifyListeners();
  }

  void setDevice(DeviceModel device) {
    selectedDevice = device;
    notifyListeners();
  }

  void setWifi(String ssid, String pass) {
    wifiSsid = ssid;
    wifiPassword = pass;
    notifyListeners();
  }

  void reset() {
    selectedDevice = null;
    wifiSsid = '';
    wifiPassword = '';
    notifyListeners();
  }

  void logout() {
    token = null;
    reset();
  }
}

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AppState(),
      child: const PowerPulseApp(),
    ),
  );
}

class PowerPulseApp extends StatelessWidget {
  const PowerPulseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PowerPulse Setup',
      themeMode: ThemeMode.dark, // Default to dark mode matching Tailwind slate-950
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF020617), // slate-950
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF3B82F6), // blue-500
          surface: Color(0xFF0F172A), // slate-900
        ),
        fontFamily: 'Inter',
        useMaterial3: true,
      ),
      home: const MainContainer(),
    );
  }
}

// Main container that holds the header, progress bar, and active page
class MainContainer extends StatefulWidget {
  const MainContainer({super.key});

  @override
  State<MainContainer> createState() => _MainContainerState();
}

class _MainContainerState extends State<MainContainer> {
  int _currentIndex = 0; // 0: Welcome, 1: Scan, 2: Configure, 3: Provisioning, 4: Success

  void _navigateTo(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppState>();
    
    // Page selection logic
    Widget activePage;
    switch (_currentIndex) {
      case 0:
        activePage = WelcomePage(onLogin: () => _navigateTo(1));
        break;
      case 1:
        activePage = ScanPage(onDeviceSelected: (device) {
          state.setDevice(device);
          _navigateTo(2);
        });
        break;
      case 2:
        activePage = ConfigurePage(
          device: state.selectedDevice!,
          onSubmit: (ssid, pass) {
            state.setWifi(ssid, pass);
            _navigateTo(3);
          },
          onBack: () => _navigateTo(1),
        );
        break;
      case 3:
        activePage = ProvisioningPage(
          device: state.selectedDevice!,
          ssid: state.wifiSsid,
          password: state.wifiPassword,
          onComplete: () => _navigateTo(4),
          onError: () {
            state.reset();
            _navigateTo(1); // Back to scan
          },
        );
        break;
      case 4:
        activePage = SuccessPage(
          device: state.selectedDevice!,
          onAddAnother: () {
            state.reset();
            _navigateTo(1);
          },
        );
        break;
      default:
        activePage = WelcomePage(onLogin: () => _navigateTo(1));
    }

    return Scaffold(
      body: Column(
        children: [
          _buildHeader(state.token != null),
          _buildProgressBar(),
          Expanded(child: activePage),
        ],
      ),
    );
  }

  Widget _buildHeader(bool isAuthenticated) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      decoration: const BoxDecoration(
        color: Color(0x800F172A), // slate-900/50
        border: Border(bottom: BorderSide(color: Color(0x991E293B))), // slate-800/60
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF3B82F6), Color(0xFF22D3EE)], // blue-500 to cyan-400
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: const [
                    BoxShadow(color: Color(0x333B82F6), blurRadius: 10, offset: Offset(0, 4))
                  ],
                ),
                alignment: Alignment.center,
                child: const Text('⚡', style: TextStyle(fontSize: 16)),
              ),
              const SizedBox(width: 12),
              const Text(
                'PowerPulse Setup',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.white),
              ),
            ],
          ),
          if (isAuthenticated)
            Row(
              children: [
                if (_currentIndex > 0 && _currentIndex < 4) // Show back on Scan, Configure, Provisioning
                  TextButton.icon(
                    onPressed: () {
                      if (_currentIndex == 3) {
                        // Special case: going back from provisioning shouldn't jump to configure if provisioning already started, but we'll let it happen
                        _navigateTo(2);
                      } else {
                        _navigateTo(_currentIndex - 1);
                      }
                    },
                    icon: const Icon(Icons.arrow_back, size: 16),
                    label: const Text('Back'),
                    style: TextButton.styleFrom(foregroundColor: const Color(0xFF94A3B8)),
                  ),
                const SizedBox(width: 8),
                TextButton.icon(
                  onPressed: () {
                    context.read<AppState>().logout();
                    _navigateTo(0);
                  },
                  icon: const Icon(Icons.logout, size: 16),
                  label: const Text('Logout'),
                  style: TextButton.styleFrom(foregroundColor: const Color(0xFFF87171)), // red-400
                ),
              ],
            )
        ],
      ),
    );
  }

  Widget _buildProgressBar() {
    final steps = ['Login', 'Scan', 'Configure', 'Provision', 'Done'];
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      color: const Color(0x4D0F172A), // slate-900/30
      child: Row(
        children: List.generate(steps.length, (index) {
          final isActive = index <= _currentIndex;
          final isCurrent = index == _currentIndex;
          return Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 2),
              child: Column(
                children: [
                  Container(
                    height: 6,
                    decoration: BoxDecoration(
                      color: isActive ? const Color(0xFF3B82F6) : const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(3),
                      boxShadow: isCurrent ? const [
                        BoxShadow(color: Color(0x803B82F6), blurRadius: 8)
                      ] : null,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    steps[index],
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w500,
                      color: isActive ? const Color(0xFF60A5FA) : const Color(0xFF475569),
                    ),
                  )
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
