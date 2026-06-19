'use client';
import { useEffect, useState } from 'react';

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

const LABELS = [
  {
    stages: [0, 1, 2],
    activeColor: { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.5)' },
    content: (
      <span style={{ fontFamily: 'var(--font-space-mono, monospace)' }}>
        internet
      </span>
    ),
  },
  {
    stages: [3, 4],
    persistFrom: 3,
    activeColor: { bg: 'rgba(254,204,0,0.2)', border: 'rgba(254,204,0,0.8)' },
    content: (
      <span>
        <span style={{ fontFamily: 'var(--font-manrope, sans-serif)' }}>links</span>
        {' + '}
        <span style={{ fontFamily: 'var(--font-unbounded, sans-serif)' }}>ondas</span>
      </span>
    ),
  },
  {
    stages: [5, 6, 7],
    activeColor: { bg: 'rgba(124,91,190,0.2)', border: 'rgba(155,127,212,0.8)' },
    content: (
      <span style={{ fontFamily: 'var(--font-space-mono, monospace)' }}>
        hyperlinks
      </span>
    ),
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function LabelBar({ currentStage, position, reducedMotion }) {
  const pillTransition = `background-color 180ms ${EASE_OUT}, border-color 180ms ${EASE_OUT}${reducedMotion ? '' : `, transform 180ms ${EASE_OUT}`}`;

  return (
    <div
      style={{
        position: 'absolute',
        [position]: 0,
        left: 0,
        right: 0,
        display: 'flex',
        pointerEvents: 'none',
      }}
    >
      {LABELS.map((label, i) => {
        const active = label.persistFrom !== undefined
          ? currentStage >= label.persistFrom
          : label.stages.includes(currentStage);
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 20px',
              opacity: active ? 1 : 0.25,
              transition: `opacity 200ms ${EASE_OUT}`,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '9999px',
                fontSize: '12px',
                padding: '2px 8px',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'lowercase',
                lineHeight: 1.4,
                transition: pillTransition,
                backgroundColor: active ? label.activeColor.bg : 'rgba(255,255,255,0.1)',
                border: `1px solid ${active ? label.activeColor.border : 'rgba(255,255,255,0.5)'}`,
                transform: !reducedMotion && active ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              {label.content}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function StageLabels({ currentStage }) {
  const reducedMotion = useReducedMotion();
  return (
    <>
      <LabelBar currentStage={currentStage} position="top" reducedMotion={reducedMotion} />
      <LabelBar currentStage={currentStage} position="bottom" reducedMotion={reducedMotion} />
    </>
  );
}
