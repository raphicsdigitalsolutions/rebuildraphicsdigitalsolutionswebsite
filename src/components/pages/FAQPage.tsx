import React from 'react';
import { useRouter } from '../../router/AgencyRouter';

const questions = [
  {
    question: 'What kind of work can Raphics take on?',
    answer: 'The studio works across brand identity, packaging and visual design; websites, web applications and business software; and custom AI assistants, knowledge systems and workflow automation.',
  },
  {
    question: 'How is a project priced?',
    answer: 'Pricing depends on the requirements, deliverables, and complexity. Share a short brief to discuss scope and receive a project-specific quotation. The website does not publish fixed package prices.',
  },
  {
    question: 'How long will my project take?',
    answer: 'Timing depends on the agreed scope, review stages, and any required integrations or approvals. Milestones and estimated dates are discussed before the project begins.',
  },
  {
    question: 'How many revisions are included?',
    answer: 'Review stages and revision terms are agreed in writing for each project. The proposal will describe the process before work starts.',
  },
  {
    question: 'What should I include in my first message?',
    answer: 'A short description of your goal, intended audience, relevant references or files, and any known constraints is a useful start. Please do not send passwords or highly sensitive personal information.',
  },
  {
    question: 'How are AI systems reviewed and limited?',
    answer: 'AI outputs can be incorrect. The information sources, access limits, escalation behavior, and human review points should be defined for the specific use case. Prototypes shown here are not medical or financial advice.',
  },
  {
    question: 'Can I provide my own brand files or product information?',
    answer: 'Yes. The project brief can identify the files and information that are relevant. Any confidentiality requirements for proprietary materials should be agreed before sharing them.',
  },
  {
    question: 'How can I contact the agency from the UK or Pakistan?',
    answer: 'Email info.raphicsdigital@gmail.com. The UK number +44 7760 891431 accepts WhatsApp messages only. The Pakistan number 0301 4518439 accepts calls and WhatsApp messages.',
  },
];

export const FAQPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="min-h-[70vh] border-t border-white/10 bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <header className="mb-12 max-w-3xl space-y-4" data-reveal>
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">Frequently asked questions</p>
          <h1 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">Good questions. <span className="text-neutral-500">Clear answers.</span></h1>
          <p className="text-sm leading-7 text-neutral-400">Project details are confirmed together, so you know what is included before work begins.</p>
        </header>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium text-white marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F16]">
                {question}
                <span className="shrink-0 font-mono text-[#D51F16] group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-3xl pt-4 pr-8 text-sm leading-7 text-neutral-400">{answer}</p>
            </details>
          ))}
        </div>

        <button onClick={() => navigate('/contact')} className="mt-10 inline-flex items-center gap-2 text-sm text-white underline decoration-white/20 underline-offset-4 hover:decoration-[#D51F16]">
          Ask about your project <span className="text-[#D51F16]" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

export default FAQPage;
