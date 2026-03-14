"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Smartphone, CheckCircle, ShieldCheck, IndianRupee } from "lucide-react";

export default function UPIPaymentModal({ open, onOpenChange, program }) {
    const router = useRouter();
    const price = program?.price || 0;
    const upiId = "9582405745@pthdfc"; // Replace with your actual UPI ID
    const payeeName = "Teenskool";

    // Generate standard UPI deep link URI
    const upiURI = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${price}&cu=INR&tn=${encodeURIComponent(`Enrollment: ${program?.title || "Program"}`)}`;

    const handleComplete = () => {
        onOpenChange(false);
        router.push("/dashboard/student");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-0 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-br from-[#a3e635]/10 to-transparent p-6 pb-4 border-b border-white/5">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-white tracking-tight">
                            Complete Payment
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-sm mt-1">
                            Scan the QR code below with any UPI app to pay
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="px-6 pb-6 space-y-6">

                    {/* Price Display */}
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/20">
                        <IndianRupee className="w-5 h-5 text-[#a3e635]" />
                        <span className="text-3xl font-black text-white tracking-tight">₹{price}</span>
                        <span className="text-xs text-gray-400 font-medium ml-1">one-time</span>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-5 rounded-2xl shadow-[0_0_40px_-10px_rgba(163,230,53,0.2)]">
                            <QRCodeSVG
                                value={upiURI}
                                size={200}
                                level="H"
                                includeMargin={false}
                                bgColor="#ffffff"
                                fgColor="#000000"
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Google Pay • PhonePe • Paytm • Any UPI App</span>
                        </div>
                    </div>

                    {/* UPI ID display */}
                    <div className="text-center">
                        <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">UPI ID</p>
                        <p className="text-sm font-mono font-bold text-[#a3e635] bg-[#a3e635]/10 inline-block px-4 py-1.5 rounded-full border border-[#a3e635]/20">
                            {upiId}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleComplete}
                        className="w-full flex items-center justify-center gap-2.5 bg-[#a3e635] hover:bg-[#b2f34c] text-black font-black text-base py-4 rounded-xl shadow-[0_0_30px_-5px_rgba(163,230,53,0.4)] hover:shadow-[0_0_40px_-5px_rgba(163,230,53,0.6)] active:scale-[0.98] transition-all"
                    >
                        <CheckCircle className="w-5 h-5" /> I Have Paid — Access Course
                    </button>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]/50" />
                        Secure UPI Transaction • Instant Access
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
