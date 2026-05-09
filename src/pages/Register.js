import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/auth/register",
        user
      );

      // SUCCESS MESSAGE
      toast.success(
        "Registered Successfully! Redirecting to login..."
      );

      // REDIRECT AFTER 5 SECONDS
      setTimeout(() => {

        navigate("/login");

      }, 5000);

    } catch (error) {

      toast.error("Registration Failed");
    }
  };

  return (

    <div className="register-page">

      <div className="auth-container">

        <div className="auth-card">

          <h2>Register</h2>

          <p>
            Create your MediReminder account
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;