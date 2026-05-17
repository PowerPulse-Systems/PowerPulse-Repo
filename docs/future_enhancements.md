# Future Enhancements

## Firmware Provisioning: Real-time WiFi Validation via BLE

Currently, during the BLE provisioning process, the ESP32 firmware executes the following flow:
1. The device receives the WiFi credentials (and other data) over BLE.
2. It immediately sends a "RECEIVED" status back to the provisioning app.
3. It passes those credentials over to the main program via a callback function.
4. The BLE server stays running (it doesn't automatically disconnect).
5. **Limitation:** It does not test the WiFi connection, nor does it tell the app if the password was incorrect.

**Proposed Enhancement:**
Update the firmware to test the WiFi connection *before* terminating the provisioning step. The logic should be handled inside the callback function in `main.cpp`. The ESP32 should attempt to connect to the provided WiFi network, and depending on the outcome, push a "WIFI_SUCCESS" or "WIFI_FAIL" status back to the provisioning app over the BLE connection. This allows the app to prompt the user to re-enter their password if they made a typo.
