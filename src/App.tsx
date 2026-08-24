import { useEffect, useState } from "react";
import "./App.css";
import { IntroSequence } from "./components/IntroSequence";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { AboutMe } from "./components/AboutMe";
import { RouteSection } from "./components/RouteSection";
import { Portfolio } from "./components/Portfolio";
import { Reflections } from "./components/Reflections";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

type Phase = "intro" | "zoom" | "content";

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? "content" : "intro"));

  useEffect(() => {
    if (phase !== "intro") return;
    const toZoom = setTimeout(() => setPhase("zoom"), 3000);
    const toContent = setTimeout(() => setPhase("content"), 4050);
    return () => {
      clearTimeout(toZoom);
      clearTimeout(toContent);
    };
  }, [phase]);

  return (
    <div className={`mfl phase-${phase}`}>
      {phase !== "content" && <IntroSequence onSkip={() => setPhase("content")} />}

      <div className="content-layer grid-bg">
        <Nav />
        <main>
          <Home />
          <AboutMe />
          <RouteSection />
          <Portfolio />
          <Reflections />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
