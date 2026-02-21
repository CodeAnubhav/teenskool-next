"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getBlogById, updateBlog } from "@/lib/blog";
import { useSupabase } from "@/contexts/SupabaseContext";

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const { user } = useSupabase();

    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        cover_image: "",
        content: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        is_published: false
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                if (!params.id) return;
                const data = await getBlogById(params.id);
                if (data) {
                    setFormData({
                        title: data.title || "",
                        slug: data.slug || "",
                        excerpt: data.excerpt || "",
                        cover_image: data.cover_image || "",
                        content: data.content || "",
                        seo_title: data.seo_title || "",
                        seo_description: data.seo_description || "",
                        seo_keywords: data.seo_keywords || "",
                        is_published: data.is_published || false
                    });
                }
            } catch (err) {
                console.error(err);
                alert("Failed to load blog.");
            } finally {
                setLoadingData(false);
            }
        }
        fetchBlog();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await updateBlog(params.id, {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                cover_image: formData.cover_image,
                content: formData.content,
                seo_title: formData.seo_title,
                seo_description: formData.seo_description,
                seo_keywords: formData.seo_keywords,
                is_published: formData.is_published
            });

            router.push("/dashboard/admin?tab=blogs");
            router.refresh();
        } catch (error) {
            console.error("Update Error:", error);
            alert("Failed to update blog: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loadingData) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Link href="/dashboard/admin?tab=blogs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
            </Link>

            <div className="bg-surface border border-border rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Post Title *</label>
                            <Input name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL Slug *</label>
                            <Input name="slug" value={formData.slug} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            className="w-full min-h-[80px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <Input name="cover_image" value={formData.cover_image} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            <span>Content (Markdown format) *</span>
                            <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">Markdown Guide</a>
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full min-h-[400px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono"
                            required
                        />
                    </div>

                    {/* SEO Section */}
                    <div className="p-6 bg-white/5 border border-border rounded-xl space-y-4">
                        <h3 className="font-bold text-lg mb-2">Programmatic SEO Metadata</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">SEO Title</label>
                                <Input name="seo_title" value={formData.seo_title} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">SEO Keywords</label>
                                <Input name="seo_keywords" value={formData.seo_keywords} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">SEO Description</label>
                            <textarea
                                name="seo_description"
                                value={formData.seo_description}
                                onChange={handleChange}
                                className="w-full min-h-[60px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-input bg-background text-primary focus:ring-primary"
                            />
                            <span className="font-medium">Published</span>
                        </label>

                        <Button type="submit" disabled={saving} className="px-8">
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Update Blog Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
