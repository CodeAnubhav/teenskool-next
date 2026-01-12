"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "@/contexts/SupabaseContext";
import MotionDiv from "@/components/ui/MotionDiv";
import { Loader2, LogOut, User, MessageSquare, Hand } from "lucide-react";

// Themed pattern for the dark background
const PatternBackground = () => (
  <div className="absolute inset-0 -z-10 bg-background">
    <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, supabase } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  const userName = user?.user_metadata?.name || "Student";
  const email = user?.email || "No email";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen relative pt-32 pb-12 px-6">
      <PatternBackground />

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Hello <Hand className="h-6 w-6 text-primary" /> {userName}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-colors w-full sm:w-auto"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>


        {/* Profile Card */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-2xl shadow-black/20 flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-lg text-foreground">{userName}</p>
            <p className="text-foreground/70 text-sm">{email}</p>
          </div>
        </div>

        {/* Virtual Mentor Teaser */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-2xl shadow-black/20">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <MessageSquare className="h-5 w-5 text-primary" /> Your Virtual Mentor
          </h2>
          <p className="text-foreground/70 text-sm mb-4">
            Ask business, startup, and entrepreneurship questions — powered by AI.
          </p>
          <Link href="/mentor">
            <button className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground px-5 py-2 rounded-lg font-semibold transition-colors">
              Open Virtual Mentor
            </button>
          </Link>
        </div>

        {/* Enrolled Programs */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-2xl shadow-black/20">
          <h2 className="text-xl font-bold mb-4 text-foreground">Your Enrolled Workshops/Bootcamps</h2>
          <p className="text-foreground/70 text-sm">
            No programs yet.{" "}
            <Link href="/programs" className="text-primary hover:underline">
              Browse programs
            </Link>
          </p>
        </div>
      </MotionDiv>
    </div>
  );
}