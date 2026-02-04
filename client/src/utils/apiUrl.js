/**
 * Backend API base URL.
 * - Production (Vercel): use REACT_APP_API_URL.
 * - Local / same device: use localhost:5000.
 * - Mobile on same WiFi: use same hostname as the page (e.g. 192.168.1.5) with port 5000,
 *   so when you open http://192.168.1.5:3000 on phone, API = http://192.168.1.5:5000/api.
 */
export function getApiUrl() {
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:5000/api`;
  }
  return 'http://localhost:5000/api';
}
