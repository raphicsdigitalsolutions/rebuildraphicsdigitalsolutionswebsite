import React from 'react';
import { ArrowUpRight, FileCheck2, Eye, Layers3 } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

const signals = [
  { title: 'Original sources', description: 'Published creative work links back to its Behance project.', Icon: Eye },
  { title: 'Clear project status', description: 'Public, private, pre-delivery, and in-development work is labelled.', Icon: FileCheck2 },
  { title: 'No invented proof', description: 'Client outcomes and testimonials are added only when verified.', Icon: Layers3 },
];

export const TrustSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.22em] text-[#d9534c]">How we present our work</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Evidence over claims.</h2>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {signals.map(({ title, description, Icon }) => (
            <article key={title} className="border-t border-white/15 py-5">
              <Icon className="mb-6 h-5 w-5 text-[#D51F16]" aria-hidden="true" />
              <h3 className="text-base font-medium text-white">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-neutral-400">{description}</p>
            </article>
          ))}
        </div>
        <button onClick={() => navigate('/work')} className="group mt-8 inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white">
          Review selected work <ArrowUpRight className="h-4 w-4 text-[#D51F16] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </section>
  );
};

export default TrustSection;
