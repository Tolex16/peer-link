import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Components/NotFound";
import Unauthorized from "./Pages/Unauthorized";
import { motion, AnimatePresence } from "framer-motion";
import Overview from "./Pages/Strategies/Overview";
import Art from "./Pages/Strategies/Art";
import BlockchainSolutions from "./Pages/Strategies/BlockchainSolutions";
import Energy from "./Pages/Strategies/Energy";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AlternativeLending from "./Pages/Strategies/AlternativeLending";
import Advisors from "./Pages/WhoWeServe/Advisors";
import Institutions from "./Pages/WhoWeServe/Institutions";
import Company from "./Pages/About/Company";
import Contact from "./Pages/Contact";
import Investors from "./Pages/WhoWeServe/Investors";
import All from "./Pages/Insights/All";
import InvestorLetters from "./Pages/Insights/InvestorLetters";
import Insights from "./Pages/Insights/Insights";
import Leadership from "./Pages/About/Leadership";

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
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/strategies"
          element={
            <PageWrapper>
              <Overview />
            </PageWrapper>
          }
        />
        <Route
          path="/strategies/art"
          element={
            <PageWrapper>
              <Art />
            </PageWrapper>
          }
        />
        <Route
          path="/strategies/blockchain-solutions"
          element={
            <PageWrapper>
              <BlockchainSolutions />
            </PageWrapper>
          }
        />
        <Route
          path="/strategies/energy"
          element={
            <PageWrapper>
              <Energy />
            </PageWrapper>
          }
        />
        <Route
          path="/strategies/alternative-lending"
          element={
            <PageWrapper>
              <AlternativeLending />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />

        <Route
          path="/insights/all"
          element={
            <PageWrapper>
              <All />
            </PageWrapper>
          }
        />
        <Route
          path="/insights/investor-letters"
          element={
            <PageWrapper>
              <InvestorLetters />
            </PageWrapper>
          }
        />
        <Route
          path="/insights/insights"
          element={
            <PageWrapper>
              <Insights />
            </PageWrapper>
          }
        />
        <Route
          path="/who-we-serve/advisors"
          element={
            <PageWrapper>
              <Advisors />
            </PageWrapper>
          }
        />
        <Route
          path="/who-we-serve/investors"
          element={
            <PageWrapper>
              <Investors />
            </PageWrapper>
          }
        />
        <Route
          path="/who-we-serve/institutions"
          element={
            <PageWrapper>
              <Institutions />
            </PageWrapper>
          }
        />
        <Route
          path="/about/company"
          element={
            <PageWrapper>
              <Company />
            </PageWrapper>
          }
        />
        <Route
          path="/about/leadership"
          element={
            <PageWrapper>
              <Leadership />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
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
