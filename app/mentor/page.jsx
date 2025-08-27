// Client component import (co-located for DX)
import ChatPanel from "./ChatPanel";
import Link from "next/link";
import MotionDiv from "@/components/ui/MotionDiv";
import { Brain, MessageSquare, Sparkles, ShieldCheck, Clock, Rocket } from "lucide-react";

export const metadata = {
  title: "Virtual Mentor | Teenskool",
  description:
    "Ask business and startup questions and get instant guidance from Teenskool's AI Virtual Mentor.",
};

// Corrected GridPattern for dark theme
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] animate-grid-scroll" />
);

export default function MentorPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <GridPattern />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">
                <Sparkles className="w-4 h-4" />
                Free for early users
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Meet your <span className="text-primary">Virtual Mentor</span>
              </h1>
              <p className="mt-4 text-lg text-foreground/80">
                Get instant help with ideas, positioning, MVPs, validation,
                marketing, and more—available 24/7.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#chat" className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  Start chatting
                </a>
                <Link href="/programs" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground hover:bg-surface transition-colors">
                  <Rocket className="w-5 h-5" />
                  Explore workshops
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border shadow-2xl shadow-black/20 bg-surface p-5 md:p-6">
                {/* Visual hero mock of chat */}
                <div className="flex items-center gap-2 text-foreground/70 text-sm mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  Online
                </div>
                <div className="space-y-3 max-h-72 overflow-hidden">
                  <Bubble role="user">How do I validate my startup idea quickly?</Bubble>
                  <Bubble role="assistant">
                    Start with a simple landing page, add a clear value prop +
                    call-to-action, and run small ad tests to measure intent. Offer
                    a waitlist or pre-order to gauge real demand.
                  </Bubble>
                  <Bubble role="user">What should my MVP include?</Bubble>
                  <Bubble role="assistant">
                    The minimum set of features that lets users experience the core value.
                    Focus on one problem and one workflow—ship fast, learn faster.
                  </Bubble>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <Feature icon={Brain} title="Startup Fluent"
              desc="Answers trained on entrepreneurship best practices." />
            <Feature icon={Clock} title="Always On"
              desc="Get guidance anytime, anywhere—no scheduling." />
            <Feature icon={ShieldCheck} title="Safe & Private"
              desc="Your conversations stay between you and the mentor." />
            <Feature icon={Sparkles} title="Action-able"
              desc="Step-by-step suggestions you can apply today." />
          </MotionDiv>
        </div>
      </section>

      {/* Chat Panel */}
      <section id="chat" className="pb-20 pt-2">
        <div className="max-w-5xl mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-surface rounded-2xl border border-border shadow-2xl shadow-black/20"
          >
            <ChatPanel />
          </MotionDiv>
          <div className="mt-6 text-center text-sm text-foreground/70">
            Free for now — premium mentor packs and saved conversations coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="bg-surface rounded-2xl border border-border p-5 shadow-lg shadow-black/20">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/20 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-foreground/80">{desc}</p>
    </div>
  );
}

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
      ${isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-background text-foreground/90"}`}>
      {children}
    </div>
  );
}