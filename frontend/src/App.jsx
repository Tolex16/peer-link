import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Components/NotFound";
import Unauthorized from "./Pages/Unauthorized";
import { motion, AnimatePresence } from "framer-motion";
import UpdateProfile from "./Pages/Auth/UpdateProfile";
import AuthGuard from "./Components/Authentication/AuthGuard";
import ForgetPassword from "./Pages/Auth/ForgetPassword.JSX";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Contact from "./Pages/Contact";
import Messages from "./Pages/Chat/Messages";
import CreatePost from "./Pages/Posts/CreatePost";
import MyProfile from "./Pages/Auth/MyProfile";
import FriendRequest from "./Pages/Friends/FriendRequests";
import FriendsList from "./Pages/Friends/Friends";
import Friends from "./Pages/Friends/Friends";
import Explore from "./Pages/Posts/Explore";

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
          path="/forget-password"
          element={
            <PageWrapper>
              <ForgetPassword />
            </PageWrapper>
          }
        />
        <Route
          path="/messages"
          element={
            <PageWrapper>
              <Messages />
            </PageWrapper>
          }
        />

        <Route
          path="/create-post"
          element={
            <PageWrapper>
              <CreatePost />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <MyProfile />
            </PageWrapper>
          }
        />
          <Route
          path="/explore"
          element={
            <PageWrapper>
              <Explore />
            </PageWrapper>
          }
        />
        <Route
          path="/friend-requests"
          element={
            <PageWrapper>
              <FriendRequest />
            </PageWrapper>
          }
        />
        <Route
          path="/friends"
          element={
            <PageWrapper>
              <Friends />
            </PageWrapper>
          }
        />
        <Route
          path="/edit-profile"
          element={
              <PageWrapper>
                <UpdateProfile />
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
