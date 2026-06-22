// sections.jsx — the page sections of the wedding site. Each takes the active
// language dictionary `L` (from content.js). All styling lives in styles.css.
import React, { useState } from 'react';
import { Ribbon, Photo, Icons, FlagBR, FlagUS } from './kit.jsx';
import { IconBadge, SectionHead } from './primitives.jsx';
import { rich } from './rich.jsx';
import { RSVP, RSVP_READY } from './rsvp-config.js';

// ---------- NAV ----------
export const Nav = ({ L, tab, setTab, lang, setLang }) => {
  const tabs = ['home', 'invitation', 'event', 'travel', 'brasilia', 'brazil', 'gifts'];
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
        <button className="nav__logo calli" onClick={() => go('home')}>A&amp;M</button>

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
    <section id="home" className="hero">
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
        <Photo src="/images/anna-and-matheus.webp" alt="The couple" className="couple__photo" />
        <div>
          <p className="eyebrow">{L.couple.eyebrow}</p>
          <h2 className="calli couple__title">{L.couple.title}</h2>
          <p className="lead">{rich(L.couple.p1)}</p>
          <p className="lead">{rich(L.couple.p2)}</p>
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
  <section id="party" className="section section--alt">
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
      {L.party.foot && <p className="lead party__foot">{rich(L.party.foot)}</p>}
    </div>
  </section>
);

// ---------- EVENT ----------
export const EventSection = ({ L }) => {
  const E = L.event;
  const rowIcons = [Icons.pin, Icons.fork, Icons.sun];
  return (
    <section id="event" className="section section--alt">
      <div className="wrap">
        <SectionHead eyebrow={E.eyebrow} title={E.title} intro={E.intro} />
        <div className="event__times">
          {[[E.ceremony, Icons.ring], [E.reception, Icons.star]].map(([c, Icon], i) => (
            <div key={i} className="card timecard">
              <div className="timecard__badge"><IconBadge><Icon w={26} /></IconBadge></div>
              <p className="eyebrow">{c.tag}</p>
              <div className="calli timecard__time">{c.time}</div>
              <p className="lead timecard__desc">{rich(c.desc)}</p>
            </div>
          ))}
        </div>
        <div className="event__detail">
          <Photo src="/images/espaco-renascenca.webp" alt="The garden at Espaço Renascença" className="event__photo" />
          <div className="card event__card">
            {E.rows.map(([label, text], i) => {
              const Icon = rowIcons[i];
              return (
                <div key={i} className="detail-row">
                  <IconBadge><Icon w={24} /></IconBadge>
                  <div>
                    <div className="detail-row__label">{label}</div>
                    <p className="lead detail-row__text">{rich(text)}</p>
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
  const icons = [Icons.plane, Icons.passport, Icons.bed, Icons.calendar, Icons.car, Icons.money];
  return (
    <section id="travel" className="section section--page">
      <div className="wrap">
        <SectionHead eyebrow={L.travel.eyebrow} title={L.travel.title} intro={L.travel.intro} />
        <div className="cards-3">
          {L.travel.cards.map(([title, lead, items], i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="card travel-card">
                <IconBadge><Icon w={26} /></IconBadge>
                <h3 className="travel-card__title">{title}</h3>
                <p className="lead travel-card__lead">{rich(lead)}</p>
                <ul className="bullets">
                  {items.map((it, j) => (
                    <li key={j} className="bullet"><span className="bullet__dot" /><span className="bullet__text">{rich(it)}</span></li>
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
    {s.lead && <p className="lead info-card__lead">{rich(s.lead)}</p>}
    <ul className="bullets">
      {s.items.map(([bold, rest], j) => (
        <li key={j} className="bullet">
          <span className="bullet__dot" />
          <span className="bullet__text">{bold && <strong>{bold} </strong>}{rich(rest)}</span>
        </li>
      ))}
    </ul>
    {s.foot && <p className="lead info-card__foot">{rich(s.foot)}</p>}
  </div>
);

// A labeled gallery: a grid of tiles, each with a picture (or placeholder),
// a name and a short description. Used for biomes, food, cities, sights, etc.
// To add a photo to a tile, set `img: '/images/xyz.webp'` on that item in content.js.
const Gallery = ({ title, lead, foot, items, large }) => (
  <div className="gallery">
    <p className="eyebrow eyebrow--center gallery__title">{title}</p>
    {lead && <p className="lead gallery__lead">{rich(lead)}</p>}
    <div className={'gallery-grid' + (large ? ' gallery-grid--large' : '')}>
      {items.map((it, i) => (
        <div key={i} className="tile">
          <Photo src={it.img} label={it.name} className={'tile__photo' + (it.img ? '' : ' photo__placeholder')} />
          <div className="tile__body">
            <div className="tile__name">{it.name}</div>
            {it.desc && <p className="tile__desc">{rich(it.desc)}</p>}
          </div>
        </div>
      ))}
    </div>
    {foot && <p className="lead gallery__foot">{rich(foot)}</p>}
  </div>
);

export const BrazilSection = ({ L }) => {
  const B = L.brazil;
  const iconMap = { wifi: Icons.wifi, chat: Icons.chat, money: Icons.money, sun: Icons.sun, leaf: Icons.leaf, health: Icons.health, shield: Icons.shield, fireworks: Icons.fireworks, fork: Icons.fork, music: Icons.music };
  return (
    <section id="brazil" className="section section--page">
      <div className="wrap">
        <SectionHead eyebrow={B.eyebrow} title={B.title} intro={B.intro} />
        <Photo src="/images/brazil.webp" alt="Map of Brazil" className="brazil__photo" />

        <div className="card watch">
          <div className="watch__head">
            <IconBadge><Icons.play w={24} /></IconBadge>
            <h3 className="watch__title">{B.watch.title}</h3>
          </div>
          <p className="lead watch__lead">{rich(B.watch.lead)}</p>
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

        <Gallery {...B.biomes} large />
        <Gallery {...B.food} />
        <Gallery {...B.holidays} large />
        <Gallery {...B.music} />
        <Gallery {...B.trip} large />
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
          <Photo src="/images/brasilia.webp" alt="Brasília at sunset" className="brasilia__photo" />
          <div>
            <div className="brasilia__badge"><IconBadge><Icons.building w={26} /></IconBadge></div>
            <h3 className="brasilia__subtitle">{C.whatTitle}</h3>
            <p className="lead">{rich(C.intro)}</p>
            <Ribbon className="brasilia__ribbon" />
          </div>
        </div>

        <Gallery title={C.seeLabel} items={C.sights} large />
        {/* <Gallery title={C.eatLabel} lead={C.eatLead} items={C.eat} large /> */}
      </div>
    </section>
  );
};

// ---------- RSVP ----------
// A site-styled form that POSTs to a Google Form's /formResponse endpoint (see
// rsvp-config.js). The Form ids it ships are submit-only public identifiers, so
// there are no secrets in the client; responses land in the couple's Google Sheet.
export const RsvpSection = ({ L }) => {
  const R = L.rsvp;
  const [form, setForm] = useState({ name: '', email: '', phone: '', attending: '', note: '', hp: '' });
  const [status, setStatus] = useState('idle');    // idle | sending | done | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.hp) { setStatus('done'); return; }    // honeypot tripped → drop silently
    if (!form.name.trim() || !form.attending) return;
    setStatus('sending');
    const data = new URLSearchParams();
    data.append(RSVP.fields.name, form.name.trim());
    data.append(RSVP.fields.email, form.email.trim());
    data.append(RSVP.fields.phone, form.phone.trim());
    data.append(RSVP.fields.attending, RSVP.attendingValues[form.attending] || form.attending);
    data.append(RSVP.fields.note, form.note.trim());
    // Google sends no CORS headers, so the response is opaque (no-cors): the browser
    // forbids reading its HTTP status (a 200 and a 401 are indistinguishable here).
    // The only failure we can detect is the request never completing — offline, Google
    // unreachable, or a hung connection — so we abort after a timeout and surface that
    // as an error instead of a false "thank you".
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
      await fetch(RSVP.action, { method: 'POST', mode: 'no-cors', body: data, signal: ctrl.signal });
      setStatus('done');
    } catch (err) {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  return (
    <section id="rsvp" className="section section--page">
      <div className="wrap wrap--narrow">
        <SectionHead eyebrow={R.eyebrow} title={R.title} intro={R.intro} />
        {R.notes && (
          <div className="notes">
            {R.notes.map(([label, text], i) => (
              <div key={i} className="note">
                <span className="note__icon"><Icons.heart w={22} /></span>
                <p className="note__text"><strong>{label}.</strong> {rich(text)}</p>
              </div>
            ))}
          </div>
        )}

        {!RSVP_READY ? (
          <div className="card rsvp__form"><div className="btn-submit">{R.soon}</div></div>
        ) : status === 'done' ? (
          <div className="card rsvp__done">
            <span className="rsvp__done-icon"><Icons.heart w={36} /></span>
            <p className="rsvp__done-title">{R.thanks}</p>
            <p className="lead">{R.thanksBody}</p>
          </div>
        ) : (
          <form className="card rsvp__form" onSubmit={submit} noValidate>
            <label className="field">
              <span className="field__label">{R.name}</span>
              <input className="field__input" value={form.name} onChange={set('name')} placeholder={R.namePh} required />
            </label>
            <label className="field">
              <span className="field__label">{R.email}</span>
              <input className="field__input" type="email" value={form.email} onChange={set('email')} placeholder={R.emailPh} />
            </label>
            <label className="field">
              <span className="field__label">{R.phone}</span>
              <input className="field__input" type="tel" value={form.phone} onChange={set('phone')} placeholder={R.phonePh} />
            </label>
            <label className="field">
              <span className="field__label">{R.attending}</span>
              <select className="field__input" value={form.attending} onChange={set('attending')} required>
                <option value="" disabled>{R.attendingPh}</option>
                <option value="yes">{R.yes}</option>
                <option value="no">{R.no}</option>
              </select>
            </label>
            <label className="field">
              <span className="field__label">{R.note}</span>
              <textarea className="field__input field__input--tall" value={form.note} onChange={set('note')} placeholder={R.notePh} rows={3} />
            </label>
            {/* honeypot: off-screen, not for humans. Bots that fill it get dropped. */}
            <input className="rsvp__hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
                   value={form.hp} onChange={set('hp')} />
            {status === 'error' && <p className="rsvp__error">{R.error}</p>}
            <button type="submit" className="btn-submit" disabled={status === 'sending'}>
              {status === 'sending' ? R.sending : R.submit}
            </button>
          </form>
        )}
        {R.foot && <p className="lead rsvp__foot">{rich(R.foot)}</p>}
      </div>
    </section>
  );
};

// ---------- REGISTRY ----------
export const RegistrySection = ({ L }) => (
  <section id="gifts" className="section section--alt">
    <div className="wrap wrap--mid">
      <SectionHead eyebrow={L.registry.eyebrow} title={L.registry.title} intro={L.registry.intro} />
      <div className="gifts">
        {L.registry.ways.map(([name, who, line, handle], i) => (
          <div key={i} className="card gift">
            <IconBadge><Icons.heart w={24} /></IconBadge>
            <div className="gift__name">{name}</div>
            {who && <div className="gift__who">{rich(who)}</div>}
            {line && <p className="lead gift__line">{rich(line)}</p>}
            {handle && <div className="gift__handle">{rich(handle)}</div>}
          </div>
        ))}
      </div>
      <p className="lead registry__note">{rich(L.registry.note)}</p>
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
