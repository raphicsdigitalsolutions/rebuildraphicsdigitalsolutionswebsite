/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Selected Work / Portfolio Section for Raphics Digital Solutions.
 * Combines authentic Behance creative artworks & GitHub software repositories.
 * Offers filtering, search, project status badges, and deep case study inspection.
 */

import React, { useState, useMemo } from 'react';
import { PortfolioProject, PORTFOLIO_PROJECTS, ProjectSource } from '../../data/portfolio';
import { CaseStudyModal } from './CaseStudyModal';
import { BRAND_CONFIG } from '../../config/brand';
import {
  Search,
  Filter,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Code2,
} from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<'all' | ProjectSource>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((proj) => {
      // Source filter
      if (selectedSource !== 'all' && proj.source !== selectedSource) return false;

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Packaging' && proj.category !== 'Packaging Design') return false;
        if (selectedCategory === 'Label' && proj.category !== 'Label Design') return false;
        if (selectedCategory === 'Food & Beverage' && proj.category !== 'Food & Beverage') return false;
        if (selectedCategory === 'Cosmetics' && proj.category !== 'Cosmetics & Skincare') return false;
        if (selectedCategory === 'Product Mockups' && proj.category !== 'Product Mockups') return false;
        if (selectedCategory === 'AI & ML' && proj.category !== 'AI & Machine Learning' && proj.category !== 'Voice & Agents') return false;
        if (selectedCategory === 'Web & SaaS' && proj.category !== 'Web & SaaS Platform') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = proj.title.toLowerCase().includes(query);
        const matchesTagline = proj.tagline.toLowerCase().includes(query);
        const matchesTech = proj.techStack.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTagline && !matchesTech) return false;
      }

      return true;
    });
  }, [selectedSource, selectedCategory, searchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Live Product':
      case 'Live Project':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Open Source Project':
      case 'Open Source':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Working Prototype':
      case 'Prototype':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Development Project':
      case 'Development':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Experimental Project':
      case 'Experimental':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'Public Repository':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Public Prototype':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Published Portfolio Work':
      case 'Private Repository':
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D51F16]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
              <span>05 // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
              Real Work. <span className="text-[#D51F16]">Verified Results.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore selected creative projects published through Behance and software repositories hosted on GitHub. Open the original profile or repository for source material and the latest project information.
            </p>
          </div>

          {/* Quick Hub Links */}
          <div className="flex items-center gap-3">
            <a
              href={BRAND_CONFIG.profiles.behance.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D51F16]" />
              <span>Behance Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <a
              href={BRAND_CONFIG.profiles.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-mono text-neutral-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-[#D51F16]" />
              <span>GitHub Repos</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-3xl bg-neutral-950 border border-neutral-850 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Source Tabs (All / Behance / GitHub) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/80 border border-neutral-800">
            <button
              onClick={() => setSelectedSource('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSource === 'all'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Projects ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setSelectedSource('behance')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSource === 'behance'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Behance Creative</span>
            </button>
            <button
              onClick={() => setSelectedSource('github')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedSource === 'github'
                  ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>GitHub Software</span>
            </button>
          </div>

          {/* Sub-category Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            {['all', 'Packaging', 'Label', 'Food & Beverage', 'Cosmetics', 'Product Mockups', 'AI & ML', 'Web & SaaS'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Disciplines' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project or tech..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D51F16]"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group p-6 rounded-3xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Card Ambient Glow on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                style={{ backgroundColor: project.visualTheme.primaryColor }}
              />

              <div className="space-y-4">
                {/* Header row: Source Badge & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                    {project.source === 'github' ? (
                      <Github className="w-3.5 h-3.5 text-neutral-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#D51F16]" />
                    )}
                    <span>{project.source === 'github' ? 'GitHub Repos' : 'Behance'}</span>
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border uppercase tracking-wider ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Visual Accent Banner */}
                <div
                  className={`h-28 rounded-2xl bg-gradient-to-br ${project.visualTheme.gradient} p-4 flex flex-col justify-between border border-white/5 relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <span className="text-xs font-mono font-bold text-white tracking-wider z-10">
                    {project.visualTheme.badgeText}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Footer: Tech Stack Badges & View Action */}
              <div className="pt-4 mt-4 border-t border-neutral-900 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-neutral-900 text-[10px] font-mono text-neutral-400 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-neutral-900 text-[10px] font-mono text-neutral-400">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-neutral-200">
                  <span>Inspect Case Study</span>
                  <span className="text-[#D51F16] font-bold">&rarr;</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-neutral-950 border border-neutral-850 space-y-3 my-8">
            <Layers className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-neutral-300 font-medium text-sm">
              No projects found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSource('all');
              }}
              className="text-xs text-[#D51F16] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* Case Study Deep Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectRelated={(p) => setActiveModalProject(p)}
      />
    </section>
  );
};

export default SelectedWorkSection;
