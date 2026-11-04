import React from 'react';
import { ArrowUpRight, Code2, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolio';
import { useRouter } from '../../router/AgencyRouter';

const FEATURED_IDS = [
  'nutralife-mens-gummies',
  'northforge-body-wash',
  'customraggpt',
];

const VISUALS: Record<string, { eyebrow: string; accent: string; layout: 'pack' | 'browser' }> = {
  'nutralife-mens-gummies': { eyebrow: 'PACKAGING / BRAND SYSTEM', accent: '#a9231b', layout: 'pack' },
  'northforge-body-wash': { eyebrow: 'PRODUCT / PACKAGING', accent: '#aa6b2d', layout: 'pack' },
  customraggpt: { eyebrow: 'AI / DOCUMENT INTELLIGENCE', accent: '#d51f16', layout: 'browser' },
};

export const FeaturedWorkSection: React.FC = () => {
  const { navigate } = useRouter();
  const projects = FEATURED_IDS.map((id) => PORTFOLIO_PROJECTS.find((project) => project.id === id)).filter(Boolean);

  return (
    <section id="portfolio" className="relative overflow-hidden border-t border-white/[0.07] bg-[#090909] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-7 sm:mb-16 sm:flex-row sm:items-end">
          <div className="max-w-2xl" data-reveal>
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">A few things we make</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Work that makes <span className="text-neutral-500">the idea real.</span>
            </h2>
          </div>
          <button onClick={() => navigate('/portfolio')} className="group inline-flex w-fit items-center gap-2 border-b border-white/20 pb-2 text-sm text-neutral-300 transition-colors hover:border-[#d51f16] hover:text-white">
            Explore all work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, index) => {
            if (!project) return null;
            const visual = VISUALS[project.id];
            const isBrowser = visual.layout === 'browser';
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => navigate(`/portfolio/${project.id}`)}
                className={`group overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-[#111] text-left transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_22px_65px_rgba(0,0,0,.38)] ${index === 2 ? 'md:col-span-2 md:grid md:grid-cols-[1.15fr_.85fr]' : ''}`}
              >
                <div className="work-art relative flex min-h-[280px] items-center justify-center overflow-hidden sm:min-h-[350px]" style={{ background: `radial-gradient(circle at 50% 42%, ${visual.accent}36, transparent 57%), linear-gradient(145deg,#171717,#090909 70%)` }}>
                  <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)', backgroundSize: '42px 42px' }} />
                  {!isBrowser ? (
                    <div className="relative z-10 transition-transform duration-700 group-hover:scale-[1.055] group-hover:-rotate-2" style={{ filter: 'drop-shadow(0 28px 28px rgba(0,0,0,.55))' }}>
                      <div className="relative flex h-[220px] w-[150px] flex-col items-center justify-center overflow-hidden border border-white/35 bg-gradient-to-br from-white/15 via-neutral-900 to-black shadow-2xl sm:h-[255px] sm:w-[174px]" style={{ transform: 'perspective(800px) rotateY(-13deg) rotateX(4deg)' }}>
                        <div className="absolute inset-x-0 top-0 h-2" style={{ background: visual.accent }} />
                        <div className="mt-4 text-[8px] font-mono tracking-[0.22em] text-white/70">RDS / CONCEPT</div>
                        <div className="mt-8 text-center text-2xl font-semibold tracking-tight text-white">NUTRA<span style={{ color: visual.accent }}>LIFE</span></div>
                        <div className="mt-2 h-px w-16 bg-white/60" />
                        <div className="mt-3 text-[7px] uppercase tracking-[0.16em] text-white/60">Daily essentials</div>
                        <div className="absolute bottom-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-sm text-white">+</div>
                        <div className="absolute right-0 top-0 h-full w-3 bg-white/10" />
                      </div>
                      <div className="absolute -right-10 top-9 h-[185px] w-[38px] -skew-y-6 border border-white/20 bg-gradient-to-r from-neutral-700 to-black" />
                    </div>
                  ) : (
                    <div className="relative z-10 w-[min(82%,520px)] overflow-hidden rounded-xl border border-white/20 bg-[#101114] shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#191a1e] px-3">
                        <i className="h-2 w-2 rounded-full bg-[#d51f16]" /><i className="h-2 w-2 rounded-full bg-white/35" /><i className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="ml-3 text-[8px] font-mono text-white/35">knowledge.studio / workspace</span>
                      </div>
                      <div className="grid grid-cols-[88px_1fr] gap-3 p-4 sm:grid-cols-[112px_1fr] sm:p-6">
                        <div className="space-y-2 border-r border-white/10 pr-3">
                          {['Library','Sources','History','Settings'].map((item, i) => <div key={item} className={`rounded px-2 py-1.5 text-[8px] ${i===0?'bg-[#d51f16]/20 text-white':'text-white/35'}`}>{item}</div>)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white sm:text-lg">Ask your knowledge base.</div>
                          <div className="mt-2 h-2 w-4/5 rounded bg-white/10" />
                          <div className="mt-1 h-2 w-3/5 rounded bg-white/10" />
                          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                            <div className="mb-2 flex items-center gap-2 text-[8px] text-[#ff827a]"><Sparkles className="h-3 w-3" /> SOURCE-GROUNDED RESPONSE</div>
                            <div className="h-2 w-full rounded bg-white/15" /><div className="mt-2 h-2 w-4/5 rounded bg-white/10" /><div className="mt-2 h-2 w-2/3 rounded bg-white/10" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em] text-white/55">
                    {isBrowser ? <Code2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {visual.eyebrow}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 p-6 sm:p-7">
                  <div>
                    <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500">{project.category}</p>
                    <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">{project.title}</h3>
                    <p className="mt-2 max-w-lg text-xs leading-6 text-neutral-500">{project.tagline}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all duration-300 group-hover:border-[#d51f16] group-hover:bg-[#d51f16] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
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
