"use client";

import React, { useState } from "react";
import { X, LogOut, Save, User, Mail, Loader2 } from "lucide-react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { updateProfile } from "@/lib/db";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function ProfileModal({ isOpen, onClose, userProfile }) {
    const { supabase } = useSupabase();
    const router = useRouter();

    const [fullName, setFullName] = useState(userProfile?.full_name || "");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!isOpen || !userProfile) return null;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProfile(userProfile.id, { full_name: fullName });
            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
                variant: "success",
            });
            onClose();
            // Ideally trigger a refresh of the parent state or context
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div
                className="bg-surface border border-border w-full max-w-md rounded-2xl shadow-2xl p-6 m-4 relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    My Profile
                </h2>

                <div className="space-y-6">

                    {/* Avatar Placeholder */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                            {userProfile.full_name?.[0]?.toUpperCase() || "U"}
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="pl-9 bg-background border-input"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    value={userProfile.email || ""}
                                    readOnly
                                    className="pl-9 bg-secondary/50 border-transparent text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground ml-1">Email cannot be changed.</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full font-semibold"
                        >
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                        >
                            {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
