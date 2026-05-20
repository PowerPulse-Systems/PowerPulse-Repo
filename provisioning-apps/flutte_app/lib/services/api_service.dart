import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiDebugEntry {
  final DateTime time;
  final String message;

  ApiDebugEntry(this.message) : time = DateTime.now();

  String get label {
    final hour = time.hour.toString().padLeft(2, '0');
    final minute = time.minute.toString().padLeft(2, '0');
    final second = time.second.toString().padLeft(2, '0');
    return '$hour:$minute:$second  $message';
  }
}

class ApiService {
  // Use .env for the backend URL
  static String get baseUrl => dotenv.env['API_URL'] ?? 'http://localhost:3000';
  final ValueNotifier<List<ApiDebugEntry>> debugLog = ValueNotifier([]);

  void clearDebugLog() {
    debugLog.value = [];
  }

  void _debug(String message) {
    debugPrint('[API] $message');
    final updated = [...debugLog.value, ApiDebugEntry(message)];
    debugLog.value = updated.length > 12
        ? updated.sublist(updated.length - 12)
        : updated;
  }

  String _shortBody(String body) {
    if (body.isEmpty) return '(empty body)';
    return body.length > 500 ? '${body.substring(0, 500)}...' : body;
  }

  String _tokenState(String? token) {
    if (token == null || token.isEmpty) return 'missing token';
    return 'token present (${token.length} chars)';
  }

  Future<Map<String, dynamic>?> login(String email, String password) async {
    try {
      final url = Uri.parse('$baseUrl/auth/login');
      _debug('POST $url');
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );
      _debug('login response ${response.statusCode}: ${_shortBody(response.body)}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', data['access_token']);
        return data;
      }
      return null; // Login failed
    } catch (e) {
      _debug('login error: $e');
      return null;
    }
  }

  Future<String?> registerDevice(String macAddress, {String? name}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      final url = Uri.parse('$baseUrl/devices/register');
      final payload = {
        'macAddress': macAddress,
        'type': 'breaker-node',
        'name': name,
        'firmwareVersion': '1.0.0'
      };
      _debug('POST $url (${_tokenState(token)}) body=${jsonEncode(payload)}');
      
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(payload),
      );
      _debug('register response ${response.statusCode}: ${_shortBody(response.body)}');
      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['id']; // Return the actual database UUID
      }
      return null;
    } catch (e) {
      _debug('register error: $e');
      return null;
    }
  }

  Future<bool> claimDevice(String deviceId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      final url = Uri.parse('$baseUrl/devices/claim');
      _debug('POST $url (${_tokenState(token)}) body={"deviceId":"$deviceId"}');
      
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({'deviceId': deviceId}),
      );
      _debug('claim response ${response.statusCode}: ${_shortBody(response.body)}');
      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      _debug('claim error: $e');
      return false;
    }
  }

  Future<bool> activateDevice(String deviceId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      final url = Uri.parse('$baseUrl/devices/$deviceId/activate');
      _debug('POST $url (${_tokenState(token)})');
      
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      _debug('activate response ${response.statusCode}: ${_shortBody(response.body)}');
      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      _debug('activate error: $e');
      return false;
    }
  }
}
