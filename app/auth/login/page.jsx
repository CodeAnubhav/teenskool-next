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

  return (
    <ModernAuthCard
      title="Welcome Back"
      description="Log in to access your dashboard and continue your journey."
      footerLabel="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkHref="/auth/signup"
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
          <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
            Password
          </label>
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
      </form>
    </ModernAuthCard>
  );
}