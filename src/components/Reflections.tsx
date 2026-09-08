import { Link } from "react-router-dom";
import { REFLECTIONS } from "../data";
import { Slot } from "../App";

function Reflections() {
  return (
    <section id="reflections" className="reveal" aria-labelledby="reflections-heading">
      <div className="section-head">
        <h2 className="section-title" id="reflections-heading">
          Reflections / Blog
        </h2>
        <span className="section-sub">Weekly-ish entries</span>
      </div>
      <div className="card-grid">
        {REFLECTIONS.map((entry, i) => (
          <Link to={`/reflections/${entry.slug}`} className="card-link-wrapper" key={entry.slug}>
            <article className="card">
              {!entry.title.trim() && <span className="placeholder-tag">TBD</span>}
              <div className="card-eyebrow">Entry {String(i + 1).padStart(2, "0")}</div>
              <h3 className={`card-title${entry.title.trim() ? " filled" : ""}`}>
                <Slot value={entry.title} fallback="[ Title to come ]" />
              </h3>
              <p className={`card-body${entry.excerpt.trim() ? " filled" : ""}`}>
                <Slot value={entry.excerpt} fallback="[ A short reflection on what you learned or experienced goes here. ]" />
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Reflections;