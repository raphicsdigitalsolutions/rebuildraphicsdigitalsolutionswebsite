import assert from 'node:assert/strict';
import test from 'node:test';
import { PORTFOLIO_PROJECTS } from '../src/data/portfolio';

const projectById = (id: string) => {
  const project = PORTFOLIO_PROJECTS.find((entry) => entry.id === id);
  assert.ok(project, `Expected portfolio entry ${id}`);
  return project;
};

test('published Behance work links to its original project page', () => {
  const artwork = PORTFOLIO_PROJECTS.filter((project) => project.source === 'behance');

  assert.ok(artwork.length > 0);
  for (const project of artwork) {
    assert.match(project.externalUrl, /^https:\/\/www\.behance\.net\/gallery\//);
  }
});

test('public software projects link to their named GitHub repositories', () => {
  const publicProjects = PORTFOLIO_PROJECTS.filter(
    (project) => project.source === 'github' && project.sourceVisibility === 'public',
  );

  assert.deepEqual(
    publicProjects.map((project) => project.externalUrl.split('/').at(-1)).sort(),
    ['FinWise-AI', 'MediGuide-AI', 'customchatgpt', 'customraggpt'].sort(),
  );
});

test('private and unpublished work does not expose source links', () => {
  for (const project of PORTFOLIO_PROJECTS.filter(
    (entry) => entry.sourceVisibility === 'private' || entry.sourceVisibility === 'unpublished',
  )) {
    assert.equal(project.externalUrl, '');
  }

  const rashid = projectById('rashid-traders-works');
  assert.equal(rashid.status, 'Pre-delivery');
  assert.ok(rashid.liveDemoUrl);

  assert.equal(projectById('echoes-of-the-lost-realm').status, 'In Progress');
  assert.equal(projectById('voice-ai-agent').status, 'In Development');
});
