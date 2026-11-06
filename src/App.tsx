import React from 'react';
import { RouterProvider, useRouter } from './router/AgencyRouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AgencyPages } from './components/pages/AgencyPages';
import { LegalPage } from './components/pages/LegalPage';
import { BRAND_CONFIG } from './config/brand';
import { WhatsAppIcon } from './components/brand/WhatsAppIcon';

function AgencyContent() {
  const { currentPath, projectId, serviceId, navigate } = useRouter();

  if (currentPath === '/privacy') return <LegalPage type="privacy" />;
  if (currentPath === '/terms') return <LegalPage type="terms" />;

  return (
    <AgencyPages
      path={currentPath}
      projectId={projectId}
      serviceId={serviceId}
      navigate={navigate}
    />
  );
}

export default function App() {
  return (
    <RouterProvider>
      <div className="agency-app min-h-screen bg-[#080808] text-white flex flex-col relative selection:bg-[#D51F16] selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <AgencyContent />
        </main>
        <Footer />
        {BRAND_CONFIG.contact.whatsapp.isConfigured && BRAND_CONFIG.contact.whatsapp.whatsappUrl && (
          <aside aria-label="Direct WhatsApp Contact" className="agency-floating-contact">
            <a
              href={BRAND_CONFIG.contact.whatsapp.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Message Raphics Digital Solutions on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </aside>
        )}
      </div>
    </RouterProvider>
  );
}
