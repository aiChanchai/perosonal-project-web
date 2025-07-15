import axios from "axios";
import useUserStore from "../stores/userStore";

const userApi = axios.create({
  baseURL: "http://localhost:8000/api/admin/", // สมมติว่า endpoint คือ /api/users
});

userApi.interceptors.request.use(
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

export const getAllUsers = () => userApi.get("/users");

export const searchUsersByEmail = (email) => {
  // ส่งอีเมลไปเป็น query parameter เช่น /api/users/search?email=...
  return userApi.get("/search/", { params: { email } });
};

export const updateUser = (userId, data) => {
  return userApi.patch(`/users/${userId}`, data);
};

export const deleteUser = (userId) => {
  return userApi.delete(`/users/${userId}`);
};
