import { Compass } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#route", label: "Route" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reflections", label: "Reflections" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="site-nav" aria-label="Section navigation">
      <a className="nav-brand" href="#home">
        <Compass size={14} strokeWidth={2} />
        Field Log
      </a>
      <ul className="nav-links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
