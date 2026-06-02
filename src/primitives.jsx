// primitives.jsx — theme-aware layout primitives shared across sections.
import React from 'react';
import { SP, KLeaf, KRibbon } from './kit.jsx';

export const Wrap = ({ children, w = 1120, style }) => (
  <div style={{ maxWidth: w, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>
);

export const Eye = ({ t, children, color }) => (
  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: color || t.accentDeep }}>{children}</div>
);

export const Calli = ({ children, size = 86, color, style }) => (
  <div style={{ fontFamily: 'Mrs Saint Delafield, cursive', fontSize: size, lineHeight: 0.92, color, ...style }}>{children}</div>
);

export const Txt = ({ t, children, size = 17.5, color, style }) => (
  <p style={{ fontFamily: t.body, fontSize: size, lineHeight: 1.72, color: color || t.inkSoft, margin: 0, ...style }}>{children}</p>
);

export const SectionHead = ({ t, eyebrow, title, intro, light }) => (
  <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 52px' }}>
    <Eye t={t} color={light ? t.featureAccent : t.accentDeep}>{eyebrow}</Eye>
    <Calli size={94} color={light ? t.featureFg : t.ink} style={{ margin: '4px 0 0' }}>{title}</Calli>
    {intro && <Txt t={t} size={19} color={light ? `${t.featureFg}cc` : t.inkSoft} style={{ marginTop: 14 }}>{intro}</Txt>}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      {t.motif === 'palm'
        ? <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><KLeaf w={14} h={22} color={t.accent} /><KLeaf w={18} h={28} color={SP.olive} /><KLeaf w={14} h={22} color={SP.lime} /></div>
        : <KRibbon colors={t.ribbon} w={150} h={6} radius={3} />}
    </div>
  </div>
);

export const IconBadge = ({ t, children }) => (
  <div style={{ width: 54, height: 54, borderRadius: '50%', background: t.alt, color: t.accentDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{children}</div>
);

export const Card = ({ t, children, style }) => (
  <div style={{ background: t.card, border: `1px solid ${t.line}`, padding: '32px 30px', ...style }}>{children}</div>
);

export const Section = ({ id, bg, pad = '110px 0', children }) => (
  <section id={id} style={{ background: bg, padding: pad }}>{children}</section>
);
