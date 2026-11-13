import React from 'react';
import { ArrowRight, Compass, FileText, Layers3, MessageSquareText, PackageCheck } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';

const steps = [
  { title: 'Discover', description: 'Discuss the goal, audience, existing materials, constraints, and the problem the project should solve.', Icon: Compass },
  { title: 'Agree the scope', description: 'Confirm deliverables, milestones, review points, and project terms in writing before work begins.', Icon: FileText },
  { title: 'Create and build', description: 'Develop the agreed design, digital product, or automation in clear reviewable stages.', Icon: Layers3 },
  { title: 'Review and refine', description: 'Compare the work with the agreed brief and make the revisions defined in the project scope.', Icon: MessageSquareText },
  { title: 'Handover', description: 'Prepare the approved files or agreed product for delivery. Launch and ongoing support are scoped per project.', Icon: PackageCheck },
];

export const ProcessSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="process" className="border-t border-white/10 bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-3xl space-y-4" data-reveal>
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">Project process</p>
          <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">Clear steps. <span className="text-neutral-500">Agreed scope.</span></h1>
          <p className="max-w-2xl text-sm leading-7 text-neutral-400">Every engagement is shaped around the work. Deliverables, review rounds, milestones, timing, and support are confirmed in the project agreement.</p>
        </div>

        <ol className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ title, description, Icon }, index) => (
            <li key={title} className="border-t border-white/15 py-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500">0{index + 1}</span>
                <Icon className="h-5 w-5 text-[#D51F16]" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-medium tracking-tight text-white">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-neutral-500">
          For packaging, final production files are prepared to the agreed specifications; the client should approve a physical printer proof before a production run.
        </div>
        <button onClick={() => navigate('/contact')} className="group mt-8 inline-flex items-center gap-2 text-sm text-white">
          Discuss a project <ArrowRight className="h-4 w-4 text-[#D51F16] transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default ProcessSection;
