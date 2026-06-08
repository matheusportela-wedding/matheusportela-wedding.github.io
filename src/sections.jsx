// sections.jsx — the page sections of the wedding site. Each takes the active
// language dictionary `L` (from content.js). All styling lives in styles.css.
import React, { useState } from 'react';
import { Ribbon, Photo, Icons, FlagBR, FlagUS } from './kit.jsx';
import { IconBadge, SectionHead } from './primitives.jsx';

// ---------- NAV ----------
export const Nav = ({ L, tab, setTab, lang, setLang }) => {
  const tabs = ['inicio', 'evento', 'padrinhos', 'viagem', 'brasilia', 'brazil', 'presentes'];
  const [open, setOpen] = useState(false);
  const go = (key) => { setTab(key); setOpen(false); };

  const Flags = () => (
    <div className="nav__flags">
      {[['pt', FlagBR, 'Português'], ['en', FlagUS, 'English']].map(([code, Flag, title]) => (
        <button key={code} className={'flag' + (lang === code ? ' flag--active' : '')} title={title} onClick={() => setLang(code)}>
          <Flag w={24} />
        </button>
      ))}
    </div>
  );

  return (
    <header className="nav">
      <div className="nav__bar wrap wrap--wide">
        <button className="nav__logo calli" onClick={() => go('inicio')}>A&amp;M</button>

        <nav className="nav__links">
          {tabs.map((key) => (
            <button key={key} className={'nav__link' + (tab === key ? ' is-active' : '')} onClick={() => go(key)}>{L.nav[key]}</button>
          ))}
          <button className="nav__cta" onClick={() => go('rsvp')}>{L.nav.confirmar}</button>
          <Flags />
        </nav>

        <div className="nav__compact">
          <Flags />
          <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            {open ? <Icons.close w={26} /> : <Icons.menu w={26} />}
          </button>
        </div>
      </div>

      <div className={'nav__menu' + (open ? ' is-open' : '')}>
        <div className="nav__menu-inner wrap wrap--wide">
          {tabs.map((key) => (
            <button key={key} className={'nav__menu-link' + (tab === key ? ' is-active' : '')} onClick={() => go(key)}>{L.nav[key]}</button>
          ))}
          <div className="nav__menu-cta"><button className="nav__cta nav__cta--block" onClick={() => go('rsvp')}>{L.nav.confirmar}</button></div>
        </div>
      </div>
    </header>
  );
};

// ---------- HERO ----------
export const Hero = ({ L }) => {
  const icons = [Icons.calendar, Icons.clock, Icons.pin];
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner wrap">
        <p className="eyebrow hero__eyebrow">{L.hero.eyebrow}</p>
        <h1 className="calli hero__name">Anna <span className="amp">&amp;</span> Matheus</h1>
        <p className="lead hero__date">{L.hero.dateItalic}</p>
        <div className="chips">
          {L.hero.chips.map((label, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="chip">
                <Icon w={18} /><span className="chip__text">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Ribbon className="hero__ribbon" />
    </section>
  );
};

// ---------- COUPLE PORTRAIT (home) ----------
export const CoupleIntro = ({ L }) => (
  <section id="nos" className="section section--couple">
    <div className="wrap">
      <div className="couple__grid">
        <Photo src="/images/anna-and-matheus.jpg" alt="The couple" className="couple__photo" />
        <div>
          <p className="eyebrow">{L.couple.eyebrow}</p>
          <h2 className="calli couple__title">{L.couple.title}</h2>
          <p className="lead">{L.couple.p1}</p>
          <p className="lead">{L.couple.p2}</p>
          <Ribbon className="couple__ribbon" />
        </div>
      </div>
    </div>
  </section>
);

// ---------- WEDDING PARTY ----------
const Person = ({ name, role }) => (
  <div className="person">
    <Photo className="person__photo photo__placeholder" />
    <div>
      <div className="person__name">{name}</div>
      <div className="person__role">{role}</div>
    </div>
  </div>
);
export const WeddingPartySection = ({ L }) => (
  <section id="padrinhos" className="section section--alt">
    <div className="wrap">
      <SectionHead eyebrow={L.party.eyebrow} title={L.party.title} intro={L.party.intro} />
      {L.party.groups.map((g, gi) => (
        <div key={gi} className="group">
          <div className="group__label"><p className="eyebrow">{g.group}</p></div>
          <div className={'people-grid' + (g.people.length <= 2 ? ' people-grid--small' : '')}>
            {g.people.map(([name, role], i) => <Person key={i} name={name} role={role} />)}
          </div>
        </div>
      ))}
      {L.party.foot && <p className="lead party__foot">{L.party.foot}</p>}
    </div>
  </section>
);

// ---------- EVENT ----------
export const EventSection = ({ L }) => {
  const E = L.event;
  const rowIcons = [Icons.pin, Icons.fork, Icons.sun];
  return (
    <section id="evento" className="section section--page">
      <div className="wrap">
        <SectionHead eyebrow={E.eyebrow} title={E.title} intro={E.intro} />
        <div className="event__times">
          {[[E.ceremony, Icons.ring], [E.reception, Icons.star]].map(([c, Icon], i) => (
            <div key={i} className="card timecard">
              <div className="timecard__badge"><IconBadge><Icon w={26} /></IconBadge></div>
              <p className="eyebrow">{c.tag}</p>
              <div className="calli timecard__time">{c.time}</div>
              <p className="lead timecard__desc">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="event__detail">
          <Photo src="/images/espaco-renascenca.jpg" alt="The garden at Espaço Renascença" className="event__photo" />
          <div className="card event__card">
            {E.rows.map(([label, text], i) => {
              const Icon = rowIcons[i];
              return (
                <div key={i} className="detail-row">
                  <IconBadge><Icon w={24} /></IconBadge>
                  <div>
                    <div className="detail-row__label">{label}</div>
                    <p className="lead detail-row__text">{text}</p>
                  </div>
                </div>
              );
            })}
            <div className="detail__button">
              <a className="btn-outline" href="https://maps.app.goo.gl/gGVU6YEYF3VXpQzZ8" target="_blank">{E.mapBtn}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- TRAVEL ----------
export const TravelSection = ({ L }) => {
  const icons = [Icons.plane, Icons.car, Icons.bed, Icons.money, Icons.passport, Icons.calendar];
  return (
    <section id="viagem" className="section section--page">
      <div className="wrap">
        <SectionHead eyebrow={L.travel.eyebrow} title={L.travel.title} intro={L.travel.intro} />
        <div className="cards-3">
          {L.travel.cards.map(([title, lead, items], i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="card travel-card">
                <IconBadge><Icon w={26} /></IconBadge>
                <h3 className="travel-card__title">{title}</h3>
                <p className="lead travel-card__lead">{lead}</p>
                <ul className="bullets">
                  {items.map((it, j) => (
                    <li key={j} className="bullet"><span className="bullet__dot" /><span className="bullet__text">{it}</span></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------- BRAZIL (travel guide) ----------
const InfoCard = ({ s, Icon }) => (
  <div className="card info-card">
    <div className="info-card__head">
      <IconBadge><Icon w={24} /></IconBadge>
      <h3 className="info-card__title">{s.title}</h3>
    </div>
    {s.lead && <p className="lead info-card__lead">{s.lead}</p>}
    <ul className="bullets">
      {s.items.map(([bold, rest], j) => (
        <li key={j} className="bullet">
          <span className="bullet__dot" />
          <span className="bullet__text">{bold && <strong>{bold} </strong>}{rest}</span>
        </li>
      ))}
    </ul>
    {s.foot && <p className="lead info-card__foot">{s.foot}</p>}
  </div>
);
export const BrazilSection = ({ L }) => {
  const B = L.brazil;
  const iconMap = { wifi: Icons.wifi, chat: Icons.chat, money: Icons.money, sun: Icons.sun, leaf: Icons.leaf, shield: Icons.shield, fireworks: Icons.fireworks, fork: Icons.fork, music: Icons.music };
  return (
    <section id="brazil" className="section section--page">
      <div className="wrap">
        <SectionHead eyebrow={B.eyebrow} title={B.title} intro={B.intro} />
        <Photo src="/images/brazil.png" alt="Rio de Janeiro at sunset" className="brazil__photo" />

        <div className="card watch">
          <div className="watch__head">
            <IconBadge><Icons.play w={24} /></IconBadge>
            <h3 className="watch__title">{B.watch.title}</h3>
          </div>
          <p className="lead watch__lead">{B.watch.lead}</p>
          <ul className="video-list">
            {B.watch.videos.map(([label, url], i) => (
              <li key={i} className="bullet">
                <span className="bullet__dot" />
                <a className="video-link" href={url} target="_blank" rel="noreferrer">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-grid">
          {B.info.map((s, i) => <InfoCard key={i} s={s} Icon={iconMap[s.icon] || Icons.star} />)}
        </div>

        <p className="eyebrow eyebrow--center">{B.trip.title}</p>
        <p className="lead trip__lead">{B.trip.lead}</p>
        <div className="trip__grid">
          {B.trip.places.map((name, i) => (
            <div key={i} className="place">
              <Photo label={name.toLowerCase()} className="place__photo photo__placeholder" />
              <div className="place__caption"><div className="place__name">{name}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- BRASÍLIA (the city) ----------
export const BrasiliaSection = ({ L }) => {
  const C = L.brasilia;
  return (
    <section id="brasilia" className="section section--alt">
      <div className="wrap">
        <SectionHead eyebrow={C.eyebrow} title={C.title} />
        <div className="brasilia__grid">
          <Photo src="/images/brasilia.png" alt="Brasília at sunset" className="brasilia__photo" />
          <div>
            <div className="brasilia__badge"><IconBadge><Icons.building w={26} /></IconBadge></div>
            <h3 className="brasilia__subtitle">{C.whatTitle}</h3>
            <p className="lead">{C.intro}</p>
            <Ribbon className="brasilia__ribbon" />
          </div>
        </div>

        <div className="brasilia__see"><p className="eyebrow">{C.seeLabel}</p></div>
        <div className="sights">
          {C.sights.map((name, i) => (
            <div key={i} className="sight">
              <span className="sight__icon"><Icons.pin w={20} /></span>
              <div className="sight__name">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- RSVP ----------
const Field = ({ label, ph, tall }) => (
  <label className="field">
    <span className="field__label">{label}</span>
    <div className={'field__box' + (tall ? ' field__box--tall' : '')}>{ph}</div>
  </label>
);
export const RsvpSection = ({ L }) => {
  const R = L.rsvp;
  return (
    <section id="rsvp" className="section section--page">
      <div className="wrap wrap--narrow">
        <SectionHead eyebrow={R.eyebrow} title={R.title} intro={R.intro} />
        {R.notes && (
          <div className="notes">
            {R.notes.map(([label, text], i) => (
              <div key={i} className="note">
                <span className="note__icon"><Icons.heart w={22} /></span>
                <p className="note__text"><strong>{label}.</strong> {text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="card rsvp__form">
          <Field label={R.name} ph={R.namePh} />
          <Field label={R.email} ph={R.emailPh} />
          <div className="rsvp__row">
            <Field label={R.attending} ph={R.attendingPh} />
            <Field label={R.guests} ph="1" />
          </div>
          <Field label={R.note} ph={R.notePh} tall />
          <div className="btn-submit">{R.submit}</div>
        </div>
        {R.foot && <p className="lead rsvp__foot">{R.foot}</p>}
      </div>
    </section>
  );
};

// ---------- REGISTRY ----------
export const RegistrySection = ({ L }) => (
  <section id="presentes" className="section section--alt">
    <div className="wrap wrap--mid">
      <SectionHead eyebrow={L.registry.eyebrow} title={L.registry.title} intro={L.registry.intro} />
      <div className="gifts">
        {L.registry.ways.map(([name, who, line, handle], i) => (
          <div key={i} className="card gift">
            <IconBadge><Icons.heart w={24} /></IconBadge>
            <div className="gift__name">{name}</div>
            <div className="gift__who">{who}</div>
            <p className="lead gift__line">{line}</p>
            <div className="gift__handle">{handle}</div>
          </div>
        ))}
      </div>
      <p className="lead registry__note">{L.registry.note}</p>
    </div>
  </section>
);

// ---------- FOOTER ----------
export const Footer = ({ L }) => (
  <footer className="footer">
    <div className="calli footer__name">Anna &amp; Matheus</div>
    <div className="footer__date">{L.footer.dateLine}</div>
    <Ribbon className="footer__ribbon" />
  </footer>
);
