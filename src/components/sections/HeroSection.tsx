import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

const HERO_WORDS = ['brands matter.', 'products work.', 'work smarter.'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onStartProject }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => setWordIndex((index) => (index + 1) % HERO_WORDS.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="home-hero home-hero-red relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#080808]">
      <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one pointer-events-none absolute" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two pointer-events-none absolute" aria-hidden="true" />
      <div className="hero-terrain pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
        <svg viewBox="0 0 1600 470" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="raphicsTerrain" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#37100e" />
              <stop offset=".56" stopColor="#160b0b" />
              <stop offset="1" stopColor="#090909" />
            </linearGradient>
            <linearGradient id="raphicsRidge" x1="0" x2="1">
              <stop offset="0" stopColor="#2b0b09" />
              <stop offset=".5" stopColor="#210c0b" />
              <stop offset="1" stopColor="#110909" />
            </linearGradient>
          </defs>
          <path d="M0 230C200 120 350 166 545 216c206 53 316 43 474-36 219-111 372-71 581 14v276H0Z" fill="url(#raphicsTerrain)" />
          <path d="M0 315c249-118 397-57 588-27 212 34 344-77 511-77 179 0 329 62 501 2v257H0Z" fill="url(#raphicsRidge)" />
          <path d="M0 377c239-54 381-32 574 7 245 51 360-49 575-50 165-1 294 39 451 17v126H0Z" fill="#0b0909" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pb-28 pt-32 text-center sm:px-8 sm:pb-36 sm:pt-36">
        <p className="home-hero-enter mb-7 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-300 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e53b31] shadow-[0_0_16px_rgba(213,31,22,.8)]" />
          Independent creative & technology studio
        </p>

        <h1 className="home-hero-title max-w-[1050px] text-[clamp(3rem,8.3vw,8rem)] font-semibold leading-[.91] tracking-[-.075em] text-white">
          We make<br />
          <span className="hero-word-accent inline-block" aria-live="off" key={wordIndex}>{HERO_WORDS[wordIndex]}</span>
        </h1>

        <p className="home-hero-copy mt-7 max-w-[630px] text-sm leading-7 text-neutral-300 sm:mt-8 sm:text-base sm:leading-8">
          Raphics brings thoughtful design, digital development and practical AI together to make the next step feel clear.
        </p>

        <div className="home-hero-actions mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onStartProject} className="group inline-flex items-center gap-3 rounded-full bg-[#d51f16] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b81912] hover:shadow-[0_12px_36px_rgba(213,31,22,.32)]">
            Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <button onClick={onExploreWork} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-6 py-3.5 text-sm text-neutral-100 transition-colors hover:border-white/55 hover:bg-white/[.06] hover:text-white">
            Explore our work
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-5 text-[9px] font-mono uppercase tracking-[0.17em] text-neutral-400 sm:px-8 sm:py-7">
        <span className="hidden sm:block">Digital Magic For Real Success.</span>
        <a href="#services" className="group mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-neutral-200 backdrop-blur-sm transition-colors hover:border-[#d51f16]/60 hover:text-white sm:mx-0">
          Discover the studio <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
        <span className="hidden sm:block">UK · Pakistan</span>
      </div>
    </section>
  );
};

export default HeroSection;
