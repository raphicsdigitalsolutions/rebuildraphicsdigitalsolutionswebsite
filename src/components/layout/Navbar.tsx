/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Header Navigation for Raphics Digital Solutions.
 * Glassmorphic sticky bar, HTML5 history router integration,
 * active route indicators, and mobile drawer.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG } from '../../config/brand';
import { useRouter } from '../../router/AgencyRouter';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  const { currentPath, navigate } = useRouter();

  useEffect(() => {
    if (!mobileMenuOpen) {
      if (wasMenuOpen.current) menuTriggerRef.current?.focus();
      wasMenuOpen.current = false;
      return;
    }

    wasMenuOpen.current = true;
    mobileMenuRef.current?.querySelector<HTMLElement>('nav button')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !mobileMenuRef.current) return;
      const items = Array.from(mobileMenuRef.current.querySelectorAll<HTMLElement>('button, a[href]'))
        .filter((item) => !item.hasAttribute('disabled'));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (currentPath === '/') {
        let nextActiveSection = 'hero';
        const sections = ['about', 'services', 'portfolio', 'process'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              nextActiveSection = section;
              break;
            }
          }
        }
        setActiveSection(nextActiveSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navLinks = [
    { label: 'Services', path: '/services', id: 'services' },
    { label: 'Work', path: '/work', id: 'portfolio' },
    { label: 'About', path: '/about', id: 'about' },
    { label: 'Process', path: '/process', id: 'process' },
    { label: 'FAQ', path: '/faq', id: 'faq' },
  ];

  const handleNavClick = (path: string, sectionId: string) => {
    setMobileMenuOpen(false);

    if (currentPath === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    navigate(path);
  };

  return (
    <>
      <header className="floating-nav fixed left-0 right-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
        <div className={`floating-nav-shell mx-auto flex max-w-[1160px] items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-5 ${scrolled ? 'is-scrolled' : ''}`}>
          {/* Centralized Brand Logo */}
          <div className="flex items-center gap-3">
            <Logo variant="emblem" height={scrolled ? 34 : 38} onClick={() => navigate('/')} />
            <span className="floating-nav-wordmark"><strong>RAPHICS</strong><small>DIGITAL SOLUTIONS</small></span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.06] bg-black/20 px-1.5 py-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path || (currentPath === '/' && activeSection === link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.path, link.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] text-white'
                      : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Primary Start Project CTA */}
            <button
              onClick={() => {
                if (onOpenContactModal) {
                  onOpenContactModal();
                } else {
                  handleNavClick('/contact', 'contact');
                }
              }}
              className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold tracking-wide text-[#101010] transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            ref={menuTriggerRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Agency navigation" className="fixed inset-0 z-40 lg:hidden bg-[#080808]/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-widest pb-2 border-b border-neutral-850">
              Agency Navigation
            </div>
            <nav aria-label="Mobile navigation" className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.path, link.id)}
                  className="w-full text-left py-2.5 text-xl font-heading font-medium text-neutral-200 hover:text-[#D51F16] border-b border-neutral-900 flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600" aria-hidden="true" />
                </button>
              ))}
            </nav>
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
