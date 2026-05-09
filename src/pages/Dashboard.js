import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [medicineCount, setMedicineCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const medicineRes = await axios.get(
          "http://localhost:5000/medicines",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const historyRes = await axios.get(
          "http://localhost:5000/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMedicineCount(medicineRes.data.length);
        setHistory(historyRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

  const takenCount = history.filter(
    (item) => item.status === "Taken"
  ).length;

  const missedCount = history.filter(
    (item) => item.status === "Missed"
  ).length;

  const totalHistory = history.length;

  const completionPercentage =
    totalHistory === 0
      ? 0
      : Math.round((takenCount / totalHistory) * 100);

  const pieData = {
    labels: ["Taken", "Missed"],
    datasets: [
      {
        data: [takenCount, missedCount],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklyTaken = days.map((day) => {
    return history.filter((item) => {
      const historyDay = new Date(item.date).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );

      return historyDay === day && item.status === "Taken";
    }).length;
  });

  const weeklyData = {
    labels: days,
    datasets: [
      {
        label: "Medicines Taken",
        data: weeklyTaken,
        backgroundColor: "#0f75d1",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        <div className="dashboard-cards">
          <div className="analytics-card">
            <h2>Total Medicines</h2>
            <p>{medicineCount}</p>
          </div>

          <div className="analytics-card">
            <h2>Taken</h2>
            <p>{takenCount}</p>
          </div>

          <div className="analytics-card">
            <h2>Missed</h2>
            <p>{missedCount}</p>
          </div>

          <div className="analytics-card">
            <h2>Completion</h2>
            <p>{completionPercentage}%</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Medicine Completion Status</h2>

            {totalHistory > 0 ? (
              <Pie data={pieData} />
            ) : (
              <p className="empty-chart">
                No history data available yet.
              </p>
            )}
          </div>

          <div className="chart-card">
            <h2>Weekly Progress</h2>

            {totalHistory > 0 ? (
              <Bar data={weeklyData} />
            ) : (
              <p className="empty-chart">
                Mark medicines as taken to view progress.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;