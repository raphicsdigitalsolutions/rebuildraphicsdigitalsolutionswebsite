/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Brand Configuration for Raphics Digital Solutions.
 * Verified brand assets, official profiles, color palette, and contact channels.
 */

// Environment-backed or configurable settings
const envWhatsApp = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) : undefined;

export const BRAND_CONFIG = {
  name: 'Raphics Digital Solutions',
  shortName: 'Raphics',
  tagline: 'Digital Magic for Real Success.',
  subheading: 'Creative Thinking. Intelligent Technology. Real Business Growth.',
  heroHeadline: {
    line1: 'WE DESIGN.',
    line2: 'WE DEVELOP.',
    line3: 'WE AUTOMATE.',
  },
  heroDescription:
    'From distinct brand identities and standout packaging to custom digital products and intelligent AI systems, Raphics Digital Solutions transforms ideas into meaningful business experiences.',
  
  // Official uploaded logo asset
  logo: {
    imageSrc: `${import.meta.env.BASE_URL}assets/aistudio/image_e462b648.png`,
    alt: 'Raphics Digital Solutions - Digital Magic for Real Success',
    primaryColor: '#D51F16',
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

  // Public professional profiles supplied by the founder. Marketplace profiles belong to the founder, not automatically to the agency.
  profiles: {
    behance: {
      name: 'Behance',
      url: 'https://www.behance.net/artisticatta',
      handle: 'artisticatta',
      role: 'Creative Design & 3D Packaging Portfolio',
      description: 'Official portfolio showcase for product packaging, cosmetics, and brand identity design.',
    },
    github: {
      name: 'GitHub',
      url: 'https://github.com/raphicsdigitalsolutions',
      handle: 'raphicsdigitalsolutions',
      role: 'Digital Engineering & AI Source Repositories',
      description: 'Public repositories for open source software, AI models, voice prototypes, and WebGL experiments.',
    },
    fiverr: {
      name: 'Fiverr',
      url: 'https://www.fiverr.com/s/xrkkqgQ',
      handle: 'Freelance Design Profile',
      role: 'Founder Freelance Marketplace Profile',
      description: 'Individual freelance account for packaging and label design consulting.',
    },
    upwork: {
      name: 'Upwork',
      url: 'https://www.upwork.com/freelancers/~01fcfb84bfffcb397b',
      handle: 'Freelance Design & Tech Profile',
      role: 'Founder Professional Profile',
      description: 'Direct contracting for brand packaging and custom digital projects.',
    },
    fusionart: {
      name: 'FusionArt',
      url: 'https://fusionart.net/profile_view?id=6ac7c7eca1362',
      handle: 'Artistic Profile',
      role: 'Creative Arts Showcase',
      description: 'Visual identity and digital design portfolio verification.',
    },
    instagram: {
      name: 'Instagram',
      url: 'https://www.instagram.com/raphicsdigitalsolutions',
      handle: '@raphicsdigitalsolutions',
      role: 'Agency Social Presence',
      description: 'Design explorations, project sneak peeks, and creative experiments.',
    },
  },

  // Transparent governance disclaimer
  transparencyNote:
    'External marketplace profiles represent the founder’s individual professional presence. They should not be interpreted as agency-wide ratings, certifications, or endorsements.',

  // Contact & Inquiries (verified channels only, zero fake placeholder phone numbers)
  contact: {
    // Founder-provided contact email. Replace with a domain email when configured.
    email: 'attaurrehmanseo3@gmail.com',
    whatsapp: {
      // Only active if a real verified phone number is supplied via environment variable
      isConfigured: Boolean(envWhatsApp && envWhatsApp.trim().length > 5),
      number: envWhatsApp || '',
      display: envWhatsApp || 'Available upon inquiry',
      whatsappUrl: envWhatsApp
        ? `https://wa.me/${envWhatsApp.replace(/[^0-9]/g, '')}?text=Hello%20Raphics%20Digital%20Solutions!%20I%20would%20like%20to%20discuss%20a%20new%20project.`
        : null,
    },
    location: 'Remote Studio & Digital Engineering Lab',
    availability: 'Accepting select new projects for 2026-2027',
  },

  // Five Core Website Experiences
  coreCapabilities: [
    {
      id: 'creative-studio',
      name: 'Creative Studio',
      path: '/creative',
      lead: 'Branding, packaging & visual identities that stand out.',
      accent: '#D51F16',
    },
    {
      id: 'development-studio',
      name: 'Digital Development',
      path: '/development',
      lead: 'Modern web platforms, custom dashboards & database-backed software.',
      accent: '#E53E3E',
    },
    {
      id: 'ai-lab',
      name: 'AI & Automation Lab',
      path: '/ai-lab',
      lead: 'Intelligent RAG pipelines, autonomous agents & voice assistants.',
      accent: '#FF4D4D',
    },
    {
      id: 'selected-work',
      name: 'Selected Work',
      path: '/portfolio',
      lead: 'Documented Behance packaging artworks & verified GitHub software repositories.',
      accent: '#D51F16',
    },
    {
      id: 'client-reviews',
      name: 'Client Trust & Reviews',
      path: '/reviews',
      lead: 'Verified client feedback channels and platform credentials.',
      accent: '#F2F2F2',
    },
  ],
};
