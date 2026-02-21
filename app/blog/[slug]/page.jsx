import React from "react";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

// Force dynamic routing to ensure DB is read at request time for SSR SEO
export const dynamic = "force-dynamic";

// 1. Dynamic Metadata generation for Programmatic SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug, true);

    if (!blog) {
        return { title: 'Post Not Found | TeenSkool' };
    }

    return {
        title: blog.seo_title || `${blog.title} | TeenSkool Blog`,
        description: blog.seo_description || blog.excerpt || `Read this article on TeenSkool to learn about AI, entrepreneurship, and personal growth.`,
        keywords: blog.seo_keywords ? blog.seo_keywords.split(',').map(k => k.trim()) : ["TeenSkool", "Blog", "Entrepreneurship", "AI", "Startup"],
        openGraph: {
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt,
            url: `https://teenskool.com/blog/${slug}`,
            siteName: 'TeenSkool',
            images: blog.cover_image ? [{ url: blog.cover_image, width: 1200, height: 630 }] : [],
            locale: 'en_US',
            type: 'article',
            publishedTime: blog.created_at,
            authors: [blog.author?.full_name || "TeenSkool"],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt,
            images: blog.cover_image ? [blog.cover_image] : [],
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug, true);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-24 px-4 md:px-8 selection:bg-primary/30">
            {/* Reading Progress Bar placeholder if client component wrapper, but since we are server side, we can just style beautifully */}
            <article className="max-w-3xl mx-auto">

                <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> All Articles
                    </Link>
                </div>

                <header className="mb-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.15] bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-muted-foreground">
                        {blog.author && (
                            <div className="flex items-center gap-3">
                                {blog.author.avatar_url ? (
                                    <img src={blog.author.avatar_url} alt={blog.author.full_name} className="w-10 h-10 rounded-full border border-border bg-surface object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-xs font-bold text-white/90 shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                        {blog.author.full_name?.[0]}
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-foreground">{blog.author.full_name}</p>
                                    <p className="text-xs">Author</p>
                                </div>
                            </div>
                        )}
                        <div className="h-8 w-px bg-border hidden md:block"></div>
                        <div className="flex items-center gap-2 font-medium">
                            <Calendar className="w-4 h-4 text-primary" />
                            <time dateTime={blog.created_at}>
                                {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </div>
                    </div>
                </header>

                {blog.cover_image && (
                    <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden mb-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-border/50 animate-in fade-in zoom-in-95 duration-1000">
                        <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="font-sans animate-in fade-in duration-1000 delay-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-4xl font-extrabold mt-12 mb-6 tracking-tight text-foreground" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 tracking-tight text-foreground/90" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground/90" {...props} />,
                            p: ({ node, ...props }) => <p className="text-lg text-muted-foreground/90 leading-relaxed mb-6" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 space-y-2 text-lg text-muted-foreground/90 mb-8" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 space-y-2 text-lg text-muted-foreground/90 mb-8" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                            a: ({ node, ...props }) => <a className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary/80 transition-colors" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
                            blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-4 border-green-500 pl-6 py-1 my-8 bg-gradient-to-r from-green-500/10 to-transparent rounded-r-xl" {...props}>
                                    <div className="text-xl italic text-foreground/80 font-serif leading-relaxed" {...props} />
                                </blockquote>
                            ),
                            code: ({ node, inline, ...props }) => inline
                                ? <code className="bg-primary/10 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono text-primary/90 border border-primary/20" {...props} />
                                : (
                                    <div className="relative my-8 group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                                            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                </div>
                                            </div>
                                            <div className="p-5 overflow-x-auto">
                                                <code className="block text-sm font-mono text-gray-300 min-w-max" {...props} />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            img: ({ node, ...props }) => (
                                <figure className="my-12">
                                    <img className="rounded-2xl border border-border w-full shadow-2xl" {...props} />
                                    {props.alt && <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">{props.alt}</figcaption>}
                                </figure>
                            ),
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
