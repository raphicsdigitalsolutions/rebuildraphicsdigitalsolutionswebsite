/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Logo Component for Raphics Digital Solutions.
 * Displays the original logo image asset with preserved proportions,
 * crisp rendering, and configurable display variants.
 */

import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

interface LogoProps {
  variant?: 'full' | 'emblem' | 'stacked';
  className?: string;
  height?: number;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  height = 42,
  onClick,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none transition-opacity duration-200 hover:opacity-95 ${className}`} title={BRAND_CONFIG.name}>
      {onClick ? (
        <button type="button" onClick={onClick} aria-label={`Go to ${BRAND_CONFIG.name} homepage`} className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F16]">
          <img src={BRAND_CONFIG.logo.imageSrc} alt={BRAND_CONFIG.logo.alt} className="object-contain filter drop-shadow-[0_2px_8px_rgba(213,31,22,0.2)]" style={{ height: `${height}px`, width: variant === 'emblem' ? `${height}px` : 'auto', maxWidth: variant === 'emblem' ? `${height}px` : 'none' }} loading="eager" />
        </button>
      ) : (
        <img src={BRAND_CONFIG.logo.imageSrc} alt={BRAND_CONFIG.logo.alt} className="object-contain filter drop-shadow-[0_2px_8px_rgba(213,31,22,0.2)]" style={{ height: `${height}px`, width: variant === 'emblem' ? `${height}px` : 'auto', maxWidth: variant === 'emblem' ? `${height}px` : 'none' }} loading="eager" />
      )}
    </div>
  );
};

export default Logo;
