import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import bgImage from "../../assets/mountainImage.jpg";
import logo from "../../assets/icon.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";
import Style from "./Signin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordError, setPasswordError] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null); // true | false | null

  const checkEmailAvailability = useCallback(
    debounce(async (emailToCheck) => {
      try {
        const res = await axios.get(
          `${BASE_URL}/auth/check-email/${emailToCheck}`,
        );
        setEmailAvailable(!res.data?.email); // Fix: invert the boolean
        console.log("Email check response:", res.data);
      } catch (error) {
        setEmailAvailable(null); // fallback on error
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (user.email && /\S+@\S+\.\S+/.test(user.email)) {
      checkEmailAvailability(user.email);
    } else {
      setEmailAvailable(null);
    }
  }, [user.email, checkEmailAvailability]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateFields = () => {
    const errors = {};
    if (!user.firstName.trim()) errors.firstName = "First Name is required.";
    if (!user.lastName.trim()) errors.lastName = "Last Name is required.";
    if (!user.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!user.password.trim()) errors.password = "Password is required.";

    return errors;
  };

  const handleHome = () => navigate("/");

  const handleContact = () => {
    navigate("/contact");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Password strength checking logic
      const hasMinimumLength = user.password.length >= 8;
      const hasUppercase = /[A-Z]/.test(user.password);
      const hasLowercase = /[a-z]/.test(user.password);
      const hasNumber = /\d/.test(user.password);
      const hasSpecialCharacter = /[!@#$%^&*]/.test(user.password);

      if (
        !hasMinimumLength ||
        !hasUppercase ||
        !hasLowercase ||
        !hasNumber ||
        !hasSpecialCharacter
      ) {
        setError(
          "Password must meet the following criteria:\n" +
            "- Minimum 8 characters\n" +
            "- At least one uppercase letter\n" +
            "- At least one lowercase letter\n" +
            "- At least one number\n" +
            "- At least one special character (!@#$%^&*)",
        );
        return;
      }
      const errors = validateFields();
      setValidationErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setIsSubmitting(true); // Start loading
      setError("");

      if (emailAvailable === false) {
        setError("Email already exists.");
        return;
      }

      const response = await axios.post(`${BASE_URL}/auth/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Show success message or transition UI
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error("Registration failed");
      }

      // Optionally reset form fields
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response) {
        // server responded with error (403, 401, etc.)
        toast.error(err.response.data || "Error occured during registration");
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
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    // Password strength checking logic
    const hasMinimumLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(value);

    // Create an object to store the error messages with their respective conditions
    const errors = {
      hasMinimumLength: {
        message: "Minimum 8 characters",
        isMet: hasMinimumLength,
      },
      hasUppercase: {
        message: "At least one uppercase letter",
        isMet: hasUppercase,
      },
      hasLowercase: {
        message: "At least one lowercase letter",
        isMet: hasLowercase,
      },
      hasNumber: {
        message: "At least one number",
        isMet: hasNumber,
      },
      hasSpecialCharacter: {
        message: "At least one special character (!@#$%^&*)",
        isMet: hasSpecialCharacter,
      },
    };

    // Generate the error message with appropriate color
    const errorMessages = Object.values(errors).map((error, index) => (
      <p
        key={index}
        style={{ color: error.isMet ? "green" : "rgba(27, 112, 19, 0.82)" }}
      >
        {error.isMet ? "✔️" : "✖️"} {error.message}
      </p>
    ));

    // Check if all conditions are met
    const allConditionsMet = Object.values(errors).every(
      (error) => error.isMet,
    );

    if (!allConditionsMet) {
      setPasswordError(errorMessages);
      return;
    }

    // Reset password error message if all conditions are met
    setPasswordError("");
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <div
                className="absolute -inset-1 blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-rotate"
              />
              <div
                className="relative px-4 py-2 leading-none backdrop-blur-sm"
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
            {/* LEFT — REGISTER FORM */}
            <div className="bg-white shadow-xl p-10 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Create Account
              </h2>

              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-xs tracking-wide text-gray-600 mb-2">
                    FIRST NAME
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs tracking-wide text-gray-600 mb-2">
                    LAST NAME
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                {emailAvailable === true && (
                  <p className="text-blue-400 text-md">✔ Email is available</p>
                )}
                {emailAvailable === false && (
                  <p className="text-blue-500 text-md">
                    ✖ Email already exists
                  </p>
                )}
                {validationErrors.email && (
                  <p className={Style.error}>{validationErrors.email}</p>
                )}
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
                    value={user.password}
                    onChange={handlePasswordChange}
                  />
                  {passwordVisible ? (
                    <RiEyeFill
                      onClick={togglePasswordVisibility}
                      className="absolute right-5 bottom-1/7 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                    />
                  ) : (
                    <RiEyeOffFill
                      onClick={togglePasswordVisibility}
                      className=" absolute right-5 bottom-1/7 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                    />
                  )}
                </div>
                {validationErrors.password && (
                  <p className={Style.error}>{validationErrors.password}</p>
                )}
                {passwordError}

                {/* Button */}
                <button
                  onClick={handleRegister}
                  className="w-full bg-blue-900 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  <span>{isSubmitting ? "Registering..." : "Register"}</span>
                </button>

                <a
                  href="/login"
                  className="text-sm text-blue-700 hover:underline block text-center"
                >
                  Already have an account? Sign In
                </a>
              </div>
            </div>

            {/* RIGHT — INFO SECTION */}
            <div className="bg-white shadow-xl p-10 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Join PeerLink 🌍
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                Connect. Share. Grow your network.
              </p>

              <div className="space-y-3 text-sm">
                <p>Discover people around you</p>
                <p>Chat in real-time</p>
                <p>Share moments instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}
