"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-primary/20 blur-[50px] -z-10"></div>

                <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-inset ring-red-500/20">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
                <p className="text-zinc-400 mb-8 text-sm">
                    We encountered an unexpected error. Please try again or return to the homepage.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg transition-colors border border-white/5"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
