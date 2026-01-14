"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// In a real app, import from a server action or lib
// import { createCourse } from "@/lib/actions"; 

export default function CreateCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            alert("Course Created (Mock)!");
            setLoading(false);
            router.push("/dashboard/admin");
        }, 1000);
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
                        <Input placeholder="e.g. Advanced AI Marketing" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="What will students learn?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Thumbnail URL</label>
                        <Input placeholder="https://..." />
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
