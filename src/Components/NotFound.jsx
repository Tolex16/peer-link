import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NotFoundSVG from "../assets/404.jpeg";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-gray-100 text-center px-6"
    >
      {/* Illustration Section */}
      <motion.img
        src={NotFoundSVG}
        alt="Page not found"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-57 md:w-66 mb-6"
      />

      {/* Title & Description */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl font-bold text-gray-800 mb-3"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-600 text-lg mb-8 max-w-md"
      >
        Oops! The page you’re looking for seems to have wandered off. Let’s get
        you back on track.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/"
          className="px-8 py-3 hover:bg-green-600 bg-black text-white cursor-pointer rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>

      {/* Decorative Shadow or Glow */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-200 to-transparent" />
    </motion.div>
  );
}
