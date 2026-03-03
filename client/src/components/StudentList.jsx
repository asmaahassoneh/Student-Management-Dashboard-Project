import { memo } from "react";

const StudentRow = memo(function StudentRow({ student, onView, onDelete }) {
  return (
    <tr>
      <td data-label="Name">{student.name}</td>
      <td data-label="Email">{student.email}</td>
      <td data-label="Major">{student.major}</td>
      <td data-label="GPA">{student.gpa}</td>
      <td data-label="Actions">
        <button onClick={() => onView(student.id)}>View</button>
        <button onClick={() => onDelete(student.id)}>Delete</button>
      </td>
    </tr>
  );
});

function StudentList({ students, onView, onDelete }) {
  if (students.length === 0) {
    return <p className="empty-message">No students registered yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onView={onView}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(StudentList);
