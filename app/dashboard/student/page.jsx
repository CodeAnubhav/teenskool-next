"use client";

import React from "react";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getMockUserProfile, getGameRoleById, getLevelProgress } from "@/lib/mock-lms";
import {
  Trophy,
  Flame,
  Target,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSupabase();
  const profile = getMockUserProfile(user);

  if (!profile) return null;

  const gameRole = getGameRoleById(profile.game_role_id);
  const { progress, next_role, xp_needed } = getLevelProgress(profile.total_xp);

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
              Welcome back, {profile.full_name?.split(" ")[0]}!
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
            <div className="text-3xl font-bold text-foreground mb-1">3 Day</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Building Streak</div>
          </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Trophy className="w-5 h-5 text-yellow-500" />}
          label="Total XP"
          value={profile.total_xp}
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
          value="Top 10%"
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
              <h3 className="text-2xl font-bold mb-2">Complete "Startup 101"</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                You are 35% through the basics. Finish 2 more lessons to earn 200 XP and unlock the "Idea Validator" badge.
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
              user="Alex M."
              action="earned Founder Role"
              time="2m ago"
              icon="🚀"
            />
            <ActivityItem
              user="Sarah K."
              action="finished 'AI Tools'"
              time="15m ago"
              icon="🎓"
            />
            <ActivityItem
              user="You"
              action="joined TeenSkool"
              time="1h ago"
              icon="👋"
            />
          </div>
        </div>
      </div>

      {/* DEV TOOL: ROLE SWITCHER (For Demo Purposes) */}
      <div className="mt-12 p-4 border border-dashed border-red-500/30 bg-red-500/5 rounded-xl">
        <h4 className="text-xs font-bold text-red-500 uppercase mb-2">Dev Tools (Demo Only)</h4>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              import("@/lib/mock-lms").then(({ updateMockUserProfile }) => {
                updateMockUserProfile(user, { system_role: "admin" });
                window.location.reload();
              });
            }}
          >
            Switch to ADMIN
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              import("@/lib/mock-lms").then(({ updateMockUserProfile }) => {
                updateMockUserProfile(user, { system_role: "student" });
                window.location.reload();
              });
            }}
          >
            Switch to STUDENT
          </Button>
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