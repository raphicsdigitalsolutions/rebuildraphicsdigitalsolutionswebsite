import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { MinimalHeroVisual } from '../3d/MinimalHeroVisual';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onStartProject }) => (
  <section id="hero" className="home-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#080808]">
    <div className="hero-atmosphere pointer-events-none absolute inset-0" />
    <div className="hero-horizon pointer-events-none absolute inset-x-0 bottom-0 h-52" />

    <div className="home-hero-content relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col items-center px-5 pb-2 pt-24 text-center sm:px-8 sm:pt-24">
      <div className="home-hero-enter mb-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400 sm:mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d51f16] shadow-[0_0_16px_rgba(213,31,22,.72)]" />
        Independent digital studio
      </div>

      <h1 className="home-hero-title flex max-w-[1420px] flex-wrap justify-center gap-x-[0.28em] text-[clamp(2.45rem,6.1vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-white">
        <span>Brand.</span><span className="hero-word-muted">Product.</span><span className="hero-word-accent">Intelligence.</span>
      </h1>

      <p className="home-hero-copy mt-4 max-w-[600px] text-sm leading-6 text-neutral-300 sm:mt-5 sm:text-base sm:leading-7">
        Creative identity, digital platforms and practical AI—shaped to work together from one studio.
      </p>

      <div className="home-hero-actions mt-6 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onStartProject} className="group inline-flex items-center gap-3 bg-[#d51f16] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b81912] hover:shadow-[0_12px_36px_rgba(213,31,22,.28)]">
          Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
        <button onClick={onExploreWork} className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm text-neutral-200 transition-colors hover:border-white/55 hover:text-white">
          Explore our work
        </button>
      </div>

      <div className="home-hero-art relative mt-1 w-full max-w-[1120px] sm:mt-2">
        <div className="hero-art-halo pointer-events-none absolute inset-[11%] rounded-full" />
        <MinimalHeroVisual />
      </div>
    </div>

    <div className="relative z-10 mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 border-t border-white/[0.12] px-5 py-4 text-[9px] font-mono uppercase tracking-[0.16em] text-neutral-500 sm:px-8 sm:py-[18px]">
      <span>Digital Magic For Real Success.</span>
      <a href="#services" className="group inline-flex shrink-0 items-center gap-2 text-neutral-300 transition-colors hover:text-white">
        Enter the studio <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
      </a>
      <span className="hidden sm:block">UK · Pakistan</span>
    </div>
  </section>
);

export default HeroSection;
