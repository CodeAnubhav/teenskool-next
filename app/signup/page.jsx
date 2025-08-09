"use client";

import React, { useState } from "react";
import MotionDiv from "@/components/ui/MotionDiv";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";


const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full 
    bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] 
    [background-size:16px_16px] animate-grid-scroll" />
);

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created",
        description: "Please check your email to confirm your account.",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <GridPattern />

      <div className="relative pt-32 z-10 max-w-md w-full p-6">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-[var(--color-primary)]/20 p-4 rounded-full mb-4">
            <UserPlus className="h-12 w-12 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-4xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Create Account
          </h1>
          <p className="mt-2 text-slate-600">
            Sign up to start learning and track your courses.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/50 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSignup} className="space-y-6">

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g., ada@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    required
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-slate-400" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <MotionDiv whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-primary-foreground)] font-semibold py-3 px-6 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Signing Up...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" /> Sign Up
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-slate-600 mt-8">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </MotionDiv>
            </form>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
