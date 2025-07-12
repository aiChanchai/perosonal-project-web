import { create } from "zustand";
import useUserStore from "./userStore";
import {
  createHabit,
  deleteHabit,
  getHabits,
  updateHabit,
} from "../api/habitsApi";

const useHabitStore = create((set, get) => ({
  habits: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    try {
      const token = useUserStore.getState().token;
      const resp = await getHabits(token);
      set({ habits: resp.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch habits:", error);
      set({ loading: false });
    }
  },

  addHabit: async (data) => {
    try {
      const token = useUserStore.getState().token;
      const resp = await createHabit(data, token);
      set((state) => ({
        habits: [resp.data, ...state.habits],
      }));
    } catch (error) {
      console.error("Failed to add habit", error);
      throw error;
    }
  },

  updateHabit: async (getHabitById, data) => {
    try {
      const token = useUserStore.getState().token;
      const resp = await updateHabit(getHabitById, data, token);
      set((state) => ({
        habits: state.habits.map((h) => (h.id === habitId ? resp.data : h)),
      }));
    } catch (error) {
      console.error("Failed to update habit", error);
      throw error;
    }
  },
  deleteHabit: async (habitId) => {
    try {
      const token = useUserStore.getState().token;
      await deleteHabit(habitId, token);
      set((state) => ({
        habits: state.habits.filter((h) => h.id !== habitId),
      }));
    } catch (error) {
      console.error("Failed to delete habit:", error);
      throw error;
    }
  },
}));
