import { useEffect, useState } from "react";
import axios from "axios";

function Schedule() {
  const [medicines, setMedicines] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/medicines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMedicines(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="schedule-container">
      <h1>Weekly Medicine Schedule</h1>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Time</th>
            <th>Frequency</th>
          </tr>
        </thead>

        <tbody>
          {days.map((day) =>
            medicines.map((med) => (
              <tr key={`${day}-${med._id}`}>
                <td>{day}</td>
                <td>{med.medicineName}</td>
                <td>{med.dosage}</td>
                <td>{med.time}</td>
                <td>{med.frequency}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;