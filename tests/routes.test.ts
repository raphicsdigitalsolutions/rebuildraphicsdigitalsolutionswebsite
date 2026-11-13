import assert from 'node:assert/strict';
import test from 'node:test';
import { parseRoute } from '../src/router/AgencyRouter';

test('recognizes the primary information routes and service aliases', () => {
  assert.equal(parseRoute('/work').path, '/work');
  assert.equal(parseRoute('/process').path, '/process');
  assert.equal(parseRoute('/faq').path, '/faq');
  assert.equal(parseRoute('/services/creative-studio').path, '/creative');
  assert.equal(parseRoute('/services/digital-development').path, '/development');
  assert.equal(parseRoute('/services/ai-automation').path, '/ai-lab');
});

test('recognizes work details and sends unknown routes to the not-found page', () => {
  assert.deepEqual(parseRoute('/work/customchatgpt'), {
    path: '/work/:id',
    projectId: 'customchatgpt',
  });
  assert.equal(parseRoute('/unknown-page').path, '/404');
});
