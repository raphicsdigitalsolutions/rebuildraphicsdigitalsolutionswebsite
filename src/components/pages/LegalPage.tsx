import React from 'react';
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';
import { BRAND_CONFIG } from '../../config/brand';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { navigate } = useRouter();
  const isPrivacy = type === 'privacy';

  return (
    <section className="min-h-[70vh] border-t border-white/10 bg-[#080808] py-24 text-neutral-300 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <button onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </button>
        <article className="border-y border-white/10 py-8 sm:py-12">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#D51F16]">
            {isPrivacy ? <ShieldCheck className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {isPrivacy ? 'Privacy and contact details' : 'Website and project terms'}
          </h1>
          <p className="mt-3 text-xs text-neutral-500">Updated 13 November 2026</p>

          {isPrivacy ? (
            <div className="mt-10 space-y-7 text-sm leading-7 text-neutral-400">
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Contact form</h2>
                <p>The hosted website prepares an email in your email application. The website does not submit or store the form contents; the message is sent only if you review and send it from your email account. Messages sent directly to our email are handled by the email providers involved.</p>
              </section>
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Website services and external links</h2>
                <p>The site loads fonts from Google Fonts. Opening an external project or social link connects you to that provider, whose own privacy terms apply. The current site does not use an analytics tracker.</p>
              </section>
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Contact</h2>
                <p>For questions about privacy or a message you have sent, email <a className="text-white underline underline-offset-4" href={`mailto:${BRAND_CONFIG.contact.email}`}>{BRAND_CONFIG.contact.email}</a>.</p>
              </section>
            </div>
          ) : (
            <div className="mt-10 space-y-7 text-sm leading-7 text-neutral-400">
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Website information</h2>
                <p>Website content and portfolio entries are provided for general information. Projects marked as prototypes, pre-delivery, or in development are not represented as finished production services.</p>
              </section>
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Project agreements</h2>
                <p>Project scope, quotation, payment, deliverables, revision stages, intellectual property, timing, and support are agreed in writing for each engagement. The website does not establish fixed prices or delivery times.</p>
              </section>
              <section>
                <h2 className="mb-2 text-base font-medium text-white">Product and AI information</h2>
                <p>AI and educational prototypes can produce incorrect information. They are not medical, financial, investment, tax, or legal advice and must not replace qualified professional judgement.</p>
              </section>
            </div>
          )}
        </article>
        <div className="pt-5 text-xs text-neutral-500">{BRAND_CONFIG.name} · {BRAND_CONFIG.contact.location}</div>
      </div>
    </section>
  );
};

export default LegalPage;
