// Content lives here, separate from layout in App.tsx.
// Anything left as "" renders as a dashed placeholder slot. Fill it in
// and the placeholder styling drops away automatically.

export const PROFILE = {
  name: "Mico Arenga",
  program: "BS AI Engineering",
  yearLevel: "1st Year — Freshman",
  section: "Sec A41",
  term: "SY 2026–2027",
  homeIntro: "", // short line under your name on the Home section
};

export const ABOUT_ME = ""; // background + why AI Engineering — write this yourself, in your own voice

export type LegStatus = "not-started" | "in-progress" | "complete";

export const WAYPOINTS: { code: string; status: LegStatus; entry: string }[] = [
  { code: "AIE100", status: "not-started", entry: "" },
  { code: "CM011", status: "not-started", entry: "" },
  { code: "CM011L", status: "not-started", entry: "" },
  { code: "FW01-2", status: "not-started", entry: "" },
  { code: "GED105", status: "not-started", entry: "" },
  { code: "MATH165", status: "not-started", entry: "" },
  { code: "MATH166", status: "not-started", entry: "" },
  { code: "NSTP100", status: "not-started", entry: "" },
];

// Swap, edit, reorder, or delete freely. Add new ones in the same shape.
export const PORTFOLIO_ITEMS = [
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

export const REFLECTIONS = [
  { title: "", body: "" },
  { title: "", body: "" },
  { title: "", body: "" },
];

export const CONTACT = {
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
