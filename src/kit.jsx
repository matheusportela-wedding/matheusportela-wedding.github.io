// kit.jsx — low-level visual building blocks: the ribbon motif, the photo
// placeholder, line icons and flag SVGs. All styling lives in styles.css;
// icons inherit their colour from the parent via `currentColor`.
import React from 'react';

// Five-colour ribbon bar. Width/placement come from the context class.
export const Ribbon = ({ className = '' }) => <div className={`ribbon ${className}`.trim()} />;

// Photo box. Pass `src` (+ `alt`) to show a real image; otherwise it renders
// the striped placeholder with `label`. Size/shape come from the context class.
export const Photo = ({ src, alt = '', label, className = '' }) => (
  <div className={`photo ${className}`.trim()}>
    {src
      ? <img className="photo__img" src={src} alt={alt} />
      : (label ? <span className="photo__label">{label}</span> : null)}
  </div>
);

// ---------- line icons ----------
const Ic = ({ d, w = 28, sw = 1.4, fill = 'none', children, vb = '0 0 24 24', className }) => (
  <svg className={className} viewBox={vb} width={w} height={w} fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);
export const Icons = {
  plane: (p) => <Ic {...p} d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />,
  car: (p) => <Ic {...p}><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13" /><path d="M4 13h16v5H4z" /><circle cx="7.5" cy="18.5" r="1.5" /><circle cx="16.5" cy="18.5" r="1.5" /></Ic>,
  bed: (p) => <Ic {...p}><path d="M3 18V7M3 12h18M21 18v-4a2 2 0 0 0-2-2H9v-1a2 2 0 0 0-2-2H3" /></Ic>,
  money: (p) => <Ic {...p}><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9.5v0M18 14.5v0" /></Ic>,
  passport: (p) => <Ic {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 16h6" /></Ic>,
  calendar: (p) => <Ic {...p}><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v4M16 3v4" /></Ic>,
  ring: (p) => <Ic {...p}><circle cx="12" cy="14" r="6" /><path d="M9 8l1.5-3h3L15 8" /></Ic>,
  pin: (p) => <Ic {...p}><path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Ic>,
  clock: (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Ic>,
  star: (p) => <Ic {...p}><path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z" /></Ic>,
  fireworks: (p) => <Ic {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /><circle cx="12" cy="12" r="2" /></Ic>,
  building: (p) => <Ic {...p}><path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V9h3a1 1 0 0 1 1 1v11M3 21h18M8 7h3M8 11h3M8 15h3" /></Ic>,
  fork: (p) => <Ic {...p}><path d="M6 3v6a2 2 0 0 0 4 0V3M8 11v10M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 2.5-1 2.5-4-1-5-2.5-5zM16 16v5" /></Ic>,
  globe: (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14 0 17M12 3.5c-2.5 2.5-2.5 14 0 17" /></Ic>,
  sun: (p) => <Ic {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></Ic>,
  heart: (p) => <Ic {...p}><path d="M12 20s-7-4.7-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.3 12 20 12 20z" /></Ic>,
  play: (p) => <Ic {...p}><circle cx="12" cy="12" r="8.5" /><path d="M10 8.5l5 3.5-5 3.5z" /></Ic>,
  wifi: (p) => <Ic {...p}><path d="M4.5 10.5a11 11 0 0 1 15 0" /><path d="M7.5 13.7a6.5 6.5 0 0 1 9 0" /><circle cx="12" cy="17.5" r="0.6" /></Ic>,
  chat: (p) => <Ic {...p}><path d="M20 14a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 12h5" /></Ic>,
  leaf: (p) => <Ic {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" /><path d="M2 21c0-3 1.9-5.4 5-6" /></Ic>,
  shield: (p) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Ic>,
  music: (p) => <Ic {...p}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></Ic>,
  menu: (p) => <Ic {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Ic>,
  close: (p) => <Ic {...p}><path d="M6 6l12 12M18 6L6 18" /></Ic>,
};

// ---------- flags ----------
export const FlagBR = ({ w = 26 }) => (
  <svg viewBox="0 0 28 20" width={w} height={w * 20 / 28}>
    <rect width="28" height="20" fill="#178a3a" />
    <polygon points="14,2.5 25.5,10 14,17.5 2.5,10" fill="#ffd528" />
    <circle cx="14" cy="10" r="4.3" fill="#1b3b8f" />
    <path d="M10.2 9.2 A6 6 0 0 1 17.8 9.6" stroke="#fff" strokeWidth="0.9" fill="none" />
  </svg>
);
export const FlagUS = ({ w = 26 }) => (
  <svg viewBox="0 0 28 20" width={w} height={w * 20 / 28}>
    <rect width="28" height="18" fill="#eee" />
    {Array.from({ length: 7 }).map((_, i) => <rect key={i} y={i * 2.857} width="28" height="1.5" fill="#b22234" />)}
    <rect width="12" height="10" fill="#3c3b6e" />
    {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={1.5 + (i % 4) * 3} cy={2 + Math.floor(i / 4) * 3} r="0.7" fill="#fff" />)}
  </svg>
);
