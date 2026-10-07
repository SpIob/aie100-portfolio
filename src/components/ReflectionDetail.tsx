import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { REFLECTIONS } from "../data";
import { COMPASS, MOON, SUN_RAYS, Icon } from "../App";
import { useTheme } from "./ThemeContext";
import { OptimizedImage } from "./OptimizedImage";

function Nav({ theme, onToggleTheme }: { theme: ReturnType<typeof useTheme>["theme"]; onToggleTheme: ReturnType<typeof useTheme>["toggleTheme"] }) {
  const NAV_LINKS = [
    ["/#home", "Home"],
    ["/#about", "About"],
    ["/#route", "Route"],
    ["/#portfolio", "Portfolio"],
    ["/#reflections", "Reflections"],
    ["/#contact", "Contact"],
  ] as const;

  return (
    <nav className="site-nav" aria-label="Section navigation">
      <Link className="nav-brand" to="/#home">
        <Icon d={COMPASS} />
        Field Log
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map(([href, label]) => (
          <li key={href}>
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <span className="nav-progress" aria-hidden="true" />
    </nav>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: ReturnType<typeof useTheme>["theme"]; onToggle: ReturnType<typeof useTheme>["toggleTheme"] }) {
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

export default function ReflectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggleTheme } = useTheme();

  const reflection = REFLECTIONS.find((r) => r.slug === slug);

  if (!reflection) {
    return (
      <div className="mfl phase-content">
        <div className="content-layer grid-bg">
          <Nav theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <section className="reveal" style={{ padding: "80px 24px", textAlign: "center" }}>
              <h1>Reflection not found</h1>
              <p>The reflection you&apos;re looking for doesn&apos;t exist.</p>
              <Link to="/#reflections" className="card-link" style={{ marginTop: "20px", display: "inline-block" }}>
                Back to Reflections <span className="arrow">→</span>
              </Link>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  document.title = `${reflection.title} · Field Log`;

  return (
    <div className={`mfl phase-content`}>
      <div className="content-layer grid-bg">
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <article className="reflection-detail reveal">
            <Link to="/#reflections" className="back-link">
              ← Back to Reflections
            </Link>

            {reflection.coverImage && (
              <div className="reflection-hero">
                <OptimizedImage
                  src={reflection.coverImage}
                  alt=""
                  aria-hidden="true"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            <header className="reflection-header">
              <h1>{reflection.title}</h1>
              <div className="reflection-meta">
                <time dateTime={reflection.date}>{new Date(reflection.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              </div>
              {reflection.tags && reflection.tags.length > 0 && (
                <div className="reflection-tags">
                  {reflection.tags.map((tag) => (
                    <span key={tag} className="reflection-tag">{tag}</span>
                  ))}
                </div>
              )}
            </header>

            <div className="reflection-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {reflection.content}
              </ReactMarkdown>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
}