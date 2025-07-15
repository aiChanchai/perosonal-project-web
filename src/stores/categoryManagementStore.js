import { create } from "zustand";
import {
  getAllCategoriesAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
} from "../api/categoryAdminApi";

const useCategoryManagementStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  // ดึงข้อมูล Category ทั้งหมด
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await getAllCategoriesAdmin();
      set({ categories: resp.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch categories", loading: false });
    }
  },

  // เพิ่ม Category ใหม่
  addCategory: async (data) => {
    try {
      await createCategoryAdmin(data);
      await get().fetchCategories(); // ดึงข้อมูลใหม่หลังเพิ่มสำเร็จ
    } catch (err) {
      console.error("Failed to add category:", err);
      throw err; // โยน error ออกไปให้ component จัดการ
    }
  },

  // แก้ไข Category
  updateCategory: async (categoryId, data) => {
    try {
      await updateCategoryAdmin(categoryId, data);
      await get().fetchCategories();
    } catch (err) {
      console.error("Failed to update category:", err);
      throw err;
    }
  },

  // ลบ Category
  deleteCategory: async (categoryId) => {
    try {
      await deleteCategoryAdmin(categoryId);
      // ลบออกจาก state โดยตรงเพื่อการตอบสนองที่รวดเร็ว
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== categoryId),
      }));
    } catch (err) {
      console.error("Failed to delete category:", err);
      throw err;
    }
  },
}));

export default useCategoryManagementStore;
