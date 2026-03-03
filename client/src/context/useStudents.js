import { useContext } from "react";
import { StudentContext } from "./StudentContext";

export function useStudents() {
  return useContext(StudentContext);
}
