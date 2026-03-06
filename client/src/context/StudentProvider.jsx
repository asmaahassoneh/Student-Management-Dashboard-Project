import { useEffect, useMemo, useState, useCallback } from "react";
import { StudentContext } from "./StudentContext";
import { studentsApi } from "../services/studentsApi";
import { useAuth } from "./useAuth";

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await studentsApi.getAll();
      setStudents(res.data);
    } catch (e) {
      setError("Failed to load students: " + (e?.message ?? String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (user?.role !== "admin") return;
    fetchStudents();
  }, [fetchStudents, isAuthenticated, user?.role]);

  const addStudent = useCallback(async (student) => {
    const res = await studentsApi.create({ ...student });
    setStudents((prev) => [...prev, res.data]);
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      setError(null);
      await studentsApi.remove(id);
      setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (e) {
      setError("Failed to delete student: " + (e?.message ?? String(e)));
      throw e;
    }
  }, []);

  const updateStudent = useCallback(async (id, updatedStudent) => {
    try {
      setError(null);
      const res = await studentsApi.update(id, updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (String(s.id) === String(id) ? res.data : s)),
      );
    } catch (e) {
      setError("Failed to update student: " + (e?.message ?? String(e)));
      throw e;
    }
  }, []);

  const value = useMemo(
    () => ({
      students,
      loading,
      error,
      addStudent,
      deleteStudent,
      updateStudent,
      refetchStudents: fetchStudents,
    }),
    [
      students,
      loading,
      error,
      addStudent,
      deleteStudent,
      updateStudent,
      fetchStudents,
    ],
  );

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}
