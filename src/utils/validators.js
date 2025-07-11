import { string, object, ref } from "yup";

export const registerSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required"),
  password: string().min(6).required(),
  confirmPassword: string()
    .required("confirmPassword must match password")
    .oneOf([ref("password")]),
});
