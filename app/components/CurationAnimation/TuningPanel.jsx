'use client';
import { useState, useCallback } from 'react';

function Slider({ label, min, max, step = 0.001, configKey, configRef, format }) {
  const [val, setVal] = useState(configRef.current[configKey]);
  const onChange = useCallback(e => {
    const v = parseFloat(e.target.value);
    setVal(v);
    configRef.current[configKey] = v;
  }, [configKey, configRef]);
  const display = format ? format(val) : (Number.isInteger(val) ? val : val.toFixed(3));
  return (
    <label style={labelStyle}>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ opacity: 0.8 }}>{label}</span><b>{display}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={val} onChange={onChange} style={inputStyle} />
    </label>
  );
}

function StageSlider({ label, index, configRef }) {
  const [val, setVal] = useState(configRef.current.stageDurations[index]);
  const onChange = useCallback(e => {
    const v = parseInt(e.target.value, 10);
    setVal(v);
    const next = [...configRef.current.stageDurations];
    next[index] = v;
    configRef.current.stageDurations = next;
  }, [index, configRef]);
  return (
    <label style={labelStyle}>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ opacity: 0.8 }}>{label}</span><b>{val}ms</b>
      </span>
      <input type="range" min={200} max={12000} step={100} value={val} onChange={onChange} style={inputStyle} />
    </label>
  );
}

const STAGE_LABELS = ['S0 Idle', 'S1 Click', 'S2 Gather', 'S3 Settle', 'S4 Split', 'S5 Grid', 'S6 Frame'];

const panelStyle = {
  position: 'fixed',
  top: 80,
  right: 12,
  zIndex: 1000,
  background: 'rgba(0,0,0,0.88)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  padding: '12px 14px',
  width: 230,
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: 11,
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
};

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 3 };
const inputStyle = { width: '100%', cursor: 'pointer' };

const dividerStyle = {
  borderTop: '1px solid rgba(255,255,255,0.15)',
  paddingTop: 6,
  marginTop: 2,
  fontSize: 10,
  letterSpacing: '0.08em',
  opacity: 0.5,
};

const btnStyle = {
  padding: '5px 10px',
  borderRadius: 4,
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: 11,
  cursor: 'pointer',
  flex: 1,
};

export default function TuningPanel({ configRef, restartRef }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const keys = [
      'speed', 'stageDurations',
      'migrateSpring', 'migrateDamping', 'migrateNoise',
      'settleOrbit', 'settleDamping',
      'gridSpring', 'gridDamping',
      'cursorSpeed', 'cursorPausePct',
    ];
    const out = Object.fromEntries(keys.map(k => [k, configRef.current[k]]));
    out.stageDurations = [...configRef.current.stageDurations];
    navigator.clipboard.writeText(JSON.stringify(out, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={panelStyle}>
      <div style={{ fontWeight: 'bold', letterSpacing: '0.1em', opacity: 0.6 }}>TIMING + EASING</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={btnStyle} onClick={() => restartRef.current?.()}>↺ Restart</button>
        <button style={btnStyle} onClick={handleCopy}>{copied ? '✓ Copied' : '⧉ Copy'}</button>
      </div>

      <div style={dividerStyle}>GLOBAL</div>
      <Slider label="Speed" min={0.1} max={4} step={0.05} configKey="speed" configRef={configRef} />

      <div style={dividerStyle}>STAGE DURATIONS</div>
      {STAGE_LABELS.map((name, i) => (
        <StageSlider key={i} label={name} index={i} configRef={configRef} />
      ))}

      <div style={dividerStyle}>GATHER / SPLIT — spring physics</div>
      <Slider label="Spring" min={0.001} max={0.06} step={0.001} configKey="migrateSpring" configRef={configRef} />
      <Slider label="Damping" min={0.7} max={0.99} step={0.005} configKey="migrateDamping" configRef={configRef} />
      <Slider label="Noise" min={0} max={0.5} step={0.005} configKey="migrateNoise" configRef={configRef} />

      <div style={dividerStyle}>SETTLE — hover physics</div>
      <Slider label="Orbit radius" min={0} max={0.4} step={0.005} configKey="settleOrbit" configRef={configRef} />
      <Slider label="Damping" min={0.7} max={0.99} step={0.005} configKey="settleDamping" configRef={configRef} />

      <div style={dividerStyle}>GRID — snap physics</div>
      <Slider label="Spacing" min={16} max={80} step={1} configKey="gridSpacing" configRef={configRef} format={v => `${v}px`} />
      <Slider label="Spring" min={0.01} max={0.2} step={0.005} configKey="gridSpring" configRef={configRef} />
      <Slider label="Damping" min={0.5} max={0.99} step={0.005} configKey="gridDamping" configRef={configRef} />

      <div style={dividerStyle}>CURSOR</div>
      <Slider label="Speed" min={0.5} max={8} step={0.1} configKey="cursorSpeed" configRef={configRef} />
      <Slider label="Pause %" min={0} max={1} step={0.05} configKey="cursorPausePct" configRef={configRef} format={v => `${Math.round(v * 100)}%`} />
    </div>
  );
}
