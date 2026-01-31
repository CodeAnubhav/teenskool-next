// File: app/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteGridHero } from "@/components/ui/infinite-grid-hero";
import { Testimonial } from "@/components/ui/testimonial";
import ProgramCard from "@/components/ui/ProgramCard";
import programs from "@/data/programs";
import BannerCarousel from "@/components/ui/BannerCarousel";
import {
  ArrowUpRight,
  Building2,
  Lightbulb,
  Target,
  Zap,
  Users,
  BotMessageSquare,
  Sparkles,
  Rocket,
  Check,
  BrainCircuit,
  PieChart,
  Presentation
} from "lucide-react";

// --- Custom Mock Chat Interface for AI Section ---
const MockChatInterface = () => (
  <div className="relative w-full aspect-[4/3] bg-[#050505] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col font-sans select-none pointer-events-none transform transition-transform hover:scale-[1.02] duration-500">
    {/* Glow Effect */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-primary/20 blur-[130px] rounded-full" />

    {/* Header */}
    <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-[#0a0a0a]/50 backdrop-blur-md">
      <div className="bg-primary/20 p-2 rounded-xl ring-1 ring-inset ring-primary/30">
        <BotMessageSquare className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h2 className="font-bold text-white text-xs tracking-tight">AI Co-Founder</h2>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-white/50">Online</p>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 p-5 space-y-4 overflow-hidden relative">
      {/* User Msg */}
      <div className="flex justify-end gap-3 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 fill-mode-forwards opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <div className="bg-primary text-black px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs font-medium max-w-[80%] shadow-lg shadow-primary/10">
          I have an idea for a sustainable sneaker brand, but I don't know who my target audience is.
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#121212]">
          ME
        </div>
      </div>

      {/* AI Msg */}
      <div className="flex justify-start gap-3 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-1000 fill-mode-forwards opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
          <BotMessageSquare className="w-4 h-4 text-primary" />
        </div>
        <div className="bg-[#161616] border border-white/5 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[85%] shadow-sm">
          <p className="mb-2">That's a great niche! For sustainable sneakers, let's target these three segments:</p>
          <ul className="space-y-1.5 list-none">
            <li className="flex gap-2 items-start">
              <div className="mt-0.5 w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
              </div>
              <span><strong className="text-white">Eco-Conscious Gen Z:</strong> Value transparency & materials.</span>
            </li>
            <li className="flex gap-2 items-start">
              <div className="mt-0.5 w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
              </div>
              <span><strong className="text-white">Ethical Runners:</strong> Performance + low carbon footprint.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Floating Input Pill */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 flex items-center justify-between shadow-2xl z-20">
      <div className="flex gap-2 items-center">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
        <span className="text-white/30 text-xs">Type your response...</span>
      </div>
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <ArrowUpRight className="w-3 h-3 text-primary" />
      </div>
    </div>
  </div>
);

// --- New Features Data (Refined Process) ---
const modernFeatures = [
  {
    icon: BrainCircuit,
    title: "Idea Brainstorming",
    desc: "Use AI to generate unique startup concepts based on your interests and market gaps.",
  },
  {
    icon: PieChart,
    title: "Market Analysis",
    desc: "Analyze competitors and identify your target audience with deep data insights.",
  },
  {
    icon: Presentation,
    title: "Pitch Deck Builder",
    desc: "Create professional, investor-ready slides using AI-powered design tools.",
  },
  {
    icon: Rocket,
    title: "Marketing Strategy",
    desc: "Generate go-to-market strategies and social media content to launch your brand.",
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-foreground relative overflow-x-hidden selection:bg-primary/30">

      {/* Global Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full animate-pulse duration-[10s] delay-1000"></div>
      </div>

      {/* Hero Section */}
      <InfiniteGridHero>
        <div className="flex flex-col overflow-hidden w-full relative z-10">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
                  Build Your First Startup <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    Idea with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-emerald-500 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">AI</span>
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto mb-10">
                  Join the AI-Powered Teenpreneur Workshop by Teenskool. No coding. No prior experience. Just ideas, AI, and action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Link href="/program/ai-startup-masterclass" className="group">
                    <button className="bg-primary hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-lg shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(34,197,94,0.6)] w-full cursor-pointer sm:w-auto relative overflow-hidden">
                      <span className="relative z-10">Apply Now</span>
                      <ArrowUpRight className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </Link>
                  <Link href="/program-for-school">
                    <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105 w-full cursor-pointer sm:w-auto">
                      <Building2 className="w-5 h-5 text-zinc-400" /> For Schools
                    </button>
                  </Link>
                </div>
              </>
            }
          >
            <div className="h-full w-full object-cover bg-black relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
              <video
                className="w-full h-full object-cover rounded-2xl opacity-90"
                src="/assets/promovideo.mp4"
                title="Student Video"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </ContainerScroll>
        </div>
      </InfiniteGridHero>

      {/* 2. Features Section ("Curriculum") - REFINED PROCESS FLOW */}
      <section className="py-32 px-6 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-primary/20 blur-[80px] -z-10 rounded-full"></div>
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block animate-pulse">The 4-Step Framework</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                HOW YOU WILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">BUILD IT</span>
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
                A streamlined process to transform your raw thoughts into a refined startup concept using AI.
              </p>
            </MotionDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {modernFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group h-full"
                >
                  <div className="h-full bg-[#111] border border-white/5 p-8 rounded-3xl flex flex-col items-start gap-6 hover:border-primary/30 transition-all shadow-lg hover:shadow-primary/10 relative overflow-hidden group-hover:-translate-y-2 duration-300">

                    {/* Subtle Background Shine */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Step Number */}
                    <div className="absolute top-6 right-6 text-4xl font-black text-[#1a1a1a] group-hover:text-primary/10 transition-colors select-none">
                      0{index + 1}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-primary mb-2 group-hover:bg-primary group-hover:text-black transition-colors relative z-10 duration-300">
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm font-medium group-hover:text-zinc-400">{feature.desc}</p>
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. AI Co-Founder Section - REIMAGINED */}
      <section className="py-32 px-6 relative z-10 overflow-hidden border-y border-white/5 bg-[#030303]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: Text Content */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
                  Included Free
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                MEET YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-200 to-emerald-400">
                  AI CO-FOUNDER
                </span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
                Stuck on an idea? Need a pitch deck structure? Your dedicated AI Co-Founder is available 24/7 to guide you through every step of building your startup.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Instant Idea Validation",
                "Competitor Analysis",
                "Pitch Script Generation",
                "Business Model Canvas"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/program/ai-startup-masterclass" className="inline-flex items-center gap-2 text-white font-bold border-b border-primary hover:text-primary transition-colors text-lg group">
                Start Building Now
                <ArrowUpRight className="w-4 h-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </MotionDiv>

          {/* Right: 3D Mockup */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 40, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 perspective-1000"
          >
            {/* Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/10 blur-[60px] rounded-full transform scale-90"></div>

            <div className="relative transform transition-transform duration-500 hover:rotate-y-[-5deg] hover:rotate-x-[5deg] preserve-3d">
              {/* The Mock Interface */}
              <MockChatInterface />

              {/* Floating Elements / Decors */}
              <div className="absolute -top-6 -right-6 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce delay-700 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Status</div>
                  <div className="text-xs font-bold text-white">Startup Ready</div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl shadow-2xl animate-bounce delay-1000 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Speed</div>
                  <div className="text-xs font-bold text-white">10x Faster</div>
                </div>
              </div>
            </div>
          </MotionDiv>

        </div>
      </section>

      {/* 4. Student Voices */}
      <div className="relative z-10 bg-black">
        <Testimonial />
      </div>

      {/* 5. Banner Carousel */}
      <section className="py-24 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <BannerCarousel />
          </MotionDiv>
        </div>
      </section>

      {/* 6. Programs Section */}
      <section className="py-32 px-6 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Masterclass</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
              EXPLORE OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">PROGRAM</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Master a high-demand skill with our flagship, expertly designed masterclass.
            </p>
          </MotionDiv>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {programs.slice(0, 1).map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  isSingleCard={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}