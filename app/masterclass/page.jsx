import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import logoUrl from "@/public/assets/TS.png";
import teensToCamera from "@/public/assets/masterclassesImages/1bb9291256134df4acc9d52c9133e91f.jpg.webp";
import teensBuilding from "@/public/assets/masterclassesImages/6e306fb0ca5446408c469ea63ce7eba0.jpg.webp";
import teensDelighted from "@/public/assets/masterclassesImages/719166dde518487e8fe872135b4ed585.jpg.webp";
import brandStudents from "@/public/assets/masterclassesImages/Untitled design (11).webp";
import {
  ArrowRight,
  Brain,
  CalendarBlank,
  ChatCircleText,
  CheckCircle,
  Clock,
  GraduationCap,
  Hammer,
  LockKey,
  MagnifyingGlass,
  Megaphone,
  Path,
  Rocket,
  SealCheck,
  Sparkle,
  Trophy,
  Users,
  VideoCamera,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const PAYMENT_URL = "https://payments.cashfree.com/forms/AIFounderMasterclass";

const DETAILS = {
  time: "10 AM to 2 PM",
  duration: "4 hours",
  ages: "13 to 18",
  grades: "Class 8 to 12",
  format: "Virtual, live online",
  seats: 20,
};

const PRICING = { mrp: 1999, now: 499 };
const DISCOUNT_PCT = Math.round((1 - PRICING.now / PRICING.mrp) * 100);
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

// The masterclass runs every Saturday, so the date is derived at render time
// (see `revalidate` below) instead of being hardcoded and going stale.
function upcomingSaturday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const [y, m, d] = parts.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + ((6 - dt.getUTCDay() + 7) % 7));
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(dt);
}

export const revalidate = 3600;

export const metadata = {
  title: "Young AI Masterminds | TeenSkool AI & Entrepreneurship Masterclass",
  description:
    "A live 4 hour Saturday masterclass where your child builds a real startup with AI, guided by IIT mentors and working founders. Ages 13 to 18. No coding required.",
};

// Each row pairs the gap a parent already feels with what the session does
// about it. The hour by hour detail lives in the session timeline below.
const GAPS = [
  {
    n: "01",
    gap: "Information is not the same as skill",
    gapBody:
      "Your child can look anything up. What is missing is deciding what is worth doing, and then actually doing it.",
    icon: MagnifyingGlass,
    fix: "They start from a real problem",
    fixBody:
      "Not a topic handed to them. Something they noticed themselves and genuinely want solved, pressure tested with AI until it holds up.",
  },
  {
    n: "02",
    gap: "No syllabus covers this",
    gapBody:
      "Critical thinking, creative confidence and an entrepreneurial mindset shape careers. None of them appear on a report card.",
    icon: Hammer,
    fix: "They build the thing themselves",
    fixBody:
      "A working prototype, a brand and a pitch deck, made during the session with AI and no coding at all.",
  },
  {
    n: "03",
    gap: "The AI era is already here",
    gapBody:
      "Children who learn to use AI as a tool rather than a shortcut will lead. The rest will spend years catching up.",
    icon: Megaphone,
    fix: "They put it in front of real people",
    fixBody:
      "They pitch live to IIT mentors and working founders, get honest feedback, and the pitch is recorded and published.",
  },
];

const TIMELINE = [
  {
    time: "10:00 AM",
    title: "Welcome and mindset shift",
    body: "Your child stops thinking like a student and starts thinking like a builder. The founder identity is set here.",
  },
  {
    time: "10:45 AM",
    title: "Problem finding and validation",
    body: "They pick a real problem and use AI to check it. Who actually has this problem? Would anyone pay to solve it?",
  },
  {
    time: "11:45 AM",
    title: "Break",
    body: "Fifteen minutes to recharge before the building starts.",
  },
  {
    time: "12:00 PM",
    title: "Build with AI tools",
    body: "Startup name, logo, brand identity and pitch deck, all created live. Mentors guide each student in real time.",
  },
  {
    time: "1:30 PM",
    title: "Mini pitch competition",
    body: "Your child presents their idea to IIT mentors and working founders, and gets honest feedback on the spot.",
    badge: "Pitch recorded and published on YouTube",
  },
  {
    time: "2:00 PM",
    title: "Certificate and community",
    body: "Completion certificate issued, and your child joins the Young AI Masterminds community of builders.",
  },
];

const OUTCOMES = [
  {
    icon: Brain,
    title: "The builder mindset",
    body: "They stop seeing problems as obstacles and start seeing them as openings. That thinking carries into everything else.",
  },
  {
    icon: Sparkle,
    title: "Lifetime platform access",
    body: "AI Co-Founder, the community of young builders, founder sessions and weekly challenges. All of it, for good.",
  },
  {
    icon: ChatCircleText,
    title: "Confidence to present and lead",
    body: "Standing up and defending your thinking in front of people who know more than you. That confidence comes from having done it once.",
  },
  {
    icon: Path,
    title: "A way of thinking that transfers",
    body: "Spot a problem, test the assumption, ship something imperfect, improve it. It works far beyond startups.",
  },
];

const STATS = [
  { value: "500", suffix: "+", label: "Students trained" },
  { value: "20", suffix: "", label: "Max seats per batch" },
  { value: "4", suffix: "hrs", label: "One Saturday morning" },
  { value: "100", suffix: "%", label: "Hands on, not theory" },
];

const QUESTIONS = [
  {
    q: "Does my child need to know how to code?",
    a: "No. Zero coding and no prior tech knowledge. The AI tools handle the technical side, so your child brings ideas and curiosity. Some of our strongest sessions have come from students who had never built anything before.",
  },
  {
    q: "My child is not interested in entrepreneurship. Is this still worth it?",
    a: "Most students feel that way before joining. Interest tends to appear once they are building around something they already care about, like a sport or a problem they notice every day. The session is designed to create that interest rather than assume it.",
  },
  {
    q: "Will they just be watching a screen?",
    a: "No. Your child is using AI tools, building, working with others and presenting live. When a teenager is making something they own, attention is rarely the problem.",
  },
  {
    q: "What if they do not have an idea yet?",
    a: "That is exactly where we start. The first module is about finding a problem worth solving, so nobody needs to arrive with an idea ready.",
  },
  {
    q: "Who is teaching the session?",
    a: "IIT graduates and working startup founders who build for a living, not a pre recorded video. Your child gets live feedback on their own idea.",
  },
  {
    q: "What if my child cannot attend on the session date?",
    a: "Tell us and we will move your child to the next available batch at no extra cost.",
  },
  {
    q: "What do they need on the day?",
    a: "A laptop or desktop, a steady internet connection, and the joining link we send after registration. That is all.",
  },
];

const PAGE_CSS = `
.ts-page { color-scheme: light; font-family: var(--font-body), system-ui, sans-serif; }
.ts-page .font-display { font-family: var(--font-display), system-ui, sans-serif; }
.ts-glass {
  isolation: isolate;
  background: linear-gradient(140deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58));
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.95),
    inset 0 -1px 0 rgba(255,255,255,0.3),
    0 30px 60px -28px rgba(30,52,18,0.38);
}
.ts-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(120% 70% at 12% -10%, rgba(255,255,255,0.7), transparent 55%),
    radial-gradient(80% 50% at 100% 110%, rgba(190,236,110,0.22), transparent 60%);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .ts-glass { background: rgba(255,255,255,0.92); }
}
.ts-grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: multiply;
}
/* Highlight that follows the text across line breaks, unlike an absolutely
   positioned bar which would stretch to the width of the whole inline box. */
.ts-mark {
  background-image: linear-gradient(to top, #c6ef6b 0.3em, transparent 0.3em);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  padding-inline: 0.06em;
}
.ts-page a, .ts-page button { touch-action: manipulation; }
.ts-page :focus-visible { outline: 2px solid #3f6b0c; outline-offset: 3px; }
.ts-dark :focus-visible { outline-color: #c6ef6b; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: no-preference) {
  @keyframes ts-drift {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(3%, -4%, 0) scale(1.06); }
  }
  .ts-drift { animation: ts-drift 18s ease-in-out infinite; }
  .ts-drift-slow { animation: ts-drift 26s ease-in-out infinite reverse; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`;

function PrimaryCta({ children = "Reserve a seat", className = "", size = "md" }) {
  const sizing = size === "lg" ? "h-14 px-8 text-[17px]" : "h-12 px-6 text-base";
  return (
    <a
      href={PAYMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#9ed62f] font-semibold text-[#14201a] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_30px_-12px_rgba(90,140,20,0.7)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#aee344] active:scale-[0.98] ${sizing} ${className}`}
    >
      {children}
      <ArrowRight
        weight="bold"
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </a>
  );
}

// The TS.png wordmark is white-on-dark, so only the lime mark is cropped out
// of it and the wordmark is set as text on this light page.
function Brand({ size = "h-8", tone = "light" }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`relative ${size} aspect-square flex-none overflow-hidden rounded-lg`}>
        <Image src={logoUrl} alt="" fill sizes="36px" className="object-cover object-left" priority />
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          tone === "dark" ? "text-white" : "text-[#14201a]"
        }`}
      >
        Teen<span className="text-[#4d7f12]">Skool</span>
      </span>
    </span>
  );
}

function Price({ size = "md", align = "left" }) {
  const amount = size === "lg" ? "text-[2rem]" : "text-[1.6rem]";
  return (
    <div className={`flex flex-col ${align === "right" ? "sm:items-end sm:text-right" : ""}`}>
      <p className="text-xs font-medium text-[#5d6a62]">Fee</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className={`font-display ${amount} font-bold leading-none tracking-tight`}>
          {inr(PRICING.now)}
        </span>
        <span className="text-sm font-medium text-[#5d6a62]">
          <span className="sr-only">Regular price </span>
          <s>{inr(PRICING.mrp)}</s>
        </span>
      </p>
      <p className="mt-2 inline-flex w-fit items-center rounded-full bg-[#14201a] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.06em] text-[#c6ef6b]">
        Save {DISCOUNT_PCT}%
      </p>
    </div>
  );
}

function SessionFacts({ className = "" }) {
  const rows = [
    { icon: CalendarBlank, label: "Next session", value: upcomingSaturday() },
    { icon: Clock, label: "Time", value: `${DETAILS.time} IST` },
    { icon: VideoCamera, label: "Format", value: DETAILS.format },
  ];
  return (
    <dl className={`space-y-3 ${className}`}>
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/70 ring-1 ring-[#14201a]/5">
            <Icon weight="duotone" aria-hidden className="h-[18px] w-[18px] text-[#3f6b0c]" />
          </span>
          <div className="min-w-0">
            <dt className="text-xs font-medium text-[#5d6a62]">{label}</dt>
            <dd className="truncate text-[15px] font-semibold text-[#14201a]">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function Eyebrow({ children, tone = "light", className = "" }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-[#a3e635]" : "text-[#3f6b0c]"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export default function MasterclassPage() {
  const nextSession = upcomingSaturday();

  return (
    <div
      className={`ts-page ${display.variable} ${body.variable} relative min-h-[100dvh] overflow-x-clip bg-[#f4f7f0] text-[#14201a] antialiased`}
    >
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[#14201a] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Scarcity bar */}
      <div className="relative z-[60] bg-[#14201a] px-4 py-2.5 text-center text-[13px] font-semibold text-[#c6ef6b]">
        Only {DETAILS.seats} seats per batch
        <span className="mx-2 text-white/30">|</span>
        <span className="text-white">Next batch: {nextSession}</span>
      </div>

      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
        <div className="ts-drift absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#d4f28a] opacity-60 blur-[110px]" />
        <div className="ts-drift-slow absolute -right-32 top-20 h-[520px] w-[520px] rounded-full bg-[#bfe8d3] opacity-70 blur-[110px]" />
      </div>
      <div aria-hidden className="ts-grain pointer-events-none fixed inset-0 z-[1]" />

      {/* Nav */}
      <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-6">
        <nav
          aria-label="Main"
          className="ts-glass relative mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-4 pr-1.5 sm:h-16 sm:pl-5 sm:pr-2"
        >
          <Link href="/" aria-label="TeenSkool home" className="flex h-11 items-center rounded-full">
            <Brand />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {[
              { href: "#approach", label: "What they learn" },
              { href: "#session", label: "The day" },
              { href: "#outcomes", label: "Outcomes" },
              { href: "#questions", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#3d4a42] transition-colors hover:bg-white/60 hover:text-[#14201a]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#14201a] px-5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-[#223329] active:scale-[0.98] sm:h-12"
          >
            Reserve a seat
            <ArrowRight weight="bold" aria-hidden className="h-3.5 w-3.5" />
          </a>
        </nav>
      </header>

      {/* A plain div, not <main>: the root layout already provides the main landmark. */}
      <div id="main" className="relative z-[2]">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-6 md:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="ts-glass relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[#2f5209]">
                <GraduationCap weight="duotone" aria-hidden className="h-4 w-4" />
                Live masterclass for ages {DETAILS.ages}
              </p>

              <h1 className="font-display mt-6 text-[2.4rem] font-bold leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.3rem]">
                Prepare your child for 21st Century{" "}
                <span className="ts-mark italic">Entrepreneurship &amp; AI Skills</span>
              </h1>

              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-[#4b5a50] sm:text-xl">
                Give your child the mindset, skills, and experience of a real
                founder in a live AI Founder Masterclass.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PrimaryCta size="lg">Reserve my child&apos;s seat</PrimaryCta>
                <a
                  href="#approach"
                  className="inline-flex h-12 items-center gap-1.5 rounded-full px-1 text-base font-semibold text-[#14201a] underline decoration-[#9ed62f] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#14201a]"
                >
                  See what they learn
                </a>
              </div>

              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {[
                  "No coding required",
                  "IIT mentors and founders",
                  "Live mini pitch competition",
                  "Lifetime platform access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px] font-medium text-[#3d4a42]">
                    <SealCheck weight="fill" aria-hidden className="h-[18px] w-[18px] flex-none text-[#5a9416]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero visual */}
            <div className="lg:col-span-5">
              <div className="relative lg:pl-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#dfe7d8] shadow-[0_40px_80px_-40px_rgba(30,52,18,0.45)] lg:aspect-[4/3.5]">
                  <Image
                    src={teensToCamera}
                    alt="Three students looking up from the laptop they are building on"
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
                    placeholder="blur"
                    priority
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#14201a]/25 via-transparent to-transparent" />
                </div>

                <div className="absolute -right-4 -top-8 hidden w-36 rotate-[4deg] overflow-hidden rounded-2xl shadow-[0_24px_40px_-20px_rgba(30,52,18,0.5)] ring-[6px] ring-white/80 sm:block lg:-right-8 lg:w-40">
                  <div className="relative aspect-[4/3.3]">
                    <Image
                      src={teensDelighted}
                      alt="Students grinning at something they just got working"
                      fill
                      sizes="160px"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                </div>

                <div className="ts-glass relative mx-4 -mt-16 rounded-[1.6rem] p-5 sm:mx-10 sm:p-6 lg:mx-6 lg:-mt-14">
                  <p className="font-display text-[15px] font-semibold">Next session</p>
                  <SessionFacts className="mt-4" />
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#14201a]/10 pt-4">
                    <Price />
                    <p className="text-right text-xs font-medium leading-snug text-[#5d6a62]">
                      {DETAILS.seats} seats
                      <br />
                      per batch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why parents trust TeenSkool */}
        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <Eyebrow className="inline-block">Why parents trust TeenSkool</Eyebrow>
              <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold leading-[1.14] tracking-[-0.025em] text-balance sm:text-4xl">
                India&apos;s most vibrant program for young changemakers
              </h2>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-[#14201a]/10 bg-[#14201a]/10 sm:grid-cols-4">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} className="bg-white px-6 py-8 text-center">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="font-display block text-4xl font-bold leading-none text-[#14201a]">
                      {value}
                      <span className="text-[#5a9416]">{suffix}</span>
                    </span>
                    <span className="mt-2 block text-[13px] font-semibold text-[#6b7280]">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* The gap, and what we do about it */}
        <section id="approach" className="scroll-mt-24 bg-[#eef4e6] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-[1.14] tracking-[-0.025em] sm:text-4xl lg:text-[2.9rem]">
              School teaches your child <span className="italic text-[#5d6a62]">what</span> to think.
              We teach them how to build.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#4b5a50]">
              Parents tell us the same thing again and again. The marks are fine.
              It is everything the report card does not measure that worries them.
            </p>

            {/* Column labels, desktop only. On mobile each half is labelled inline. */}
            <div aria-hidden className="mt-14 hidden gap-5 md:grid md:grid-cols-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a968e]">
                Where school stops
              </p>
              <p className="pl-8 text-xs font-bold uppercase tracking-[0.14em] text-[#3f6212]">
                What the masterclass does
              </p>
            </div>

            <ol className="mt-4 space-y-4">
              {GAPS.map(({ n, gap, gapBody, icon: Icon, fix, fixBody }) => (
                <li
                  key={n}
                  className="relative grid overflow-hidden rounded-[1.75rem] border border-[#14201a]/[0.07] bg-white shadow-[0_18px_44px_-30px_rgba(20,32,26,0.4)] md:grid-cols-2"
                >
                  {/* The gap */}
                  <div className="ts-dark bg-[#14201a] p-7 sm:p-8">
                    <div className="flex h-9 items-center gap-3">
                      <span className="font-display text-sm font-bold text-[#a3e635]">{n}</span>
                      <span aria-hidden className="h-px flex-1 bg-white/15 md:hidden" />
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/40 md:hidden">
                        The gap
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-xl font-bold leading-snug text-white">
                      {gap}
                    </h3>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/55">{gapBody}</p>
                  </div>

                  {/* Connector, desktop only */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#a3e635] ring-4 ring-white md:flex"
                  >
                    <ArrowRight weight="bold" className="h-4 w-4 text-[#14201a]" />
                  </span>

                  {/* What we do */}
                  <div className="p-7 sm:p-8 md:pl-16">
                    <div className="flex h-9 items-center gap-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#a3e635]/20">
                        <Icon weight="duotone" aria-hidden className="h-[18px] w-[18px] text-[#3f6212]" />
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-[#14201a]/10 md:hidden" />
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#3f6212] md:hidden">
                        What we do
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-xl font-bold leading-snug">{fix}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#4b5a50]">{fixBody}</p>
                  </div>
                </li>
              ))}
            </ol>

            <figure className="mt-10 rounded-[2rem] border border-[#a3e635]/30 bg-[#a3e635]/[0.14] p-8 sm:p-10">
              <blockquote className="font-display text-xl font-semibold leading-[1.45] text-[#14201a] sm:text-[1.4rem]">
                The difference between teenagers who go on to lead and those who do
                not is rarely intelligence, resources, or even ideas. It is whether
                they had the right platform, community and mentorship at the right
                time.
              </blockquote>
            </figure>
          </div>
        </section>

        {/* The day */}
        <section id="session" className="scroll-mt-24 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <Eyebrow>How the day runs</Eyebrow>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold leading-[1.14] tracking-[-0.025em] sm:text-4xl lg:text-[2.9rem]">
              What happens in those {DETAILS.duration}
            </h2>

            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <ol className="relative">
                {TIMELINE.map(({ time, title, body: text, badge }, i) => (
                  <li
                    key={time}
                    className={`flex gap-5 py-5 ${
                      i !== TIMELINE.length - 1 ? "border-b border-[#14201a]/[0.08]" : ""
                    }`}
                  >
                    <span className="w-[5.5rem] flex-none pt-0.5 text-xs font-bold tabular-nums text-[#6b7280]">
                      {time}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4b5a50]">{text}</p>
                      {badge && (
                        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#14201a] px-3 py-1 text-xs font-bold uppercase tracking-[0.05em] text-[#c6ef6b]">
                          <Trophy weight="fill" aria-hidden className="h-3 w-3" />
                          {badge}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col gap-5">
                <div className="rounded-[2rem] bg-[#14201a] p-8">
                  <h3 className="font-display text-xl font-bold text-white">
                    Guided by people who actually build things
                  </h3>
                  <p className="mt-3.5 text-[15px] leading-relaxed text-white/60">
                    Our mentors are not academics reading from slides. They are IIT
                    graduates, active startup founders and working professionals who
                    have shipped real products. Your child sees how they think,
                    including how they handle being wrong.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["IIT mentors", "Startup founders", "Live Q&A", "Honest feedback", "Small groups"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#a3e635]/20 bg-[#a3e635]/10 px-3 py-1.5 text-xs font-bold text-[#a3e635]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[1.75rem] border border-[#14201a]/[0.07] bg-white p-6">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#ff0000]">
                    <YoutubeLogo weight="fill" aria-hidden className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold">Their pitch goes on YouTube</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4b5a50]">
                      Every student&apos;s pitch is recorded and published. Your child
                      gets a real founder moment, on camera, that they can show anyone.
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-[#dfe7d8]">
                  <Image
                    src={teensBuilding}
                    alt="Students working through an idea together on a laptop"
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes (dark) */}
        <section id="outcomes" className="ts-dark scroll-mt-24 bg-[#14201a] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <Eyebrow tone="dark">What they walk away with</Eyebrow>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold leading-[1.14] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.9rem]">
              Not just a certificate. Something they actually built.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              By 2 PM your child has a real output, and a way of thinking that stays
              with them long after.
            </p>

            <div className="mt-14 grid gap-4 lg:grid-cols-12">
              <article className="rounded-[2rem] border border-[#a3e635]/20 bg-[#a3e635]/[0.08] p-8 lg:col-span-5 lg:row-span-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a3e635]/15">
                  <Rocket weight="duotone" aria-hidden className="h-6 w-6 text-[#a3e635]" />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold text-white">
                  A real startup concept
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">
                  A complete package they built themselves. Not a school project, not a
                  worksheet.
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {[
                    "Their own validated startup idea",
                    "A brand name, logo and identity",
                    "A complete pitch deck",
                    "A plan for reaching first users",
                    "Their recorded YouTube pitch",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[15px] text-white/75">
                      <CheckCircle weight="fill" aria-hidden className="mt-0.5 h-[18px] w-[18px] flex-none text-[#a3e635]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {OUTCOMES.map(({ icon: Icon, title, body: text }) => (
                  <article
                    key={title}
                    className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-7"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a3e635]/12">
                      <Icon weight="duotone" aria-hidden className="h-5 w-5 text-[#a3e635]" />
                    </span>
                    <h3 className="font-display mt-4 text-[17px] font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="questions" className="scroll-mt-24 border-t border-[#14201a]/[0.08] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow>FAQ</Eyebrow>
                  <h2 className="font-display mt-4 text-3xl font-bold leading-[1.14] tracking-[-0.025em] sm:text-4xl">
                    Questions parents ask us
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-[#4b5a50]">
                    Something else on your mind? We are happy to talk it through before
                    you book.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex h-12 items-center gap-1.5 rounded-full px-1 text-base font-semibold text-[#14201a] underline decoration-[#9ed62f] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#14201a]"
                  >
                    Contact the team
                  </Link>
                </div>
              </div>

              <dl className="lg:col-span-7">
                {QUESTIONS.map(({ q, a }) => (
                  <div key={q} className="border-t border-[#14201a]/10 py-7 first:border-t-0 first:pt-0">
                    <dt className="font-display text-lg font-bold leading-snug tracking-tight">{q}</dt>
                    <dd className="mt-2.5 text-[15.5px] leading-relaxed text-[#4b5a50]">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-32 lg:px-8">
          <div className="ts-dark relative overflow-hidden rounded-[2.5rem] bg-[#14201a]">
            <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
              <Image
                src={brandStudents}
                alt=""
                fill
                sizes="520px"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-[#14201a] via-[#14201a]/70 to-transparent"
              />
            </div>

            <div className="relative p-8 sm:p-12 lg:p-14">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#a3e635]/25 bg-[#a3e635]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#a3e635]">
                  <Users weight="fill" aria-hidden className="h-3.5 w-3.5" />
                  {DETAILS.seats} seats per batch
                </span>

                <h2 className="font-display mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-balance text-white sm:text-[2.6rem]">
                  Give your child the head start you wish you&apos;d had
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-white/60">
                  One Saturday. One real startup, built by them. A way of thinking that
                  stays long after the session ends.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-6">
                  {[
                    { icon: CalendarBlank, label: "Date", value: nextSession },
                    { icon: Clock, label: "Time", value: DETAILS.time },
                    { icon: VideoCamera, label: "Format", value: "Live online" },
                    { icon: GraduationCap, label: "For", value: DETAILS.grades },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon weight="duotone" aria-hidden className="mt-0.5 h-[18px] w-[18px] flex-none text-[#a3e635]" />
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-white/45">{label}</dt>
                        <dd className="text-sm font-bold text-white">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/50">Your investment</p>
                    <p className="mt-1.5 flex items-baseline gap-3">
                      <span className="font-display text-[2.75rem] font-bold leading-none text-white">
                        {inr(PRICING.now)}
                      </span>
                      <span className="text-base text-white/40">
                        <span className="sr-only">Regular price </span>
                        <s>{inr(PRICING.mrp)}</s>
                      </span>
                    </p>
                  </div>
                  <span className="rounded-full bg-[#a3e635] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-[#14201a]">
                    Save {DISCOUNT_PCT}%
                  </span>
                </div>

                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <PrimaryCta size="lg" className="w-full sm:w-auto">
                    Reserve my child&apos;s seat
                  </PrimaryCta>
                  <p className="flex items-center gap-1.5 text-sm text-white/50">
                    <LockKey weight="duotone" aria-hidden className="h-4 w-4 text-[#a3e635]" />
                    Secure payment via Cashfree
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative z-[2] border-t border-[#14201a]/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Brand size="h-7" />
            <p className="text-sm text-[#5d6a62]">
              © {new Date().getFullYear()} TeenSkool. All rights reserved.
            </p>
          </div>
          <nav aria-label="Footer" className="flex items-center gap-2 text-sm font-medium text-[#3d4a42]">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex h-11 items-center rounded-full px-3 transition-colors hover:text-[#14201a]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
