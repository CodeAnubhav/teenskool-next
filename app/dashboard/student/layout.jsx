"use client";

import React, { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter, usePathname } from "next/navigation";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";
import { Loader2 } from "lucide-react";
import { getProfile } from "@/lib/db";
import { cn } from "@/lib/utils";

export default function StudentLayout({ children }) {
    const { user, loading: authLoading } = useSupabase();
    const router = useRouter();
    const pathname = usePathname();
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.replace("/auth/login");
            return;
        }

        async function initStudent() {
            try {
                const profile = await getProfile(user.id);

                // 1. Role Enforcement
                // If not a student (and not null), kick them out. 
                // Admins should not be here unless they are "impersonating" which we don't support yet.
                // Strict separation requested.
                if (profile?.system_role !== 'student') {
                    // If they are admin, send them to admin.
                    if (profile?.system_role === 'admin') {
                        router.replace("/dashboard/admin");
                        return;
                    }
                    // Unknown role? Logout.
                    // router.replace("/auth/login");
                    // return;
                }

                setUserProfile(profile);

                // 2. Onboarding Check
                const isOnboardingPage = pathname === "/dashboard/student/onboarding";
                if (!profile?.onboarding_completed && !isOnboardingPage) {
                    router.replace("/dashboard/student/onboarding");
                    return;
                }
                if (profile?.onboarding_completed && isOnboardingPage) {
                    router.replace("/dashboard/student");
                    return;
                }

            } catch (err) {
                console.error("Student Layout Error", err);
            } finally {
                setIsLoading(false);
            }
        }

        initStudent();

        // Auto-collapse on LMS
        const isPlayerPage = pathname?.match(/\/dashboard\/student\/courses\/.+/);
        setIsSidebarCollapsed(!!isPlayerPage);

    }, [user, authLoading, pathname, router]);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    if (isLoading || authLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading Student Portal...</span>
            </div>
        );
    }

    if (pathname === "/dashboard/student/onboarding") {
        return <main className="bg-background min-h-screen">{children}</main>;
    }

    const isPlayerPage = pathname?.match(/\/dashboard\/student\/courses\/.+/);

    return (
        <div className="flex h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className={cn(
                "hidden md:block transition-all duration-300 relative z-50 border-r border-border bg-surface",
                isSidebarCollapsed ? "w-[80px]" : "w-64"
            )}>
                <StudentSidebar
                    userProfile={userProfile}
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            {/* Mobile Nav */}
            <MobileBottomNav userProfile={userProfile} />

            {/* Main Content */}
            <main className={cn(
                "flex-1 relative transition-all duration-300",
                isSidebarCollapsed ? "md:p-0" : "md:p-8",
                isPlayerPage ? "p-0 pb-0" : "p-4 pb-24",
                isPlayerPage ? "overflow-hidden" : "overflow-y-auto"
            )}>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.05),transparent_40%)] pointer-events-none" />
                {children}
            </main>
        </div>
    );
}
