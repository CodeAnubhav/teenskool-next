// File: app/program/[id]/page.jsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import MotionDiv from '@/components/ui/MotionDiv';
import ProgramSidebar from './ProgramSidebar';
import programs from '@/data/programs'; // Import the programs data
import { CheckCircle } from 'lucide-react';

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
);

// This function fetches the data for the page, now with added robustness
function getProgram(id) {
    // FIX: Trim whitespace from program IDs to prevent matching errors
    return programs.find((p) => p.id.trim() === id);
}

// This function generates metadata (like the page title) for the page
export async function generateMetadata({ params }) {
  const program = getProgram(params.id);
  if (!program) {
    return { title: 'Program Not Found' };
  }
  return {
    title: `${program.title} | Teenskool`,
    description: program.shortDescription,
  };
}

// The main page component is a Server Component
export default function ProgramDetailPage({ params }) {
  const program = getProgram(params.id);

  // If no program is found for the given ID, show a 404 page
  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative">
      <GridPattern />
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Left Content Column */}
          <div className="lg:col-span-2 space-y-10">
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{program.title}</h1>
              <p className="text-lg text-slate-600">{program.shortDescription}</p>
            </MotionDiv>
            
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <Image src={program.image} alt={program.title} width={1200} height={600} className="w-full object-cover aspect-video" />
              </div>
            </MotionDiv>
            
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Program</h2>
                <div className="prose prose-slate max-w-none text-slate-600">{program.description}</div>
              </div>
            </MotionDiv>
            
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">What’s Included</h2>
                <ul className="space-y-3">
                  {program.includes?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-1">
            <ProgramSidebar program={program} />
          </div>

        </div>
      </div>
    </div>
  );
}
