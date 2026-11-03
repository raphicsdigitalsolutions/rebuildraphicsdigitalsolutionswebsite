/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Individual Service Detail Page for Raphics Digital Solutions.
 * Accessible directly at /services/:id.
 */

import React from 'react';
import { CREATIVE_SERVICES, DEVELOPMENT_SERVICES, AI_SERVICES, ServiceItem } from '../../data/services';
import { useRouter } from '../../router/AgencyRouter';
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles, Code2, Cpu } from 'lucide-react';

export const ServiceDetailPage: React.FC<{ serviceId?: string }> = ({ serviceId }) => {
  const { navigate } = useRouter();

  // Find matching service item across all service catalogs
  const allServices: ServiceItem[] = [
    ...CREATIVE_SERVICES.flatMap((g) => g.items),
    ...DEVELOPMENT_SERVICES,
    ...AI_SERVICES,
  ];

  const service = allServices.find(
    (s) => s.id.toLowerCase() === serviceId?.toLowerCase()
  );

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#080808]">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Service Not Found</h2>
        <p className="text-sm text-neutral-400 max-w-md mb-6">
          The requested service catalog could not be located.
        </p>
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D51F16] text-white text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Services</span>
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-28 pb-20 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
          <button
            onClick={() => navigate('/services')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </button>
          <span>/</span>
          <span className="text-neutral-500 uppercase">{service.category}</span>
          <span>/</span>
          <span className="text-white truncate">{service.name}</span>
        </div>

        {/* Hero Card */}
        <header className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 mb-10 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
            <span>SERVICE ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl">
            {service.summary}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(213,31,22,0.4)] cursor-pointer"
            >
              <span>Request Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Deliverables Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#D51F16] font-bold">
              Deliverables & Specifications
            </h2>
            <div className="space-y-3">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {service.toolsAndTech && (
            <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                Tools & Technology Applied
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {service.toolsAndTech.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </article>
  );
};

export default ServiceDetailPage;
