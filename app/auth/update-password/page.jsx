"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useRouter } from "next/navigation";
import { ModernAuthCard } from "@/components/ui/modern-auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdatePasswordPage() {
    const { toast } = useToast();
    const { supabase } = useSupabase();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.log("No session found in UpdatePasswordPage");
            }
        };
        checkSession();
    }, [supabase]);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                description: "Please ensure both passwords are the same.",
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            toast({
                title: "Password Updated",
                description: "Your password has been changed successfully. Redirecting...",
                variant: "success",
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);

        } catch (error) {
            toast({
                title: "Update Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModernAuthCard
            title="Set New Password"
            description="Create a strong password to secure your account."
            footerLabel="Back to Login"
            footerLinkText="Login"
            footerLinkHref="/auth/student/login"
        >
            <form onSubmit={handleUpdatePassword} className="w-full space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
                        New Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="bg-background/50 border-input/50 focus:bg-background transition-all h-12 pr-10"
                            required
                            minLength={6}
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

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground ml-1 uppercase tracking-wide">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="bg-background/50 border-input/50 focus:bg-background transition-all h-12 pr-10"
                            required
                            minLength={6}
                        />
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
                            Update Password <ArrowRight className="w-5 h-5" />
                        </span>
                    )}
                </Button>
            </form>
        </ModernAuthCard>
    );
}
