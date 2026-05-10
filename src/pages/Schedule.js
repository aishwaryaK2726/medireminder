import { useEffect, useState } from "react";
import axios from "axios";

function Schedule() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = sessionStorage.getItem("token");

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

  const getTimePeriod = (time) => {
    const hour = Number(time.split(":")[0]);

    if (hour >= 5 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 21) return "Evening";
    return "Night";
  };

  const scheduleGroups = {
    Morning: medicines.filter((med) => getTimePeriod(med.time) === "Morning"),
    Afternoon: medicines.filter(
      (med) => getTimePeriod(med.time) === "Afternoon"
    ),
    Evening: medicines.filter((med) => getTimePeriod(med.time) === "Evening"),
    Night: medicines.filter((med) => getTimePeriod(med.time) === "Night"),
  };

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <h1>Medicine Schedule Diagram</h1>

        <p className="schedule-subtitle">
          Your medicines are arranged visually based on the time of the day.
        </p>

        <div className="timeline">
          {Object.keys(scheduleGroups).map((period) => (
            <div className="timeline-block" key={period}>
              <div className="timeline-circle">
                {period === "Morning" && "🌅"}
                {period === "Afternoon" && "☀️"}
                {period === "Evening" && "🌇"}
                {period === "Night" && "🌙"}
              </div>

              <div className="timeline-content">
                <h2>{period}</h2>

                {scheduleGroups[period].length === 0 ? (
                  <p className="no-medicine">No medicine scheduled</p>
                ) : (
                  scheduleGroups[period].map((med) => (
                    <div className="schedule-medicine-card" key={med._id}>
                      <h3>{med.medicineName}</h3>
                      <p>{med.dosage}</p>
                      <span>{med.time}</span>
                      <small>{med.frequency}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;