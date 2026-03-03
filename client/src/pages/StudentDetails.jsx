import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStudents } from "../context/useStudents";
import { studentSchema } from "../validation/studentSchema";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const studentId = String(id);

  const { students, loading, error, updateStudent } = useStudents();

  const student = useMemo(
    () => students.find((s) => String(s.id) === studentId),
    [students, studentId],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    major: "",
    gpa: "",
  });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name ?? "",
        email: student.email ?? "",
        major: student.major ?? "",
        gpa: student.gpa ?? "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (!student) return;
    setForm({
      name: student.name ?? "",
      email: student.email ?? "",
      major: student.major ?? "",
      gpa: student.gpa ?? "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const payloadForValidation = {
      name: form.name,
      email: form.email,
      major: form.major,
      gpa: form.gpa === "" ? "" : Number(form.gpa),
    };

    try {
      setSaving(true);

      await studentSchema.validate(payloadForValidation, { abortEarly: true });

      const payloadForApi = {
        ...payloadForValidation,
        gpa: Number(payloadForValidation.gpa),
      };

      await updateStudent(studentId, payloadForApi);

      toast.success("Student updated successfully!");
      setIsEditing(false);
    } catch (e) {
      toast.error(e?.message ?? "Validation failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="details-card">
        <h2>Loading...</h2>
        <button className="back-btn" onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-card">
        <h2 style={{ color: "red" }}>❌ {error}</h2>
        <button className="back-btn" onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="details-card">
        <h2>Student not found</h2>
        <button className="back-btn" onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <h2 className="details-title">Student Details</h2>

        {!isEditing ? (
          <>
            <div className="detail-item">
              <span>Name</span>
              <p>{student.name}</p>
            </div>

            <div className="detail-item">
              <span>Email</span>
              <p>{student.email}</p>
            </div>

            <div className="detail-item">
              <span>Major</span>
              <p>{student.major}</p>
            </div>

            <div className="detail-item">
              <span>GPA</span>
              <p>{student.gpa}</p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                className="back-btn"
                onClick={() => navigate("/students")}
              >
                ← Back to Students
              </button>

              <button className="back-btn" onClick={() => setIsEditing(true)}>
                ✏️ Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="detail-item">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="detail-item">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                autoComplete="email"
                required
              />
            </div>

            <div className="detail-item">
              <span>Major</span>
              <input
                name="major"
                value={form.major}
                onChange={handleChange}
                placeholder="Major"
                required
              />
            </div>

            <div className="detail-item">
              <span>GPA</span>
              <input
                name="gpa"
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={form.gpa}
                onChange={handleChange}
                placeholder="0 - 4"
                required
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                className="back-btn"
                onClick={handleCancel}
                disabled={saving}
                type="button"
              >
                Cancel
              </button>

              <button
                className="back-btn"
                onClick={handleSave}
                disabled={saving}
                type="button"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
