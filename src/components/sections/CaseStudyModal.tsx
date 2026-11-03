/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Case Study Modal for Raphics Digital Solutions.
 * Displays comprehensive, verified project case study details:
 * Problem, Solution, Tech Stack, Key Features, Challenges, and official external links.
 */

import React, { useEffect } from 'react';
import { PortfolioProject, PORTFOLIO_PROJECTS } from '../../data/portfolio';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectRelated: (proj: PortfolioProject) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectRelated,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find related projects in same category
  const relatedProjects = PORTFOLIO_PROJECTS.filter(
    (p) => p.id !== project.id && (p.category === project.category || p.source === project.source)
  ).slice(0, 3);

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
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d0d0d] border border-neutral-800 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-850">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-mono border uppercase tracking-wider ${getStatusBadge(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <span className="text-xs font-mono text-neutral-400 uppercase hidden sm:inline">
              // {project.source === 'behance' ? 'Behance Portfolio' : 'GitHub Repository'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cinematic Project Header Showcase */}
        <div
          className={`relative p-8 sm:p-12 bg-gradient-to-br ${project.visualTheme.gradient} border-b border-neutral-850 overflow-hidden`}
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.visualTheme.primaryColor }} />
              <span>{project.category}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              {project.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              {project.tagline}
            </p>

            {/* Official Source Link Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(213,31,22,0.4)]"
              >
                {project.source === 'github' ? (
                  <>
                    <Github className="w-4 h-4" />
                    <span>View GitHub Source Code</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Behance Profile</span>
                  </>
                )}
              </a>

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-700 transition-colors"
                >
                  <span>Launch Live Demonstration</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body: Project Breakdown */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D51F16] font-bold">
              01 // PROJECT OVERVIEW
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>THE CHALLENGE</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>OUR SOLUTION</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D51F16] font-bold">
              02 // KEY SPECIFICATIONS & DELIVERABLES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.mainFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D51F16] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Execution Details */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Project Tools & Technologies:
              </h3>
              <span className="text-[11px] font-mono text-[#D51F16]">
                OFFICIAL REPO / ARTWORK
              </span>
            </div>
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
          </div>

          {/* Engineering / Design Challenges Note */}
          <div className="p-4 rounded-xl bg-neutral-900/40 border-l-2 border-[#D51F16] text-xs text-neutral-400 leading-relaxed">
            <strong className="text-neutral-200 font-mono block mb-1">
              Technical / Design Obstacle Overcome:
            </strong>
            {project.challenges}
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-6 border-t border-neutral-850 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Related Portfolio Projects
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProjects.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 cursor-pointer transition-colors group"
                  >
                    <span className="text-[10px] font-mono text-[#D51F16] uppercase block">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors truncate">
                      {rel.title}
                    </h5>
                    <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-1">
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 bg-neutral-950 border-t border-neutral-850 rounded-b-3xl text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public portfolio and repository links &bull; Raphics Digital Solutions</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};

export default CaseStudyModal;
