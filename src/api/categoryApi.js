import axios from "axios";
import useUserStore from "../stores/userStore";

const categoryApi = axios.create({
  baseURL: "http://localhost:8000/api/categories",
});

// เพิ่ม Interceptor เพื่อแนบ Token ไปกับทุก Request โดยอัตโนมัติ
categoryApi.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ฟังก์ชันสำหรับดึงข้อมูล Category ทั้งหมด
export const getAllCategories = () => categoryApi.get("/");
