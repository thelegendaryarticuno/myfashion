import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSendOtp = async () => {
    if (!emailOrPhone) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(
        "https://myfashion-backend-axwh.onrender.com/otp/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhone,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setError("");
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      const response = await fetch(
        "https://myfashion-backend-axwh.onrender.com/otp/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhone,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.message === "OTP verification successful") {
        setOtpVerified(true);
        setError("");
      } else if (data.message === "OTP has expired") {
        setShowResendButton(true);
        setError(data.message);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch(
        "https://myfashion-backend-axwh.onrender.com/otp/resend-otp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhone,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setShowResendButton(false);
        setError("");
      } else {
        setError(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleLogin = async () => {
    if (!sellerId || !emailOrPhone || !password || !otpVerified) {
      setError("Please fill all fields and verify OTP.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerId,
          emailOrPhone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        navigate(`/admin/${data.sellerId}`);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Taylorzone</title>
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back to Taylorzone Admin Dashboard
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="sellerId"
                placeholder="Seller ID *"
                required
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f] transition-colors"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                name="emailOrPhone"
                placeholder="Email Address *"
                required
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f] transition-colors"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>

            { !otpSent ? (
              <button
                type="button"
                className="w-full bg-black text-white py-3 px-4 hover:bg-gray-800 transition-colors"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP *"
                  maxLength="6"
                  required
                  className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f] transition-colors"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 6) {
                      setOtp(value);
                      if (value.length === 6) {
                        handleVerifyOtp(value);
                      }
                    }
                  }}
                />
              </div>
            )}

            {showResendButton && (
              <button
                type="button"
                className="w-full bg-black text-white py-3 px-4 hover:bg-gray-800 transition-colors"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                required
                className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#8b6d3f] transition-colors pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500 hover:text-[#8b6d3f] transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div>
              <button
                type="button"
                className={`w-full bg-black text-white py-3 px-4 hover:bg-gray-800 transition-colors ${
                  !otpVerified ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleLogin}
                disabled={!otpVerified}
              >
                Login
              </button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs text-center text-gray-600"
          >
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#8b6d3f] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#8b6d3f] hover:underline">
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;