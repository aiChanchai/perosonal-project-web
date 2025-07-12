import { string, object, ref } from "yup";

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
