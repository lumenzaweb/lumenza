import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS + custom styles
import App from "./App";

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
