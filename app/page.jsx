// File: app/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv"; // Import our new Client Component
import ProgramCard from "@/components/ui/ProgramCard"; // Import your refactored ProgramCard
import programs from '@/data/programs';
import {
  ArrowUpRight,
  Building2,
  Lightbulb,
  Target,
  Zap,
  Users,
  School,
  FileText,
  PhoneCall,
  SmilePlus,
  Import,
} from "lucide-react";

const features = [
  { icon: Lightbulb, title: "AI Brainstorming", description: "Use AI to generate and refine business ideas that solve real problems." },
  { icon: Zap, title: "Create with AI Tools", description: "Design logos, ads, and pitch slides using DALL·E, Canva, and more." },
  { icon: Users, title: "Real Startup Examples", description: "See how successful startups use AI in their daily operations." },
  { icon: Target, title: "Shark Tank Pitch", description: "Practice presenting your AI-powered startup idea to judges." },
];

const stats = [
  { number: "150+", label: "Student Trained" },
  { number: "50+", label: "Schools Participating" },
  { number: "50+", label: "Winners Recognized" },
  { number: "25+", label: "States Represented" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scroll" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Build Your First Startup Idea with AI — In Just{" "}
              <span className="text-yellow-500">One Day</span>
            </h1>
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} >
            <h2 className="mt-6 text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              Join the AI-Powered Teenpreneur Workshop by Teenskool. No coding. No prior experience. Just ideas, AI, and action.
            </h2>
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center" >
            <Link href="/apply">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-lg shadow-lg shadow-yellow-400/20 transition-transform hover:scale-105 w-full cursor-pointer sm:w-auto">
                Apply Now <ArrowUpRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-transform hover:scale-105 w-full cursor-pointer sm:w-auto">
                <Building2 className="w-5 h-5 text-yellow-500" /> Book for Your School
              </button>
            </Link>
          </MotionDiv>
        </div>
      </section>

    {/* Video Section - Modernized */}
<section className="pb-24 px-6">
  <div className="max-w-4xl mx-auto group"> {/* 'group' is for the hover effect */}
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}
      className="bg-gradient-to-br from-slate-50 to-gray-100 p-3 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-900/5"
    >
      <div className="rounded-xl overflow-hidden">
        <video
          className="w-full aspect-video transition-transform duration-500 ease-in-out group-hover:scale-105"
          src="/assets/hero.mp4"
          title="Modern Video Display"
          autoPlay
          muted
          loop
          playsInline // Important for playback on mobile browsers
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </MotionDiv>
  </div>
</section>
      {/* Stats Section */}
      <section className="py-20 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <MotionDiv key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group" >
                <div className="text-4xl lg:text-5xl font-extrabold text-yellow-500 mb-2 transition-transform duration-300 group-hover:scale-110">{stat.number}</div>
                <div className="text-slate-500 text-sm md:text-base">{stat.label}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            What the Workshop Covers
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-16">
            A fast-paced, high-energy intro to show students how AI can turn
            their ideas into real startup concepts.
          </p>
          <MotionDiv
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionDiv
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 h-full text-left transition-transform hover:-translate-y-2"
                >
                  <div className="bg-yellow-400/20 p-3 rounded-full w-fit mb-6">
                    <Icon className="text-yellow-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-16">
            Who It's For
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
            >
              <div className="bg-blue-500/20 p-4 rounded-full w-fit mx-auto mb-6">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Students (Grades 8–12)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Curious minds ready to explore entrepreneurship and AI tools. No
                technical background needed!
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
            >
              <div className="bg-yellow-400/20 p-4 rounded-full w-fit mx-auto mb-6">
                <Lightbulb className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Creative Thinkers
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Students who love solving problems, thinking outside the box,
                and want to see their ideas come to life.
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
            >
              <div className="bg-green-500/20 p-4 rounded-full w-fit mx-auto mb-6">
                <Target className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Forward-Thinking Schools
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Institutions bringing 21st-century skills and NEP-aligned
                workshops to their students.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-slate-600 mb-16">
            Real feedback from young innovators who joined the bootcamp.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                age: 15,
                school: "Kendriya Vidyalaya, Delhi",
                feedback:
                  "This was the most fun I've had in a class all year. I loved creating with AI and pitching my startup idea!",
              },
              {
                name: "Aarav Mehta",
                age: 16,
                school: "Delhi Public School",
                feedback:
                  "I had no idea AI could be this exciting. I feel more confident and creative now.",
              },
              {
                name: "Saanvi Kapoor",
                age: 14,
                school: "Bal Bharti Public School",
                feedback:
                  "Our team learned teamwork, pitching, and design in just a few hours. We even made our logo using AI!",
              },
            ].map((testimonial, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg text-left space-y-4"
              >
                <div className="flex items-center">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400 mr-1 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 19.897 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
                      </svg>
                    ))}
                </div>
                <p className="text-slate-700 text-lg font-medium leading-relaxed">
                  “{testimonial.feedback}”
                </p>
                <div>
                  <p className="font-semibold text-slate-800">
                    {testimonial.name}, {testimonial.age}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.school}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <School className="text-blue-600 w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                For Principals & Educators
              </h3>
            </div>
            <p className="text-slate-600">
              Want this transformative experience for your school? Give your
              students the entrepreneurial edge they need with our AI-powered
              workshop that aligns with NEP 2020 guidelines.
            </p>
            <Link href="/contact">
              <button className="bg-yellow-400 mt-4 hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg w-full shadow-lg shadow-yellow-400/20 transition flex items-center justify-center cursor-pointer gap-2">
                <PhoneCall className="w-4 h-4" /> Book a Free Demo
              </button>
            </Link>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-pink-500/20 p-2 rounded-full">
                <SmilePlus className="text-pink-600 w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Parents</h3>
            </div>
            <p className="text-slate-600">
              Want your child to explore startup skills early? Give them the
              confidence and creativity to succeed through our AI-powered
              workshop.
            </p>
            <a
              href="/parent-pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-slate-800 cursor-pointer mt-4 hover:bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg w-full shadow-md transition flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> Download Parent Pack
              </button>
            </a>
          </MotionDiv>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16" >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Explore Our Programs</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">Learn real-world skills with our expertly designed bootcamps.</p>
          </MotionDiv>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Other sections can be migrated similarly... */}
    </div>
  );
}