export const defaultConfig = {
  totalCircles: 100,
  clickedPct: 0.30,
  speed: 1,
  trailOpacity: 0.06,
  trailBlobRadius: 60,
  circleSizeMin: 5,
  circleSizeMax: 10,
  cursorSize: 20,
  cursorPausePct: 0.9,
  pad: 100,
  yellow: '#ffcc00',
  purple: '#9B7FD4',
  bgColor: '#fde17c',
  circleFill: '#E8E8E8',
  circleStroke: '#888888',
  // ms per stage at speed=1: idle, click, gather, settle, split, grid, frame, dissolve
  stageDurations: [2000, 4500, 2500, 4000, 2500, 2000, 2500, 1500],
};

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function lerpColor(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}
