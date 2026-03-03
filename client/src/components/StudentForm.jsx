import { toast } from "react-toastify";
import { useStudents } from "../context/useStudents";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "../validation/studentSchema";

import Input from "./form/Input";

function StudentForm() {
  const { addStudent } = useStudents();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      major: "",
      gpa: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        gpa: Number(data.gpa),
      };

      await addStudent(payload);
      toast.success("Student Registered Successfully!");
      reset();
    } catch (e) {
      toast.error("Failed to add student: " + (e?.message ?? String(e)));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
      <Input
        label="Full Name"
        name="name"
        placeholder="Full Name"
        register={register}
        error={errors.name}
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        register={register}
        error={errors.email}
        required
      />

      <Input
        label="Major"
        name="major"
        placeholder="Major"
        register={register}
        error={errors.major}
        required
      />

      <Input
        label="GPA"
        name="gpa"
        type="number"
        step="0.01"
        min="0"
        max="4"
        placeholder="GPA (0 - 4)"
        register={register}
        error={errors.gpa}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Student"}
      </button>
    </form>
  );
}

export default StudentForm;
