"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, PlayCircle, CheckCircle, Lock, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// MOCK LESSON DATA
const COURSE_CONTENT = {
    id: 1,
    title: "Startup 101: From Idea to MVP",
    lessons: [
        { id: 1, title: "Welcome to the Course", duration: "2:30", type: "video", isCompleted: true },
        { id: 2, title: "Defining the Problem", duration: "5:45", type: "video", isCompleted: true },
        { id: 3, title: "Identifying Your Target Audience", duration: "8:10", type: "video", isCompleted: true },
        { id: 4, title: "The Solution: Building an MVP", duration: "10:20", type: "video", isCompleted: true },
        { id: 5, title: "Validation Methods", duration: "6:15", type: "video", isCompleted: false }, // Current
        { id: 6, title: "Competitor Analysis", duration: "7:00", type: "video", isCompleted: false, isLocked: true },
        { id: 7, title: "Business Model Canvas", duration: "12:00", type: "video", isCompleted: false, isLocked: true },
    ]
};

export default function CoursePlayerPage() {
    const params = useParams(); // { courseId }
    const router = useRouter();
    const [activeLessonIndex, setActiveLessonIndex] = useState(4); // Start at index 4 (Lesson 5)
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const activeLesson = COURSE_CONTENT.lessons[activeLessonIndex];

    const handleNext = () => {
        if (activeLessonIndex < COURSE_CONTENT.lessons.length - 1) {
            setActiveLessonIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (activeLessonIndex > 0) {
            setActiveLessonIndex(prev => prev - 1);
        }
    };

    return (
        <div className="flex h-full bg-background overflow-hidden relative">
            {/* 1. LMS SIDEBAR (Lesson List) */}
            <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform transition-transform duration-300 md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:w-0 md:opacity-0 md:overflow-hidden"}
       `}>
                <div className="h-full flex flex-col p-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard/student/courses" className="p-2 hover:bg-background rounded-lg transition-colors">
                                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                            </Link>
                            <h2 className="font-bold text-sm line-clamp-1 md:hidden">Course Content</h2>
                        </div>
                        {/* Mobile Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="hidden md:block mb-6 pt-1">
                        <h2 className="font-bold text-sm line-clamp-1">{COURSE_CONTENT.title}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-2">
                        {COURSE_CONTENT.lessons.map((lesson, idx) => {
                            const isActive = idx === activeLessonIndex;
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => {
                                        if (!lesson.isLocked) {
                                            setActiveLessonIndex(idx);
                                            // Close sidebar on mobile after selection
                                            if (window.innerWidth < 768) setSidebarOpen(false);
                                        }
                                    }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                           ${isActive ? "bg-primary text-black font-semibold shadow-lg shadow-primary/20" : "hover:bg-white/5"}
                           ${lesson.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                                >
                                    <div className="flex-shrink-0">
                                        {lesson.isCompleted ? (
                                            <CheckCircle className={`w-5 h-5 ${isActive ? "text-black" : "text-green-500"}`} />
                                        ) : lesson.isLocked ? (
                                            <Lock className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <PlayCircle className={`w-5 h-5 ${isActive ? "text-black" : "text-primary"}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm truncate">{lesson.id}. {lesson.title}</p>
                                        <p className={`text-xs ${isActive ? "text-black/70" : "text-muted-foreground"}`}>{lesson.duration}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA (Video & Notes) */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background/50 relative">

                {/* Top Bar (Mobile Toggle + Nav) */}
                <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-background/80 backdrop-blur border-b border-border">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        <span className="font-semibold md:hidden text-sm truncate max-w-[200px]">
                            {activeLesson.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrev}
                            disabled={activeLessonIndex === 0}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={activeLessonIndex === COURSE_CONTENT.lessons.length - 1} // Or logic for locked next
                            className="bg-primary text-black hover:bg-primary/90"
                            size="sm"
                        >
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
                    {/* Video Player Placeholder */}
                    <div className="aspect-video w-full bg-black rounded-3xl border border-border shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer border border-primary/30">
                                <PlayCircle className="w-10 h-10 text-primary ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                                {activeLesson.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content / Notes */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-4">Lesson Notes</h2>
                                <article className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        In this lesson, we explore the fundamental concept of "Validation". Before writing a single line of code,
                                        you must talk to users. We will cover the "Mom Test" and how to design unbiased interviews.
                                    </p>
                                    <ul>
                                        <li>Why 90% of startups fail (building what nobody wants)</li>
                                        <li>How to find your first 10 customers</li>
                                        <li>The difference between "Nice to have" and "Need to have"</li>
                                    </ul>
                                    <p>
                                        <strong>Action Item:</strong> Write down 3 assumptions about your problem and go verify them today.
                                    </p>
                                </article>
                            </div>

                            {/* Resources Card */}
                            <div className="w-72 hidden lg:block bg-surface border border-border rounded-2xl p-6 h-fit shrink-0">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2">📄 Worksheet.pdf</a></li>
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2">🔗 The Mom Test (Summary)</a></li>
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2">📊 Validation Tracker</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
