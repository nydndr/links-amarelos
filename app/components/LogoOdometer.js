'use client';

import { useState, useEffect, useRef } from 'react';
import LinksLogotype from './icons/LinksLogotype';
import HyperlinksLogo from './icons/HyperlinksLogo';
import OndasLogotype from './icons/OndasLogotype';

const INITIAL_DELAY = 2000;
const STEP_INTERVAL = 3000;  // between each logo in a cycle
const REST_INTERVAL = 60000; // pause between cycles
const ANIM_MS = 600;

export default function LogoOdometer() {
  const [stripIdx, setStripIdx] = useState(3);
  const [withTransition, setWithTransition] = useState(true);
  const stepRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isCyclingRef = useRef(false);
  const timerRef = useRef(null);

  function advance() {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const next = (stepRef.current + 1) % 3;
    stepRef.current = next;

    if (next === 0) {
      setWithTransition(true);
      setStripIdx(0);
      setTimeout(() => {
        setWithTransition(false);
        setStripIdx(3);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setWithTransition(true);
            isAnimatingRef.current = false;
          })
        );
      }, ANIM_MS + 50);
    } else {
      setWithTransition(true);
      setStripIdx(3 - next);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, ANIM_MS);
    }
  }

  function scheduleStep(remaining) {
    if (remaining <= 0) {
      isCyclingRef.current = false;
      timerRef.current = setTimeout(startCycle, REST_INTERVAL);
      return;
    }
    advance();
    timerRef.current = setTimeout(() => scheduleStep(remaining - 1), STEP_INTERVAL);
  }

  function startCycle() {
    isCyclingRef.current = true;
    scheduleStep(3);
  }

  useEffect(() => {
    timerRef.current = setTimeout(startCycle, INITIAL_DELAY);
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleMouseEnter() {
    if (isCyclingRef.current) return;
    clearTimeout(timerRef.current);
    startCycle();
  }

  return (
    <div
      className="h-5 overflow-hidden cursor-pointer"
      style={{ minWidth: '160px' }}
      onMouseEnter={handleMouseEnter}
    >
      <div
        style={{
          transform: `translateY(${-(stripIdx * 1.25)}rem)`,
          transition: withTransition
            ? `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
      >
        <div className="h-5 flex items-center"><LinksLogotype className="h-5 w-auto" /></div>
        <div className="h-5 flex items-center"><OndasLogotype className="h-5 w-auto" /></div>
        <div className="h-5 flex items-center"><HyperlinksLogo className="h-5 w-auto" /></div>
        <div className="h-5 flex items-center"><LinksLogotype className="h-5 w-auto" /></div>
      </div>
    </div>
  );
}
