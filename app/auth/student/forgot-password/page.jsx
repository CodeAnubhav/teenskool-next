"use client";

import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, Mail, ArrowLeft } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { ModernAuthCard } from "@/components/ui/modern-auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const { supabase } = useSupabase();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback?next=/auth/update-password`,
            });

            if (error) throw error;

            setEmailSent(true);
            toast({
                title: "Reset Link Sent",
                description: "Check your email for the password reset link.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <ModernAuthCard
                title="Check Your Email"
                description="We've sent a password reset link to your email address."
                footerLabel="Didnt receive it?"
                footerLinkText="Try again"
                footerLinkHref="/auth/student/forgot-password"
            >
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-center text-muted-foreground text-sm">
                        Click the link in the email to set a new password.
                    </p>
                    <Link href="/auth/student/login" className="w-full">
                        <Button variant="outline" className="w-full mt-4">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                        </Button>
                    </Link>
                </div>
            </ModernAuthCard>
        );
    }

    return (
        <ModernAuthCard
            title="Reset Password"
            description="Enter your email address and we'll send you a link to reset your password."
            footerLabel="Remember your password?"
            footerLinkText="Login"
            footerLinkHref="/auth/student/login"
        >
            <form onSubmit={handleReset} className="w-full space-y-4">
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

                <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-primary text-black font-bold text-base hover:bg-primary/90 mt-2 shadow-[0_0_20px_-5px_rgba(163,230,53,0.4)] hover:shadow-[0_0_25px_-5px_rgba(163,230,53,0.6)] transition-all duration-300"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <span className="flex items-center gap-2">
                            Send Reset Link <ArrowRight className="w-5 h-5" />
                        </span>
                    )}
                </Button>
            </form>
        </ModernAuthCard>
    );
}
