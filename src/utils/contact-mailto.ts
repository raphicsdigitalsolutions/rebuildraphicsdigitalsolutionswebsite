export interface ProjectInquiryDraft {
  fullName: string;
  email: string;
  company: string;
  serviceRequired: string;
  projectBudget: string;
  preferredContactMethod: string;
  projectDescription: string;
}

export function buildProjectInquiryMailto(
  recipient: string,
  inquiry: ProjectInquiryDraft,
): string {
  const subject = 'Project inquiry — Raphics Digital Solutions';
  const body = [
    `Name: ${inquiry.fullName.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    `Company: ${inquiry.company.trim() || 'Not provided'}`,
    `Service: ${inquiry.serviceRequired}`,
    `Budget: ${inquiry.projectBudget || 'To discuss'}`,
    `Preferred contact: ${inquiry.preferredContactMethod}`,
    '',
    'Project details:',
    inquiry.projectDescription.trim(),
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
