/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Verified Client Reviews & Testimonials Data for Raphics Digital Solutions.
 * 
 * POLICY:
 * In accordance with Phase 2 integrity standards:
 * - We do NOT manufacture, fabricate, or simulate testimonials.
 * - No synthetic client usernames, ratings, countries, or review dates are invented.
 * - If direct API access to private client feedback is unavailable, this list remains empty
 *   and points clients directly to the verified public profiles on Fiverr, Upwork, and FusionArt.
 * - Genuinely verified reviews may be added below strictly with original platform attribution.
 */

export type ReviewPlatform = 'Fiverr' | 'Upwork' | 'FusionArt' | 'Behance';

export interface ClientReview {
  id: string;
  clientName: string;
  clientCountry?: string;
  clientRole?: string;
  platform: ReviewPlatform;
  rating?: number; // Only if verified on original platform
  date?: string; // Only if verifiable on original platform
  projectTitle: string;
  category: 'Product Packaging' | 'Brand Identity' | 'Web & Tech' | 'Graphic Design';
  reviewText: string;
  verifiedOrder: boolean;
  sourceUrl: string; // Direct link to order / review on official platform
}

/**
 * CLIENT_REVIEWS holds only manually confirmed, verifiable reviews.
 * We leave this array empty rather than generating simulated reviews,
 * giving clients direct access to official public profile links instead.
 */
export const CLIENT_REVIEWS: ClientReview[] = [
  // To add a verified testimonial, insert a verified object here with exact review text and sourceUrl.
];

export const VERIFIED_REVIEW_PLATFORMS = [
  {
    platform: 'Fiverr',
    title: 'Fiverr Marketplace Profile',
    owner: 'Atta Ur Rehman (Founder)',
    profileUrl: 'https://www.fiverr.com/s/xrkkqgQ',
    scope: 'Packaging Design, Label Artwork, and 3D Visualizations',
    verificationNote: 'View order feedback and client delivery history directly on Fiverr.',
  },
  {
    platform: 'Upwork',
    title: 'Upwork Professional Profile',
    owner: 'Atta Ur Rehman (Founder)',
    profileUrl: 'https://www.upwork.com/freelancers/~01fcfb84bfffcb397b',
    scope: 'Contract Design, Branding Systems, and Web Engineering',
    verificationNote: 'View contract history, client feedback, and completed milestones directly on Upwork.',
  },
  {
    platform: 'FusionArt',
    title: 'FusionArt Portfolio',
    owner: 'Atta Ur Rehman (Founder)',
    profileUrl: 'https://fusionart.net/profile_view?id=6ac7c7eca1362',
    scope: 'Visual Arts & Creative Showcase',
    verificationNote: 'View creative identity showcase and artistic verification directly on FusionArt.',
  },
  {
    platform: 'Behance',
    title: 'Behance Creative Gallery',
    owner: 'Atta Ur Rehman (artisticatta)',
    profileUrl: 'https://www.behance.net/artisticatta',
    scope: 'Curated 3D Packaging, Labels & Brand Identity Projects',
    verificationNote: 'View peer appreciations, project comments, and full case studies on Behance.',
  },
];
