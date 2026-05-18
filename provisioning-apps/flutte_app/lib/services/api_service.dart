import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  // Use .env for the backend URL
  static String get baseUrl => dotenv.env['API_URL'] ?? 'http://localhost:3000';

  Future<Map<String, dynamic>?> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', data['access_token']);
        return data;
      }
      return null; // Login failed
    } catch (e) {
      print('API Error: $e');
      return null;
    }
  }

  Future<String?> registerDevice(String macAddress, {String? name}) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      
      final response = await http.post(
        Uri.parse('$baseUrl/devices/register'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'macAddress': macAddress,
          'type': 'breaker-node',
          'name': name,
          'firmwareVersion': '1.0.0'
        }),
      );
      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['id']; // Return the actual database UUID
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  Future<bool> claimDevice(String deviceId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      
      final response = await http.post(
        Uri.parse('$baseUrl/devices/claim'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({'deviceId': deviceId}),
      );
      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  Future<bool> activateDevice(String deviceId) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      
      final response = await http.post(
        Uri.parse('$baseUrl/devices/$deviceId/activate'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );
      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}
