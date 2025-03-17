import React from "react";
import "./Vlogin.css";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Import icons

const Login = () => {
  return (
    <div className="login-card">
      <h2>Login to Your Account</h2>

      {/* Social Login */}
      <div className="social-login">
        <button className="social-btn google-btn">
          <FaGoogle className="icon" /> Google
        </button>
        <button className="social-btn github-btn">
          <FaGithub className="icon" /> GitHub
        </button>
      </div>

      {/* Separator */}
      <div className="separator"><span>or continue with email</span></div>

      {/* Email & Password Fields */}
      <div className="input-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" />
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#">Forgot Password?</a>
      </div>

      {/* Login Button */}
      <button className="login-btn">Login</button>

      {/* Create Account */}
      <p className="create-account">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
