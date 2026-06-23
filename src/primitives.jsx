// primitives.jsx — small reusable building blocks shared across sections.
import React from 'react';
import { Ribbon } from './kit.jsx';
import { rich } from './rich.jsx';

// Round badge that holds a line icon.
export const IconBadge = ({ children }) => <span className="icon-badge">{children}</span>;

// Centered section header: eyebrow + script title + optional intro + ribbon.
// Pass ribbon={false} to omit the ribbon motif (e.g. the photo gallery).
export const SectionHead = ({ eyebrow, title, intro, ribbon = true }) => (
  <div className="section-head">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="calli section-head__title">{title}</h2>
    {intro && <p className="lead section-head__intro">{rich(intro)}</p>}
    {ribbon && <Ribbon className="section-head__ribbon" />}
  </div>
);
