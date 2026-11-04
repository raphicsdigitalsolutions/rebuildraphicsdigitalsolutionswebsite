import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoryProgress, getStoryStage, getStoryOpacities } from '../src/utils/scroll-motion';

test('story progress starts at zero before the section enters the viewport', () => {
  assert.equal(getStoryProgress(120, 3000, 1000), 0);
});

test('story progress is proportional while scrolling through the section', () => {
  assert.equal(getStoryProgress(-1000, 3000, 1000), 0.5);
});

test('story progress is clamped after the section has passed', () => {
  assert.equal(getStoryProgress(-5000, 3000, 1000), 1);
});

test('active story stage follows the three scroll chapters', () => {
  assert.equal(getStoryStage(0), 0);
  assert.equal(getStoryStage(0.5), 1);
  assert.equal(getStoryStage(1), 2);
});

test('neighboring 3D forms crossfade smoothly between chapters', () => {
  assert.deepEqual(getStoryOpacities(0), [1, 0, 0]);
  assert.deepEqual(getStoryOpacities(0.25), [0.5, 0.5, 0]);
  assert.deepEqual(getStoryOpacities(0.75), [0, 0.5, 0.5]);
  assert.deepEqual(getStoryOpacities(1), [0, 0, 1]);
});
