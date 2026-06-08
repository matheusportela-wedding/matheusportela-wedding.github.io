// themes.js — the site's single theme, "Cerrado em Cores".
import { SP } from './kit.jsx';

export const theme = {
  body: "'EB Garamond', serif",
  page: SP.creamSoft, alt: '#f3eecf', ink: SP.oliveDeep, inkSoft: '#5e6648',
  accent: SP.coral, accentDeep: SP.coralDeep, line: 'rgba(61,74,46,0.14)',
  ribbon: [SP.olive, SP.lime, SP.cream, SP.coral, SP.blush],
  navBg: 'rgba(84,101,64,0.96)', navFg: '#fff', navBorder: 'transparent',
  heroBg: SP.olive, heroFg: SP.cream, heroAccent: SP.lime,
  card: '#fffdf2',
  footerBg: SP.oliveDeep, footerFg: SP.cream,
};
