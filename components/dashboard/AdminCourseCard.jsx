"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreVertical, Edit, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function AdminCourseCard({ course, onRefresh }) {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this course? This cannot be undone.")) return;
        try {
            await deleteCourse(course.id);
            onRefresh();
        } catch (err) {
            alert("Failed to delete: " + err.message);
        }
    };

    return (
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between h-full min-h-[200px] group hover:border-primary/50 transition-colors relative">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${course.is_published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                        {course.is_published ? "Published" : "Draft"}
                    </span>

                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <MoreVertical className="w-4 h-4" />
                        </Button>

                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 top-8 z-20 bg-background border border-border resize-none shadow-xl rounded-xl w-40 overflow-hidden flex flex-col py-1 animate-in fade-in zoom-in-95 duration-200">
                                    <Link href={`/dashboard/admin/courses/${course.id}/edit`}>
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-surface flex items-center gap-2">
                                            <Edit className="w-4 h-4" /> Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 text-red-400 flex items-center gap-2"
                                    >
                                        <Trash className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description || "No description provided."}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <span>{course.difficulty_level || 'Beginner'}</span>
                <span>{new Date(course.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}
