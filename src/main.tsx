import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Security Measures for Production
if (import.meta.env.PROD) {
  // Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Disable developer tools shortcuts
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }
    // Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C, Ctrl + U (View Source)
    if (e.ctrlKey && (e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()) || e.key.toUpperCase() === "U")) {
      e.preventDefault();
    }
    // Command + Option + I (Mac)
    if (e.metaKey && e.altKey && e.key.toUpperCase() === "I") {
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
