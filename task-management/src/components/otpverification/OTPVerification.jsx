import React, { useState } from "react"; // ✅ Removed useEffect
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import "./Otpverification.css";

const OTPVerification = ({ setIsVerified }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Generate OTP function
  const generateOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setGeneratedOtp(otpCode);
    setOtpSent(true);
  };

  // Copy OTP to clipboard
  const copyOtp = () => {
    if (generatedOtp) {
      navigator.clipboard.writeText(generatedOtp.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Validate OTP and proceed
  const handleOTPSubmit = () => {
    if (otp.trim() === generatedOtp?.toString()) {
      localStorage.setItem("isVerified", "true");
      setIsVerified(true);
      navigate("/dashboard");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>

      {!otpSent ? (
        <>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            className="otp-input"
          />
          {mobileError && <p className="error">{mobileError}</p>}
          <button onClick={generateOtp} className="otp-button">
            Get OTP
          </button>
        </>
      ) : (
        <>
          <p>OTP sent to: <strong>{mobile}</strong></p>

          <div className="otp-message">
            <p>OTP: <strong>{generatedOtp}</strong></p>
            <FaCopy className="copy-icon" onClick={copyOtp} title="Copy OTP" />
            {copied && <span className="copied-message">Copied!</span>}
          </div>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="otp-input"
          />

          {error && <p className="error">{error}</p>}

          <button onClick={handleOTPSubmit} className="otp-button">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default OTPVerification;
