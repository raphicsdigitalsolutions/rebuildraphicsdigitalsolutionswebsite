import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, Code2, Layers3 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio';

interface ScrollServicesExperienceProps {
  onOpenService: (path: string) => void;
}

const disciplines = [
  {
    number: '01',
    label: 'Creative studio',
    eyebrow: 'Brand · packaging · visuals',
    title: 'Make the first impression count.',
    body: 'Distinctive identities, considered packaging and visual systems that make a brand feel unmistakably yours.',
    capabilities: ['Brand identity', 'Product packaging', 'Campaign design'],
    href: '/services/creative-studio',
    Icon: Sparkles,
    projectId: 'nutralife-mens-gummies',
    projectLabel: 'Published on Behance',
  },
  {
    number: '02',
    label: 'Digital studio',
    eyebrow: 'Websites · software · products',
    title: 'Make every interaction work.',
    body: 'Thoughtful websites, applications and business software designed around the way people actually work.',
    capabilities: ['Websites & web apps', 'Business software', 'Ecommerce'],
    href: '/services/digital-development',
    Icon: Code2,
    projectId: 'rashid-traders-works',
    projectLabel: 'Pre-delivery project',
  },
  {
    number: '03',
    label: 'AI studio',
    eyebrow: 'AI · agents · automation',
    title: 'Make room for smarter work.',
    body: 'Practical assistants, connected workflows and automation that take repetitive work off your team’s plate.',
    capabilities: ['AI chatbots & agents', 'Knowledge assistants', 'Workflow automation'],
    href: '/services/ai-automation',
    Icon: Layers3,
    projectId: 'customchatgpt',
    projectLabel: 'Public prototype',
  },
];

const projectById = (id: string) => PORTFOLIO_PROJECTS.find((project) => project.id === id)!;

function ServiceArtwork({ index }: { index: number }) {
  const project = projectById(disciplines[index].projectId);
  if (project.imageUrl) {
    return <img src={project.imageUrl} alt={project.imageAlt || project.title} loading="lazy" decoding="async" className="service-card-photo" />;
  }

  return (
    <div className={`service-card-art service-card-art-${index + 1}`} aria-hidden="true">
      <div className="service-art-haze" />
      <div className="service-art-topline"><span>RAPHICS / {disciplines[index].number}</span><span>SELECTED WORK</span></div>
      <div className="service-art-graphic">
        {index === 1 ? (
          <>
            <div className="service-art-window"><span /><span /><span /></div>
            <div className="service-art-grid"><b>WORKFLOW</b><i /><i /><i /><i /></div>
            <div className="service-art-orbit service-art-orbit-a" /><div className="service-art-orbit service-art-orbit-b" />
          </>
        ) : (
          <>
            <div className="service-art-core">R</div>
            <div className="service-art-wave service-art-wave-a" />
            <div className="service-art-wave service-art-wave-b" />
            <div className="service-art-node service-art-node-a" /><div className="service-art-node service-art-node-b" />
          </>
        )}
      </div>
      <div className="service-art-caption"><span>{project.category}</span><span>{project.status}</span></div>
    </div>
  );
}

export const ScrollServicesExperience: React.FC<ScrollServicesExperienceProps> = ({ onOpenService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-service-step]'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (!visible) return;
      const index = steps.indexOf(visible.target as HTMLElement);
      if (index >= 0) setActive(index);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const current = disciplines[active];
  const CurrentIcon = current.Icon;
  const currentProject = projectById(current.projectId);

  return (
    <section id="services" ref={sectionRef} className="service-experience relative overflow-clip border-t border-white/[0.07] bg-[#080808]">
      <div className="service-section-intro mx-auto max-w-[1440px] px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-32">
        <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]">What we bring together</p>
        <h2 className="service-ghost-word" aria-hidden="true">SERVICES</h2>
        <p className="relative z-10 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">
          One studio.<br className="hidden sm:block" /> <span className="text-neutral-500">Three ways to move forward.</span>
        </p>
        <p className="relative z-10 mt-6 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">A connected team for the way your brand looks, your product works, and your business moves.</p>
      </div>

      <div className="service-scroll-grid mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div className="service-copy-pin">
          <div className="service-copy-content" aria-live="polite">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[.2em] text-neutral-500">
              <span className="text-[#e26a62]">{current.number}</span><span className="h-px w-9 bg-neutral-700" />{current.eyebrow}
            </div>
            <div className="service-copy-change" key={active}>
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#d51f16]/45 bg-[#d51f16]/10 text-[#f27b73]"><CurrentIcon size={18} aria-hidden="true" /></div>
              <h3 className="max-w-lg text-4xl font-semibold leading-[1.04] tracking-[-.05em] text-white sm:text-5xl">{current.title}</h3>
              <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">{current.body}</p>
              <ul className="mt-7 flex max-w-md flex-wrap gap-2" aria-label={`${current.label} capabilities`}>
                {current.capabilities.map((capability) => <li key={capability} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-[11px] text-neutral-300">{capability}</li>)}
              </ul>
              <button type="button" onClick={() => onOpenService(current.href)} className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-all hover:border-[#d51f16]/70 hover:bg-[#d51f16]/10">
                Explore {current.label.toLowerCase()} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
            <div className="mt-11 hidden items-center justify-between border-t border-white/10 pt-5 text-[10px] font-mono uppercase tracking-[.16em] text-neutral-500 lg:flex">
              <span>One studio · three disciplines</span><span>{current.number} / 0{disciplines.length}</span>
            </div>
          </div>
        </div>

        <div className="service-deck-column">
          <div className="service-deck-pin" aria-label={`Selected work: ${currentProject.title}`}>
            <div className="service-deck-stage" data-active={active}>
              <article key={current.number} className="service-deck-card service-card-reveal">
                <div className="service-card-header">
                  <span className="service-card-count">{current.number} / 0{disciplines.length}</span>
                  <span className="service-card-label">{current.label}</span>
                  <span className="service-card-mark" aria-hidden="true">↗</span>
                </div>
                <ServiceArtwork index={active} />
                <div className="service-card-footer">
                  <div><span className="service-project-type">{currentProject.category} · {current.projectLabel}</span><h4>{currentProject.title}</h4></div>
                  <span className="service-card-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
                </div>
              </article>
            </div>
            <div className="service-deck-note"><span className="service-deck-line" />Scroll to explore the studio<span className="service-deck-line" /></div>
          </div>

          <div className="service-step-list" aria-hidden="true">
            {disciplines.map((discipline, index) => <div key={discipline.number} data-service-step={index} className="service-step-trigger"><span>{discipline.number}</span>{discipline.label}</div>)}
          </div>

          <div className="service-mobile-cards">
            {disciplines.map((discipline, index) => {
              const project = projectById(discipline.projectId);
              const Icon = discipline.Icon;
              return (
                <article key={discipline.number} className="service-mobile-card">
                  <div className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[.18em] text-neutral-400"><span className="text-[#e26a62]">{discipline.number}</span><span>{discipline.eyebrow}</span></div>
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#d51f16]/40 bg-[#d51f16]/10 text-[#f27b73]"><Icon size={17} /></div>
                  <h3 className="text-3xl font-semibold leading-[1.05] tracking-[-.04em] text-white">{discipline.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-400">{discipline.body}</p>
                  <div className="service-mobile-art mt-7"><ServiceArtwork index={index} /></div>
                  <div className="mt-5 border-t border-white/10 pt-4 text-xs text-neutral-300">{project.title} <span className="text-neutral-500">· {discipline.projectLabel}</span></div>
                  <button type="button" onClick={() => onOpenService(discipline.href)} className="mt-6 inline-flex items-center gap-2 text-sm text-white">Explore {discipline.label.toLowerCase()} <ArrowUpRight size={16} /></button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div className="service-scroll-spacer" aria-hidden="true" />
    </section>
  );
};

export default ScrollServicesExperience;
