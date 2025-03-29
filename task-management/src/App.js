import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import OTPVerification from "./components/otpverification/OTPVerification";
import Dashboard from "./components/dashboard/Dashboard";
import Message from "./components/message/Message";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Settings from "./components/settings/Settings";  // Import Settings Page

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const verifiedStatus = localStorage.getItem("isVerified");

    if (userData) setIsAuthenticated(true);
    if (verifiedStatus === "true") setIsVerified(true);
  }, []);

  return (
    <Router>
      {isAuthenticated && isVerified ? <Navbar /> : <Navbar showAuthButtons />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/otp" element={<OTPVerification setIsVerified={setIsVerified} />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated && isVerified ? <Dashboard /> : <Navigate to="/otp" />} 
        />
        <Route 
          path="/messages" 
          element={isAuthenticated && isVerified ? <Message /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated && isVerified ? <Settings /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
