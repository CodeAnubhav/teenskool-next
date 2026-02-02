import { notFound } from 'next/navigation';
import Image from 'next/image';
import MotionDiv from '@/components/ui/MotionDiv';
import ProgramSidebar from './ProgramSidebar';
import MobileStickyCTA from './MobileStickyCTA';
import programs from '@/data/programs';
import {
  CheckCircle,
  BotMessageSquare,
  Sparkles,
  Rocket,
  Lightbulb,
  Clock,
  Zap,
  Cpu,
  Search,
  Trophy,
  Hammer,
  ArrowRight,
  Video,
} from 'lucide-react';

// Branded grid background (lighter + subtle)
const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--color-border)_0.5px,transparent_1px)] [background-size:24px_24px]" />
);

// Safely get program by ID
function getProgram(id) {
  if (!id) return null;
  return programs.find((p) => p.id?.trim() === id) || null;
}

export async function generateMetadata({ params }) {
  // Await the entire params object before destructuring or accessing
  const { id } = await params;
  const program = getProgram(id);

  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.title} | Teenskool`,
    description: program.shortDescription || '',
  };
}

// Segment icons
const segmentIconMap = {
  "Mindset & Setup": Cpu,
  "Idea Validation": Lightbulb,
  "Branding & Assets": Sparkles,
  "Website Deployment": Rocket,
  "Market Positioning & Analysis": Search,
  "Content Strategy": Video,
  "Pitch Deck Creation": Trophy,
  "Final Demo & Plan": Clock,
};

// Unified card style
const UnifiedCard = ({ children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-primary/5 via-background to-background p-8 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-all ${className}`}
  >
    {children}
  </div>
);

// Motion wrapper defaults
const motionDefaults = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default async function ProgramDetailPage({ params }) {
  // Await the entire params object before destructuring
  const { id } = await params;
  const program = getProgram(id);

  if (!program) notFound();

  const imageUrl = program.Image || '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <GridPattern />
      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Title & Intro */}
            <MotionDiv {...motionDefaults}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                {program.title || 'Untitled Program'}
              </h1>
              <p className="text-lg md:text-xl font-medium text-primary mb-6">
                {program.shortDescription || ''}
              </p>
              <div className="flex flex-wrap gap-3">
                {program.features?.map((feature, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    <Zap className="w-4 h-4" />
                    {feature}
                  </span>
                )) || null}
              </div>
            </MotionDiv>

            {/* Hero Image */}
            {imageUrl && (
              <MotionDiv {...motionDefaults} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                  <Image
                    src={imageUrl}
                    alt={program.title || 'Program Image'}
                    width={1200}
                    height={600}
                    className="w-full object-cover aspect-video"
                    priority
                  />
                </div>
              </MotionDiv>
            )}

            {/* Masterclass Overview */}
            <MotionDiv {...motionDefaults} transition={{ duration: 0.6, delay: 0.2 }}>
              <UnifiedCard>
                <h2 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
                  <Lightbulb className="w-7 h-7 text-primary" />
                  Masterclass Overview
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6 pb-6 border-b border-primary/10">
                  {program.description || ''}
                </p>

                <div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {program.strategy?.focusAreas?.map((focus, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold"
                      >
                        {focus}
                      </span>
                    )) || null}
                  </div>
                </div>
              </UnifiedCard>
            </MotionDiv>

            {/* Key Results */}
            <MotionDiv {...motionDefaults} transition={{ duration: 0.6, delay: 0.3 }}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                Key Results <Trophy className="w-6 h-6 text-primary" />
              </h2>
              <UnifiedCard className="p-6">
                <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                  {program.keyResults?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  )) || null}
                </ul>
              </UnifiedCard>
            </MotionDiv>

            {/* Modernized Timeline */}
            <MotionDiv {...motionDefaults} transition={{ duration: 0.6, delay: 0.4 }}>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                3-Hour Curriculum Flow <Clock className="w-6 h-6 text-primary" />
              </h2>

              <div className="relative pl-6 md:pl-10 space-y-8">
                <div className="absolute left-2 md:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/60 to-transparent" />

                {program.curriculum?.map((segment, i) => {
                  const Icon = segmentIconMap[segment.title] || Clock;
                  return (
                    <MotionDiv
                      key={i}
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <div className="absolute -left-6 md:-left-8 top-2 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-all duration-300" />
                      <div className="ml-6 md:ml-4 p-5 rounded-lg bg-surface border border-border hover:border-primary/40 transition-all">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                            <Icon className="w-5 h-5" />
                            {segment.title || 'Untitled Segment'}
                          </h3>
                          <span className="text-xs font-medium text-foreground/70">
                            {segment.timeframe || ''}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80">{segment.keyFocus || ''}</p>
                      </div>
                    </MotionDiv>
                  );
                }) || null}
              </div>
            </MotionDiv>

            {/* AI Tools */}
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
              <h2 className="text-3xl font-bold mb-6">
                AI Tools You Will Master <Hammer className="inline-block w-6 h-6 text-primary" />
              </h2>
              <UnifiedCard className="!bg-background/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {program.toolsUsed?.map((tool, i) => (
                    <MotionDiv
                      key={i}
                      className="p-4 rounded-xl border border-primary/20 bg-background text-center transition-all duration-300 hover:bg-primary/5 cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden border border-primary/50 flex items-center justify-center bg-white p-1">
                        <Image
                          src={tool.logo || 'https://placehold.co/80x80/282828/ffffff?text=TOOL'}
                          alt={`${tool.name || 'Tool'} Logo`}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-extrabold text-md text-primary">{tool.name || 'Unnamed Tool'}</h3>
                    </MotionDiv>
                  )) || null}
                </div>
              </UnifiedCard>
            </MotionDiv>

            {/* Included + Support */}
            <MotionDiv {...motionDefaults} transition={{ duration: 0.6, delay: 0.6 }}>
              <UnifiedCard>
                <h2 className="text-3xl font-bold mb-6">What’s Included</h2>
                <ul className="grid md:grid-cols-2 gap-3 border-primary/10">
                  {program.includes?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  )) || null}
                </ul>
              </UnifiedCard>
            </MotionDiv>

          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <ProgramSidebar program={program} />
          </div>
        </div>
      </div>

      <MobileStickyCTA program={program} />
    </div>
  );
}