'use client';
import { useState, useCallback } from 'react';

function Slider({ label, min, max, step = 0.01, configKey, configRef }) {
  const [val, setVal] = useState(configRef.current[configKey]);
  const onChange = useCallback(e => {
    const v = parseFloat(e.target.value);
    setVal(v);
    configRef.current[configKey] = v;
  }, [configKey, configRef]);
  return (
    <label style={labelStyle}>
      <span>{label}: <b>{typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(2) : val}</b></span>
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
      <span>{label}: <b>{val}ms</b></span>
      <input type="range" min={200} max={10000} step={100} value={val} onChange={onChange} style={inputStyle} />
    </label>
  );
}

function ColorPicker({ label, configKey, configRef }) {
  const [val, setVal] = useState(configRef.current[configKey]);
  const onChange = useCallback(e => {
    setVal(e.target.value);
    configRef.current[configKey] = e.target.value;
  }, [configKey, configRef]);
  return (
    <label style={labelStyle}>
      <span>{label}</span>
      <input type="color" value={val} onChange={onChange} style={{ marginLeft: 6, cursor: 'pointer' }} />
    </label>
  );
}

const panelStyle = {
  position: 'fixed',
  top: 80,
  right: 12,
  zIndex: 1000,
  background: 'rgba(0,0,0,0.88)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  padding: '12px 14px',
  width: 240,
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: 11,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const inputStyle = { width: '100%', cursor: 'pointer' };

const dividerStyle = {
  borderTop: '1px solid rgba(255,255,255,0.15)',
  marginTop: 2,
  marginBottom: 2,
  opacity: 0.6,
  fontSize: 10,
  letterSpacing: '0.08em',
  paddingTop: 4,
};

const STAGE_NAMES = ['Idle', 'Click', 'Gather', 'Settle', 'Split', 'Grid', 'Frame', 'Dissolve'];

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
    const { stageDurations, ...rest } = configRef.current;
    const out = { ...rest, stageDurations: [...stageDurations] };
    navigator.clipboard.writeText(JSON.stringify(out, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={panelStyle}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, letterSpacing: '0.1em', opacity: 0.6 }}>
        TUNING
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={btnStyle} onClick={() => restartRef.current?.()}>↺ Restart</button>
        <button style={btnStyle} onClick={handleCopy}>{copied ? '✓ Copied' : '⧉ Copy'}</button>
      </div>
      <Slider label="% clicked" min={0.1} max={1} step={0.05} configKey="clickedPct" configRef={configRef} />
      <Slider label="Speed" min={0.1} max={5} step={0.05} configKey="speed" configRef={configRef} />
      <Slider label="Trail opacity" min={0.01} max={0.15} configKey="trailOpacity" configRef={configRef} />
      <Slider label="Trail radius" min={20} max={120} step={1} configKey="trailBlobRadius" configRef={configRef} />
      <Slider label="Cursor size" min={8} max={48} step={1} configKey="cursorSize" configRef={configRef} />
      <Slider label="Cursor stagger %" min={0} max={1} step={0.05} configKey="cursorPausePct" configRef={configRef} />

      <div style={dividerStyle}>STAGE DURATIONS</div>
      {STAGE_NAMES.map((name, i) => (
        <StageSlider key={i} label={`S${i} ${name}`} index={i} configRef={configRef} />
      ))}

      <div style={dividerStyle}>COLORS</div>
      <ColorPicker label="Purple" configKey="purple" configRef={configRef} />
      <ColorPicker label="Circle fill" configKey="circleFill" configRef={configRef} />
      <ColorPicker label="Circle stroke" configKey="circleStroke" configRef={configRef} />
    </div>
  );
}
