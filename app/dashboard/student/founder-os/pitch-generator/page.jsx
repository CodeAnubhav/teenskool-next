"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Presentation, Loader2, Sparkles, Download } from "lucide-react";
import { generatePitch } from "@/components/ai-cofounder/actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as htmlToImage from "html-to-image";

export default function PitchGeneratorPage() {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [targetMarket, setTargetMarket] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const pitchRef = useRef(null);

    const handleGenerate = async () => {
        const combined = `Product Name: ${productName}\nDescription: ${description}\nTarget Market: ${targetMarket}`;
        if (!productName.trim() || !description.trim()) return;
        setLoading(true);
        setResult("");
        try {
            const response = await generatePitch(combined);
            setResult(response);
        } catch (err) {
            setResult("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!pitchRef.current) return;

        // Add a small delay to ensure DOM is fully painted
        setTimeout(async () => {
            try {
                const dataUrl = await htmlToImage.toPng(pitchRef.current, {
                    quality: 1.0,
                    pixelRatio: 2,
                    backgroundColor: "#0a0a0a"
                });
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${productName || "Startup"}-Pitch-Deck.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Download failed:", error);
                alert(`Failed to download: ${error.message}`);
            }
        }, 300);
    };

    // Parse the AI result into slides for visual rendering
    const parseSlides = (markdown) => {
        if (!markdown) return [];
        const slideRegex = /### Slide \d+:\s*(.+)/g;
        const parts = markdown.split(slideRegex);
        const slides = [];
        // parts[0] is intro, then alternating title/content
        for (let i = 1; i < parts.length; i += 2) {
            slides.push({
                title: parts[i]?.trim() || `Slide ${Math.floor(i / 2) + 1}`,
                content: parts[i + 1]?.trim() || ""
            });
        }
        return slides;
    };

    const slides = parseSlides(result);
    const slideColors = [
        "from-[#a3e635]/20 to-transparent border-[#a3e635]/20",
        "from-red-500/20 to-transparent border-red-500/20",
        "from-blue-500/20 to-transparent border-blue-500/20",
        "from-orange-500/20 to-transparent border-orange-500/20",
        "from-purple-500/20 to-transparent border-purple-500/20",
        "from-cyan-500/20 to-transparent border-cyan-500/20",
        "from-green-500/20 to-transparent border-green-500/20",
        "from-pink-500/20 to-transparent border-pink-500/20",
        "from-yellow-500/20 to-transparent border-yellow-500/20",
        "from-indigo-500/20 to-transparent border-indigo-500/20",
    ];

    return (
        <div className="w-full min-h-full space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/student/founder-os" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Pitch Deck Generator</h1>
                    <p className="text-sm text-muted-foreground">Generate and download a beautiful investor-ready pitch deck</p>
                </div>
            </div>

            {/* Input Section */}
            <div className="p-6 rounded-3xl bg-surface border border-white/5 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider">Product / Company Name</label>
                        <input
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g., ScholarAI"
                            className="w-full p-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 text-sm font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider">Target Market</label>
                        <input
                            value={targetMarket}
                            onChange={(e) => setTargetMarket(e.target.value)}
                            placeholder="e.g., High school students in India"
                            className="w-full p-3 rounded-xl bg-background border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 text-sm font-medium"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Presentation className="w-4 h-4 text-pink-400" />
                        Describe your product / startup
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g., An AI-powered platform that matches students with scholarships they qualify for, auto-fills applications, and tracks deadlines..."
                        className="w-full h-32 p-4 rounded-2xl bg-background border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none text-sm font-medium"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={loading || !productName.trim() || !description.trim()}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-white/5 disabled:text-muted-foreground text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-pink-500/20 disabled:shadow-none"
                >
                    {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Generating Deck...</>
                    ) : (
                        <><Sparkles className="w-4 h-4" /> Generate Pitch Deck</>
                    )}
                </button>
            </div>

            {/* Visual Pitch Deck Result */}
            {slides.length > 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Download Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 rounded-xl bg-[#a3e635] text-black font-bold text-sm flex items-center gap-2 hover:bg-[#b2f34c] active:scale-[0.98] transition-all shadow-lg shadow-[#a3e635]/20"
                        >
                            <Download className="w-4 h-4" /> Download Pitch Deck
                        </button>
                    </div>

                    {/* Slides Grid */}
                    <div ref={pitchRef} className="grid md:grid-cols-2 gap-4 p-6 rounded-3xl bg-[#0a0a0a]">
                        {/* Deck Header */}
                        <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-[#a3e635]/10 to-transparent border border-[#a3e635]/20 text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a3e635] mb-2">Pitch Deck</p>
                            <h2 className="text-3xl md:text-4xl font-black text-white">{productName}</h2>
                            {targetMarket && <p className="text-sm text-muted-foreground mt-2">Target: {targetMarket}</p>}
                        </div>

                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                className={`p-6 rounded-2xl bg-gradient-to-br ${slideColors[i % slideColors.length]} border`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-white">{i + 1}</span>
                                    <h3 className="text-base font-bold text-white">{slide.title}</h3>
                                </div>
                                <div className="prose prose-invert prose-xs max-w-none
                                    prose-p:text-muted-foreground prose-p:text-sm prose-p:leading-relaxed prose-p:my-1
                                    prose-li:text-muted-foreground prose-li:text-sm
                                    prose-strong:text-white
                                    prose-ul:space-y-0.5 prose-ul:my-1">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.content}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fallback raw result if parsing didn't produce slides */}
            {result && slides.length === 0 && (
                <div className="p-6 md:p-8 rounded-3xl bg-surface border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-white
                        prose-h3:text-lg prose-h3:text-white/90
                        prose-p:text-muted-foreground prose-p:leading-relaxed
                        prose-li:text-muted-foreground
                        prose-strong:text-white
                        prose-ul:space-y-1">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 rounded-xl bg-[#a3e635] text-black font-bold text-sm flex items-center gap-2 hover:bg-[#b2f34c] active:scale-[0.98] transition-all"
                        >
                            <Download className="w-4 h-4" /> Download as Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
