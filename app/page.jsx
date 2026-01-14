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
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "AI Brainstorming",
    description: "Use AI to generate and refine business ideas that solve real problems.",
  },
  {
    icon: Zap,
    title: "Create with AI Tools",
    description: "Design logos, ads, and pitch slides using DALL·E, Canva, and more.",
  },
  {
    icon: Users,
    title: "Real Startup Examples",
    description: "See how successful startups use AI in their daily operations.",
  },
  {
    icon: Target,
    title: "Shark Tank Pitch",
    description: "Practice presenting your AI-powered startup idea to judges.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Hero Section with Infinite Grid and Scroll Animation */}
      <InfiniteGridHero>
        <div className="flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                  Build Your First Startup <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none block">
                    Idea with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">AI</span>
                  </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10">
                  Join the AI-Powered Teenpreneur Workshop by Teenskool. No coding. No prior experience. Just ideas, AI, and action.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Link href="/program/ai-startup-masterclass" className="group">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20 transition-transform hover:scale-105 w-full cursor-pointer sm:w-auto">
                      Apply Now
                      <ArrowUpRight className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </Link>

                  <Link href="/program-for-school">
                    <button className="bg-surface/80 backdrop-blur-sm border border-border text-foreground hover:bg-border px-6 py-3 rounded-lg font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105 w-full cursor-pointer sm:w-auto">
                      <Building2 className="w-5 h-5 text-primary" /> Book for Your School
                    </button>
                  </Link>
                </div>
              </>
            }
          >
            {/* Using the video as the main content of the card */}
            <div className="h-full w-full object-cover">
              <video
                className="w-full h-full object-cover rounded-2xl"
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

      {/* 1. Who It's For Section */}
      <section className="py-32 px-6 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Target Audience</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
              WHO IS THIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">FOR?</span>
            </h2>
          </MotionDiv>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, title: "Students (Grades 8–12)", desc: "Curious minds ready to explore entrepreneurship and AI tools. No technical background needed!" },
              { icon: Lightbulb, title: "Creative Thinkers", desc: "Students who love solving problems, thinking outside the box, and want to see their ideas come to life." },
              { icon: Target, title: "Forward-Thinking Schools", desc: "Institutions bringing 21st-century skills and NEP-aligned workshops to their students." },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-surface p-10 rounded-[2rem] border border-border shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all text-center group"
              >
                <div className="bg-primary/10 p-5 rounded-3xl w-20 h-20 mx-auto mb-8 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-lg">{item.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Features Section ("What You Will Build") */}
      <section className="py-32 px-6 relative bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Curriculum</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                WHAT YOU WILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">BUILD</span>
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
                A fast-paced, high-energy intro to show students how AI can turn their ideas into real startup concepts.
              </p>
            </MotionDiv>
          </div>

          <MotionDiv
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionDiv
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 50 }}
                  whileHover={{ y: -10 }}
                  className="bg-background/80 backdrop-blur-md p-8 rounded-3xl border border-border h-full shadow-lg hover:shadow-primary/10 transition-all group"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-transparent p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary/30 transition-colors">
                    <Icon className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 text-base leading-relaxed">{feature.description}</p>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </section>

      {/* 3. Virtual Mentor Section -> Rebranded to AI CoFounder */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-surface border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 transform -translate-y-10"></div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50 ring-1 ring-white/10">
              <Image
                src="/assets/virtual-image.png"
                alt="AI Virtual CoFounder Interface"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Live AI Assistant</span>
                </div>
                <h3 className="text-2xl font-bold">Always On. Always Ready.</h3>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                  <BotMessageSquare className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  Free with Every Course
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 leading-none">
                MEET YOUR <br /> <span className="text-primary">AI CO-FOUNDER.</span>
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-light">
                Every student gets free access to our virtual AI CoFounder. It's like having a 24/7 startup expert to help you brainstorm, refine your pitch, and answer any question, anytime.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: Sparkles, title: "Idea Validation", desc: "Get instant feedback on your startup ideas and suggestions for improvement." },
                { icon: Rocket, title: "Pitch Practice", desc: "Practice your pitch and get tips on how to present with more confidence." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border/50 hover:bg-surface/80 transition-colors">
                  <div className="bg-background p-3 rounded-full shadow-sm">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{item.title}</h4>
                    <p className="text-foreground/70 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* 4. Student Voices (Testimonials) */}
      <Testimonial />


      {/* 5. Banner Carousel */}
      <section className="py-24 px-6 bg-background">
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
      <section className="py-32 px-6 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Masterclass</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4">
              EXPLORE OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">PROGRAM</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
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

// Helper Icon for Testimonials (preserved just in case, though Testimonial component might use its own)
function StarIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
    </svg>
  );
}