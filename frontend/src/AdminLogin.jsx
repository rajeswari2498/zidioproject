"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <button
      className="flex absolute top-5 left-5 gap-2 items-center px-6 py-3 text-base font-medium bg-lime-600 rounded-lg transition-all cursor-pointer border-none duration-200 ease text-white z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-sm:top-3 max-sm:left-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm"
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <i className="ti ti-arrow-left" aria-hidden="true" />
      <span>← Back</span>
    </button>
  );
};

const SocialLoginButtons = () => {
  return (
    <div className="flex gap-4 mb-6 w-full max-md:gap-3 max-sm:flex-col max-sm:gap-2.5">
      <button
        className="flex gap-3 justify-center items-center px-4 py-3 w-full text-base font-medium bg-white rounded-lg border border-gray-300 border-solid transition-all cursor-pointer duration-200 ease shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-zinc-700"
        aria-label="Sign in with Google"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt=""
          className="object-contain w-5 h-5"
          aria-hidden="true"
        />
        <span>Google</span>
      </button>
      <button
        className="flex gap-3 justify-center items-center px-4 py-3 w-full text-base font-medium text-white rounded-lg border border-solid transition-all cursor-pointer bg-zinc-800 duration-200 ease shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
        aria-label="Sign in with GitHub"
      >
        <i
          className="ti ti-brand-github text-xl text-white"
          aria-hidden="true"
        />
        <span>GitHub</span>
      </button>
    </div>
  );
};

const Divider = ({ text }) => {
  return (
    <div className="flex items-center mx-0 my-5 w-full text-sm text-gray-500">
      <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
      <span className="px-4 py-0 text-lime-600">{text}</span>
      <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
    </div>
  );
};

const EmailLoginForm = ({ onSubmit, isSubmitting }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative mb-4">
        <i
          className="ti ti-mail absolute left-3 top-2/4 text-gray-400 -translate-y-2/4"
          aria-hidden="true"
        />
        <input
          className="px-11 py-4 w-full text-base text-black rounded-lg border border-solid transition-all appearance-none bg-white bg-opacity-30 duration-200 ease-in-out max-md:px-11 max-md:py-3.5 max-md:text-base max-sm:px-10 max-sm:py-3 max-sm:text-sm max-sm:rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
        />
      </div>

      <div className="relative mb-6">
        <i
          className="ti ti-lock absolute left-3 top-2/4 text-gray-400 -translate-y-2/4"
          aria-hidden="true"
        />
        <input
          className="px-10 py-3 w-full text-base text-black rounded-lg border border-solid bg-white bg-opacity-30"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <button
          type="button"
          className="absolute right-3 top-2/4 text-gray-400 -translate-y-2/4 cursor-pointer"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <i
            className={showPassword ? "ti ti-eye-off" : "ti ti-eye"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            aria-label="Remember me"
          />
          <label htmlFor="remember" className="text-black">
            Remember me
          </label>
        </div>
        <a href="#" className="text-lime-600 no-underline hover:underline">
        <Link to="/resetpassword">Forget Password?</Link> 
        </a>
      </div>

      <button
        type="submit"
        className="p-4 w-full text-base font-medium text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-none duration-200 ease min-h-[52px] max-sm:p-3.5 max-sm:text-base max-sm:min-h-12 disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." :<Link to="/admin">Log in</Link>}
      </button>

      <div className="mt-8 text-center text-gray-500">
        <span className="text-black">Don't have an account? </span>
        <a href="#" className="text-lime-600 no-underline hover:underline">
          <Link to="/signupadmin">Create an account</Link> 
        </a>
      </div>
    </form>
  );
};

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (email, password, rememberMe) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Handle successful login here
    } catch (error) {
      // Handle error here
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative px-7 py-9 mx-auto my-0 w-full rounded-2xl border border-solid transition-all backdrop-blur-[10px] bg-slate-500 border-white border-opacity-10 duration-300 ease max-w-[520px] shadow-[0_4px_24px_rgba(0,0,0,0.2)] z-[2] max-md:px-5 max-md:py-7 max-md:mx-auto max-md:my-0 max-md:max-w-full max-md:w-[90%] max-sm:px-4 max-sm:py-5 max-sm:mx-auto max-sm:my-0 max-sm:rounded-xl max-sm:shadow-[0_2px_12px_rgba(0,0,0,0.15)] max-sm:w-[95%]">
      <header className="flex justify-between items-center mb-8 w-full">
        <h1 className="text-3xl font-semibold text-black">Log in</h1>
        <div className="flex relative gap-2 items-center p-1 bg-sky-800 rounded-lg">
          <button className="relative px-5 py-2.5 w-full text-sm font-medium bg-lime-600 rounded-md transition-all cursor-pointer border-none duration-200 ease min-h-9 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-white z-[1] max-md:px-4 max-md:py-2 max-md:text-sm max-md:min-w-20 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-sm max-sm:min-h-10 max-sm:min-w-[70px]">
            As Admin
          </button>
        </div>
      </header>

      <SocialLoginButtons />
      <Divider text="or continue with email" />
      <EmailLoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </section>
  );
};

const AdminLogin = () => {
  return (
    <main className="flex relative justify-center items-center px-5 py-0 w-full min-h-screen bg-fixed bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
      <BackButton />
      <LoginForm />
    </main>
  );
};

export default AdminLogin;
