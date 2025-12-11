import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProcessTabs() {
  const tabs = [
    { key: "align", label: "Align", verb: "We align", text: "incentives, objectives, and expected return frameworks." },
    { key: "identify", label: "Identify", verb: "We identify",  text: "high-signal inefficiencies across global markets." },
    { key: "validate", label: "Validate", verb:"We seeK",  text: "clearly identifiable information asymmetries and misaligned incentives." },
    { key: "capture", label: "Capture", verb: "We capture", text: "pricing dislocations with disciplined strategies." },
    { key: "structure", label: "Structure", verb: "We structure", text: "institutional-grade solutions for scalability." },
  ];

  const [active, setActive] = useState("validate");

  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div
      className="w-full min-h-[300px] mt-15 text-white py-16 px-6 lg:px-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(140deg, #002b19ff, #023a27ff)",
      }}
    >
      {/* OPTIONAL animated background lines */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(9, 235, 141, 0.92), transparent 60%)",
        }}
      />

      {/* Tabs */}
      <div className="flex items-center gap-10 text-gray-300 text-lg mb-8 border-b border-white/20 pb-2 relative">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative pb-2 cursor-pointer transition ${
              active === tab.key ? "text-white font-medium" : "hover:text-white/80"
            }`}
          >
            {tab.label}

            {active === tab.key && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 h-[2px] bg-green-400 rounded-full bottom-[-2px]"
              />
            )}
          </button>
        ))}
      </div>

      {/* TEXT – Animated */}
      <div className="mt-10 max-w-5xl leading-tight">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl lg:text-6xl font-light">
              <span className="text-green-400 font-normal">{activeTab.label === "Validate" ? "We seek" : activeTab.verb}</span>{" "}
              {activeTab.text}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
