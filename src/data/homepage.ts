import { PORTFOLIO_PROJECTS, type PortfolioProject } from './portfolio';

export const HOME_FEATURED_PROJECT_IDS = [
  'nutralife-mens-gummies',
  'northforge-body-wash',
  'customchatgpt',
  'customraggpt',
  'finwise-ai',
  'mediguide-ai',
  'rashid-traders-works',
  'nova-voice-agent',
] as const;

export function getHomepageProjects(): PortfolioProject[] {
  const projectsById = new Map(PORTFOLIO_PROJECTS.map((project) => [project.id, project]));
  return HOME_FEATURED_PROJECT_IDS
    .map((id) => projectsById.get(id))
    .filter((project): project is PortfolioProject => Boolean(project));
}

export const HOME_FAQS = [
  {
    question: 'Can Raphics handle both design and development?',
    answer: 'Yes. Creative identity, packaging, websites, custom business software and AI automation are coordinated through one studio, so the brand and the product experience can work together.',
  },
  {
    question: 'Can you design product packaging that is ready for print?',
    answer: 'We create packaging artwork, labels, dielines and production-ready files against the dimensions, material and regulatory copy supplied or approved by your team. Final compliance approval remains with the client and relevant specialists.',
  },
  {
    question: 'Do you build custom software for a specific business workflow?',
    answer: 'Yes. We can scope web applications, dashboards, CRM-style tools, inventory workflows, portals and database-backed systems around the actual process your team needs.',
  },
  {
    question: 'What kind of AI solutions do you develop?',
    answer: 'Our AI work includes knowledge-based chat assistants, document research with retrieval, voice-agent prototypes, task agents and workflow automation. Scope and integration depend on the systems and data available.',
  },
  {
    question: 'How does a project usually begin?',
    answer: 'Start with a short brief describing the business, audience, goals, required deliverables and any deadline. We use that information to clarify scope, direction, milestones and the next practical step.',
  },
  {
    question: 'Can I see your previous work before contacting you?',
    answer: 'Yes. Browse the selected projects on this site, open the Behance profile for published creative work, or inspect public GitHub repositories for the technical projects that have been made public.',
  },
] as const;
