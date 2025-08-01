import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title
} from "chart.js";
import "../App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

export default function StudentDashboard() {
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const studentName = localStorage.getItem("userName");

  useEffect(() => {
    if (!studentName) return;
    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `https://college-attendance-cifd.onrender.com/api/attendance/${studentName}`
        );
        const data = await res.json();
        setAttendanceData(data || {});
      } catch (err) {
        console.error(err);
        alert("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [studentName]);

  const labels = Object.keys(attendanceData);
  const percentages = labels.map((subject) => {
    const { present, total } = attendanceData[subject];
    return total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Attendance Percentage",
        data: percentages,
        backgroundColor: ["#fec7d3ff", "#facc9eff", "#fbe4a9ff"], // no gradient
        borderColor: ["#fa7c98ff", "#ff9f40", "#ffce56"],
        borderWidth: 5,
        borderRadius: 10,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: true,
        text: 'Attendance Percentage',
        padding: {
          top: 10,
          bottom: 25,  // Adds space between title and chart
        },  // Chart title
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <>
      <div className="page-container">
        <Navbar userType="student" userName={studentName} showLogout />
        <h1 style={{marginTop: "5px"}}>Welcome {studentName}</h1>
        {loading ? (
          <p>Loading attendance data...</p>
        ) : labels.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <table className="attendance-table">
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Subject</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Classes Attended</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total Classes</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {labels.map((subject) => {
                    const { present, total } = attendanceData[subject];
                    const pct = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
                    return (
                      <tr key={subject}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{subject}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{present}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{total}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="chart-container">
              <Bar data={chartData} options={options} />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}
