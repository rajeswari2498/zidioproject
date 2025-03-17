"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const BackButton = () => {
  return (
    <button
      className="absolute top-5 left-5 px-6 py-3 text-base font-bold text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-none duration-200 ease z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-md:left-[15px] max-md:top-[15px] max-sm:top-2.5 max-sm:left-2.5 max-sm:px-4 max-sm:py-2 max-sm:text-sm max-sm:rounded-md hover:bg-lime-700"
      onClick={() => window.history.back()}
      aria-label="Go back to previous page"
    >
      ← Back
    </button>
  );
};

const SuccessAnimation = () => {
  return (
    <div className="flex relative justify-center items-center mb-5 rounded-full bg-lime-600 bg-opacity-20 h-[120px] w-[120px]">
      <svg
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        className="animate-[checkmark_0.4s_ease-in-out_0.4s_both] scale-[1.2]"
        role="img"
        aria-label="Success checkmark"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex absolute justify-between items-center w-40 h-40 animate-[rotate_10s_linear_infinite]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-1 h-1 rounded-full bg-white bg-opacity-60"
            style={{
              transform: `rotate(${index * 60}deg) translateX(80px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ForgotPasswordForm = ({
  email,
  setEmail,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center mx-auto my-0 w-full max-w-xs">
      <h1 className="mb-2 text-3xl font-bold text-white max-md:text-2xl max-sm:text-2xl">
        Reset Password
      </h1>
      <p className="mb-8 text-base text-white text-opacity-80">
        Enter your email to receive reset instructions
      </p>
      <input
        className="p-4 w-full text-base text-white rounded-lg border border-solid bg-white bg-opacity-10 border-white border-opacity-20"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        className="px-6 py-4 w-full text-base font-semibold text-white rounded-lg transition-all cursor-pointer bg-lime-600 bg-opacity-70 duration-200 ease hover:bg-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Sending..." : "Reset Password"}
      </button>
      <button
        className="mt-2 text-sm underline cursor-pointer border-none text-white text-opacity-80 hover:text-opacity-100"
        onClick={onBack}
      >
        Back to Login
      </button>
    </div>
  );
};

const PasswordResetSuccess = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <SuccessAnimation />
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold text-center text-white max-md:text-3xl max-sm:text-2xl">
          Password Changed Successfully
        </h1>
        <p className="text-lg leading-normal text-center text-white text-opacity-90 max-md:text-base max-sm:text-base">
          Your password has been successfully updated. You can now log in with
          your new password.
        </p>
        <button
          className="px-8 py-4 mt-4 text-base font-semibold text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-none duration-200 ease w-fit max-md:px-7 max-md:py-3.5 max-md:text-base max-sm:px-6 max-sm:py-3 max-sm:text-sm hover:bg-lime-700"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

function Verified() {
  const [userType, setUserType] = useState("admin");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setEmail("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleForgotPassword = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toggleForgotPassword();
  };

  return (
    <>
      <style>
        {`
          @keyframes checkmark {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <main className="flex justify-center items-center p-5 w-full min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')]">
        <BackButton />
        <section className="flex relative flex-col p-8 mx-auto my-0 rounded-xl border border-solid backdrop-blur-[10px] bg-slate-500 border-white border-opacity-20 max-w-[460px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] w-[90%] z-[2] max-md:p-7 max-md:max-w-[440px] max-sm:p-5 max-sm:rounded-lg max-sm:w-[95%]">
          <div className="box-border relative shrink-0 self-center px-4 py-0 mt-5 h-auto text-2xl font-semibold leading-normal text-center text-white max-md:mt-4 max-md:text-2xl max-sm:mt-3 max-sm:text-xl">
            Password Changed Successfully
          </div>
          <button
            className="box-border relative shrink-0 px-8 py-4 mt-5 text-base font-semibold text-center text-white bg-lime-600 rounded-lg transition-all appearance-none cursor-pointer border-none duration-200 ease hover:bg-lime-700 max-md:px-7 max-md:py-3.5 max-md:text-base max-sm:px-6 max-sm:py-3 max-sm:text-sm"
            onClick={() => (window.location.href = "/adminlogin")}
          >
            Move to Login
          </button>
          <div className="mb-8 text-center">
            {!isForgotPassword && (
              <>
                {isSuccess ? (
                  <PasswordResetSuccess />
                ) : (
                  <div className="flex flex-col gap-4 w-full" />
                )}
              </>
            )}

            {isForgotPassword && (
              <ForgotPasswordForm
                email={email}
                setEmail={setEmail}
                isSubmitting={isSubmitting}
                onSubmit={handleForgotPassword}
                onBack={toggleForgotPassword}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Verified;
