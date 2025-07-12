import axios from "axios";
import useUserStore from "../stores/userStore";

export const authApi = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

// --- เพิ่มส่วน Interceptor ---
authApi.interceptors.request.use(
  (config) => {
    // ดึง token ล่าสุดจาก zustand store
    const token = useUserStore.getState().token;

    // ถ้ามี token, ให้เพิ่ม Authorization header เข้าไปในทุกๆ request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // ทำอะไรบางอย่างถ้า request มีปัญหา
    return Promise.reject(error);
  }
);
