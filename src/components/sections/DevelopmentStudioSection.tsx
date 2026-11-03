/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Development Studio Section for Raphics Digital Solutions.
 * "WE BUILD DIGITAL EXPERIENCES THAT WORK."
 * Interactive tech stack explorer, architecture blueprints, and real software previews.
 */

import React, { useState } from 'react';
import { DEVELOPMENT_SERVICES } from '../../data/services';
import { Code2, Terminal, Layers, Database, ArrowUpRight, Check, Laptop, Shield } from 'lucide-react';

export const DevelopmentStudioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'architecture' | 'stack'>('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('website-development');

  const selectedService =
    DEVELOPMENT_SERVICES.find((s) => s.id === selectedServiceId) || DEVELOPMENT_SERVICES[0];

  const techStackBadges = [
    { name: 'TypeScript', category: 'Language', icon: 'TS' },
    { name: 'React 19', category: 'Frontend', icon: 'RE' },
    { name: 'Next.js', category: 'SSR & App', icon: 'NX' },
    { name: 'Node.js / Express', category: 'Backend', icon: 'JS' },
    { name: 'PostgreSQL', category: 'Relational DB', icon: 'PG' },
    { name: 'Tailwind CSS', category: 'Design System', icon: 'TW' },
    { name: 'Three.js / WebGL', category: '3D Spatial', icon: '3D' },
    { name: 'Docker / Cloud Run', category: 'Deployment', icon: 'DK' },
  ];

  return (
    <section id="development" className="relative py-28 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
              <span>03 // DIGITAL DEVELOPMENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
              We Build Digital Experiences <span className="text-[#D51F16]">That Work.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              No bloated templates. We engineer bespoke, resilient software architectures &mdash;
              from high-speed commercial websites to multi-tenant SaaS dashboards and complex inventory management portals.
            </p>
          </div>

          {/* Sub-view switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-850">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Services Breakdown
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Software Blueprint
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'stack'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Technology Stack
            </button>
          </div>
        </div>

        {/* View 1: Services Breakdown */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Service Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              {DEVELOPMENT_SERVICES.map((srv) => {
                const isSelected = srv.id === selectedServiceId;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-neutral-900 border-[#D51F16] shadow-[0_0_20px_rgba(213,31,22,0.2)]'
                        : 'bg-neutral-950/70 border-neutral-850 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#D51F16]' : 'bg-neutral-600'
                          }`}
                        />
                        <h4 className="text-sm font-heading font-semibold text-white">
                          {srv.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-500">
                        {srv.toolsAndTech?.[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Interactive Mockup & Spec Panel (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              
              {/* Mock Browser/Terminal Frame Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-850 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-neutral-500 ml-2">rds://engine/{selectedService.id}</span>
                </div>
                <span className="text-[#D51F16]">ENGINEERED FOR PRODUCTION</span>
              </div>

              {/* Service Title & Detailed Breakdown */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {selectedService.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {selectedService.summary}
                </p>
              </div>

              {/* Architecture Deliverables */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Core Engineering Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs text-neutral-200"
                    >
                      <Check className="w-4 h-4 text-[#D51F16] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Used in Service */}
              {selectedService.toolsAndTech && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Verified Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.toolsAndTech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action trigger */}
              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  Custom architecture scoped to your specifications.
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D51F16] text-white text-xs font-semibold hover:bg-[#B81912] transition-colors"
                >
                  <span>Build This System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        )}

        {/* View 2: Software Blueprint (Interactive Architecture Visualization) */}
        {activeTab === 'architecture' && (
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-8">
            <div className="max-w-xl space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                Enterprise-Grade Full-Stack Blueprint
              </h3>
              <p className="text-sm text-neutral-400">
                How Raphics Digital Solutions structures robust digital applications for speed, security, and long-term maintainability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Layer 1: Presentation & 3D */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                  <Laptop className="w-4 h-4" />
                  <span>LAYER 01: PRESENTATION</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white">
                  Next.js & React 19 Client
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  SSR/SSG hybrid rendering, Tailwind CSS design system, Motion micro-interactions, and hardware-accelerated WebGL 3D scenes.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                  <div>✓ Sub-second First Contentful Paint</div>
                  <div>✓ Strict accessibility & responsive layouts</div>
                </div>
              </div>

              {/* Layer 2: API & Application Logic */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                  <Terminal className="w-4 h-4" />
                  <span>LAYER 02: ORCHESTRATION</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white">
                  Node / Express & API Mesh
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  RESTful & GraphQL endpoints, JWT / OAuth authentication, background job workers, rate limiting, and Stripe billing pipelines.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                  <div>✓ Zero-trust payload validation</div>
                  <div>✓ High concurrency asynchronous handling</div>
                </div>
              </div>

              {/* Layer 3: Persistence & AI Layer */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                  <Database className="w-4 h-4" />
                  <span>LAYER 03: DATA & AI</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white">
                  PostgreSQL & Vector Embeddings
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  ACID-compliant relational schemas, indexed search, pgvector similarity clustering for RAG, and automated cloud backup snapshots.
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                  <div>✓ Encrypted at rest & in transit</div>
                  <div>✓ Zero data leakage architecture</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Tech Stack */}
        {activeTab === 'stack' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStackBadges.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono font-bold text-sm text-[#D51F16] group-hover:scale-105 transition-transform">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {tech.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-white">
                    {tech.name}
                  </h4>
                  <span className="text-xs text-neutral-400">Production Tested</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default DevelopmentStudioSection;
