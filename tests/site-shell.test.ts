import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND_HOME_PATH,
  FOOTER_CAPABILITY_LINKS,
  FOOTER_PAGE_LINKS,
  FOOTER_PAGE_LINK_ICON_POSITION,
  getFooterSocialLinks,
  getScrollProgress,
  shouldShowBackToTop,
} from '../src/utils/site-shell';

const profiles = {
  linkedin: { name: 'LinkedIn', url: 'https://www.linkedin.com/company/raphicsdigitalsolutions/' },
  instagram: { name: 'Instagram', url: 'https://www.instagram.com/raphicsdigitalsolutions/' },
  facebook: { name: 'Facebook', url: 'https://www.facebook.com/share/1FjPtSmTFd/' },
  behance: { name: 'Behance', url: 'https://www.behance.net/artisticatta' },
  github: { name: 'GitHub', url: 'https://github.com/raphicsdigitalsolutions' },
  fiverr: { name: 'Fiverr', url: 'https://www.fiverr.com/s/xrkkqgQ' },
  upwork: { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01fcfb84bfffcb397b' },
  fusionart: { name: 'FusionArt', url: 'https://fusionart.net/profile_view?id=6ac7c7eca1362' },
};

test('footer social links contain only the agency LinkedIn, Facebook and Instagram pages', () => {
  const links = getFooterSocialLinks(profiles);
  assert.deepEqual(links.map((link) => link.key), ['linkedin', 'facebook', 'instagram']);
  assert.deepEqual(links.map((link) => link.url), [
    profiles.linkedin.url,
    profiles.facebook.url,
    profiles.instagram.url,
  ]);
});

test('footer navigation links all primary pages including the dedicated process page and legal pages', () => {
  const paths: string[] = FOOTER_PAGE_LINKS.map((link) => link.path);
  for (const requiredPath of ['/services', '/portfolio', '/process', '/about', '/reviews', '/contact', '/privacy', '/terms']) {
    assert.ok(paths.includes(requiredPath), `Missing footer route: ${requiredPath}`);
  }
});

test('footer service navigation links each discipline landing page', () => {
  assert.deepEqual(FOOTER_CAPABILITY_LINKS.map((link) => link.path), ['/creative', '/development', '/ai-lab']);
});

test('scroll progress is clamped and normalized between zero and one', () => {
  assert.equal(getScrollProgress(0, 2400, 800), 0);
  assert.equal(getScrollProgress(800, 2400, 800), 0.5);
  assert.equal(getScrollProgress(2000, 2400, 800), 1);
  assert.equal(getScrollProgress(500, 300, 800), 0);
});

test('back-to-top appears only after meaningful page scrolling', () => {
  assert.equal(shouldShowBackToTop(0), false);
  assert.equal(shouldShowBackToTop(480), false);
  assert.equal(shouldShowBackToTop(481), true);
});

test('both brand logo controls navigate to the home route', () => {
  assert.equal(BRAND_HOME_PATH, '/');
});

test('footer explore link icons are configured to sit inline with their labels', () => {
  assert.equal(FOOTER_PAGE_LINK_ICON_POSITION, 'inline');
});
