import { notFound } from 'next/navigation';
import programs from '@/data/programs';
import ProgramContent from './ProgramContent';

// Safely get program by ID
function getProgram(id) {
  if (!id) return null;
  return programs.find((p) => p.id?.trim() === id) || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const program = getProgram(id);

  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.title} | Teenskool`,
    description: program.shortDescription || '',
  };
}

export default async function ProgramDetailPage({ params }) {
  const { id } = await params;
  const program = getProgram(id);

  if (!program) notFound();

  return <ProgramContent program={program} />;
}