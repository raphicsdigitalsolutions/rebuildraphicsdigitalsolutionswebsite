/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Five-Stage Process Section for Raphics Digital Solutions.
 * 01. Discovery -> 02. Strategy -> 03. Design -> 04. Development -> 05. Delivery
 */

import React, { useState } from 'react';
import { Search, Compass, Palette, Code2, Rocket, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      tag: 'REQUIREMENTS & BUSINESS GOALS',
      icon: Search,
      summary: 'Understand requirements, market competitors, and target audience needs.',
      details:
        'We deep-dive into your brand positioning, technical requirements, regulatory constraints (FDA/pharma or cloud security), and operational bottlenecks to build a rock-solid brief.',
      deliverables: ['Creative / Tech Scope Document', 'Market & Aesthetic Audit', 'Timeline & Milestone Plan'],
    },
    {
      num: '02',
      title: 'Strategy',
      tag: 'CREATIVE & TECHNICAL ROADMAP',
      icon: Compass,
      summary: 'Develop the design direction, technical stack architecture, and data pipeline.',
      details:
        'We formulate the creative visual moodboards and software architectural blueprints. We map database schemas, vector indexing requirements, and packaging dielines before committing resources.',
      deliverables: ['Moodboards & Color Palettes', 'Database Schema Blueprint', 'API Flow Diagram'],
    },
    {
      num: '03',
      title: 'Design',
      tag: 'VISUAL & 3D CONCEPTS',
      icon: Palette,
      summary: 'Build high-fidelity visual assets, 3D product renders, and UI mockups.',
      details:
        'Our creative studio drafts multiple packaging concepts, vector lockups, 3D studio lighting setups, and responsive UI wireframes with interactive prototypes.',
      deliverables: ['Die-Cut Ready Vector Art', '4K 3D Photorealistic Mockups', 'Figma Interactive Prototypes'],
    },
    {
      num: '04',
      title: 'Development',
      tag: 'ENGINEERING & INTEGRATION',
      icon: Code2,
      summary: 'Engineer, integrate, test, and optimize the digital product.',
      details:
        'We write clean, modular TypeScript code, assemble full-stack React / Next.js interfaces, train or ground AI RAG models, and test against rigorous Core Web Vitals and edge cases.',
      deliverables: ['Documented Source Code Repository', 'Automated Unit & End-to-End Tests', 'Performance & SEO Audit'],
    },
    {
      num: '05',
      title: 'Delivery',
      tag: 'LAUNCH & SYSTEM SUPPORT',
      icon: Rocket,
      summary: 'Launch, deploy to production, and support the final solution.',
      details:
        'We deliver press-ready packaging separation plates to your printer, or deploy your web application to production cloud infrastructure with zero downtime and ongoing maintenance.',
      deliverables: ['Production CMYK Press Files', 'Cloud Deployment (Docker/Vercel/GCP)', 'Post-Launch Warranties & Handover'],
    },
  ];

  return (
    <section id="process" className="relative py-28 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>09 // SYSTEMATIC EXECUTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
            Our 5-Stage <span className="text-[#D51F16]">Execution Workflow.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Predictable excellence requires disciplined process. From first discovery call to final packaging press check or cloud deployment, we eliminate guesswork.
          </p>
        </div>

        {/* 5-Step Horizontal Timeline Bar */}
        <div className="grid grid-cols-5 gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-850 mb-10 overflow-x-auto">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(idx)}
                aria-pressed={isCurrent}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span className="font-bold">{st.num}.</span>
                <span className="truncate">{st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive Card */}
        <div key={steps[activeStep].num} className="process-stage-panel p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 relative overflow-hidden" aria-live="polite">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold font-mono text-[#D51F16]">
                  {steps[activeStep].num}
                </span>
                <div className="h-6 w-px bg-neutral-800" />
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {steps[activeStep].tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {steps[activeStep].title} &mdash; {steps[activeStep].summary}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {steps[activeStep].details}
              </p>

              <div className="pt-4 border-t border-neutral-850 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Stage Output & Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {steps[activeStep].deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D51F16] shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
                  Client Collaboration
                </span>
                <h4 className="text-base font-heading font-bold text-white">
                  Transparent Progress Tracking
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You receive weekly video demos, shared Figma review links, and staging server deployments throughout this stage.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-4 border-t border-neutral-800">
                <span>Stage {activeStep + 1} of 5</span>
                <button
                  onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                  className="text-[#D51F16] hover:text-white transition-colors cursor-pointer"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
