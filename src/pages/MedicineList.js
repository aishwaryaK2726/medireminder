import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import alarmSound from "../assets/alarm.mp3";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [notified, setNotified] = useState({});

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
      console.log(error.response?.data || error);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(`http://localhost:5000/medicines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Medicine deleted successfully");
      fetchMedicines();
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Error deleting medicine");
    }
  };

  const markAsTaken = async (med) => {
    try {
      const token = sessionStorage.getItem("token");

      const today = new Date().toLocaleDateString();

      await axios.post(
        "http://localhost:5000/history/add",
        {
          medicineId: med._id,
          medicineName: med.medicineName,
          dosage: med.dosage,
          time: med.time,
          status: "Taken",
          date: today,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`${med.medicineName} marked as Taken`);
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Error marking medicine as taken");
    }
  };

  const playAlarm = () => {
    const alarm = new Audio(alarmSound);

    alarm.play().catch((error) => {
      console.log("Alarm play blocked:", error);
    });
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      medicines.forEach((med) => {
        const reminderKey = `${med._id}-${currentTime}`;

        if (med.time === currentTime && !notified[reminderKey]) {
          toast.success(`Time to take ${med.medicineName}`);

          playAlarm();

          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("MediReminder", {
              body: `Time to take ${med.medicineName} - ${med.dosage}`,
            });
          }

          setNotified((prev) => ({
            ...prev,
            [reminderKey]: true,
          }));
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [medicines, notified]);

  const filteredMedicines = medicines.filter((med) =>
    med.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container medicine-list-page">
      <h2>Medicines</h2>

      <p className="medicine-list-info">
        View all added medicines, mark medicines as taken, edit details, or
        delete medicines.
      </p>

      <input
        type="text"
        placeholder="Search Medicine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="medicine-search"
      />

      {medicines.length === 0 && (
        <p className="empty-message">No medicines added yet.</p>
      )}

      {filteredMedicines.length === 0 && medicines.length > 0 && (
        <p className="empty-message">No matching medicines found.</p>
      )}

      <div className="medicine-grid">
        {filteredMedicines.map((med) => (
          <div key={med._id} className="medicine-card">
            <h3>{med.medicineName}</h3>

            <p>
              <strong>Dosage:</strong> {med.dosage}
            </p>

            <p>
              <strong>Time:</strong> {med.time}
            </p>

            <p>
              <strong>Frequency:</strong> {med.frequency}
            </p>

            <div className="medicine-actions">
              <button
                className="taken-btn"
                onClick={() => markAsTaken(med)}
              >
                Mark as Taken
              </button>

              <Link to={`/edit/${med._id}`}>
                <button className="edit-btn">Edit</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() => deleteMedicine(med._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineList;