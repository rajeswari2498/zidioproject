import React, { useState, useEffect } from "react";
import "./settings.css";

const Settings = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profilePic: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        username: storedUser.username || "",
        email: storedUser.email || "",
        oldPassword: "",  // Old password should not be prefilled
        newPassword: "",
        profilePic: storedUser.profilePic || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Stored User:", storedUser); // Debugging
    console.log("Entered Old Password:", user.oldPassword); // Debugging
    console.log("Stored Password:", storedUser ? storedUser.password : "No password found"); // Debugging

    // Check if old password matches
    if (!storedUser || storedUser.password !== user.oldPassword) {
      alert("Incorrect old password!");
      return;
    }

    // Update user details
    const updatedUser = {
      ...storedUser,
      username: user.username,
      email: user.email,
      password: user.newPassword ? user.newPassword : storedUser.password, // Keep old password if new is empty
      profilePic: user.profilePic || storedUser.profilePic,
    };

    // Save updated data to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile settings updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Old Password:</label>
          <input type="password" name="oldPassword" value={user.oldPassword} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {user.profilePic && <img src={user.profilePic} alt="Profile" className="profile-preview" />}
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
