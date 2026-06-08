// App.jsx — top-level app: tab routing, language state, page assembly.
import React, { useState, useEffect } from 'react';
import { I18N } from './content.js';
import {
  Nav, Hero, CoupleIntro, WeddingPartySection, EventSection,
  TravelSection, BrazilSection, BrasiliaSection, RsvpSection,
  RegistrySection, Footer,
} from './sections.jsx';

const PAGES = {
  inicio: (L) => <React.Fragment><Hero L={L} /><CoupleIntro L={L} /></React.Fragment>,
  padrinhos: (L) => <WeddingPartySection L={L} />,
  evento: (L) => <EventSection L={L} />,
  viagem: (L) => <TravelSection L={L} />,
  brazil: (L) => <BrazilSection L={L} />,
  brasilia: (L) => <BrasiliaSection L={L} />,
  presentes: (L) => <RegistrySection L={L} />,
  rsvp: (L) => <RsvpSection L={L} />,
};

export const Site = () => {
  const [lang, setLang] = useState(localStorage.getItem('am-lang') || 'pt');
  const [tab, setTab] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    return PAGES[h] ? h : 'inicio';
  });
  useEffect(() => { localStorage.setItem('am-lang', lang); document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'; }, [lang]);
  useEffect(() => { try { history.replaceState(null, '', '#' + tab); } catch (e) {} window.scrollTo(0, 0); }, [tab]);
  const L = I18N[lang];
  return (
    <div>
      <Nav L={L} tab={tab} setTab={setTab} lang={lang} setLang={setLang} />
      {(PAGES[tab] || PAGES.inicio)(L)}
      <Footer L={L} />
    </div>
  );
};
