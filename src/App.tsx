/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RAPHICS DIGITAL SOLUTIONS
 * Premium 3D Creative Technology Agency Website
 * "Digital Magic For Real Success."
 */

import React from 'react';
import { RouterProvider, useRouter } from './router/AgencyRouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ScrollServicesExperience } from './components/sections/ScrollServicesExperience';
import { FeaturedWorkSection } from './components/sections/FeaturedWorkSection';
import { ApproachSection } from './components/sections/ApproachSection';
import { ClosingCTASection } from './components/sections/ClosingCTASection';
import { AboutSection } from './components/sections/AboutSection';
import { CreativeStudioSection } from './components/sections/CreativeStudioSection';
import { DevelopmentStudioSection } from './components/sections/DevelopmentStudioSection';
import { AILabSection } from './components/sections/AILabSection';
import { WhyRaphicsSection } from './components/sections/WhyRaphicsSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { FAQPage } from './components/pages/FAQPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { LegalPage } from './components/pages/LegalPage';
import { BRAND_CONFIG } from './config/brand';
import { MessageSquare } from 'lucide-react';

function AgencyContent() {
  const { currentPath, projectId, serviceId, navigate } = useRouter();

  // 1. Individual project details: /work/:id and legacy aliases.
  if (currentPath === '/work/:id' && projectId) {
    return <ProjectDetailPage projectId={projectId} />;
  }

  // 2. Individual Service Detail Page: /services/:id
  if (currentPath === '/services/:id' && serviceId) {
    return <ServiceDetailPage serviceId={serviceId} />;
  }

  // 3. Legal standalone pages
  if (currentPath === '/privacy') {
    return <LegalPage type="privacy" />;
  }
  if (currentPath === '/terms') {
    return <LegalPage type="terms" />;
  }

  // 4. Dedicated section views
  if (currentPath === '/about') {
    return (
      <div className="pt-20">
        <AboutSection />
        <WhyRaphicsSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/creative') {
    return (
      <div className="pt-20">
        <CreativeStudioSection />
        <SelectedWorkSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/development') {
    return (
      <div className="pt-20">
        <DevelopmentStudioSection />
        <SelectedWorkSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/ai-lab') {
    return (
      <div className="pt-20">
        <AILabSection />
        <SelectedWorkSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/services') {
    return (
      <div className="pt-20">
        <CreativeStudioSection />
        <DevelopmentStudioSection />
        <AILabSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/work') {
    return (
      <div className="pt-20">
        <SelectedWorkSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/process') {
    return (
      <div className="pt-20">
        <ProcessSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/faq') {
    return (
      <div className="pt-20">
        <FAQPage />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/contact') {
    return (
      <div className="pt-20">
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/404') return <NotFoundPage />;

  // Focused editorial homepage: one hero, one scroll-linked service story, work, approach and contact.
  return (
    <>
      <HeroSection
        onExploreWork={() => navigate('/work')}
        onStartProject={() => navigate('/contact')}
      />
      <ScrollServicesExperience onOpenService={navigate} />
      <FeaturedWorkSection />
      <ApproachSection />
      <ClosingCTASection />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-[#080808] text-white flex flex-col relative selection:bg-[#D51F16] selection:text-white">
        {/* Top Fixed Header */}
        <Navbar />

        {/* Main Agency Content Flow (Dynamically routed) */}
        <main className="flex-grow">
          <AgencyContent />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action (Only if configured with real verified number) */}
        {BRAND_CONFIG.contact.whatsapp.isConfigured && BRAND_CONFIG.contact.whatsapp.whatsappUrl && (
          <aside aria-label="WhatsApp messaging" className="fixed bottom-6 right-6 z-40">
            <a
              href={BRAND_CONFIG.contact.whatsapp.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Send a WhatsApp message to ${BRAND_CONFIG.contact.whatsapp.display}; messaging only`}
              className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#151515]/95 px-4 py-3 text-xs font-medium text-white shadow-[0_8px_28px_rgba(0,0,0,.36)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#1b1b1b]"
              title={`Send a WhatsApp message to ${BRAND_CONFIG.contact.whatsapp.display}; this number is not for calls`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-mono">WhatsApp message</span>
            </a>
          </aside>
        )}
      </div>
    </RouterProvider>
  );
}
