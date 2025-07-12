import axios from "axios";

const habitsApi = axios.create({
  baseURL: "http://localhost:8000/api/habits",
});

const addToken = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getHabits = (token) => habitsApi.get("/", addToken(token));

export const getHabitById = (habitId, token) =>
  habitsApi.get(`/${habitId}`, addToken(token));

export const createHabit = (newHabitInfo, token) =>
  habitsApi.post("/", newHabitInfo, addToken(token));

export const updateHabit = (habitId, updateInfo, token) =>
  habitsApi.patch(`/${habitId}`, updateInfo, addToken(token));

export const deleteHabit = (habitId, token) =>
  habitsApi.delete(`/${habitId}`, addToken(token));
