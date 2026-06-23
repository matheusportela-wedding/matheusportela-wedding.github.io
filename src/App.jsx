// App.jsx — top-level app: tab routing, language state, page assembly.
import React, { useState, useEffect } from 'react';
import { I18N } from './content.js';
import {
  Nav, Hero, CoupleIntro, StorySection, GallerySection, WeddingPartySection,
  EventSection, TravelSection, BrazilSection, BrasiliaSection, RsvpSection,
  RegistrySection, Footer,
} from './sections.jsx';
import { InvitationSection } from './invitation.jsx';

const PAGES = {
  home: (L) => <React.Fragment><Hero L={L} /><CoupleIntro L={L} /><StorySection L={L} /><GallerySection L={L} /></React.Fragment>,
  party: (L) => <WeddingPartySection L={L} />,
  event: (L) => <EventSection L={L} />,
  travel: (L) => <TravelSection L={L} />,
  brazil: (L) => <BrazilSection L={L} />,
  brasilia: (L) => <BrasiliaSection L={L} />,
  gifts: (L) => <RegistrySection L={L} />,
  invitation: (L) => <InvitationSection L={L} />,
  rsvp: (L) => <RsvpSection L={L} />,
};

const LANGS = ['pt', 'en'];
// Language can be forced via a ?lang= query param so guests can be sent a link that
// lands in the right language (e.g. ...?lang=en). It takes precedence over a previously
// remembered choice; if absent/invalid we fall back to localStorage, then Portuguese.
const langFromUrl = () => {
  const q = new URLSearchParams(location.search).get('lang');
  return LANGS.includes(q) ? q : null;
};

export const Site = () => {
  const [lang, setLang] = useState(() => langFromUrl() || localStorage.getItem('am-lang') || 'pt');
  const [tab, setTab] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    return PAGES[h] ? h : 'home';
  });
  useEffect(() => { localStorage.setItem('am-lang', lang); document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'; }, [lang]);
  // keep the URL (?lang=…#tab) reflecting the current language + page, so whatever is in
  // the address bar can be copied and shared as-is.
  useEffect(() => { try { history.replaceState(null, '', `?lang=${lang}#${tab}`); } catch (e) {} }, [lang, tab]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab]);
  const L = I18N[lang];
  return (
    <div>
      <Nav L={L} tab={tab} setTab={setTab} lang={lang} setLang={setLang} />
      {(PAGES[tab] || PAGES.home)(L)}
      {tab !== 'invitation' && <Footer L={L} />}
    </div>
  );
};
