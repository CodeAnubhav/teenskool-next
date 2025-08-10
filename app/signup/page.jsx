"use client";

import React, { useState } from "react";
import MotionDiv from "@/components/ui/MotionDiv";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white/20 backdrop-blur-xl bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
);

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const password = formData.get("password");

      if (!name || !email || !password) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to confirm your account.",
        });
        router.push("/dashboard"); // redirect after signup
      }
    } catch (err) {
      toast({
        title: "Unexpected Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen m-auto flex items-center justify-center bg-slate-50 text-slate-800 relative">
      <GridPattern />

      <div className="relative pt-32 z-10 max-w-md w-full p-6">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-yellow-400/20 p-4 rounded-full mb-4">
            <UserPlus className="h-12 w-12 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-600 mt-2">
            Join our community and start learning today!
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g., Ada Lovelace"
                  className="w-full px-4 py-3 rounded-lg bg-white/40 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g., ada@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/40 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/40 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 cursor-pointer top-3 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <MotionDiv whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="w-full flex cursor-pointer items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg"
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
