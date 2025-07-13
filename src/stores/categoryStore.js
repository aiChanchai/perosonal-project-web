import { create } from "zustand";
import { getAllCategories } from "../api/categoryApi";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,

  // Action สำหรับดึงข้อมูล Category ทั้งหมดมาเก็บไว้ใน Store
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const resp = await getAllCategories();
      set({ categories: resp.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
