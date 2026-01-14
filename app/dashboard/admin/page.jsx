"use client";

import React, { useState } from "react";
import {
    Users,
    BookOpen,
    BarChart,
    Search,
    MoreHorizontal,
    Plus,
    Edit,
    Trash2,
    ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// MOCK ADMIN DATA
const MOCK_USERS = [
    { id: 1, name: "Raj Singh", email: "raj@teenskool.com", role: "admin", game_role: "Unicorn", xp: 12500 },
    { id: 2, name: "Sarah Miller", email: "sarah@student.com", role: "student", game_role: "Founder", xp: 4200 },
    { id: 3, name: "Mike Chen", email: "mike@student.com", role: "student", game_role: "Novice", xp: 450 },
    { id: 4, name: "Emma Wilson", email: "emma@student.com", role: "student", game_role: "Visionary", xp: 8900 },
];

const MOCK_COURSES_ADMIN = [
    { id: 1, title: "Startup 101", students: 124, status: "Published", revenue: "$0" },
    { id: 2, title: "AI Tools", students: 85, status: "Published", revenue: "$0" },
    { id: 3, title: "Pitch Perfect", students: 0, status: "Draft", revenue: "$0" },
];

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState("users");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <ShieldAlert className="w-8 h-8 text-red-500" /> Admin Command Center
                    </h1>
                    <p className="text-muted-foreground">Manage your empire: Users, Content, and Analytics.</p>
                </div>
                <div className="flex bg-surface border border-border p-1 rounded-xl">
                    <TabButton active={activeTab === "users"} onClick={() => setActiveTab("users")} icon={<Users className="w-4 h-4" />} label="Users" />
                    <TabButton active={activeTab === "courses"} onClick={() => setActiveTab("courses")} icon={<BookOpen className="w-4 h-4" />} label="Courses" />
                    <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<BarChart className="w-4 h-4" />} label="Analytics" />
                </div>
            </div>

            {/* SEARCH BAR (Common) */}
            <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                    className="border-none bg-transparent focus-visible:ring-0 shadow-none text-lg"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* --- USERS TAB --- */}
                {activeTab === "users" && (
                    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-background/50 text-xs uppercase text-muted-foreground font-semibold">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">System Role</th>
                                    <th className="p-4">Game Context</th>
                                    <th className="p-4">XP</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_USERS.map((user) => (
                                    <tr key={user.id} className="border-t border-border/50 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                 ${user.role === 'admin' ? 'bg-red-500/10 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-secondary text-foreground'}
                              `}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-primary font-mono text-sm">{user.game_role}</span>
                                        </td>
                                        <td className="p-4 font-mono text-muted-foreground">{user.xp.toLocaleString()}</td>
                                        <td className="p-4 text-right">
                                            <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- COURSES TAB --- */}
                {activeTab === "courses" && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Create New Card */}
                            <Link href="/dashboard/admin/courses/new" className="block h-full">
                                <div className="border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 cursor-pointer transition-colors group h-full min-h-[200px]">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-lg">Create New Course</h3>
                                    <p className="text-sm text-muted-foreground">Design a new learning path</p>
                                </div>
                            </Link>

                            {MOCK_COURSES_ADMIN.map((course) => (
                                <div key={course.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-between h-full min-h-[200px]">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`px-2 py-1 rounded text-xs font-bold 
                                 ${course.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
                              `}>
                                                {course.status}
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                                        </div>
                                        <h3 className="font-bold text-xl mb-1">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground">{course.students} Students Enrolled</p>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        <Button className="flex-1 bg-secondary text-primary-foreground hover:bg-secondary/80 text-xs">
                                            <Edit className="w-3 h-3 mr-2" /> Edit Content
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ANALYTICS TAB --- */}
                {activeTab === "analytics" && (
                    <div className="bg-surface border border-border rounded-2xl p-8 text-center py-20">
                        <BarChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Analytics Engine</h3>
                        <p className="text-muted-foreground">Connect Supabase to view real revenue and engagement stats.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${active ? "bg-primary text-black shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}
         `}
        >
            {icon} {label}
        </button>
    );
}
