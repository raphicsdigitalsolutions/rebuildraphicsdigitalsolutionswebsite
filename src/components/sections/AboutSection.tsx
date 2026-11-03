/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * About Section for Raphics Digital Solutions.
 * "CREATIVE MINDS. TECHNOLOGICAL THINKING. REAL-WORLD SOLUTIONS."
 * Connects agency vision, creative philosophy, software rigor, and international track record.
 */

import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { Sparkles, Code2, Cpu, Globe2, Award, Terminal, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
      {/* Subtle Grid & Lighting Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#D51F16]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill & Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>01 // WHO WE ARE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white leading-tight">
            Creative Minds.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-400">
              Technological Thinking.
            </span>{' '}
            <span className="text-[#D51F16]">Real-World Solutions.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Raphics Digital Solutions brings creativity, engineering, and artificial intelligence together
            to help businesses build distinctive brands and powerful digital experiences.
            We work across visual identity, packaging, web development, custom software, and intelligent
            automation &mdash; connecting creative vision with practical technology.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1: Creative Philosophy */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#D51F16]/10 border border-[#D51F16]/20 flex items-center justify-center mb-5 text-[#D51F16] group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              Creative Philosophy
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              We reject formulaic templates. Every identity and package is engineered with geometric intention, tactile realism, and visual contrast that commands shelf attention.
            </p>
          </div>

          {/* Pillar 2: Development Expertise */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mb-5 text-neutral-200 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              Development Expertise
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Full-stack software built on modern TypeScript, React, and resilient database architectures. We create high-throughput web apps, custom ERPs, and real-time dashboards.
            </p>
          </div>

          {/* Pillar 3: AI & Automation */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#D51F16]/10 border border-[#D51F16]/20 flex items-center justify-center mb-5 text-[#D51F16] group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              AI Capabilities
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Moving beyond toys into production intelligence. We engineer Retrieval-Augmented Generation (RAG) knowledge systems, autonomous agentic loops, and voice triage bots.
            </p>
          </div>

          {/* Pillar 4: Global Freelance Rigor */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mb-5 text-neutral-200 group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">
              Global Delivery
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Vetted on top international freelance platforms (Fiverr, Upwork, FusionArt). We maintain a proven track record of reliable delivery for clients in the US, UK, UAE, and beyond.
            </p>
          </div>

        </div>

        {/* Agency vs Founder Credential Integrity Box */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-[#D51F16]" />
                <span>Transparent Professional Track Record</span>
              </div>
              <h4 className="text-2xl font-heading font-bold text-white">
                Independent Agency Powered by Proven Creative Leadership
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Raphics Digital Solutions operates as an independent, multi-disciplinary digital agency.
                Our foundation is rooted in our founder’s verified freelance excellence &mdash; rated 5.0 across
                leading global marketplaces &mdash; combined with our collaborative network of specialized engineers,
                3D artists, and AI researchers.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={BRAND_CONFIG.profiles.behance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-200 transition-colors group"
              >
                <span>Behance Creative Gallery</span>
                <ArrowUpRight className="w-4 h-4 text-[#D51F16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={BRAND_CONFIG.profiles.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-200 transition-colors group"
              >
                <span>GitHub Software Repositories</span>
                <ArrowUpRight className="w-4 h-4 text-[#D51F16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
