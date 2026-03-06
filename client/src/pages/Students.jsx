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

  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          placeholder="Filter by major..."
          value={filterMajor}
          onChange={(e) => {
            setFilterMajor(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <StudentCardGrid
        students={paginatedStudents}
        onView={handleView}
        onDelete={handleAskDelete}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button
          className="authBtn authBtnEnter"
          onClick={() => setPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span
          style={{
            color: "white",
            fontWeight: 600,
            minWidth: "110px",
            textAlign: "center",
          }}
        >
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="authBtn authBtnEnter"
          onClick={() => setPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

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
