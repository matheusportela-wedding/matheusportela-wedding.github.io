// invitation.jsx — the envelope-opening invitation, embedded as an in-app section
// so it shares the site's single <Nav>. All styling lives in styles.css (scoped
// under .invite). Envelope/bouquet art is served from /invitation/assets/; the card
// itself is rendered as live text (from L.invite) so it stays crisp at any resolution
// and can be localised / personalised.
import React, { useEffect, useRef } from 'react';
import { ENV_LAYERS } from './envelope-layers.js';

const A = '/invitation/assets';
// inline SVG layer — re-rasterises crisp at the camera zoom (an <img src=svg> would
// be decoded to a bitmap at its small layout size and then scaled up, looking soft).
const EnvLayer = ({ cls, layer }) => (
  <svg className={cls} viewBox={ENV_LAYERS[layer].vb} preserveAspectRatio="xMidYMid meet"
       dangerouslySetInnerHTML={{ __html: ENV_LAYERS[layer].svg }} />
);

export const InvitationSection = ({ L }) => {
  const inv = (L && L.invite) || {};
  const names = inv.names || [];
  const stageRef = useRef(null);
  const replayRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const replay = replayRef.current;
    if (!stage) return;
    const DURATION = 5000;
    let doneTimer;

    const play = () => {
      stage.classList.remove('is-playing', 'is-done');
      if (replay) replay.classList.remove('show');
      void stage.offsetWidth;                       // restart the CSS animations
      stage.classList.add('is-playing');
      clearTimeout(doneTimer);
      doneTimer = setTimeout(() => {
        stage.classList.add('is-done');
        if (replay) replay.classList.add('show');
      }, DURATION);
    };

    const onStageClick = () => { if (replay && replay.classList.contains('show')) play(); };
    const onReplayClick = (e) => { e.stopPropagation(); play(); };

    stage.addEventListener('click', onStageClick);
    if (replay) replay.addEventListener('click', onReplayClick);
    const startTimer = setTimeout(play, 600);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(doneTimer);
      stage.removeEventListener('click', onStageClick);
      if (replay) replay.removeEventListener('click', onReplayClick);
    };
  }, []);

  return (
    <section className="invite">
      <div className="stage" ref={stageRef}>
        <div className="camera">
          <div className="scene">
            <EnvLayer cls="layer env-backbase" layer="back" />
            <EnvLayer cls="layer env-liner" layer="liner" />

            {/* the invitation card — live HTML text, not an image */}
            <div className="letter" role="img" aria-label={`Wedding invitation — ${names.join(' and ')}`}>
              <img className="card__bouquet" src={`${A}/bouquet.gif`} alt="" />
              <p className="card__preline">{inv.preline}</p>
              <div className="card__names">
                <span>{names[0]} <span className="card__amp">&amp;</span></span>
                <span>{names[1]}</span>
              </div>
              {[inv.request, inv.date, inv.venue].map((block, bi) => (
                <p className="card__lines" key={bi}>
                  {(block || []).map((line, i) => <span key={i}>{line}</span>)}
                </p>
              ))}
              <p className="card__closing">{inv.closing}</p>
            </div>

            <img className="layer flap-shadow" src={`${A}/envelopeFrontFlapShadow.webp`} alt="" />
            <EnvLayer cls="layer env-cover" layer="cover" />
            <div className="flap">
              {/* front face (seen when open): cream flap + green liner inset on top */}
              <EnvLayer cls="flap-front" layer="flapOuter" />
              <EnvLayer cls="flap-inner" layer="flapInner" />
              {/* back face (seen when closed): cream flap */}
              <EnvLayer cls="flap-outer" layer="flapOuter" />
            </div>
          </div>
        </div>
        <button className="replay" ref={replayRef} aria-label="Replay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></svg>
        </button>
      </div>
    </section>
  );
};
