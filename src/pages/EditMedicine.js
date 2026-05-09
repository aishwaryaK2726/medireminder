import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    medicineName: "",
    dosage: "",
    time: "",
    frequency: "",
  });

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/medicines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const selectedMedicine = res.data.find((med) => med._id === id);

        if (selectedMedicine) {
          setMedicine(selectedMedicine);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicine();
  }, [id]);

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

      await axios.put(`http://localhost:5000/medicines/${id}`, medicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Medicine Updated");

      navigate("/medicines");
    } catch (error) {
      console.log(error);
      alert("Error updating medicine");
    }
  };

  return (
    <div className="container">
      <h2>Edit Medicine</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="medicineName"
          value={medicine.medicineName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="dosage"
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
          value={medicine.frequency}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Medicine</button>
      </form>
    </div>
  );
}

export default EditMedicine;