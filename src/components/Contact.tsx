import { CONTACT } from "../data";

const ROWS: { label: string; value: string; href?: (v: string) => string }[] = [
  { label: "Email", value: CONTACT.email, href: (v) => `mailto:${v}` },
  { label: "LinkedIn", value: CONTACT.linkedin, href: (v) => v },
  { label: "GitHub", value: CONTACT.github, href: (v) => v },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-head">
        <h2 className="section-title" id="contact-heading">
          Coordinates
        </h2>
        <span className="section-sub">Contact</span>
      </div>
      <ul className="link-list">
        {ROWS.map((row) => {
          const isEmpty = !row.value.trim();
          return (
            <li key={row.label}>
              {row.label} —{" "}
              {isEmpty ? (
                <span className="is-placeholder-inline">[ TBD ]</span>
              ) : (
                <a href={row.href ? row.href(row.value) : row.value} target="_blank" rel="noreferrer">
                  {row.value}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
