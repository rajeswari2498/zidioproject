import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email || !password) {
      setPopupMessage("⚠️ Please fill all fields!");
      setTimeout(() => setPopupMessage(""), 2000);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (isEmailTaken) {
      setPopupMessage("⚠️ Email already registered! Please log in.");
    } else {
      const newUser = { name, email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Store full user details in "userData" for settings page
      localStorage.setItem("userData", JSON.stringify({ 
        fullName: name, 
        email, 
        password,
        mobileNumber: "", 
        address: "", 
        profilePicture: null 
      }));

      setPopupMessage(`✅ ${name}, your account has been created!`);
      
      setTimeout(() => {
        navigate("/login"); // Navigate to login page
      }, 1500);

      setName("");
      setEmail("");
      setPassword("");
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Sign up an account</h2>

        <div className="social-login">
          <button className="social-btn google-btn">
            <FaGoogle className="icon" /> Google
          </button>
          <button className="social-btn github-btn">
            <FaGithub className="icon" /> GitHub
          </button>
        </div>

        <div className="separator"><span>or continue with email</span></div>

        <div className="input-group">
          <i><FaUser /></i>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <i><FaEnvelope /></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <i><FaLock /></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signup-btn" onClick={handleSignup}>Sign Up</button>

        <p className="form-link">
          Already have an account? <a href="/login">Log in</a>
        </p>

        {popupMessage && <div className="popup"><p>{popupMessage}</p></div>}
      </div>
    </div>
  );
}
