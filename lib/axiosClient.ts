import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "", // أو leave empty for same origin /api
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// interceptor لإرفاق توكن لو لديك
axiosClient.interceptors.request.use((cfg) => {
  // مثال: cfg.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
  return cfg;
});

export default axiosClient;