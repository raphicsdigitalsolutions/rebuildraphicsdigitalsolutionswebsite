import React from 'react';

const steps = [
  { number: '01', title: 'Understand', body: 'We get clear on the goal, audience and real problem before choosing a direction.' },
  { number: '02', title: 'Shape', body: 'We bring the visual idea, product experience and technical plan together.' },
  { number: '03', title: 'Make it work', body: 'We build, refine and deliver a solution ready for the next step.' },
];

export const ApproachSection: React.FC = () => (
  <section id="approach" className="border-t border-white/[0.07] bg-[#080808] py-24 sm:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-14 max-w-2xl" data-reveal>
        <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">A clear way forward</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">From the first thought <span className="text-neutral-500">to the finished thing.</span></h2>
      </div>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-8">
        {steps.map((step) => (
          <article key={step.number} className="group border-t border-white/15 py-7 md:py-8" data-reveal>
            <div className="mb-12 flex items-center justify-between">
              <span className="text-xs font-mono text-[#d9534c]">{step.number}</span>
              <span className="h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-20 group-hover:bg-[#d51f16]" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-white">{step.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ApproachSection;
