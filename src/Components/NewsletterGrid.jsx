import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NL1 from "../assets/bannerImage.jpg";
import NL2 from "../assets/bannerImage1.jpg";
import NL3 from "../assets/bannerImage2.jpeg";

export default function NewsletterGrid() {
  const navigate = useNavigate();

  const years = [
    {
      date: 2023,
      image: NL1,
      route: "/2023-newsletter",
    },
    {
      date: 2024,
      image: NL2,
      route: "/2024-newsletter",
    },
    {
      date: 2025,
      image: NL3,
      route: "/2025-newsletter",
    },
  ];

  const handleNewsletter = (route) => navigate(route);

  return (
    <>
      <h3 className="text-2xl font-bold ml-5 mb-12 mt-12 text-green-600">
        Featured Insights
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 mb-15 gap-6 p-6">
        {years.map((year, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 80,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
          >
            <img
              src={year.image}
              alt={`DCG ${year.date} Newsletter`}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                DCG {year.date} Newsletter
              </h2>

              <button
                onClick={() => handleNewsletter(year.route)}
                className="text-green-600 font-medium cursor-pointer flex items-center gap-1 hover:underline"
              >
                Learn More <span className="text-lg">→</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
