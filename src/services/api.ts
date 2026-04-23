import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://hackathon-backend-8q4b.onrender.com";
const TOKEN_KEY = "evnova-token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (status === 401) {
      tokenStorage.clear();
      localStorage.removeItem("evnova-user");
    }

    return Promise.reject(new Error(message));
  }
);

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string | null;
};

export const unwrap = <T>(payload: ApiEnvelope<T> | T): T => {
  if (payload && typeof payload === "object" && "success" in (payload as ApiEnvelope<T>)) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

