function Help() {
  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      phone: "+91 9876543210",
      hospital: "Apollo Hospital",
      image:
        "https://cdn-icons-png.flaticon.com/512/2785/2785482.png",
    },
    {
      name: "Dr. Rahul Verma",
      specialization: "Cardiologist",
      phone: "+91 9123456780",
      hospital: "Fortis Hospital",
      image:
        "https://cdn-icons-png.flaticon.com/512/2785/2785482.png",
    },
    {
      name: "Dr. Sneha Reddy",
      specialization: "Diabetologist",
      phone: "+91 9988776655",
      hospital: "Care Hospital",
      image:
        "https://cdn-icons-png.flaticon.com/512/2785/2785482.png",
    },
  ];

  return (
    <div className="help-page">
      <div className="help-container">
        <h1>Emergency Doctors</h1>

        <p className="help-subtitle">
          Quickly contact doctors during emergency situations.
        </p>

        <div className="doctor-grid">
          {doctors.map((doctor, index) => (
            <div className="doctor-card" key={index}>
              <img
                src={doctor.image}
                alt={doctor.name}
                className="doctor-image"
              />

              <h3>{doctor.name}</h3>

              <p>{doctor.specialization}</p>

              <div className="doctor-info">
                <span>{doctor.hospital}</span>
              </div>

              <div className="doctor-phone">
                📞 {doctor.phone}
              </div>

              <a href={`tel:${doctor.phone}`}>
                <button className="call-btn">
                  Call Doctor
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;