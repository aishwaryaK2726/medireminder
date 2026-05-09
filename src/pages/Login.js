import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [user, setUser] = useState({
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

      const res = await axios.post(
        "http://localhost:5000/auth/login",
        user
      );

      // SAVE TOKEN
      sessionStorage.setItem(
        "token",
        res.data.token
      );

      // LOGIN STATE
      setIsLoggedIn(true);

      // SUCCESS MESSAGE
      toast.success(
        "Login Successful! Redirecting..."
      );

      // REDIRECT AFTER 5 SECONDS
      setTimeout(() => {

        navigate("/dashboard");

      }, 5000);

    } catch (error) {

      toast.error("Invalid Credentials");
    }
  };

  return (

    <div className="login-page">

      <div className="auth-container">

        <div className="auth-card">

          <h2>Welcome Back</h2>

          <p>
            Login to manage your medicine reminders
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;