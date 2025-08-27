"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedLogo from "./ui/AnimatedLogo";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/programs", label: "Programs" },
];

const socialLinks = [
  // Keeping your existing SVG icons
  {
    href: "https://twitter.com/teenskool",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {" "}
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />{" "}
      </svg>
    ),
  },
  {
    href: "https://instagram.com/teenskool",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {" "}
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 0C9.81 0 9.448.01 8.378.057c-1.136.048-1.922.232-2.582.494a6.897 6.897 0 00-2.02 1.257A6.897 6.897 0 001.735 3.83c-.262.66-.446 1.446-.494 2.582C1.192 7.49 1.18 7.85 1.18 10.14s.01 2.65.057 3.72c.048 1.136.232 1.922.494 2.582a6.897 6.897 0 001.257 2.02 6.897 6.897 0 002.02 1.257c.66.262 1.446.446 2.582.494C9.51 22.81 9.87 22.82 12.16 22.82s2.65-.01 3.72-.057c1.136-.048 1.922-.232 2.582-.494a6.897 6.897 0 002.02-1.257 6.897 6.897 0 001.257-2.02c.262-.66.446-1.446.494-2.582.048-1.07.057-1.43.057-3.72s-.01-2.65-.057-3.72c-.048-1.136-.232-1.922-.494-2.582a6.897 6.897 0 00-1.257-2.02A6.897 6.897 0 0018.884 1.735c-.66-.262-1.446-.446-2.582-.494C15.21 1.19 14.85 1.18 12.56 1.18H12zM12 6.848c-3.31 0-6.002 2.692-6.002 6.002s2.692 6.002 6.002 6.002 6.002-2.692 6.002-6.002S15.31 6.848 12 6.848zM12 16.95a4.95 4.95 0 110-9.9 4.95 4.95 0 010 9.9zM19.152 5.34a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          clipRule="evenodd"
        />{" "}
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-12 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - About & Socials */}
          <div className="md:col-span-2 space-y-4">
            <AnimatedLogo /> {/* Use the new client component here */}
            <p className="text-foreground/80 text-sm leading-relaxed max-w-md">
              At Teenskool, we empower students to explore entrepreneurship and
              AI through hands-on workshops led by real startup founders. No
              prior experience needed—just ideas and curiosity!
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li key="/">
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-sm tracking-wider uppercase">
              Contact Us
            </h4>
            <div className="space-y-3 text-foreground/80 text-sm">
              <a
                href="mailto:info@teenskool.in"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-foreground/70" />
                info@teenskool.in
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-foreground/70" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-foreground/70" />
                Gurugram, Haryana
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} Teenskool. All rights reserved.
            <span className="mx-2">|</span>
            Coded & Crafted with ❤️ in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}