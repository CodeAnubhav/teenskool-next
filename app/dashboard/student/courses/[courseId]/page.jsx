"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, PlayCircle, CheckCircle, Lock, ChevronRight, ChevronLeft, Menu, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourseById, getEnrollment, markLessonComplete, enrollInCourse } from "@/lib/db";
import { useSupabase } from "@/contexts/SupabaseContext";
import { toast } from "@/components/ui/use-toast";

export default function CoursePlayerPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useSupabase();
    const courseId = params?.courseId;

    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [completedIds, setCompletedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [marking, setMarking] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                if (!courseId || !user) return;

                let [courseData, enrollmentData] = await Promise.all([
                    getCourseById(courseId),
                    getEnrollment(user.id, courseId)
                ]);

                if (courseData) {
                    setCourse(courseData);
                } else {
                    toast({ title: "Error", description: "Course not found", variant: "destructive" });
                    router.push("/dashboard/student/courses");
                    return;
                }

                // Auto-enroll if not explicitly enrolled (e.g. came from direct link)
                if (!enrollmentData) {
                    try {
                        const newEnrollment = await enrollInCourse(user.id, courseId);
                        if (newEnrollment) {
                            enrollmentData = newEnrollment;
                            toast({ title: "Enrolled", description: "You have started this course.", variant: "default" });
                        }
                    } catch (e) {
                        console.error("Auto enrollment failed", e);
                    }
                }

                if (enrollmentData) {
                    setEnrollment(enrollmentData);
                    setCompletedIds((enrollmentData.completed_lesson_ids || []).map(String));
                }
            } catch (error) {
                console.error("Failed to load course", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [courseId, user, router]);

    const lessons = course?.lessons || [];
    const activeLesson = lessons[activeLessonIndex];
    const isLessonCompleted = activeLesson && completedIds.includes(String(activeLesson.id));

    const handleNext = () => {
        if (activeLessonIndex < lessons.length - 1) {
            setActiveLessonIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (activeLessonIndex > 0) {
            setActiveLessonIndex(prev => prev - 1);
        }
    };

    const onMarkComplete = async () => {
        if (!activeLesson || !enrollment) return;
        setMarking(true);
        try {
            await markLessonComplete(enrollment.id, activeLesson.id);
            setCompletedIds(prev => [...prev, String(activeLesson.id)]);
            toast({ title: "Lesson Completed!", description: "Keep up the momentum.", variant: "success" });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to update progress.", variant: "destructive" });
        } finally {
            setMarking(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
    if (!course) return null;

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* 1. LMS SIDEBAR (Lesson List) */}
            <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-border transform transition-transform duration-300 md:relative md:translate-x-0 rounded-r-3xl
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
                        <h2 className="font-bold text-sm line-clamp-1">{course.title}</h2>
                        <div className="w-full bg-secondary h-1 mt-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${(completedIds.length / lessons.length) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {Math.round((completedIds.length / lessons.length) * 100)}% Completed
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-2">
                        {lessons.length === 0 && <p className="text-muted-foreground text-sm p-4">No lessons added yet.</p>}
                        {lessons.map((lesson, idx) => {
                            const isActive = idx === activeLessonIndex;
                            const isCompleted = completedIds.includes(String(lesson.id));

                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => {
                                        setActiveLessonIndex(idx);
                                        // Close sidebar on mobile after selection
                                        if (window.innerWidth < 768) setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                           ${isActive
                                            ? "bg-primary text-black font-semibold shadow-lg shadow-primary/20"
                                            : "hover:bg-white/5"}
                        `}
                                >
                                    <div className="flex-shrink-0">
                                        {isCompleted ? (
                                            <CheckCircle className={`w-5 h-5 ${isActive ? "text-black" : "text-green-500"}`} />
                                        ) : (
                                            <PlayCircle className={`w-5 h-5 ${isActive ? "text-black" : "text-muted-foreground"}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm truncate mr-2">{idx + 1}. {lesson.title}</p>
                                        </div>
                                        <p className={`text-xs ${isActive ? "text-black/70" : "text-muted-foreground"}`}>
                                            {lesson.duration ? `${Math.floor(lesson.duration / 60)} mins` : "Video"}
                                        </p>
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
                            {activeLesson?.title || "Course"}
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
                            disabled={activeLessonIndex === lessons.length - 1}
                            className="bg-secondary text-foreground hover:bg-secondary/80"
                            size="sm"
                        >
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

                <div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
                    {/* Video Player */}
                    {activeLesson ? (
                        <>
                            <div className="aspect-video w-full bg-black rounded-3xl border border-border shadow-2xl relative group overflow-hidden">
                                {activeLesson.video_url && activeLesson.video_url.includes('youtube') ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={activeLesson.video_url}
                                        title={activeLesson.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-6">
                                            <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                                            <p className="text-muted-foreground">Video content placeholder.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{activeLesson.title}</h2>
                                    <p className="text-muted-foreground">Lesson {activeLessonIndex + 1} of {lessons.length}</p>
                                </div>

                                {isLessonCompleted ? (
                                    <Button disabled className="bg-green-500/20 text-green-500 border border-green-500/20 md:w-auto w-full">
                                        <CheckCircle className="w-4 h-4 mr-2" /> Completed
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={onMarkComplete}
                                        disabled={marking}
                                        className="bg-primary text-black font-bold hover:bg-primary/90 md:w-auto w-full transition-all"
                                    >
                                        {marking ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                        Mark as Complete
                                    </Button>
                                )}
                            </div>

                            {/* Content / Notes */}
                            <div className="space-y-6">
                                <article className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>{activeLesson.description || "No description provided for this lesson."}</p>
                                </article>
                            </div>
                        </>
                    ) : (
                        <div className="p-10 text-center border border-dashed border-border rounded-xl">
                            <p className="text-muted-foreground">Select a lesson to start learning.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
