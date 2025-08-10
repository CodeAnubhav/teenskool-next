// File: app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import MotionDiv from "@/components/ui/MotionDiv";
import { Loader2, LogOut, User, BookOpen, Award, Hand } from "lucide-react";

// Pattern background matching login/signup
const PatternBackground = () => (
  <div className="absolute inset-0 -z-10 bg-slate-50">
    <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />
  </div>
);


// --- Main Dashboard Page Component ---
export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // THE FIX: Start with a true loading state
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const getUser = async () => {
        // Fetch session from Supabase
        const { data: { user } } = await supabase.auth.getUser();
        
        // If no user is found, redirect immediately
        if (!user) {
          router.push("/login");
        } else {
          // If a user is found, update the state
          setUser(user);
          setLoading(false); // Stop loading ONLY if the user is authenticated
        }
      };
 
      getUser();
    }, [router]);
 
    // THIS IS THE KEY:
    // While loading is true, we show a full-screen loader.
    // The dashboard UI will not even attempt to render until loading is false.
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      );
    }
 
    // This part of the code is now only reachable if loading is false (i.e., user is logged in)
    const userName = user?.user_metadata?.name || "Student";
 
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/");
    };
 

  return (
    <div className="min-h-screen  relative pt-32 pb-20 px-6">
      <PatternBackground />

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              {/* 2. Updated h1 greeting */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Hello <Hand className="inline-block h-8 w-8 text-amber-500" /> {userName}!
              </h1>
              <p className="text-slate-500">Let's continue your learning journey.</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center cursor-pointer gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Your Progress */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Your Progress</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
              <p className="text-6xl font-bold text-primary">0%</p>
              <p className="text-slate-500 mt-1">Overall Completion</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <BookOpen className="h-7 w-7 text-blue-500 mb-3" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-slate-500">Lessons Completed</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <Award className="h-7 w-7 text-green-500 mb-3" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-slate-500">Certificates Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Enrolled Courses</h2>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No Courses Enrolled Yet</h3>
              <p className="text-slate-500 mb-4">Start your journey by exploring our programs.</p>
              <Link href="/">
                <button className="bg-primary cursor-pointer text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Explore Programs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}