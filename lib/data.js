import { GoldTitle, GrayTitle } from "@/components/reusables";

export const LOGOS = [
  { src: "/amazon.svg", alt: "Amazon" },
  { src: "/atlassian.svg", alt: "Atlassian" },
  { src: "/google.webp", alt: "Google" },
  { src: "/meta.svg", alt: "Meta" },
  { src: "/microsoft.webp", alt: "Microsoft" },
  { src: "/netflix.png", alt: "Netflix" },
  { src: "/uber.svg", alt: "Uber" },
];

export const AVATARS = [
  { i: "RK", c: "from-emerald-900 to-emerald-700" },
  { i: "AS", c: "from-violet-900 to-violet-700" },
  { i: "PJ", c: "from-amber-900 to-amber-700" },
  { i: "ML", c: "from-sky-900 to-sky-700" },
  { i: "TC", c: "from-rose-900 to-rose-700" },
];

export const AI_TAGS = [
  { label: "Frontend Engineer", active: true },
  { label: "L5 Level", active: true },
  { label: "React Performance", active: false },
  { label: "System Design", active: false },
  { label: "Behavioural", active: true },
  { label: "DSA", active: false },
];

export const SLOTS = [
  {
    label: "Mon 10:00 AM",
    cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
  },
  { label: "Mon 2:00 PM", cls: "border-white/7 text-stone-500" },
  {
    label: "Tue 11:00 AM",
    cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
  },
  {
    label: "Wed 9:00 AM ✓",
    cls: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  },
  {
    label: "Thu 3:00 PM",
    cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
  },
];

export const PLANS = [
  {
    name: "Starter",
    price: "$29",
    credits: "5 credits / month",
    featured: false,
    features: [
      "5 mock interview sessions",
      "AI feedback reports",
      "Session recordings",
      "Pre & post-call chat",
      "All interviewer categories",
    ],
  },
  {
    name: "Pro",
    price: "$69",
    credits: "15 credits / month",
    featured: true,
    features: [
      "15 mock interview sessions",
      "Priority interviewer matching",
      "Advanced AI feedback",
      "Session recordings + playback",
      "Credits roll over (3 months)",
    ],
  },
  {
    name: "Elite",
    price: "$149",
    credits: "40 credits / month",
    featured: false,
    features: [
      "40 mock interview sessions",
      "FAANG-specialist interviewers",
      "Full AI feedback suite",
      "Unlimited credit rollover",
      "Dedicated success manager",
    ],
  },
];

export const ROLES = [
  {
    label: "Interviewee",
    title: <GrayTitle>Land the role you deserve</GrayTitle>,
    desc: "Stop guessing what interviewers want. Practice with people who've been on the other side and know exactly how top companies evaluate candidates.",
    perks: [
      "Browse by category: Frontend, Backend, System Design, PM",
      "Book sessions using monthly credits from your plan",
      "Receive AI-powered feedback after every session",
      "Access session recordings to review your performance",
      "Chat with your interviewer before and after the call",
    ],
  },
  {
    label: "Interviewer",
    title: <GoldTitle>Earn doing what you're great at</GoldTitle>,
    desc: "Share your knowledge, help engineers grow, and earn meaningful income on your own schedule. Set your slots, and we handle the rest.",
    perks: [
      "Set your own availability and session rates",
      "AI question generator tailored to each candidate's role",
      "Earn credits per session — withdraw any time",
      "Dashboard with credit balance and withdrawal requests",
    ],
  },
];
