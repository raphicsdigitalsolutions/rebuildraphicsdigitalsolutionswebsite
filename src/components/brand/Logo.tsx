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
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none transition-transform duration-200 hover:opacity-95 ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      title={BRAND_CONFIG.name}
    >
      {/* Official Uploaded Logo Asset */}
      <img
        src={BRAND_CONFIG.logo.imageSrc}
        alt={BRAND_CONFIG.logo.alt}
        className="object-contain filter drop-shadow-[0_2px_8px_rgba(213,31,22,0.2)]"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: variant === 'emblem' ? `${height}px` : undefined,
          objectPosition: variant === 'emblem' ? 'left center' : 'center',
          overflow: variant === 'emblem' ? 'hidden' : 'visible',
        }}
        loading="eager"
      />
    </div>
  );
};

export default Logo;
