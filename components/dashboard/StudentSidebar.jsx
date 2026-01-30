"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    Map,
    Bot,
    User,
    ChevronLeft,
    ChevronRight,
    Settings,
    LogOut
} from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { cn } from "@/lib/utils";
import { GAME_ROLES, getLevelProgress } from "@/lib/gamification";
import { ProfileModal } from "./ProfileModal";

const STUDENT_NAV = [
    { label: "Dashboard", href: "/dashboard/student", icon: Home },
    { label: "My Journey", href: "/dashboard/student/courses", icon: Map },
    { label: "AI Co-Founder", href: "/dashboard/student/co-founder", icon: Bot },
];

export function StudentSidebar({ userProfile, isCollapsed, toggleSidebar }) {
    const pathname = usePathname();
    const { supabase } = useSupabase(); // Kept for consistency if needed elsewhere, though logout is in modal now
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    if (!userProfile) return null;

    // Gamification Logic
    const xp = userProfile.xp || 0;
    const gameRole = GAME_ROLES.slice().reverse().find(r => xp >= r.min_xp) || GAME_ROLES[0];
    const { progress } = getLevelProgress(xp);

    return (
        <>
            <div className={cn(
                "h-full bg-surface border-r border-border flex flex-col transition-all duration-300",
                isCollapsed ? "w-[80px]" : "w-64"
            )}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-border/50 h-[88px]">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3 animate-in fade-in duration-300">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl shrink-0">
                                {gameRole?.badge}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-foreground text-sm truncate">{userProfile.full_name?.split(' ')[0]}</h3>
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border truncate block w-fit", gameRole?.color)}>
                                    {gameRole?.name}
                                </span>
                            </div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="w-full flex justify-center">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl shrink-0">
                                {gameRole?.badge}
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

                {/* XP Bar (Student Only) */}
                {!isCollapsed && (
                    <div className="px-6 py-4 border-b border-border/50 animate-in fade-in slide-in-from-left-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{Math.floor(progress)}%</span>
                            <span>Level Up</span>
                        </div>
                        <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border/50">
                            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden mt-2">
                    {STUDENT_NAV.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={isCollapsed ? item.label : ""}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-black shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                                    isCollapsed ? "justify-center" : ""
                                )}
                            >
                                <item.icon className={cn("shrink-0 w-5 h-5", isActive ? "text-black" : "text-muted-foreground")} />
                                {!isCollapsed && <span className="truncate">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-border/50 space-y-2">
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className={cn(
                            "flex items-center gap-3 px-3 py-3 w-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors",
                            isCollapsed ? "justify-center" : ""
                        )}
                    >
                        <User className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span>Profile</span>}
                    </button>
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileOpen && (
                <ProfileModal
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    userProfile={userProfile}
                />
            )}
        </>
    );
}
