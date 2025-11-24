import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const NextjsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 128 128" fill="none" {...props}>
    <circle cx="64" cy="64" r="64" fill="currentColor"/>
    <path d="M106.331 109.255L49.3877 39.5H38.5V88.5H45.0654V49.0332L96.29 114.075C98.8574 112.593 101.169 111.033 103.223 109.255H106.331Z" fill="url(#nextjs-gradient)"/>
    <path d="M89.5 39.5H83V88.5H89.5V39.5Z" fill="#fff"/>
    <defs>
        <linearGradient id="nextjs-gradient" x1="103.012" y1="112.018" x2="38.5" y2="39.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
    </defs>
  </svg>
);

export const ReactIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M0 0h48v48H0z" fill="#007ACC" />
    <path d="M28.23 23.355v-2.31h10.23v2.31h-3.81v13.62h-2.61v-13.62h-3.81zM19.74 23.355c-2.07 0-3.6-.54-4.59-1.62-.99-1.08-1.485-2.52-1.485-4.32 0-1.815.495-3.285 1.485-4.41.99-1.125 2.52-1.68 4.59-1.68s3.6.555 4.59 1.68c.99 1.125 1.485 2.595 1.485 4.41 0 1.8-.495 3.24-1.485 4.32-.99 1.08-2.52 1.62-4.59 1.62zm0-2.22c.81 0 1.47-.285 1.98-.855.51-.57.765-1.35.765-2.34 0-.975-.255-1.74-.765-2.295-.51-.555-1.17-.84-1.98-.84-.825 0-1.485.285-1.995.84-.51.555-.765 1.32-.765 2.295 0 .99.255 1.77.765 2.34.51.57 1.17.855 1.995.855z" fill="#fff" />
  </svg>
);

export const TailwindCssIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 21.4375C17.2125 21.4375 21.4375 17.2125 21.4375 12C21.4375 6.7875 17.2125 2.5625 12 2.5625C6.7875 2.5625 2.5625 6.7875 2.5625 12C2.5625 17.2125 6.7875 21.4375 12 21.4375Z" fill="#38BDF8" fillOpacity="0.5"></path>
    <path d="M7.125 7.125C8.9625 5.2875 11.2 4.125 13.5 4.125C18.375 4.125 22.5 8.25 22.5 13.125C22.5 15.375 21.3375 17.625 19.5 19.5C17.6625 21.3375 15.4125 22.5 13.5 22.5C8.625 22.5 4.5 18.375 4.5 13.5C4.5 11.25 5.6625 9.00002 7.125 7.125Z" fill="#38BDF8"></path>
  </svg>
);

export const NodejsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.36,1.25,4.12,6.08V15.7l8.24,4.83,8.24-4.83V6.08Zm4.29,13.25-4.29,2.5-4.29-2.5V8.58l4.29-2.5,4.29,2.5Z" style={{ fill: '#8cc84b' }} />
    <path d="M12.41,7.49,10.13,8.8l-.29-3.32,2.57-1.49Z" style={{ fill: '#8cc84b' }} />
  </svg>
);

export const VercelIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m12 1.5-12 21h24z"/>
  </svg>
);

// --- Ikona Meta (Modern) ---

export const MetaIconModern: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 12.6c-.6-.73-1.63-1.6-2.5-2.5-.22-.22-.52-.35-.85-.35s-.63.13-.85.35c-.47.47-.47 1.23 0 1.7.9.9 1.93 1.95 2.5 2.5.6.6 1.47.6 2.07 0 .58-.58.58-1.52-.01-2.1z"
      fill="#0078FF"
    />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.94 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
