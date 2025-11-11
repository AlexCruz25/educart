import axios from "axios";

const sanitizedEnvUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const baseURL =
  sanitizedEnvUrl ?? (import.meta.env.DEV ? "/api" : "");

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para añadir token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
