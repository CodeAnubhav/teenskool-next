"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import MotionDiv from "@/components/ui/MotionDiv";
import { Loader2, LogOut, User, MessageSquare, Hand } from "lucide-react";

const PatternBackground = () => (
  <div className="absolute inset-0 -z-10 bg-slate-50">
    <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Hello <Hand className="h-6 w-6 text-amber-500" /> {userName}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 w-full sm:w-auto"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>


        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-lg">{userName}</p>
            <p className="text-slate-500 text-sm">{email}</p>
          </div>
        </div>

        {/* Virtual Mentor Teaser */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> Your Virtual Mentor
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Ask business, startup, and entrepreneurship questions — powered by AI.
          </p>
          <Link href="/mentor">
            <button className="bg-primary cursor-pointer text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
              Open Virtual Mentor
            </button>
          </Link>
        </div>

        {/* Enrolled Programs */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Your Enrolled Workshops/Bootcamps</h2>
          <p className="text-slate-500 text-sm">
            No programs yet.{" "}
            <Link href="/programs" className="text-primary underline">
              Browse programs
            </Link>
          </p>
        </div>
      </MotionDiv>
    </div>
  );
}
