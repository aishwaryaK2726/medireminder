import { useState } from "react";
import axios from "axios";

function AddMedicine() {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    dosage: "",
    time: "",
    frequency: "",
  });

  const handleChange = (e) => {
    setMedicine({
      ...medicine,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/medicines/add", medicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Medicine Added Successfully");

      setMedicine({
        medicineName: "",
        dosage: "",
        time: "",
        frequency: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error adding medicine");
    }
  };

  return (
    <div className="container">
      <h2>Add Medicine</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={medicine.medicineName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={medicine.dosage}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={medicine.time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="frequency"
          placeholder="Frequency"
          value={medicine.frequency}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default AddMedicine;