"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter } from "next/navigation";
import { ModernAuthCard } from "@/components/ui/modern-auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const { toast } = useToast();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
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
        title: "Account Created!",
        description: "Welcome to Teenskool.",
      });
      router.push("/dashboard");
    }
  };

  return (
    <ModernAuthCard
      title="Create Account"
      description="Join thousands of students building the future with AI."
      footerLabel="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/auth/login"
    >
      <form onSubmit={handleSignup} className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
            Full Name
          </label>
          <Input
            type="text"
            name="fullName"
            placeholder="John Doe"
            className="bg-background/50 border-input/50 focus:bg-background transition-all h-12"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="alex@teenskool.com"
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
              Get Started <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </form>
    </ModernAuthCard>
  );
}