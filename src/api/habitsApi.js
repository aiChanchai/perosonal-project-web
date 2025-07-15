import axios from "axios";
import useUserStore from "../stores/userStore";

const habitsApi = axios.create({
  baseURL: "http://localhost:8000/api/habits",
});

// --- เพิ่มส่วน Interceptor ---
habitsApi.interceptors.request.use(
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

export const getAllHabits = () => habitsApi.get("/");

export const getHabitById = (habitId) => habitsApi.get(`/${habitId}`);

export const createHabit = (newHabitInfo) => habitsApi.post("/", newHabitInfo);

export const updateHabit = (habitId, updateInfo) =>
  habitsApi.patch(`/${habitId}`, updateInfo);

export const deleteHabit = (habitId) => habitsApi.delete(`/${habitId}`);

export const getHabitEntries = (habitId) =>
  habitsApi.get(`/${habitId}/entries`);

export const createHabitEntry = (habitId) =>
  habitsApi.post(`/${habitId}/entries`);

export const deleteTodayHabitEntry = (habitId) =>
  habitsApi.delete(`/${habitId}/entries`);
