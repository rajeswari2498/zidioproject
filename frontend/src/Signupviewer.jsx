"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FormInput = ({
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
  showPasswordToggle,
  onTogglePassword,
  isPassword,
  showPassword,
}) => {
  return (
    <div className="relative mb-4">
      <i
        className={`ti ti-${icon} absolute left-3 top-2/4 text-gray-400 -translate-y-2/4`}
      />
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className="px-11 py-4 w-full text-base text-black rounded-lg border border border-solid transition-all appearance-none bg-white bg-opacity-30 duration-[0.2s] ease-[ease-in-out] max-md:px-11 max-md:py-3.5 max-md:text-base max-sm:px-10 max-sm:py-3 max-sm:text-sm max-sm:rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showPasswordToggle && (
        <i
          role="button"
          className={`absolute right-3 top-2/4 text-gray-400 -translate-y-2/4 cursor-pointer ti ${
            showPassword ? "ti-eye-off" : "ti-eye"
          }`}
          tabIndex={0}
          aria-label={showPassword ? "Hide password" : "Show password"}
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
};

const AuthButton = ({ icon, label, variant = "light", onClick }) => {
  const baseStyles =
    "flex gap-3 justify-center items-center px-4 py-3 w-full text-base font-medium rounded-lg border border-solid transition-all cursor-pointer duration-[0.2s] ease-[ease]";

  const variants = {
    light:
      "bg-white border-gray-300 text-zinc-700 shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
    dark: "bg-zinc-800 border-zinc-800 text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

const AuthButtons = () => {
  return (
    <div className="flex gap-4 mb-6 w-full max-md:gap-3 max-sm:flex-col max-sm:gap-2.5">
      <AuthButton
        icon={
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="object-contain w-5 h-5"
          />
        }
        label="Google"
        variant="light"
      />
      <AuthButton
        icon={<i className="ti ti-brand-github text-lg" />}
        label="GitHub"
        variant="dark"
      />
    </div>
  );
};

const FormDivider = ({ text }) => {
  return (
    <div className="flex items-center mx-0 my-5 w-full text-sm text-gray-500">
      <span className="flex-1 h-px bg-gray-200" />
      <span className="px-4 py-0 text-black">{text}</span>
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );
};

const SignupAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex relative justify-center items-center px-5 py-0 w-full min-h-screen bg-fixed bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
      <button
        className="flex absolute top-5 left-5 gap-2 items-center px-6 py-3 text-base font-medium bg-lime-600 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] text-[white] z-[3] max-md:px-5 max-md:py-2.5 max-md:text-sm max-sm:top-3 max-sm:left-3 max-sm:px-4 max-sm:py-2 max-sm:text-sm"
        onClick={() => window.history.back()}
      >
        <i className="ti ti-arrow-left"/>
        <span>← Back</span>
      </button>

      <section className="relative px-7 py-9 mx-auto my-0 w-full rounded-2xl border border-solid transition-all backdrop-blur-[10px] bg-slate-500 border-white border-opacity-20 duration-[0.3s] ease-[ease] max-w-[520px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] z-[2] max-md:px-5 max-md:py-7 max-md:mx-auto max-md:my-0 max-md:max-w-full max-md:w-[90%] max-sm:px-4 max-sm:py-5 max-sm:mx-auto max-sm:my-0 max-sm:rounded-xl max-sm:shadow-[0_2px_12px_rgba(0,0,0,0.15)] max-sm:w-[95%]">
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <header className="flex justify-between items-center mb-8 w-full">
          <h1 className="text-3xl font-semibold text-black">Sign up</h1>
          <button className="px-4 py-2 text-sm font-medium bg-lime-600 rounded-md transition-all cursor-pointer border-[none] duration-[0.3s] ease-[ease] text-[white]">
            Viewer Account
          </button>
        </header>

        <AuthButtons />
        <FormDivider text="or continue with email" />

        <form className="w-full">
          <FormInput
            icon="user"
            placeholder="Full Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />

          <FormInput
            type="email"
            icon="mail"
            placeholder="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />

          <FormInput
            icon="lock"
            placeholder="Password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            isPassword={true}
            showPassword={showPassword}
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
              />
              <label htmlFor="terms">
                I agree to the Terms and Privacy Policy
              </label>
            </div>
          </div>

          <button
            className="p-4 w-full text-base font-medium text-white bg-lime-600 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease] min-h-[52px] max-sm:p-3.5 max-sm:text-base max-sm:min-h-12"
            disabled={isSubmitting}
            onClick={handleSubmit}
            style={{
              opacity: isSubmitting ? "0.7" : "1",
            }}
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>

          <footer className="mt-8 text-center text-gray-500">
            <span className="text-black">Already have an account?</span>
            <a href="#" className="ml-2 text-lime-600 no-underline">
              <Link to="/viewerlogin">Log in</Link> 
            </a>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default SignupAdmin;
