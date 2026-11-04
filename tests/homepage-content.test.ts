import test from 'node:test';
import assert from 'node:assert/strict';
import { getHomepageProjects, HOME_FEATURED_PROJECT_IDS, HOME_FAQS } from '../src/data/homepage';

test('homepage portfolio selection resolves every requested case study', () => {
  const projects = getHomepageProjects();
  assert.equal(projects.length, HOME_FEATURED_PROJECT_IDS.length);
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  assert.ok(projects.every((project) => project.title.trim().length > 0));
});

test('homepage includes a balanced mix of creative, AI and software work', () => {
  const projects = getHomepageProjects();
  assert.ok(projects.some((project) => project.source === 'behance'));
  assert.ok(projects.some((project) => project.category === 'AI & Machine Learning'));
  assert.ok(projects.some((project) => project.category === 'Web & SaaS Platform'));
});

test('homepage FAQs have useful questions and answers', () => {
  assert.ok(HOME_FAQS.length >= 5);
  assert.ok(HOME_FAQS.every((item) => item.question.endsWith('?') && item.answer.length > 40));
});
