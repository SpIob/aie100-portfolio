import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
type Origin = { x: number; y: number };

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin: Origin) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function persistTheme(value: Theme) {
  try {
    localStorage.setItem("fieldlog-theme", value);
  } catch {
    return;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback((origin: Origin) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      flushSync(() => setTheme(next));
      document.documentElement.dataset.theme = next;
      persistTheme(next);
    };
    if (
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      typeof document.startViewTransition === "function"
    ) {
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${origin.x}px`);
      root.style.setProperty("--vt-y", `${origin.y}px`);
      const vt = document.startViewTransition(apply);
      vt.ready
        .then(() => {
          const radius = Math.hypot(
            Math.max(origin.x, innerWidth - origin.x),
            Math.max(origin.y, innerHeight - origin.y),
          );
          root.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: 480,
              easing: "cubic-bezier(0.3, 0, 0.2, 1)",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => undefined);
    } else {
      apply();
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}