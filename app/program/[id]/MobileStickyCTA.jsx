"use client";

import { useToast } from "@/components/ui/use-toast";
import { Wallet, Tag } from "lucide-react";

export default function MobileStickyCTA({ program }) {
    const { toast } = useToast();

    const safePrice = program?.price || 0;
    const originalPrice = safePrice + 2000;

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
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-30 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl safe-area-bottom animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border border-primary/20">
                            <Tag className="w-3 h-3" /> Offer
                        </span>
                        {safePrice > 0 && <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>}
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-white">₹{safePrice}</span>
                        <span className="text-xs text-muted-foreground">/ course</span>
                    </div>
                </div>

                <button
                    onClick={handleEnroll}
                    className="flex-1 max-w-[180px] flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95 transition-all"
                >
                    <Wallet className="w-4 h-4" /> Enroll Now
                </button>
            </div>
        </div>
    );
}
