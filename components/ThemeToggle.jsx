"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-surface border border-border hover:border-primary/50 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
            ) : (
                <Moon className="h-5 w-5 text-foreground" />
            )}
        </button>
    );
}
