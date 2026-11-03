/*
 * Raphics Digital Solutions — cinematic vanilla-JS motion layer.
 * No scroll-jacking, no extra animation dependency, and no React state duplication.
 */

const root = document.documentElement;
const appRoot = document.getElementById('root');
let resizeFrame = 0;
let scrollFrame = 0;

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

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

function syncMotionPreference() {
  root.dataset.motionPreference = motionQuery.matches ? 'reduce' : 'full';
  if (motionQuery.matches) {
    document.querySelectorAll('[data-reveal]').forEach((element) => {
      element.classList.add('is-visible');
    });
  }
}
syncMotionPreference();

if (typeof motionQuery.addEventListener === 'function') {
  motionQuery.addEventListener('change', syncMotionPreference);
} else {
  motionQuery.addListener(syncMotionPreference);
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

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px',
    })
  : null;

function addReveal(element, delay = 0, direction = 'up') {
  if (!(element instanceof HTMLElement) || element.dataset.reveal) return;
  element.dataset.reveal = direction;
  element.style.setProperty('--reveal-delay', `${Math.min(delay, 420)}ms`);

  if (motionQuery.matches || !revealObserver) {
    element.classList.add('is-visible');
  } else {
    revealObserver.observe(element);
  }
}

const parallaxTargets = new Set();

function bindCardTilt(card) {
  if (!(card instanceof HTMLElement) || card.dataset.tiltBound || !finePointerQuery.matches) return;
  card.dataset.tiltBound = 'true';

  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const maxTilt = 3.6;
    card.style.setProperty('--card-tilt-x', `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty('--card-tilt-y', `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`);
  }, { passive: true });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--card-tilt-x', '0deg');
    card.style.setProperty('--card-tilt-y', '0deg');
  }, { passive: true });
}

function decorateSection(section) {
  if (!(section instanceof HTMLElement)) return;

  const heading = section.querySelector('h2');
  if (heading) {
    const headingBlock = heading.closest('[class*="max-w-2xl"], [class*="max-w-3xl"]') || heading.parentElement;
    addReveal(headingBlock, 0, 'up');

    const intro = headingBlock?.querySelector('p');
    if (intro) addReveal(intro, 110, 'up');
  }

  const gridItems = section.querySelectorAll('.grid > div, .grid > button, .grid > article');
  gridItems.forEach((item, index) => {
    const card = item instanceof HTMLElement ? item : null;
    if (!card) return;
    const isCard = /rounded-(2xl|3xl)/.test(card.className);
    addReveal(card, (index % 5) * 65, 'up');
    if (isCard) {
      card.setAttribute('data-tilt', '');
      bindCardTilt(card);
    }
  });

  // Give the large out-of-focus red lighting fields a slower scroll depth.
  section.querySelectorAll('div.absolute.pointer-events-none[class*="blur-"]').forEach((element) => {
    if (!(element instanceof HTMLElement) || element.dataset.scrollParallax) return;
    element.dataset.scrollParallax = '0.075';
    parallaxTargets.add(element);
  });
}

function enhanceTree(node) {
  if (!(node instanceof Element)) return;
  secureExternalLinks(node);

  if (node.matches('section[id]')) decorateSection(node);
  node.querySelectorAll('section[id]').forEach(decorateSection);

  // Cards can be appended to an already-existing section after a filter or route update.
  const parentSection = node.closest('section[id]');
  if (parentSection) decorateSection(parentSection);
}

function updateScrollEffects() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  root.style.setProperty('--page-scroll-progress', progress.toFixed(4));

  if (!motionQuery.matches) {
    const viewportHeight = window.innerHeight;
    parallaxTargets.forEach((element) => {
      if (!element.isConnected) {
        parallaxTargets.delete(element);
        return;
      }
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 1.5) return;
      const speed = Number(element.dataset.scrollParallax) || 0.075;
      const distance = rect.top + rect.height * 0.5 - viewportHeight * 0.5;
      const offset = Math.max(-30, Math.min(30, distance * -speed));
      element.style.setProperty('--parallax-offset', `${offset.toFixed(1)}px`);
    });
  }
}

function scheduleScrollEffects() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateScrollEffects();
    scrollFrame = 0;
  });
}

updateViewportUnit();
window.addEventListener('resize', scheduleViewportUpdate, { passive: true });
window.addEventListener('orientationchange', scheduleViewportUpdate, { passive: true });
window.visualViewport?.addEventListener('resize', scheduleViewportUpdate, { passive: true });
window.addEventListener('scroll', scheduleScrollEffects, { passive: true });

if (appRoot && 'MutationObserver' in window) {
  const appObserver = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => enhanceTree(node));
    });
  });
  appObserver.observe(appRoot, { childList: true, subtree: true });
  enhanceTree(appRoot);
}

if (!document.querySelector('.reading-progress')) {
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
}

root.classList.add('js-enhanced');
scheduleScrollEffects();
