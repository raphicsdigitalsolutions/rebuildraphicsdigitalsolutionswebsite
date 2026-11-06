import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  title?: string;
}

/** Lightweight inline WhatsApp mark; no external image or font dependency. */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = 'h-4 w-4', title = 'WhatsApp' }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 2.7C8.67 2.7 2.7 8.56 2.7 15.78c0 2.55.75 5.03 2.16 7.17L2.5 29.3l6.57-2.25a13.5 13.5 0 0 0 6.93 1.9c7.33 0 13.3-5.87 13.3-13.09C29.3 8.56 23.33 2.7 16 2.7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M11.18 9.62c-.34-.75-.7-.77-1.02-.78h-.87c-.3 0-.8.11-1.22.57-.42.46-1.6 1.54-1.6 3.76 0 2.22 1.64 4.36 1.87 4.66.23.3 3.17 5.02 7.83 6.83 3.87 1.5 4.66 1.2 5.5 1.12.84-.08 2.7-1.1 3.08-2.17.38-1.07.38-1.98.27-2.17-.11-.19-.42-.3-.88-.53-.46-.23-2.7-1.33-3.12-1.48-.42-.15-.72-.23-1.03.23-.3.46-1.18 1.48-1.45 1.79-.27.3-.53.34-.99.11-.46-.23-1.95-.71-3.72-2.26-1.37-1.2-2.3-2.68-2.57-3.14-.27-.46-.03-.71.2-.94.2-.2.46-.53.69-.8.23-.27.3-.46.46-.76.15-.3.08-.57-.04-.8-.11-.23-1.03-2.48-1.41-3.39Z"
      fill="currentColor"
      transform="translate(0 -2.2) scale(.94)"
    />
  </svg>
);

export default WhatsAppIcon;
