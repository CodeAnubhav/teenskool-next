"use client";

import { useToast } from "@/components/ui/use-toast";
import { Wallet, Tag } from "lucide-react";

export default function MobileStickyCTA({ program }) {
    const { toast } = useToast();

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
                        description: `Thank photo for enrolling. Payment ID: ${response.razorpay_payment_id}`,
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-t border-[#a3e635]/20 px-6 py-4 shadow-[0_-10px_40px_-20px_rgba(163,230,53,0.2)] safe-area-bottom animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                        <span className="text-[#a3e635] font-bold uppercase tracking-widest text-xs">Final Call</span>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1 md:mb-0">
                            <span className="md:hidden bg-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-[#a3e635]/20">
                                <Tag className="w-3 h-3" /> Offer
                            </span>
                            {safePrice > 0 && <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl md:text-2xl font-black text-white">₹{safePrice}</span>
                            <span className="text-xs text-muted-foreground font-medium">/ complete course</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <p className="hidden md:block text-sm text-gray-400 font-medium">
                        Only <span className="text-white font-bold">25 Slots Left!</span>
                    </p>
                    <button
                        onClick={handleEnroll}
                        className="min-w-[160px] md:min-w-[200px] flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#a3e635]/90 text-black font-black py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.4)] active:scale-95 transition-all text-sm md:text-base uppercase tracking-wide"
                    >
                        <Wallet className="w-5 h-5" /> Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
}
