'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ProgramCard from '@/components/ui/ProgramCard';
import programs from '@/data/programs';

// Corrected GridPattern for dark theme
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] animate-grid-scroll" />
);

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
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
            <p className="uppercase text-sm tracking-widest text-primary font-semibold">
              Our Programs
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              A Launchpad for Young
              <span className="text-primary block mt-2">Innovators & Builders</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto pt-4">
              Our hands-on workshops and bootcamps are designed to turn curiosity into capability. Explore our programs and find your passion.
            </p>
          </motion.div>
        </section>

        {/* --- Programs Grid Section --- */}
        <section>
          {/* FIX: Changed the grid structure to center a single element */}
          <div className="flex justify-center">
            {/* The inner card will take a max width (md:max-w-xl) and be centered */}
            <div className="w-full max-w-4xl">
              {/* Only map the first (and only) program */}
              {programs.slice(0, 1).map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  // Pass a prop to the card indicating it should be full-width if needed
                  isSingleCard={true}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}