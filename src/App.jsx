import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Components/NotFound";
import Unauthorized from "./Pages/Unauthorized";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
    className="w-full"
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home  />
            </PageWrapper>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Catch-All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
