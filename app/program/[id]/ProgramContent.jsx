"use strict";
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import MobileStickyCTA from "./MobileStickyCTA";
import { useToast } from "@/components/ui/use-toast"; // Added useToast import
import {
    CheckCircle,
    Lightbulb,
    Clock,
    Zap,
    Cpu,
    Search,
    Trophy,
    Hammer,
    ArrowRight,
    Video,
    Download,
    Star,
    Users,
    BarChart,
    Sparkles,
    Rocket,
    Play,
    Layers,
    Palette,
    AlertTriangle,
    XCircle,
    X,
    CheckCircle2,
    Check,
    Bot,           // New
    MessageSquare, // New
    Brain          // New
} from "lucide-react";

// --- Icon Mapping ---
const segmentIconMap = {
    "Mindset & Setup": Cpu,
    "Idea Validation": Lightbulb,
    "Branding & Assets": Palette,
    "Website Deployment": Rocket,
    "Market Positioning & Analysis": Search,
    "Content Strategy": Video,
    "Pitch Deck Creation": Layers,
    "Final Demo & Plan": Trophy,
};

// --- Floating Icon Component ---
const FloatingIcon = ({ src, alt, className, speed = 1 }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

    return (
        <motion.div
            style={{ y }}
            className={`absolute pointer-events-none z-0 ${className}`}
        >
            <div className="relative p-3 rounded-2xl bg-white backdrop-blur-md border border-white/20 shadow-2xl animate-float">
                <Image src={src} alt={alt} width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
        </motion.div>
    );
};

export default function ProgramContent({ program }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const imageUrl = program.Image || '/placeholder.jpg';
    const price = program.price || 4999;
    const originalPrice = price + 3000;

    const { toast } = useToast();

    // --- ENROLL HANDLER ---
    const handleEnroll = () => {
        if (typeof window === 'undefined') return;

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onerror = () => {
            toast({
                title: "Payment Error",
                description: "Could not load the payment gateway. Please try again.",
                variant: "destructive",
            });
        };

        script.onload = () => {
            if (typeof window.Razorpay === 'undefined') {
                script.onerror();
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: price * 100, // Amount in paisa
                currency: "INR",
                name: "Teenskool",
                description: `Enrollment for ${program.title}`,
                image: "/assets/TSlogo.png",
                handler: function (response) {
                    toast({
                        title: "Payment Successful!",
                        description: `Thank you for enrolling. Payment ID: ${response.razorpay_payment_id}`,
                        variant: "success",
                        className: "bg-green-500 text-white"
                    });
                },
                prefill: {
                    name: "Student Name",
                    email: "student@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#a3e635" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        document.body.appendChild(script);
    };

    // Floating decoration logic
    const tools = program.toolsUsed || [];
    const tool1 = tools[0]?.logo || "/assets/tools/chatgpt.png";
    const tool2 = tools[1]?.logo || "/assets/tools/midj.png";
    const tool3 = tools[2]?.logo || "/assets/tools/claude.png";
    const tool4 = tools[3]?.logo || "/assets/tools/gamma.png";

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-primary/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#a3e635]/10 rounded-full blur-[150px] mix-blend-screen opacity-40 animate-pulse-slow" />
                <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] mix-blend-screen opacity-20" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">

                {/* --- HERO SECTION (Parallax) --- */}
                <div className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 md:pt-32 mb-20">

                    {/* Floating Icons (Parallax) - Hidden on Mobile */}
                    {/* Floating Icons (Parallax) - Optimized for Mobile */}
                    <FloatingIcon src={tool1} alt="Tool 1" className="top-[10%] left-[-2%] scale-75 md:left-[10%] md:top-[15%] md:scale-100" speed={1.5} />
                    <FloatingIcon src={tool2} alt="Tool 2" className="top-[12%] right-[-2%] scale-75 md:right-[15%] md:top-[25%] md:scale-100" speed={2} />
                    <FloatingIcon src={tool3} alt="Tool 3" className="bottom-[15%] left-[-2%] scale-75 md:left-[15%] md:bottom-[20%] md:scale-100" speed={0.8} />
                    <FloatingIcon src={tool4} alt="Tool 4" className="bottom-[20%] right-[-2%] scale-75 md:right-[10%] md:bottom-[30%] md:scale-100" speed={1.2} />

                    <motion.div
                        style={{ scale: heroScale, opacity: heroOpacity }}
                        className="text-center z-10 max-w-4xl mx-auto space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-white/10 transition-colors cursor-default"
                        >
                            <Sparkles className="w-4 h-4 fill-primary" /> Premium Launchpad
                        </motion.div>

                        {/* Massive Typography */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 drop-shadow-2xl"
                        >
                            AI FOUNDER <span className="text-[#a3e635]">LAUNCHPAD</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
                        >
                            {program.shortDescription}
                        </motion.p>

                        {/* CTA Buttons - Big & Bold */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8"
                        >
                            <button
                                onClick={handleEnroll}
                                className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#a3e635] text-black font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-5px_rgba(163,230,53,0.4)] flex items-center justify-center gap-2"
                            >
                                START LEARNING <ArrowRight className="w-6 h-6 stroke-[3px]" />
                            </button>

                            {program.brochureLink && (
                                <a
                                    href={program.brochureLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:border-white/20"
                                >
                                    <Download className="w-5 h-5" /> BROCHURE
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>


                {/* --- STATS GRID (Glass) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32"
                >
                    {[
                        { label: "Duration", value: "4 Hours", icon: Clock },
                        { label: "Format", value: "Online", icon: Video },
                        { label: "Level", value: "Beginner", icon: BarChart },
                        { label: "Access", value: "Lifetime", icon: Users },
                    ].map((stat, i) => (
                        <div key={i} className="group relative p-8 rounded-[2rem] bg-[#111] border border-white/5 overflow-hidden hover:border-[#a3e635]/30 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#a3e635]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <stat.icon className="w-8 h-8 text-[#a3e635] mb-4 group-hover:scale-110 transition-transform" />
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* --- MARKET GAP SECTION (New) --- */}
                <div className="mb-32">
                    <div className="text-center mb-16 px-4">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 font-bold uppercase tracking-widest text-xs mb-4 text-red-500 border border-red-500/20">
                            The Reality Check
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Why Most Students <span className="text-red-500 underline decoration-wavy decoration-2 underline-offset-8">Fail</span></h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">Traditional education teaches you to harmonize with the status quo. We teach you to disrupt it.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                        {/* The Problem (Old Way) */}
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-[#111] border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-all">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                    <XCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300">The Old Way</h3>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Stuck in 'Idea Phase' for months",
                                    "Overwhelmed by technical complexity",
                                    "Zero market validation before building",
                                    "Learning theory, missing execution"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-gray-400 font-medium">
                                        <X className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* The Solution (Teenskool Way) */}
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-[#a3e635] text-black relative overflow-hidden shadow-[0_0_50px_-10px_rgba(163,230,53,0.3)] transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-[#a3e635]">
                                    <Rocket className="w-6 h-6 fill-current" />
                                </div>
                                <h3 className="text-2xl font-black">The Launchpad Way</h3>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Validate with Real Customers First",
                                    "No Code Tools = Instant Building",
                                    "Launch MVP in few days using AI",
                                    "Master Execution & Brand Building"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 font-bold text-black/80">
                                        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-[#a3e635] stroke-[4px]" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- CURRICULUM (Rounded Cards Grid) --- */}
                {/* Removed white background, now transparent/dark to fit page flow */}
                <div className="relative z-10 mb-32">

                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 px-4">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Curriculum <span className="text-[#a3e635] underline decoration-wavy decoration-2 underline-offset-8">Journey</span></h2>
                            <p className="text-lg text-gray-400 max-w-xl font-medium">4 Hours of content. A structured path to success.</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces"
                                ].map((src, i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 overflow-hidden relative">
                                        <Image
                                            src={src}
                                            alt="Student"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-bold opacity-80">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9/5
                                </div>
                                <span className="text-gray-500">Student Rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {program.curriculum?.map((module, i) => {
                            const Icon = segmentIconMap[module.title] || Star;
                            // Brand Consistant Theme (Lime & Black)
                            const cardTheme = [
                                { bg: "bg-[#111]", text: "text-white", accent: "bg-white/10", border: "border-white/5" },
                                { bg: "bg-[#a3e635]", text: "text-black", accent: "bg-black/10", border: "border-black/5" },
                            ][i % 2];

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`group relative h-full min-h-[280px] p-8 rounded-[2.5rem] ${cardTheme.bg} ${cardTheme.text} border ${cardTheme.border} transition-all hover:scale-[1.02] flex flex-col justify-between overflow-hidden shadow-xl`}
                                >
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`px-4 py-1.5 rounded-full ${cardTheme.accent} backdrop-blur-md text-xs font-bold uppercase tracking-widest`}>
                                                {module.timeframe}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 leading-tight">{module.title}</h3>
                                        <p className={`text-sm font-medium leading-relaxed opacity-80 line-clamp-3`}>{module.keyFocus}</p>
                                    </div>

                                    <div className={`relative z-10 mt-8 pt-6 border-t ${cardTheme.accent ? 'border-current/10' : 'border-white/10'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${cardTheme.accent}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className={`h-1 flex-1 ${cardTheme.accent} rounded-full overflow-hidden`}>
                                                <div className="h-full bg-current w-3/4 rounded-full opacity-50" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* --- KEY OUTCOMES (Bento Grid) --- */}
                <div className="mb-32">
                    <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">Launchpad Key <span className="text-[#a3e635] underline decoration-wavy decoration-2 underline-offset-8">Outcomes</span></h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(() => {
                            const outcomes = program.keyResults || [
                                "Master the process of building with AI",
                                "Validate profitable business ideas",
                                "Design a professional brand identity",
                                "Build a functional website without coding",
                                "Develop a pitch deck ready for investors",
                                "Use AI tools for everyday business tasks"
                            ];

                            const outcomeIcons = [Cpu, BarChart, Palette, Rocket, Layers, Sparkles];

                            return outcomes.map((result, i) => {
                                const Icon = outcomeIcons[i] || CheckCircle;
                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className={`p-8 rounded-[2rem] border border-white/5 bg-[#111] hover:border-[#a3e635]/30 transition-all flex flex-col justify-between gap-4 h-full`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#a3e635]/10 flex items-center justify-center text-[#a3e635]">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold leading-tight text-gray-200">{result}</h3>
                                    </motion.div>
                                );
                            });
                        })()}
                    </div>
                </div>

                {/* --- TOOLS (Floating Dock Style) - MOVED UP BEFORE PRICE --- */}
                <div className="mb-32 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">AI Tools You'll <span className="text-[#a3e635] underline decoration-wavy decoration-2 underline-offset-8">Master</span></h2>

                    <motion.div
                        className="inline-flex flex-wrap justify-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {program.toolsUsed?.map((tool, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.1 }}
                                className="relative group"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center p-3 shadow-lg cursor-pointer">
                                    <Image src={tool.logo} alt={tool.name} width={64} height={64} className="w-full h-full object-contain" />
                                </div>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-black px-2 py-1 rounded-md whitespace-nowrap border border-white/20">
                                    {tool.name}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* --- AI CO-FOUNDER SECTION (New) --- */}
                {/* --- AI CO-FOUNDER SECTION (New) --- */}
                <div className="mb-32">
                    <div className="relative rounded-[3rem] bg-[#111] border border-[#a3e635]/20 p-8 md:p-12 overflow-hidden group shadow-2xl shadow-black/50">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Text Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] font-bold uppercase tracking-widest text-xs mb-6">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Premium Access Included</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                    Meet Your New <br className="hidden md:block" />
                                    <span className="text-white">AI Co-Founder</span>
                                </h2>
                                <p className="text-lg text-gray-400 mb-8 font-medium">
                                    Generic AI gives generic advice. Ours is fine-tuned on <span className="text-white font-bold">Y-Combinator & Top 1% Startup Data</span>. It's like having a unicorn founder in your pocket, 24/7.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { icon: Clock, title: "Available 24/7", desc: "Never waits for office hours. Always ready to brainstorm." },
                                        { icon: Zap, title: "Unlimited Brainstorming", desc: "No message limits. Iterate on your ideas as much as you need." },
                                        { icon: Brain, title: "Startup Trained Data", desc: "Fine-tuned on thousands of successful case studies and strategies." }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#a3e635]/30 hover:bg-[#a3e635]/5 transition-all duration-300">
                                            <div className="w-10 h-10 rounded-full bg-[#a3e635]/10 flex items-center justify-center text-[#a3e635] shrink-0">
                                                <feature.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                                                <p className="text-sm text-gray-400">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Visual (Chat Interface) */}
                            <div className="relative">
                                {/* Chat Mockup */}
                                <div className="relative rounded-3xl bg-[#050505] border border-white/10 p-6 shadow-2xl backdrop-blur-md">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                        </div>
                                        <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                                            <span className="text-[10px] font-bold text-[#a3e635] uppercase tracking-wider">Online</span>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="space-y-6 font-mono text-sm leading-relaxed mb-4">
                                        {/* User Message */}
                                        <div className="flex justify-end pl-12">
                                            <div className="bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/20 px-5 py-3 rounded-2xl rounded-tr-sm">
                                                <p>I have an idea for a pet-sitting app, but how do I know if people want it?</p>
                                            </div>
                                        </div>

                                        {/* AI Message */}
                                        <div className="flex justify-start pr-8">
                                            <div className="bg-white/5 text-gray-300 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-sm w-full">
                                                <div className="flex items-center gap-2 mb-3 text-[#a3e635]/80 text-xs font-bold uppercase tracking-wider">
                                                    <Bot className="w-3 h-3" /> Analysis
                                                </div>
                                                <p className="mb-3"><span className="text-white font-bold">Strategy:</span> Don't build the app yet. Validate fast.</p>
                                                <ul className="space-y-2 text-xs opacity-80 border-l-2 border-[#a3e635]/30 pl-3">
                                                    <li>• Create a landing page with a waitlist.</li>
                                                    <li>• Offer manual service first to test demand.</li>
                                                    <li>• Check competitor reviews for gaps.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Input Area */}
                                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-3 opacity-50">
                                        <div className="h-10 bg-white/5 rounded-xl w-full border border-white/5" />
                                        <div className="h-10 w-10 bg-[#a3e635]/20 rounded-xl border border-[#a3e635]/20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PRICE SECTION (Dark Theme) --- */}
                {/* Changed from full green gradient to dark with green accents */}
                {/* --- PRICE SECTION (Redesigned: All-Inclusive) --- */}
                <div className="max-w-5xl mx-auto mb-32">
                    <div className="bg-[#111] rounded-[3rem] border border-[#a3e635]/20 p-8 md:p-12 overflow-hidden relative">
                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Value Prop */}
                            <div className="text-left space-y-8">
                                <div>
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#a3e635]/10 font-bold uppercase tracking-widest text-xs mb-4 text-[#a3e635]">
                                        All-Inclusive Access
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Start Your <br /><span className="text-white">Founder Journey</span></h2>
                                    <p className="text-lg text-gray-400">Join the program today and get instant access to everything you need to build your startup.</p>
                                </div>

                                <div className="space-y-4">
                                    {(program.includes || [
                                        "Full access to AI Founder OS",
                                        "Certificate of Young Founder",
                                        "30 Days Post-Launch Support",
                                        "Exclusive Community Access",
                                        "Lifetime Access to All Updates"
                                    ]).map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#a3e635] flex items-center justify-center text-black shrink-0 shadow-[0_0_10px_rgba(163,230,53,0.3)]">
                                                <CheckCircle className="w-4 h-4 stroke-[3px]" />
                                            </div>
                                            <span className="font-bold text-gray-200 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Price & CTA */}
                            <div className="bg-white/5 rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-center relative backdrop-blur-sm shadow-2xl flex flex-col justify-center min-h-[400px]">
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Total Value <span className="line-through decoration-white/30 text-gray-500">₹{originalPrice}</span></p>
                                <div className="text-6xl md:text-7xl font-black text-white mb-3 tracking-tighter">₹{price}</div>
                                <p className="text-sm text-gray-500 mb-10 font-medium">One-time payment • Lifetime access</p>

                                <button
                                    onClick={handleEnroll}
                                    className="w-full py-5 rounded-xl bg-[#a3e635] text-black font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_-10px_rgba(163,230,53,0.5)] flex items-center justify-center gap-3 mb-6"
                                >
                                    <Zap className="w-6 h-6 fill-black" /> Enrol Now
                                </button>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-center gap-2 opacity-30">
                                        <div className="h-4 w-8 bg-white rounded" />
                                        <div className="h-4 w-8 bg-white rounded" />
                                        <div className="h-4 w-8 bg-white rounded" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Secure payment via Razorpay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <MobileStickyCTA program={program} />
        </div>
    );
}
