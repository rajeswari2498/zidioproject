import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by email
    const existingUser = storedUsers.find(user => user.email === email);

    if (!existingUser) {
      setPopupMessage("❌ Email is not registered!");
    } else if (existingUser.password !== oldPassword) {
      setPopupMessage("❌ Incorrect old password!");
    } else if (newPassword !== confirmPassword) {
      setPopupMessage("❌ New password and confirm password do not match!");
    } else {
      // Update password
      existingUser.password = newPassword;
      localStorage.setItem("users", JSON.stringify(storedUsers));

      setPopupMessage("✅ Password updated successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div className="login-card">
      <h2>Reset Your Password</h2>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Old Password</label>
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button className="login-btn" onClick={handleResetPassword}>Reset Password</button>

      {popupMessage && <div className="popup"><p>{popupMessage}</p></div>}
    </div>
  );
};

export default ForgotPassword;
