"use client";

import { motion } from "framer-motion";

export function InfiniteGridHero({ children }) {
    return (
        <div className="relative min-h-[50rem] w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Infinite Grid Background */}
            <div className="absolute inset-0 max-w-[100vw] align-top pointer-events-none">
                <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <motion.div
                    // CONTROL 1: OPACITY (Visibility)
                    // Lower the numbers to make it lighter/less visible.
                    // Currently set to: 5% opacity in light mode, 10% in dark mode.
                    className="absolute inset-0 h-[200%] w-full opacity-10 dark:opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                    animate={{
                        y: ["0%", "-50%"],
                    }}
                    transition={{
                        // CONTROL 2: SPEED (Duration)
                        // Higher number = Slower animation
                        // Lower number = Faster animation
                        duration: 120,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                    }}
                />
                {/* Radial Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
