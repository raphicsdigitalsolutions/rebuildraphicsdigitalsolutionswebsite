/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lightweight, robust HTML5 History API router for Raphics Digital Solutions.
 * Supports:
 * - Direct page URLs and refresh (/about, /portfolio, /portfolio/:id, /services/:id, etc.)
 * - Browser Back and Forward buttons (popstate)
 * - Dynamic document title updates
 * - Clean programmatic navigation without heavy external packages
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  projectId?: string;
  serviceId?: string;
}

interface RouterContextType {
  currentPath: string;
  projectId?: string;
  serviceId?: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export function parseRoute(pathname: string): RouteState {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  // Match /portfolio/:id or /project/:id
  const portfolioMatch = clean.match(/^\/(portfolio|project)\/([a-z0-9_-]+)$/);
  if (portfolioMatch) {
    return {
      path: '/portfolio/:id',
      projectId: portfolioMatch[2],
    };
  }

  // Match /services/:id
  const serviceMatch = clean.match(/^\/services\/([a-z0-9_-]+)$/);
  if (serviceMatch) {
    return {
      path: '/services/:id',
      serviceId: serviceMatch[1],
    };
  }

  // Exact routes
  const validRoutes = [
    '/',
    '/about',
    '/creative',
    '/development',
    '/ai-lab',
    '/services',
    '/portfolio',
    '/reviews',
    '/contact',
    '/privacy',
    '/terms',
  ];

  if (validRoutes.includes(clean)) {
    return { path: clean };
  }

  // Fallback to home
  return { path: '/' };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      // Internal anchor scroll on same page
      const id = to.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Push new history state
    window.history.pushState({}, '', to);
    setRoute(parseRoute(to));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync document title based on route
  useEffect(() => {
    const baseTitle = 'Raphics Digital Solutions | Digital Magic for Real Success';
    switch (route.path) {
      case '/about':
        document.title = `About Us | ${baseTitle}`;
        break;
      case '/creative':
        document.title = `Creative Studio & 3D Packaging | ${baseTitle}`;
        break;
      case '/development':
        document.title = `Digital Development Studio | ${baseTitle}`;
        break;
      case '/ai-lab':
        document.title = `AI & Automation Lab | ${baseTitle}`;
        break;
      case '/services':
        document.title = `Services & Capabilities | ${baseTitle}`;
        break;
      case '/portfolio':
        document.title = `Selected Work & Repositories | ${baseTitle}`;
        break;
      case '/portfolio/:id':
        document.title = `Project Case Study: ${route.projectId} | ${baseTitle}`;
        break;
      case '/services/:id':
        document.title = `Service: ${route.serviceId} | ${baseTitle}`;
        break;
      case '/reviews':
        document.title = `Client Feedback & Professional Profiles | ${baseTitle}`;
        break;
      case '/contact':
        document.title = `Start a Project | ${baseTitle}`;
        break;
      case '/privacy':
        document.title = `Privacy Policy | ${baseTitle}`;
        break;
      case '/terms':
        document.title = `Terms of Service | ${baseTitle}`;
        break;
      default:
        document.title = baseTitle;
    }
  }, [route]);

  return (
    <RouterContext.Provider
      value={{
        currentPath: route.path,
        projectId: route.projectId,
        serviceId: route.serviceId,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};
