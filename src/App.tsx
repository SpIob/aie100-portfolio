import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DinoGame from "./components/DinoGame";
import ReflectionDetail from "./components/ReflectionDetail";
import Reflections from "./components/Reflections";
import { useTheme } from "./components/ThemeContext";
import {
  ABOUT_ME,
  BOOT_LINES,
  CONTACT,
  PORTFOLIO_ITEMS,
  PROFILE,
  WAYPOINTS,
} from "./data";

// Blank data field → dashed placeholder; filled → normal content.
export function Slot({ value, fallback, block = false }: { value: string; fallback: string; block?: boolean }) {
  if (!value.trim()) {
    return block ? (
      <div className="placeholder-box">
        {fallback}
        <span className="placeholder-tag">TBD</span>
      </div>
    ) : (
      <span className="is-placeholder-inline">{fallback}</span>
    );
  }
  return block
    ? value
        .trim()
        .split(/\n\s*\n/)
        .map((p, i) => (
          <p key={i} className="filled-block">
            {p}
          </p>
        ))
    : <>{value}</>;
}

export const Icon = ({ d }: { d: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} />
  </svg>
);

export const COMPASS =
  "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.707-12.293-2.117 6.354a1 1 0 0 1-.632.632l-6.354 2.117 2.117-6.354a1 1 0 0 1 .632-.632l6.354-2.117Z";
const PIN = "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z";
const MAIL =
  "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 2-10 7L2 6";
const LINKEDIN =
  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6ZM6 9H2v12h4ZM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z";
const GITHUB =
  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22";

const NAV_LINKS = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#route", "Route"],
  ["#portfolio", "Portfolio"],
  ["#reflections", "Reflections"],
  ["#contact", "Contact"],
] as const;

export const MOON =
  "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z";
export const SUN_RAYS =
  "M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M5 19l1.6-1.6M17.4 6.6 19 5";

type Theme = "light" | "dark";
type Origin = { x: number; y: number };

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: (origin: Origin) => void }) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="skip-btn theme-toggle"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d={SUN_RAYS} />
          </>
        ) : (
          <path d={MOON} />
        )}
      </svg>
      {dark ? "Day" : "Night"}
    </button>
  );
}

function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: (origin: Origin) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState("home");
  const lastId = NAV_LINKS[NAV_LINKS.length - 1][0].slice(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--scroll-margin",
        `${el.offsetHeight + 16}px`,
      ),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    for (const [href] of NAV_LINKS) {
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        doc.style.setProperty("--scroll-progress", String(max > 0 ? Math.min(1, doc.scrollTop / max) : 0));
        if (max > 0 && doc.scrollTop >= max - 2) setActive(lastId);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [lastId]);

  return (
    <nav ref={ref} className="site-nav" aria-label="Section navigation">
      <a className="nav-brand" href="#home">
        <Icon d={COMPASS} />
        Field Log
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map(([href, label]) => (
          <li key={href}>
            <a href={href} aria-current={active === href.slice(1) ? "true" : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <span className="nav-progress" aria-hidden="true" />
    </nav>
  );
}

function Home() {
  return (
    <header className="masthead reveal" id="home">
      <div className="stamp" aria-hidden="true">
        <span>Mapúa University</span>
        <span>Intramuros · Q1</span>
      </div>
      <div className="kicker">
        <Icon d={COMPASS} />
        Field Log · {PROFILE.term} · {PROFILE.section}
      </div>
      <h1 className="title has-hint" data-hint="↑ ↑ ↓ ↓ ← → ← → B A" tabIndex={-1}>
        {PROFILE.name}
      </h1>
      <p className="subtitle">
        {PROFILE.program} · {PROFILE.yearLevel}
      </p>
      <p className="home-intro">
        <Slot value={PROFILE.homeIntro} fallback="[ A one-line personal intro goes here — add it in data.ts. ]" />
      </p>
      <div className="status-line">STATUS — pre-departure · first entry not yet logged</div>
    </header>
  );
}

function AboutMe() {
  return (
    <section id="about" className="reveal" aria-labelledby="about-heading">
      <div className="section-head">
        <h2 className="section-title" id="about-heading">
          About Me
        </h2>
        <span className="section-sub">Background · why AI Engineering</span>
      </div>
      <Slot
        block
        value={ABOUT_ME}
        fallback="[ A paragraph or two on your background, and why AI Engineering. This is the section people actually read closely — write it yourself, in your own voice, per the rubric. Edit ABOUT_ME in data.ts. ]"
      />
    </section>
  );
}

const STATUS_LABEL = {
  "not-started": "Not yet logged",
  "in-progress": "In progress",
  complete: "Logged",
} as const;

function RouteSection() {
  return (
    <section id="route" className="reveal" aria-labelledby="route-heading">
      <div className="section-head">
        <h2 className="section-title" id="route-heading">
          The Route — Quarter One
        </h2>
        <span className="section-sub">8 legs · one per enrolled subject</span>
      </div>
      <ol className="route-list">
        {WAYPOINTS.map((wp, i) => (
          <li className="route-item" key={wp.code}>
            <div className="route-item-head">
              <span className="route-index">{String(i + 1).padStart(2, "0")}</span>
              <span style={{ color: "#B4842A", display: "flex" }}>
                <Icon d={PIN} />
              </span>
              <span className="route-code">{wp.code}</span>
              <span className="status-pill" data-status={wp.status}>{STATUS_LABEL[wp.status]}</span>
            </div>
            <Slot block value={wp.entry} fallback="[ Reflection for this leg goes here once it's written. ]" />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="reveal" aria-labelledby="portfolio-heading">
      <div className="section-head">
        <h2 className="section-title" id="portfolio-heading">
          Portfolio
        </h2>
        <span className="section-sub">Projects, reports, lab work</span>
      </div>
      <div className="card-grid">
        {PORTFOLIO_ITEMS.map((item) => (
          <article className="card" key={item.title}>
            <div className="card-eyebrow">{item.tag}</div>
            <h3 className="card-title filled">{item.title}</h3>
            <p className="card-body filled">{item.description}</p>
            {item.link && (
              <a className="card-link" href={item.link} target="_blank" rel="noreferrer">
                View <span className="arrow">→</span>
              </a>
            )}
          </article>
        ))}
        <article className="card is-ghost">
          <span className="placeholder-tag">TBD</span>
          <div className="card-eyebrow">[ Course / type ]</div>
          <h3 className="card-title">[ Add another project ]</h3>
          <p className="card-body">
            [ Copy this shape into PORTFOLIO_ITEMS in data.ts for each new piece of work. ]
          </p>
        </article>
      </div>
    </section>
  );
}

const CONTACT_ROWS = [
  { label: "Email", value: CONTACT.email, icon: MAIL, href: CONTACT.email.trim() ? `mailto:${CONTACT.email}` : "" },
  { label: "LinkedIn", value: CONTACT.linkedin.replace(/^https?:\/\/(www\.)?/, ""), icon: LINKEDIN, href: CONTACT.linkedin.trim() },
  { label: "GitHub", value: CONTACT.github.replace(/^https?:\/\/(www\.)?/, ""), icon: GITHUB, href: CONTACT.github.trim() },
];

function Contact() {
  return (
    <section id="contact" className="reveal" aria-labelledby="contact-heading">
      <div className="section-head">
        <h2 className="section-title" id="contact-heading">
          Coordinates
        </h2>
        <span className="section-sub">Contact</span>
      </div>
      <ul className="contact-list">
        {CONTACT_ROWS.map((row) => (
          <li key={row.label}>
            {row.href ? (
              <a className="contact-row" href={row.href} target="_blank" rel="noreferrer">
                <Icon d={row.icon} />
                <span className="contact-label">{row.label}</span>
                <span className="contact-value">{row.value}</span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className="contact-row">
                <Icon d={row.icon} />
                <span className="contact-label">{row.label}</span>
                <span className="is-placeholder-inline">[ TBD ]</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="reveal">
      <div className="legend">
        <span>— solid line = logged</span>
        <span>┄ dashed box = placeholder, not yet written</span>
        <span>● pin = waypoint / milestone</span>
      </div>
      <div>AIE100 · Quarter One portfolio · built with Vite + React</div>
    </footer>
  );
}

function Intro({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="intro-layer grid-bg">
      <div className="intro-top">
        <span>Plotting route — Quarter One</span>
        <button className="skip-btn" onClick={onSkip}>
          Skip intro →
        </button>
      </div>

      <div className="map-stage" aria-hidden="true">
        <div className="map-frame">
          <svg
            className="map-svg"
            viewBox="0 0 900 380"
            role="img"
            aria-label="Route drawing from Valenzuela City to Mapúa University, Intramuros"
          >
            <path
              className="route-path"
              d="M60,300 C220,230 320,340 460,230 C600,140 680,180 830,70"
              pathLength="100"
            />
            <circle className="dot-start" cx="60" cy="300" r="6" />
            <circle className="dot-mid a" cx="330" cy="268" r="4" />
            <circle className="dot-mid b" cx="600" cy="168" r="4" />
            <g className="pin-end">
              <circle className="pin-ring" cx="830" cy="70" r="9" />
              <circle className="pin-core" cx="830" cy="70" r="7" />
              <circle className="pin-core-inner" cx="830" cy="70" r="3" />
            </g>
          </svg>
          <span className="map-label start">Valenzuela City</span>
          <span className="map-label end">Mapúa — Intramuros</span>
        </div>
      </div>

      <div className="boot-log" aria-hidden="true">
        {BOOT_LINES.map((line) => (
          <span key={line}>{line}</span>
        ))}
        <span>
          READY<span className="cursor-blink" />
        </span>
      </div>
    </div>
  );
}

type Phase = "intro" | "zoom" | "content";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
] as const;

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "content";
    if (typeof window !== "undefined" && window.location.pathname !== "/") return "content";
    return "intro";
  });
  const showedIntro = useRef(false);
  const { theme, toggleTheme } = useTheme();
  const [showGame, setShowGame] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("dino-high-score") || 0);
    } catch {
      return 0;
    }
  });
  const konamiIndex = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showGame) return;
      const expected = KONAMI_SEQUENCE[konamiIndex.current];
      if (e.code === expected) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          konamiIndex.current = 0;
          setShowGame(true);
        }
      } else {
        konamiIndex.current = e.code === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showGame]);

  useEffect(() => {
    if (phase === "intro") {
      showedIntro.current = true;
      const t = setTimeout(() => setPhase("zoom"), 3000);
      return () => clearTimeout(t);
    }
    if (phase === "zoom") {
      const t = setTimeout(() => setPhase("content"), 1050);
      return () => clearTimeout(t);
    }
    if (showedIntro.current) {
      showedIntro.current = false;
      document.querySelector<HTMLElement>(".title")?.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "content") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".mfl .reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [phase]);

  function MainPage() {
  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Home />
        <AboutMe />
        <RouteSection />
        <Portfolio />
        <Reflections />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

return (
  <div className={`mfl phase-${phase}`}>
    {phase !== "content" && <Intro onSkip={() => setPhase("content")} />}

    <div className="content-layer grid-bg" inert={phase !== "content"}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reflections/:slug" element={<ReflectionDetail />} />
      </Routes>
    </div>

    {showGame && (
      <DinoGame
        onClose={() => setShowGame(false)}
        highScore={highScore}
        onHighScore={setHighScore}
      />
    )}
  </div>
);
}
