import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  { number: '01', title: 'Discover', body: 'We listen, ask the right questions and agree what success needs to look like.' },
  { number: '02', title: 'Direct', body: 'We set a clear creative direction, scope and practical plan before making.' },
  { number: '03', title: 'Develop', body: 'We design, build and share progress at agreed milestones.' },
  { number: '04', title: 'Deliver', body: 'We refine the details and hand over the work with the next steps clear.' },
];

export const ApproachSection: React.FC = () => (
  <section id="process" className="process-section relative overflow-hidden border-t border-white/[0.07] bg-[#0a0a0a] py-24 sm:py-32">
    <div className="pointer-events-none absolute -right-32 top-20 h-[450px] w-[450px] rounded-full bg-[#d51f16]/[.06] blur-[100px]" />
    <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
      <div className="mb-14 max-w-3xl sm:mb-20" data-reveal>
        <p className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]"><span className="h-px w-8 bg-[#d51f16]" /> A clear way forward</p>
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-.06em] text-white sm:text-6xl lg:text-7xl">From the first thought<br /><span className="text-neutral-500">to the finished thing.</span></h2>
        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">A simple, collaborative process keeps the work focused and the next step visible.</p>
      </div>

      <div className="process-path" aria-hidden="true"><svg viewBox="0 0 1200 240" preserveAspectRatio="none"><path d="M0 150 C130 150 120 48 260 48 S390 198 540 198 680 58 820 58 960 168 1080 168 1140 116 1200 116" /></svg></div>
      <ol className="process-steps grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.number} className={`process-step process-step-${index + 1}`} data-reveal>
            <div className="process-step-top"><span>{step.number}</span><i /></div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6 text-xs text-neutral-500">
        <span>Clear scope · shared checkpoints · purposeful delivery</span>
        <a href="#contact" className="group inline-flex items-center gap-2 text-neutral-200 transition-colors hover:text-white">Talk through a project <ArrowUpRight className="h-4 w-4 text-[#e26a62] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
      </div>
    </div>
  </section>
);

export default ApproachSection;
