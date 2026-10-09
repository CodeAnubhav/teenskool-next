"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

const AUTOPLAY_MS = 6000;

// Scrolling is native scroll-snap, so swiping still works if JS never runs.
// The buttons and dots only drive that same scroll container.
export default function QuoteCarousel({ slides }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setIndex(Math.min(Math.max(i, 0), slides.length - 1));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => goTo((index + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, slides.length, goTo]);

  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#14201a]/12 bg-white text-[#14201a] transition-colors hover:border-[#14201a]/25 hover:bg-[#f4f7f0] disabled:opacity-35 disabled:hover:bg-white";

  return (
    <div
      className="mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map(({ src, alt }, i) => (
          <li key={alt} className="w-full flex-none snap-center" aria-hidden={i !== index}>
            <Image
              src={src}
              alt={alt}
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full rounded-[1.5rem]"
              placeholder="blur"
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          className={btn}
          onClick={() => goTo(Math.max(index - 1, 0))}
          disabled={index === 0}
          aria-label="Previous quote"
        >
          <ArrowLeft weight="bold" aria-hidden className="h-4 w-4" />
        </button>

        <div className="flex items-center">
          {slides.map(({ alt }, i) => (
            <button
              key={alt}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to quote ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#4d7f12]" : "w-2 bg-[#14201a]/20"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={btn}
          onClick={() => goTo(Math.min(index + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
          aria-label="Next quote"
        >
          <ArrowRight weight="bold" aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
