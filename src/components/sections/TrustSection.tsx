/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Professional Credibility Section for Raphics Digital Solutions.
 * "TRUST BUILT THROUGH REAL WORK."
 * Authentic platform profiles for Behance, GitHub, Fiverr, Upwork, FusionArt, and Instagram.
 * Fully transparent regarding founder freelance background vs agency structure.
 */

import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { ArrowUpRight, Github, ExternalLink, ShieldCheck, Sparkles, Globe } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      handle: 'raphicsdigitalsolutions',
      url: BRAND_CONFIG.profiles.github.url,
      description: 'Public software repositories, prototypes and development experiments.',
      badge: 'SOURCE CODE REPOSITORIES',
      type: 'Technical Hub',
      accent: '#2563EB',
    },
    {
      id: 'behance',
      name: 'Behance',
      handle: 'artisticatta',
      url: BRAND_CONFIG.profiles.behance.url,
      description: 'Published packaging, product visualization and brand identity work.',
      badge: 'CREATIVE ARCHIVE',
      type: 'Design Gallery',
      accent: '#059669',
    },
    {
      id: 'fiverr',
      name: 'Fiverr',
      handle: 'Freelance Design Account',
      url: BRAND_CONFIG.profiles.fiverr.url,
      description: 'Individual freelance profile for product packaging, label design, and 3D visual mockups.',
      badge: 'FREELANCE PROFILE',
      type: 'Marketplace',
      accent: '#10B981',
    },
    {
      id: 'upwork',
      name: 'Upwork',
      handle: 'Professional Freelancer',
      url: BRAND_CONFIG.profiles.upwork.url,
      description: 'Direct freelance contracting for brand packaging systems and custom digital design projects.',
      badge: 'FREELANCE CONTRACTING',
      type: 'Professional Network',
      accent: '#14B8A6',
    },
    {
      id: 'fusionart',
      name: 'FusionArt',
      handle: 'Artistic Profile',
      url: BRAND_CONFIG.profiles.fusionart.url,
      description: 'Creative profile and published visual work.',
      badge: 'CREATIVE PROFILE',
      type: 'Artistic Showcase',
      accent: '#8B5CF6',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@raphicsdigitalsolutions',
      url: BRAND_CONFIG.profiles.instagram.url,
      description: 'Visual identity explorations, 3D motion reels, and studio work in progress.',
      badge: 'SOCIAL PRESENCE',
      type: 'Design Updates',
      accent: '#EC4899',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>PROFESSIONAL CREDIBILITY & PLATFORMS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
            Trust Built Through <span className="text-[#D51F16]">Real Work.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Explore our work, development projects and professional experience across leading creative and freelance platforms.
          </p>
        </div>

        {/* 6 Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/60 transition-all flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800 uppercase">
                    {platform.type}
                  </span>
                  <div className="p-2 rounded-xl bg-neutral-900 text-neutral-400 group-hover:text-[#D51F16] group-hover:bg-neutral-850 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors">
                    {platform.name}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 block mt-0.5">
                    {platform.handle}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {platform.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 font-semibold">{platform.badge}</span>
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  Open Profile &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Professional Governance & Transparency Notice */}
        <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-400 leading-relaxed">
          <strong className="text-white block font-mono mb-1">
            Governance & Attribution Disclosure:
          </strong>
          {BRAND_CONFIG.transparencyNote}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
