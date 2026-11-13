import assert from 'node:assert/strict';
import test from 'node:test';
import { BRAND_CONFIG } from '../src/config/brand';

test('brand contact channels retain their country-specific purpose and destinations', () => {
  assert.equal(BRAND_CONFIG.contact.email, 'info.raphicsdigital@gmail.com');
  assert.equal(BRAND_CONFIG.contact.whatsapp.display, '+44 7760 891431');
  assert.equal(
    BRAND_CONFIG.contact.whatsapp.whatsappUrl,
    'https://wa.me/447760891431?text=Hello%20Raphics%20Digital%20Solutions!%20I%20would%20like%20to%20discuss%20a%20new%20project.',
  );
  assert.equal(BRAND_CONFIG.contact.phone.display, '0301 4518439');
  assert.equal(BRAND_CONFIG.contact.phone.telUrl, 'tel:+923014518439');
  assert.equal(
    BRAND_CONFIG.contact.phone.whatsappUrl,
    'https://wa.me/923014518439?text=Hello%20Raphics%20Digital%20Solutions!%20I%20would%20like%20to%20discuss%20a%20new%20project.',
  );
  assert.equal(BRAND_CONFIG.contact.location, 'Tring, HP23 4JX, United Kingdom');
});

test('only the three supplied agency social accounts are configured', () => {
  assert.deepEqual(BRAND_CONFIG.socials, {
    linkedin: 'https://www.linkedin.com/company/raphicsdigitalsolutions/',
    instagram: 'https://www.instagram.com/raphicsdigitalsolutions/',
    facebook: 'https://www.facebook.com/share/1FjPtSmTFd/',
  });
});
