"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    LayoutTemplate,
    Users,
    BookOpen,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShieldAlert,
    FileText
} from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutTemplate },
    { label: "Courses", href: "/dashboard/admin?tab=courses", icon: BookOpen }, // Using query params for tabs as implemented in page
    { label: "Blogs", href: "/dashboard/admin?tab=blogs", icon: FileText },
    { label: "Users", href: "/dashboard/admin?tab=users", icon: Users },
];

export function AdminSidebar({ userProfile, isCollapsed, toggleSidebar }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { supabase } = useSupabase();
    const router = useRouter();

    const currentTab = searchParams.get("tab") || "overview";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login"); // Redirect to admin login? Or main.
    };

    if (!userProfile) return null;

    return (
        <div className={cn(
            "h-screen bg-surface border-r border-border flex flex-col transition-all duration-300",
            isCollapsed ? "w-[80px]" : "w-64"
        )}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-border/50 h-[88px]">
                {!isCollapsed && (
                    <div className="flex items-center gap-3 animate-in fade-in duration-300">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl shrink-0 border border-primary/30">
                            <ShieldAlert className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-foreground text-sm truncate">Admin Panel</h3>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                                {userProfile.full_name?.split(' ')[0]}
                            </span>
                        </div>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl shrink-0 border border-primary/30">
                            <ShieldAlert className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                )}
            </div>

            {/* Toggle Action */}
            <div className="absolute right-[-12px] top-8 z-50">
                <button
                    onClick={toggleSidebar}
                    className="bg-surface border border-border rounded-full p-1 shadow-md hover:bg-background transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden mt-6">
                <div className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {!isCollapsed ? "Management" : "..."}
                </div>
                {ADMIN_NAV.map((item) => {
                    // Logic:
                    // 1. Get tab from item.href (e.g. "?tab=users" -> "users")
                    // 2. If no tab in href (Overview), match if currentTab is "overview"
                    const itemTab = item.href.split('tab=')[1] || "overview";
                    const isActive = currentTab === itemTab;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={isCollapsed ? item.label : ""}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                                isCollapsed ? "justify-center" : ""
                            )}
                        >
                            <item.icon className={cn("shrink-0 w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-border/50 space-y-2">
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 w-full text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors",
                        isCollapsed ? "justify-center" : ""
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}
