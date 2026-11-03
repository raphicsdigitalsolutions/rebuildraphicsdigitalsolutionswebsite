/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Individual Project Detail Page for Raphics Digital Solutions.
 * Accessible directly at /portfolio/:id or /project/:id.
 */

import React from 'react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../../data/portfolio';
import { useRouter } from '../../router/AgencyRouter';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ProjectDetailPage: React.FC<{ projectId?: string }> = ({ projectId }) => {
  const { navigate } = useRouter();

  const project: PortfolioProject | undefined = PORTFOLIO_PROJECTS.find(
    (p) => p.id.toLowerCase() === projectId?.toLowerCase()
  );

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#080808]">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-[#D51F16]">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Project Not Found</h2>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          The requested portfolio project or repository could not be located in our verified archive.
        </p>
        <button
          onClick={() => navigate('/portfolio')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </button>
      </div>
    );
  }

  const related = PORTFOLIO_PROJECTS.filter(
    (p) => p.id !== project.id && (p.category === project.category || p.source === project.source)
  ).slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Live Product':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Open Source Project':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Working Prototype':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Development Project':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Experimental Project':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <article className="min-h-screen pt-28 pb-20 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
          <button
            onClick={() => navigate('/portfolio')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Selected Work</span>
          </button>
          <span>/</span>
          <span className="text-neutral-500 uppercase">{project.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{project.title}</span>
        </div>

        {/* Cinematic Header Card */}
        <header
          className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${project.visualTheme.gradient} border border-white/10 relative overflow-hidden mb-12 shadow-2xl`}
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider ${getStatusBadge(
                  project.status
                )}`}
              >
                {project.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-neutral-300">
                {project.source === 'github' ? 'GitHub Software' : 'Behance Creative'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
              {project.tagline}
            </p>

            {/* Official Source Links */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(213,31,22,0.4)]"
              >
                {project.source === 'github' ? (
                  <>
                    <Github className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project on Behance</span>
                  </>
                )}
              </a>

              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-medium border border-neutral-700 transition-colors cursor-pointer"
              >
                <span>Inquire About Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Detailed Case Study Content */}
        <div className="space-y-10">
          
          {/* Overview */}
          <section className="p-8 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#D51F16] font-bold">
              01 // PROJECT OVERVIEW
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>CHALLENGE & REQUIREMENTS</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>ARCHITECTURAL & DESIGN SOLUTION</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Specifications & Features */}
          <section className="p-8 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#D51F16] font-bold">
              02 // KEY SPECIFICATIONS & DELIVERABLES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.mainFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-850 text-xs text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D51F16] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Confirmed Tech Stack */}
          <section className="p-6 rounded-2xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono text-neutral-400 uppercase">
              Confirmed Tech Stack & Tools:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Technical Obstacles Overcome */}
          <section className="p-6 rounded-2xl bg-neutral-900/40 border-l-2 border-[#D51F16] text-xs text-neutral-400 leading-relaxed">
            <strong className="text-neutral-200 font-mono block mb-1">
              Engineering / Creative Obstacle Overcome:
            </strong>
            {project.challenges}
          </section>

          {/* Related Projects */}
          {related.length > 0 && (
            <section className="pt-8 border-t border-neutral-850 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Related Work in Archive
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/portfolio/${rel.id}`)}
                    className="p-4 rounded-2xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono text-[#D51F16] block mb-1 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors truncate">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-2">
                      <span>View case study</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </article>
  );
};

export default ProjectDetailPage;
