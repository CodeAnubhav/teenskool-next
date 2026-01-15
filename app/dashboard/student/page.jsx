"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getProfile } from "@/lib/db";
import { getGameRoleById, getLevelProgress } from "@/lib/gamification";
import {
  Trophy,
  Flame,
  Target,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSupabase();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (user) {
        try {
          const data = await getProfile(user.id);
          setProfile(data);
        } catch (e) {
          console.error("Profile load failed", e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadProfile();
  }, [user]);

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  if (!profile) return null;

  // Default values if DB fields are empty
  const totalXp = profile.xp || 0; // DB column is 'xp' (from schema), check if it's 'total_xp' or 'xp'. SQL schema says 'xp'. Mock said 'total_xp'. verify schema.
  // Schema: "xp integer default 0"

  // Wait, mock-lms used 'total_xp' and 'game_role_id'.
  // My SQL schema for profiles has: 'xp', 'level', 'onboarding_completed'. 
  // It does NOT have 'game_role_id'. We should calculate role dynamically from XP.

  const { progress, next_role, xp_needed } = getLevelProgress(totalXp);
  // getLevelProgress finds the role based on XP.
  // Need to modify getLevelProgress? No, it uses MIN_XP. 
  // We can just find the current role:
  const GAME_ROLES = [
    { id: "role_novice", min_xp: 0, badge: "🌱", name: "Novice", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    { id: "role_founder", min_xp: 1000, badge: "🚀", name: "Founder", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "role_visionary", min_xp: 5000, badge: "🔮", name: "Visionary", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { id: "role_unicorn", min_xp: 20000, badge: "🦄", name: "Unicorn", color: "bg-pink-500/10 text-pink-500 border-pink-500/20" }
  ];
  // Since I don't have game_role_id in DB, I deduce it:
  const gameRole = GAME_ROLES.slice().reverse().find(r => totalXp >= r.min_xp) || GAME_ROLES[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-surface to-surface border border-primary/20 p-8 md:p-12">
        {/* Background Decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{gameRole.badge}</span>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${gameRole.color}`}>
                {gameRole.name} Status
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome back, {profile.full_name?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              You are {xp_needed} XP away from becoming a <strong>{next_role?.name || "Unicorn"}</strong>.
              Keep building to unlock new perks.
            </p>
          </div>

          {/* Daily Streak / XP Card */}
          <div className="bg-background/50 backdrop-blur border border-white/5 rounded-2xl p-6 min-w-[240px] text-center">
            <div className="flex justify-center mb-2 text-orange-500">
              <Flame className="w-8 h-8 fill-orange-500 animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">1 Day</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Building Streak</div>
          </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Trophy className="w-5 h-5 text-yellow-500" />}
          label="Total XP"
          value={totalXp}
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-blue-500" />}
          label="Courses"
          value="1"
        />
        <StatCard
          icon={<Award className="w-5 h-5 text-purple-500" />}
          label="Certificates"
          value="0"
        />
        <StatCard
          icon={<Zap className="w-5 h-5 text-primary" />}
          label="Skill Rank"
          value="Rising Star"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* 3. NEXT MISSION (Left 2/3) */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" /> Next Mission
          </h2>

          <div className="group relative bg-surface border border-border rounded-3xl p-8 hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-40 h-40 text-foreground" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-bold mb-4 border border-green-500/20">
                RECOMMENDED
              </span>
              <h3 className="text-2xl font-bold mb-2">Startup 101</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start your journey into entrepreneurship. Learn the basics.
              </p>

              <Link href="/dashboard/student/courses/1">
                <Button className="rounded-xl h-12 px-8 text-base font-bold bg-primary text-black hover:bg-primary/90">
                  Continue Learning <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. LEADERBOARD / FEED (Right 1/3) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Live Feed</h2>
          <div className="bg-surface border border-border rounded-3xl p-6 space-y-6">
            <ActivityItem
              user={profile.full_name || "You"}
              action="joined TeenSkool"
              time="Just now"
              icon="👋"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
      <div className="mb-3 p-3 rounded-full bg-background border border-border/50 shadow-inner">
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ActivityItem({ user, action, time, icon }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-lg shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground">
          <span className="font-bold">{user}</span> {action}
        </p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}