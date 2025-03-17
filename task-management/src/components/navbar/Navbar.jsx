import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUsers,
  FaChartBar,
  FaEnvelope,
  FaUserPlus,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showInviteDropdown, setShowInviteDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.fullName) {
      setFullName(storedUserData.fullName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setFullName(""); // Reset full name
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {!isLoggedIn ? (
        // Show only Login & Signup when not logged in
        <div className="nav-auth-container">
          <h1 className="app-title">Zidio Task Management</h1>
          <div className="auth-buttons">
            <button className="auth-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="auth-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Left: Logo */}
          <div className="nav-left">
            <img
              src="/images/zidio_development_logo.jpg"
              alt="Zidio Logo"
              className="logo"
            />
          </div>

          {/* Center: Navigation Menu */}
          <div className="nav-center">
            {/* People Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
              >
                People <FaUsers className="dropdown-icon" />
              </button>
              {showPeopleDropdown && (
                <div className="dropdown-menu">
                  <button>View People</button>
                  <button>Manage Teams</button>
                  <button>Add People</button>
                </div>
              )}
            </div>

            {/* Reports Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => setShowReportsDropdown(!showReportsDropdown)}
              >
                Report <FaChartBar className="dropdown-icon" />
              </button>
              {showReportsDropdown && (
                <div className="dropdown-menu">
                  <button>Weekly Reports</button>
                  <button>Monthly Analysis</button>
                  <button>Annual Summary</button>
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <Link to="/messages" className="nav-icon-link">
              <FaEnvelope className="nav-icon" title="Messages" />
            </Link>

            {/* Search Input */}
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <FaSearch className="search-icon" />
            </div>

            {/* Invite Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => setShowInviteDropdown(!showInviteDropdown)}
              >
                Invite <FaUserPlus className="dropdown-icon" />
              </button>
              {showInviteDropdown && (
                <div className="dropdown-menu">
                  <button>Invite via Email</button>
                  <button>Invite via Link</button>
                </div>
              )}
            </div>
          </div>

          {/* Right: User Profile */}
          <div className="nav-right">
            <div className="user-icon-container">
              <FaUserCircle
                className="user-icon"
                title="User Profile"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && (
                <div className="dropdown-menu user-dropdown">
                  <p className="dropdown-item">Hi, {fullName}!</p>
                  <hr />
                  <p className="dropdown-item" onClick={() => navigate("/settings")}>
                    Settings
                  </p>
                  <p className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
