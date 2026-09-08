import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import App from "./App.tsx";

const BASENAME = "/aie100-portfolio";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);