"use client";

import React from "react";
import ChatPanel from "@/components/ai-cofounder/ChatPanel";
import { GAME_ROLES } from "@/lib/gamification";
import { getProfile } from "@/lib/db";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useEffect, useState } from "react";

import { Bot } from "lucide-react";

export default function CoFounderPage() {
    const { user } = useSupabase();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            getProfile(user.id).then(setProfile);
        }
    }, [user]);

    const xp = profile?.xp || 0;
    const gameRole = GAME_ROLES.slice().reverse().find(r => xp >= r.min_xp) || GAME_ROLES[0];

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">AI Co-Founder</h1>
                        <p className="text-xs text-muted-foreground font-medium">
                            Context: <span className="text-primary">{gameRole?.name || "Founder"}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ChatPanel />
            </div>
        </div>
    );
}
