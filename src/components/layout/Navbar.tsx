/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Header Navigation for Raphics Digital Solutions.
 * Glassmorphic sticky bar, HTML5 history router integration,
 * active route indicators, and mobile drawer.
 */

import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG } from '../../config/brand';
import { useRouter } from '../../router/AgencyRouter';
import { Menu, X, ArrowUpRight, MessageSquare, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { currentPath, navigate } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (currentPath === '/') {
        const sections = ['about', 'creative', 'development', 'ai-lab', 'portfolio', 'reviews', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navLinks = [
    { label: 'Creative', path: '/creative', id: 'creative' },
    { label: 'Development', path: '/development', id: 'development' },
    { label: 'AI & Automation', path: '/ai-lab', id: 'ai-lab' },
    { label: 'Selected Work', path: '/portfolio', id: 'portfolio' },
    { label: 'Client Reviews', path: '/reviews', id: 'reviews' },
    { label: 'About', path: '/about', id: 'about' },
  ];

  const handleNavClick = (path: string, sectionId: string) => {
    setMobileMenuOpen(false);

    if (currentPath === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }
    }

    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-neutral-850 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Centralized Brand Logo */}
          <div className="flex items-center gap-3">
            <Logo
              height={scrolled ? 36 : 42}
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md px-3">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path || (currentPath === '/' && activeSection === link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.path, link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Email or WhatsApp */}
            {BRAND_CONFIG.contact.whatsapp.isConfigured && BRAND_CONFIG.contact.whatsapp.whatsappUrl ? (
              <a
                href={BRAND_CONFIG.contact.whatsapp.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 transition-colors"
                title="Chat directly on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            ) : (
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 transition-colors"
                title="Send inquiry email"
              >
                <Mail className="w-3.5 h-3.5 text-[#D51F16]" />
                <span>Email Us</span>
              </a>
            )}

            {/* Primary Start Project CTA */}
            <button
              onClick={() => {
                if (onOpenContactModal) {
                  onOpenContactModal();
                } else {
                  handleNavClick('/contact', 'contact');
                }
              }}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(213,31,22,0.35)] hover:shadow-[0_0_30px_rgba(213,31,22,0.55)] cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#080808]/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-widest pb-2 border-b border-neutral-850">
              Agency Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.path, link.id)}
                className="w-full text-left py-2.5 text-xl font-heading font-medium text-neutral-200 hover:text-[#D51F16] border-b border-neutral-900 flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-600" />
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-neutral-850">
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}`}
              className="w-full py-3 rounded-xl bg-neutral-900 text-neutral-200 font-medium text-sm flex items-center justify-center gap-2 border border-neutral-800"
            >
              <Mail className="w-4 h-4 text-[#D51F16]" />
              <span>{BRAND_CONFIG.contact.email}</span>
            </a>
            <button
              onClick={() => handleNavClick('/contact', 'contact')}
              className="w-full py-3.5 rounded-xl bg-[#D51F16] hover:bg-[#B81912] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(213,31,22,0.4)] cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
