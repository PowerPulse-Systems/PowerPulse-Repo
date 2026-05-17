import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (expired token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ========================
// Auth API
// ========================
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }),
};

// ========================
// Devices API
// ========================
export const devicesApi = {
  getMyDevices: () => api.get('/devices'),
  getDevice: (id: string) => api.get(`/devices/${id}`),
  registerDevice: (macAddress: string, type: string, firmwareVersion?: string) =>
    api.post('/devices/register', { macAddress, type, firmwareVersion }),
  claimDevice: (deviceId: string) =>
    api.post('/devices/claim', { deviceId }),
  resetDevice: (id: string) =>
    api.post(`/devices/${id}/reset`),
};

// ========================
// Energy API
// ========================
export const energyApi = {
  getSummary: (breakerId: string, hours: number = 24) =>
    api.get(`/energy/${breakerId}/summary`, { params: { hours } }),
};
