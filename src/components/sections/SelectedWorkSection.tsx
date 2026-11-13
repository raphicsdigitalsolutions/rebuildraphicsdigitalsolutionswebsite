/**
 * Selected work with direct links to published creative artwork, repositories,
 * and public demos. Unpublished work never receives a fabricated preview.
 */

import React, { useMemo, useState } from 'react';
import { PortfolioProject, PORTFOLIO_PROJECTS, ProjectSource } from '../../data/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { BRAND_CONFIG } from '../../config/brand';
import { ArrowUpRight, Github, Layers, Search, Sparkles } from 'lucide-react';

type CategoryFilter = 'all' | 'Creative' | 'AI & automation' | 'Development' | 'In progress';

const categories: CategoryFilter[] = ['all', 'Creative', 'AI & automation', 'Development', 'In progress'];

function matchesCategory(project: PortfolioProject, category: CategoryFilter) {
  if (category === 'all') return true;
  if (category === 'Creative') return project.source === 'behance';
  if (category === 'AI & automation') {
    return project.category === 'AI & Machine Learning' || project.category === 'Voice & Agents';
  }
  if (category === 'Development') return project.category === 'Web & SaaS Platform';
  return project.status === 'In Progress' || project.status === 'In Development' || project.status === 'Pre-delivery';
}

function statusClass(status: string) {
  if (status === 'Public Prototype' || status === 'Public Repository') return 'text-sky-300';
  if (status === 'In Progress' || status === 'In Development' || status === 'Pre-delivery') return 'text-amber-300';
  return 'text-neutral-400';
}

export const SelectedWorkSection: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<'all' | ProjectSource>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PORTFOLIO_PROJECTS.filter((project) => {
      if (selectedSource !== 'all' && project.source !== selectedSource) return false;
      if (selectedSource === 'github' && project.sourceVisibility === 'unpublished') return false;
      if (!matchesCategory(project, selectedCategory)) return false;
      if (!query) return true;
      return [project.title, project.tagline, project.category, ...project.techStack]
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [selectedSource, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative border-t border-white/[0.08] bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-7 sm:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl" data-reveal>
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">Selected work</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Real projects. <span className="text-neutral-500">Original sources.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-400">
              Published Behance artwork, public repositories, and the project’s live demo where one is available.
              Work still in development is labelled clearly.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a href={BRAND_CONFIG.portfolioLinks.behance} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#d51f16]">
              <Sparkles className="h-4 w-4 text-[#d51f16]" /> Behance <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mb-10 space-y-5 border-y border-white/[0.08] py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter by source">
              {([
                ['all', 'All work'],
                ['behance', 'Behance'],
                ['github', 'GitHub'],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selectedSource === value}
                  onClick={() => setSelectedSource(value)}
                  className={`border-b pb-1 text-xs transition-colors ${selectedSource === value ? 'border-[#d51f16] text-white' : 'border-transparent text-neutral-500 hover:text-neutral-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-xs">
              <Search aria-hidden="true" className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search projects"
                placeholder="Search projects or tools"
                className="w-full border-b border-white/15 bg-transparent py-2 pl-6 pr-2 text-xs text-white placeholder:text-neutral-600 focus:border-[#d51f16] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-x-5 gap-y-2 overflow-x-auto pb-1 text-xs" role="group" aria-label="Filter by discipline">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 transition-colors ${selectedCategory === category ? 'text-[#f07870]' : 'text-neutral-500 hover:text-neutral-200'}`}
              >
                {category === 'all' ? 'All disciplines' : category}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveModalProject(project)}
                className="group flex min-w-0 flex-col text-left"
                aria-label={`View ${project.title} project details`}
              >
                <div className="relative aspect-[1.45] w-full overflow-hidden bg-[#151515]">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-between border-y border-white/[0.08] p-5 sm:p-6">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                        <span>{project.sourceVisibility === 'public' ? 'Public source' : project.sourceVisibility === 'private' ? 'Private source' : 'Work in progress'}</span>
                        {project.sourceVisibility === 'public' ? <Github className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#f07870]">{project.category}</p>
                        <p className="max-w-sm text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">{project.title}</p>
                      </div>
                    </div>
                  )}
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-black/75 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col border-b border-white/[0.10] pb-5 pt-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.14em]">
                    <span className="text-neutral-500">
                      {project.source === 'behance' ? 'Behance' : project.sourceVisibility === 'public' ? 'GitHub' : project.sourceVisibility === 'private' ? 'Project' : 'In development'} / {project.category}
                    </span>
                    <span className={statusClass(project.status)}>{project.status}</span>
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-[#f07870]">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-neutral-400">{project.tagline}</p>
                  {project.techStack.length > 0 && (
                    <p className="mt-3 text-[10px] font-mono text-neutral-500">{project.techStack.slice(0, 3).join(' · ')}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="border-y border-white/[0.08] py-12 text-center">
            <p className="text-sm text-neutral-300">No projects match that search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSource('all');
              }}
              className="mt-3 text-xs text-[#f07870] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectRelated={(project) => setActiveModalProject(project)}
      />
    </section>
  );
};

export default SelectedWorkSection;
