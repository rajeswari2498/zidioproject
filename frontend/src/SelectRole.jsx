"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SelectRole = () => {
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="flex justify-center items-center p-5 w-full min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')]"
      role="main"
    >
      <button
        className="absolute top-5 left-5 px-6 py-3 text-base font-bold text-white bg-lime-600 rounded-lg border-white border-solid transition-all cursor-pointer border-[3px] duration-[0.2s] ease-[ease] z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-md:left-[15px] max-md:top-[15px] max-sm:top-2.5 max-sm:left-2.5 max-sm:px-4 max-sm:py-2 max-sm:text-sm max-sm:rounded-md"
        onClick={() => window.history.back()}
        aria-label="Go back to previous page"
      >
        ← Back
      </button>

      <section className="relative p-8 mx-auto my-0 rounded-xl border border-solid bg-slate-500 border-white border-opacity-30 max-w-[460px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-[90%] z-[2] max-md:p-7 max-md:max-w-[440px] max-sm:p-5 max-sm:rounded-lg max-sm:w-[95%]">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white max-md:text-2xl max-sm:text-2xl">
            Please Select Your Role
          </h1>
          <p className="mb-8 text-base text-white text-opacity-80">
            Choose your role to access the appropriate dashboard
          </p>

          <div
            className="flex flex-col gap-4 items-center mx-auto my-0 w-full max-w-xs"
            role="radiogroup"
            aria-label="User role selection"
          >
            <button
              className="px-6 py-4 w-full text-base font-semibold text-white rounded-lg transition-all cursor-pointer duration-[0.2s] ease-[ease]"
              onClick={() => setUserType("admin")}
              style={{
                backgroundColor:
                  userType === "admin"
                    ? "rgba(103, 148, 54, 0.7)"
                    : "transparent",
              }}
              role="radio"
              aria-checked={userType === "admin"}
              tabIndex={userType === "admin" ? 0 : -1}
            >
             <Link to="/adminlogin">Admin</Link> 
            </button>
            <button
              className="px-6 py-4 w-full text-base font-semibold text-white rounded-lg transition-all cursor-pointer duration-[0.2s] ease-[ease]"
              onClick={() => setUserType("viewer")}
              style={{
                backgroundColor:
                  userType === "viewer"
                    ? "rgba(103, 148, 54, 0.7)"
                    : "transparent",
              }}
              role="radio"
              aria-checked={userType === "viewer"}
              tabIndex={userType === "viewer" ? 0 : -1}
            >
              <Link to="/viewerlogin">Viewer</Link> 
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectRole;
