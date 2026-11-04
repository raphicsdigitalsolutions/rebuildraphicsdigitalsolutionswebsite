/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Official Footer for Raphics Digital Solutions.
 * Verified profiles, router integration, contact channels, and legal links.
 */

import React from 'react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG } from '../../config/brand';
import { useRouter } from '../../router/AgencyRouter';
import { Mail, MessageSquare, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = 2026;
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060606] border-t border-neutral-900 pt-16 pb-12 overflow-hidden text-neutral-400">
      {/* Background Subtle Ambient Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#D51F16]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Column 1 & 2: Brand Identity & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="stacked" height={108} onClick={() => navigate('/')} />
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mt-3">
              {BRAND_CONFIG.heroDescription}
            </p>
            <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-[#D51F16] font-bold">TAGLINE:</span>
                <span className="text-neutral-200">"{BRAND_CONFIG.tagline}"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D51F16] font-bold">STATUS:</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {BRAND_CONFIG.contact.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: The 5 Core Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-semibold">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/creative')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creative Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/development')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Digital Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ai-lab')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI & Automation Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/reviews')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Trust & Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Services
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Verified Profiles */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-semibold">
              Verified Profiles
            </h4>
            <ul className="space-y-2 text-sm">
              {Object.entries(BRAND_CONFIG.profiles).map(([key, item]) => (
                <li key={key}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#D51F16] transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Direct Communication */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-200 font-semibold">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 text-neutral-300 hover:text-white transition-all text-xs">
                <Mail className="w-4 h-4 text-[#D51F16]" /><span className="truncate">{BRAND_CONFIG.contact.email}</span>
              </a>
              <a href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 text-neutral-300 hover:text-white transition-all text-xs">
                <MessageSquare className="w-4 h-4 text-[#D51F16]" /><span>WhatsApp Message — UK</span>
              </a>
              <a href={BRAND_CONFIG.contact.localPhone.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 text-neutral-300 hover:text-white transition-all text-xs">
                <MessageSquare className="w-4 h-4 text-[#D51F16]" /><span>WhatsApp — Pakistan</span>
              </a>
              <a href={BRAND_CONFIG.contact.localPhone.telUrl} className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-[#D51F16]/50 text-neutral-300 hover:text-white transition-all text-xs">
                <Phone className="w-4 h-4 text-[#D51F16]" /><span>Call {BRAND_CONFIG.contact.localPhone.display}</span>
              </a>
              <div className="flex items-start gap-2 pt-2 text-[11px] leading-5 text-neutral-400">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D51F16]" /><span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="pt-2 text-[11px] text-neutral-400">Independent Creative, Software & AI Agency.</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Navigation */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D51F16]" />
            <span>
              &copy; {currentYear} {BRAND_CONFIG.name}. All Rights Reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-[#D51F16] transition-colors cursor-pointer flex items-center gap-1"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
