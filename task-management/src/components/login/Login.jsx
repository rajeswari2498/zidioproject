import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleOAuthLogin = (provider) => {
    let authUrl = "";
    if (provider === "google") {
      authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/callback&response_type=token&scope=email`;
    } else if (provider === "github") {
      authUrl = `https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=http://localhost:3000`;
    }
    window.open(authUrl, "_blank", "width=500,height=600");
  };

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const existingUser = storedUsers.find(user => user.email === email);

    if (!existingUser) {
      setPopupMessage("❌ Email is not registered!");
    } else if (existingUser.password !== password) {
      setPopupMessage("❌ Incorrect password!");
    } else {
      // Store full name in localStorage
      localStorage.setItem("userData", JSON.stringify({ fullName: existingUser.name }));

      setPopupMessage(`✅ Welcome, ${existingUser.name}! Redirecting...`);
      
      setTimeout(() => {
        navigate("/otp");
      }, 2000);
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div className="login-card">
      <h2>Login to Your Account</h2>

      <div className="social-login">
        <button className="social-btn google-btn" onClick={() => handleOAuthLogin("google")}>
          <FaGoogle className="icon" /> Google
        </button>
        <button className="social-btn github-btn" onClick={() => handleOAuthLogin("github")}>
          <FaGithub className="icon" /> GitHub
        </button>
      </div>

      <div className="separator"><span>or continue with email</span></div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      <button className="login-btn" onClick={handleLogin}>Login</button>

      <p className="create-account">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>

      {popupMessage && <div className="popup"><p>{popupMessage}</p></div>}
    </div>
  );
};

export default Login;
