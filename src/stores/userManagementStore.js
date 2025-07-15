import { create } from "zustand";
// เพิ่มการ import searchUsersByEmail
import {
  deleteUser,
  getAllUsers,
  searchUsersByEmail,
  updateUser,
} from "../api/userApi";

const useUserManagementStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  // Action สำหรับดึงข้อมูล User ทั้งหมด
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await getAllUsers();
      set({ users: resp.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  searchUsers: async (email) => {
    set({ loading: true, error: null });
    try {
      const resp = await searchUsersByEmail(email);

      const searchResult = Array.isArray(resp.data) ? resp.data : [resp.data];
      set({ users: searchResult, loading: false });
    } catch (error) {
      console.error("Failed to search users:", error);
      const errMsg = error.response?.data?.error || "User not found";
      set({ error: errMsg, loading: false, users: [] }); // ถ้าไม่เจอให้เคลียร์ user
    }
  },
  updateUser: async (userId, data) => {
    try {
      await updateUser(userId, data);
      await get().fetchUsers(); // ดึงข้อมูลใหม่หลังอัปเดต
    } catch (err) {
      console.error("Failed to update user:", err);
      throw err;
    }
  },

  deleteUser: async (userId) => {
    try {
      await deleteUser(userId);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (err) {
      console.error("Failed to delete user:", err);
      throw err;
    }
  },
}));

export default useUserManagementStore;
