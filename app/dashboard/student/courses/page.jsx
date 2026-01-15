"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCourses } from "@/lib/db";

export default function MyJourneyPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCourses() {
            try {
                const data = await getAllCourses();
                setCourses(data || []);
            } catch (err) {
                console.error("Failed to load courses", err);
            } finally {
                setLoading(false);
            }
        }
        loadCourses();
    }, []);

    if (loading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Journey</h1>
                <p className="text-muted-foreground">Track your progress and unlock new skills.</p>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl">
                    <p className="text-muted-foreground">No courses available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group w-full bg-surface border border-border rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:border-primary/50"
                        >
                            {/* Course Thumbnail / Gradient */}
                            <div className="h-40 w-full relative bg-secondary">
                                {course.thumbnail_url ? (
                                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                                )}
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg leading-tight mb-2 min-h-[50px]">{course.title}</h3>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono uppercase tracking-widest">
                                        <span>{course.difficulty_level}</span>
                                        <span>{course.total_xp} XP</span>
                                    </div>
                                </div>

                                {/* Placeholder Progress Logic (We will fetch real progress later) */}
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `0%` }} />
                                </div>

                                <Link href={`/dashboard/student/courses/${course.id}`}>
                                    <Button className="w-full rounded-xl font-semibold">
                                        Start Course <Play className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
