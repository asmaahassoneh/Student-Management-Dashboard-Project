import { useMemo, useState, useCallback } from "react";
import StudentForm from "../components/StudentForm";
import "react-toastify/dist/ReactToastify.css";
import { useStudents } from "../context/useStudents";
import { useNavigate } from "react-router-dom";

import StudentCardGrid from "../components/StudentCardGrid";
import Modal from "../components/ui/Modal";
import Alert from "../components/ui/Alert";

function Students() {
  const { students, loading, error, deleteStudent, refetchStudents } =
    useStudents();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterMajor, setFilterMajor] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const handleView = useCallback(
    (id) => navigate(`/students/${id}`),
    [navigate],
  );

  const handleAskDelete = useCallback((id) => setDeleteId(id), []);
  const handleCloseModal = useCallback(() => setDeleteId(null), []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteId) return;
    await deleteStudent(deleteId);
    setDeleteId(null);
  }, [deleteId, deleteStudent]);

  const filteredStudents = useMemo(() => {
    const s = search.trim().toLowerCase();
    const m = filterMajor.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = s
        ? (student.name ?? "").toLowerCase().includes(s)
        : true;
      const matchesMajor = m
        ? (student.major ?? "").toLowerCase().includes(m)
        : true;
      return matchesSearch && matchesMajor;
    });
  }, [students, search, filterMajor]);

  if (loading) {
    return (
      <div className="container">
        <h1>Student Dashboard</h1>
        <p>Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1>Student Dashboard</h1>
        <Alert variant="error">❌ {String(error)}</Alert>
        <div style={{ marginTop: 12 }}>
          <button onClick={refetchStudents}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Student Dashboard</h1>

      <StudentForm />

      <div className="filters">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Filter by major..."
          value={filterMajor}
          onChange={(e) => setFilterMajor(e.target.value)}
        />
      </div>

      <StudentCardGrid
        students={filteredStudents}
        onView={handleView}
        onDelete={handleAskDelete}
      />

      <Modal
        open={!!deleteId}
        title="Delete student?"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        confirmText="Yes, delete"
        cancelText="Cancel"
        confirmVariant="danger"
      >
        This action cannot be undone.
      </Modal>
    </div>
  );
}

export default Students;
