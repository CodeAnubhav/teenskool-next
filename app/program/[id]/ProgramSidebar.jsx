"use client";

import { useToast } from "@/components/ui/use-toast";
import MotionDiv from "@/components/ui/MotionDiv";
import { Wallet, CalendarDays, Clock, ShieldCheck, CheckCircle, Award } from "lucide-react";

export default function ProgramSidebar({ program, userProgress }) {
  const { toast } = useToast();

  const handleEnroll = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      toast({
        title: "Payment Error",
        description: "Could not load the payment gateway. Please try again.",
        variant: "destructive",
      });
    };

    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: program.price * 100,
        currency: 'INR',
        name: 'Teenskool',
        description: `Enrollment for ${program.title}`,
        image: '/assets/TSlogo.png',
        handler: function (response) {
          toast({
            title: "Payment Successful!",
            description: `Thank you for enrolling. Payment ID: ${response.razorpay_payment_id}`,
            action: (
              <div className="p-2 bg-green-500 text-white rounded-full">
                <CheckCircle />
              </div>
            ),
          });
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "9999999999",
        },
        theme: { color: '#f59e0b' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="sticky top-28 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
    >
      {/* Pattern Background */}
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative p-8 space-y-6">
          
          {/* Program Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <CalendarDays className="h-5 w-5 text-yellow-600 mb-1" />
              <p className="font-semibold text-slate-800">Next Batch</p>
              <p className="text-slate-500">{program.nextBatch}</p>
            </div>
            <div>
              <Clock className="h-5 w-5 text-yellow-600 mb-1" />
              <p className="font-semibold text-slate-800">Duration</p>
              <p className="text-slate-500">{program.duration}</p>
            </div>
            <div className="col-span-2">
              <ShieldCheck className="h-5 w-5 text-yellow-600 mb-1" />
              <p className="font-semibold text-slate-800">Curriculum</p>
              <p className="text-slate-500">{program.curriculum}</p>
            </div>
          </div>

          {/* Optional: Progress Tracker if enrolled */}
          {userProgress && (
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">
                Progress: {userProgress.completedLessons} / {userProgress.totalLessons} lessons
              </p>
              <div className="w-full h-2 bg-slate-200 rounded-full">
                <div
                  className="h-2 bg-yellow-500 rounded-full"
                  style={{
                    width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Program Fee & Enroll */}
          <div className="border-t border-slate-200 pt-6">
            <p className="text-slate-500 mb-1">Program Fee</p>
            <p className="text-4xl font-bold text-slate-900 mb-4">₹{program.price}</p>
            <button
              onClick={handleEnroll}
              className="w-full cursor-pointer flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg shadow-lg shadow-yellow-400/20 transition-all duration-300 transform hover:scale-105"
            >
              <Wallet className="w-5 h-5" /> Enroll Now
            </button>
          </div>

        </div>
      </div>
    </MotionDiv>
  );
}