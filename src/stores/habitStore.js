import { create } from "zustand";
import useUserStore from "./userStore";
import {
  createHabit,
  deleteHabit,
  getAllHabits,
  updateHabit,
} from "../api/habitsApi";
import { getHabitsByCategoryId } from "../api/categoryApi";

const useHabitStore = create((set, get) => ({
  habits: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    try {
      const token = useUserStore.getState();
      const resp = await getAllHabits(token);
      set({ habits: resp.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch habits:", error);
      set({ loading: false });
    }
  },

  addHabit: async (data) => {
    try {
      // const token = useUserStore.getState().token;
      await createHabit(data);
      await get().fetchHabits();
    } catch (error) {
      console.error("Failed to add habit");
      throw error;
    }
  },

  updateHabit: async (habitId, updatedData) => {
    try {
      // const token = useUserStore.getState().token;
      const resp = await updateHabit(habitId, updatedData);
      set((state) => ({
        habits: state.habits.map((habit) =>
          habit.id === habitId ? resp.data : habit
        ),
      }));
    } catch (error) {
      console.error("Failed to update habit", error);
      throw error;
    }
  },
  deleteHabit: async (habitId) => {
    try {
      // const token = useUserStore.getState().token;
      await deleteHabit(habitId);
      set((state) => ({
        habits: state.habits.filter((h) => h.id !== habitId),
      }));
    } catch (error) {
      console.error("Failed to delete habit:", error);
      throw error;
    }
  },

  fetchHabitsByCategory: async (categoryId) => {
    set({ loading: true });
    try {
      const resp = await getHabitsByCategoryId(categoryId);
      set({ habits: resp.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch habits by category:", error);
      // --- ส่วนแก้ไขที่สำคัญที่สุด ---
      // เมื่อเกิด Error ให้หยุด Loading และเคลียร์ข้อมูล Habits ที่แสดงอยู่
      set({ habits: [], loading: false });
    }
  },
}));

export default useHabitStore;
