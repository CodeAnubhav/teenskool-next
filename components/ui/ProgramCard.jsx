// File: app/components/ui/ProgramCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import MotionDiv from '@/components/ui/MotionDiv';
import { ArrowUpRight, Zap, Clock, Users } from 'lucide-react';

export default function ProgramCard({ program }) {
  const originalPrice = program.price + 3000;
  const imageUrl = program.Image || program.image;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <Link href={`/program/${program.id}`} className="block h-full">
        <div className="flex flex-col md:flex-row h-full rounded-3xl overflow-hidden bg-gradient-to-br from-background to-surface shadow-lg shadow-primary/10 border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30">

          {/* IMAGE SECTION */}
          <div className="relative w-full md:w-1/2 flex-shrink-0">
            <div className="aspect-video md:aspect-square md:h-full w-full overflow-hidden ">
              <Image
                src={imageUrl}
                alt={program.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow">
                Featured
              </span>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="p-6 md:p-8 flex flex-col flex-grow w-full md:w-3/5 justify-between">
            <div>
              {/* Title + Short Desc */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {program.title}
              </h3>
              <p className="text-foreground/70 text-base mb-6 leading-relaxed line-clamp-3">
                {program.shortDescription}
              </p>

              {/* Feature Tags */}
              {program.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 bg-background/80 text-foreground/90 border border-border px-3 py-1 rounded-full text-xs font-medium"
                    >
                      <Zap className="w-3 h-3 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* PRICE + CTA */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  ₹{program.price}
                </span>
                <span className="text-lg font-medium text-foreground/50 line-through">
                  ₹{originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-primary">
                <span className="hidden sm:inline">Explore</span>
                <ArrowUpRight className="w-8 h-8 p-1 rounded-full bg-primary text-background group-hover:rotate-45 group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
