import logo from "./assets/pill-logo.png";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import EditMedicine from "./pages/EditMedicine";
import Schedule from "./pages/Schedule";
import Help from "./pages/Help";
import History from "./pages/History";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") ? true : false
  );

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="logo-container">
          <img
            src={logo}
            alt="MediReminder Logo"
            className="logo-img"
          />

          <span className="logo-text">MediReminder</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/help">Help</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} />}
        />

        <Route path="/help" element={<Help />} />

        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Register />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/add"
          element={
            isLoggedIn ? <AddMedicine /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/medicines"
          element={
            isLoggedIn ? <MedicineList /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/schedule"
          element={
            isLoggedIn ? <Schedule /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/history"
          element={
            isLoggedIn ? <History /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/edit/:id"
          element={
            isLoggedIn ? <EditMedicine /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;