import test from 'node:test';
import assert from 'node:assert/strict';
import { BRAND_CONFIG } from '../src/config/brand';

test('brand configuration uses the supplied agency email and UK address', () => {
  assert.equal(BRAND_CONFIG.contact.email, 'info.raphicsdigital@gmail.com');
  assert.equal(BRAND_CONFIG.contact.address, 'Tring, HP23 4JX, United Kingdom');
});

test('UK WhatsApp is messaging-only and routes to the supplied number', () => {
  assert.equal(BRAND_CONFIG.contact.whatsapp.number, '+44 7760 891431');
  assert.equal(BRAND_CONFIG.contact.whatsapp.isConfigured, true);
  assert.match(BRAND_CONFIG.contact.whatsapp.whatsappUrl, /^https:\/\/wa\.me\/447760891431/);
  assert.equal(BRAND_CONFIG.contact.whatsapp.purpose, 'WhatsApp messaging only');
});

test('Pakistan local contact supports both WhatsApp and telephone links', () => {
  assert.equal(BRAND_CONFIG.contact.localPhone.number, '03014518439');
  assert.equal(BRAND_CONFIG.contact.localPhone.telUrl, 'tel:03014518439');
  assert.match(BRAND_CONFIG.contact.localPhone.whatsappUrl, /^https:\/\/wa\.me\/923014518439/);
});

test('official social and portfolio destinations are present', () => {
  assert.equal(BRAND_CONFIG.profiles.linkedin.url, 'https://www.linkedin.com/company/raphicsdigitalsolutions/');
  assert.equal(BRAND_CONFIG.profiles.instagram.url, 'https://www.instagram.com/raphicsdigitalsolutions/');
  assert.equal(BRAND_CONFIG.profiles.facebook.url, 'https://www.facebook.com/share/1FjPtSmTFd/');
  assert.equal(BRAND_CONFIG.profiles.behance.url, 'https://www.behance.net/artisticatta');
  assert.equal(BRAND_CONFIG.profiles.github.url, 'https://github.com/raphicsdigitalsolutions');
});

test('logo variants resolve to individual SVG assets', () => {
  assert.match(BRAND_CONFIG.logo.imageSrc, /raphics-main-logo\.svg$/);
  assert.match(BRAND_CONFIG.logo.stackedImageSrc, /raphics-stacked-logo\.svg$/);
  assert.match(BRAND_CONFIG.logo.iconImageSrc, /raphics-logo-icon\.svg$/);
});
