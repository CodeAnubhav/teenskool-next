"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getMockUserProfile } from "@/lib/mock-lms";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
    const { user, loading: authLoading } = useSupabase();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push("/auth/login");
            return;
        }

        const profile = getMockUserProfile(user);

        // STRICT CHECK: System Role MUST be 'admin'
        if (profile?.system_role !== 'admin') {
            console.warn("Unauthorized access attempt to Admin Panel");
            router.replace("/dashboard"); // Kick them back to student dashboard
        } else {
            setIsAuthorized(true);
        }

        setChecking(false);
    }, [user, authLoading, router]);

    if (authLoading || checking) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!isAuthorized) return null;

    return <>{children}</>;
}
