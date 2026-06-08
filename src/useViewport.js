// useViewport.js — tracks the window width so components can adapt at runtime.
// Most responsiveness is handled purely in CSS (auto-fit grids + clamp); this
// hook is for the few cases that need a real layout switch, like the nav menu.
import { useState, useEffect } from 'react';

export function useViewport() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { w, isMobile: w < 768, isCompact: w < 1080 };
}
