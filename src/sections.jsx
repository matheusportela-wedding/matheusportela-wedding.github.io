// sections.jsx — the page sections of the wedding site. Each takes the active
// theme `t` and the active language dictionary `L` (from content.js).
import React from 'react';
import { SP, KSprig, KPalm, KLeaf, KRibbon, Photo, Icons, FlagBR, FlagUS } from './kit.jsx';
import { Wrap, Eye, Calli, Txt, SectionHead, IconBadge, Card, Section } from './primitives.jsx';
import { CT } from './themes.js';

// ---------- NAV ----------
export const Nav = ({ t, L, tab, setTab, lang, setLang }) => {
  const tabs = ['inicio', 'padrinhos', 'evento', 'viagem', 'brazil', 'brasilia', 'presentes'];
  const FlagBtn = ({ code, Flag }) => (
    <button onClick={() => setLang(code)} title={code === 'pt' ? 'Português' : 'English'} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 0, borderRadius: 4,
      opacity: lang === code ? 1 : 0.4, boxShadow: lang === code ? `0 0 0 2px ${t.accent}` : 'none',
    }}><Flag w={24} /></button>
  );
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: t.navBg, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${t.navBorder}` }}>
      <Wrap w={1300} style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
        <button onClick={() => setTab('inicio')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginRight: 4, flex: '0 0 auto' }}><Calli size={36} color={t.navFg}>A&amp;M</Calli></button>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {tabs.map((key) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => setTab(key)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', whiteSpace: 'nowrap',
                fontFamily: t.body, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: t.navFg, opacity: active ? 1 : 0.78, borderBottom: `2px solid ${active ? t.accent : 'transparent'}`,
              }}>{L.nav[key]}</button>
            );
          })}
          <button onClick={() => setTab('rsvp')} style={{ border: 'none', cursor: 'pointer', fontFamily: t.body, fontSize: 12.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', background: t.accent, padding: '10px 18px', borderRadius: 2, whiteSpace: 'nowrap' }}>{L.nav.confirmar}</button>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingLeft: 6, borderLeft: `1px solid ${t.navFg}33`, marginLeft: 2 }}>
            <FlagBtn code="pt" Flag={FlagBR} />
            <FlagBtn code="en" Flag={FlagUS} />
          </div>
        </div>
      </Wrap>
    </div>
  );
};

// ---------- HERO ----------
export const Hero = ({ t, L }) => {
  const dark = t.heroTone === 'dark';
  const icons = [Icons.calendar, Icons.clock, Icons.pin];
  return (
    <section id="inicio" style={{ position: 'relative', minHeight: 620, background: t.heroBg, color: t.heroFg, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {t.motif === 'palm' && <React.Fragment>
        <div style={{ position: 'absolute', left: -70, bottom: -60 }}><KPalm w={300} h={500} color={SP.lime} opacity={0.5} /></div>
        <div style={{ position: 'absolute', right: -70, top: -70, transform: 'scaleX(-1) scaleY(-1)' }}><KPalm w={280} h={470} color={t.accent} opacity={0.45} /></div>
      </React.Fragment>}
      {t.motif === 'line' && <div style={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)' }}><KSprig w={64} h={32} color={SP.olive} /></div>}
      <Wrap style={{ position: 'relative', textAlign: 'center', width: '100%' }}>
        <Eye t={t} color={dark ? 'rgba(255,255,255,0.85)' : t.accentDeep}>{L.hero.eyebrow}</Eye>
        <Calli size={172} color={t.heroFg} style={{ margin: '2px 0 0' }}>Anna <span style={{ color: t.accent }}>&amp;</span> Matheus</Calli>
        <Txt t={t} size={20} color={dark ? 'rgba(255,255,255,0.92)' : t.inkSoft} style={{ fontStyle: 'italic', marginTop: 6 }}>{L.hero.dateItalic}</Txt>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
          {L.hero.chips.map((label, i) => {
            const Icon = icons[i];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 18px', borderRadius: 40, border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : t.line}`, color: t.heroFg }}>
                <Icon w={18} stroke={dark ? t.featureAccent : t.accentDeep} /><span style={{ fontFamily: t.body, fontSize: 15.5, letterSpacing: '0.04em' }}>{label}</span>
              </div>
            );
          })}
        </div>
      </Wrap>
      {t.motif !== 'line' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}><KRibbon colors={t.ribbon} h={12} /></div>}
    </section>
  );
};

// ---------- COUPLE PORTRAIT (home) ----------
export const CoupleIntro = ({ t, L }) => (
  <Section id="nos" bg={t.page} pad="96px 0">
    <Wrap>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Photo label="couple portrait" h={540} bg={t.motif === 'palm' ? SP.coralDeep : SP.olive} radius={2} />
          {t.motif === 'line' && <div style={{ position: 'absolute', top: -22, left: -22 }}><KSprig w={70} h={34} color={SP.olive} /></div>}
          {t.motif === 'palm' && <div style={{ position: 'absolute', bottom: -24, right: -24 }}><KLeaf w={70} h={112} color={t.accent} /></div>}
        </div>
        <div>
          <Eye t={t}>{L.couple.eyebrow}</Eye>
          <Calli size={94} color={t.ink} style={{ margin: '4px 0 16px' }}>{L.couple.title}</Calli>
          <Txt t={t}>{L.couple.p1}</Txt>
          <Txt t={t} style={{ marginTop: 14 }}>{L.couple.p2}</Txt>
          <div style={{ marginTop: 22 }}><KRibbon colors={t.ribbon} w={160} h={6} radius={3} /></div>
        </div>
      </div>
    </Wrap>
  </Section>
);

// ---------- WEDDING PARTY ----------
const Person = ({ t, name, role, i }) => (
  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div style={{ position: 'relative' }}>
      <Photo label="" w={156} h={156} bg={[SP.olive, SP.oliveSoft, SP.coralDeep][i % 3]} radius={78} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', boxShadow: `inset 0 0 0 1px ${t.line}` }} />
    </div>
    <div>
      <div style={{ fontFamily: t.body, fontSize: 20, color: t.ink, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{name}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.accentDeep, marginTop: 5 }}>{role}</div>
    </div>
  </div>
);
export const WeddingPartySection = ({ t, L }) => (
  <Section id="padrinhos" bg={t.page}>
    <Wrap>
      <SectionHead t={t} eyebrow={L.party.eyebrow} title={L.party.title} intro={L.party.intro} />
      {L.party.groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: gi === L.party.groups.length - 1 ? 0 : 52 }}>
          <div style={{ textAlign: 'center', marginBottom: 26 }}><Eye t={t}>{g.group}</Eye></div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(g.people.length, 4)}, 1fr)`, gap: 30, justifyItems: 'center', maxWidth: g.people.length <= 2 ? 560 : '100%', margin: '0 auto' }}>
            {g.people.map(([name, role], i) => <Person key={i} t={t} name={name} role={role} i={i} />)}
          </div>
        </div>
      ))}
      {L.party.foot && <Txt t={t} size={15.5} style={{ textAlign: 'center', maxWidth: 760, margin: '44px auto 0', fontStyle: 'italic' }}>{L.party.foot}</Txt>}
    </Wrap>
  </Section>
);

// ---------- EVENT ----------
export const EventSection = ({ t, L }) => {
  const E = L.event;
  const rowIcons = [Icons.pin, Icons.fork, Icons.sun];
  return (
    <Section id="evento" bg={t.page}>
      <Wrap>
        <SectionHead t={t} eyebrow={E.eyebrow} title={E.title} intro={E.intro} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
          {[[E.ceremony, Icons.ring], [E.reception, Icons.star]].map(([c, Icon], i) => (
            <Card key={i} t={t} style={{ textAlign: 'center', padding: '40px 34px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><IconBadge t={t}><Icon w={26} /></IconBadge></div>
              <Eye t={t}>{c.tag}</Eye>
              <Calli size={68} color={t.accentDeep} style={{ margin: '4px 0 12px' }}>{c.time}</Calli>
              <Txt t={t} size={16.5}>{c.desc}</Txt>
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, alignItems: 'stretch' }}>
          <Photo label="espaço renascença · garden" h={340} bg={t.motif === 'line' ? SP.olive : SP.oliveSoft} radius={2} style={{ height: '100%' }} />
          <Card t={t} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
            {E.rows.map(([label, text], i) => {
              const Icon = rowIcons[i];
              return (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <IconBadge t={t}><Icon w={24} /></IconBadge>
                  <div>
                    <div style={{ fontFamily: t.body, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.accentDeep, marginBottom: 2 }}>{label}</div>
                    <Txt t={t} size={16} style={{ whiteSpace: 'pre-line' }}>{text}</Txt>
                  </div>
                </div>
              );
            })}
            <span style={{ alignSelf: 'flex-start', marginTop: 4, fontFamily: t.body, fontSize: 13.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.ink, border: `1px solid ${t.ink}`, padding: '10px 22px', cursor: 'pointer' }}>{E.mapBtn}</span>
          </Card>
        </div>
      </Wrap>
    </Section>
  );
};

// ---------- TRAVEL ----------
export const TravelSection = ({ t, L }) => {
  const icons = [Icons.plane, Icons.car, Icons.bed, Icons.money, Icons.passport, Icons.calendar];
  return (
    <Section id="viagem" bg={t.alt}>
      <Wrap>
        <SectionHead t={t} eyebrow={L.travel.eyebrow} title={L.travel.title} intro={L.travel.intro} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {L.travel.cards.map(([title, lead, items], i) => {
            const Icon = icons[i];
            return (
              <Card key={i} t={t} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <IconBadge t={t}><Icon w={26} /></IconBadge>
                <div style={{ fontFamily: t.body, fontSize: 24, color: t.ink, lineHeight: 1.15 }}>{title}</div>
                <Txt t={t} size={15.5}>{lead}</Txt>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {items.map((it, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.ribbon[j % t.ribbon.length], marginTop: 9, flex: '0 0 auto' }} />
                      <Txt t={t} size={14.5} style={{ lineHeight: 1.6 }}>{it}</Txt>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Wrap>
    </Section>
  );
};

// ---------- BRAZIL (travel guide) ----------
const InfoCard = ({ t, s, Icon }) => (
  <Card t={t} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <IconBadge t={t}><Icon w={24} /></IconBadge>
      <div style={{ fontFamily: t.body, fontSize: 23, color: t.ink, lineHeight: 1.1 }}>{s.title}</div>
    </div>
    {s.lead && <Txt t={t} size={15.5}>{s.lead}</Txt>}
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
      {s.items.map(([bold, rest], j) => (
        <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.ribbon[j % t.ribbon.length], marginTop: 9, flex: '0 0 auto' }} />
          <Txt t={t} size={14.5} style={{ lineHeight: 1.6 }}>{bold && <strong style={{ color: t.ink, fontWeight: 600 }}>{bold} </strong>}{rest}</Txt>
        </li>
      ))}
    </ul>
    {s.foot && <Txt t={t} size={14.5} style={{ fontStyle: 'italic', marginTop: 2 }}>{s.foot}</Txt>}
  </Card>
);
export const BrazilSection = ({ t, L }) => {
  const B = L.brazil;
  const iconMap = { wifi: Icons.wifi, chat: Icons.chat, money: Icons.money, sun: Icons.sun, leaf: Icons.leaf, shield: Icons.shield, fireworks: Icons.fireworks, fork: Icons.fork, music: Icons.music };
  return (
    <Section id="brazil" bg={t.alt}>
      <Wrap>
        <SectionHead t={t} eyebrow={B.eyebrow} title={B.title} intro={B.intro} />
        <Photo label={B.photo} h={300} bg={SP.olive} radius={2} style={{ marginBottom: 28 }} />

        {/* Watch before you come */}
        <Card t={t} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
            <IconBadge t={t}><Icons.play w={24} /></IconBadge>
            <div style={{ fontFamily: t.body, fontSize: 23, color: t.ink }}>{B.watch.title}</div>
          </div>
          <Txt t={t} size={15.5}>{B.watch.lead}</Txt>
          <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px 28px' }}>
            {B.watch.videos.map(([label, url], i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.ribbon[i % t.ribbon.length], marginTop: 9, flex: '0 0 auto' }} />
                <a href={url} target="_blank" rel="noreferrer" style={{ fontFamily: t.body, fontSize: 15, lineHeight: 1.5, color: t.accentDeep, textDecoration: 'none', borderBottom: `1px solid ${t.accentDeep}55` }}>{label}</a>
              </li>
            ))}
          </ul>
        </Card>

        {/* Practical guide */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 60 }}>
          {B.info.map((s, i) => <InfoCard key={i} t={t} s={s} Icon={iconMap[s.icon] || Icons.star} />)}
        </div>

        {/* Make it a trip */}
        <div style={{ textAlign: 'center', marginBottom: 10 }}><Eye t={t}>{B.trip.title}</Eye></div>
        <Txt t={t} size={17} style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 26px' }}>{B.trip.lead}</Txt>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {B.trip.places.map((name, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${t.line}` }}>
              <Photo label={name.toLowerCase()} h={140} bg={[SP.olive, SP.coralDeep, SP.oliveSoft][i % 3]} radius={0} />
              <div style={{ padding: '12px 16px', background: t.card }}>
                <div style={{ fontFamily: t.body, fontSize: 17, color: t.ink, lineHeight: 1.15 }}>{name}</div>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
};

// ---------- BRASÍLIA (the city) ----------
export const BrasiliaSection = ({ t, L }) => {
  const C = L.brasilia;
  return (
    <Section id="brasilia" bg={t.page}>
      <Wrap>
        <SectionHead t={t} eyebrow={C.eyebrow} title={C.title} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', marginBottom: 56 }}>
          <Photo label={C.photo} h={380} bg={SP.olive} radius={2} />
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}><IconBadge t={t}><Icons.building w={26} /></IconBadge></div>
            <div style={{ fontFamily: t.body, fontSize: 28, color: t.ink, marginBottom: 10 }}>{C.whatTitle}</div>
            <Txt t={t}>{C.intro}</Txt>
            <div style={{ marginTop: 18 }}><KRibbon colors={t.ribbon} w={150} h={6} radius={3} /></div>
          </div>
        </div>

        <div style={{ marginBottom: 18, textAlign: 'center' }}><Eye t={t}>{C.seeLabel}</Eye></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {C.sights.map((name, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: t.alt, padding: '14px 18px', border: `1px solid ${t.line}` }}>
              <span style={{ color: t.accentDeep, flex: '0 0 auto' }}><Icons.pin w={20} /></span>
              <div style={{ fontFamily: t.body, fontSize: 16.5, color: t.ink, lineHeight: 1.15 }}>{name}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
};

// ---------- RSVP ----------
const Field = ({ t, label, ph, h = 52 }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
    <span style={{ fontFamily: t.body, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentDeep }}>{label}</span>
    <div style={{ height: h, border: `1px solid ${t.line}`, background: '#fff', display: 'flex', alignItems: h > 70 ? 'flex-start' : 'center', padding: h > 70 ? '12px 16px' : '0 16px', fontFamily: t.body, fontSize: 16, color: `${t.ink}77` }}>{ph}</div>
  </label>
);
export const RsvpSection = ({ t, L }) => {
  const R = L.rsvp;
  return (
    <Section id="rsvp" bg={t.alt}>
      <Wrap w={680}>
        <SectionHead t={t} eyebrow={R.eyebrow} title={R.title} intro={R.intro} />
        {R.notes && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {R.notes.map(([label, text], i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ marginTop: 2 }}><Icons.heart w={22} stroke={t.accentDeep} /></span>
                <Txt t={t} size={16}><strong style={{ color: t.ink, fontWeight: 600 }}>{label}.</strong> {text}</Txt>
              </div>
            ))}
          </div>
        )}
        <Card t={t} style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field t={t} label={R.name} ph={R.namePh} />
          <Field t={t} label={R.email} ph={R.emailPh} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field t={t} label={R.attending} ph={R.attendingPh} />
            <Field t={t} label={R.guests} ph="1" />
          </div>
          <Field t={t} label={R.note} ph={R.notePh} h={90} />
          <div style={{ height: 56, background: t.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.body, fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4, cursor: 'pointer' }}>{R.submit}</div>
        </Card>
        {R.foot && <Txt t={t} size={15.5} style={{ textAlign: 'center', marginTop: 24, fontStyle: 'italic' }}>{R.foot}</Txt>}
      </Wrap>
    </Section>
  );
};

// ---------- REGISTRY ----------
export const RegistrySection = ({ t, L }) => (
  <Section id="presentes" bg={t.page}>
    <Wrap w={1000}>
      <SectionHead t={t} eyebrow={L.registry.eyebrow} title={L.registry.title} intro={L.registry.intro} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {L.registry.ways.map(([name, who, line, handle], i) => (
          <Card key={i} t={t} style={{ textAlign: 'center', padding: '34px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <IconBadge t={t}><Icons.heart w={24} /></IconBadge>
            <div style={{ fontFamily: 'Mrs Saint Delafield, cursive', fontSize: 56, color: t.accentDeep, lineHeight: 0.9 }}>{name}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.inkSoft }}>{who}</div>
            <Txt t={t} size={15} style={{ marginTop: 4 }}>{line}</Txt>
            <div style={{ fontFamily: t.body, fontSize: 16, color: t.ink, background: t.alt, padding: '8px 16px', borderRadius: 2, wordBreak: 'break-all' }}>{handle}</div>
          </Card>
        ))}
      </div>
      <Txt t={t} size={14.5} style={{ textAlign: 'center', marginTop: 28, fontStyle: 'italic' }}>{L.registry.note}</Txt>
    </Wrap>
  </Section>
);

// ---------- FOOTER ----------
export const Footer = ({ t, L }) => (
  <footer style={{ background: t.footerBg, color: t.footerFg, padding: '64px 0 56px', textAlign: 'center' }}>
    <Calli size={104} color={t.footerFg}>Anna &amp; Matheus</Calli>
    <div style={{ fontFamily: t.body, fontSize: 15, letterSpacing: '0.26em', textTransform: 'uppercase', marginTop: 4, opacity: 0.85 }}>{L.footer.dateLine}</div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}><KRibbon colors={t.ribbon} w={180} h={6} radius={3} /></div>
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.2em', marginTop: 22, opacity: 0.6 }}>#ANNAEMATHEUS2026 · annaematheus@email.com</div>
  </footer>
);

// ---------- THEME SWITCHER ----------
export const Switcher = ({ tkey, setKey }) => (
  <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 100, background: '#fff', borderRadius: 40, boxShadow: '0 10px 30px -8px rgba(0,0,0,0.3)', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', padding: '0 4px' }}>Tema</span>
    {Object.values(CT).map(c => (
      <button key={c.key} onClick={() => setKey(c.key)} title={c.name} style={{
        width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
        border: tkey === c.key ? `2px solid ${SP.ink}` : '2px solid transparent',
        background: `linear-gradient(135deg, ${c.ribbon[0]} 50%, ${c.accent} 50%)`, outline: 'none', padding: 0,
      }} />
    ))}
  </div>
);
