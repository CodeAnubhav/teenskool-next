'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Rocket,
  ArrowUpRight,
  Sparkles,
  Code2,
  MapPin,
} from "lucide-react";

// --- Data ---
const timelineData = [
  {
    id: "01",
    title: "The Gap",
    subtitle: "Curiosity Without Direction",
    description:
      "Across classrooms globally, students were curious, creative, and ambitious but they lacked one thing: a clear path to turn ideas into real products.",
    icon: MapPin,
  },
  {
    id: "02",
    title: "The Experience",
    subtitle: "5+ Years Inside EdTech",
    description:
      "We spent years working in the education ecosystem, watching students learn tools but never learn how to build, launch, or think like founders.",
    icon: Code2,
  },
  {
    id: "03",
    title: "The Shift",
    subtitle: "AI Changed the Rules",
    description:
      "AI collapsed the learning curve. Suddenly, building MVPs no longer took months. With the right guidance, students could create in hours.",
    icon: Sparkles,
  },
  {
    id: "04",
    title: "TeenSkool",
    subtitle: "From Idea to MVP",
    description:
      "We built TeenSkool to help students think like founders using AI to rapidly prototype, test ideas, and solve real-world problems.",
    icon: Rocket,
  },
];


const values = [
  {
    icon: Lightbulb,
    title: "AI-First Learning",
    description:
      "We teach students how to use AI as a creative partner to build faster, smarter, and with confidence.",
  },
  {
    icon: Users,
    title: "Founder Mindset",
    description:
      "We don’t teach theory. We train students to think, act, and build like real-world founders.",
  },
  {
    icon: Heart,
    title: "Purpose-Driven Innovation",
    description:
      "Every project starts with a real problem — because meaningful ideas create lasting impact.",
  },
  {
    icon: Globe,
    title: "Global by Design",
    description:
      "Built for students worldwide, starting with India and the Middle East, expanding globally.",
  },
];

// --- Components ---

const ParallaxBlob = ({ className, speed = 1 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300 * speed]);
  return <motion.div style={{ y }} className={`absolute rounded-full blur-[100px] -z-10 ${className}`} />;
};

const WindingTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  const mobileHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Total height for 4 items * 300px each = 1200px
  // The SVG path is calculated to weave exactly through these 300px segments
  const desktopHeight = 1200;

  return (
    <div ref={containerRef} className="relative my-20">

      {/* --- DESKTOP: Fixed Height & Winding SVG --- */}
      <div className="hidden md:block relative mx-auto max-w-6xl" style={{ height: desktopHeight }}>

        {/* The Curve Layer */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-full pointer-events-none -z-10">
          <svg className="w-full h-full" viewBox={`0 0 600 ${desktopHeight}`} fill="none">
            {/* Path Logic: 
               Starts top center (300, 0).
               Segment 1 (0-300px): Curves Right -> Ends Center.
               Segment 2 (300-600px): Curves Left -> Ends Center.
               ...repeats.
            */}
            <path
              d="M 300 0 
                 C 450 50, 450 250, 300 300 
                 C 150 350, 150 550, 300 600 
                 C 450 650, 450 850, 300 900 
                 C 150 950, 150 1150, 300 1200"
              stroke="#222"
              strokeWidth="4"
              fill="none"
            />
            <motion.path
              d="M 300 0 
                 C 450 50, 450 250, 300 300 
                 C 150 350, 150 550, 300 600 
                 C 450 650, 450 850, 300 900 
                 C 150 950, 150 1150, 300 1200"
              stroke="var(--primary)"
              strokeWidth="4"
              fill="none"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* The Content Grid Layer */}
        <div className="relative h-full">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              // Each item gets a strict 300px slot
              <div key={index} className="absolute w-full h-[300px] flex items-center justify-center" style={{ top: index * 300 }}>

                {/* Center Icon Node */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 bg-black border-4 border-zinc-900 p-3 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Text Block - Alternating Sides */}
                <div className={`w-1/2 px-16 ${isEven ? 'mr-auto text-right pr-24' : 'ml-auto text-left pl-24'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">{item.subtitle}</span>
                    <h3 className="text-4xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* --- MOBILE: Simple Stacked Layout (Unchanged) --- */}
      <div className="md:hidden relative pb-20">
        {/* Vertical Green Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800">
          <motion.div style={{ height: mobileHeight }} className="w-full bg-primary origin-top" />
        </div>

        <div className="space-y-16 px-6">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12"
            >
              {/* Mobile Icon */}
              <div className="absolute left-0 top-0 -translate-x-1/2 bg-black border-2 border-zinc-800 p-2 rounded-full z-10">
                <item.icon className="w-5 h-5 text-primary" />
              </div>

              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">{item.subtitle}</span>
              <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-zinc-400 text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

// --- Main Page ---

const About = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-primary selection:text-black">

      <ParallaxBlob className="top-0 left-0 w-[500px] h-[500px] bg-primary/10" speed={0.5} />
      <ParallaxBlob className="top-[40%] right-0 w-[600px] h-[600px] bg-blue-500/10" speed={0.8} />

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative px-6 pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center z-10 max-w-4xl">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase">
            The TeenSkool Story
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
            WE BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              FOUNDERS.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
          We close the gap between learning and building empowering teens to turn ideas into real MVPs using AI, in just hours.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">The Journey</h2>
        </div>
        <WindingTimeline />
      </section>

      {/* Values Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl hover:border-primary/40 transition-all group"
            >
              <v.icon className="w-10 h-10 text-zinc-600 group-hover:text-primary transition-colors mb-6" />
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-primary rounded-[2.5rem] p-12 md:p-20 max-w-5xl mx-auto relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tight">READY TO START?</h2>
            <Link href="/contact" className="inline-flex bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform items-center gap-2">
              Get in Touch <ArrowUpRight />
            </Link>
          </div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;