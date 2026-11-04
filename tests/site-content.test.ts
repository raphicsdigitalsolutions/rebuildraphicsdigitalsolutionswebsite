import test from 'node:test';
import assert from 'node:assert/strict';
import { getProjectContentSections, getProjectSourceLabel, buildInquiryMailto } from '../src/utils/site-content';
import type { PortfolioProject } from '../src/data/portfolio';

const baseProject: PortfolioProject = {
  id: 'test-project',
  title: 'Test Project',
  source: 'behance',
  sourceVisibility: 'profile',
  category: 'Packaging Design',
  status: 'Published Portfolio Work',
  tagline: 'Selected design project.',
  overview: 'A documented creative project.',
  problem: '',
  solution: '',
  mainFeatures: [],
  techStack: [],
  challenges: '',
  externalUrl: 'https://www.behance.net/artisticatta',
  featured: true,
  visualTheme: { primaryColor: '#D51F16', gradient: 'from-red-600 to-black', badgeText: 'PACKAGING', icon: 'Box' },
};

test('project detail sections omit empty challenge, solution, lists and notes', () => {
  const sections = getProjectContentSections(baseProject);
  assert.equal(sections.overview, 'A documented creative project.');
  assert.equal(sections.challenge, null);
  assert.equal(sections.solution, null);
  assert.deepEqual(sections.features, []);
  assert.deepEqual(sections.technologies, []);
  assert.equal(sections.developmentNotes, null);
});

test('project detail sections retain populated case-study content', () => {
  const sections = getProjectContentSections({
    ...baseProject,
    problem: 'The packaging system needed clear shelf hierarchy.',
    solution: 'A repeatable identity and label system was developed.',
    mainFeatures: ['  ', 'Label system', '3D visualisation'],
    techStack: ['Illustrator', 'Blender'],
    challenges: 'Final copy and legal claims require client approval.',
  });
  assert.equal(sections.challenge, 'The packaging system needed clear shelf hierarchy.');
  assert.equal(sections.solution, 'A repeatable identity and label system was developed.');
  assert.deepEqual(sections.features, ['Label system', '3D visualisation']);
  assert.deepEqual(sections.technologies, ['Illustrator', 'Blender']);
  assert.equal(sections.developmentNotes, 'Final copy and legal claims require client approval.');
});

test('source labels do not promise access to private GitHub repositories', () => {
  assert.equal(getProjectSourceLabel(baseProject), 'Open creative portfolio');
  assert.equal(getProjectSourceLabel({ ...baseProject, source: 'github', sourceVisibility: 'private', externalUrl: '' }), 'Project overview');
  assert.equal(getProjectSourceLabel({ ...baseProject, source: 'github', sourceVisibility: 'public', externalUrl: 'https://github.com/raphicsdigitalsolutions/customchatgpt' }), 'View GitHub repository');
});

test('contact form produces a populated mailto draft without requiring an unavailable API', () => {
  const url = buildInquiryMailto({
    fullName: 'Atta Rehman',
    email: 'hello@example.com',
    company: 'Raphics',
    service: 'Website Development',
    budget: '£1,000–£2,000',
    description: 'Build a new agency website.',
    preferredContact: 'WhatsApp',
  }, 'info.raphicsdigital@gmail.com');
  assert.ok(url.startsWith('mailto:info.raphicsdigital@gmail.com?'));
  assert.ok(url.includes(encodeURIComponent('Project enquiry — Website Development')));
  assert.ok(url.includes(encodeURIComponent('Build a new agency website.')));
});
