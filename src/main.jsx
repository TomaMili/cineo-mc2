import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
// import { AuthProvider } from "./hooks/useAuth.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </StrictMode>
);
