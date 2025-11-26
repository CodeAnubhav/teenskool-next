"use client";

import { useState } from "react";
import Image from "next/image"; 
import { useToast } from "@/components/ui/use-toast"; 

import { 
  CheckCircle, Sparkles, Rocket, Lightbulb, Clock, Zap, Cpu, 
  Trophy, Hammer, Video, Target, Users, Wallet, Tag, Award, ArrowRight
} from "lucide-react";

// Icon Map
const iconMap = { Cpu, Lightbulb, Sparkles, Rocket, Video, Trophy, Target, Zap };

// Program Data
const program = {
  title: "AI Startup Masterclass",
  shortDescription: "Launch your first business idea in 3 hours using only AI tools.",
  description: "A super-fast, hands on workshop for new founders. Learn the ultimate AI-First strategy to build a validated idea, brand, website, and investor pitch in one session without writing a single line of code.",
  price: 1999,
  duration: "3 Hour Live Workshop",
  nextBatch: "December 1, 2025",
  format: "Live Interactive Session",
  level: "Beginner",
  strategy: { focusAreas: ["Speed", "Zero Code", "Data-Driven", "Professional"] },
  curriculum: [
    { title: "Mindset & Setup", timeframe: "0:00 - 0:22", keyFocus: "Rules of building fast & tool setup.", iconName: "Cpu" },
    { title: "Idea Validation", timeframe: "0:22 - 0:45", keyFocus: "Check market viability & customer personas.", iconName: "Lightbulb" },
    { title: "Branding & Assets", timeframe: "0:45 - 1:10", keyFocus: "Generate logos, slogans & visual identity.", iconName: "Sparkles" },
    { title: "Website Deployment", timeframe: "1:10 - 1:35", keyFocus: "Launch a live, mobile-friendly site instantly.", iconName: "Rocket" },
    { title: "Content Strategy", timeframe: "1:35 - 2:00", keyFocus: "30-day social plan & promo video generation.", iconName: "Video" },
    { title: "Pitch Deck Creation", timeframe: "2:00 - 2:25", keyFocus: "Investor-ready presentation slides.", iconName: "Trophy" },
    { title: "Final Demo & Plan", timeframe: "2:25 - 3:00", keyFocus: "Prototype showcase & 90-day roadmap.", iconName: "Target" },
  ],
  keyResults: [
    "Validate profitable ideas instantly",
    "Design professional brand identities",
    "Build complete websites (No Code)",
    "Create investor ready pitch decks",
    "Automate daily operations with AI",
  ],
  toolsUsed: [
    { name: "ChatGPT", logo: "/assets/tools/chatgpt.png" },
    { name: "Claude", logo: "/assets/tools/claude.png" },
    { name: "Gemini", logo: "/assets/tools/gemini.png" },
    { name: "MidJourney", logo: "/assets/tools/midj.png" },
    { name: "Gamma", logo: "/assets/tools/gamma.png" },
    { name: "Durable", logo: "/assets/tools/durable.png" },
  ],
  support: {
    includes: ["Email Support", "Group Office Hours", "Alumni Community"]
  },
};

export default function AIStartupMasterclass() {
  const { toast } = useToast(); 
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const originalPrice = program.price + 2000;

  // Razorpay Logic
  const handleEnroll = () => {
    if (typeof window === "undefined") return;

    setLoading(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onerror = () => {
      setLoading(false);
      toast({
        title: "Payment Error",
        description: "Could not load the payment gateway. Please try again.",
        variant: "destructive",
      });
    };

    script.onload = () => {
      if (typeof window.Razorpay === "undefined") {
        script.onerror();
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: program.price * 100,
        currency: "INR",
        name: "Teenskool",
        description: `Enrollment for ${program.title}`,
        image: "/assets/TSlogo.png",
        handler: function (response) {
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}. Welcome aboard!`,
            variant: "default", 
            className: "bg-green-600 text-white border-none"
          });
          setLoading(false);
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#a3e635" }, 
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    document.body.appendChild(script);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500/30">
      {/* Dark Grid Background */}
     
      
      <div className="relative max-w-7xl mx-auto pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-lime-400/10 text-lime-400 rounded-full border border-lime-400/20">
                  <Zap className="w-3 h-3" />
                  {program.level} Level
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700">
                  <Video className="w-3 h-3" />
                  {program.format}
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                {program.title}
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-400 leading-relaxed max-w-3xl">
                {program.shortDescription}
              </p>

              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-lime-900/20 border border-neutral-800 aspect-video">
                 <Image
                    src="/assets/programimage.png"
                    alt="AI Startup Masterclass"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-4">The AI First Learning</h2>
              <p className="text-neutral-400 leading-relaxed mb-6 text-lg">
                {program.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {program.strategy.focusAreas.map((area, i) => (
                  <div key={i} className="bg-neutral-800 border border-neutral-700 p-4 rounded-xl text-center font-semibold text-sm text-lime-400">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Trophy className="w-8 h-8 text-lime-400" />
                What You Will Master
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.keyResults.map((result, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`flex items-start gap-3 p-5 rounded-xl bg-neutral-900 border border-neutral-800 transition-all duration-300 ${
                      hoveredIndex === i ? 'shadow-lg shadow-lime-500/10 border-lime-500/40 translate-y-[-2px]' : ''
                    }`}
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-lime-400" />
                    </div>
                    <span className="text-neutral-300 font-medium leading-relaxed">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Timeline */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Clock className="w-8 h-8 text-lime-400" />
                3-Hour Curriculum
              </h2>
              <div className="relative space-y-6 pl-8">
                {/* Timeline Line (Gradient) */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-lime-500 via-lime-500/20 to-transparent" />
                
                {program.curriculum.map((seg, i) => {
                  const IconComponent = iconMap[seg.iconName] || Zap;
                  return (
                    <div key={i} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[29px] top-2 w-5 h-5 rounded-full bg-black border-[3px] border-lime-500 flex items-center justify-center z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 group-hover:border-lime-500/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <IconComponent className="w-5 h-5 text-lime-400" />
                            {seg.title}
                          </h3>
                          <span className="text-xs font-mono text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full w-fit">
                            {seg.timeframe}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">{seg.keyFocus}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Hammer className="w-8 h-8 text-lime-400" />
                Tech Stack
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {program.toolsUsed.map((tool, i) => (
                  <div key={i} className="bg-neutral-900 rounded-xl p-5 border border-neutral-800 hover:border-lime-500/50 transition-all group flex items-center gap-4">
                    <div className="w-10 h-10 relative shrink-0">
                       <Image 
                         src={tool.logo} 
                         alt={tool.name} 
                         fill 
                         className="object-contain" 
                       />
                    </div>
                    <span className="font-semibold text-neutral-300 group-hover:text-lime-400 transition-colors">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-lime-500/5 rounded-2xl p-8 border border-lime-500/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                <Users className="w-6 h-6 text-lime-400" />
                After the Workshop
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-lime-400 mb-4">Included Support</p>
                  <ul className="space-y-3">
                    {program.support.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-300">
                        <CheckCircle className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-lime-400 mb-4">Bonuses</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-neutral-300">
                      <CheckCircle className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                      <span>Lifetime Recording Access</span>
                    </li>
                    <li className="flex items-start gap-2 text-neutral-300">
                      <CheckCircle className="w-5 h-5 text-lime-500 shrink-0 mt-0.5" />
                      <span>Prompt Library Templates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-neutral-900 rounded-3xl shadow-2xl shadow-black border border-neutral-800 overflow-hidden">
                <div className="p-8 space-y-6">
                  
                  {/* Pricing */}
                  <div className="bg-neutral-800/50 p-6 rounded-2xl text-center border border-neutral-700">
                    <p className="text-xs uppercase font-bold text-lime-400 mb-3 flex items-center justify-center gap-2">
                      <Tag className="w-3.5 h-3.5" /> Limited Time Offer
                    </p>
                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <span className="text-5xl font-extrabold text-white">₹{program.price}</span>
                      <span className="text-xl font-semibold text-neutral-500 line-through decoration-red-500/50">
                        ₹{originalPrice}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-bold rounded-full mt-2">
                      Save ₹2000
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <button
                    onClick={handleEnroll}
                    disabled={loading}
                    className="group w-full cursor-pointer bg-[#a3e635] hover:bg-[#8fd12a] text-black font-bold text-lg py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5" />
                        Enroll Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Quick Details */}
                  <div className="pt-6 border-t border-neutral-800 space-y-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Quick Details</h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Clock, label: "Duration", value: program.duration },
                        { icon: Users, label: "Format", value: program.format },
                        { icon: Award, label: "Level", value: program.level },
                        { icon: Target, label: "Next Batch", value: program.nextBatch }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="p-2.5 rounded-lg bg-neutral-800 text-neutral-400 group-hover:bg-lime-500/10 group-hover:text-lime-400 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-neutral-500 font-medium">{item.label}</p>
                            <p className="text-sm font-semibold text-neutral-200">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lime-500" />
                  100% Secure Payment
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}