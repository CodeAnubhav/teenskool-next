'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Search,
  PenTool,
  MonitorPlay,
  Share2,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  School,
  BrainCircuit,
  Layout,
  Presentation
} from "lucide-react";

// --- Data ---

const curriculumData = [
  {
    id: 1,
    title: "Mindset & Setup",
    duration: "0:00 - 0:22",
    description: "We break the academic mold. Students set up their AI workspace and learn the 'Fast-Fail' methodology used in Silicon Valley.",
    output: "Ready-to-use AI Workspace",
    icon: BrainCircuit,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Idea Validation",
    duration: "0:22 - 0:45",
    description: "Stop guessing. Students use AI to analyze market trends, identify customer personas, and validate if their idea can actually make money.",
    output: "Validated Problem Statement",
    icon: Search,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Branding & Assets",
    duration: "0:45 - 1:10",
    description: "Design without a degree. Students generate professional logos, color palettes, and brand slogans using generative art tools.",
    output: "Full Brand Kit (Logo + Style Guide)",
    icon: PenTool,
    color: "bg-pink-500",
  },
  {
    id: 4,
    title: "Website Deployment",
    duration: "1:10 - 1:35",
    description: "The magic moment. Students build and launch a live, mobile-responsive landing page for their startup in minutes—no coding required.",
    output: "Live Published Website",
    icon: Layout,
    color: "bg-green-500",
  },
  {
    id: 5,
    title: "Content Strategy",
    duration: "1:35 - 2:00",
    description: "If you build it, they won't just come. Students generate a 30-day social media plan and create an AI-narrated promo video.",
    output: "30-Day Marketing Plan + Promo Video",
    icon: Share2,
    color: "bg-orange-500",
  },
  {
    id: 6,
    title: "Pitch Deck Creation",
    duration: "2:00 - 2:25",
    description: "Turning ideas into numbers. Students generate a professional investor deck covering revenue models, competition, and the 'Ask'.",
    output: "Investor-Ready Pitch Deck",
    icon: Presentation,
    color: "bg-red-500",
  },
  {
    id: 7,
    title: "Final Demo & Plan",
    duration: "2:25 - 3:00",
    description: "The launchpad. Students present their MVPs and map out their next 90 days of growth and iteration.",
    output: "90-Day Growth Roadmap",
    icon: Award,
    color: "bg-yellow-500",
  },
];

const benefits = [
  "NEP 2020 Aligned Curriculum",
  "No Prior Coding Required",
  "Outcome-Based Learning",
  "Certificate of Innovation"
];

// --- Components ---

// 1. The Sticky Scroll Section (The Core Feature)
const StickyCurriculum = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-12 lg:gap-24">

      {/* LEFT SIDE: Scrolling Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-[40vh] py-[10vh]">
        {curriculumData.map((step, index) => (
          <CurriculumStep
            key={step.id}
            step={step}
            index={index}
            setActiveCard={setActiveCard}
          />
        ))}
      </div>

      {/* RIGHT SIDE: Sticky Visual Card (Desktop Only) */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="sticky top-[20vh] h-[60vh] flex items-center justify-center">
          {/* The Dynamic Card */}
          <div className="relative w-full aspect-square max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-10 flex flex-col justify-between overflow-hidden shadow-2xl">

            {/* Background Glow */}
            <motion.div
              key={activeCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
              className={`absolute inset-0 ${curriculumData[activeCard].color} blur-[120px]`}
            />

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col">
              <motion.div
                key={`icon-${activeCard}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md border border-white/10"
              >
                {React.createElement(curriculumData[activeCard].icon, { className: "w-8 h-8 text-white" })}
              </motion.div>

              <div className="mt-auto space-y-4">
                <motion.div
                  key={`text-${activeCard}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{curriculumData[activeCard].title}</h3>
                  <div className="h-1 w-20 bg-primary mb-4 rounded-full" />
                  <div className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-700">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-1">Student Output</p>
                    <p className="text-primary font-semibold text-lg">{curriculumData[activeCard].output}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 text-9xl font-black text-white/5 select-none">
              0{activeCard + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component to detect visibility of each step
const CurriculumStep = ({ step, index, setActiveCard }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) setActiveCard(index);
  }, [isInView, index, setActiveCard]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl font-black text-zinc-800 group-hover:text-primary/20 transition-colors">0{step.id}</span>
        <span className="px-3 py-1 rounded-full border border-zinc-800 text-zinc-500 text-xs font-mono bg-zinc-900">{step.duration}</span>
      </div>
      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{step.title}</h3>
      <p className="text-xl text-zinc-400 leading-relaxed max-w-md">{step.description}</p>

      {/* Mobile-Only Output Card (Since sticky is hidden on mobile) */}
      <div className="lg:hidden mt-6 bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
        <div className={`p-2 rounded-lg ${step.color} bg-opacity-20`}>
          {React.createElement(step.icon, { className: "w-5 h-5 text-white" })}
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase font-bold">Output</p>
          <p className="text-sm font-bold text-white">{step.output}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---

const ProgramForSchools = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-primary text-sm font-medium">
              <School className="w-4 h-4" />
              For Schools & Institutions
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Turn Your Classrooms Into <span className="text-primary">Incubators.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
              The AI Startup Masterclass. A comprehensive session that takes students from "Raw Idea" to "MVP" using Generative AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <button className="bg-primary text-black font-bold px-8 py-4 rounded-xl hover:bg-green-400 transition-colors flex items-center gap-2 cursor-pointer">
                  Book Faculty Demo <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-zinc-900 text-white border border-zinc-800 font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
                  Download Syllabus
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-4 hover:border-primary/50 transition-colors">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span className="font-semibold text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Header */}
      <section className="pt-24 px-6 text-center">
        <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-4">The Curriculum</h2>
        <p className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
          7 Steps. 3 Hours. <br />
          <span className="text-white/50">One Complete Startup.</span>
        </p>
      </section>

      {/* Sticky Scroll Curriculum Section */}
      <StickyCurriculum />

      {/* B2B CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <MonitorPlay className="w-20 h-20 text-primary mx-auto" />
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight">Ready to Upgrade Your Curriculum?</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Join the network of forward-thinking schools empowering the next generation of founders.
            </p>
            <div className="flex justify-center">
              <Link href="/contact" className="bg-white text-black text-xl font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-transform flex items-center gap-3">
                Schedule a Call <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        </div>
      </section>

    </div>
  );
};

export default ProgramForSchools;