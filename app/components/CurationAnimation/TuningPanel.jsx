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
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const inputStyle = { width: '100%', cursor: 'pointer' };

export default function TuningPanel({ configRef }) {
  return (
    <div style={panelStyle}>
      <div style={{ fontWeight: 'bold', marginBottom: 4, letterSpacing: '0.1em', opacity: 0.6 }}>
        TUNING
      </div>
      <Slider label="Circles" min={20} max={200} step={1} configKey="totalCircles" configRef={configRef} />
      <Slider label="% clicked" min={0.1} max={1} step={0.05} configKey="clickedPct" configRef={configRef} />
      <Slider label="Speed" min={0.25} max={3} step={0.05} configKey="speed" configRef={configRef} />
      <Slider label="Trail opacity" min={0.01} max={0.15} configKey="trailOpacity" configRef={configRef} />
      <Slider label="Trail radius" min={20} max={120} step={1} configKey="trailBlobRadius" configRef={configRef} />
      <Slider label="Circle min" min={3} max={20} step={1} configKey="circleSizeMin" configRef={configRef} />
      <Slider label="Circle max" min={10} max={40} step={1} configKey="circleSizeMax" configRef={configRef} />
      <Slider label="Cursor size" min={16} max={48} step={1} configKey="cursorSize" configRef={configRef} />
      <ColorPicker label="Yellow" configKey="yellow" configRef={configRef} />
      <ColorPicker label="Purple" configKey="purple" configRef={configRef} />
      <ColorPicker label="Background" configKey="bgColor" configRef={configRef} />
      <ColorPicker label="Circle fill" configKey="circleFill" configRef={configRef} />
      <ColorPicker label="Circle stroke" configKey="circleStroke" configRef={configRef} />
    </div>
  );
}
