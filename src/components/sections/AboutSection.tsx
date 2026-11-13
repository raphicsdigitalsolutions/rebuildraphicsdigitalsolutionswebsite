import React from 'react';
import { ArrowRight, Code2, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';
import { Logo } from '../brand/Logo';

const principles = [
  { title: 'Design with purpose', description: 'Brand identity, packaging, labels and campaign visuals shaped around the product and its audience.', Icon: Sparkles },
  { title: 'Build for the task', description: 'Websites, applications and business software scoped around real workflows.', Icon: Code2 },
  { title: 'Use AI thoughtfully', description: 'Assistants and automations built around approved information, clear limits and human review.', Icon: Layers3 },
  { title: 'Agree the work clearly', description: 'Scope, deliverables, milestones and support are discussed before work begins.', Icon: ShieldCheck },
];

export const AboutSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="about" className="about-editorial relative overflow-hidden border-t border-white/[0.08] bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="about-split grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div data-reveal>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]"><span className="h-px w-8 bg-[#d51f16]" /> A connected creative practice</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-.06em] text-white sm:text-6xl lg:text-7xl">
              Creative thinking.<br /><span className="text-neutral-500">Technical care.</span>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
              Raphics Digital Solutions brings creative design, digital development and practical AI into one independent studio. We help businesses shape how they look, what they build and how they work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/work')} className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm text-white transition-colors hover:border-[#d51f16]/70 hover:bg-white/[.04]">
                See selected work <ArrowRight className="h-4 w-4 text-[#e26a62] transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate('/process')} className="inline-flex items-center gap-2 px-3 py-3 text-sm text-neutral-400 transition-colors hover:text-white">
                How we work <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="about-orbit-wrap" data-reveal="right" aria-label="Raphics Digital Solutions logo at the centre of its creative, digital and AI disciplines">
            <div className="about-orbit about-orbit-outer" />
            <div className="about-orbit about-orbit-middle" />
            <div className="about-orbit about-orbit-inner" />
            <span className="about-orbit-label about-orbit-label-top">CREATIVE</span>
            <span className="about-orbit-label about-orbit-label-right">DIGITAL</span>
            <span className="about-orbit-label about-orbit-label-left">INTELLIGENCE</span>
            <div className="about-orbit-center"><Logo variant="emblem" height={68} /></div>
            <span className="about-orbit-node about-node-one" /><span className="about-orbit-node about-node-two" /><span className="about-orbit-node about-node-three" />
          </div>
        </div>

        <div className="about-principles mt-20 grid gap-x-8 md:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {principles.map(({ title, description, Icon }, index) => (
            <article key={title} className="about-principle border-t border-white/15 py-6 sm:py-7" data-reveal>
              <div className="mb-8 flex items-center justify-between"><span className="text-[10px] font-mono tracking-[.15em] text-[#d9534c]">0{index + 1}</span><Icon className="h-4 w-4 text-[#d51f16]" aria-hidden="true" /></div>
              <h3 className="text-lg font-medium tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-xs leading-6 text-neutral-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
