/**
 * AI and automation services with the public prototype and in-development work
 * clearly separated from the services Raphics can scope for clients.
 */

import React from 'react';
import { AI_SERVICES } from '../../data/services';
import { NeuralNodeScene } from '../3d/NeuralNodeScene';
import { ArrowRight, Cpu } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

export const AILabSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
  <section id="ai-lab" className="relative border-t border-neutral-900 bg-[#080808] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-14 max-w-3xl space-y-4" data-reveal>
        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">AI & automation</p>
        <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
          Useful intelligence. <span className="text-neutral-500">Clear limits.</span>
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
          We design custom chatbots, business assistants, workflow automations, knowledge systems, and voice agents around a real business task. Scope, data sources, and safeguards are agreed for each project.
        </p>
      </div>

      <div className="mb-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="min-h-[300px] lg:min-h-[440px]">
          <NeuralNodeScene />
        </div>

        <div className="space-y-7">
          <article className="border-t border-white/15 pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">Public prototype</p>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-sky-300">NEXORA Knowledge Studio</span>
            </div>
            <h3 className="text-xl font-medium tracking-tight text-white">Document research with source passages</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">
              The public Streamlit prototype accepts common document formats and returns answers with related source passages. Its repository describes the current implementation and setup.
            </p>
            <button onClick={() => navigate('/work/customraggpt')} className="group mt-4 inline-flex items-center gap-2 text-xs text-neutral-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#d51f16]">
              View project details <ArrowRight className="h-3.5 w-3.5 text-[#d51f16] transition-transform group-hover:translate-x-1" />
            </button>
          </article>

          <article className="border-t border-white/15 pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">In development</p>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-amber-300">Voice AI agent</span>
            </div>
            <h3 className="text-xl font-medium tracking-tight text-white">Voice agents for natural conversations</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">
              The voice agent is still being developed. A public repository and demo have not been published yet.
            </p>
          </article>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Services</p>
          <h3 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">AI systems built around your workflow</h3>
        </div>
        <p className="max-w-md text-xs leading-6 text-neutral-500">Each system is scoped to the task, integrations, and information it needs.</p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {AI_SERVICES.map((service) => (
          <article key={service.id} className="flex flex-col justify-between border-b border-white/10 py-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Cpu className="h-5 w-5 text-[#d51f16]" />
                {service.featured && <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-neutral-500">Core capability</span>}
              </div>
              <h4 className="text-lg font-medium tracking-tight text-white">{service.name}</h4>
              <p className="mt-2 text-xs leading-6 text-neutral-400">{service.summary}</p>
            </div>
            {service.toolsAndTech?.length ? (
              <p className="mt-4 text-[10px] font-mono leading-5 text-neutral-500">{service.toolsAndTech.join(' · ')}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AILabSection;
