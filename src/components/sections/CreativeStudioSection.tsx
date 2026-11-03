/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Creative Studio Section for Raphics Digital Solutions.
 * "WE MAKE BRANDS IMPOSSIBLE TO IGNORE."
 * Showcases Branding, Packaging, Print, and Digital Design with interactive 3D visualizer.
 */

import React, { useState } from 'react';
import { CREATIVE_SERVICES, ServiceCategoryGroup } from '../../data/services';
import { PackagingPreview3D } from '../3d/PackagingPreview3D';
import { Sparkles, Box, Printer, Monitor, CheckCircle2, ArrowRight } from 'lucide-react';

interface CreativeStudioSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const CreativeStudioSection: React.FC<CreativeStudioSectionProps> = ({
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('packaging');

  const selectedGroup =
    CREATIVE_SERVICES.find((cat) => cat.id === activeCategory) || CREATIVE_SERVICES[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'branding':
        return <Sparkles className="w-4 h-4" />;
      case 'packaging':
        return <Box className="w-4 h-4" />;
      case 'print':
        return <Printer className="w-4 h-4" />;
      case 'digital-design':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="creative" className="relative py-28 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D51F16]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
              <span>02 // CREATIVE STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
              We Make Brands <span className="text-[#D51F16]">Impossible To Ignore.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              From clinical nutraceutical labels and luxury cosmetic dropper bottles to complete brand architecture
              and print engineering &mdash; our creative studio bridges graphic distinction and physical manufacturing precision.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-850">
            {CREATIVE_SERVICES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Studio Showcase Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive 3D Product Visualizer or Visual Feature Card */}
          <div className="lg:col-span-5 space-y-4">
            <PackagingPreview3D productName={selectedGroup.title} />

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span className="font-mono text-neutral-300">
                Current Studio Focus: <strong className="text-white">{selectedGroup.title}</strong>
              </span>
              <span className="text-[#D51F16] font-mono">3D PBR REALTIME</span>
            </div>
          </div>

          {/* Right Column: Active Category Sub-services */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
                <span>{selectedGroup.badge} DISCIPLINE</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {selectedGroup.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedGroup.description}
              </p>
            </div>

            {/* Sub-services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGroup.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-850 hover:border-[#D51F16]/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors">
                        {item.name}
                      </h4>
                      {item.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D51F16]/20 border border-[#D51F16]/40 text-[10px] font-mono text-[#D51F16]">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Deliverables tags */}
                  <div className="space-y-2 pt-3 border-t border-neutral-900">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                      Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.deliverables.map((deliv, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-neutral-900 text-[11px] text-neutral-300 border border-neutral-800"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex items-center justify-between p-4 rounded-2xl bg-[#D51F16]/10 border border-[#D51F16]/20">
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#D51F16]" />
                <span>Ready for commercial packaging or brand overhaul?</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D51F16] hover:text-white transition-colors"
              >
                <span>Request Creative Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CreativeStudioSection;
