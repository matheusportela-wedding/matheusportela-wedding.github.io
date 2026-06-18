// invitation.jsx — the envelope-opening invitation, embedded as an in-app section
// so it shares the site's single <Nav>. All styling lives in styles.css (scoped
// under .invite). Assets are served from /invitation/assets/ (public/invitation/assets).
import React, { useEffect, useRef } from 'react';

const A = '/invitation/assets';

export const InvitationSection = () => {
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
            <img className="layer env-backbase" src={`${A}/envelopeBackBase.webp`} alt="" />
            <img className="letter" src={`${A}/cardFront.webp`} />
            <img className="layer flap-shadow" src={`${A}/envelopeFrontFlapShadow.webp`} alt="" />
            <img className="layer env-cover" src={`${A}/envelopeBackCover.webp`} alt="" />
            <div className="flap">
              <img className="flap-inner" src={`${A}/envelopeBackFlap.webp`} alt="" />
              <img className="flap-outer" src={`${A}/envelopeFrontFlap.webp`} alt="" />
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
