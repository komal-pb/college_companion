import { useEffect, useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherDashboard() {
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const teacherId = localStorage.getItem("userId");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://college-attendance-cifd.onrender.com/api/students");
        const data = await res.json();
        const formatted = data.map((student, index) => ({
          id: index + 1,            // internal id for UI
          name: student.name,
          email: student.email,
          present: false,
        }));
        setStudents(formatted);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);
  useEffect(() => {
  const fetchTeacher = async () => {
    try {
      const res = await fetch(`https://college-attendance-cifd.onrender.com/api/teacher/${teacherId}`);
      const data = await res.json();
      if (res.ok) {
        setTeacherName(data.name);
      }
    } catch (err) {
      console.error("Error fetching teacher:", err);
    }
  };
  fetchTeacher();
}, [teacherId]);

  // Toggle one student's attendance
  const togglePresent = (id) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ? { ...s, present: !s.present } : s
      )
    );
  };

  // Mark all present / clear
  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, present: true })));
  };
  const clearAll = () => {
    setStudents(prev => prev.map(s => ({ ...s, present: false })));
  };

  // Submit
  const handleSubmit = async () => {
    if (!subject) {
      alert("Please select a subject.");
      return;
    }

    const attendanceResult = students.map(({ name, email, present }) => ({
      studentName: name,
      present,
    }));

    try {
      const res = await fetch("https://college-attendance-cifd.onrender.com/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          teacherId,
          records: attendanceResult,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Attendance submitted successfully!");
      } else {
        alert(data.msg || "Failed to save attendance");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <>
      <div className="page-container">
      <Navbar userType="teacher" userName={teacherName} showLogout />
      <div className="dashboard">
        <h1 style={{marginTop: "5px"}}>Welcome, {teacherName}</h1>


        <div className="att-controls">
          <div>
            <label style={{ fontWeight: 600, marginRight: 8 }}>
              Select Subject:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="Data_Structures">Data_Structures</option>
              <option value="Operating_Systems">Operating_Systems</option>
              <option value="Computer_Networks">Computer_Networks</option>
            </select>
          </div>

          <div className="quick-buttons">
            <button type="button" onClick={markAllPresent}>
              Mark All Present
            </button>
            <button
              type="button"
              className="secondary"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>
        </div>

        <table className="attendance-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td><i>{s.email}</i></td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={s.present}
                        onChange={() => togglePresent(s.id)}
                      />
                      <span className="slider"></span>
                    </label>
                    <span
                      className={`status-text ${s.present ? "present" : "absent"}`}
                    >
                      {s.present ? "Present" : "Absent"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        <div className="submit-container">
          <button onClick={handleSubmit} className="submit-btn">
            Submit Attendance
          </button>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}
