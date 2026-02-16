"use client";

import { useToast } from "@/components/ui/use-toast";
import { Wallet, Tag, Clock } from "lucide-react";

// ... imports
import React, { useState, useEffect } from "react";

export default function MobileStickyCTA({ program }) {
    const { toast } = useToast();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Show after scrolling past Hero (approx 500px)
            setIsVisible(scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const safePrice = program?.price || 0;
    const originalPrice = safePrice + 3000;

    const handleEnroll = () => {
        if (typeof window === 'undefined') {
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onerror = () => {
            toast({
                title: "Payment Error",
                description: "Could not load the payment gateway. Please try again.",
                variant: "destructive",
            });
        };

        script.onload = () => {
            if (typeof window.Razorpay === 'undefined') {
                script.onerror();
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: safePrice * 100,
                currency: "INR",
                name: "Teenskool",
                description: `Enrollment for ${program.title}`,
                image: "/assets/TSlogo.png",
                handler: function (response) {
                    toast({
                        title: "Payment Successful!",
                        description: `Thank you for enrolling. Payment ID: ${response.razorpay_payment_id}`,
                        variant: "success",
                        className: "bg-green-500 text-white"
                    });
                },
                prefill: {
                    name: "Student Name",
                    email: "student@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#a3e635" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        document.body.appendChild(script);
    };

    if (!program) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[600px] z-30 safe-area-bottom transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"
                }`}
        >
            <div className="bg-black/60 backdrop-blur-xl border-t md:border border-[#a3e635]/20 md:rounded-full px-6 py-4 md:py-3 shadow-[0_-10px_40px_-20px_rgba(163,230,53,0.1)] md:shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between gap-4 md:gap-8">

                    {/* Left: Urgency & Price */}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                        <div className="hidden md:flex items-center gap-2 bg-[#a3e635]/10 px-3 py-1 rounded-full border border-[#a3e635]/20">
                            <Clock className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" />
                            <span className="text-[#a3e635] font-bold uppercase tracking-widest text-[10px]">Final Call</span>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1 md:mb-0">
                                <span className="md:hidden bg-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-[#a3e635]/20">
                                    <Tag className="w-3 h-3" /> Offer
                                </span>
                                {safePrice > 0 && <span className="text-xs text-muted-foreground line-through decoration-white/30">₹{originalPrice}</span>}
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl md:text-2xl font-black text-white tracking-tight">₹{safePrice}</span>
                                <span className="text-xs text-stone-400 font-medium hidden md:inline-block">/ lifetime access</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex items-center gap-6">
                        <p className="hidden md:block text-xs text-stone-400 font-medium text-right leading-tight">
                            Only <span className="text-white font-bold">25 Slots Left!</span><br />
                            <span className="text-[10px] text-stone-500">Secure enrollment</span>
                        </p>
                        <button
                            onClick={handleEnroll}
                            className="min-w-[160px] md:min-w-[180px] flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#b2f34c] text-black font-black py-3 px-6 md:py-3.5 md:px-8 rounded-xl md:rounded-full shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] active:scale-95 transition-all text-sm md:text-base uppercase tracking-wide"
                        >
                            <Wallet className="w-5 h-5" /> Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
