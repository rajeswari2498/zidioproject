import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Import createRoot
import App from "./App";  // Ensure App.js exists

const root = ReactDOM.createRoot(document.getElementById("root"));  // ✅ Correct way
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
