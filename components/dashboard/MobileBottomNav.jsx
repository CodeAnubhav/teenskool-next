"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Map,
    Bot,
    ShieldCheck,
    LayoutTemplate,
    User,
    Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileModal } from "./ProfileModal";

// NAV ITEMS (Mirrors Sidebar)
const STUDENT_NAV = [
    { label: "Home", href: "/dashboard/student", icon: Home },
    { label: "Self Paced", href: "/dashboard/student/courses", icon: Map },
    { label: "AI", href: "/dashboard/student/co-founder", icon: Bot },
    { label: "OS", href: "/dashboard/student/founder-os", icon: Rocket },
    { label: "Profile", href: "#", icon: User },
];

const ADMIN_NAV = [
    { label: "Admin", href: "/dashboard/admin", icon: LayoutTemplate },
    { label: "Courses", href: "/dashboard/admin?tab=courses", icon: Map },
];

export function MobileBottomNav({ userProfile }) {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // 1. Hide on LMS Player Routes (to give full screen to content)
    const isPlayerPage = pathname?.match(/\/dashboard\/student\/courses\/.+/);
    if (isPlayerPage) return null;

    if (!userProfile) return null;

    const isSystemAdmin = userProfile.system_role === 'admin';
    const navItems = isSystemAdmin ? ADMIN_NAV : STUDENT_NAV;

    return (
        <>
            <div className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around z-50 shadow-2xl safe-area-bottom">
                {navItems.map((item) => {
                    const isProfile = item.label === "Profile";
                    const isActive = isProfile
                        ? isProfileOpen
                        : (pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard/student"));

                    if (isProfile) {
                        return (
                            <button
                                key={item.label}
                                onClick={() => setIsProfileOpen(true)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 w-16",
                                    isActive
                                        ? "text-primary scale-110"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 w-16",
                                isActive
                                    ? "text-primary scale-110"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            suppressHydrationWarning
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                userProfile={userProfile}
            />
        </>
    );
}
