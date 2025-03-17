"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <button
      className="absolute top-5 left-5 px-6 py-3 text-base font-bold text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-none duration-200 ease z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-md:left-[15px] max-md:top-[15px] max-sm:top-2.5 max-sm:left-2.5 max-sm:px-4 max-sm:py-2 max-sm:text-sm max-sm:rounded-md"
      onClick={() => window.history.back()}
      aria-label="Go back to previous page"
    >
      ← Back
    </button>
  );
};

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  error,
  autoComplete = "new-password",
  minLength = "8",
  pattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <input
          className="p-4 w-full text-base text-black rounded-lg border border-solid bg-white bg-opacity-90 border-white border-opacity-20"
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          pattern={pattern}
          type={showPassword ? "text" : "password"}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="flex absolute right-4 top-2/4 items-center p-0 text-xl -translate-y-2/4 cursor-pointer border-none text-white text-opacity-70"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <span>👁️</span> : <span>👁️‍🗨️</span>}
        </button>
      </div>
      {error && (
        <div className="absolute mt-1 text-xs text-red-500" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    if (!/\d/.test(value)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[A-Za-z]/.test(value)) {
      setPasswordError("Password must contain at least one letter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    validatePassword(value);
    if (confirmPassword) {
      validateConfirmPassword();
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    validateConfirmPassword();
  };

  const handleSubmit = async () => {
    if (!validatePassword(password) || !validateConfirmPassword()) {
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-white max-md:text-2xl max-sm:text-2xl">
        Reset Password
      </h1>
      <p className="mb-8 text-base text-white text-opacity-80">
        Enter your new password below
      </p>
      <div className="flex flex-col gap-4 w-full">
        <PasswordInput
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
        />
      </div>
      <div className="flex flex-col gap-4 mt-6 w-full">
        <button
          className="px-6 py-4 w-full text-base font-semibold text-white rounded-lg transition-all cursor-pointer bg-lime-600 bg-opacity-70 border-none duration-200 ease disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Confirming..." :  <Link to="/verified">Confirm</Link> }
         
        </button>
      </div>
    </>
  );
};

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-white max-md:text-2xl max-sm:text-2xl">
        Reset Password
      </h1>
      <p className="mb-8 text-base text-white text-opacity-80">
        Enter your email to receive reset instructions
      </p>
      <div className="flex flex-col gap-4 items-center mx-auto my-0 w-full max-w-xs">
        <input
          className="p-4 w-full text-base text-white rounded-lg border border-solid bg-white bg-opacity-10 border-white border-opacity-20"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button
          className="px-6 py-4 w-full text-base font-semibold rounded-lg transition-all cursor-pointer bg-lime-600 bg-opacity-70 duration-200 ease text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          onClick={handleForgotPassword}
        >
          {isSubmitting ? "Sending..." : "Reset Password"}
        </button>
        <button
          className="mt-2 text-sm underline cursor-pointer border-none text-white text-opacity-80"
          onClick={onBack}
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

const ResetPassword = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <main
      className="flex justify-center items-center p-5 w-full min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')]"
      role="main"
    >
      <BackButton />
      <section
        className="relative p-8 mx-auto my-0 rounded-xl border border-solid bg-slate-500 border-white border-opacity-30 max-w-[460px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-[90%] z-[2] max-md:p-7 max-md:max-w-[440px] max-sm:p-5 max-sm:rounded-lg max-sm:w-[95%]"
        aria-label="Login form container"
      >
        <div className="mb-8 text-center">
          {isForgotPassword ? (
            <ForgotPasswordForm onBack={() => setIsForgotPassword(false)} />
          ) : (
            <ResetPasswordForm />
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
