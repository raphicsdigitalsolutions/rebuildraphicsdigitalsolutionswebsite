/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Client Testimonials & Reviews Section for Raphics Digital Solutions.
 * Built strictly according to Phase 2 integrity standards:
 * - Shows only verifiable reviews (zero synthetic testimonials).
 * - Provides an authentic platform verification hub linking directly to
 *   the founder's official profiles on Fiverr, Upwork, FusionArt, and Behance.
 */

import React, { useState } from 'react';
import { CLIENT_REVIEWS, VERIFIED_REVIEW_PLATFORMS, ReviewPlatform } from '../../data/reviews';
import { BRAND_CONFIG } from '../../config/brand';
import { Star, ExternalLink, ShieldCheck, CheckCircle2, MessageSquareQuote, ArrowUpRight } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  // Only create filters for platforms that actually have verified reviews
  const platformsWithReviews = Array.from(new Set(CLIENT_REVIEWS.map((r) => r.platform)));
  const [platformFilter, setPlatformFilter] = useState<'all' | ReviewPlatform>('all');

  const filteredReviews = CLIENT_REVIEWS.filter(
    (rev) => platformFilter === 'all' || rev.platform === platformFilter
  );

  return (
    <section id="reviews" className="relative py-24 bg-[#080808] border-t border-neutral-900 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D51F16]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-[#D51F16]">
              <span>FOUNDER PROFILES & CLIENT FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-heading text-white">
              Professional Profiles. <span className="text-[#D51F16]">Work You Can Explore.</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We uphold strict professional integrity. Rather than publishing unverified or synthetic testimonials,
              we direct you to our founder’s public professional profiles and review histories where available. Ratings and order feedback are shown by the platforms themselves.
            </p>
          </div>

          {/* Platform Filters - Only rendered if there are verified reviews */}
          {platformsWithReviews.length > 0 && (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-950 border border-neutral-850">
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  platformFilter === 'all'
                    ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Reviews ({CLIENT_REVIEWS.length})
              </button>
              {platformsWithReviews.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    platformFilter === p
                      ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* If verified reviews are populated, render them */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                      {rev.platform}
                    </span>
                    {rev.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(rev.rating))].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D51F16] text-[#D51F16]" />
                        ))}
                        <span className="text-xs font-mono font-bold text-white ml-1">
                          {rev.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{rev.reviewText}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-heading font-bold text-white">{rev.clientName}</h4>
                    <span className="text-[10px] font-mono text-neutral-500 block">{rev.projectTitle}</span>
                  </div>
                  <a
                    href={rev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Testimonial State & Verified Platform Portal */
          <div className="space-y-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VERIFIED_REVIEW_PLATFORMS.map((plat) => (
                <div
                  key={plat.platform}
                  className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 hover:border-[#D51F16]/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-[10px] font-mono text-[#D51F16] border border-neutral-800 font-semibold">
                        PROFILE
                      </span>
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#D51F16] transition-colors">
                      {plat.platform}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {plat.scope}
                    </p>

                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 text-[11px] text-neutral-300 leading-normal">
                      {plat.verificationNote}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-900">
                    <a
                      href={plat.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs font-mono text-neutral-300 hover:text-white group-hover:text-[#D51F16] transition-colors"
                    >
                      <span>View Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Informational Callout */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {BRAND_CONFIG.transparencyNote}
                </span>
              </div>
              <a
                href="#contact"
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 hover:border-[#D51F16] transition-all whitespace-nowrap"
              >
                Request Client References &rarr;
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ReviewsSection;
