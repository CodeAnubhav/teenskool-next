"use client";

import React, { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Loader2 } from "lucide-react";
import { getProfile } from "@/lib/db";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
    const { user, loading: authLoading } = useSupabase();
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.replace("/admin/login"); // Redirect to Admin Login
            return;
        }

        async function initAdmin() {
            try {
                const profile = await getProfile(user.id);

                // 1. Strict Role Enforcement
                if (profile?.system_role !== 'admin') {
                    console.warn("Unauthorized Access: Student attempted Admin Panel");
                    router.replace("/dashboard/student");
                    return;
                }

                setUserProfile(profile);

            } catch (err) {
                console.error("Admin Layout Error", err);
            } finally {
                setIsLoading(false);
            }
        }

        initAdmin();

    }, [user, authLoading, router]);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    if (isLoading || authLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-2 text-muted-foreground">Verifying Admin Access...</span>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background text-foreground font-sans selection:bg-purple-500/20 overflow-hidden">
            {/* Admin Sidebar */}
            <div className={cn(
                "hidden md:block transition-all duration-300 relative z-50 border-r border-border bg-surface",
                isSidebarCollapsed ? "w-[80px]" : "w-64"
            )}>
                <AdminSidebar
                    userProfile={userProfile}
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            {/* Main Content */}
            <main className={cn(
                "flex-1 relative transition-all duration-300 overflow-y-auto",
                isSidebarCollapsed ? "md:p-0" : "md:p-8",
                "p-4"
            )}>
                {children}
            </main>
        </div>
    );
}
