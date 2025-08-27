// File: app/components/ui/ProgramCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import MotionDiv from '@/components/ui/MotionDiv';
import { ArrowUpRight } from 'lucide-react';

export default function ProgramCard({ program }) {
  // Calculate a dummy original price for demonstration
  const originalPrice = program.price + 2000;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <Link href={`/program/${program.id}`} className="block h-full">
        <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-surface shadow-lg shadow-black/20 border border-border transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-2">
          
          {/* Program Image */}
          <div className="relative overflow-hidden aspect-video">
            <Image
              src={program.image}
              alt={program.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {program.title}
            </h3>
            <p className="text-foreground/80 text-sm mb-4 flex-grow">
              {program.shortDescription}
            </p>

            {/* Feature Tags */}
            {program.features?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {program.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* --- UPDATED Footer of the card --- */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary">
                  ₹{program.price}
                </span>
                <span className="text-md font-medium text-foreground/50 line-through">
                  ₹{originalPrice}
                </span>
              </div>
              <ArrowUpRight className="w-6 h-6 text-foreground/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}