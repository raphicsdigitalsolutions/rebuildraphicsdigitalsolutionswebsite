import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';
import { FAQ_ITEMS } from '../pages/FAQPage';

export const FAQPreviewSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="faq-preview" className="faq-preview border-t border-white/[0.08] bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:h-fit" data-reveal>
          <p className="mb-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]"><span className="h-px w-8 bg-[#d51f16]" /> Before we begin / FAQ</p>
          <h2 className="max-w-xl text-5xl font-semibold leading-[.97] tracking-[-.065em] text-white sm:text-7xl">
            Good questions.<br /><span className="text-neutral-500">Clear answers.</span>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">
            Project details are confirmed together, so you know what is included before work begins.
          </p>
          <button onClick={() => navigate('/faq')} className="group mt-9 inline-flex items-center gap-2 border-b border-white/25 pb-2 text-sm font-medium text-white transition-colors hover:border-[#e26a62] hover:text-[#f07870]">
            Read all questions <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="faq-preview-list divide-y divide-white/10 border-y border-white/10" data-reveal>
          {FAQ_ITEMS.slice(0, 4).map(({ question, answer }) => (
            <details key={question} className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium leading-6 text-white marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F16] sm:text-lg">
                {question}
                <span className="faq-preview-toggle shrink-0 text-2xl font-light leading-none text-[#e26a62] transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-3xl pt-4 pr-8 text-sm leading-7 text-neutral-400">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPreviewSection;
