"use client";

import React, { useState } from "react";
import MotionDiv from "@/components/ui/MotionDiv";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import { Wallet, CalendarDays, Clock, Users, Award, Zap, Tag } from "lucide-react";

export default function ProgramSidebar({ program, userProgress }) {
  // Safety check for pricing before calculating originalPrice
  const safePrice = program.price || 0;
  const originalPrice = safePrice + 2000;

  const [showPayment, setShowPayment] = useState(false);

  const handleEnroll = () => {
    setShowPayment(true);
  };

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="sticky top-28 rounded-3xl border border-border shadow-2xl shadow-primary/10 overflow-hidden"
      >
        <div className="relative bg-surface p-8 space-y-8">

          {/* Pricing Block - Safe access to price */}
          <div className="bg-primary/10 p-5 rounded-xl border border-primary/20 text-center">
            <p className="text-sm uppercase font-semibold text-primary mb-1 flex items-center justify-center gap-2">
              <Tag className="w-4 h-4" /> Limited Time Price
            </p>
            <div className="flex items-center justify-center gap-4">
              <p className="text-4xl font-extrabold text-foreground">₹{safePrice}</p>
              {safePrice > 0 && (
                <p className="text-xl font-medium text-foreground/50 line-through">
                  ₹{originalPrice}
                </p>
              )}
            </div>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            className="w-full flex cursor-pointer items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <Wallet className="w-5 h-5" /> Enroll Now & Start Building
          </button>

          {/* Program Info Grid (FIXED: Accessing format and level) */}
          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-lg font-bold mb-4">Masterclass Details</h3>
            <div className="grid grid-cols-2 gap-6 text-sm">

              <div className="flex flex-col items-start gap-1">
                <Zap className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground/90">Key Focus</p>
                <p className="text-foreground/70">{program.features?.[0] || 'Idea to Prototype Workflow'}</p>
              </div>

              <div className="flex flex-col items-start gap-1">
                <Clock className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground/90">Duration</p>
                <p className="text-foreground/70">{program.duration}</p>
              </div>

              {/* CORRECTED: Format */}
              <div className="flex flex-col items-start gap-1">
                <Users className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground/90">Format</p>
                {/* Added optional chaining for safety */}
                <p className="text-foreground/70">{program.format} {program.maxStudents ? `(Max ${program.maxStudents})` : ''}</p>
              </div>

              {/* CORRECTED: Level */}
              <div className="flex flex-col items-start gap-1">
                <Award className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground/90">Level</p>
                <p className="text-foreground/70">{program.level}</p>
              </div>


            </div>
          </div>

          {/* Progress Tracker (Optional) */}
          {userProgress && (
            <div className="border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground/80 mb-2">
                Your Progress: {userProgress.completedLessons} / {userProgress.totalLessons} lessons
              </p>
              <div className="w-full h-2.5 bg-background rounded-full overflow-hidden">
                <div
                  className="h-2.5 bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </MotionDiv>
      <UPIPaymentModal open={showPayment} onOpenChange={setShowPayment} program={program} />
    </>
  );
}