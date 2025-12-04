import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icon.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const strategiesLinks = [
    { path: "/overview", label: "Overview" },
    { path: "/energy", label: "Energy" },
    { path: "/art", label: "Art" },
    { path: "/blockchain-solutions", label: "Blockchain Solutions" },
  ];

  const insightsLinks = [
    { path: "/reinsurance", label: "Reinsurance" },
    { path: "/alternative lending", label: "Alternative Lending" },
    { path: "/multi-strategy", label: "Multi-Strategy" },
    { path: "/lifeX", label: "LifeX" },
  ];

  const aboutLinks = [
    { path: "/company", label: "Company" },
    { path: "/team", label: "Team" },
    { path: "/careers", label: "Careers" },
  ];

  const serveLinks = [
    { path: "/investors", label: "Investors" },
    { path: "/institutions", label: "Institutions" },
    { path: "/advisors", label: "Advisors" },
  ];

  const handleHome = () => navigate("/");

  return (
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
                  className="w-[70px] h-[30px] object-cover"
                />
              </button>
            </div>
          </div>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-black font-medium">
          {/* Strategies */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("strategies")}
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              STRATEGIES <ChevronDown size={18} />
            </button>
            {openDropdown === "strategies" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 grid grid-cols-1 w-56">
                {strategiesLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="py-1 px-2 hover:bg-green-500 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Insights */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("insights")}
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              INSIGHTS <ChevronDown size={18} />
            </button>
            {openDropdown === "insights" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 grid grid-cols-1 w-56">
                {insightsLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="py-1 px-2 hover:bg-green-500 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("about")}
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              ABOUT <ChevronDown size={18} />
            </button>
            {openDropdown === "about" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 grid grid-cols-1 w-56">
                {aboutLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="py-1 px-2 hover:bg-green-500 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Who We Serve */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown("serve")}
              className="flex items-center gap-1 hover:text-green-600 transition"
            >
              WHO WE SERVE <ChevronDown size={18} />
            </button>
            {openDropdown === "serve" && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-4 grid grid-cols-1 w-56">
                {serveLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="py-1 px-2 hover:bg-green-500 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-green-600">
            Contact
          </Link>
          <Link to="/login" className="hover:text-green-600">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden hover:text-green-500 text-black"
        >
          {openMenu ? (
            <FaTimes className="w-7 h-7 cursor-pointer text-black hover:text-green-500" />
          ) : (
            <FaBars className="w-7 h-7 cursor-pointer text-black hover:text-green-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-6">
          {/* Strategies */}
          <div>
            <button
              onClick={() => toggleDropdown("m-strategies")}
              className="flex justify-between w-full py-2 border-b"
            >
              Strategies <ChevronDown size={18} />
            </button>
            {openDropdown === "m-strategies" && (
              <div className="mt-2 pl-4 space-y-2 text-gray-700">
                {[
                  "Overview",
                  "Energy",
                  "Single-Family Rentals",
                  "Art",
                  "Bitcoin",
                ].map((item) => (
                  <Link key={item} to="#" className="block">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Insights */}
          <div>
            <button
              onClick={() => toggleDropdown("m-insights")}
              className="flex justify-between w-full py-2 border-b"
            >
              Insights <ChevronDown size={18} />
            </button>
            {openDropdown === "m-insights" && (
              <div className="mt-2 pl-4 space-y-2 text-gray-700">
                {[
                  "Reinsurance",
                  "Alternative Lending",
                  "Multi-Strategy",
                  "LifeX",
                ].map((item) => (
                  <Link key={item} to="#" className="block">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <button
              onClick={() => toggleDropdown("m-about")}
              className="flex justify-between w-full py-2 border-b"
            >
              About <ChevronDown size={18} />
            </button>
            {openDropdown === "m-about" && (
              <div className="mt-2 pl-4 space-y-2 text-gray-700">
                {["Company", "Team", "Careers"].map((item) => (
                  <Link key={item} to="#" className="block">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Who We Serve */}
          <div>
            <button
              onClick={() => toggleDropdown("m-serve")}
              className="flex justify-between w-full py-2 border-b"
            >
              Who We Serve <ChevronDown size={18} />
            </button>
            {openDropdown === "m-serve" && (
              <div className="mt-2 pl-4 space-y-2 text-gray-700">
                {["Investors", "Institutions", "Advisors"].map((item) => (
                  <Link key={item} to="#" className="block">
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="#" className="block py-2">
            Contact
          </Link>
          <Link to="#" className="block py-2">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
