export const BRAND_HOME_PATH = '/' as const;
export const FOOTER_PAGE_LINK_ICON_POSITION = 'inline' as const;

export interface FooterSocialProfile {
  name: string;
  url: string;
}

export interface FooterSocialLink {
  key: 'linkedin' | 'facebook' | 'instagram';
  name: string;
  url: string;
}

export const FOOTER_CAPABILITY_LINKS = [
  { label: 'Creative Studio', path: '/creative', description: 'Branding, packaging and visual design' },
  { label: 'Digital Development', path: '/development', description: 'Websites, software and business platforms' },
  { label: 'AI & Automation', path: '/ai-lab', description: 'Assistants, agents and intelligent workflows' },
] as const;

export const FOOTER_PAGE_LINKS = [
  { label: 'All Services', path: '/services' },
  { label: 'Selected Work', path: '/portfolio' },
  { label: 'Our Process', path: '/process' },
  { label: 'About Raphics', path: '/about' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Professional Profiles', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
] as const;

export function getFooterSocialLinks(
  profiles: { linkedin?: FooterSocialProfile; facebook?: FooterSocialProfile; instagram?: FooterSocialProfile },
): FooterSocialLink[] {
  const socialKeys = ['linkedin', 'facebook', 'instagram'] as const;
  return socialKeys.flatMap((key) => {
    const profile = profiles[key];
    return profile?.url
      ? [{ key, name: profile.name, url: profile.url }]
      : [];
  });
}

export function getScrollProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const maxScroll = Math.max(0, scrollHeight - viewportHeight);
  if (!Number.isFinite(scrollY) || !Number.isFinite(maxScroll) || maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / maxScroll));
}

export function shouldShowBackToTop(scrollY: number, threshold = 480): boolean {
  return Number.isFinite(scrollY) && scrollY > threshold;
}
