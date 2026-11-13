/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Brand Configuration for Raphics Digital Solutions.
 * Verified brand assets, official profiles, color palette, and contact channels.
 */

const ukWhatsAppNumber = '+44 7760 891431';
const pakistanPhoneNumber = '+923014518439';
const contactEmail = 'info.raphicsdigital@gmail.com';
const officeAddress = 'Tring, HP23 4JX, United Kingdom';
const whatsappMessage = 'Hello Raphics Digital Solutions! I would like to discuss a new project.';
const appBaseUrl = (typeof import.meta.env !== 'undefined' && import.meta.env.BASE_URL) || '/';
const whatsappUrl = (number: string) =>
  `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

export const BRAND_CONFIG = {
  name: 'Raphics Digital Solutions',
  shortName: 'Raphics',
  tagline: 'Digital Magic For Real Success.',
  subheading: 'Creative Thinking. Intelligent Technology. Real Business Growth.',
  heroHeadline: {
    line1: 'WE DESIGN.',
    line2: 'WE DEVELOP.',
    line3: 'WE AUTOMATE.',
  },
  heroDescription:
    'From distinct brand identities and standout packaging to custom digital products and intelligent AI systems, Raphics Digital Solutions transforms ideas into meaningful business experiences.',
  
  // Original approved SVG artwork from the supplied brand handoff.
  logo: {
    imageSrc: `${appBaseUrl}logos/raphics-main-dark.svg`,
    iconSrc: `${appBaseUrl}logos/raphics-icon.svg`,
    stackedSrc: `${appBaseUrl}logos/raphics-secondary-dark.svg`,
    alt: 'Raphics Digital Solutions — Digital Magic For Real Success',
    primaryColor: '#D51F16',
  },

  portfolioLinks: {
    behance: 'https://www.behance.net/artisticatta',
  },

  socials: {
    linkedin: 'https://www.linkedin.com/company/raphicsdigitalsolutions/',
    instagram: 'https://www.instagram.com/raphicsdigitalsolutions/',
    facebook: 'https://www.facebook.com/share/1FjPtSmTFd/',
  },

  // Color Palette Tokens
  colors: {
    primaryRed: '#D51F16',
    primaryRedHover: '#B81912',
    black: '#080808',
    darkSurface: '#121212',
    surfaceElevated: '#1a1a1a',
    surfaceCard: '#151515',
    white: '#FFFFFF',
    lightGray: '#F2F2F2',
    mutedGray: '#999999',
    borderDark: '#222222',
  },

  // Public contact channels supplied for the agency website.
  contact: {
    // Agency contact email.
    email: contactEmail,
    whatsapp: {
      isConfigured: true,
      number: ukWhatsAppNumber,
      display: ukWhatsAppNumber,
      whatsappUrl: whatsappUrl(ukWhatsAppNumber),
    },
    phone: {
      number: pakistanPhoneNumber,
      display: '0301 4518439',
      telUrl: `tel:${pakistanPhoneNumber}`,
      whatsappUrl: whatsappUrl(pakistanPhoneNumber),
    },
    location: officeAddress,
    locationUrl: 'https://maps.google.com/?q=Tring+HP23+4JX%2C+UK',
    availability: 'Contact us for current availability',
  },

  // Core website destinations
  coreCapabilities: [
    {
      id: 'creative-studio',
      name: 'Creative Studio',
      path: '/services/creative-studio',
      lead: 'Branding, packaging & visual identities that stand out.',
      accent: '#D51F16',
    },
    {
      id: 'development-studio',
      name: 'Digital Development',
      path: '/services/digital-development',
      lead: 'Modern web platforms, custom dashboards & database-backed software.',
      accent: '#E53E3E',
    },
    {
      id: 'ai-lab',
      name: 'AI & Automation Lab',
      path: '/services/ai-automation',
      lead: 'Intelligent RAG pipelines, autonomous agents & voice assistants.',
      accent: '#FF4D4D',
    },
    {
      id: 'selected-work',
      name: 'Selected Work',
      path: '/work',
      lead: 'Published creative work and project-specific software sources.',
      accent: '#D51F16',
    },
  ],
};
