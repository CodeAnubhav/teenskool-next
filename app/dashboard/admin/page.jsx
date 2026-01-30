"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Users,
    BookOpen,
    TrendingUp,
    MoreVertical,
    Plus,
    Search,
    Loader2,
    Shield,
    ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCourses, getAllProfiles, updateUserRole } from "@/lib/db";
import AdminCourseCard from "@/components/dashboard/AdminCourseCard";
// import { toast } from "sonner"; 

export default function AdminDashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();  // Optional, if we want to update URL on button click
    const initialTab = searchParams.get("tab") || "overview";

    // Initial state from URL, but we also sync on change
    const [activeTab, setActiveTab] = useState(initialTab);

    // Sync state if URL changes (e.g. Sidebar click)
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // When clicking buttons internal to the page, we should also update URL for consistency
    const updateTab = (tab) => {
        setActiveTab(tab);
        router.push(`/dashboard/admin?tab=${tab}`);
    };

    // Data State
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Load Data
    const loadData = async (query = "") => {
        try {
            // Only show loader if it's the first load, otherwise we just update silently (or small loader)
            // But for search results, a small loader is better.
            const [usersData, coursesData] = await Promise.all([
                getAllProfiles(query), // Pass search query
                getAllCourses(false)
            ]);
            setUsers(usersData || []);
            setCourses(coursesData || []);
        } catch (err) {
            console.error("Admin Load Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        loadData();
    }, []);

    // Debounced Search Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (activeTab === "users") {
                loadData(searchQuery);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchQuery, activeTab]);

    // Action: Change Role
    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'student' : 'admin';
        if (!confirm(`Are you sure you want to change this user to ${newRole.toUpperCase()}?`)) return;

        try {
            await updateUserRole(userId, newRole);
            alert(`User updated to ${newRole}`);
            loadData(searchQuery); // Refresh list with current search
        } catch (err) {
            alert("Failed to update role: " + err.message);
        }
    };

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage users, content, and platform settings.</p>
                </div>
                {/* 
                   Tabs are now controlled via Sidebar. 
                   Redundant buttons removed as per request.
                */}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
                <div className="grid gap-6 md:grid-cols-3">
                    <StatsCard title="Total Users" value={users.length} icon={Users} trend="Real-time" />
                    <StatsCard title="Total Courses" value={courses.length} icon={BookOpen} trend="Live Content" />
                    <StatsCard title="Revenue (Est)" value="$0" icon={TrendingUp} trend="Beta" />
                </div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold">All Users</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                className="pl-10 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-white/5 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3 text-left">User</th>
                                    <th className="px-6 py-3 text-left">Role</th>
                                    <th className="px-6 py-3 text-left">Joined</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0">
                                                {user.full_name?.[0]?.toUpperCase() || user.email.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.full_name || "Unknown"}</div>
                                                <div className="text-muted-foreground text-xs">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.system_role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`}>
                                                {user.system_role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRoleChange(user.id, user.system_role)}
                                                title="Toggle Admin Role"
                                            >
                                                {user.system_role === 'student' ? (
                                                    <Shield className="w-4 h-4 text-muted-foreground hover:text-primary" />
                                                ) : (
                                                    <ShieldAlert className="w-4 h-4 text-purple-500" />
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* COURSES TAB */}
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

                        {/* Real Courses List */}
                        {courses.map((course) => (
                            <AdminCourseCard
                                key={course.id}
                                course={course}
                                onRefresh={() => loadData(searchQuery)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend }) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground font-medium">{title}</h3>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
            </div>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold">{value}</span>
                <span className="text-sm text-green-400 mb-1">{trend}</span>
            </div>
        </div>
    );
}
