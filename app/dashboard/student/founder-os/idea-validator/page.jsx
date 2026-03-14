"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { validateIdea } from "@/components/ai-cofounder/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function IdeaValidatorPage() {
    const [idea, setIdea] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!idea.trim()) return;
        setLoading(true);
        setResult("");
        try {
            const response = await validateIdea(idea.trim());
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
                    <h1 className="text-3xl font-black text-white tracking-tight">Idea Validator</h1>
                    <p className="text-sm text-muted-foreground">Get an honest validation report for your startup idea</p>
                </div>
            </div>

            {/* Input Section */}
            <div className="p-6 rounded-3xl bg-surface border border-white/5 space-y-4">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Describe your startup idea in detail
                </label>
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., An AI-powered app that helps students find and organize scholarships based on their profile, GPA, and interests..."
                    className="w-full h-36 p-4 rounded-2xl bg-background border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm font-medium"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !idea.trim()}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-white/5 disabled:text-muted-foreground text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-500/20 disabled:shadow-none"
                >
                    {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Validating...</>
                    ) : (
                        <><Sparkles className="w-4 h-4" /> Validate My Idea</>
                    )}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-black text-white mt-12 mb-6 flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-2xl border border-green-500/20" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white/90 mt-8 mb-4 flex items-center gap-2" {...props} />,
                            ul: ({ node, ...props }) => <ul className="grid gap-3 my-4" {...props} />,
                            li: ({ node, ...props }) => (
                                <li className="bg-surface border border-white/5 p-4 rounded-2xl flex items-start gap-3 shadow-lg hover:border-white/10 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
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
