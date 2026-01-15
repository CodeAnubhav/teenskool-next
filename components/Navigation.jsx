"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSupabase } from "@/contexts/SupabaseContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import logoUrl from "@/public/assets/TS.png";
import {
  LayoutDashboard,
  LogIn,
  UserPlus,
  Home,
  Users,
  LayoutGrid,
  Send
} from "lucide-react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();
  const { user } = useSupabase();



  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Users },
    { path: "/programs", label: "Programs", icon: LayoutGrid },
    { path: "/contact", label: "Contact", icon: Send },
  ];

  const isActive = (path) => pathname === path;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide navigation on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full border-b border-transparent md:transition-all md:ease-out',
        {
          'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-6xl md:rounded-full md:border md:shadow-lg':
            scrolled && !open,
          'bg-background/90': open,
          'md:max-w-6xl md:mt-4': !scrolled
        },
      )}
    >
      <nav
        className={cn(
          'flex h-16 w-full items-center justify-between px-4 md:h-16 md:transition-all md:ease-out',
          {
            'md:px-6': scrolled,
          },
        )}
      >
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          <Image
            src={logoUrl}
            alt="TeenSkool Logo"
            height={48}
            width={48}
            className="w-auto h-12 object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                isActive(link.path) && "bg-accent text-accent-foreground font-semibold",
                "text-base"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link href="/dashboard">
              <Button>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/student/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/student/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="z-50">
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'bg-background/95 backdrop-blur-xl fixed inset-0 z-40 flex flex-col overflow-y-auto pt-20 pb-6 px-6 md:hidden transition-all duration-300 ease-in-out',
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
        )}
      >
        <div className="flex flex-col gap-6 h-full">
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  buttonVariants({
                    variant: isActive(link.path) ? 'secondary' : 'ghost',
                    size: 'lg',
                    className: 'justify-start w-full text-lg font-medium',
                  })
                )}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <Link href="/dashboard" className="w-full">
                <Button className="w-full" size="lg">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/student/login" className="w-full">
                  <Button variant="outline" className="w-full" size="lg">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/student/signup" className="w-full">
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}