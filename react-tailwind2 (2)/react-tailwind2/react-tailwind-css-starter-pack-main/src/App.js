import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import LoginUser from './LoginUser';
import SelectRole from './Selectrole';
import SignUpAsAdmin from './SignUpAsAdmin';
import SignupUser from './SignUpUser';
import Communication1 from './Communication1';
import OTPVerification from './OtpVerification';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ViewerOtp from './ViewerOtp';
import ViewerDashboard from './ViewerDashboard';
import Report from './Report';
import ResetPassword from './ResetPassword';
import Verified from './Verified';
import MeetingRoom from './Meetings';

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem("userData");
      const verifiedStatus = localStorage.getItem("isVerified");

      setIsAuthenticated(!!userData);
      setIsVerified(verifiedStatus === "true");
    };

    handleStorageChange(); // Ensure state is updated on initial render
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

    // ✅ Define username here
    const username = JSON.parse(localStorage.getItem("userData"))?.username || "guest";

  return (
    <Router>
      <Navbar showAuthButtons={!isAuthenticated || !isVerified} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/signup" element={<SignUpAsAdmin />} />
        <Route path="/signupuser" element={<SignupUser />} />
        <Route path="/otp" element={<OTPVerification setIsVerified={setIsVerified} />} />
        <Route path="/viewerotp" element={<ViewerOtp setIsVerified={setIsVerified} />} />

        {/* Dashboard access based on authentication & verification */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated && isVerified ? <Dashboard /> : <Navigate to="/otp" />} 
        />
        <Route 
          path="/viewerdashboard" 
          element={isVerified ? <ViewerDashboard /> : <Navigate to="/viewerotp" />} 
        />
        
        {/* Restricted routes requiring authentication */}
        <Route 
          path="/Communication1" 
          element={isAuthenticated && isVerified ? <Communication1 /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated && isVerified ? <Settings /> : <Navigate to="/login" />} 
        />
        <Route
  path="/meetings"
  element={isAuthenticated && isVerified ? <MeetingRoom username={username} /> : <Navigate to="/login" />}
/>

        <Route path='/report' element={<Report />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/verified' element={<Verified />} />
      </Routes>
    </Router>
  );
}

export default App;
