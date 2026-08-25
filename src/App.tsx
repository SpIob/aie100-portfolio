import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  ABOUT_ME,
  BOOT_LINES,
  CONTACT,
  PORTFOLIO_ITEMS,
  PROFILE,
  REFLECTIONS,
  WAYPOINTS,
} from "./data";

// Blank data field → dashed placeholder; filled → normal content.
function Slot({ value, fallback, block = false }: { value: string; fallback: string; block?: boolean }) {
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

const Icon = ({ d }: { d: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} />
  </svg>
);

const COMPASS =
  "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.707-12.293-2.117 6.354a1 1 0 0 1-.632.632l-6.354 2.117 2.117-6.354a1 1 0 0 1 .632-.632l6.354-2.117Z";
const PIN = "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z";

const NAV_LINKS = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#route", "Route"],
  ["#portfolio", "Portfolio"],
  ["#reflections", "Reflections"],
  ["#contact", "Contact"],
] as const;

function Nav() {
  const ref = useRef<HTMLElement>(null);
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
  return (
    <nav ref={ref} className="site-nav" aria-label="Section navigation">
      <a className="nav-brand" href="#home">
        <Icon d={COMPASS} />
        Field Log
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <header className="masthead" id="home">
      <div className="kicker">
        <Icon d={COMPASS} />
        Field Log · {PROFILE.term} · {PROFILE.section}
      </div>
      <h1 className="title" tabIndex={-1}>{PROFILE.name}</h1>
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
    <section id="about" aria-labelledby="about-heading">
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
    <section id="route" aria-labelledby="route-heading">
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
              <span className="status-pill">{STATUS_LABEL[wp.status]}</span>
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
    <section id="portfolio" aria-labelledby="portfolio-heading">
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
                View →
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

function Reflections() {
  return (
    <section id="reflections" aria-labelledby="reflections-heading">
      <div className="section-head">
        <h2 className="section-title" id="reflections-heading">
          Reflections / Blog
        </h2>
        <span className="section-sub">Weekly-ish entries</span>
      </div>
      <div className="card-grid">
        {REFLECTIONS.map((entry, i) => (
          <article className="card" key={i}>
            {!entry.title.trim() && <span className="placeholder-tag">TBD</span>}
            <div className="card-eyebrow">Entry {String(i + 1).padStart(2, "0")}</div>
            <h3 className={`card-title${entry.title.trim() ? " filled" : ""}`}>
              <Slot value={entry.title} fallback="[ Title to come ]" />
            </h3>
            <p className={`card-body${entry.body.trim() ? " filled" : ""}`}>
              <Slot value={entry.body} fallback="[ A short reflection on what you learned or experienced goes here. ]" />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const CONTACT_ROWS = [
  { label: "Email", value: CONTACT.email, href: CONTACT.email.trim() ? `mailto:${CONTACT.email}` : "" },
  { label: "LinkedIn", value: CONTACT.linkedin, href: CONTACT.linkedin.trim() },
  { label: "GitHub", value: CONTACT.github, href: CONTACT.github.trim() },
];

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-head">
        <h2 className="section-title" id="contact-heading">
          Coordinates
        </h2>
        <span className="section-sub">Contact</span>
      </div>
      <ul className="link-list">
        {CONTACT_ROWS.map((row) => (
          <li key={row.label}>
            {row.label} —{" "}
            {row.href ? (
              <a href={row.href} target="_blank" rel="noreferrer">
                {row.value}
              </a>
            ) : (
              <span className="is-placeholder-inline">[ TBD ]</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer>
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

export default function App() {
  const [phase, setPhase] = useState<Phase>(() =>
    matchMedia("(prefers-reduced-motion: reduce)").matches ? "content" : "intro"
  );
  const showedIntro = useRef(false);

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

  return (
    <div className={`mfl phase-${phase}`}>
      {phase !== "content" && <Intro onSkip={() => setPhase("content")} />}

      <div className="content-layer grid-bg" inert={phase !== "content"}>
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
