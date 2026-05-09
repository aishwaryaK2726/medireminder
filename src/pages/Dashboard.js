import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/medicines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Total Medicines</h2>
        <p>{count}</p>
      </div>
    </div>
  );
}

export default Dashboard;