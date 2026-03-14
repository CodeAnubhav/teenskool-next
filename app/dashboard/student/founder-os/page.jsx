"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Rocket,
    Trophy,
    Flame,
    Star,
    BrainCircuit,
    ArrowRight,
    Zap,
    Loader2,
    CheckCircle,
    Presentation,
    Focus,
    Share2,
    Target,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getProfile } from "@/lib/db";
import { getLevelProgress } from "@/lib/gamification";
import * as htmlToImage from "html-to-image";

// Tool Cards Data
const TOOLS = [
    {
        id: "idea-researcher",
        title: "Idea Researcher",
        desc: "Discover burning problems, market trends, and startup opportunities in any industry.",
        icon: Search,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        href: "/dashboard/student/founder-os/idea-researcher",
        action: "Start Research",
        gradient: "from-blue-500/20 to-transparent",
    },
    {
        id: "idea-validator",
        title: "Idea Validator",
        desc: "Get an honest validation report with market analysis, risks, competitors, and a feasibility score.",
        icon: CheckCircle,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        href: "/dashboard/student/founder-os/idea-validator",
        action: "Validate Idea",
        gradient: "from-green-500/20 to-transparent",
        isFeatured: true,
    },
    {
        id: "pitch-generator",
        title: "Pitch Deck Generator",
        desc: "Generate a full 10-slide investor-ready pitch deck and download it as a beautiful image.",
        icon: Presentation,
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20",
        href: "/dashboard/student/founder-os/pitch-generator",
        action: "Generate Deck",
        gradient: "from-pink-500/20 to-transparent",
    },
];

export default function FounderOSPage() {
    const { user } = useSupabase();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef(null);

    useEffect(() => {
        async function loadProfile() {
            if (user) {
                try {
                    const data = await getProfile(user.id);
                    setProfile(data);
                } catch (e) {
                    console.error("Founder OS profile load failed", e);
                } finally {
                    setLoading(false);
                }
            }
        }
        loadProfile();
    }, [user]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    const xp = profile?.xp || 0;
    const { progress, current_role, next_role } = getLevelProgress(xp);

    const handleDownloadCertificate = () => {
        if (!certificateRef.current) return;
        setTimeout(async () => {
            try {
                // Use html-to-image to bypass Tailwind/lab color parsing issues
                const dataUrl = await htmlToImage.toPng(certificateRef.current, {
                    quality: 1.0,
                    pixelRatio: 2,
                    backgroundColor: "#000000"
                });
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "TeenSkool-Founder-Certificate.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Certificate download failed:", error);
                alert("Failed to download certificate.");
            }
        }, 100);
    };

    return (
        <div className="w-full min-h-full space-y-8 animate-in fade-in duration-500">

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900/50 via-background to-background border border-indigo-500/20 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
                    <Rocket className="w-64 h-64 text-indigo-500" />
                </div>

                <div className="relative z-10 p-8 md:p-12 space-y-6">
                    <div className="space-y-6 max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/10 text-[#a3e635] text-xs font-bold uppercase tracking-wider border border-[#a3e635]/20">
                            <Zap className="w-3 h-3" /> Founder OS v2.0
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                            Your AI <br className="hidden sm:block" />
                            Founder Toolkit
                            <span className="block mt-2 md:mt-4 text-5xl md:text-6xl lg:text-8xl drop-shadow-2xl filter" style={{ color: '#a3e635' }}>
                                3 Powerful Tools ⚡
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                            Research industries, validate ideas, and generate investor-ready pitch decks — all powered by AI.
                        </p>
                    </div>

                    {/* Gamification Stats */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl min-w-[180px] hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-yellow-500/10 rounded-xl">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Level</p>
                                <p className="text-xl font-black text-white leading-none mt-1">{current_role?.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl min-w-[180px] hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-orange-500/10 rounded-xl">
                                <Flame className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Next Level</p>
                                <p className="text-xl font-black text-white leading-none mt-1">{next_role?.name || "Max"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl min-w-[180px] hover:bg-white/10 transition-colors">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total XP</p>
                                <p className="text-xl font-black text-white leading-none mt-1">{xp}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Tools Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight">AI-Powered Tools</h2>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{TOOLS.length} Tools Available</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.href}
                            className={cn(
                                "group relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between h-full overflow-hidden",
                                tool.isFeatured
                                    ? "bg-gradient-to-b from-surface to-background border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
                                    : "bg-surface/50 border-white/5 hover:border-white/10"
                            )}
                        >
                            {/* Hover glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border",
                                        tool.bg,
                                        tool.color,
                                        tool.border
                                    )}>
                                        <tool.icon className="w-6 h-6" />
                                    </div>
                                    {tool.isFeatured && (
                                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {tool.desc}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className={cn(
                                    "w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                    tool.isFeatured
                                        ? "bg-primary text-black group-hover:bg-primary/90 shadow-lg shadow-primary/20"
                                        : "bg-white/5 text-white group-hover:bg-white/10 border border-white/5"
                                )}>
                                    {tool.action}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Certificate Section */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <div>
                            <h3 className="font-bold text-white">Your Founder Certificate</h3>
                            <p className="text-xs text-muted-foreground">Download your official TeenSkool Founder certificate</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowCertificate(true)}
                        className="px-5 py-2.5 bg-yellow-500 text-black font-bold rounded-xl text-sm hover:bg-yellow-400 transition-colors whitespace-nowrap"
                    >
                        View Certificate
                    </button>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-surface border border-white/10 rounded-3xl p-6 max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10"
                        >
                            <Focus className="w-5 h-5 rotate-45" />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                Your Official Certificate!
                            </h2>
                            <p className="text-muted-foreground">Download it or share it with your network.</p>
                        </div>

                        <div className="w-full overflow-x-auto mb-6 flex justify-center custom-scrollbar">
                            <div ref={certificateRef}
                                style={{
                                    width: '800px',
                                    height: '600px',
                                    backgroundColor: '#000000',
                                    position: 'relative',
                                    flexShrink: 0,
                                    padding: '40px',
                                    borderRadius: '20px',
                                    border: '10px double #a3e635',
                                    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                                    color: 'white',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', zIndex: 0, borderRadius: '10px' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 80%)', opacity: 0.6, zIndex: 0, borderRadius: '10px' }} />
                                <div style={{ position: 'absolute', top: 20, left: 20, width: 60, height: 60, borderTop: '2px solid #a3e635', borderLeft: '2px solid #a3e635', zIndex: 1 }} />
                                <div style={{ position: 'absolute', top: 20, right: 20, width: 60, height: 60, borderTop: '2px solid #a3e635', borderRight: '2px solid #a3e635', zIndex: 1 }} />
                                <div style={{ position: 'absolute', bottom: 20, left: 20, width: 60, height: 60, borderBottom: '2px solid #a3e635', borderLeft: '2px solid #a3e635', zIndex: 1 }} />
                                <div style={{ position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderBottom: '2px solid #a3e635', borderRight: '2px solid #a3e635', zIndex: 1 }} />

                                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                                    <img src="/assets/TS.png" alt="TeenSkool Logo" style={{ width: '70px', height: '70px', objectFit: 'contain', marginBottom: '10px' }} crossOrigin="anonymous" />
                                    <h1 style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0', color: '#ffffff', textShadow: '0 0 15px rgba(163, 230, 53, 0.4)' }}>TEENSKOOL</h1>
                                    <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#a3e635', margin: 0 }}>AI Founder Launchpad</p>
                                </div>

                                <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ color: '#9ca3af', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px', fontWeight: 600 }}>This certifies that</p>
                                    <h2 style={{ fontSize: '56px', fontFamily: 'serif', color: '#ffffff', margin: '0 0 30px 0', padding: '10px 40px', borderBottom: '1px solid #333', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                                        {profile?.full_name || "Future Founder"}
                                    </h2>
                                    <p style={{ color: '#d1d5db', fontSize: '18px', fontWeight: 300, lineHeight: 1.6, maxWidth: '600px' }}>
                                        Has successfully completed the <b style={{ color: '#a3e635', fontWeight: 'bold' }}>AI Startup Curriculum</b>,<br />mastering Idea Validation, Branding, MVP Building, and Pitching.
                                    </p>
                                </div>

                                <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 40px', marginBottom: '10px' }}>
                                    <div style={{ textAlign: 'center', width: '200px' }}>
                                        <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', fontFamily: 'cursive', marginBottom: '8px', transform: 'rotate(-5deg)' }}>Teenskool HQ</div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#4b5563', marginBottom: '8px' }} />
                                        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold', color: '#a3e635', margin: 0 }}>Authorized Signature</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #a3e635', backgroundColor: 'rgba(163, 230, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(163, 230, 53, 0.2)' }}>
                                            <Zap style={{ width: '20px', height: '20px', color: '#a3e635' }} />
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center', width: '200px' }}>
                                        <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', fontFamily: 'cursive', marginBottom: '8px', transform: 'rotate(-5deg)' }}>Director</div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#4b5563', marginBottom: '8px' }} />
                                        <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold', color: '#a3e635', margin: 0 }}>Program Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleDownloadCertificate}
                                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 flex items-center justify-center gap-2"
                            >
                                <Target className="w-4 h-4" /> Download Image
                            </button>
                            <Link
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://teenskool.com")}`}
                                target="_blank"
                                className="px-6 py-3 bg-[#0077b5] text-white font-bold rounded-xl hover:bg-[#0077b5]/90 flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-4 h-4" /> Share on LinkedIn
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
