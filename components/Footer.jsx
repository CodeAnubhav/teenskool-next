"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoUrl from "@/public/assets/TS.png";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <section className="relative w-full bg-background border-t border-border py-12 px-4 md:py-20 overflow-hidden">

      {/* 1. BACKGROUND WATERMARK */}
      <div className="absolute inset-x-0 bottom-[-2%] flex justify-center pointer-events-none z-0">
        <h1 className="text-[12vw] md:text-[22vw] font-bold text-foreground/5 tracking-tighter leading-none select-none">
          TEENSKOOL
        </h1>
      </div>

      {/* 2. THE FLOATING CARD */}
      <div className="relative z-10 max-w-5xl mx-auto bg-card/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 border border-border backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">

          {/* LEFT: BRANDING & MISSION */}
          <div className="flex flex-col max-w-md space-y-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-foreground">
              <Image
                src={logoUrl}
                alt="TeenSkool Logo"
                className="w-10 h-10 object-contain"
                quality={100}
              />
              <span>TeenSkool</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-base font-medium">
              Empowering students to explore entrepreneurship and AI through hands-on workshops led by real startup founders. Just ideas and curiosity!
            </p>

            {/* Social Icons - Clean & Minimal */}
            <div className="flex items-center gap-3 mt-2">
              <SocialIcon href="https://linkedin.com/company/teenskool" icon={<Linkedin className="w-5 h-5" />} />
              <SocialIcon href="https://instagram.com/teenskool" icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon href="mailto:teenskool@gmail.com" icon={<Mail className="w-5 h-5" />} />
            </div>
          </div>

          {/* RIGHT: NEWSLETTER / ACTION AREA */}
          <div className="flex flex-col w-full md:w-auto md:min-w-[300px] space-y-4">
            <h4 className="font-bold text-foreground text-lg">Stay in the loop</h4>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on workshops and masterclasses.
            </p>

            <div className="flex gap-2 w-full max-w-sm">
              <Input
                placeholder="Enter your email"
                className="bg-background border-input rounded-xl h-11 focus-visible:ring-primary"
              />
              <Button size="icon" className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-10"></div>

        {/* BOTTOM: COPYRIGHT & SIMPLE NAV */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} TeenSkool. All rights reserved.</p>

          {/* Simple One-Row Navigation */}
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/programs" className="hover:text-foreground transition-colors">Programs</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Component
const SocialIcon = ({ href, icon }) => (
  <Link
    href={href}
    target="_blank"
    className="text-muted-foreground hover:text-primary-foreground hover:bg-primary p-2.5 rounded-full transition-all duration-300 border border-transparent hover:border-primary hover:shadow-lg"
  >
    {icon}
  </Link>
);