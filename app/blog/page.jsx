import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getAllBlogs } from "@/lib/blog";

export const metadata = {
    title: "Blog | TeenSkool",
    description: "Read the latest insights on Entrepreneurship, AI, and youth empowerment from TeenSkool.",
    keywords: ["TeenSkool", "Blog", "Entrepreneurship", "AI", "Youth"],
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
    const blogs = await getAllBlogs(true);

    return (
        <div className="min-h-screen bg-background text-foreground pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto selection:bg-primary/20">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    LATEST INSIGHTS
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                    The TeenSkool Blog
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Tutorials, deeply researched articles, and inspiring stories on <strong className="text-primary font-semibold">AI</strong> and <strong className="text-green-400 font-semibold">Entrepreneurship</strong> for the next generation of builders.
                </p>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center text-muted-foreground py-20 border border-dashed border-border rounded-3xl bg-surface">
                    <p>No posts published yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className="group relative bg-surface border border-border rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(163,230,53,0.15)] transition-all flex flex-col items-start block animate-in fade-in slide-in-from-bottom-8 duration-700"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="aspect-[16/10] w-full bg-muted/20 overflow-hidden relative">
                                {blog.cover_image ? (
                                    <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-surface to-background flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-700">
                                        <h3 className="font-bold text-2xl text-foreground/80 line-clamp-3 leading-tight font-serif italic">{blog.title}</h3>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-1 flex flex-col pb-6 w-full">
                                <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                    {blog.author?.full_name && <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {blog.author.full_name.split(" ")[0]}</span>}
                                </div>
                                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {blog.title}
                                </h2>
                                {blog.excerpt && (
                                    <p className="text-muted-foreground/80 text-sm line-clamp-3 mb-8 flex-1 leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                )}
                                <div className="flex items-center text-primary font-bold text-sm mt-auto group-hover:translate-x-1 transition-transform tracking-wide">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
