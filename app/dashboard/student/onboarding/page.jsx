"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabase } from "@/contexts/SupabaseContext";
import { ONBOARDING_QUIZ, XP_RULES } from "@/lib/gamification";
import { updateProfile } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Trophy } from "lucide-react";
import Image from "next/image";
import logoUrl from "@/public/assets/TS.png";

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useSupabase();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { qId: optionIndex }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [scoreData, setScoreData] = useState(null);

    const currentQuestion = ONBOARDING_QUIZ[currentQuestionIndex];
    const totalQuestions = ONBOARDING_QUIZ.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleOptionSelect = (optionIndex) => {
        setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // 1. Calculate Score
        let totalScore = 0;
        let correctCount = 0;

        ONBOARDING_QUIZ.forEach(q => {
            const userAnswer = answers[q.id];
            if (userAnswer === q.correct_index) {
                totalScore += q.points;
                correctCount++;
            }
        });

        // 2. Determine Initial Role (Gamification Logic)
        const roleId = correctCount >= 4 ? "role_founder" : "role_novice";
        const baseXP = XP_RULES.ONBOARDING_COMPLETE + totalScore;

        // 3. Update Profile (Real DB)
        if (user) {
            try {
                // Determine 'level' or just save XP. DB has 'xp'.
                // DB also has 'level' column? Maybe, but XP drives logic.
                // We'll update xp and onboarding_completed.
                await updateProfile(user.id, {
                    onboarding_completed: true,
                    xp: baseXP,
                    // We don't save roleId to DB as it is computed from XP in UI.
                    // But if we had a gamification table we would. 
                    // For now, XP is the source of truth.
                });
            } catch (err) {
                console.error("Failed to save onboarding:", err);
                // Continue anyway to show success screen
            }
        }

        // Simulate delay for drama
        setTimeout(() => {
            setScoreData({
                xp: baseXP,
                role: roleId === "role_founder" ? "Founder" : "Novice",
                correct: correctCount
            });
            setIsSubmitting(false);
            setShowResult(true);
        }, 1500);
    };

    const handleEnterDashboard = () => {
        // Just refresh/replace to trigger the Layout check which will redirect to /dashboard
        window.location.href = "/dashboard";
    };

    // SUCCESS SCREEN
    if (showResult && scoreData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
                >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/10">
                        <Trophy className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-white">Quiz Complete!</h2>
                    <p className="text-zinc-400 mb-8">
                        You answered <strong className="text-white">{scoreData.correct}/{totalQuestions}</strong> correctly.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">XP Earned</div>
                            <div className="text-2xl font-bold text-primary">+{scoreData.xp}</div>
                        </div>
                        <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Role Assigned</div>
                            <div className="text-2xl font-bold text-white">{scoreData.role}</div>
                        </div>
                    </div>

                    <Button onClick={handleEnterDashboard} className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold">
                        Enter Dashboard
                    </Button>
                </motion.div>
            </div>
        );
    }

    // QUIZ SCREEN
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.03),transparent_60%)] pointer-events-none" />

            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                            <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-lg">Onboarding</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                        {currentQuestionIndex + 1} / {totalQuestions}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-secondary rounded-full mb-12 overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-2xl"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground leading-tight">
                        {currentQuestion?.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion?.options.map((option, idx) => {
                            const isSelected = answers[currentQuestion.id] === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`
                             group flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                             ${isSelected
                                            ? "border-primary bg-primary/5 shadow-[0_0_15px_-3px_rgba(163,230,53,0.2)]"
                                            : "border-border hover:border-primary/50 hover:bg-accent"
                                        }
                           `}
                                >
                                    <div className={`
                                w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors
                                ${isSelected ? "border-primary bg-primary text-black" : "border-muted-foreground group-hover:border-primary"}
                            `}>
                                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                    <span className={`text-lg ${isSelected ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                                        {option}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-10 flex justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={answers[currentQuestion.id] === undefined || isSubmitting}
                            className="h-12 px-8 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                currentQuestionIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
