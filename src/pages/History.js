import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

        {history.length === 0 && (
          <p className="empty-history">No medicine history found.</p>
        )}

        <div className="history-card-grid">
          {history.map((item) => (
            <div
              key={item._id}
              className={
                item.status === "Taken"
                  ? "history-card taken-history-card"
                  : "history-card missed-history-card"
              }
            >
              <div className="tablet-image-box">
                <div className="tablet-icon">💊</div>
              </div>

              <h2>{item.medicineName}</h2>

              <p>{item.dosage}</p>

              <div className="history-details">
                <span>{item.time}</span>
                <span>{item.date}</span>
              </div>

              <div
                className={
                  item.status === "Taken"
                    ? "status-image taken-status"
                    : "status-image missed-status"
                }
              >
                {item.status === "Taken" ? "✅ Taken" : "❌ Missed"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;