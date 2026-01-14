"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MOCK_COURSES = [
    {
        id: 1,
        title: "Startup 101: From Idea to MVP",
        progress: 35,
        total_lessons: 12,
        completed_lessons: 4,
        image: "bg-gradient-to-br from-green-400 to-emerald-600",
        status: "in_progress"
    },
    {
        id: 2,
        title: "AI Tools for Non-Tech Founders",
        progress: 0,
        total_lessons: 8,
        completed_lessons: 0,
        image: "bg-gradient-to-br from-purple-400 to-indigo-600",
        status: "not_started"
    },
    {
        id: 3,
        title: "Pitching to Investors",
        progress: 0,
        total_lessons: 5,
        completed_lessons: 0,
        image: "bg-zinc-800",
        status: "locked",
        locked_reason: "Unlock at Level 2 (Founder)"
    }
];

export default function MyJourneyPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Journey</h1>
                <p className="text-muted-foreground">Track your progress and unlock new skills.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_COURSES.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`
              group w-full bg-surface border rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl
              ${course.status === "locked" ? "border-border/50 opacity-70" : "border-border hover:border-primary/50"}
            `}
                    >
                        {/* Course Thumbnail / Gradient */}
                        <div className={`h-40 w-full ${course.image} relative`}>
                            {course.status === "locked" && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-black/50 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-white/50 text-sm">
                                        <Lock className="w-4 h-4" /> {course.locked_reason}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-2 min-h-[50px]">{course.title}</h3>
                                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono uppercase tracking-widest">
                                    <span>{course.completed_lessons}/{course.total_lessons} Lessons</span>
                                    <span>{course.progress}%</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                            </div>

                            <Link href={`/dashboard/student/courses/${course.id}`} className={course.status === "locked" ? "pointer-events-none" : ""}>
                                <Button
                                    className={`w-full rounded-xl font-semibold 
                     ${course.status === "locked" ? "bg-secondary text-muted-foreground cursor-not-allowed" : ""}
                   `}
                                    disabled={course.status === "locked"}
                                    variant={course.status === "in_progress" ? "default" : "secondary"}
                                >
                                    {course.status === "in_progress" ? (
                                        <>Continue Learning <Play className="w-4 h-4 ml-2" /></>
                                    ) : course.status === "locked" ? (
                                        "Locked"
                                    ) : (
                                        "Start Course"
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
