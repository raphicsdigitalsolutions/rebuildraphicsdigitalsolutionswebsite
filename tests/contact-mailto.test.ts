import assert from 'node:assert/strict';
import test from 'node:test';
import { buildProjectInquiryMailto } from '../src/utils/contact-mailto';

test('builds a reviewable email draft with the submitted project details', () => {
  const draft = buildProjectInquiryMailto('info.raphicsdigital@gmail.com', {
    fullName: '  Alex Example ',
    email: ' alex@example.com ',
    company: 'Example Studio',
    serviceRequired: 'Website & Web Application Development',
    projectBudget: '£3,000–£7,500',
    preferredContactMethod: 'WhatsApp',
    projectDescription: 'Build a new client portal.',
  });

  const url = new URL(draft);
  const params = new URLSearchParams(url.search);

  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'info.raphicsdigital@gmail.com');
  assert.equal(params.get('subject'), 'Project inquiry — Raphics Digital Solutions');
  assert.match(params.get('body') || '', /Name: Alex Example/);
  assert.match(params.get('body') || '', /Email: alex@example\.com/);
  assert.match(params.get('body') || '', /Company: Example Studio/);
  assert.match(params.get('body') || '', /Service: Website & Web Application Development/);
  assert.match(params.get('body') || '', /Budget: £3,000–£7,500/);
  assert.match(params.get('body') || '', /Preferred contact: WhatsApp/);
  assert.match(params.get('body') || '', /Project details:\nBuild a new client portal\./);
});

test('uses clear defaults when optional inquiry fields are empty', () => {
  const draft = buildProjectInquiryMailto('info.raphicsdigital@gmail.com', {
    fullName: 'Sam Example',
    email: 'sam@example.com',
    company: '',
    serviceRequired: 'Branding',
    projectBudget: '',
    preferredContactMethod: 'Email',
    projectDescription: 'Refresh a product label.',
  });

  const body = new URLSearchParams(new URL(draft).search).get('body') || '';
  assert.match(body, /Company: Not provided/);
  assert.match(body, /Budget: To discuss/);
});
