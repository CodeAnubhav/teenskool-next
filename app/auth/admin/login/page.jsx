"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Note: Middleware or Layout will verify if they are ACTUALLY an admin.
            // This form just authenticates identity.
            router.push("/dashboard/admin");
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-foreground selection:bg-purple-500/30">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md p-8">

                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                        <Shield className="w-8 h-8 text-purple-500" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Instructor Access</h1>
                    <p className="text-muted-foreground text-center">
                        Secure gateway for platform administrators.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="admin@teenskool.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                            <Lock className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_-5px_rgba(147,51,234,0.4)]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Authenticate"}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-zinc-600 uppercase tracking-widest">Restricted Area • logging enabled</p>
                </div>

            </div>
        </div>
    );
}
