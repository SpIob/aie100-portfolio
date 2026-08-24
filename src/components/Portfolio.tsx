import { PORTFOLIO_ITEMS } from "../data";

export function Portfolio() {
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
