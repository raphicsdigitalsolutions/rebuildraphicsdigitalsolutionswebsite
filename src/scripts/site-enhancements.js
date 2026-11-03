/*
 * Raphics Digital Solutions — small vanilla JavaScript progressive enhancements.
 * This module is intentionally framework-independent and does not duplicate React routing.
 */

const root = document.documentElement;
let resizeFrame = 0;

function updateViewportUnit() {
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  root.style.setProperty('--app-vh', `${viewportHeight * 0.01}px`);
}

function scheduleViewportUpdate() {
  if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(() => {
    updateViewportUnit();
    resizeFrame = 0;
  });
}

function syncMotionPreference(mediaQuery) {
  root.dataset.motionPreference = mediaQuery.matches ? 'reduce' : 'full';
}

function secureExternalLinks(node) {
  if (!(node instanceof Element)) return;

  const anchors = [];
  if (node.matches('a[target="_blank"]')) anchors.push(node);
  anchors.push(...node.querySelectorAll('a[target="_blank"]'));

  for (const anchor of anchors) {
    const relTokens = new Set((anchor.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    relTokens.add('noopener');
    relTokens.add('noreferrer');
    anchor.setAttribute('rel', [...relTokens].join(' '));
  }
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
syncMotionPreference(motionQuery);

if (typeof motionQuery.addEventListener === 'function') {
  motionQuery.addEventListener('change', () => syncMotionPreference(motionQuery));
} else {
  // Safari versions that expose the legacy MediaQueryList listener API.
  motionQuery.addListener(() => syncMotionPreference(motionQuery));
}

updateViewportUnit();
window.addEventListener('resize', scheduleViewportUpdate, { passive: true });
window.addEventListener('orientationchange', scheduleViewportUpdate, { passive: true });
window.visualViewport?.addEventListener('resize', scheduleViewportUpdate, { passive: true });

// React inserts many external links after the first render; observe additions only.
const appRoot = document.getElementById('root');
if (appRoot && 'MutationObserver' in window) {
  const linkObserver = new MutationObserver((records) => {
    for (const record of records) {
      for (const addedNode of record.addedNodes) secureExternalLinks(addedNode);
    }
  });
  linkObserver.observe(appRoot, { childList: true, subtree: true });
  secureExternalLinks(appRoot);
}

root.classList.add('js-enhanced');
