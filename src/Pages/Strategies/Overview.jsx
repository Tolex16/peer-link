import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProcessTabs from "../../Components/ProcessTabs";
import ContactSection from "../../Components/ContactSection";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

export default function Overview() {
  const strategies = [
    {
      title: "Multi-Strategy",
      desc: "The best of Stone Ridge, in a fund",
      icon: "📊",
      route: "/insights/multi-strategy",
      external: false,
    },
    {
      title: "Art",
      desc: "Diversified exposure to Post-War and Contemporary art",
      icon: "🎨",
      route: "/strategies/art",
      external: false,
    },
    {
      title: "Alternative Lending",
      desc: "Income-focused lending opportunities",
      icon: "💼",
      route: "/insights/alternative-lending",
      external: false,
    },
    {
      title: "Reinsurance",
      desc: "Institutional-grade diversified reinsurance exposure",
      icon: "🛡️",
      route: "/insights/reinsurance",
      external: false,
    },
    {
      title: "Energy",
      desc: "Alternative energy strategies for yield & hedge",
      icon: "⚡",
      route: "/strategies/energy",
      external: false,
    },
    {
      title: "Blockchain Solutions",
      desc: "Bitcoin Financial Infrastructure & Mining",
      icon: "₿",
      route: "https://digiassetanalytics.com",
      external: true,
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70 },
    },
  };

  return (
    <>
      <Navbar />
      <ProcessTabs />
      <div className="w-full bg-white text-green-800 pt-20 px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* LEFT FIXED CONTENT WITH ANIMATION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
              Differentiated &<br /> Diversifying Strategies
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-md">
              We've developed consistently profitable investments over the past
              12+ years that provide exposure to unique risks and returns,
              completely uncorrelated with traditional stocks and bonds.
            </p>
          </motion.div>

          {/* RIGHT SCROLLING LIST WITH STAGGERED ANIMATIONS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar"
          >
            {strategies.map((item, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(16,185,129,0.08)",
                }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-200 pb-6 flex items-start justify-between p-4 rounded-md cursor-pointer"
              >
                <a
                  href={item.route}
                  target={item.external ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 w-full"
                >
                  {/* ICON */}
                  <span className="text-2xl">{item.icon}</span>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-xl font-medium text-green-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>

                  {/* ARROW ICON */}
                  {item.external ? (
                    <ArrowUpRight className="text-green-700 mt-1" />
                  ) : (
                    <ArrowRight className="text-green-700 mt-1" />
                  )}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </>
  );
}
