import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export const ClosingCTASection: React.FC = () => (
  <section id="contact" className="relative overflow-hidden border-t border-white/[0.08] bg-[#0b0b0b] py-24 sm:py-32">
    <div className="pointer-events-none absolute -right-40 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-[#d51f16]/10 blur-[110px]" />
    <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl" data-reveal>
        <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">Have something in mind?</p>
        <h2 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl">
          Let’s make your next move <span className="text-neutral-500">a good one.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">Tell us what you’re trying to build. We’ll help find the right mix of design, development and intelligent technology.</p>
      </div>
      <a href={`mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent('New project — Raphics Digital Solutions')}`} className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#d51f16] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b81912] hover:shadow-[0_12px_36px_rgba(213,31,22,.22)]">
        <Mail className="h-4 w-4" /> Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </div>
  </section>
);
export default ClosingCTASection;
