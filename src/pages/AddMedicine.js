import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddMedicine() {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [voiceText, setVoiceText] = useState("");

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    // Demo auto-fill after tablet image upload
    // Later you can replace this with real AI/OCR API
    setMedicine({
      medicineName: "Detected Tablet Name",
      dosage: "1 Tablet",
      time: "08:00",
      frequency: "Daily",
    });

    toast.info("Tablet image uploaded. Details filled automatically.");
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);

      // Demo auto-fill after voice input
      // Example voice: "Take Dolo 650 daily at 8 AM"
      setMedicine({
        medicineName: "Medicine from Voice",
        dosage: "1 Tablet",
        time: "08:00",
        frequency: text,
      });

      toast.success("Voice input captured successfully.");
    };

    recognition.onerror = () => {
      toast.error("Could not capture voice. Please try again.");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      await axios.post("http://localhost:5000/medicines/add", medicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Medicine Added Successfully");

      setMedicine({
        medicineName: "",
        dosage: "",
        time: "",
        frequency: "",
      });

      setImagePreview(null);
      setVoiceText("");

      setTimeout(() => {
        navigate("/medicines");
      }, 1000);
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Error adding medicine");
    }
  };

  return (
    <div className="container add-medicine-page">
      <h2>Add Medicine</h2>

      <p className="add-info">
        Elderly users can add medicine easily by uploading a tablet image or
        using voice input.
      </p>

      <div className="easy-add-section">
        <div className="upload-box">
          <h3>Upload Tablet Image</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Tablet Preview"
              className="tablet-preview"
            />
          )}
        </div>

        <div className="voice-box">
          <h3>Voice Input</h3>

          <button
            type="button"
            className="voice-btn"
            onClick={handleVoiceInput}
          >
            Record Voice
          </button>

          {voiceText && (
            <p className="voice-text">
              Voice: {voiceText}
            </p>
          )}
        </div>
      </div>

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