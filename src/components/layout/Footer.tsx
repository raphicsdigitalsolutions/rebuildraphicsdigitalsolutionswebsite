/**
 * Raphics Digital Solutions — site-wide footer.
 * Agency-only social links; founder marketplace profiles remain on the Reviews page.
 */
import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { WhatsAppIcon } from '../brand/WhatsAppIcon';
import { BRAND_CONFIG } from '../../config/brand';
import { useRouter } from '../../router/AgencyRouter';
import {
  FOOTER_CAPABILITY_LINKS,
  FOOTER_PAGE_LINKS,
  getFooterSocialLinks,
  shouldShowBackToTop,
} from '../../utils/site-shell';

const socialIcons = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
} as const;

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const socialLinks = getFooterSocialLinks(BRAND_CONFIG.profiles);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(shouldShowBackToTop(window.scrollY));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <>
      <footer className="raphics-footer">
        <div className="raphics-footer__glow" aria-hidden="true" />
        <div className="raphics-footer__main">
          <div className="raphics-footer__brand">
            <button type="button" onClick={() => navigate('/')} className="raphics-footer__logo" aria-label="Raphics Digital Solutions home">
              <Logo variant="full" height={62} />
            </button>
            <p>{BRAND_CONFIG.heroDescription}</p>
            <div className="raphics-footer__tagline">
              <span>OUR PROMISE</span>
              <strong>{BRAND_CONFIG.tagline}</strong>
            </div>
            <div className="raphics-footer__availability"><i /> {BRAND_CONFIG.contact.availability}</div>
          </div>

          <nav className="raphics-footer__column" aria-label="Our services">
            <h2>What We Do</h2>
            {FOOTER_CAPABILITY_LINKS.map((link) => (
              <button key={link.path} type="button" onClick={() => navigate(link.path)}>
                <span>{link.label}</span><small>{link.description}</small>
              </button>
            ))}
          </nav>

          <nav className="raphics-footer__column" aria-label="Explore Raphics">
            <h2>Explore</h2>
            {FOOTER_PAGE_LINKS.filter((link) => !['/privacy', '/terms'].includes(link.path)).map((link) => (
              <button key={link.path} type="button" onClick={() => navigate(link.path)}>
                {link.label}<ArrowUpRight />
              </button>
            ))}
          </nav>

          <div className="raphics-footer__column raphics-footer__contact">
            <h2>Get In Touch</h2>
            <a href={`mailto:${BRAND_CONFIG.contact.email}`}><Mail /><span><small>EMAIL</small><b>{BRAND_CONFIG.contact.email}</b></span><ArrowUpRight /></a>
            <a href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span><small>UK WHATSAPP · MESSAGES</small><b>{BRAND_CONFIG.contact.whatsapp.display}</b></span><ArrowUpRight /></a>
            <a href={BRAND_CONFIG.contact.localPhone.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span><small>PAKISTAN WHATSAPP</small><b>{BRAND_CONFIG.contact.localPhone.display}</b></span><ArrowUpRight /></a>
            <a href={BRAND_CONFIG.contact.localPhone.telUrl}><Phone /><span><small>PAKISTAN CALLS</small><b>{BRAND_CONFIG.contact.localPhone.display}</b></span><ArrowUpRight /></a>
            <a className="raphics-footer__address" href="https://www.google.com/maps/search/?api=1&query=Tring%20HP23%204JX%20United%20Kingdom" target="_blank" rel="noopener noreferrer">
              <MapPin /><span><small>BUSINESS ADDRESS</small><b>{BRAND_CONFIG.contact.address}</b></span><ArrowUpRight />
            </a>
            <div className="raphics-footer__social">
              <span>FOLLOW THE AGENCY</span>
              <div>
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <a key={social.key} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name}>
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="raphics-footer__bottom">
          <div><ShieldCheck /><span>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</span></div>
          <div className="raphics-footer__legal">
            <button type="button" onClick={() => navigate('/privacy')}>Privacy Policy</button>
            <button type="button" onClick={() => navigate('/terms')}>Terms & Conditions</button>
            <button type="button" onClick={() => navigate('/faq')}>FAQs</button>
          </div>
          <span className="raphics-footer__independent">Independent Creative · Digital · AI Studio</span>
        </div>
      </footer>

      <button
        type="button"
        className={`raphics-back-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp />
      </button>
    </>
  );
};

export default Footer;
