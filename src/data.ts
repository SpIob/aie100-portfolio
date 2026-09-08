// Content lives here, separate from layout in App.tsx.
// Anything left as "" renders as a dashed placeholder slot. Fill it in
// and the placeholder styling drops away automatically.

export const PROFILE = {
  name: "Mico Arenga",
  program: "BS AI Engineering",
  yearLevel: "1st Year — Freshman",
  section: "Section A41",
  term: "SY 2026–2027",
  homeIntro: "Human. Thinker. Writer. Stranger.", // short line under your name on the Home section
};

export const ABOUT_ME = "I am a person who loves creating things, whether for fun or for a purpose. I chose AI Engineering because not only do I want to partake in a new field, but also to create systems that can benefit everyone. It's not about the credits; it's about delivering an impact."; // background + why AI Engineering — write this yourself, in your own voice

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

export interface Reflection {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
}

export const REFLECTIONS: Reflection[] = [
  {
    slug: "frosh-week",
    title: "FROSH WEEK",
    date: "2026-08-15",
    excerpt: "There's so many people here. A bit nervous, but I know my way around. Plus, I like how the events are set up.",
    content: `## First Week at Mapúa

There's so many people here. A bit nervous, but I know my way around. Plus, I like how the events are set up.

### Orientation Highlights

- Met some really cool people in my section (A41)
- The campus tour was helpful — Intramuros is bigger than I expected
- Got my student ID and enrolled in all 8 subjects

### What I'm Looking Forward To

1. **AIE100** — Finally getting into AI engineering proper
2. **MATH165/166** — Calculus and linear algebra, my strong suits
3. **CM011** — Programming fundamentals refresher

![Campus](/images/frosh-campus.jpg)

> "The journey of a thousand miles begins with a single step." — Lao Tzu

Here's a quick video from the welcome assembly:

![Welcome Assembly](https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4)

### Code Snippet

\`\`\`typescript
// My first AI Engineering note
interface Student {
  name: string;
  program: "BS AI Engineering";
  year: 1;
  ready: boolean;
}

const me: Student = {
  name: "Mico",
  program: "BS AI Engineering",
  year: 1,
  ready: true
};
\`\`\`

---

**Tags:** week-1, orientation, first-impressions`,
    coverImage: "/images/frosh-week.jpg",
    tags: ["week-1", "orientation"],
  },
  {
    slug: "week-two",
    title: "WEEK TWO",
    date: "2026-08-22",
    excerpt: "Classes have started. The pace is faster than SHS but manageable.",
    content: `## Week Two: Classes Begin

Classes have started. The pace is faster than SHS but manageable.

### Subject Updates

| Subject | Status | Notes |
|---------|--------|-------|
| AIE100 | 🟢 Started | Intro to AI concepts |
| CM011 | 🟢 Started | C++ basics review |
| MATH165 | 🟢 Started | Limits and continuity |
| MATH166 | 🟢 Started | Vectors and matrices |
| GED105 | 🟢 Started | Readings in Philippine History |
| FW01-2 | 🟢 Started | PE - Fitness |
| CM011L | 🟢 Started | Lab companion to CM011 |
| NSTP100 | 🟢 Started | CWTS orientation |

### Study Routine

Trying to build a consistent schedule:

\`\`\`
06:00 — Wake up, light stretch
06:30 — Review notes from previous day
07:00 — Breakfast / commute
08:00 — Classes
17:00 — Library / study block
19:00 — Dinner
20:00 — Personal projects / coding
22:00 — Wind down
23:00 — Sleep
\`\`\`

Let's see how long this lasts. 😅

![Study Setup](/images/week2-setup.jpg)`,
    coverImage: "/images/week-two.jpg",
    tags: ["week-2", "classes", "routine"],
  },
  {
    slug: "first-project",
    title: "FIRST PROJECT",
    date: "2026-09-01",
    excerpt: "Our first group project in AIE100 — building a simple classifier.",
    content: `## First Project: Simple Classifier

Our first group project in AIE100 — building a simple classifier.

### The Task

Build a binary classifier for the [Iris dataset](https://archive.ics.uci.edu/ml/datasets/iris) using only NumPy (no scikit-learn).

### Our Approach

1. **Data preprocessing** — Normalize features, split train/test
2. **Model** — Logistic regression from scratch
3. **Optimization** — Gradient descent with learning rate scheduling
4. **Evaluation** — Accuracy, precision, recall, F1

### Key Learnings

- Matrix operations in NumPy are powerful but need shape awareness
- Gradient descent is sensitive to learning rate — too high = divergence, too low = slow convergence
- Feature scaling matters enormously for gradient-based methods

### Code Highlights

\`\`\`python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def logistic_regression(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    w = np.zeros(n)
    b = 0
    
    for epoch in range(epochs):
        z = X @ w + b
        y_pred = sigmoid(z)
        
        # Gradients
        dw = (1/m) * X.T @ (y_pred - y)
        db = (1/m) * np.sum(y_pred - y)
        
        # Update
        w -= lr * dw
        b -= lr * db
        
        if epoch % 100 == 0:
            loss = -np.mean(y * np.log(y_pred) + (1-y) * np.log(1-y_pred))
            print(f"Epoch {epoch}: loss = {loss:.4f}")
    
    return w, b
\`\`\`

### Results

| Metric | Score |
|--------|-------|
| Accuracy | 96.7% |
| Precision | 95.8% |
| Recall | 97.2% |
| F1 | 96.5% |

Not bad for a from-scratch implementation!

![Model Performance](/images/first-project-results.png)

### Next Steps

- Try multi-class classification (softmax)
- Add regularization (L2)
- Experiment with different optimizers (Adam, RMSprop)`,
    coverImage: "/images/first-project.jpg",
    tags: ["week-3", "project", "ml", "numpy"],
  },
];

export const CONTACT = {
  email: "workitallman@proton.me",
  linkedin: "https://www.linkedin.com/in/arenga-mico/",
  github: "https://github.com/SpIob",
};

export const BOOT_LINES = [
  "INITIALIZING FIELD LOG…",
  "LOCATING START POINT — VALENZUELA CITY",
  "PLOTTING ROUTE — 8 LEGS, QUARTER ONE",
  `${PROFILE.term} · ${PROFILE.section}`,
];