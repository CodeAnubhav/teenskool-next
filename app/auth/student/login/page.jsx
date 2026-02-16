"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter } from "next/navigation";
import { ModernAuthCard } from "@/components/ui/modern-auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleGoogleLogin = async () => {
    try {
      // 1. Get the current origin (e.g., https://teenskool.in)
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // 2. Dynamic redirect based on where the user currently is
          redirectTo: `${origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <ModernAuthCard
      title="Welcome Back"
      description="Log in to access your dashboard and continue your journey."
      footerLabel="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkHref="/auth/student/signup"
    >
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="e.g. alex@teenskool.com"
            className="bg-background/50 border-input/50 focus:bg-background transition-all h-12"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
              Password
            </label>
            <a href="/auth/student/forgot-password" className="text-xs text-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="bg-background/50 border-input/50 focus:bg-background transition-all h-12 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-primary text-black font-bold text-base hover:bg-primary/90 mt-2 shadow-[0_0_20px_-5px_rgba(163,230,53,0.4)] hover:shadow-[0_0_25px_-5px_rgba(163,230,53,0.6)] transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Login <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full h-12 rounded-xl border-border/50 bg-background/50 hover:bg-background hover:border-primary/50 transition-all duration-300"
          disabled={loading}
        >
          <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Google
        </Button>
      </form>
    </ModernAuthCard>
  );
}