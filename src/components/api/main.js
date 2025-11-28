const fromEnv = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_BACKEND_URL) || null;
let API = fromEnv || "http://10.5.60.251:3000";
// Browsers cannot reach 0.0.0.0 — normalize to localhost for dev
// if (API.includes('0.0.0.0')) API = API.replace('0.0.0.0', 'localhost');

export default API
