export class Cursor {
  constructor() {
    this.x = -100;
    this.y = -100;
    this.visible = false;
    this.path = []; // [{x, y}] waypoints
    this.pathIdx = 0;
    this.pathT = 0; // 0-1 progress between waypoints
    this.speed = 2.5; // px/frame between waypoints

    this.clickScale = 1;
    this.clickTimer = 0;
    this.rippleRadius = 0;
    this.rippleOpacity = 0;
  }

  setPath(waypoints) {
    this.path = waypoints;
    this.pathIdx = 0;
    this.pathT = 0;
    if (waypoints.length > 0) {
      this.x = waypoints[0].x;
      this.y = waypoints[0].y;
    }
    this.visible = true;
  }

  click() {
    this.clickScale = 1.3;
    this.clickTimer = 120;
    this.rippleRadius = 0;
    this.rippleOpacity = 0.8;
  }

  update(dt) {
    // click scale animation
    if (this.clickTimer > 0) {
      this.clickTimer -= dt;
      const t = 1 - Math.max(0, this.clickTimer) / 120;
      this.clickScale = t < 0.5
        ? 1 + 0.3 * (t / 0.5)
        : 1.3 - 0.3 * ((t - 0.5) / 0.5);
    } else {
      this.clickScale = 1;
    }

    // ripple
    if (this.rippleOpacity > 0) {
      this.rippleRadius += 1.2;
      this.rippleOpacity -= 0.025;
      if (this.rippleOpacity < 0) this.rippleOpacity = 0;
    }

    // path following
    if (!this.visible || this.path.length < 2) return;
    if (this.pathIdx >= this.path.length - 1) return;

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
    const s = config.cursorSize * this.clickScale;

    ctx.save();
    ctx.translate(this.x, this.y);

    // ripple
    if (this.rippleOpacity > 0) {
      ctx.beginPath();
      ctx.arc(0, 0, this.rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${this.rippleOpacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // arrow cursor (canvas path — classic northwest pointer)
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

  // entry: left edge (horizontal) or top edge (vertical)
  const entryX = isH ? s.x1 - 60 : s.x1 + (s.x2 - s.x1) / 2;
  const entryY = isH ? s.y1 + (s.y2 - s.y1) * 0.4 : s.y1 - 60;
  const exitX  = isH ? e.x2 + 60 : s.x1 + (s.x2 - s.x1) / 2;
  const exitY  = isH ? (s.y1 + s.y2) / 2 : e.y2 + 60;

  const shuffled = [...particles].sort(() => Math.random() - 0.5);
  const targets = shuffled.slice(0, Math.ceil(particles.length * 0.8));
  targets.sort((a, b) => isH ? a.x - b.x : a.y - b.y);

  return [
    { x: entryX, y: entryY },
    ...targets.map(p => ({
      x: p.x + (Math.random() - 0.5) * 6,
      y: p.y + (Math.random() - 0.5) * 6,
    })),
    { x: exitX, y: exitY },
  ];
}
