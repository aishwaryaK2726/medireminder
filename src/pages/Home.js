import { Link } from "react-router-dom";

function Home({ isLoggedIn }) {
  return (
    <div className="home-page">
      <div className="home-dashboard">
        <aside className="home-sidebar">
          <h2>MediReminder</h2>

          <div className="profile-box">
            <div className="profile-icon">👵</div>
            <div>
              <h3>Welcome</h3>
              <p>Medicine Care</p>
            </div>
          </div>

          {isLoggedIn && (
            <div className="side-menu">
              <Link to="/dashboard">📊 Dashboard</Link>
              <Link to="/add">➕ Add Medicine</Link>
              <Link to="/medicines">💊 Medicines</Link>
              <Link to="/schedule">📅 Schedule</Link>
              <Link to="/history">🕘 History</Link>
            </div>
          )}
        </aside>

        <main className="home-main">
          <div className="home-top">
            <h1>Hello, User!</h1>
          </div>

          <div className="home-welcome-card">
            <h2>MediReminder</h2>
            <p>
              A smart medicine reminder web application to help elderly users
              track medicines, dosage, timing, and daily reminders easily.
            </p>
          </div>

          {isLoggedIn && (
            <div className="home-grid">
              <Link to="/dashboard" className="home-feature-card">
                <span>📊</span>
                <h3>Dashboard</h3>
                <p>View your medicine summary</p>
              </Link>

              <Link to="/add" className="home-feature-card">
                <span>➕</span>
                <h3>Add Medicine</h3>
                <p>Upload image or use voice</p>
              </Link>

              <Link to="/medicines" className="home-feature-card">
                <span>💊</span>
                <h3>Medicines</h3>
                <p>Manage medicine list</p>
              </Link>

              <Link to="/schedule" className="home-feature-card wide-card">
                <span>📅</span>
                <h3>Schedule</h3>
                <p>See medicine timings visually</p>
              </Link>

              <Link to="/history" className="home-feature-card wide-card">
                <span>🕘</span>
                <h3>History</h3>
                <p>Check taken and missed medicines</p>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;