import React, { useState } from "react";
import profilePic1 from "../../assets/profile1.jpg";
import profilePic2 from "../../assets/profile2.jpg";
import profilePic3 from "../../assets/profile3.jpg";
import logo from "../../assets/icon.png";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Components/Authentication/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateFields = () => {
    const errors = {};
    if (!credentials.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!credentials.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const handleHome = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      // ✅ Call login to update global context
      login(data.token, data.user);

      toast.success("Logged In Successfully");
      setTimeout(() => {
        if (data.user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 3000);

      // Optionally reset form fields
      setCredentials({ email: "", password: "" });
    } catch (err) {
      if (err.response?.status === 403) {
        // server responded with error (403, 401, etc.)
        toast.error(err.response.data || "Invalid email or password");
      } else if (err.request) {
        toast.error("No response from server");
      } else {
        toast.error("Unexpected error: " + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setError(""); // Clear error when modifying input
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <div
                className="absolute -inset-1
                                 blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-rotate"
              />
              <div
                className="relative px-4 py-2 
                                 leading-none backdrop-blur-sm"
              >
                <button onClick={handleHome}>
                  <img
                    src={logo}
                    alt="DCG"
                    className="w-[130px] h-[40px] cursor-pointer object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="min-h-screen w-full bg-white bg-center mt-15 relative"
   
      >
        {/* Overlay */}
        <div className="absolute inset-0"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex justify-center items-center px-6 py-16">
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12">
            {/* LEFT — SIGN IN */}
            <div className="bg-white shadow-xl p-10 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Sign In
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-xs tracking-wide text-gray-600 mb-2">
                    EMAIL
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-xs tracking-wide text-gray-600 mb-2">
                    PASSWORD
                  </label>
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                  {passwordVisible ? (
                    <RiEyeFill
                      onClick={togglePasswordVisibility}
                      className=" absolute right-3 bottom-1/7 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                    />
                  ) : (
                    <RiEyeOffFill
                      onClick={togglePasswordVisibility}
                      className=" absolute right-3 bottom-1/7 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                    />
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  <span>{isSubmitting ? "Logging in..." : "Log In"}</span>
                </button>

                <Link
                  to="/forget-password"
                  className="text-sm text-blue-700 hover:underline block"
                >
                  Forgot Password?
                </Link>
                <p className="flex items-center justify-center">
                  <a
                    href="/register"
                    className="text-sm text-blue-700 hover:underline block text-center"
                  >
                    No account? Register
                  </a>
                </p>
              </div>
            </div>

            {/* RIGHT — VISITORS */}
            <div className="hidden md:flex flex-col justify-center text-black space-y-6">
              <h1 className="text-4xl font-bold">Welcome back Peer</h1>

              <p className="text-gray-800">See what your friends are up to.</p>

              <div className="flex gap-3">
                {/* Profile Image */}
                          <div className="relative">
                            <img
                              src={profilePic1}
                              alt="profile"
                              className="w-10 h-10 rounded-full object-cover border-4 border-white shadow"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                    <div className="relative">
                            <img
                              src={profilePic2}
                              alt="profile"
                              className="w-10 h-10 rounded-full object-cover border-4 border-white shadow"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                              <div className="relative">
                            <img
                              src={profilePic3}
                              alt="profile"
                              className="w-10 h-10 rounded-full object-cover border-4 border-white shadow"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}
