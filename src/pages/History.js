import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="history-container">
        <h1>Medicine History</h1>

        <table className="history-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Time</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.medicineName}</td>
                <td>{item.dosage}</td>
                <td>{item.time}</td>
                <td>{item.date}</td>
                <td>
                  <span className="taken-badge">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <p className="empty-history">
            No medicine history found.
          </p>
        )}
      </div>
    </div>
  );
}

export default History;