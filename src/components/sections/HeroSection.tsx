import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { MinimalHeroVisual } from '../3d/MinimalHeroVisual';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onStartProject }) => (
  <section id="hero" className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between overflow-hidden bg-[#080808] pt-28 sm:pt-32">
    <div className="pointer-events-none absolute inset-0 hero-editorial-grid opacity-40" />
    <div className="pointer-events-none absolute -right-40 top-12 h-[560px] w-[560px] rounded-full bg-[#d51f16]/[0.075] blur-[140px]" />
    <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-3 px-5 pb-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-4 lg:pb-16">
      <div className="relative z-10 py-10 lg:py-0">
        <div className="home-hero-enter mb-7 inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-400">
          <span className="h-px w-8 bg-[#d51f16]" />
          Creative studio · Digital development · AI
        </div>
        <h1 className="home-hero-title max-w-[760px] text-[clamp(3.2rem,7.4vw,7.4rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-white">
          Ideas deserve<br /><span className="text-neutral-500">more than</span><br /><span className="text-[#d51f16]">ordinary.</span>
        </h1>
        <p className="home-hero-copy mt-8 max-w-[510px] text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
          We bring design, digital products and intelligent technology together — so every part of your business moves in the same direction.
        </p>
        <div className="home-hero-actions mt-9 flex flex-wrap items-center gap-3">
          <button onClick={onStartProject} className="group inline-flex items-center gap-3 rounded-full bg-[#d51f16] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b81912] hover:shadow-[0_12px_36px_rgba(213,31,22,.24)]">
            Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <button onClick={onExploreWork} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-neutral-300 transition-colors hover:border-white/35 hover:text-white">
            Explore our work
          </button>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-600">
          <span>01 / Design</span><span>02 / Build</span><span>03 / Automate</span>
        </div>
      </div>
      <div className="home-hero-art relative mx-auto w-full max-w-[590px] lg:translate-x-5">
        <MinimalHeroVisual />
        <div className="absolute right-0 top-[15%] hidden text-right text-[9px] font-mono uppercase leading-5 tracking-[0.18em] text-neutral-600 sm:block">Form follows<br />function</div>
      </div>
    </div>
    <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/[0.08] px-5 py-5 text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-600 sm:px-8">
      <span>Raphics Digital Solutions</span>
      <a href="#services" className="group inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-white">
        Discover what we do <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
      </a>
      <span className="hidden sm:block">Digital magic for real success.</span>
    </div>
  </section>
);

export default HeroSection;
