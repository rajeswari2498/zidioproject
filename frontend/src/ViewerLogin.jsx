"use client";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <button
      className="flex absolute top-5 left-5 gap-2 items-center px-6 py-3 text-base font-medium bg-lime-600 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] text-[white] z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-sm:top-3 max-sm:left-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm"
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <i className="ti ti-arrow-left" aria-hidden="true" />
      <span>← Back</span>
    </button>
  );
}

function FormInput({
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  showPasswordToggle,
  onTogglePassword,
  isPasswordVisible,
}) {
  return (
    <div className="relative">
      <i
        className={`ti ti-${icon} absolute left-3 top-2/4 text-gray-400 -translate-y-2/4`}
        aria-hidden="true"
      />
      <input
        className="px-11 py-4 w-full text-base text-black rounded-lg border border-solid transition-all appearance-none bg-white bg-opacity-30 duration-[0.2s] ease-[ease-in-out] max-md:px-11 max-md:py-3.5 max-md:text-base max-sm:px-10 max-sm:py-3 max-sm:text-sm max-sm:rounded-md"
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
      {showPasswordToggle && (
        <i
          role="button"
          className={`absolute right-3 top-2/4 text-gray-400 -translate-y-2/4 cursor-pointer ti ${
            isPasswordVisible ? "ti-eye-off" : "ti-eye"
          }`}
          tabIndex={0}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          onClick={onTogglePassword}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onTogglePassword();
            }
          }}
        />
      )}
    </div>
  );
}

function SocialLoginButtons() {
  return (
    <div className="flex gap-4 mb-6 w-full max-md:gap-3 max-sm:flex-col max-sm:gap-2.5">
      <button
        className="flex gap-3 justify-center items-center px-4 py-3 w-full text-base font-medium bg-white rounded-lg border border-gray-300 border-solid transition-all cursor-pointer duration-[0.2s] ease-[ease] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-zinc-700"
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
        className="flex gap-3 justify-center items-center px-4 py-3 w-full text-base font-medium text-white rounded-lg border border-solid transition-all cursor-pointer bg-zinc-800 duration-[0.2s] ease-[ease] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
        aria-label="Sign in with GitHub"
      >
        <i
          className="ti ti-brand-github text-xl text-[white]"
          aria-hidden="true"
        />
        <span className="text-[white]">GitHub</span>
      </button>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <header className="flex justify-between items-center mb-8 w-full">
        <h1 className="text-3xl font-semibold text-black">Log in</h1>
        <div className="flex relative gap-2 items-center p-1 bg-sky-800 rounded-lg">
          <button
            type="button"
            className="relative px-5 py-2.5 w-full text-sm font-medium bg-lime-600 rounded-md transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] min-h-9 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[white] z-[1] max-md:px-4 max-md:py-2 max-md:text-sm max-md:min-w-20 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-sm max-sm:min-h-10 max-sm:min-w-[70px]"
          >
            As Viewer
          </button>
        </div>
      </header>

      <SocialLoginButtons />

      <div className="flex items-center mx-0 my-5 w-full text-sm text-gray-500">
        <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
        <span className="px-4 py-0 text-lime-600">or continue with email</span>
        <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
      </div>

      <div className="w-full">
        <div className="relative mb-4">
          <FormInput
            type="email"
            icon="mail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <FormInput
            type="password"
            icon="lock"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            isPasswordVisible={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="text-[white]">
              Remember me
            </label>
          </div>
          <a href="#" className="text-lime-600 no-underline hover:underline">
            <Link to="/viewerresetpassword">Forget Password?</Link> 
          </a>
        </div>

        <button
          type="submit"
          className="p-4 w-full text-base font-medium text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] min-h-[52px] max-sm:p-3.5 max-sm:text-base max-sm:min-h-12 disabled:opacity-70"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Logging in..." : <Link to="/vieweradmindashboard">Log in</Link> }
        </button>

        <div className="mt-8 text-center text-gray-500">
          <span className="text-[white]">Don't have an account? </span>
          <a href="#" className="text-lime-600 no-underline hover:underline">
            <Link to="/signupviewer">Create an account</Link> 
          </a>
        </div>
      </div>
    </form>
  );
}

export default function ViewerLogin() {
  return (
    <main className="flex relative justify-center items-center px-5 py-0 w-full min-h-screen bg-fixed bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
      <BackButton />
      <section className="relative px-7 py-9 mx-auto my-0 w-full rounded-2xl border border-solid transition-all backdrop-blur-[10px] bg-slate-500 border-white border-opacity-10 duration-[0.3s] ease-[ease] max-w-[520px] shadow-[0_4px_24px_rgba(0,0,0,0.2)] z-[2] max-md:px-5 max-md:py-7 max-md:mx-auto max-md:my-0 max-md:max-w-full max-md:w-[90%] max-sm:px-4 max-sm:py-5 max-sm:mx-auto max-sm:my-0 max-sm:rounded-xl max-sm:shadow-[0_2px_12px_rgba(0,0,0,0.15)] max-sm:w-[95%]">
        <LoginForm />
      </section>
    </main>
  );
}
