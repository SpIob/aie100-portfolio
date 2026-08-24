// ---------------------------------------------------------------------------
// Content lives here, separate from the components that render it.
// Anything left as an empty string ("") renders as a dashed placeholder
// slot in the UI. Fill a field in and its placeholder styling drops away
// automatically — no other file needs to change.
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  program: string;
  yearLevel: string;
  section: string;
  term: string;
  homeIntro: string; // short line under your name on the Home section
}

export const PROFILE: Profile = {
  name: "Mico Arenga",
  program: "BS AI Engineering",
  yearLevel: "1st Year — Freshman",
  section: "Sec A41",
  term: "SY 2026–2027",
  homeIntro: "",
};

export const ABOUT_ME = ""; // background + why AI Engineering — write this yourself, in your own voice

export type RouteStatus = "not-started" | "in-progress" | "complete";

export interface Waypoint {
  code: string;
  title: string;
  status: RouteStatus;
  entry: string;
}

export const WAYPOINTS: Waypoint[] = [
  { code: "AIE100", title: "", status: "not-started", entry: "" },
  { code: "CM011", title: "", status: "not-started", entry: "" },
  { code: "CM011L", title: "", status: "not-started", entry: "" },
  { code: "FW01-2", title: "", status: "not-started", entry: "" },
  { code: "GED105", title: "", status: "not-started", entry: "" },
  { code: "MATH165", title: "", status: "not-started", entry: "" },
  { code: "MATH166", title: "", status: "not-started", entry: "" },
  { code: "NSTP100", title: "", status: "not-started", entry: "" },
];

export interface PortfolioItem {
  title: string;
  description: string;
  tag: string;
  link: string;
}

// Starter entries pulled from projects you've already got going — swap,
// edit, reorder, or delete freely. Add new ones the same shape.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "Bagong Enerhiya",
    description: "Open-source AI literature intelligence tool.",
    tag: "Open source",
    link: "https://github.com/SpIob/Bagong-Enerhiya",
  },
  {
    title: "DepTend",
    description: "Dependency vulnerability prioritization dashboard and CLI.",
    tag: "Dashboard + CLI",
    link: "https://deptend.vercel.app",
  },
  {
    title: "FlowState",
    description: "Tauri desktop app for cognitive state management.",
    tag: "Desktop app",
    link: "https://github.com/SpIob/FlowState",
  },
];

export interface JournalEntry {
  title: string;
  date: string;
  body: string;
}

export const REFLECTIONS: JournalEntry[] = [
  { title: "", date: "", body: "" },
  { title: "", date: "", body: "" },
  { title: "", date: "", body: "" },
];

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

export const CONTACT: ContactInfo = {
  email: "",
  linkedin: "",
  github: "https://github.com/SpIob",
};

export const BOOT_LINES = [
  "INITIALIZING FIELD LOG…",
  "LOCATING START POINT — VALENZUELA CITY",
  "PLOTTING ROUTE — 8 LEGS, QUARTER ONE",
  `${PROFILE.term} · ${PROFILE.section}`,
];
