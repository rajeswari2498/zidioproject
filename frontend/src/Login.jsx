"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, validate credentials here
    if (credentials.email && credentials.password) {
      // Simple validation for demo
      navigate("/admin");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F5df8c00e19744252b631cb11d36a5da1%2F66e052488824fd42c29c46e9a02d5615a6d59d1611ee3d92ea059e3f96cce4c4"
            alt="Logo"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-sky-800">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Sign in
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <i className="ti ti-arrow-left" />
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default Login;
