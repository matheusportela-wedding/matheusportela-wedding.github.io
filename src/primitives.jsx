// primitives.jsx — small reusable building blocks shared across sections.
import React from 'react';
import { Ribbon } from './kit.jsx';
import { rich } from './rich.jsx';

// Round badge that holds a line icon.
export const IconBadge = ({ children }) => <span className="icon-badge">{children}</span>;

// Centered section header: eyebrow + script title + optional intro + ribbon.
export const SectionHead = ({ eyebrow, title, intro }) => (
  <div className="section-head">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="calli section-head__title">{title}</h2>
    {intro && <p className="lead section-head__intro">{rich(intro)}</p>}
    <Ribbon className="section-head__ribbon" />
  </div>
);
