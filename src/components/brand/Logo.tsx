/**
 * Centralized logo component for Raphics Digital Solutions.
 * The supplied wide logo is kept proportional; the emblem variant clips
 * the left icon area without stretching or shrinking the full lockup.
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
  const imageSrc =
    variant === 'stacked'
      ? BRAND_CONFIG.logo.stackedImageSrc
      : variant === 'emblem'
        ? BRAND_CONFIG.logo.iconImageSrc
        : BRAND_CONFIG.logo.imageSrc;

  const image = (
    <img
      src={imageSrc}
      alt={onClick ? '' : BRAND_CONFIG.logo.alt}
      aria-hidden={onClick ? true : undefined}
      className="object-contain drop-shadow-[0_2px_8px_rgba(213,31,22,0.2)]"
      style={{ height: `${height}px`, width: variant === 'emblem' ? `${height}px` : 'auto', maxWidth: 'none' }}
      loading="eager"
      decoding="async"
    />
  );

  return (
    <div className={`inline-flex items-center select-none ${className}`} title={BRAND_CONFIG.name}>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Go to ${BRAND_CONFIG.name} homepage`}
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F16]"
        >
          {variant === 'emblem' ? (
            <span className="relative block" style={{ width: height, height }}>
              {image}
            </span>
          ) : image}
        </button>
      ) : variant === 'emblem' ? (
        <span className="relative block" style={{ width: height, height }} title={BRAND_CONFIG.name}>
          {image}
        </span>
      ) : image}
    </div>
  );
};

export default Logo;
