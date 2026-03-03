import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
