"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createCourse } from "@/lib/db";
import { useSupabase } from "@/contexts/SupabaseContext";

export default function CreateCoursePage() {
    const router = useRouter();
    const { user } = useSupabase();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail_url: "",
        difficulty: "beginner"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user) {
                alert("You must be logged in to create a course.");
                return;
            }

            // Call Supabase
            await createCourse({
                title: formData.title,
                description: formData.description,
                thumbnail_url: formData.thumbnail_url,
                difficulty_level: formData.difficulty,
                created_by: user.id, // Current Admin ID
                is_published: true,  // Auto-publish
                total_xp: 100
            });

            alert("Course created successfully!");
            router.push("/dashboard/admin");
            router.refresh();

        } catch (error) {
            console.error("Creation Error:", error);
            alert("Failed to create course: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Link href="/dashboard/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <div className="bg-surface border border-border rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Course Title</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Advanced AI Marketing"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="What will students learn?"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Thumbnail URL (Optional)</label>
                        <Input
                            name="thumbnail_url"
                            value={formData.thumbnail_url}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Difficulty</label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full h-10 rounded-xl border border-input bg-background px-3"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Create Course
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
