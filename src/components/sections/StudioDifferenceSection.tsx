import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

const PRINCIPLES = [
  {
    number: '01',
    title: 'One direction, carried through.',
    description: 'Creative, digital and AI work starts from the same brief, so the idea can hold together from first impression to everyday use.',
  },
  {
    number: '02',
    title: 'Made for the actual job.',
    description: 'A brand needs its own visual language. A tool needs a clear purpose. An AI workflow needs approved sources and human review.',
  },
  {
    number: '03',
    title: 'Clear before we create.',
    description: 'Deliverables, review points, responsibilities and timing are agreed for each project before production begins.',
  },
];

export const StudioDifferenceSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="why-raphics" className="studio-difference relative overflow-hidden border-t border-black/10 bg-[#ebe8e1] py-24 text-[#171615] sm:py-32">
      <div className="studio-difference-mark pointer-events-none absolute -right-16 -top-24 select-none" aria-hidden="true">R</div>
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:h-fit" data-reveal>
          <p className="mb-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#a51d17]"><span className="h-px w-8 bg-[#d51f16]" /> The Raphics approach / 01—03</p>
          <h2 className="max-w-2xl text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl lg:text-[5.6rem]">
            Different skills.<br /><span className="text-[#8d8881]">A shared direction.</span>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#5e5a55] sm:text-base">
            Bring the right mix of design, development and intelligent technology into one focused conversation.
          </p>
          <button onClick={() => navigate('/about')} className="group mt-9 inline-flex items-center gap-2 border-b border-black/25 pb-2 text-sm font-medium transition-colors hover:border-[#d51f16] hover:text-[#ad2018]">
            More about the studio <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <ol className="studio-difference-list" aria-label="How Raphics approaches project work">
          {PRINCIPLES.map((principle) => (
            <li key={principle.number} className="studio-difference-item grid gap-4 border-t border-black/20 py-7 sm:grid-cols-[64px_1fr] sm:gap-6 sm:py-9" data-reveal>
              <span className="pt-1 text-[11px] font-mono tracking-[.18em] text-[#b51f18]">{principle.number}</span>
              <div className="grid gap-3 md:grid-cols-[1fr_.88fr] md:gap-8">
                <h3 className="max-w-sm text-2xl font-medium leading-[1.05] tracking-[-.04em] sm:text-3xl">{principle.title}</h3>
                <p className="max-w-md text-sm leading-7 text-[#66615b]">{principle.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default StudioDifferenceSection;
