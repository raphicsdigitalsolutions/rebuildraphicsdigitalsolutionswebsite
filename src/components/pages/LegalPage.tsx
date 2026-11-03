/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Standalone Legal & Privacy Page for direct URL navigation.
 * Handles /privacy and /terms.
 */

import React from 'react';
import { useRouter } from '../../router/AgencyRouter';
import { BRAND_CONFIG } from '../../config/brand';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#080808] text-neutral-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <article className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-850 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
            {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span className="uppercase">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            {type === 'privacy'
              ? 'Privacy Policy & Data Disclosures'
              : 'Terms of Engagement & Service Guidelines'}
          </h1>

          <div className="space-y-5 text-sm leading-relaxed border-t border-neutral-850 pt-6">
            {type === 'privacy' ? (
              <>
                <h2 className="text-base font-heading font-bold text-white">
                  1. Information Handling
                </h2>
                <p>
                  When you submit an inquiry to Raphics Digital Solutions via our project brief form,
                  we collect your name, business email, organization, service category, and project scope.
                  The website backend receives these details so we can respond to your request. The storage method depends on the hosting environment. Do not submit passwords or other highly sensitive information through this form.
                </p>

                <h2 className="text-base font-heading font-bold text-white pt-2">
                  2. Handling of Shared Information
                </h2>
                <p>
                  Information submitted through this website is used to respond to inquiries and discuss potential work. Hosting and infrastructure providers may process submitted data to operate the website. Any additional confidentiality obligations for proprietary materials should be agreed in writing before those materials are shared.
                </p>

                <h2 className="text-base font-heading font-bold text-white pt-2">
                  3. External Platform Attribution
                </h2>
                <p>
                  Our site connects with official public profiles on GitHub, Behance, Fiverr, Upwork,
                  and FusionArt. Interactions on those platforms are subject to their respective terms.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-base font-heading font-bold text-white">
                  1. Project Scoping & Deliverables
                </h2>
                <p>
                  Creative, packaging, software development, and AI engineering services are executed
                  under mutually defined project milestones and agreed specifications.
                </p>

                <h2 className="text-base font-heading font-bold text-white pt-2">
                  2. Manufacturing & Pre-Press Verification
                </h2>
                <p>
                  For physical packaging designs, clients are responsible for conducting a physical proof check
                  with their chosen printer to verify die cuts, text sizes, and color registrations prior to full production runs.
                </p>

                <h2 className="text-base font-heading font-bold text-white pt-2">
                  3. Intellectual Property Rights
                </h2>
                <p>
                  Ownership, licensing, and transfer rights for deliverables are defined by the written agreement for each project. Do not assume that ownership transfers unless the applicable agreement explicitly says so.
                </p>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-850 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>{BRAND_CONFIG.name}</span>
            <span>Direct Inquiries: {BRAND_CONFIG.contact.email}</span>
          </div>
        </article>

      </div>
    </div>
  );
};

export default LegalPage;
