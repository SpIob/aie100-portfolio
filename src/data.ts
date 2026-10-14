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
  { code: "AIE100", status: "complete", entry: "AI Engineering is the sole reason I applied here in Mapúa University. I've always wanted to build and innovate systems or technologies that could benefit many people. But like everything else, this course is only just an introductory course. Not much has happened, other than learning the core fundamentals behind engineering and developing this very portfolio website as this course's major output." },
  { code: "CM011", status: "complete", entry: "Chemistry has been the only branch of science that I consider to be the bane of my existence. Memorizing all of the formulas was enough, but also understanding the key terms and definitions, let alone the names of said terms? I'd pass all of that away, but I'm not a quitter. I soon grew to appreciate the course, though. The problem-solving and practicing was the fun part of this course, because it allowed me to understand how certain formulas work." },
  { code: "CM011L", status: "complete", entry: "Did you know? Throughout my educational journey, I never once stepped inside a laboratory. It's crazy, and I expected to be burned to ash in this course, or turn into a giant green raging monster, but I had a great time during this course. I mostly done the calculations and problem-solving, while the rest of my group conducts the actual experiments. I wish I joined them, but I'm afraid I might break a beaker or something." },
  { code: "FW01-2", status: "complete", entry: "Objectively, the most fun course out of the rest, and I don't even like PE. I think the best part about this course is that there were so many fun activities to do, despite most of them being quite exhausting and draining. I had a really great time with the rest of the class during our classes here." },
  { code: "GED105", status: "complete", entry: "Despite the lack of interest in the subject, and the cornucopia of materials to review and assignments to complete, not to mention that said assignments were usually deployed just two weeks or less before their respective deadline, I feel that this course had a lot of potential. The things that you can learn from this course are valuable because they give you this fresh perspective on world systems and the future." },
  { code: "MATH165", status: "complete", entry: "Math has always been my love-hate relationship. I love solving math problems, but at the same time, I despise having to learn so many formulas and stuff. However, that all changed. Despite this course not being totally difficult, there was a lot of stuff to deal with here, so I came in mentally prepared so that I don't have to worry about the sheer volume of assignments and the exams at the same time." },
  { code: "MATH166", status: "complete", entry: "I entered this course, thinking it would be quite easy, given that I solved a lot of trigonometry problems back then, but boy oh boy was I wrong. There were a lot of times where the problems in the exams and assignments that were quite challenging, and I honestly got humbled. But it didn't stop me from doing my best. Despite not having the scores for any of my assignments or exams yet, I still believe that I did a good job." },
  { code: "NSTP100", status: "complete", entry: "At first, I didn't think this course would mean that much, but as the weeks continued, I realized it might actually be the most practical course I've taken so far, with regards to real-world situations. I did a lot of bandaging techniques and even planted my own tree. Despite only having one class per week, I really learned a lot from this course." },
];

// Swap, edit, reorder, or delete freely. Add new ones in the same shape.
export const PORTFOLIO_ITEMS = [
  {
    title: "Bagong Enerhiya",
    description: "Open-source AI literature intelligence tool.",
    tag: "Personal - Research Tool",
    link: "https://github.com/SpIob/Bagong-Enerhiya",
  },
  {
    title: "DepTend",
    description: "Dependency vulnerability prioritization dashboard and CLI.",
    tag: "Personal - Dashboard + CLI",
    link: "https://deptend.vercel.app",
  },
  {
    title: "FlowState",
    description: "Tauri desktop app for cognitive state management.",
    tag: "Personal - Desktop app",
    link: "https://github.com/SpIob/FlowState",
  },
  {
    title: "Groundstate",
    description: "Open-source AI-powered pipeline for energy alternatives research.",
    tag: "Personal - Research Tool",
    link: "https://github.com/SpIob/groundstate"
  },
  {
    title: "MATH165 Assessments Portfolio",
    description: "Portfolio of all MATH165 assessments.",
    tag: "MATH165 - Portfolio",
    link: "https://canva.link/icy4630ejqe7nlx"
  },
  {
    title: "NSTP100 Works Folder",
    description: "Folder of all NSTP100 works (essays, videos, etc.).",
    tag: "NSTP100 - Portfolio",
    link: "https://mymailmapuaedu-my.sharepoint.com/:f:/g/personal/jmmarenga_mymail_mapua_edu_ph/IgAtihjFvrTKTb4LMRNlE_08AWZ2zFT_wDRNHYUKK1e2big?e=lx12Xu"
  },
  {
    title: "GED105 Essays Folder",
    description: "Folder of all GED105 essays.",
    tag: "GED105 - Portfolio",
    link: "https://drive.google.com/drive/folders/1GMnv-LxRz_N7MxOHE2q3xUTllkj8mkEJ?usp=sharing"
  }
];

export interface Reflection {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverWidth?: number;
  coverHeight?: number;
  tags?: string[];
}

// Cover images live in public/photos/. Drop a photo into the folder and
// reference it by filename: photo("IMG_8412.JPG"). The helper adds the
// site's base path so it works in dev and on GitHub Pages.
const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`;

export const REFLECTIONS: Reflection[] = [
  {
    slug: "frosh-week",
    title: "FROSH WEEK",
    date: "2026-08-09",
    excerpt: "tons of people around here, huh?",
    content: `## First Week at Mapúa

Love how the campus is so lively and full of people. The first week was mostly orientation, getting to know the campus, and sitting in a dark corner.

I forgot to take a photo during my first week here, so I just uploaded a photo of how I felt during that whole time.

So far, I like the campus. It's a bit crowded at times, but the facilities are nice, especially the library. Though one thing I had to learn was that you REALLY got to be early in the library if you want to take a seat.

Other than all of that, it was mostly orientations and brief course introductions throughout the whole week. I already studied some topics in advance, so I'm confident that I can do well here.`,
    coverImage: photo("guy-in-corner-of-party-3725801197.png"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-1", "orientation"],
  },
  {
    slug: "week-two",
    title: "WEEK TWO",
    date: "2026-08-16",
    excerpt: "Online class, amiright?",
    content: `## Week Two: Classes Officially Begin

Classes have officially begun... online. I was expecting a typhoon to hit soon, but I didn't think that my first few weeks at Mapúa would be done online. Felt quite comfortable though, in my own room hehe.

Most of the lectures were already quite familiar, especially with MATH165, MATH166, and CM011. Our PE class, FW01-2, was also done online and we had to do a physical activity, which felt quite weird. Other than that, I mostly spent this week just listening to the lectures in the background while I work on other things.

Before classes even started, I already knew that the only proper way to learn in college is by studying by myself. Lectures are fun and all, but they're only there so that you can keep up with the syllabus. In order for you to actually learn, you gotta know how to study.

Despite all that, it was a pretty calm week so far, so here's a little photo to cheer myself up.

`,
    coverImage: photo("IMG_8292.jpg"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-2", "classes", "routine"],
  },
  {
    slug: "week-three",
    title: "WEEK 🌳",
    date: "2026-08-23",
    excerpt: "It's basically more of the same stuff, tbh.",
    content: `## Week Three: Week 2 Part 2

After a whole week of online classes, I already miss online classes. Why can't every week just be online classes? 😭😭 I like classes at the comfort of my own room huhu.

Putting aside my exaggerated feelings, this week was mostly the same as last week. More lectures, same old stuff. I got to know a little bit more about my classmates, though I still prefer spending time alone in the library. At times, I do find it really difficult to focus on my studies and works in the library, because I do notice a handful of students just hanging around there doing nothing. Not that I'm calling them lazy by any means. I also see a lot of others actually studying and whatnot.

The more I spent time looking over the syllabus and reflecting on my studies, I was beginning to realize how much content is crammed into just this one term. A part of me is forcing me to advance my works and studies further, but there's also a part of me wanting to take a break every now and then. As much as I could, I try to balance those two.

`,
    coverImage: photo("wp2506817-4294580222.jpg"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-3", "classes", "routine"],
  },
  {
    slug: "week-four",
    title: "THE CALM BE-4 THE STORM",
    date: "2026-08-30",
    excerpt: "first set of exams is near...",
    content: `## It Was Fun While It Lasted (Not Really)

Wow. The first set of exams is already next week? But classes only began one-- oh.

I didn't really notice just how time flew by in the span of just a few weeks. It felt like classes just started yesterday. Guess that's what studying all day every week gets you.

So far, I feel that I'm doing pretty well in my classes. I've already more than half of the assignments in advance, so that I have plenty of time to review. Even then, I think I've already prepared myself enough for the upcoming exams. "Just don't jinx it," says me to I.

For me, while reviewing, CM011 (or General Chemistry) was the real hurdle. I didn't really like chemistry in general; I do find some of the problem-solving stuff a bit fun, but the worst part about chemistry is having to memorize all the names and whatnot. Math is pretty straightforward, but then again, I'm not immune to mistakes.

`,
    tags: ["week-4", "classes", "routine"],
  },
  {
    slug: "week-five",
    title: "dear god...",
    date: "2026-09-06",
    excerpt: "...what have i gotten myself into?",
    content: `## The Week of the First Exams

I believe the title of this reflection post says it all. While it was not the worst thing that's ever happened to me in my entire life, it really gave me a reality check, because what the hell was that?

The first exam we had was for MATH165, and it was not that bad. There were some challenging questions, and I really found it surprising that I struggled with the true-or-false items than the problem-solving ones. Like, bruh? You can solve a ten-page-long equation, but you can't decide that 1 + 1 = 2 is true or false? Overall, the MATH165 was somewhat of a breeze.

CM011 was actually quite bearable too. It took a lot of reflecting on my solutions, because majority of the exam was mostly multiple-choice questions, and I breezed through them all. The problem-solving questions gave a fair amount of challenge too.

But none of them compared to the MATH166 exam. It was like eating sandpaper while trying to balance yourself on a rope. I really thought that I had prepared for the exam, but then I just got slammed with questions that weren't even discussed in any prior discussion. The "no calculator" rule was the least of my concern, because I was genuinely bedazzled by the questions.

`,
    coverImage: photo("05onfire1_xp-facebookJumbo-1574494175.jpg"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-5", "hell", "exams"],
  },
  {
    slug: "week-six",
    title: "Relax a bit, or study?",
    date: "2026-09-13",
    excerpt: "I just wanna live atp.",
    content: `## Week Six: Seven Days of Trying to Relax After Last Week

After last week, I decided that "I can't just lock in." I gotta LOCK IN.

Despite the torment that I still carried from last week, I still tried to relax a bit. I did some reading, and I also did some writing. I also tried to do some coding, but I didn't really get much done.

But above all, I did a LOT of advanced studying. I really wanted to get ahead of the syllabus, so I did a lot of reading and reviewing. It's at that point where I really don't want to underestimate anything anymore.

However, I'm still quite bummed about last week, so here's a lil cat to cheer me up.

`,
    coverImage: photo("IMG_8412.JPG"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-6", "classes", "routine"],
  },
  {
    slug: "week-seven",
    title: "Side Quests",
    date: "2026-09-20",
    excerpt: "Gotta have something else to do, other than studying.",
    content: `## Week Seven: Side Quests

This week was quite chill compared to the previous weeks. Of course, studying never left, and I reviewed tons of material in advance, practiced math problems as much as I could, and played a bit of video games during my free time, because why not?

But there was one unique thing about this week: there was an upcoming masterclass conference between Coursera and Mapúa, with some people from Coursera coming over in person to talk about AI. I wanted to join not only to gain connections, but also to learn more about AI and how it can be applied in the real world.

I registered for my seat in advance, and I asked our AIE professor if I could get a leave of absence for that day, since the conference runs through our entire class time. Then, he said that he would require ALL AIE students to attend the conference, which was a bit of a shock; but then again, it's a conference about AI.

No matter the case, I learned a lot from the conference, and I also got to meet some people from Coursera. It was a great experience, and I hope to attend more conferences like this in the future.

`,
    coverImage: photo("IMG_8462.JPG"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-7", "classes", "masterclass"],
  },
  {
    slug: "week-eight",
    title: "Another One Bites the Dust",
    date: "2026-09-27",
    excerpt: "and another one gone, and another one gone, and another...",
    content: `## Week 8: Two Exams Down, One... Actually, Two More to Go

I know I expected the exams would be a bit easier for each succeeding part, but I didn't expect to be this easy (I think; the scores haven't released yet).

Like always, I have prepared for the exams in advance, and I did a lot of reviewing and practicing. I also did some side quests, like reading and writing, because I wanted to have something else to do other than studying, but I mostly did those to relax my mind a bit.

Upon doing the exams, I felt that they were relatively easy. Either I studied or prepared a lot, or they were simply that easy... so far. The CM011 (General Chemistry) exam was moved to next week, which should give me enough time to prepare for the quiz and study for the finals in advance.

`,
    coverImage: photo("IMG_8450.JPG"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-8", "hell", "exams"],
  },
  {
    slug: "week-nine",
    title: "It's been nine weeks already?",
    date: "2026-10-04",
    excerpt: "But classes started yesterday...",
    content: `## Week Nine: Few More Steps Left to GO

Throughout this entire week, I can already feel the end of the term approaching, meaning that I can also feel the amount of studying that I have to do in such short time to prepare for the finals.

Because I wanted to make my life a little easier, I had one full day of rest, another for completing any requirements left before the due date, and one last full day for studying in advance. I feel that I still know most of the lectures in the past, so the full review day session only lasted a while. It did help me remember some of the key formulas and whatnot.

And, since I also wanted to improve my credentials and knowledge on research, I also attended a research conference. Students were meant to attend online via Zoom, but in Luma, there was an option to attend the event face-to-face, which I did. It was a great experience, and I learned a lot about research and systematic reviews and how it can be applied in the real world.

I still have yet to get my certificate of attendance, though.

Other than that, the CM011 exam was kinda challenging, since it happened right after the research event, and almost all of my brain focused on the discussed there. I still managed to solve all of the problems in the exam, though I did struggle a bit.

`,
    coverImage: photo("IMG_8440.JPG"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-9", "relaxation", "exams"],
  },
  {
    slug: "week-ten",
    title: "Praying for a Miracle",
    date: "2026-10-11",
    excerpt: "The second-to-last exams have finished, but it's not yet over...",
    content: `## Week Ten: Almost There

I don't know if I can put a lot in this post right now. I'm currently REALLY tired and I have yet to review for the finals; but we'll see where this post leads me, because fortunately I have a LOT of things to say.

This week was quite a challenge. Not only was I preparing for this week's exams, but I also have to prepare for the finals, which is already tomorrow, as of the time I'm writing this post. I wanted to get all of this out of the way, so I can just focus on the materials right after.

Most of the exams were moderately challenging... in a way... Actually, not much. The MATH165 CO3 exam was conducted via Lockdown Browser, which I'm already familiar with, when answering the MPASS exam. I don't know why, but answering the exam in this format felt quite easier, because not only were all of the questions in multiple-choice formats, but that the questions were designed in a way that is challenging enought but also easy enough that it can be answered in Lockdown Browser.

The CM011 C03 exam was not that bad. I breezed through the entire exam in less than an hour. Although I did expect the exam to be quite challenging, since the lessons about Polymers and Electrochemistry were quite dense and complex. We also had our finals exam for CM011L on Friday, which tackled all of the previous lessons and experiments we've conducted throughout the whole term. Most of the multiple choice items were quite confusing, and I did make an educated guess on most of them, but the problem-solving items were alright.

All of that sounded like this week wasn't that bad, right?

Yeah, there was one exam that didn't go too well.

Having read the previous posts, you'd know which one I'm talking about. MATH166. At this point, it has become the bane of my existence, because HOLY COW. MORE THAN HALF OF THE ITEMS IN THIS EXAM WERENT EVEN DISCUSSED IN CLASS, AND OUR INSTRUCTOR HAD TO TEACH US WHAT SHE DIDNT TAUGHT WHILE WE'RE ANSWERING.
`,
    coverImage: photo("IMG_8419.jpg"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-10", "hell", "exams"],
  },
  {
    slug: "week-eleven",
    title: "The End of the Term",
    date: "2026-10-14",
    excerpt: "phew...",
    content: `## Week Eleven: The Finals

Oh man... It's finally over. 

I don't know why I wrote that down, as if I had already spent more than four years here at Mapúa. Like, dude, it's just the first three months. 

At the time of this post, I'm still quite exhausted from the finals, and this portfolio website is the last thing I have to do before the grades are released. It's just so exhausting having to prepare for last week's exams only to prepare again for the finals less than a week later. Thankfully, I still remembered most of the topics discussed, so I only needed to test my recall; but even then, it was still a challenging period.

The three exams we had were MATH165, MATH166, and CM011. Each of them were quite challenging in their own way. Like always, it's the MATH166 exam that was the most infuriating of all. Not challenging. It's just damn annoying that our instructor didn't teach us the topics that were supposed to be discussed in class. After the CO3 exam, I double-checked the course syllabus and found that half of what she taught wasn't even in the syllabus.

There's not much to do now, other than finish this portfolio website and pray to God that I passed in all of the courses, especially MATH166. I have already finished all of the assignments and stuff way in advance, so the only thing I have to finish is, again, this website.

---

So far, my Mapúan journey has been an insane rollercoaster ride. There were a ton of stressful moments: teachers not discussing the right material, the abundance of assignments to accomplish, the complexity of the lessons, etc. But there were also some fun memories, and I had a really great time helping my classmates whenever they need help reviewing lectures or simply wanting to hang out. There's still many ways to go, but I feel that I have already caught a sense of how the road is going to be like in the future.

`,
    coverImage: photo("guybreakingchain.jpg"),
    coverWidth: 1200,
    coverHeight: 675,
    tags: ["week-11", "end-of-term", "reflection"],
  }
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