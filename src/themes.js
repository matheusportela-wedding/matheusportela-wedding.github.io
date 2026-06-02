// themes.js — colour/typography themes. Each theme (11/12/13) defines the full
// look of the site. The active theme is chosen in the floating switcher (App.jsx).
import { SP } from './kit.jsx';

export const CT = {
  '11': {
    key: '11', name: 'Cerrado em Cores', motif: 'ribbon', body: "'EB Garamond', serif",
    page: SP.creamSoft, alt: '#f3eecf', ink: SP.oliveDeep, inkSoft: '#5e6648',
    accent: SP.coral, accentDeep: SP.coralDeep, line: 'rgba(61,74,46,0.14)',
    ribbon: [SP.olive, SP.lime, SP.cream, SP.coral, SP.blush],
    navBg: 'rgba(84,101,64,0.96)', navFg: '#fff', navBorder: 'transparent',
    heroBg: SP.olive, heroFg: SP.cream, heroTone: 'dark',
    card: '#fffdf2', feature: SP.olive, featureFg: SP.cream, featureAccent: SP.lime,
    footerBg: SP.oliveDeep, footerFg: SP.cream,
  },
  '12': {
    key: '12', name: 'Palmeira Pastel', motif: 'palm', body: "'Gelasio', serif",
    page: SP.cream, alt: '#fbe9e2', ink: '#3a2a1c', inkSoft: '#6a5446',
    accent: SP.coral, accentDeep: SP.coralDeep, line: 'rgba(58,42,28,0.12)',
    ribbon: [SP.coral, SP.lime, SP.blush, SP.olive, SP.cream],
    navBg: 'rgba(84,101,64,0.96)', navFg: '#fff', navBorder: 'transparent',
    heroBg: SP.olive, heroFg: SP.cream, heroTone: 'dark',
    card: '#fff7ee', feature: SP.olive, featureFg: SP.cream, featureAccent: SP.lime,
    footerBg: SP.olive, footerFg: SP.cream,
  },
  '13': {
    key: '13', name: 'Jardim', motif: 'line', body: "'EB Garamond', serif",
    page: '#fffdf3', alt: '#f4f1e4', ink: SP.oliveDeep, inkSoft: '#5e6648',
    accent: SP.coral, accentDeep: SP.coralDeep, line: 'rgba(61,74,46,0.13)',
    ribbon: [SP.olive, SP.lime, SP.cream, SP.coral, SP.blush],
    navBg: 'rgba(255,253,243,0.94)', navFg: SP.oliveDeep, navBorder: 'rgba(61,74,46,0.12)',
    heroBg: '#fffdf3', heroFg: SP.oliveDeep, heroTone: 'light',
    card: '#fffdf3', feature: '#f4f1e4', featureFg: SP.oliveDeep, featureAccent: SP.coralDeep,
    footerBg: SP.oliveDeep, footerFg: '#fffdf3',
  },
};
