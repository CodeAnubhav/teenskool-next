import React, { useState } from "react";
import Link from "next/link";
import { Copy, Edit2, CheckCircle, Globe, Lock, Trash2, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBlog } from "@/lib/blog";

export default function AdminBlogCard({ blog, onRefresh }) {
    const [deleting, setDeleting] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleting(true);
            await deleteBlog(blog.id);
            onRefresh();
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Failed to delete blog: " + err.message);
            setDeleting(false); // only reset on err, if success it unmounts
        }
    };

    const copyUrl = () => {
        // Construct public URL
        const url = `${window.location.origin}/blog/${blog.slug}`;
        navigator.clipboard.writeText(url);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    return (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col group h-full">
            {/* Image Container */}
            <div className="relative aspect-video bg-muted/20 border-b border-border overflow-hidden">
                {blog.cover_image ? (
                    <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Tag className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {blog.is_published ? (
                        <div className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-sm">
                            <Globe className="w-3 h-3" /> Published
                        </div>
                    ) : (
                        <div className="bg-background/90 text-muted-foreground border border-border text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-sm">
                            <Lock className="w-3 h-3" /> Draft
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
                    {blog.title}
                </h3>
                {blog.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {blog.excerpt}
                    </p>
                )}

                <div className="mt-auto space-y-4">
                    <div className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded w-fit max-w-full truncate" title={blog.slug}>
                        /{blog.slug}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                        <Link href={`/dashboard/admin/blogs/${blog.id}`} className="flex-1">
                            <Button variant="outline" className="w-full gap-2">
                                <Edit2 className="w-4 h-4" /> Edit
                            </Button>
                        </Link>

                        <Button
                            variant="icon"
                            size="icon"
                            onClick={copyUrl}
                            className="bg-white/5 hover:bg-white/10 text-muted-foreground"
                            title="Copy Public Link"
                            disabled={!blog.is_published}
                        >
                            {copiedUrl ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </Button>

                        <Button
                            variant="icon"
                            size="icon"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            title="Delete Blog"
                        >
                            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
