import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";

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

      setPopupMessage(`✅ Welcome, ${existingUser.name}! Redirecting... as admin`);
      
      setTimeout(() => {
        navigate("/otp");
      }, 2000);
    }

    setTimeout(() => setPopupMessage(""), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

      <div className="flex justify-center mb-4">
        <button className="flex items-center justify-center w-1/2 p-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleOAuthLogin("google")}>
          <FaGoogle className="mr-2" /> Google
        </button>
        <button className="flex items-center justify-center w-1/2 p-2 bg-gray-800 text-white rounded hover:bg-gray-900" onClick={() => handleOAuthLogin("github")}>
          <FaGithub className="mr-2" /> GitHub
        </button>
      </div>

      <div className="relative text-center mb-4">
        <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-white px-2">or continue with email</span>
        <div className="border-t border-gray-300"></div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <Link to="/resetpassword" className="text-blue-500 hover:underline">Forgot Password?</Link>
      </div>

      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleLogin}>Login</button>

      <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
      </p>

      {popupMessage && <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded"><p>{popupMessage}</p></div>}
    </div>
  );
};

export default Login;
