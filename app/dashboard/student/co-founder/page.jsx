"use client";

import React from "react";
import ChatPanel from "@/app/ai-cofounder/ChatPanel";
import { getGameRoleById, getMockUserProfile } from "@/lib/mock-lms";
import { useSupabase } from "@/contexts/SupabaseContext";

export default function CoFounderPage() {
    const { user } = useSupabase();
    const profile = getMockUserProfile(user);
    const gameRole = profile ? getGameRoleById(profile.game_role_id) : null;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <span className="text-4xl">🤖</span> AI Co-Founder
                </h1>
                <p className="text-muted-foreground">
                    Your personalized startup mentor.
                    {gameRole && (
                        <span className="ml-2 px-2 py-0.5 rounded-full border bg-primary/5 border-primary/20 text-primary text-xs">
                            Current Context: {gameRole.name}
                        </span>
                    )}
                </p>
            </div>

            {/* Reusing existing ChatPanel as requested */}
            {/* Height adjusted to fit dashboard layout nicely */}
            <div className="h-[calc(100vh-250px)]">
                <ChatPanel />
            </div>
        </div>
    );
}
