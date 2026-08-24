import { ABOUT_ME } from "../data";
import { PlaceholderBlock } from "./Placeholder";

export function AboutMe() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="section-head">
        <h2 className="section-title" id="about-heading">
          About Me
        </h2>
        <span className="section-sub">Background · why AI Engineering</span>
      </div>
      <PlaceholderBlock
        value={ABOUT_ME}
        fallback="[ A paragraph or two on your background, and why AI Engineering. This is the section people actually read closely — write it yourself, in your own voice, per the rubric. Edit ABOUT_ME in data.ts. ]"
      />
    </section>
  );
}
