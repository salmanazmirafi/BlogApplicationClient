import { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsrname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://bloging-aplication-new-app.onrender.com/api/v1/signup",
        {
          username,
          email,
          password,
        }
      );
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          onChange={(e) => setUsrname(e.target.value)}
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      <Link to='/login'>
        <button className="registerLoginButton">Login</button>
      </Link>
      {error && (
        <span style={{ color: "red", padding: "10px 0" }}>
          Something Went Wrong
        </span>
      )}
    </div>
  );
}
