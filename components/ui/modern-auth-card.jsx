"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import logoUrl from "@/public/assets/TS.png";

/**
 * ModernAuthCard Component
 * Wraps the auth form in a stylish, centered glass card.
 * 
 * @param {string} title - The main heading (e.g., "Welcome Back")
 * @param {string} description - Subtext (e.g., "Log in to access...")
 * @param {React.ReactNode} children - The form elements
 * @param {string} footerLabel - Text for the bottom link (e.g. "Don't have an account?")
 * @param {string} footerLinkText - Link text (e.g. "Sign Up")
 * @param {string} footerLinkHref - Link URL (e.g. "/auth/signup")
 */
export function ModernAuthCard({
    title,
    description,
    children,
    footerLabel,
    footerLinkText,
    footerLinkHref,
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden w-full">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05),transparent_40%)] pointer-events-none" />

            {/* Centered glass card */}
            <div className="relative z-10 w-full max-w-sm rounded-3xl bg-surface/50 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">

                {/* Animated Logo Container */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface/80 border border-white/5 shadow-lg mb-6 ring-1 ring-white/10 relative group">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                    <div className="relative w-10 h-10">
                        <Image
                            src={logoUrl}
                            alt="Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                        />
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-3xl font-bold text-foreground mb-2 text-center tracking-tight">
                    {title}
                </h2>
                <p className="text-muted-foreground text-center mb-8 text-sm max-w-[260px] leading-relaxed">
                    {description}
                </p>

                {/* Form Slot */}
                <div className="flex flex-col w-full gap-4">
                    {children}
                </div>

                {/* Footer Link */}
                <div className="w-full text-center mt-6 pt-6 border-t border-border/50">
                    <span className="text-sm text-muted-foreground/80">
                        {footerLabel}{" "}
                        <Link
                            href={footerLinkHref}
                            className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                        >
                            {footerLinkText}
                        </Link>
                    </span>
                </div>
            </div>

            {/* Optional bottom branding */}
            <div className="mt-8 text-xs text-muted-foreground/40 font-medium tracking-widest uppercase">
                TeenSkool • AI Powered
            </div>
        </div>
    );
}
