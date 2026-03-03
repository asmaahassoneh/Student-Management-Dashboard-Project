import Button from "./ui/Button";

export default function StudentCardGrid({ students, onView, onDelete }) {
  if (!students?.length)
    return <p className="empty-message">No students found.</p>;

  return (
    <div className="studentGrid">
      {students.map((s) => (
        <div key={s.id} className="ds-card studentCard">
          <div className="studentTop">
            <h3 className="studentName">{s.name}</h3>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
              #{String(s.id).slice(0, 6)}
            </span>
          </div>

          <div className="studentMeta">
            <div>
              <b>Email:</b> {s.email}
            </div>
            <div>
              <b>Major:</b> {s.major}
            </div>
            <div>
              <b>GPA:</b> {s.gpa}
            </div>
          </div>

          <div className="studentActions">
            <Button type="button" onClick={() => onView(s.id)}>
              View
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => onDelete(s.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
