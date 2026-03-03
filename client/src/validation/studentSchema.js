import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  major: yup
    .string()
    .trim()
    .min(2, "Major must be at least 2 characters")
    .required("Major is required"),

  gpa: yup
    .number()
    .typeError("GPA must be a number")
    .min(0, "Minimum GPA is 0")
    .max(4, "Maximum GPA is 4")
    .required("GPA is required"),
});
