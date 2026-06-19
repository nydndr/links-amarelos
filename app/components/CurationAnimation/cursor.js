// easeOutBack — overshoots then settles, Emil Kowalski signature
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export class Cursor {
  constructor() {
    this.x = -100;
    this.y = -100;
    this.visible = false;
    this.path = [];
    this.pathIdx = 0;
    this.pathT = 0;
    this.speed = 2.5;
    this.pauseTimer = 0;
    this.entranceTimer = 0;
    this.entranceDuration = 900;
  }

  setPath(waypoints) {
    this.path = waypoints;
    this.pathIdx = 0;
    this.pathT = 0;
    this.entranceTimer = 0;
    this.pauseTimer = this.entranceDuration + 120;
    if (waypoints.length > 0) {
      this.x = waypoints[0].x;
      this.y = waypoints[0].y;
    }
    this.visible = true;
  }

  get isPausing() { return this.pauseTimer > 0; }

  click() {}

  update(dt, config = {}) {
    if (!this.visible) return;

    if (this.entranceTimer < this.entranceDuration) {
      this.entranceTimer = Math.min(this.entranceDuration, this.entranceTimer + dt);
    }

    if (this.path.length < 2 || this.pathIdx >= this.path.length - 1) return;

    // Thinking pause — cursor idles before moving to next target
    if (this.pauseTimer > 0) {
      this.pauseTimer -= dt;
      return;
    }

    const from = this.path[this.pathIdx];
    const to = this.path[this.pathIdx + 1];
    const segLen = Math.hypot(to.x - from.x, to.y - from.y);
    if (segLen < 0.1) {
      this.pathIdx++;
      return;
    }

    this.pathT += this.speed / segLen;
    if (this.pathT >= 1) {
      this.pathT = 0;
      this.pathIdx++;
      if (Math.random() < (config.cursorPausePct ?? 0.35)) {
        this.pauseTimer = 150 + Math.random() * 750;
      }
    }

    const idx = Math.min(this.pathIdx, this.path.length - 2);
    const f = this.path[idx];
    const t2 = this.path[idx + 1];
    this.x = f.x + (t2.x - f.x) * this.pathT;
    this.y = f.y + (t2.y - f.y) * this.pathT;
  }

  isNear(px, py, radius) {
    return Math.hypot(this.x - px, this.y - py) < radius;
  }

  get isDone() {
    return this.pathIdx >= this.path.length - 1;
  }

  exit() {
    this.visible = false;
    this.path = [];
  }

  draw(ctx, config) {
    if (!this.visible) return;

    const t = this.entranceDuration > 0 ? this.entranceTimer / this.entranceDuration : 1;
    const opacity = Math.min(1, t * 1.4); // fade in faster than scale
    const scale = easeOutBack(Math.min(1, t));
    const s = config.cursorSize * Math.max(0.01, scale);

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, s * 0.82);
    ctx.lineTo(s * 0.22, s * 0.62);
    ctx.lineTo(s * 0.36, s * 0.96);
    ctx.lineTo(s * 0.48, s * 0.91);
    ctx.lineTo(s * 0.34, s * 0.57);
    ctx.lineTo(s * 0.56, s * 0.57);
    ctx.closePath();

    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }
}

export function buildCursorPath(particles, zones, axis) {
  const s = zones.start;
  const e = zones.end;
  const isH = axis === 'horizontal';

  // Canvas center — cursor appears here, then travels to the particle zone
  const canvasCX = (s.x1 + e.x2) / 2;
  const canvasCY = (s.y1 + e.y2) / 2;

  const pool = [...particles].sort(() => Math.random() - 0.5)
                             .slice(0, Math.ceil(particles.length * 0.8));

  // Centroid of particle cloud — used as sweep anchor
  const pcx = pool.reduce((acc, p) => acc + p.x, 0) / pool.length;
  const pcy = pool.reduce((acc, p) => acc + p.y, 0) / pool.length;

  const ordered = pool
    .map(p => {
      const dx = p.x - pcx;
      const dy = p.y - pcy;
      const r = Math.hypot(dx, dy);
      const key = Math.atan2(dy, dx) + r * 0.005 + (Math.random() - 0.5) * 2.4;
      return { p, key };
    })
    .sort((a, b) => a.key - b.key)
    .map(({ p }) => p);

  const exitX = isH ? e.x2 + 60 : canvasCX;
  const exitY = isH ? canvasCY : e.y2 + 60;

  return [
    { x: canvasCX, y: canvasCY },
    ...ordered.map(p => ({
      x: p.x + (Math.random() - 0.5) * 14,
      y: p.y + (Math.random() - 0.5) * 14,
    })),
    { x: exitX, y: exitY },
  ];
}
