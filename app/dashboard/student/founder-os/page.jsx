"use client";

import React, { useState } from "react";
import {
    Rocket,
    Target,
    Zap,
    DollarSign,
    Presentation,
    Trophy,
    Flame,
    Star,
    BrainCircuit,
    Palette,
    ArrowRight,
    Focus,
    Bot,
    Loader2,
    CheckCircle,
    Copy,
    Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getProfile } from "@/lib/db";
import { getLevelProgress, GAME_ROLES } from "@/lib/gamification";
import { useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { MODULE_CONTENT } from "@/data/founder-os-content";
import html2canvas from "html2canvas";

// Modules Data
// Modules Data
const MODULES = [
    {
        id: "idea-research",
        title: "Idea Research & Validation",
        desc: "Find a problem worth solving and validate it with real data.",
        icon: BrainCircuit,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        action: "Start Research"
    },
    {
        id: "branding-marketing",
        title: "Branding & Marketing",
        desc: "Build your visual identity and plan your go-to-market strategy.",
        icon: Palette,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        badge: "Crucial Step",
        action: "Build Brand"
    },
    {
        id: "mvp-building",
        title: "MVP Building",
        desc: "Launch your Minimum Viable Product using no-code AI tools.",
        icon: Rocket,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        isFeatured: true,
        action: "Build MVP"
    },
    {
        id: "pitch-deck",
        title: "Final Pitch Deck",
        desc: "Create a compelling story to pitch your startup to investors.",
        icon: Presentation,
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20",
        action: "Create Deck"
    }
];

export default function FounderOSPage() {
    const { user } = useSupabase();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [activeModule, setActiveModule] = useState(null);
    const [completedModules, setCompletedModules] = useState([]);
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef(null);

    // Initial Load of Completed Modules (Mock for now, could be Supabase later)
    useEffect(() => {
        const saved = localStorage.getItem("founder_os_progress");
        if (saved) {
            setCompletedModules(JSON.parse(saved));
        }
    }, []);

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



    // Save Progress
    const handleCompleteModule = (moduleId) => {
        if (!completedModules.includes(moduleId)) {
            const newCompleted = [...completedModules, moduleId];
            setCompletedModules(newCompleted);
            localStorage.setItem("founder_os_progress", JSON.stringify(newCompleted));

            // Allow animation time then close
            setTimeout(() => setActiveModule(null), 500);
        }
    };

    const handleCopyPrompt = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    const handleDownloadCertificate = () => {
        if (!certificateRef.current) return;

        // Use a timeout to ensure rendering is stable if inside a modal
        setTimeout(async () => {
            try {
                const canvas = await html2canvas(certificateRef.current, {
                    useCORS: true,
                    scale: 2, // Higher resolution
                    backgroundColor: "#000000", // Force black background
                    logging: true,
                    allowTaint: true,
                });
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "TeenSkool-Founder-Certificate.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Certificate download failed:", error);
                alert("Failed to download certificate. Please try again or take a screenshot.");
            }
        }, 100);
    };

    // Calculate Progress
    const totalModules = MODULES.length;
    const progressCount = completedModules.length;
    const progressPercentage = Math.round((progressCount / totalModules) * 100);
    const isProgramComplete = progressCount === totalModules;
    // const isProgramComplete = true; // Debug mode

    // Certificate View
    if (showCertificate) {
        // ... (Logic handled in modal below)
    }

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
                            <Zap className="w-3 h-3" /> Founder OS v1.0
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                            Build Your <br className="hidden sm:block" />
                            Minimum Viable Product
                            <span className="block mt-2 md:mt-4 text-5xl md:text-6xl lg:text-8xl drop-shadow-2xl filter" style={{ color: '#a3e635' }}>
                                In 1 Day ⚡
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                            Stop learning, start building. This is your command center to turn your idea into reality.
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

                    {/* Progress Bar or Certificate Banner */}
                    <div className="max-w-2xl pt-6">
                        {isProgramComplete ? (
                            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-between animate-in zoom-in spin-in-1">
                                <div className="flex items-center gap-3">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                    <div>
                                        <h3 className="font-bold text-yellow-500">Program Completed!</h3>
                                        <p className="text-xs text-muted-foreground">You are a certified AI Founder.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowCertificate(true)}
                                    className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg text-xs hover:bg-yellow-400 transition"
                                >
                                    View Certificate
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                                    <span>Startup Progress</span>
                                    <span>{progressPercentage}% Built</span>
                                </div>
                                <div className="h-3 w-full bg-surface rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-primary transition-all duration-1000 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                            </>
                        )}

                        {/* Certificate Modal Overlay */}
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
                                            Here is your Official Certificate!
                                        </h2>
                                        <p className="text-muted-foreground">Download it or share it with your network.</p>
                                    </div>

                                    {/* The Certificate To Print */}
                                    {/* The Certificate To Print - Optimized for html2canvas */}
                                    {/* STRICTLY NO TAILWIND CLASSES INSIDE THAT USE COLORS/GRADIENTS. INLINE STYLES ONLY. */}
                                    {/* The Certificate To Print - FIXED PIXEL SIZE FOR PERFECT EXPORT */}
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

                                            {/* Background - Solid color to prevent issues */}
                                            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', zIndex: 0, borderRadius: '10px' }} />
                                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 80%)', opacity: 0.6, zIndex: 0, borderRadius: '10px' }} />

                                            {/* Corner Accents */}
                                            <div style={{ position: 'absolute', top: 20, left: 20, width: 60, height: 60, borderTop: '2px solid #a3e635', borderLeft: '2px solid #a3e635', zIndex: 1 }} />
                                            <div style={{ position: 'absolute', top: 20, right: 20, width: 60, height: 60, borderTop: '2px solid #a3e635', borderRight: '2px solid #a3e635', zIndex: 1 }} />
                                            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 60, height: 60, borderBottom: '2px solid #a3e635', borderLeft: '2px solid #a3e635', zIndex: 1 }} />
                                            <div style={{ position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderBottom: '2px solid #a3e635', borderRight: '2px solid #a3e635', zIndex: 1 }} />

                                            {/* Header */}
                                            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                                                <img
                                                    src="/assets/TS.png"
                                                    alt="TeenSkool Logo"
                                                    style={{ width: '70px', height: '70px', objectFit: 'contain', marginBottom: '10px' }}
                                                    crossOrigin="anonymous"
                                                />
                                                <h1 style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0', color: '#ffffff', textShadow: '0 0 15px rgba(163, 230, 53, 0.4)' }}>TEENSKOOL</h1>
                                                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#a3e635', margin: 0 }}>AI Founder Launchpad</p>
                                            </div>

                                            {/* Content */}
                                            <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <p style={{ color: '#9ca3af', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px', fontWeight: 600 }}>This certifies that</p>

                                                <h2 style={{ fontSize: '56px', fontFamily: 'serif', color: '#ffffff', margin: '0 0 30px 0', padding: '10px 40px', borderBottom: '1px solid #333', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                                                    {profile?.full_name || "Future Founder"}
                                                </h2>

                                                <p style={{ color: '#d1d5db', fontSize: '18px', fontWeight: 300, lineHeight: 1.6, maxWidth: '600px' }}>
                                                    Has successfully completed the <b style={{ color: '#a3e635', fontWeight: 'bold' }}>AI Startup Curriculum</b>,<br />mastering Idea Validation, Branding, MVP Building, and Pitching.
                                                </p>
                                            </div>

                                            {/* Footer */}
                                            <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 40px', marginBottom: '10px' }}>
                                                <div style={{ textAlign: 'center', width: '200px' }}>
                                                    {/* Signature Image or Text */}
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
                </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODULES.map((module) => (
                    <div
                        key={module.id}
                        className={cn(
                            "group relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between h-full overflow-hidden",
                            module.isFeatured
                                ? "bg-gradient-to-b from-surface to-background border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1"
                                : "bg-surface/50 border-white/5 hover:border-white/10"
                        )}
                    >
                        {module.isFeatured && (
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border",
                                    module.bg,
                                    module.color,
                                    module.border
                                )}>
                                    <module.icon className="w-6 h-6" />
                                </div>
                                {module.badge && (
                                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                                        {module.badge}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {module.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                {module.desc}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 mt-auto relative z-10">
                            <button
                                onClick={() => setActiveModule(module.id)}
                                className={cn(
                                    "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                    completedModules.includes(module.id)
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : (module.isFeatured
                                            ? "bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/5")
                                )}>
                                {completedModules.includes(module.id) ? "Completed" : module.action}
                                {!completedModules.includes(module.id) && <ArrowRight className="w-4 h-4" />}
                                {completedModules.includes(module.id) && <CheckCircle className="w-4 h-4" />}
                            </button>


                        </div>
                    </div>
                ))}
            </div>



            {/* Module Detail Modal */}
            <Dialog open={!!activeModule} onOpenChange={() => setActiveModule(null)}>
                <DialogContent className="max-w-2xl bg-[#0a0a0a] border border-white/10 text-white max-h-[85vh] overflow-y-auto">
                    {activeModule && MODULE_CONTENT[activeModule] && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    {MODULE_CONTENT[activeModule].title}
                                </DialogTitle>
                                <DialogDescription className="text-base text-muted-foreground pt-2">
                                    {MODULE_CONTENT[activeModule].tips}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                    <Bot className="w-4 h-4" /> Smart Prompts & Guides
                                </h4>

                                {MODULE_CONTENT[activeModule].prompts.map((prompt, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-semibold text-white text-sm">{prompt.label}</h5>
                                            <button
                                                onClick={() => handleCopyPrompt(prompt.text)}
                                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                                            >
                                                <Copy className="w-3 h-3" /> Copy
                                            </button>
                                        </div>
                                        <div className="p-3 bg-black/50 rounded-lg text-xs md:text-sm text-gray-400 font-mono font-medium leading-relaxed">
                                            {prompt.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <button
                                    onClick={() => setActiveModule(null)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleCompleteModule(activeModule)}
                                    className={cn(
                                        "px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all",
                                        completedModules.includes(activeModule)
                                            ? "bg-green-500/20 text-green-400 cursor-default"
                                            : "bg-primary text-black hover:bg-primary/90"
                                    )}
                                    disabled={completedModules.includes(activeModule)}
                                >
                                    {completedModules.includes(activeModule) ? (
                                        <> <CheckCircle className="w-4 h-4" /> Completed </>
                                    ) : (
                                        <> Mark as Complete <ArrowRight className="w-4 h-4" /> </>
                                    )}
                                </button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
