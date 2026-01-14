"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getMockUserProfile } from "@/lib/mock-lms";
import { Loader2 } from "lucide-react";

export default function DashboardRootRedirect() {
    const { user, loading } = useSupabase();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace("/auth/login");
            return;
        }

        const profile = getMockUserProfile(user);
        if (profile?.system_role === 'admin') {
            router.replace("/dashboard/admin");
        } else {
            router.replace("/dashboard/student");
        }
    }, [user, loading, router]);

    return (
        <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
    );
}
