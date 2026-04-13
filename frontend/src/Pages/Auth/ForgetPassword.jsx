import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import Style from "./Signin.module.css";
import miniLogo from "../../assets/logo-bg.png";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaEnvelope } from "react-icons/fa";
import bgImage from "../../assets/mountainImage.jpg";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  const validateFields = () => {
    const errors = {};
    if (!credentials.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Enter a valid email address.";
    }

    return errors;
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/forgot-password/initiate`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Show success message or transition UI
      toast.success("Mail Sent Successfully");
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);

      // Optionally reset form fields
      setCredentials({ email: "" });
    } catch (err) {
      if (err.response?.status === 403) {
        // server responded with error (403, 401, etc.)
        toast.error(err.response.data || "Invalid email");
        setError("Invalid email");
      }
      if (err.response?.status === 503) {
        toast.error(err.response.data || "Service Unavailable");
      } else if (err.request) {
        toast.error("No response from server");
      } else {
        toast.error("Unexpected error: " + err.message);
        setError("Unexpected error. Try again later");
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
    <div>
      <section className="min-h-screen w-full bg-cover bg-center flex items-center justify-center bg-white p-6 relative overflow-hidden"
              style={{ backgroundImage: `url(${bgImage})` }}
      
      >

        <div
          className={`relative my-12 bg-white rounded-2xl shadow-2xl border border-green-500 transition-all 
                  duration-500 py-15 ${isExpanded ? "w-[600px]" : "w-[500px]"}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div style={{ marginBottom: "-40px" }}>
            <img
              src={miniLogo}
              alt="logo"
              className="w-35 h-25 md:w-20 md:h-19 mb-5 border-radius mt- mx-auto object-contain "
            />
          </div>
          <div className="p-8 space-y-6">
            {/* ANIMATE HEADER */}
            <div className="text-center group">
              <h1
                className="text-xl font-bold bg-black
                        bg-clip-text text-transparent inline-block"
              >
                FORGOT PASSWORD
              </h1>
              <div
                className="h-1 bg-green-500 w-20 mx-auto 
                        mt-2 rounded-full transform group-hover:scale-x-150 transition-all"
              />
              <p className="font-Montserrat mt-3 mb-2 text-gray-700 text-center leading-[1.1]">
                <span className="text-lg mb-1 text-white">Instructions:</span>{" "}
                <br /> Enter the email address associated with your account.{" "}
                <br className="text-lg mb-2 leading-relaxed font-poppins mt-1 md:block text-white" />{" "}
                We'll send you a token to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 border border-green-500 rounded-lg text-black
              placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>

              {validationErrors.email && (
                <p className={Style.error}>{validationErrors.email}</p>
              )}

              {/* SUBMIT BTM */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-green-900 hover:bg-green-700 text-white cursor-pointer
                                font-bold rounded-lg flex items-center justify-center space-x-2 
                                transition-all hover:scale-[1.02] shadow-lg"
              >
                <RiSendPlaneFill className="animate-bounce" />
                <span>{isSubmitting ? "Sending..." : "Send"}</span>
              </button>
              <p className="flex items-center justify-center text-green-500">
                <Link to="/" className="ml-2 hover:underline text-green-700">
                  Go Back
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ForgetPassword;
