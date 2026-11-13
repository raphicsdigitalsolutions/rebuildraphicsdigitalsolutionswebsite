import React from 'react';
import { Facebook, Instagram, Mail, MapPin, MessageSquare, PhoneCall, ShieldCheck, Linkedin } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG } from '../../config/brand';
import { useRouter } from '../../router/AgencyRouter';

const socials = [
  { name: 'LinkedIn', href: BRAND_CONFIG.socials.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: BRAND_CONFIG.socials.instagram, Icon: Instagram },
  { name: 'Facebook', href: BRAND_CONFIG.socials.facebook, Icon: Facebook },
];

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080808] py-14 text-neutral-400 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 xl:grid-cols-[1.25fr_.8fr_.8fr_1.3fr]">
          <div className="space-y-4">
            <Logo height={48} onClick={() => navigate('/')} />
            <p className="max-w-sm text-sm leading-7 text-neutral-400">Creative design, digital development, and practical AI automation for businesses.</p>
            <p className="text-xs font-mono text-neutral-500">{BRAND_CONFIG.tagline}</p>
          </div>

          <nav aria-label="Services" className="space-y-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white">Services</h2>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/services/creative-studio')} className="hover:text-white">Creative Studio</button></li>
              <li><button onClick={() => navigate('/services/digital-development')} className="hover:text-white">Digital Development</button></li>
              <li><button onClick={() => navigate('/services/ai-automation')} className="hover:text-white">AI & Automation</button></li>
            </ul>
          </nav>

          <nav aria-label="Explore" className="space-y-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white">Explore</h2>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/work')} className="hover:text-white">Work</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => navigate('/process')} className="hover:text-white">Process</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-white">FAQ</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-white">Contact</button></li>
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white">Contact</h2>
            <div className="space-y-2 text-xs">
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="flex items-center gap-2 text-neutral-300 hover:text-white">
                <Mail className="h-4 w-4 text-[#D51F16]" /> {BRAND_CONFIG.contact.email}
              </a>
              <a href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-300 hover:text-white">
                <MessageSquare className="h-4 w-4 text-emerald-400" /> UK WhatsApp messages · {BRAND_CONFIG.contact.whatsapp.display}
              </a>
              <a href={BRAND_CONFIG.contact.phone.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-300 hover:text-white">
                <MessageSquare className="h-4 w-4 text-emerald-400" /> Pakistan WhatsApp · {BRAND_CONFIG.contact.phone.display}
              </a>
              <a href={BRAND_CONFIG.contact.phone.telUrl} className="flex items-center gap-2 text-neutral-300 hover:text-white">
                <PhoneCall className="h-4 w-4 text-[#D51F16]" /> Pakistan calls · {BRAND_CONFIG.contact.phone.display}
              </a>
            </div>

            <div className="flex items-center gap-2 pt-1" aria-label="Official agency social accounts">
              {socials.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex h-9 w-9 items-center justify-center border border-white/10 text-neutral-300 transition-colors hover:border-[#D51F16] hover:text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <a href={BRAND_CONFIG.contact.locationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 pt-1 text-xs text-neutral-400 hover:text-white">
              <MapPin className="h-4 w-4 shrink-0 text-[#D51F16]" /> {BRAND_CONFIG.contact.location}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs sm:flex-row">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#D51F16]" /> © {currentYear} {BRAND_CONFIG.name}</span>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button onClick={() => navigate('/privacy')} className="hover:text-white">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white">Terms & Conditions</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
