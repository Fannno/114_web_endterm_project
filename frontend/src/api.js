import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:5500';
const api = axios.create({
  baseURL: `${base}/api`
});

export default api;