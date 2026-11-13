import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio';
import { useRouter } from '../../router/AgencyRouter';

const FEATURED_IDS = ['nutralife-mens-gummies', 'northforge-body-wash', 'customchatgpt'];

export const FeaturedWorkSection: React.FC = () => {
  const { navigate } = useRouter();
  const projects = FEATURED_IDS
    .map((id) => PORTFOLIO_PROJECTS.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <section id="portfolio" className="featured-work-section relative overflow-hidden border-t border-black/[0.08] bg-[#ebe8e1] py-24 text-[#171615] sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d51f16]/60 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-12 grid gap-8 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl" data-reveal>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-[#a51d17]">
              <span className="h-px w-8 bg-[#d51f16]" /> Selected work / 01—03
            </p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Good ideas,<br /><span className="text-[#88837d]">made tangible.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#5e5a55] sm:text-base">
              Packaging, digital products and working prototypes—each linked to its published artwork, repository or verified demo.
            </p>
          </div>
          <button onClick={() => navigate('/work')} className="group inline-flex w-fit items-center gap-2 border-b border-black/25 pb-2 text-sm font-medium text-[#171615] transition-colors hover:border-[#d51f16] hover:text-[#ad2018]">
            Explore all work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="featured-work-mosaic grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-y-8">
          {projects.map((project, index) => {
            const isLead = index === 0;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => navigate(`/work/${project.id}`)}
                className={`featured-work-card group flex min-w-0 flex-col text-left ${isLead ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}`}
                aria-label={`Open ${project.title} case study`}
              >
                <div className={`featured-work-image relative w-full overflow-hidden ${isLead ? 'aspect-[1.05]' : 'aspect-[1.55]'} ${project.imageUrl ? 'bg-[#d4d0c8]' : 'bg-[#141413]'}`}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035] ${isLead ? 'object-center' : 'object-center'}`}
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-7 text-white sm:p-9">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400">
                        <span>Public repository / AI</span><Github className="h-4 w-4 text-[#ee5a50]" />
                      </div>
                      <div>
                        <div className="mb-5 flex items-end gap-2" aria-hidden="true">
                          <span className="h-8 w-1 bg-[#d51f16]" />
                          <span className="h-14 w-1 bg-[#d51f16]/65" />
                          <span className="h-10 w-1 bg-[#d51f16]/35" />
                          <span className="ml-2 h-px w-24 bg-white/40" />
                        </div>
                        <p className="max-w-lg text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">{project.title}</p>
                        <p className="mt-3 max-w-lg text-xs leading-6 text-neutral-400">Project overview · Visual summary, not a product screenshot</p>
                      </div>
                    </div>
                  )}
                  <span className="absolute left-5 top-5 flex items-center gap-2 bg-[#ebe8e1]/90 px-3 py-2 text-[9px] font-mono uppercase tracking-[0.15em] text-[#171615] backdrop-blur-sm">
                    <span className="text-[#b31f18]">0{index + 1}</span>
                    {project.category}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center bg-[#d51f16] text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex items-start justify-between gap-5 border-b border-black/15 py-4 sm:py-5">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight tracking-[-0.035em] text-[#171615] sm:text-2xl">{project.title}</h3>
                    <p className="mt-2 max-w-lg text-xs leading-6 text-[#65605a] sm:text-sm">
                      {project.source === 'behance' ? 'Published artwork on Behance.' : project.tagline}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-[9px] font-mono uppercase tracking-[0.12em] text-[#79736d]">{project.status}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
