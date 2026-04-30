import { Link } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiMessageCircle,
  FiCompass,
} from "react-icons/fi";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/icon.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LOGO + ABOUT */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="PeerLink" className="w-30 h-20" />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              PeerLink is a social platform built to connect people, 
              share ideas, and grow meaningful relationships in a 
              modern digital space.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 text-gray-600 text-lg">
              <FaTwitter className="hover:text-blue-500 cursor-pointer transition" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
              <FaLinkedin className="hover:text-blue-700 cursor-pointer transition" />
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>

            <div className="space-y-3 text-gray-600">
              <Link to="/" className="flex items-center gap-2 hover:text-blue-500 transition">
                <FiHome /> Home
              </Link>

              <Link to="/explore" className="flex items-center gap-2 hover:text-blue-500 transition">
                <FiCompass /> Explore
              </Link>

              <Link to="/friends" className="flex items-center gap-2 hover:text-blue-500 transition">
                <FiUsers /> Friends
              </Link>

              <Link to="/messages" className="flex items-center gap-2 hover:text-blue-500 transition">
                <FiMessageCircle /> Messages
              </Link>
            </div>
          </div>

          {/* COMMUNITY / EXTRA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Community</h3>

            <div className="space-y-3 text-gray-600">
              <Link to="/profile" className="block hover:text-blue-500 transition">
                Your Profile
              </Link>

              <Link to="/friend-requests" className="block hover:text-blue-500 transition">
                Friend Requests
              </Link>

              <Link to="/create-post" className="block hover:text-blue-500 transition">
                Create Post
              </Link>

              <button className="text-left hover:text-blue-500 transition">
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          
          <p>
            © {new Date().getFullYear()} PeerLink. Built for connection
          </p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-blue-500 cursor-pointer">Terms</span>
            <span className="hover:text-blue-500 cursor-pointer">Privacy</span>
            <span className="hover:text-blue-500 cursor-pointer">Help</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;