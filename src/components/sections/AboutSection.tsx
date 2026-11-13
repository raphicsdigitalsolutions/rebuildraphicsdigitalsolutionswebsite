import React from 'react';
import { ArrowRight, Code2, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

const principles = [
  {
    title: 'Design with purpose',
    description: 'Brand identity, packaging, labels, and campaign visuals shaped around the product and its audience.',
    Icon: Sparkles,
  },
  {
    title: 'Build for the task',
    description: 'Websites, applications, and business software scoped to the workflows they need to support.',
    Icon: Code2,
  },
  {
    title: 'Use AI thoughtfully',
    description: 'Assistants and automations designed around approved information, clear limits, and human review.',
    Icon: Layers3,
  },
  {
    title: 'Agree the work clearly',
    description: 'Scope, deliverables, milestones, and support are discussed for each project before work begins.',
    Icon: ShieldCheck,
  },
];

export const AboutSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="about" className="relative border-t border-white/[0.08] bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-3xl space-y-5" data-reveal>
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">About Raphics</p>
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Creative thinking. <span className="text-neutral-500">Technical care.</span>
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
            Raphics Digital Solutions brings creative design, digital development, and practical AI automation into one studio. The work ranges from product identity and packaging to websites, business software, and information assistants.
          </p>
        </div>

        <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ title, description, Icon }) => (
            <article key={title} className="border-t border-white/15 py-6">
              <Icon className="mb-7 h-5 w-5 text-[#D51F16]" aria-hidden="true" />
              <h3 className="text-lg font-medium tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-xs leading-6 text-neutral-400">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-5 border-t border-white/10 pt-6">
          <button onClick={() => navigate('/process')} className="group inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white">
            See the project process <ArrowRight className="h-4 w-4 text-[#D51F16] transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={() => navigate('/work')} className="group inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white">
            Explore selected work <ArrowRight className="h-4 w-4 text-[#D51F16] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
