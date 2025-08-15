'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProgramCard from '@/components/ui/ProgramCard'; // Using your custom component
import programs from '@/data/programs';

// Consistent background pattern from your 'About' page design
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
);

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 relative">
      <GridPattern />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24 pt-32 pb-20 px-6">
        
        {/* --- Hero Section --- */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <p className="uppercase text-sm tracking-widest text-yellow-600 font-semibold">
              Our Programs
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              A Launchpad for Young
              <span className="text-yellow-500 block mt-2">Innovators & Builders</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto pt-4">
              Our hands-on workshops and bootcamps are designed to turn curiosity into capability. Explore our programs and find your passion.
            </p>
          </motion.div>
        </section>

        {/* --- Programs Grid Section --- */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}