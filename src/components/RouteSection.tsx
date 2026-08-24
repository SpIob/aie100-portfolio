import { MapPin } from "lucide-react";
import { WAYPOINTS } from "../data";
import { PlaceholderBlock } from "./Placeholder";

const STATUS_LABEL: Record<string, string> = {
  "not-started": "Not yet logged",
  "in-progress": "In progress",
  complete: "Logged",
};

export function RouteSection() {
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
              <MapPin size={13} strokeWidth={2} color="#B4842A" />
              <span className="route-code">{wp.code}</span>
              <span className="status-pill">{STATUS_LABEL[wp.status]}</span>
            </div>
            <PlaceholderBlock
              value={wp.entry}
              fallback="[ Reflection for this leg goes here once it's written. ]"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
