import Link from "next/link";
import MotionDiv from "@/components/ui/MotionDiv";
import { Brain, MessageSquare, Sparkles, ShieldCheck, Clock, Rocket } from "lucide-react";

export const metadata = {
  title: "Virtual Mentor | Teenskool",
  description:
    "Ask business and startup questions and get instant guidance from Teenskool's AI Virtual Mentor.",
};

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white
    bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
);

export default function MentorPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <GridPattern />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <MotionDiv
            initial={{opacity:0, y:14}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6}}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-3">
                <Sparkles className="w-4 h-4" />
                Free for early users
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Meet your <span className="text-amber-600">Virtual Mentor</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Get instant help with ideas, positioning, MVPs, validation,
                marketing, and more—available 24/7.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#chat" className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold hover:opacity-90">
                  <MessageSquare className="w-5 h-5" />
                  Start chatting
                </a>
                <Link href="/programs" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-white">
                  <Rocket className="w-5 h-5" />
                  Explore workshops
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-slate-200 shadow-xl bg-white p-5 md:p-6">
                {/* Visual hero mock of chat */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
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
            initial={{opacity:0, y:14}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6, delay:0.05}}
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
            initial={{opacity:0, y:14}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6, delay:0.1}}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl"
          >
            <div className="p-5 md:p-6 border-b border-slate-200 flex items-center gap-3">
              <div className="bg-primary/15 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Your Virtual Mentor</h2>
                <p className="text-sm text-slate-500">Ask anything about business, ideas, growth, or careers.</p>
              </div>
            </div>
            {/* Client chat box (placeholder logic) */}
            <div className="p-5 md:p-6">
              {/* Import the client widget */}
              {/* @ts-expect-error Server/Client interop for Next */}
              <ChatPanel />
            </div>
          </MotionDiv>

          {/* Plans (placeholder for future) */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Free for now — premium mentor packs and saved conversations coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
      ${isUser ? "ml-auto bg-slate-900 text-white" : "bg-slate-100 text-slate-800"}`}>
      {children}
    </div>
  );
}

// Client component import (co-located for DX)
import ChatPanel from "./ChatPanel";
