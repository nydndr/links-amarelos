export function generateOrganicPoints(cx, cy, radius, count = 10) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius * (0.75 + Math.random() * 0.5);
    const wobX = (Math.random() - 0.5) * radius * 0.35;
    const wobY = (Math.random() - 0.5) * radius * 0.35;
    points.push({
      x: cx + Math.cos(angle) * r + wobX,
      y: cy + Math.sin(angle) * r + wobY,
    });
  }
  return points;
}

export function drawOrganicBoundary(ctx, points, progress, hexColor) {
  if (!points || points.length < 3 || progress <= 0) return;

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Estimated total path length for setLineDash trick
  let totalLen = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const next = points[(i + 1) % points.length];
    totalLen += Math.hypot(next.x - a.x, next.y - a.y);
  }
  // Bezier paths are longer than chord lengths; multiply by ~1.4 to over-estimate
  totalLen *= 1.4;

  ctx.save();
  ctx.setLineDash([totalLen, totalLen]);
  ctx.lineDashOffset = totalLen * (1 - Math.min(1, progress));
  ctx.strokeStyle = `rgba(${r},${g},${b},0.85)`;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  const first = points[0];
  const last = points[points.length - 1];
  const startMidX = (last.x + first.x) / 2;
  const startMidY = (last.y + first.y) / 2;
  ctx.moveTo(startMidX, startMidY);

  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.restore();
}

export function drawRigidBoundary(ctx, rect, progress, hexColor) {
  if (!rect || progress <= 0) return;
  const { x, y, w, h } = rect;

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const perimeter = 2 * (w + h);

  ctx.save();
  ctx.setLineDash([perimeter, perimeter]);
  ctx.lineDashOffset = perimeter * (1 - Math.min(1, progress));
  ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
  ctx.lineWidth = 1.5;

  const radius = 6;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.arcTo(x + w, y, x + w, y + radius, radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
    ctx.lineTo(x + radius, y + h);
    ctx.arcTo(x, y + h, x, y + h - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.restore();
}
