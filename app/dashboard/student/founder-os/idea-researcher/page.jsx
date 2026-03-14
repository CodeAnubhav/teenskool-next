"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Loader2, Sparkles } from "lucide-react";
import { researchIdea } from "@/components/ai-cofounder/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function IdeaResearcherPage() {
    const [industry, setIndustry] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!industry.trim()) return;
        setLoading(true);
        setResult("");
        try {
            const response = await researchIdea(industry.trim());
            setResult(response);
        } catch (err) {
            setResult("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-full space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/student/founder-os" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Idea Researcher</h1>
                    <p className="text-sm text-muted-foreground">Discover problems, trends, and opportunities in any industry</p>
                </div>
            </div>

            {/* Input Section */}
            <div className="p-6 rounded-3xl bg-surface border border-white/5 space-y-4">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" />
                    What industry or market do you want to research?
                </label>
                <textarea
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Online education for teens, Pet care technology, Sustainable fashion..."
                    className="w-full h-32 p-4 rounded-2xl bg-background border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm font-medium"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !industry.trim()}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-white/5 disabled:text-muted-foreground text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:shadow-none"
                >
                    {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Researching...</>
                    ) : (
                        <><Sparkles className="w-4 h-4" /> Research This Market</>
                    )}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-black text-white mt-12 mb-6 flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-2xl border border-blue-500/20" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white/90 mt-8 mb-4 flex items-center gap-2" {...props} />,
                            ul: ({ node, ...props }) => <ul className="grid gap-3 my-4" {...props} />,
                            li: ({ node, ...props }) => (
                                <li className="bg-surface border border-white/5 p-4 rounded-2xl flex items-start gap-3 shadow-lg hover:border-white/10 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    <span className="text-muted-foreground text-[15px] leading-relaxed" {...props} />
                                </li>
                            ),
                            p: ({ node, ...props }) => <p className="text-muted-foreground leading-relaxed my-4 text-[15px] px-2" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                        }}
                    >
                        {result}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}
