import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LearnMoreSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const strategiesLinks = [
    { path: "/strategies/energy", label: "Energy" },
    { path: "/strategies/art", label: "Art" },
    { path: "/strategies/alternative-lending", label: "Alternative Lending" },
    { path: "https://digiassetanalytics.com", label: "Blockchain Solutions" },
  ];
  return (
    <motion.div
      className="w-full bg-green-900 mt-17 text-white py-20 px-6 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top Section */}
      <motion.div
        className="grid lg:grid-cols-2 gap-12 items-start"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Text */}
        <motion.div variants={fadeIn}>
          <p className="text-md tracking-widest text-green-300 mb-4">
            STRATEGIES
          </p>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Learn more about our <br /> uncorrelated alternative <br />{" "}
            investment strategies
          </h2>
          <p className="text-green-200 max-w-xl">
            We’ve developed consistently profitable investments over the past
            12+ years that provide exposure to unique risks and returns,
            completely uncorrelated with traditional stocks and bonds.
          </p>
        </motion.div>

        {/* Right Strategy List */}
        <motion.div
          className="space-y-4 border-l border-green-700 pl-6"
          variants={fadeIn}
          transition={{ staggerChildren: 0.12 }}
        >
          {strategiesLinks.map((link, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center py-2 cursor-pointer group"
              variants={fadeIn}
              whileHover={{ x: 4 }}
            >
              <span className="text-lg group-hover:text-green-300 transition">
                <Link to={link.path}>{link.label}</Link>
              </span>
              <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-green-800 mt-16 rounded-xl py-6 px-10 grid grid-cols-1 md:grid-cols-3 text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-b md:border-b-0 md:border-r border-green-700 py-4">
          <p className="text-3xl font-bold">2012</p>
          <p className="text-green-300 text-sm mt-1">Year Founded</p>
        </div>
        <div className="border-b md:border-b-0 md:border-r border-green-700 py-4">
          <p className="text-3xl font-bold">$29B</p>
          <p className="text-green-300 text-sm mt-1">Assets Under Management</p>
        </div>
        <div className="py-4">
          <p className="text-3xl font-bold">&lt;0.1</p>
          <p className="text-green-300 text-sm mt-1">
            Correlation to Stocks & Bonds
          </p>
        </div>
      </motion.div>

      {/* Bottom Categories */}
      <motion.div
        className="grid md:grid-cols-3 gap-12 mt-20"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        {[
          {
            title: "Institutional Investors",
            desc: "Vehicles optimized for capital efficiency, leverage, and tax",
          },
          {
            title: "Wealth Professionals",
            desc: "Funds and tailored education to guide clients to and through retirement",
          },
          {
            title: "Insurance Companies",
            desc: "Tailor-made structures for capital, regulatory, and accounting needs",
          },
        ].map((section) => (
          <motion.div
            key={section.title}
            variants={fadeIn}
            className="p-2"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
            <p className="text-green-200 mb-6">{section.desc}</p>
            <button className="border border-green-500 text-green-300 px-6 py-2 rounded-lg hover:bg-green-800 cursor-pointer transition">
              Learn More
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
