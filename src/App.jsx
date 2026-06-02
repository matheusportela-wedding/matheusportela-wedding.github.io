// App.jsx — top-level app: tab routing, theme + language state, page assembly.
import React, { useState, useEffect } from 'react';
import { CT } from './themes.js';
import { I18N } from './content.js';
import {
  Nav, Hero, CoupleIntro, WeddingPartySection, EventSection,
  TravelSection, NewYearSection, CitySection, RsvpSection,
  RegistrySection, Footer, Switcher,
} from './sections.jsx';

const PAGES = {
  inicio: (t, L) => <React.Fragment><Hero t={t} L={L} /><CoupleIntro t={t} L={L} /></React.Fragment>,
  evento: (t, L) => <EventSection t={t} L={L} />,
  padrinhos: (t, L) => <WeddingPartySection t={t} L={L} />,
  viagem: (t, L) => <React.Fragment><TravelSection t={t} L={L} /><NewYearSection t={t} L={L} /></React.Fragment>,
  cidade: (t, L) => <CitySection t={t} L={L} />,
  rsvp: (t, L) => <RsvpSection t={t} L={L} />,
  presentes: (t, L) => <RegistrySection t={t} L={L} />,
};

export const Site = () => {
  const [tkey, setKey] = useState(localStorage.getItem('am-theme') || '11');
  const [lang, setLang] = useState(localStorage.getItem('am-lang') || 'pt');
  const [tab, setTab] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    return PAGES[h] ? h : 'inicio';
  });
  useEffect(() => { localStorage.setItem('am-theme', tkey); }, [tkey]);
  useEffect(() => { localStorage.setItem('am-lang', lang); document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'; }, [lang]);
  useEffect(() => { try { history.replaceState(null, '', '#' + tab); } catch (e) {} window.scrollTo(0, 0); }, [tab]);
  const t = CT[tkey];
  const L = I18N[lang];
  return (
    <div style={{ background: t.page, fontFamily: t.body, color: t.ink, minHeight: '100vh' }}>
      <Nav t={t} L={L} tab={tab} setTab={setTab} lang={lang} setLang={setLang} />
      {(PAGES[tab] || PAGES.inicio)(t, L)}
      <Footer t={t} L={L} />
      <Switcher tkey={tkey} setKey={setKey} />
    </div>
  );
};
