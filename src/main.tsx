import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import App from "./App.tsx";
import { initWebVitals } from "./utils/web-vitals";

const BASENAME = "/aie100-portfolio";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${BASENAME}/sw.js`).catch(() => {});
  });
}

if (import.meta.env.PROD) {
  initWebVitals()
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);