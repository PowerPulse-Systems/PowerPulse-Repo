const http = require('http');

const API_URL = 'http://localhost:3000';
const EMAIL = 'sthmudara@gmail.com';
const PASSWORD = 'password123'; // Assuming a default password for the demo, can be changed.

const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: node register_device.js <MAC_ADDRESS> [device_name]');
    console.error('Example: node register_device.js AA:BB:CC:DD:EE:FF "Test ESP32"');
    process.exit(1);
}

const macAddress = args[0];
const deviceName = args[1] || `Simulator ESP32 (${macAddress})`;

async function request(path, method, body, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${API_URL}${path}`);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function run() {
    try {
        console.log(`[1/3] Logging in as ${EMAIL}...`);
        let token;
        let userId;
        try {
            const loginRes = await request('/auth/login', 'POST', { email: EMAIL, password: PASSWORD });
            token = loginRes.access_token;
            userId = loginRes.user.id;
            console.log(`✅ Logged in successfully. User ID: ${userId}`);
        } catch (e) {
            console.log(`Login failed, attempting signup as ${EMAIL}...`);
            const signupRes = await request('/auth/signup', 'POST', { name: "Simulator User", email: EMAIL, password: PASSWORD });
            token = signupRes.access_token;
            userId = signupRes.user.id;
            console.log(`✅ Signed up and logged in successfully. User ID: ${userId}`);
        }

        console.log(`\n[2/3] Registering device with MAC: ${macAddress}...`);
        const registerRes = await request('/devices/register', 'POST', {
            macAddress: macAddress,
            type: 'breaker-node',
            name: deviceName,
            firmwareVersion: 'sim-1.0.0'
        }, token);
        
        const deviceId = registerRes.id;
        console.log(`✅ Device registered. Internal ID: ${deviceId}`);

        console.log(`\n[3/3] Claiming device for user...`);
        try {
           await request('/devices/claim', 'POST', { deviceId: deviceId }, token);
           console.log(`✅ Device successfully claimed!`);
        } catch (e) {
           if (e.message.includes('already claimed')) {
               console.log(`✅ Device is already claimed by you.`);
           } else {
               throw e;
           }
        }
        
        console.log(`\n🎉 Success! The device is now linked to your account.`);
        console.log(`You can now run the ESP32 simulator.`);

    } catch (e) {
        console.error(`\n❌ Error: ${e.message}`);
    }
}

run();
