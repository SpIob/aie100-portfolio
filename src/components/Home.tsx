import { Compass } from "lucide-react";
import { PROFILE } from "../data";
import { PlaceholderLine } from "./Placeholder";

export function Home() {
  return (
    <header className="masthead" id="home">
      <div className="kicker">
        <Compass size={13} strokeWidth={2} />
        Field Log · {PROFILE.term} · {PROFILE.section}
      </div>
      <h1 className="title">{PROFILE.name}</h1>
      <p className="subtitle">
        {PROFILE.program} · {PROFILE.yearLevel}
      </p>
      <p className="home-intro">
        <PlaceholderLine
          value={PROFILE.homeIntro}
          fallback="[ A one-line personal intro goes here — add it in data.ts. ]"
        />
      </p>
      <div className="status-line">STATUS — pre-departure · first entry not yet logged</div>
    </header>
  );
}
