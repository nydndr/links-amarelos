'use client';

const LABELS = [
  { text: 'Curadoria', stages: [0, 1, 2] },
  { text: 'Links Amarelos + Ondas Amarelas', stages: [3, 4] },
  { text: 'Hyperlinks', stages: [5, 6, 7] },
];

export default function StageLabels({ currentStage }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px 10px',
        pointerEvents: 'none',
      }}
    >
      {LABELS.map((label, i) => {
        const active = label.stages.includes(currentStage);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: i === 0 ? 'flex-start' : i === 2 ? 'flex-end' : 'center',
              opacity: active ? 1 : 0.25,
              transition: 'opacity 0.6s ease',
              flex: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-space-mono, monospace)',
                fontSize: '11px',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'lowercase',
              }}
            >
              {label.text}
            </span>
            {active && (
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  marginTop: '3px',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
