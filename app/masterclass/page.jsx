import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import logoUrl from "@/public/assets/TS.png";
import {
  ArrowRight,
  CalendarBlank,
  ChatCircleText,
  CheckCircle,
  Clock,
  CursorClick,
  Hammer,
  LockKey,
  MagnifyingGlass,
  Path,
  PencilRuler,
  ShareNetwork,
  Sparkle,
  TrendUp,
  VideoCamera,
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
  cadence: "Every weekend",
  ages: "13-18",
  format: "Virtual, live online",
};

const PRICING = { mrp: 1999, now: 499 };
const DISCOUNT_PCT = Math.round((1 - PRICING.now / PRICING.mrp) * 100);
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

// The masterclass runs every weekend, so the date is derived at render time
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
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(dt);
}

export const revalidate = 3600;

export const metadata = {
  title: "AI Founder Masterclass for Young Minds | TeenSkool",
  description:
    "A live, hands-on online masterclass where teens aged 13-18 turn a real problem into a working AI-built prototype, guided by industry experts and working professionals.",
};

const IMAGES = {
  heroMain:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=70",
  heroInset:
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=70",
  about:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=70",
  outcomes:
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=70",
};

const SESSION_PLAN = [
  {
    verb: "Spot",
    icon: MagnifyingGlass,
    title: "Find a problem worth solving",
    body: "Not another school project. Your child looks at their own world (school, street, daily frustrations) and picks a problem that matters to someone.",
  },
  {
    verb: "Shape",
    icon: PencilRuler,
    title: "Use AI to sharpen the idea",
    body: "Who is it for? Why would they care? They use AI the way professionals do, to pressure-test a vague thought until it fits in one clear sentence.",
  },
  {
    verb: "Build",
    icon: Hammer,
    title: "Make a working prototype, no code",
    body: "By the end there is something real on screen that another person can click through and use. No programming background needed.",
  },
  {
    verb: "Share",
    icon: ShareNetwork,
    title: "Put it in front of real people",
    body: "The part most classes skip. They learn how builders launch and share an idea online, so the work does not stop at a slide.",
  },
];

const OUTCOMES = [
  {
    icon: Sparkle,
    title: "Real fluency with AI tools",
    body: "Hands-on time with the tools professionals use every day.",
    tone: "lime",
  },
  {
    icon: ChatCircleText,
    title: "Confidence to present an idea",
    body: "They practise explaining their thinking to adults who build for a living.",
    tone: "white",
  },
  {
    icon: Path,
    title: "A way of thinking that transfers",
    body: "Spot a problem, test assumptions, ship something imperfect, improve it.",
    tone: "ink",
  },
  {
    icon: TrendUp,
    title: "A head start that compounds",
    body: "Habits for an AI-shaped world, learned early instead of catching up later.",
    tone: "glass",
  },
];

const QUESTIONS = [
  {
    q: "Does my child need to know how to code?",
    a: "No. Everything is built with no-code AI tools, and no prior experience is needed. Curiosity is enough.",
  },
  {
    q: "Will they just be watching a screen?",
    a: "No. The session is live and hands-on. Your child works on their own idea while mentors look at their screen and help them move forward.",
  },
  {
    q: "What if they don't have an idea yet?",
    a: "That is where we start. The first part of the session is about finding a problem worth solving in their own life.",
  },
  {
    q: "Who is teaching?",
    a: "Industry experts and working professionals who build for a living, not a pre-recorded video.",
  },
  {
    q: "Is there a recording to watch later?",
    a: "The masterclass is live only, so please plan for your child to attend the full session.",
  },
  {
    q: "What do they need on the day?",
    a: "A laptop or desktop, a steady internet connection, and the joining link we send after registration.",
  },
];

// Liquid glass, focus rings and ambient motion. Kept here so the page is a
// single drop-in file; move to globals.css if you prefer.
const PAGE_CSS = `
.ts-page { color-scheme: light; font-family: var(--font-body), system-ui, sans-serif; }
.ts-page .font-display { font-family: var(--font-display), system-ui, sans-serif; }
.ts-glass {
  isolation: isolate;
  background: linear-gradient(140deg, rgba(255,255,255,0.62), rgba(255,255,255,0.26));
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.95),
    inset 0 -1px 0 rgba(255,255,255,0.3),
    inset 0 0 24px rgba(255,255,255,0.18),
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
.ts-page a, .ts-page button { touch-action: manipulation; }
.ts-page :focus-visible {
  outline: 2px solid #3f6b0c;
  outline-offset: 3px;
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: no-preference) {
  @keyframes ts-drift {
    0%, 100% { transform: translate3d(0,0,0) scale(1); }
    50% { transform: translate3d(3%, -4%, 0) scale(1.06); }
  }
  .ts-drift { animation: ts-drift 18s ease-in-out infinite; }
  .ts-drift-slow { animation: ts-drift 26s ease-in-out infinite reverse; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
`;

function PrimaryCta({ className = "", size = "md" }) {
  const sizing =
    size === "lg" ? "h-14 px-8 text-[17px]" : "h-12 px-6 text-base";
  return (
    <a
      href={PAYMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#9ed62f] font-semibold text-[#14201a] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_30px_-12px_rgba(90,140,20,0.7)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#aee344] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_36px_-12px_rgba(90,140,20,0.75)] active:scale-[0.98] ${sizing} ${className}`}
    >
      Reserve a seat
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
function Brand({ size = "h-8" }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`relative ${size} aspect-square flex-none overflow-hidden rounded-lg`}>
        <Image
          src={logoUrl}
          alt=""
          fill
          sizes="36px"
          className="object-cover object-left"
          priority
        />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-[#14201a]">
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
      <p className="mt-2 inline-flex w-fit items-center rounded-full bg-[#14201a] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#c6ef6b]">
        Save {DISCOUNT_PCT}%
      </p>
    </div>
  );
}

function SessionFacts({ className = "" }) {
  const rows = [
    { icon: CalendarBlank, label: "Next session", value: `This ${upcomingSaturday()}` },
    { icon: Clock, label: "Runs", value: DETAILS.cadence },
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

export default function MasterclassPage() {
  return (
    <div
      className={`ts-page ${display.variable} ${body.variable} relative min-h-[100dvh] overflow-x-clip bg-[#f4f7f0] text-[#14201a] antialiased`}
    >
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#14201a] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Ambient light behind the whole page */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
        <div className="ts-drift absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#d4f28a] opacity-60 blur-[110px]" />
        <div className="ts-drift-slow absolute -right-32 top-20 h-[520px] w-[520px] rounded-full bg-[#bfe8d3] opacity-70 blur-[110px]" />
        <div className="absolute left-1/3 top-[520px] h-[380px] w-[380px] rounded-full bg-[#e9f7c6] opacity-80 blur-[100px]" />
      </div>
      <div aria-hidden className="ts-grain pointer-events-none fixed inset-0 z-[1]" />

      {/* Floating glass nav */}
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
              { href: "#what-we-cover", label: "The session" },
              { href: "#outcomes", label: "Outcomes" },
              { href: "#questions", label: "Questions" },
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

      <main id="main" className="relative z-[2]">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-6 md:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none lg:col-span-7">
              <p className="ts-glass relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-[#2f5209]">
                <VideoCamera weight="duotone" aria-hidden className="h-4 w-4" />
                Live masterclass for ages {DETAILS.ages}
              </p>

              <h1 className="font-display mt-6 text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
                Your child has an idea. In one live session, they{" "}
                <span className="relative inline-block whitespace-nowrap pb-1">
                  <span className="relative z-10 italic">build it.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-[-4px] bottom-[0.18em] z-0 h-[0.32em] rounded-full bg-[#c6ef6b]"
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#4b5a50] sm:text-xl">
                A live masterclass where teens turn a real problem into a
                working AI prototype, with mentors who build for a living.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PrimaryCta size="lg" />
                <a
                  href="#what-we-cover"
                  className="inline-flex h-12 items-center gap-1.5 rounded-full px-1 text-base font-semibold text-[#14201a] underline decoration-[#9ed62f] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#14201a]"
                >
                  See the session plan
                </a>
              </div>
            </div>

            {/* Hero visual with glass session card */}
            <div className="animate-in fade-in slide-in-from-bottom-6 delay-150 duration-700 motion-reduce:animate-none lg:col-span-5">
              <div className="relative lg:pl-4">
                <div className="relative aspect-[4/3.6] overflow-hidden rounded-[2rem] bg-[#dfe7d8] shadow-[0_40px_80px_-40px_rgba(30,52,18,0.45)] sm:aspect-[4/3.2] lg:aspect-[4/4.4]">
                  <Image
                    src={IMAGES.heroMain}
                    alt="Teenagers working together on laptops during a live session"
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover"
                    priority
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#14201a]/25 via-transparent to-transparent" />
                </div>

                <div className="absolute -right-3 -top-6 hidden w-36 rotate-[4deg] overflow-hidden rounded-2xl ring-[6px] ring-white/80 shadow-[0_24px_40px_-20px_rgba(30,52,18,0.5)] sm:block lg:-right-5 lg:w-40">
                  <div className="relative aspect-[4/3.3]">
                    <Image
                      src={IMAGES.heroInset}
                      alt="A student presenting the idea she is building"
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="ts-glass relative mx-4 -mt-24 rounded-[1.6rem] p-5 sm:mx-10 sm:p-6 lg:absolute lg:-left-6 lg:bottom-8 lg:mx-0 lg:mt-0 lg:w-[19rem]">
                  <p className="font-display text-[15px] font-semibold">Next session</p>
                  <SessionFacts className="mt-4" />
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#14201a]/10 pt-4">
                    <Price />
                    <p className="text-right text-xs font-medium leading-snug text-[#5d6a62]">
                      Small group
                      <br />
                      Limited seats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto + how the room works */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-balance sm:text-4xl lg:text-[3.1rem]">
              Most classes teach teenagers <span className="italic text-[#5d6a62]">about</span> AI.
              This one has them build with it.
            </h2>
            <p className="mt-5 text-lg text-[#4b5a50]">
              Not theory. Not just watching. Building.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] bg-[#dfe7d8] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={IMAGES.about}
                alt="A mentor guiding a student through their project on a laptop"
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#14201a]/30" />
            </div>

            <div className="ts-glass relative mx-4 -mt-20 rounded-[1.75rem] p-6 sm:mx-10 sm:p-8 lg:absolute lg:bottom-6 lg:right-6 lg:top-6 lg:mx-0 lg:mt-0 lg:flex lg:w-[25rem] lg:flex-col lg:justify-center">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                What happens in the room
              </h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Live and interactive. Your child asks questions and gets answers in real time.",
                  "No coding and no prior experience needed.",
                  "Led by industry experts and working professionals.",
                  "They leave with something built, not just notes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle weight="fill" aria-hidden className="mt-0.5 h-5 w-5 flex-none text-[#5a9416]" />
                    <span className="text-[15px] leading-relaxed text-[#26332b]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Session plan */}
        <section id="what-we-cover" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[#e9f0e2] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]" />
            <div className="ts-drift absolute -left-20 top-10 h-[460px] w-[460px] rounded-full bg-[#c9ee76] opacity-70 blur-[90px]" />
            <div className="ts-drift-slow absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[#b3e2cd] opacity-80 blur-[100px]" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-70 blur-[80px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-[1.14] tracking-[-0.025em] sm:text-4xl lg:text-[2.9rem]">
                One session. Four things your child learns to do.
              </h2>
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[#4b5a50]">
                Each one is practised on their own idea, so it sticks long after
                the class ends.
              </p>
            </div>

            <ol className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6 md:pb-14">
              {SESSION_PLAN.map(({ verb, icon: Icon, title, body }, i) => (
                <li
                  key={verb}
                  className={`ts-glass relative rounded-[1.75rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${
                    i % 2 === 1 ? "md:translate-y-14 md:hover:translate-y-12" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14201a] text-[#c6ef6b] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                      <Icon weight="duotone" aria-hidden className="h-6 w-6" />
                    </span>
                    <span className="font-display text-2xl font-bold tracking-tight text-[#3f6b0c]">
                      {verb}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold leading-snug tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-[#3d4a42]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Outcomes bento */}
        <section id="outcomes" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.14] tracking-[-0.025em] sm:text-4xl lg:text-[2.9rem]">
              What your child walks away with
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#4b5a50]">
              Something you can see, and something that stays with them.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <article className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#dfe7d8] sm:col-span-2 lg:row-span-2 lg:min-h-0">
              <Image
                src={IMAGES.outcomes}
                alt="Students smiling as they show the project they built"
                fill
                sizes="(max-width: 1024px) 100vw, 580px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#14201a]/45 via-transparent to-transparent" />
              <div className="ts-glass absolute inset-x-4 bottom-4 rounded-[1.5rem] p-6 sm:inset-x-5 sm:bottom-5">
                <CursorClick weight="duotone" aria-hidden className="h-7 w-7 text-[#3f6b0c]" />
                <h3 className="font-display mt-3 text-2xl font-semibold leading-tight tracking-tight">
                  A working prototype they can show you
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#26332b]">
                  Something real and clickable. Not a worksheet, not a certificate of attendance.
                </p>
              </div>
            </article>

            {OUTCOMES.map(({ icon: Icon, title, body, tone }) => {
              const tones = {
                lime: "bg-[#dff3b8] text-[#14201a]",
                white: "bg-white text-[#14201a] ring-1 ring-[#14201a]/[0.07]",
                ink: "bg-[#14201a] text-white",
                glass: "ts-glass text-[#14201a]",
              };
              const bodyTone = tone === "ink" ? "text-white/75" : "text-[#3d4a42]";
              const iconTone = tone === "ink" ? "text-[#c6ef6b]" : "text-[#3f6b0c]";
              return (
                <article
                  key={title}
                  className={`relative flex min-h-[13rem] flex-col justify-between overflow-hidden rounded-[2rem] p-6 ${tones[tone]}`}
                >
                  {tone === "glass" && (
                    <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-[#b9ec5a] opacity-70 blur-2xl" />
                  )}
                  <Icon weight="duotone" aria-hidden className={`h-7 w-7 ${iconTone}`} />
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">{title}</h3>
                    <p className={`mt-1.5 text-[15px] leading-relaxed ${bodyTone}`}>{body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Parent questions */}
        <section id="questions" className="scroll-mt-24 border-t border-[#14201a]/[0.08]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:gap-16 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <h2 className="font-display text-3xl font-semibold leading-[1.14] tracking-[-0.025em] sm:text-4xl">
                Questions parents ask us
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#4b5a50]">
                Something else on your mind? We are happy to talk it through
                before you book.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-12 items-center gap-1.5 rounded-full px-1 font-semibold underline decoration-[#9ed62f] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#14201a]"
              >
                Contact the team
              </Link>
            </div>

            <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {QUESTIONS.map(({ q, a }) => (
                <div key={q} className="border-t border-[#14201a]/10 py-7">
                  <dt className="font-display text-lg font-semibold leading-snug tracking-tight">{q}</dt>
                  <dd className="mt-2.5 text-[15.5px] leading-relaxed text-[#4b5a50]">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:pb-32 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#cfe3b4]">
            <Image
              src={IMAGES.heroInset}
              alt=""
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#e6f5cc]/80 via-[#e6f5cc]/35 to-transparent" />

            <div className="relative p-4 sm:p-8 lg:p-12">
              <div className="ts-glass relative max-w-xl rounded-[2rem] p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3f6b0c]">
                  Limited seats
                </p>
                <h2 className="font-display mt-3 text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-balance sm:text-[2.6rem]">
                  Give your child the head start you wish you&apos;d had
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[#26332b]">
                  One live session. One real idea. One working prototype they
                  built themselves. Groups are kept small so every child gets
                  time with a mentor.
                </p>

                <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                  <SessionFacts />
                  <Price size="lg" align="right" />
                </div>

                <div className="mt-8 flex flex-col items-start gap-3">
                  <PrimaryCta size="lg" className="w-full sm:w-auto" />
                  <p className="flex items-center gap-1.5 text-sm text-[#3d4a42]">
                    <LockKey weight="duotone" aria-hidden className="h-4 w-4 text-[#3f6b0c]" />
                    Registration and payment are completed securely on Cashfree.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
              <Link key={l.href} href={l.href} className="inline-flex h-11 items-center rounded-full px-3 transition-colors hover:text-[#14201a]">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}