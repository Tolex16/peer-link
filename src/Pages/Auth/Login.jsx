import React from "react";
import bgImage from "../../assets/backgroundImage.jpg";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon.png";

export default function Login() {
  const navigate = useNavigate();
  const handleHome = () => navigate("/");

  const handleContact = () => {
    navigate("/contact");
  };
  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <div
                className="absolute -inset-1 bg-black rounded-full 
                                 blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-rotate"
              />
              <div
                className="relative px-4 py-2 bg-black ring-1 rounded-full 
                                 leading-none backdrop-blur-sm"
              >
                <button onClick={handleHome}>
                  <img
                    src={logo}
                    alt="DCG"
                    className="w-[70px] h-[30px] cursor-pointer object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="min-h-screen w-full bg-cover bg-center mt-15 relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

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
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs tracking-wide text-gray-600 mb-2">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-blue-700 outline-none"
                  />
                </div>

                {/* Button */}
                <button className="w-full bg-green-900 text-white py-3 rounded-md font-medium hover:bg-green-700 transition cursor-pointer">
                  Sign In
                </button>

                <a
                  href="#"
                  className="text-sm text-green-700 hover:underline block"
                >
                  Forgot Password?
                </a>
                <p className="flex items-center justify-center">
                  <a
                    href="/register"
                    className="text-sm text-green-700 hover:underline block text-center"
                  >
                    No account? Register
                  </a>
                </p>
              </div>
            </div>

            {/* RIGHT — VISITORS */}
            <div className="bg-white shadow-xl p-10 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Visitors
              </h2>

              <p className="text-gray-600 leading-relaxed mb-8">
                If you do not have a Digi Cap Group account and would like to
                learn more about Digi Cap Group, click the button below.
              </p>

              <button
                onClick={handleContact}
                className="w-full bg-green-900 text-white py-3 rounded-md font-medium hover:bg-green-700 transition cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
