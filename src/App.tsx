/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RAPHICS DIGITAL SOLUTIONS
 * Premium 3D Creative Technology Agency Website
 * "Digital Magic for Real Success."
 */

import React from 'react';
import { RouterProvider, useRouter } from './router/AgencyRouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { CreativeStudioSection } from './components/sections/CreativeStudioSection';
import { DevelopmentStudioSection } from './components/sections/DevelopmentStudioSection';
import { AILabSection } from './components/sections/AILabSection';
import { WhyRaphicsSection } from './components/sections/WhyRaphicsSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { TrustSection } from './components/sections/TrustSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { LegalPage } from './components/pages/LegalPage';
import { BRAND_CONFIG } from './config/brand';
import { MessageSquare } from 'lucide-react';

function AgencyContent() {
  const { currentPath, projectId, serviceId, navigate } = useRouter();

  // 1. Individual Project Detail Page: /portfolio/:id or /project/:id
  if (currentPath === '/portfolio/:id' && projectId) {
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

  if (currentPath === '/portfolio') {
    return (
      <div className="pt-20">
        <SelectedWorkSection />
        <ContactSection />
      </div>
    );
  }

  if (currentPath === '/reviews') {
    return (
      <div className="pt-20">
        <ReviewsSection />
        <TrustSection />
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

  // Default: Full Cinematic Agency Homepage
  return (
    <>
      {/* 1. Cinematic Full-Screen 3D Hero */}
      <HeroSection
        onExploreWork={() => navigate('/portfolio')}
        onStartProject={() => navigate('/contact')}
      />

      {/* 2. About Raphics & 4 Core Pillars */}
      <AboutSection />

      {/* 3. Creative Studio (Branding, Packaging, Print, Digital Design + 3D Product Visualizer) */}
      <CreativeStudioSection />

      {/* 4. Digital Development Studio (Web Apps, Custom CRM, Software Architecture) */}
      <DevelopmentStudioSection />

      {/* 5. AI & Automation Lab (3D Neural Nodes, RAG Systems, Voice Agents & Live Simulator) */}
      <AILabSection />

      {/* 6. Why Raphics (Design -> Development -> Intelligence Synergy) */}
      <WhyRaphicsSection />

      {/* 7. Selected Work (Real Behance Artworks & GitHub Repositories with Deep Case Studies) */}
      <SelectedWorkSection />

      {/* 8. Client Feedback & Professional Profiles (only source-confirmed reviews) */}
      <ReviewsSection />

      {/* 9. Professional Profiles and Public Work Links */}
      <TrustSection />

      {/* 10. Our 5-Stage Process (Discovery, Strategy, Design, Development, Delivery) */}
      <ProcessSection />

      {/* 11. Contact & Project Inquiries (Real backend /api/contact endpoint) */}
      <ContactSection />
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
          <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
            <a
              href={BRAND_CONFIG.contact.whatsapp.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-[0_8px_25px_rgba(16,185,129,0.35)] transition-all duration-200 hover:scale-105"
              title="Direct WhatsApp Chat with Raphics Agency"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Chat on WhatsApp</span>
            </a>
          </aside>
        )}
      </div>
    </RouterProvider>
  );
}
