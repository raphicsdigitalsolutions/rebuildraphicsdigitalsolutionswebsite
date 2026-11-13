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
  const src = variant === 'emblem'
    ? BRAND_CONFIG.logo.iconSrc
    : variant === 'stacked'
      ? BRAND_CONFIG.logo.stackedSrc
      : BRAND_CONFIG.logo.imageSrc;

  const image = (
    <img
      src={src}
      alt={onClick ? '' : BRAND_CONFIG.logo.alt}
      aria-hidden={onClick ? true : undefined}
      className="object-contain"
      style={{ height: `${height}px`, width: 'auto', maxWidth: variant === 'full' ? 'min(62vw, 260px)' : 'auto' }}
      loading="eager"
      decoding="async"
    />
  );

  return (
    <span className={`inline-flex items-center select-none ${className}`} title={BRAND_CONFIG.name}>
      {onClick ? (
        <a
          href={import.meta.env.BASE_URL || '/'}
          onClick={(event) => {
            event.preventDefault();
            onClick();
          }}
          aria-label={`Go to ${BRAND_CONFIG.name} homepage`}
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D51F16]"
        >
          {image}
        </a>
      ) : image}
    </span>
  );
};

export default Logo;
