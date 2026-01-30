"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getCourseById, updateCourse } from "@/lib/db";
import { useSupabase } from "@/contexts/SupabaseContext";

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const { user } = useSupabase();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Safety check for ID
    const courseId = params?.id;

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail_url: "",
        difficulty_level: "beginner", // Note: DB uses difficulty_level
        is_published: false
    });

    // Load Course Data
    useEffect(() => {
        async function loadCourse() {
            try {
                const course = await getCourseById(courseId);
                if (course) {
                    setFormData({
                        title: course.title,
                        description: course.description || "",
                        thumbnail_url: course.thumbnail_url || "",
                        difficulty_level: course.difficulty_level || "beginner",
                        is_published: course.is_published
                    });
                }
            } catch (err) {
                console.error("Failed to load course", err);
                alert("Course not found");
                router.push("/dashboard/admin");
            } finally {
                setLoading(false);
            }
        }
        loadCourse();
    }, [courseId, router]);

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
            await updateCourse(courseId, {
                title: formData.title,
                description: formData.description,
                thumbnail_url: formData.thumbnail_url,
                difficulty_level: formData.difficulty_level,
                is_published: formData.is_published
            });

            alert("Course updated successfully!");
            router.push("/dashboard/admin");
            router.refresh();

        } catch (error) {
            console.error("Update Error:", error);
            alert("Failed to update course: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Link href="/dashboard/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <div className="bg-surface border border-border rounded-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Course</h1>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Published</label>
                        <input
                            type="checkbox"
                            name="is_published"
                            checked={formData.is_published}
                            onChange={handleChange}
                            className="w-5 h-5 accent-primary"
                        />
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Course Title</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Thumbnail URL (Optional)</label>
                        <Input
                            name="thumbnail_url"
                            value={formData.thumbnail_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Difficulty</label>
                        <select
                            name="difficulty_level"
                            value={formData.difficulty_level}
                            onChange={handleChange}
                            className="w-full h-10 rounded-xl border border-input bg-background px-3"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={saving}>
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
