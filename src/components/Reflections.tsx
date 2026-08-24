import { REFLECTIONS } from "../data";

export function Reflections() {
  return (
    <section id="reflections" aria-labelledby="reflections-heading">
      <div className="section-head">
        <h2 className="section-title" id="reflections-heading">
          Reflections / Blog
        </h2>
        <span className="section-sub">Weekly-ish entries</span>
      </div>
      <div className="card-grid">
        {REFLECTIONS.map((entry, i) => {
          const isEmpty = !entry.title.trim();
          return (
            <article className="card" key={i}>
              {isEmpty && <span className="placeholder-tag">TBD</span>}
              <div className="card-eyebrow">Entry {String(i + 1).padStart(2, "0")}</div>
              <h3 className={`card-title ${isEmpty ? "" : "filled"}`}>
                {isEmpty ? "[ Title to come ]" : entry.title}
              </h3>
              <p className={`card-body ${isEmpty ? "" : "filled"}`}>
                {isEmpty
                  ? "[ A short reflection on what you learned or experienced goes here. ]"
                  : entry.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
