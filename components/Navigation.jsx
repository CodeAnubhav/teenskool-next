"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  Home,
  Users,
  Send,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LayoutGrid,
} from "lucide-react";
import logoUrl from "@/public/assets/TS.png";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Users },
    { path: "/programs", label: "Programs", icon: LayoutGrid },
    { path: "/contact", label: "Contact", icon: Send },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 py-3 border-b ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg shadow-md border-border/80"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logoUrl}
              alt="TeenSkool Logo"
              height={48}
              className="w-auto h-12"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-surface"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Auth CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              // If user is logged in, show Dashboard button
              <Link href="/dashboard">
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-semibold text-foreground bg-surface hover:bg-surface/80 transition-colors">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
              </Link>
            ) : (
              // If user is logged out, show Login and Sign Up
              <>
                <Link href="/login">
                  <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-semibold text-foreground hover:bg-surface transition-colors">
                    <LogIn className="h-5 w-5" />
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center cursor-pointer gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="md:hidden">
            {user ? (
              <Link href="/dashboard">
                <button className="p-2 rounded-full cursor-pointer hover:bg-surface">
                  <LayoutDashboard className="h-6 w-6 text-foreground" />
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="px-4 py-2 cursor-pointer bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Bottom Navbar (Mobile Only) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-surface shadow-lg border border-border rounded-full px-6 py-3 flex justify-between w-[90%] max-w-sm md:hidden">
        {navItems.map((item) => (
          <Link key={`bottom-${item.path}`} href={item.path}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isActive(item.path)
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/70 hover:bg-background"
              }`}
            >
              <item.icon className="h-6 w-6" />
            </motion.button>
          </Link>
        ))}
      </div>
    </>
  );
}