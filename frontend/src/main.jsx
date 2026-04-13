import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Utility/ScrollToTop.jsx";
import { AuthProvider } from "./Components/Authentication/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ScrollToTop />
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
