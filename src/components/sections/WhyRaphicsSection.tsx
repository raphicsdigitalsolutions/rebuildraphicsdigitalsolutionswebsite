/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Why Raphics Section for Raphics Digital Solutions.
 * "ONE CREATIVE PARTNER. MULTIPLE DIGITAL CAPABILITIES."
 * Interactive 3-pillar synergy: DESIGN -> DEVELOPMENT -> INTELLIGENCE
 */

import React, { useState } from 'react';
import { Sparkles, Code2, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WhyRaphicsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'design' | 'dev' | 'ai'>('design');

  const pillars = {
    design: {
      title: 'Design Distinction',
      sub: 'Visual presence engineered for emotional resonance and shelf authority.',
      bulletPoints: [
        'Custom 3D product renders and accurate packaging die cuts',
        'Mathematical typography and cohesive visual hierarchies',
        'Regulatory compliant labeling for pharma, food, and cosmetics',
        'Brand guidelines built for scalable multi-channel expansion',
      ],
    },
    dev: {
      title: 'Digital Development',
      sub: 'High-speed software engineered for resilience and frictionless user journeys.',
      bulletPoints: [
        'Next.js & React full-stack applications with sub-second FCP',
        'Custom ERPs, inventory ledgers, and billing engines',
        'Multi-tenant cloud deployments with Docker & Cloud Run',
        'PostgreSQL schemas with ACID transactional compliance',
      ],
    },
    ai: {
      title: 'Intelligent Automation',
      sub: 'Actionable machine intelligence that eliminates enterprise operational bottlenecks.',
      bulletPoints: [
        'Vectorized RAG pipelines with zero hallucination source citations',
        'Sub-500ms conversational AI voice agents with live interruption',
        'Autonomous multi-ratio graphic creation agent workflows',
        'Automated document classification and OCR parsing',
      ],
    },
  };

  return (
    <section className="relative py-28 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>08 // THE RAPHICS ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
            One Creative Partner.{' '}
            <span className="text-[#D51F16]">Multiple Digital Capabilities.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminate the friction of juggling separate design studios, software agencies, and AI contractors.
            Raphics Digital Solutions unites creative vision, engineering rigor, and machine intelligence under one unified team.
          </p>
        </div>

        {/* 3-Pillar Visual Connection: DESIGN -> DEVELOPMENT -> INTELLIGENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Pillar 1: DESIGN */}
          <div
            onClick={() => setActivePillar('design')}
            className={`p-8 rounded-3xl border cursor-pointer transition-all ${
              activePillar === 'design'
                ? 'bg-neutral-900 border-[#D51F16] shadow-[0_0_25px_rgba(213,31,22,0.25)]'
                : 'bg-neutral-950/70 border-neutral-850 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D51F16]/10 border border-[#D51F16]/20 flex items-center justify-center text-[#D51F16]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400">PILLAR 01</span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              DESIGN
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Creative brand identity, luxury cosmetic packaging & 3D photorealistic visualization.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
              <span>Explore Pillar Focus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: DEVELOPMENT */}
          <div
            onClick={() => setActivePillar('dev')}
            className={`p-8 rounded-3xl border cursor-pointer transition-all ${
              activePillar === 'dev'
                ? 'bg-neutral-900 border-[#D51F16] shadow-[0_0_25px_rgba(213,31,22,0.25)]'
                : 'bg-neutral-950/70 border-neutral-850 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400">PILLAR 02</span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              DEVELOPMENT
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Custom web applications, responsive websites, bespoke ERP systems & database platforms.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
              <span>Explore Pillar Focus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: INTELLIGENCE */}
          <div
            onClick={() => setActivePillar('ai')}
            className={`p-8 rounded-3xl border cursor-pointer transition-all ${
              activePillar === 'ai'
                ? 'bg-neutral-900 border-[#D51F16] shadow-[0_0_25px_rgba(213,31,22,0.25)]'
                : 'bg-neutral-950/70 border-neutral-850 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D51F16]/10 border border-[#D51F16]/20 flex items-center justify-center text-[#D51F16]">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400">PILLAR 03</span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              INTELLIGENCE
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Enterprise RAG architectures, low-latency voice assistants & autonomous agent workflows.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
              <span>Explore Pillar Focus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Selected Pillar Detailed Synergy Panel */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-[#D51F16] font-bold">ACTIVE CAPABILITY:</span>
            <span className="text-white uppercase font-bold">{pillars[activePillar].title}</span>
          </div>
          <h4 className="text-xl font-heading font-bold text-white">
            {pillars[activePillar].sub}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            {pillars[activePillar].bulletPoints.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs text-neutral-200"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D51F16] shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyRaphicsSection;
