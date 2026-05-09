import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [notified, setNotified] = useState({});

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

  const deleteMedicine = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/medicines/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
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

          alert(
            `Reminder: Time to take ${med.medicineName}\nDosage: ${med.dosage}`
          );

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

  return (
    <div className="container">
      <h2>Medicine List</h2>

      <input
        type="text"
        placeholder="Search Medicine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {medicines
        .filter((med) =>
          med.medicineName.toLowerCase().includes(search.toLowerCase())
        )
        .map((med) => (
          <div key={med._id} className="medicine-card">
            <h3>{med.medicineName}</h3>

            <p>Dosage: {med.dosage}</p>
            <p>Time: {med.time}</p>
            <p>Frequency: {med.frequency}</p>

            <Link to={`/edit/${med._id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteMedicine(med._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default MedicineList;