import axios from "axios";
import useUserStore from "../stores/userStore";

const categoryAdminApi = axios.create({
  baseURL: "http://localhost:8000/api/admin/categories",
});

categoryAdminApi.interceptors.request.use(
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

export const getAllCategoriesAdmin = () => categoryAdminApi.get("/");
export const createCategoryAdmin = (data) => categoryAdminApi.post("/", data);
export const updateCategoryAdmin = (categoryId, data) =>
  categoryAdminApi.patch(`/${categoryId}`, data);
export const deleteCategoryAdmin = (categoryId) =>
  categoryAdminApi.delete(`/${categoryId}`);
