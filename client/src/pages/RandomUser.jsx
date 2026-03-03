import { useEffect, useState } from "react";
import { studentsApi } from "../services/studentsApi";

function RandomUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [randomStudent, setRandomStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await studentsApi.getAll();
        setData(res.data || []);
      } catch (e) {
        setError(e.response?.data?.error || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const pickRandom = () => {
    if (!data.length) return;
    const index = Math.floor(Math.random() * data.length);
    setRandomStudent(data[index]);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Random Student</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {randomStudent && (
        <div className="card">
          <h2>{randomStudent.name}</h2>
          <p>Email: {randomStudent.email}</p>
          <p>Major: {randomStudent.major}</p>
          <p>GPA: {randomStudent.gpa}</p>
        </div>
      )}

      <button
        onClick={pickRandom}
        disabled={loading || !data.length}
        style={{ marginTop: 20 }}
      >
        {randomStudent ? "Get Another Random Student" : "Pick a Random Student"}
      </button>
    </div>
  );
}

export default RandomUser;
