"use client";

import React, { useState } from "react";
import Link from "next/link";
import MotionDiv from "@/components/ui/MotionDiv";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter } from "next/navigation";

// CORRECTED: Using the theme variable for the grid color
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] animate-grid-scroll" />
);

export default function LoginPage() {
  const { toast } = useToast();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative">
      <GridPattern />

      <div className="relative pt-32 z-10 max-w-md w-full p-6">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-primary/20 p-4 rounded-full mb-4">
            <LogIn className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-foreground/80">
            Log in to access your dashboard and courses.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-surface/50 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-foreground/50 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g., ada@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-background/70 border border-border placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground/90 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-foreground/50 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-background/70 border border-border placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-foreground/50 hover:text-foreground/80 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <MotionDiv whileTap={{ scale: 0.98 }} className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center cursor-pointer justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Logging In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" /> Login
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-foreground/70 mt-8">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="font-semibold text-primary cursor-pointer hover:underline">
                    Sign Up
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