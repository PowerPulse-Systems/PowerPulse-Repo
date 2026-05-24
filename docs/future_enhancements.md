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

## Removing the MQTT Debugger prior to Production Deployment

For development and local debugging purposes, a temporary in-memory MQTT message stream collector and debugger dashboard has been added to the codebase. Since it uses a wildcard subscription (`bems/#`) and stores data in the backend server's memory, this feature **MUST be completely removed** prior to staging or production deployment to ensure clean memory footprints and high security.

### Removal Checklist & Instructions:

#### 1. Backend Cleanup:
- **[mqtt.service.ts](file:///f:/Projects/CREATIVE%20DESIGN/2/backend/src/mqtt/mqtt.service.ts)**:
  - Delete `debugMessages` and `MAX_DEBUG_MESSAGES` variables.
  - Delete the `bems/#` wildcard subscription inside `connectToBroker()`.
  - Remove the developer buffering block in `handleIncomingMessage()`.
  - Remove `getDebugMessages()` and `clearDebugMessages()` methods.
- **[mqtt.controller.ts](file:///f:/Projects/CREATIVE%20DESIGN/2/backend/src/mqtt/mqtt.controller.ts)**:
  - Completely delete this file.
- **[mqtt.module.ts](file:///f:/Projects/CREATIVE%20DESIGN/2/backend/src/mqtt/mqtt.module.ts)**:
  - Remove references and imports to `MqttController` and remove it from the `controllers` array.

#### 2. Frontend Cleanup:
- **[api.ts](file:///f:/Projects/CREATIVE%20DESIGN/2/frontend/src/services/api.ts)**:
  - Remove `mqttDebugApi` endpoint exports at the bottom of the file.
- **[MqttDebugger.tsx](file:///f:/Projects/CREATIVE%20DESIGN/2/frontend/src/pages/MqttDebugger/MqttDebugger.tsx)**:
  - Completely delete this directory and all its files (including `MqttDebugger.tsx`).
- **[App.tsx](file:///f:/Projects/CREATIVE%20DESIGN/2/frontend/src/App.tsx)**:
  - Remove import of `MqttDebugger`.
  - Delete the route mapping for `/mqtt-debugger`.
- **[Sidebar.tsx](file:///f:/Projects/CREATIVE%20DESIGN/2/frontend/src/components/common/Sidebar.tsx)**:
  - Remove the `{ name: 'MQTT Debugger', path: '/mqtt-debugger', icon: Terminal }` entry in the `links` array.
  - Remove the `Terminal` icon import if no longer needed.
