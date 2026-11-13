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
    <section id="portfolio" className="border-t border-white/[0.08] bg-[#090909] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-7 sm:mb-16 sm:flex-row sm:items-end">
          <div className="max-w-2xl" data-reveal>
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">Selected work</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Creative craft. <span className="text-neutral-500">Digital engineering.</span>
            </h2>
          </div>
          <button onClick={() => navigate('/work')} className="group inline-flex w-fit items-center gap-2 border-b border-white/20 pb-2 text-sm text-neutral-300 transition-colors hover:border-[#d51f16] hover:text-white">
            Explore all work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => navigate(`/work/${project.id}`)}
              className="group min-w-0 text-left"
              aria-label={`Open ${project.title} case study`}
            >
              <div className="relative aspect-[1.42] overflow-hidden bg-[#151515]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt || project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between border-y border-white/10 p-7 sm:p-9">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                      <Github className="h-4 w-4 text-[#d51f16]" />
                      Public repository
                    </div>
                    <div>
                      <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[#f07870]">AI / Development</p>
                      <p className="max-w-lg text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">{project.title}</p>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-400">{project.tagline}</p>
                    </div>
                  </div>
                )}
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-black/75 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="flex items-start justify-between gap-5 border-b border-white/[0.10] py-5">
                <div>
                  <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500">{project.category}</p>
                  <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-[#f07870] sm:text-xl">{project.title}</h3>
                  <p className="mt-2 max-w-lg text-xs leading-6 text-neutral-400">{project.source === 'behance' ? 'Published artwork on Behance.' : project.tagline}</p>
                </div>
                <span className="mt-1 shrink-0 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">{project.status}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
