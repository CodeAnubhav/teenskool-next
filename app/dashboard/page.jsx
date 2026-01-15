"use client";

import React, { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getProfile } from "@/lib/db";

export default function DashboardRootRedirect() {
    const { user, loading: authLoading } = useSupabase();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function checkRole() {
            // Wait for auth to initialize
            if (authLoading) return;

            // Not logged in? Go to login.
            if (!user) {
                router.replace("/auth/login");
                return;
            }

            try {
                // Fetch real profile from Supabase
                const profile = await getProfile(user.id);

                if (profile?.system_role === 'admin') {
                    router.replace("/dashboard/admin");
                } else {
                    router.replace("/dashboard/student");
                }
            } catch (error) {
                console.error("Profile Check Error:", error);
                // Fallback to student if error, or maybe stay on loading? 
                // Student is safer default.
                router.replace("/dashboard/student");
            } finally {
                setIsChecking(false);
            }
        }

        checkRole();
    }, [user, authLoading, router]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="ml-2 text-muted-foreground">Loading Dashboard...</p>
        </div>
    );
}
