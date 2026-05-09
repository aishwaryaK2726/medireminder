function Help() {
  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      phone: "+91 9876543210",
      hospital: "Apollo Hospital",
    },
    {
      name: "Dr. Rahul Verma",
      specialization: "Cardiologist",
      phone: "+91 9123456780",
      hospital: "Fortis Hospital",
    },
    {
      name: "Dr. Sneha Reddy",
      specialization: "Diabetologist",
      phone: "+91 9988776655",
      hospital: "Care Hospital",
    },
  ];

  return (
    <div className="help-page">
      <div className="help-container">
        <h1>Emergency Help & Precautions</h1>

        <div className="precaution-card">
          <h2>Important Precautions</h2>

          <ul>
            <li>Take medicines at the correct scheduled time.</li>
            <li>Do not skip prescribed dosage.</li>
            <li>Drink enough water daily.</li>
            <li>Consult doctor before changing medicines.</li>
            <li>Keep emergency contact numbers accessible.</li>
          </ul>
        </div>

        <h2 className="doctor-title">Emergency Doctors</h2>

        <div className="doctor-grid">
          {doctors.map((doctor, index) => (
            <div className="doctor-card" key={index}>
              <h3>{doctor.name}</h3>

              <p>
                <strong>Specialization:</strong> {doctor.specialization}
              </p>

              <p>
                <strong>Hospital:</strong> {doctor.hospital}
              </p>

              <p>
                <strong>Phone:</strong> {doctor.phone}
              </p>

              <a href={`tel:${doctor.phone}`}>
                <button>Call Doctor</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;