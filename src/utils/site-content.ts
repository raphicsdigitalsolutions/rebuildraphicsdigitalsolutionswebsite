import type { PortfolioProject } from '../data/portfolio';

export interface ProjectContentSections {
  overview: string | null;
  challenge: string | null;
  solution: string | null;
  features: string[];
  technologies: string[];
  developmentNotes: string | null;
}

export function getProjectContentSections(project: PortfolioProject): ProjectContentSections {
  return {
    overview: project.overview.trim() || null,
    challenge: project.problem.trim() || null,
    solution: project.solution.trim() || null,
    features: project.mainFeatures.filter((item) => item.trim().length > 0),
    technologies: project.techStack.filter((item) => item.trim().length > 0),
    developmentNotes: project.challenges.trim() || null,
  };
}

export function getProjectSourceLabel(project: PortfolioProject): string {
  if (project.source === 'behance') return 'Open creative portfolio';
  if (project.sourceVisibility === 'private' || !project.externalUrl.trim()) return 'Project overview';
  return 'View GitHub repository';
}

export interface InquiryDraft {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  description: string;
  preferredContact?: string;
}

export function buildInquiryMailto(draft: InquiryDraft, recipient: string): string {
  const subject = `Project enquiry — ${draft.service}`;
  const body = [
    `Name: ${draft.fullName.trim()}`,
    `Email: ${draft.email.trim()}`,
    `Company: ${draft.company?.trim() || 'Not provided'}`,
    `Service: ${draft.service}`,
    `Budget: ${draft.budget?.trim() || 'Not specified'}`,
    `Preferred contact: ${draft.preferredContact || 'Email'}`,
    '',
    'Project brief:',
    draft.description.trim(),
  ].join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
