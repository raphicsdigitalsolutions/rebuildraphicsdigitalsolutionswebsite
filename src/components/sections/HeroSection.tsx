/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Cinematic Hero Experience for Raphics Digital Solutions.
 * Features:
 * - Headline: WE DESIGN. WE DEVELOP. WE AUTOMATE.
 * - Interactive Three.js Logo-inspired 3D composition
 * - Three major capability pillars: CREATIVE | DEVELOPMENT | AI
 * - Dual Call-to-Actions (Explore Our Work / Start a Project)
 * - Kinetic agency metrics and live status indicators
 */

import React from 'react';
import { HeroScene } from '../3d/HeroScene';
import { BRAND_CONFIG } from '../../config/brand';
import { ArrowUpRight, Sparkles, Code, Cpu, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onStartProject,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#080808]">
      {/* Background Radial Glow & Futuristic Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-red opacity-70 pointer-events-none blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Expressive Headline & Positioning (7 cols) */}
          <div className="lg:col-span-7 z-10 space-y-6">
            
            {/* Top Verified Agency Pill */}
            <div className="hero-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D51F16]" />
              <span className="tracking-wide">CREATIVE & TECHNOLOGY AGENCY</span>
            </div>

            {/* Main Monumental Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter uppercase font-heading text-white leading-[0.98]">
                <span className="hero-line hero-line--one">{BRAND_CONFIG.heroHeadline.line1}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  <span className="hero-line hero-line--two">{BRAND_CONFIG.heroHeadline.line2}</span>
                </span>
                <br />
                <span className="text-[#D51F16] drop-shadow-[0_0_35px_rgba(213,31,22,0.45)]">
                  <span className="hero-line hero-line--three">{BRAND_CONFIG.heroHeadline.line3}</span>
                </span>
              </h1>
            </div>

            {/* Supporting Heading & Official Description */}
            <div className="hero-support space-y-3 max-w-xl">
              <h2 className="text-lg sm:text-xl font-medium text-neutral-200">
                {BRAND_CONFIG.subheading}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                {BRAND_CONFIG.heroDescription}
              </p>
            </div>

            {/* Three Major Capabilities Badges */}
            <div className="grid grid-cols-3 gap-2.5 max-w-lg pt-2">
              <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-850 flex flex-col gap-1 hover:border-[#D51F16]/50 transition-colors">
                <div className="flex items-center gap-1.5 text-neutral-200 font-mono text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D51F16]" />
                  <span>CREATIVE</span>
                </div>
                <span className="text-[11px] text-neutral-400 leading-tight">Branding & 3D Packaging</span>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-850 flex flex-col gap-1 hover:border-[#D51F16]/50 transition-colors">
                <div className="flex items-center gap-1.5 text-neutral-200 font-mono text-xs font-bold">
                  <Code className="w-3.5 h-3.5 text-[#D51F16]" />
                  <span>DEV</span>
                </div>
                <span className="text-[11px] text-neutral-400 leading-tight">Web Apps & Software</span>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-850 flex flex-col gap-1 hover:border-[#D51F16]/50 transition-colors">
                <div className="flex items-center gap-1.5 text-neutral-200 font-mono text-xs font-bold">
                  <Cpu className="w-3.5 h-3.5 text-[#D51F16]" />
                  <span>AI & LAB</span>
                </div>
                <span className="text-[11px] text-neutral-400 leading-tight">Agents & RAG Pipelines</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreWork}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-sm font-semibold tracking-wide transition-all shadow-[0_0_25px_rgba(213,31,22,0.4)] hover:shadow-[0_0_35px_rgba(213,31,22,0.6)] cursor-pointer"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={onStartProject}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-sm font-medium border border-neutral-700/80 hover:border-neutral-500 transition-all cursor-pointer"
              >
                <span>Start a Project</span>
              </button>
            </div>

            {/* Trust Assurance Markers */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Founder Profiles on External Platforms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public GitHub Repositories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Remote Project Collaboration</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Hero Scene (5 cols) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="hero-visual-frame relative w-full aspect-square max-w-[540px] rounded-3xl bg-neutral-950/60 border border-neutral-850 p-2 shadow-2xl backdrop-blur-sm overflow-hidden" data-scroll-parallax="0.045">
              <HeroScene />
            </div>
          </div>

        </div>
      </div>


      {/* Infinite capability ribbon — lightweight CSS marquee, duplicated for seamless looping. */}
      <div className="hero-marquee relative z-10" aria-label="Raphics services">
        <div className="hero-marquee-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div className="hero-marquee-group" key={groupIndex}>
              <span>Brand Identity</span><i className="hero-marquee-dot" />
              <span>3D Packaging</span><i className="hero-marquee-dot" />
              <span>Web Experiences</span><i className="hero-marquee-dot" />
              <span>Custom Software</span><i className="hero-marquee-dot" />
              <span>AI Agents</span><i className="hero-marquee-dot" />
              <span>Business Automation</span><i className="hero-marquee-dot" />
              <span>Creative Technology</span><i className="hero-marquee-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-xs text-neutral-500 font-mono pt-4 border-t border-neutral-900/60">
        <div className="flex items-center gap-2">
          <span className="text-[#D51F16]">RAPHICS</span>
          <span>// CREATIVE TECHNOLOGY LAB</span>
        </div>
        <a
          href="#about"
          className="hero-scroll-cue flex items-center gap-1 text-neutral-400 hover:text-[#D51F16] transition-colors"
        >
          <span>Scroll to Discover</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
