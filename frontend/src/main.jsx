// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./app.css";
import App from "./App.jsx";

// Import your interceptor setup
import { setupAxiosInterceptors } from "./axiosInterceptor";

// Initialize the interceptors
setupAxiosInterceptors();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
