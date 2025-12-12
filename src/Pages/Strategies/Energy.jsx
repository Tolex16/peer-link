import React, { useRef } from "react";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer";
import ContactSection from "../../Components/ContactSection";
import Navbar from "../../Components/Navbar";
import NewsletterGrid from "../../Components/NewsletterGrid";

const Energy = () => {
  const investRef = useRef(null);
  const dcgRef = useRef(null);
  const howInvestRef = useRef(null);
  return (
    <>
      <Navbar />
      <div className="w-full overflow-x-hidden bg-white text-[#052247]">
        {/* -------------------------------- HERO SECTION -------------------------------- */}
        <section className="relative bg-green-800 text-white py-24 px-6 lg:px-20 min-h-[90vh] flex flex-col lg:flex-row items-center justify-between">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="max-w-xl sticky top-24"
          >
            <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
              Energy
            </h1>

            <p className="text-gray-100 text-lg leading-relaxed">
              We acquire diversified portfolios of high-quality, low-risk
              natural gas assets—specifically seasoned proved, developed, and
              producing (“PDP”) wells with top-tier operators in mature basins.
              Investors have benefitted from our unique hedging and structuring
              capabilities to receive attractive returns and immediate monthly
              cash flow that are unrelated to stock and bond returns.{" "}
            </p>
          </motion.div>

          {/* Right Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
          >
            <div className="w-full h-64 lg:h-96 rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Energy Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-gray-100 mt-4">
              Hear from Tomer Seifan, Head of Alternative Fixed Income and CFO
            </p>
          </motion.div>
          <div className="border-t border-green-700 mt-10 gap-13 text-green-500 text-md flex items-center">
            <div>
              <p
                className="cursor-pointer"
                onClick={() =>
                  investRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Why Invest In Natural Gas?
              </p>
            </div>
            <div>
              <p
                className="cursor-pointer"
                onClick={() =>
                  dcgRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Why Digi Cap Group?
              </p>
            </div>
            <div>
              <p
                className="cursor-pointer"
                onClick={() =>
                  howInvestRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                How to Invest
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------- WHY INVEST SECTION -------------------------------- */}
        <section ref={investRef} className="py-24 px-6 lg:px-20 bg-white">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#19C5A0] tracking-widest text-sm font-semibold flex items-center gap-3 mb-12"
          >
            <span className="w-6 h-[2px] bg-green-500"></span>
            WHY INVEST IN NATURAL GAS?
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Highly Predictable Production",
                desc: "It can be hard to predict the production of a single natural gas well, but total production from a diversified portfolio of wells—i.e., thousands of wells across multiple basins—can be predicted with a high degree of confidence.",
              },
              {
                title: "Opportunity to Provide Valuable Capital",
                desc: "Growth-focused energy companies are in constant need of capex, and at the same time, depleting producing wells (PDPs) drag on their valuations. Digi Cap Group provides valuable capital as a scaled buyer of these stable wells.",
              },
              {
                title: "Strong Demand Tailwinds",
                desc: "Demand for U.S. natural gas is increasing due to growing domestic power needs, the electrification of developing countries, and the increased ability to export U.S. natural gas to meet this global demand.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* -------------------------------- WHY STONE RIDGE -------------------------------- */}
        <section ref={dcgRef} className="py-24 px-6 lg:px-20 bg-[#F7FAFC]">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[#19C5A0] tracking-widest text-sm font-semibold flex items-center gap-3 mb-12"
          >
            <span className="w-6 h-[2px] bg-green-500"></span>
            WHY DIGI CAP GROUP?
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Proven Access to the Best Deals",
                desc: "Our team’s deep experience and relationships in the oil and gas space enable early and off-market access to attractive acquisition opportunities.",
              },
              {
                title: "Differentiated Investment Structure",
                desc: "Our robust commodity price hedging strategy and in-house financing solution allow us to offer attractive risk/return profiles that meet different investor needs.",
              },
              {
                title: "Unique Hedging Capabilities",
                desc: "Our trading team can achieve efficient execution on bigger and longer hedges with no margin requirements.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* -------------------------------- HOW TO INVEST -------------------------------- */}
        <section
          ref={howInvestRef}
          className="relative w-full bg-green-900 text-white py-24 px-6 lg:px-20 overflow-hidden"
        >
          {/* Background wave */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h4 className="text-[#19C5A0] tracking-widest text-sm font-semibold flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-[#19C5A0]"></span>
                HOW TO INVEST
              </h4>

              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4">
                Digi Cap Group offers <br /> debt and equity opportunities for
                this strategy{" "}
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                Contact us to learn more
              </p>
            </motion.div>

            {/* RIGHT BUTTONS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="flex flex-row items-center gap-6"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#19C5A0] px-8 py-4 rounded-md font-medium flex items-center gap-3"
              >
                Contact Us
                <span className="text-[#19C5A0] text-xl">➜</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
      <NewsletterGrid />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Energy;
