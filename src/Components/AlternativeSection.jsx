import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function AlternativeSection() {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        duration: 0.6,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section className="w-full bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* LEFT: Header + small CTA */}
          <motion.div variants={item} className="flex flex-col gap-6">
            <h2 className="text-3xl lg:text-4xl font-semibold text-green-700 leading-tight">
              Alternative investments
              <br /> for diversified portfolios
            </h2>

            <p className="text-md text-gray-700 max-w-xl">
              Founded in 2012, Digi Cap Group is an alternative asset manager
              dedicated to creating innovative financial market solutions
              through first principles thinking and proprietary data advantages.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-green-600 text-md font-medium hover:underline"
            >
              About Us →
            </Link>
          </motion.div>

          {/* RIGHT: Long content and value list */}
          <motion.div variants={item} className="flex flex-col gap-8">
            <div className="bg-white p-4 lg:p-6 border-t border-gray-100">
              <p className="text-md text-gray-800 leading-relaxed">
                Applying expertise in sourcing, structuring, execution, and risk
                management, the firm builds products it wants for itself and
                invests its own balance sheet in each of its strategies,
                reflecting a core principle of strong investor alignment.
              </p>

              <hr className="my-6 border-gray-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={item} className="flex flex-col gap-3">
                  <span className="text-md uppercase tracking-wider text-green-600 font-medium">
                    We take risk in symmetry with investors
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800">
                    We are principals, not agents
                  </h4>
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-3">
                  <span className="text-md uppercase tracking-wider text-green-600 font-medium">
                    Excellence is non-negotiable
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800">
                    We believe in "no basis point left behind"
                  </h4>
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-3">
                  <span className="text-md uppercase tracking-wider text-green-600 font-medium">
                    Data is the authority
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800">
                    We create sustainably valuable proprietary data
                  </h4>
                </motion.div>

                <motion.div variants={item} className="flex flex-col gap-3">
                  <span className="text-md uppercase tracking-wider text-green-600 font-medium">
                    Alignment
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Strong investor alignment through balance sheet investments
                  </h4>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom split section similar to image's lower left box */}
        <motion.div
          className="mt-12 border-t pt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-medium text-green-700">
                Our culture and investment philosophy are inseparable
              </h3>
              <a
                className="text-md inline-flex items-center gap-2 mt-3 text-green-600 font-medium hover:underline"
                href="#learn"
              >
                Learn More →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                className="p-4 rounded-lg bg-green-50 border border-green-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <p className="text-md uppercase text-green-700 font-semibold">
                  We take risk in symmetry with investors
                </p>
                <p className="mt-2 text-sm font-semibold">
                  We are principals, not agents
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg bg-green-50 border border-green-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <p className="text-md uppercase text-green-700 font-semibold">
                  Excellence is non-negotiable
                </p>
                <p className="mt-2 text-sm font-semibold">
                  We believe in "no basis point left behind"
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg bg-green-50 border border-green-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <p className="text-md uppercase text-green-700 font-semibold">
                  Data is the authority
                </p>
                <p className="mt-2 text-sm font-semibold">
                  We create sustainably valuable proprietary data
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
