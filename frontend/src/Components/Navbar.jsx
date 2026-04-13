import { useState, useEffect } from "react";
import axios from "../Components/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiHome, FiSearch, FiBell, FiUser, FiCompass } from "react-icons/fi";
import logo from "../assets/icon.png";
import ProfileAvatar from "./ProfileAvatar";
import isAuthenticated from "../Components/Authentication/IsAuthenticated";
import { useAuth } from "../Components/Authentication/AuthProvider";
import { FiMessageCircle } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [image, setImage] = useState(null);
  const [notifications, setNotifications] = useState(3); // 🔥 spicy fake count

  useEffect(() => {
    axios
      .get(`user/profile-image`)
      .then((res) => setImage(res.data))
      .catch(() => setImage(null));
  }, []);

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="PeerLink"
            className="w-[150px] h-[50px] object-cover"
          />
        </div>

        {/* Search (Desktop) 
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-[300px]">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
*/}
        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group flex items-center">
            <Link to="/" className="text-xl hover:text-blue-500">
              <FiHome />
            </Link>

            {/* Tooltip */}
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 
    bg-inherit text-black text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all duration-300 pointer-events-none"
            >
              Home
            </span>
          </div>
          <div className="relative group flex items-center">
            <Link to="/explore" className="text-xl hover:text-blue-500">
              <FiCompass />
            </Link>
            {/* Tooltip */}
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 
    bg-inherit text-black text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all duration-300 pointer-events-none"
            >
              Explore
            </span>
          </div>
          {isAuthenticated() && (
            <>
              <div className="relative group flex items-center">
                <Link to="/create-post" className="text-xl hover:text-blue-500">
                  <FiPlusSquare />
                </Link>
                {/* Tooltip */}
                <span
                  className="absolute -top-6 left-1/2 -translate-x-1/2 
    bg-inherit text-black text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all duration-300 pointer-events-none"
                >
                  Create
                </span>
              </div>

              <div className="relative group flex items-center">
                <Link
                  to="/messages"
                  className="text-xl hover:text-blue-500 relative"
                >
                  <FiMessageCircle />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    2
                  </span>
                </Link>
                {/* Tooltip */}
                <span
                  className="absolute -top-7 left-3 -translate-x-1/2 
    bg-inherit text-black text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all duration-300 pointer-events-none"
                >
                  Messages
                </span>
              </div>

              <div className="relative group flex items-center">
                {/* 🔔 Notifications */}
                <div className="relative cursor-pointer">
                  <FiBell className="text-xl hover:text-blue-500" />
                  {notifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                      {notifications}
                    </span>
                  )}
                </div>
                {/* Tooltip */}
                <span
                  className="absolute -top-7 left-6 -translate-x-1/2 
    bg-inherit text-black text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all duration-300 pointer-events-none"
                >
                  Notifications
                </span>
              </div>
            </>
          )}
          {/* Profile */}
          {isAuthenticated() ? (
            <div className="relative">
              <button onClick={() => setOpenProfile(!openProfile)}>
                <ProfileAvatar
                  base64Image={image}
                  size={40}
                  className="w-9 h-9"
                />
              </button>

              {/* Dropdown */}
              {openProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/friends"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Friends
                  </Link>

                  <Link
                    to="/friend-requests"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Friend Requests
                  </Link>

                  <div className="border-t my-1" />

                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden text-xl"
        >
          {openMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/explore" className="block">
            Explore
          </Link>
          <Link to="/messages" className="block">
            Messages
          </Link>
          <Link to="/friends" className="block">
            Friends
          </Link>
          <Link to="friend-requests" className="block">
            Friend Requests
          </Link>
          <Link to="/profile" className="block">
            Profile
          </Link>
          {isAuthenticated() && (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
