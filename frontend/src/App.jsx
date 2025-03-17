"use client";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InputDesign from "./InputDesign";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import SelectRole from "./SelectRole";
import AdminLogin from "./AdminLogin";
import ViewerLogin from "./ViewerLogin";
import SignupAdmin from "./SignupAdmin";
import SignupViewer from "./Signupviewer";
import ResetPassword from "./ResetPassword";
import Verified from "./Verified";
import ViewerResetPassword from "./ViewerResetPassword";
import ViewerVerified from "./ViewerVerified";
import Communication from "./Communication";
import Report from "./Report";
import ViewerAdminDashboard from "./ViewerAdminDashboard";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputDesign />} />
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/viewerlogin" element={<ViewerLogin/>}/>
        <Route path="/signupadmin" element={<SignupAdmin/>}/>
        <Route path="/signupviewer" element={<SignupAdmin/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/verified" element={<Verified/>}/>
        <Route path="/viewerresetpassword" element={<ViewerResetPassword/>}/>
        <Route path="/viewerverified" element={<ViewerVerified/>}/>
        <Route path="/communication" element={<Communication/>}/>
        <Route path="/report" element={<Report/>}/>
        <Route path="/vieweradmindashboard" element={<ViewerAdminDashboard/>}/>
        


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

