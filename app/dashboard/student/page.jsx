"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import { getProfile, getMyEnrollments, getRecentMembers } from "@/lib/db";
import { getLevelProgress } from "@/lib/gamification";
import {
  Trophy,
  Flame,
  Target,
  ArrowRight,
  Bot,
  Zap,
  Play,
  Share2,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSupabase();
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const [profileData, enrollmentsData, membersData] = await Promise.all([
            getProfile(user.id),
            getMyEnrollments(user.id),
            getRecentMembers(4)
          ]);
          setProfile(profileData);
          setEnrollments(enrollmentsData || []);
          setRecentMembers(membersData || []);
        } catch (e) {
          console.error("Dashboard data load failed", e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [user]);

  if (loading || !profile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-pulse">
        <div className="col-span-12 lg:col-span-8 h-48 bg-muted rounded-3xl" />
        <div className="col-span-12 lg:col-span-4 h-48 bg-muted rounded-3xl" />
        <div className="col-span-12 lg:col-span-7 h-64 bg-muted rounded-3xl" />
        <div className="col-span-12 lg:col-span-5 h-64 bg-muted rounded-3xl" />
      </div>
    );
  }

  const totalXp = profile.xp || 0;
  const { xp_needed, current_role } = getLevelProgress(totalXp);

  const activeEnrollment = enrollments.length > 0 ? enrollments[0] : null;
  const nextCourse = activeEnrollment?.course;

  // Calculate Progress
  const totalLessons = nextCourse?.lessons?.length || 0;

  // Filter for unique, valid completed lessons that actually exist in this course
  const validLessonIds = new Set(nextCourse?.lessons?.map(l => String(l.id)) || []);
  const rawCompletedIds = activeEnrollment?.completed_lesson_ids || [];
  const uniqueValidCompleted = new Set(
    rawCompletedIds.map(String).filter(id => validLessonIds.has(id))
  );

  const completedCount = uniqueValidCompleted.size;
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

      {/* 1. WELCOME BANNER (Top Left) */}
      <div className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-surface border border-primary/20 p-6 md:p-8 flex flex-col justify-center min-h-[200px] md:min-h-[220px]">
        <div className="relative z-10 max-w-[calc(100%-80px)] md:max-w-full">
          <span className="text-primary font-bold tracking-wider mb-2 block text-sm md:text-base">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            Welcome back, {profile.full_name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground max-w-md text-base md:text-lg">
            Always stay updated in your student portal. You are doing great!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-[-50px] top-[-50px] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-4 md:right-10 bottom-4 md:top-1/2 md:-translate-y-1/2 opacity-20 rotate-12">
          {/* Simple decoration */}
          <Trophy className="w-24 h-24 md:w-40 md:h-40 text-primary" />
        </div>
      </div>

      {/* 2. STATS (Top Right) */}
      <div className="col-span-12 lg:col-span-4 h-full">
        <div className="bg-surface border border-border rounded-3xl p-6 h-full flex flex-col justify-center items-center text-center shadow-sm hover:border-primary/50 transition-colors">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Total XP</div>
          <div className="text-4xl font-black text-foreground">{totalXp}</div>
          <div className="mt-2 text-xs text-muted-foreground">Level: {current_role?.name || "Novice"}</div>
        </div>
      </div>

      {/* 3. AI CO-FOUNDER (Hero Product) */}
      <div className="col-span-12 lg:col-span-7 bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Bot className="w-48 h-48" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
            <Zap className="w-3 h-3 fill-primary" /> NEW FEATURE
          </div>

          <h2 className="text-3xl font-bold mb-4">AI Co-Founder</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Turn your ideas into reality. Your personal AI assistant is ready to help you brainstorm, validate, and build your startup.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard/student/co-founder">
              <Button className="h-12 px-8 rounded-xl text-base font-bold bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                Launch Co-Founder <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. CONTINUE LEARNING */}
      <div className="col-span-12 lg:col-span-5 bg-surface border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Continue Learning
          </h3>
          <Link href="/dashboard/student/courses" className="text-sm text-primary font-medium hover:underline">See all</Link>
        </div>

        {nextCourse ? (
          <div className="bg-secondary/50 rounded-2xl p-5 border border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-lg mb-1">{nextCourse.title}</h4>
                <span className="text-xs text-muted-foreground uppercase font-bold">{current_role?.name || "Novice"}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {completedCount} / {totalLessons} Lessons Completed
                </span>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <Link href={`/dashboard/student/courses/${nextCourse.id}`} className="block mt-4">
              <Button variant="outline" className="w-full rounded-xl border-primary/20 hover:bg-primary/5 hover:text-primary">
                {progress > 0 ? "Resume Course" : "Start Course"}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground mb-4">No active courses.</p>
            <Link href="/dashboard/student/courses">
              <Button variant="secondary" className="rounded-xl">Browse Catalog</Button>
            </Link>
          </div>
        )}
      </div>

      {/* 5. LIVE FEED (Bottom) */}
      <div className="col-span-12 bg-surface border border-border rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Community Live Feed</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground"><MoreHorizontal className="w-5 h-5" /></Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {member.full_name?.substring(0, 2).toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{member.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  Joined {new Date(member.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {recentMembers.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">No recent activity.</p>
          )}
        </div>
      </div>

    </div>
  );
}