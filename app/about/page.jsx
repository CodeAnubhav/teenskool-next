'use client';
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Award,
  Globe,
  Rocket,
  ArrowUpRight,
  Building2,
} from "lucide-react";

// The same background pattern component from Home.jsx for consistency
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
);

const About = () => {
  const missionRef = useRef(null);

  const values = [
    {
      icon: Lightbulb,
      title: "AI-Powered Creativity",
      description:
        "Students can build smarter ideas with the right AI tools and the right mindset.",
    },
    {
      icon: Users,
      title: "Tech-Driven Mentorship",
      description:
        "Startup founders & educators with deep roots in tech and innovation.",
    },
    {
      icon: Heart,
      title: "Purposeful Innovation",
      description:
        "Ideas that make a difference — socially, environmentally, economically.",
    },
    {
      icon: Globe,
      title: "Pan-India Impact",
      description:
        "Reaching students in 25+ states through NEP-aligned workshops.",
    },
  ];

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    // Main container with the new light theme
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      <GridPattern />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24 md:space-y-32 pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <p className="uppercase text-sm tracking-widest text-yellow-600 font-semibold">
              About Teenskool
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">
              Empowering the Next Generation of{" "}
              <span className="text-yellow-500 block mt-2">
                Student Innovators
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto pt-4">
              We're building a vibrant ecosystem where young minds transform
              ideas into impact, driven by AI and real-world mentorship.
            </p>
            <div className="mt-8 pt-4">
              <button
                onClick={scrollToMission}
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-300 rounded-full text-slate-700 text-lg font-semibold hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 shadow-sm cursor-pointer group"
              >
                Discover Our Story{" "}
                <span className="ml-3 transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section id="mission" ref={missionRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 text-center space-y-8 shadow-xl"
          >
            <Target className="h-14 w-14 mx-auto text-yellow-500 bg-yellow-400/20 p-3 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-xl leading-relaxed">
              To build a dynamic launchpad where students explore the frontiers
              of AI, boldly pitch their innovative ideas, and collaborate
              seamlessly like real-world founders. Our goal is to ignite a spark
              of purposeful innovation that creates meaningful change.
            </p>
          </motion.div>
        </section>

        {/* Core Beliefs Section */}
        <section id="beliefs">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                What We Believe In
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                The foundational principles that drive Teenskool's vision and
                impact.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 flex flex-col items-center text-center transition-transform hover:-translate-y-2"
                >
                  <div className="bg-yellow-400/20 p-4 rounded-full w-fit flex items-center justify-center mb-6">
                    <item.icon className="text-yellow-600 w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section id="cta">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="text-center bg-white p-10 md:p-16 rounded-3xl shadow-2xl border border-slate-200 space-y-8"
          >
            <Rocket className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Ready to Innovate with Teenskool?
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed">
              Join our growing community and be part of a future where every
              student can build, pitch, and lead.
            </p>
            <div className="flex justify-center flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-lg shadow-lg shadow-yellow-400/20 transition-transform hover:scale-105 w-full sm:w-auto">
                  Contact Now
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-sm flex items-center justify-center gap-2 transition-transform hover:scale-105 w-full sm:w-auto">
                  <Building2 className="w-5 h-5 text-yellow-500" />
                  Book for Your School
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
