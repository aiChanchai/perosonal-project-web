import { string, object, ref, number } from "yup";

export const loginSchema = object({
  email: string().required("Email is required"),
  password: string().min(6).required("password is required"),
});

export const registerSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required"),
  password: string().min(6).required(),
  confirmPassword: string()
    .required("confirmPassword must match password")
    .oneOf([ref("password")]),
});

export const habitSchema = object({
  title: string().required("Title is required"),
  description: string().optional(),
  weeklyGoal: number()
    .typeError("Weekly goal must be a number")
    .min(1, "Goal must be at least 1 day per week")
    .max(7, "Goal cannot be more than 7 days per week"),
});
