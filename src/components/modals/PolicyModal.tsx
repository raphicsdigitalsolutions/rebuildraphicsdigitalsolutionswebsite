/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Privacy Policy & Terms Modal for Raphics Digital Solutions.
 * Written with accurate, neutral policies without fabricated warranties,
 * unverified certifications, or invented legal entities.
 */

import React, { useEffect } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0e0e] border border-neutral-800 shadow-2xl p-6 sm:p-8 text-neutral-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D51F16]">
            {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span className="uppercase">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-5 text-sm leading-relaxed text-neutral-300">
          {type === 'privacy' ? (
            <>
              <h2 className="text-xl font-heading font-bold text-white">
                Privacy Policy & Information Practices
              </h2>
              <p className="text-xs font-mono text-neutral-500">
                Raphics Digital Solutions &bull; Client Data Disclosures
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                1. Information Collected
              </h3>
              <p>
                When you submit an inquiry through our contact form, we collect the details you provide:
                your name, email address, optional organization name, selected service, estimated budget
                range, and project brief. This information is stored in our inquiry records solely to evaluate
                your project scope and reply to your request.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                2. Use of Project Materials
              </h3>
              <p>
                Project briefs, design requirements, and reference assets provided by clients are kept
                confidential and used only for scoping proposals and executing agreed design or engineering work.
                We do not sell, rent, or trade your contact details or project descriptions to third parties.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                3. Third-Party Platforms
              </h3>
              <p>
                Our website links to official external profiles on platforms including GitHub, Behance,
                Fiverr, Upwork, and FusionArt. When interacting with those platforms, their respective
                privacy policies and terms of service apply.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                4. Data Inquiries & Contact
              </h3>
              <p>
                For questions regarding your submitted inquiry details or to request removal of your contact record,
                you may reach our team directly at {BRAND_CONFIG.contact.email}.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-heading font-bold text-white">
                Terms of Engagement & Service Guidelines
              </h2>
              <p className="text-xs font-mono text-neutral-500">
                Raphics Digital Solutions &bull; General Project Terms
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                1. Scope of Engagement
              </h3>
              <p>
                All creative design, packaging dielines, 3D visualization, software engineering, and AI
                automation projects are carried out under written project agreements or platform contracts
                specifying deliverables, estimated timelines, and revision parameters.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                2. Client Approvals & Production Verification
              </h3>
              <p>
                For physical packaging and print collateral, clients are responsible for verifying all final
                artwork, regulatory compliance texts, nutrition/supplement fact tables, barcodes, and print
                proofs with their selected manufacturing or printing vendors before commencing commercial production runs.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                3. Intellectual Property Rights
              </h3>
              <p>
                Ownership and usage rights of final deliverables are governed by individual project agreements
                and transfer upon completion and settlement of project terms. Public or open-source software
                repositories are governed by their respective repository licenses (e.g., MIT, Apache 2.0) as documented on GitHub.
              </p>

              <h3 className="text-sm font-heading font-bold text-white pt-2">
                4. Profile & Portfolio Attribution
              </h3>
              <p>
                Approved packaging designs, public case studies, and open-source repositories may be displayed
                in our portfolio to showcase our capabilities, in accordance with applicable platform and client agreements.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>{BRAND_CONFIG.name}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
