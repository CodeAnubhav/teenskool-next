"use client";

import React, { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Loader2 } from "lucide-react";
import { getMockUserProfile } from "@/lib/mock-lms";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
    const { user, loading: authLoading } = useSupabase();
    const router = useRouter();
    const pathname = usePathname();
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        // 1. AUTH CHECK
        if (authLoading) return;
        if (!user) {
            router.push("/auth/login");
            return;
        }

        // 2. PROFILE FETCH (MOCK)
        const profile = getMockUserProfile(user);
        setUserProfile(profile);

        // 3. ONBOARDING ENFORCEMENT
        const isOnboardingPage = pathname === "/dashboard/student/onboarding";

        // If user is Admin, skip onboarding enforcement
        // If user is Student:
        if (profile?.system_role !== 'admin') {
            if (profile && !profile.onboarding_completed && !isOnboardingPage) {
                router.replace("/dashboard/student/onboarding");
            } else if (profile && profile.onboarding_completed && isOnboardingPage) {
                router.replace("/dashboard/student");
            }
        }

        // 4. AUTO-COLLAPSE ON LMS ROUTES
        // If we are in a course player, collapse the sidebar for focus
        // Course player route: /dashboard/student/courses/[id]
        const isPlayerPage = pathname?.match(/\/dashboard\/student\/courses\/.+/);
        setIsSidebarCollapsed(!!isPlayerPage);

        setIsLoading(false);
    }, [user, authLoading, pathname, router]);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    if (isLoading || authLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (pathname === "/dashboard/student/onboarding") {
        return <main className="bg-background min-h-screen">{children}</main>;
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden transition-all duration-300">
            {/* Sidebar (Fixed width triggers) */}
            <div className={cn("transition-all duration-300 relative z-50", isSidebarCollapsed ? "w-[80px]" : "w-64")}>
                <Sidebar
                    userProfile={userProfile}
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            {/* Main Content */}
            <main className={cn(
                "flex-1 relative transition-all duration-300",
                isSidebarCollapsed ? "overflow-hidden p-0" : "overflow-y-auto p-4 md:p-8"
            )}>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.05),transparent_40%)] pointer-events-none" />
                {children}
            </main>
        </div>
    );
}
