export function createNoisePattern(ctx) {
  const size = 64;
  const offscreen = document.createElement('canvas');
  offscreen.width = size;
  offscreen.height = size;
  const octx = offscreen.getContext('2d');
  const img = octx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 100;
  }
  octx.putImageData(img, 0, 0);
  return ctx.createPattern(offscreen, 'repeat');
}

export class Particle {
  constructor({ x, y, radius, type }) {
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.homeY = y;
    this.radius = radius;
    this.type = type; // 'solid' | 'outline' | 'textured'

    // velocity
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;

    // orbit in stage 0
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.random() * 20 + 8;
    this.orbitSpeed = (Math.random() - 0.5) * 0.015;

    // state
    this.colorState = 'bw'; // 'bw' | 'yellow' | 'purple'
    this.colorProgress = 0; // 0=yellow 1=purple (used during stage 4)
    this.clicked = false;
    this.zone = 'outer'; // 'inner' | 'outer' (set in stage 3)

    // migration targets
    this.targetX = x;
    this.targetY = y;
    this.gridX = x;
    this.gridY = y;

    // click animation
    this.clickScale = 1;
    this.clickTimer = 0;

    // fade for loop dissolve
    this.globalAlpha = 1;
  }

  triggerClick() {
    this.clicked = true;
    this.colorState = 'yellow';
    this.clickScale = 1.3;
    this.clickTimer = 120; // ms
  }

  updateClickAnim(dt) {
    if (this.clickTimer > 0) {
      this.clickTimer -= dt;
      const t = 1 - this.clickTimer / 120;
      this.clickScale = t < 0.5 ? 1 + 0.6 * (t / 0.5) : 1 + 0.6 * (1 - (t - 0.5) / 0.5);
    } else {
      this.clickScale = 1;
    }
  }

  updateStage0(dt) {
    this.orbitAngle += this.orbitSpeed;
    const tx = this.homeX + Math.cos(this.orbitAngle) * this.orbitRadius;
    const ty = this.homeY + Math.sin(this.orbitAngle) * this.orbitRadius;
    this.vx += (tx - this.x) * 0.003;
    this.vy += (ty - this.y) * 0.003;
    this.vx += (Math.random() - 0.5) * 0.05;
    this.vy += (Math.random() - 0.5) * 0.05;
    this.vx *= 0.94;
    this.vy *= 0.94;
    this.x += this.vx;
    this.y += this.vy;
  }

  updateMigrate(targetX, targetY, dt) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.vx += dx * 0.04;
    this.vy += dy * 0.04;
    this.vx += (Math.random() - 0.5) * 0.4;
    this.vy += (Math.random() - 0.5) * 0.4;
    this.vx *= 0.85;
    this.vy *= 0.85;
    this.x += this.vx;
    this.y += this.vy;
  }

  updateSettle(dt) {
    this.vx += (this.targetX - this.x) * 0.015;
    this.vy += (this.targetY - this.y) * 0.015;
    this.vx += (Math.random() - 0.5) * 0.2;
    this.vy += (Math.random() - 0.5) * 0.2;
    this.vx *= 0.9;
    this.vy *= 0.9;
    this.x += this.vx;
    this.y += this.vy;
  }

  updateGrid(dt) {
    this.vx += (this.gridX - this.x) * 0.1;
    this.vy += (this.gridY - this.y) * 0.1;
    this.vx *= 0.75;
    this.vy *= 0.75;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx, config, noisePattern) {
    const r = this.radius * this.clickScale;

    ctx.save();
    ctx.globalAlpha = this.globalAlpha;

    let fillColor, strokeColor;
    if (this.colorState === 'bw') {
      fillColor = config.circleFill;
      strokeColor = config.circleStroke;
    } else if (this.colorState === 'yellow') {
      fillColor = config.yellow;
      strokeColor = config.yellow;
    } else {
      // purple, possibly mid-transition
      const yR = parseInt(config.yellow.slice(1, 3), 16);
      const yG = parseInt(config.yellow.slice(3, 5), 16);
      const yB = parseInt(config.yellow.slice(5, 7), 16);
      const pR = parseInt(config.purple.slice(1, 3), 16);
      const pG = parseInt(config.purple.slice(3, 5), 16);
      const pB = parseInt(config.purple.slice(5, 7), 16);
      const t = Math.min(1, this.colorProgress);
      const cr = Math.round(yR + (pR - yR) * t);
      const cg = Math.round(yG + (pG - yG) * t);
      const cb = Math.round(yB + (pB - yB) * t);
      fillColor = `rgb(${cr},${cg},${cb})`;
      strokeColor = fillColor;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);

    if (this.type === 'outline') {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (this.type === 'textured') {
      ctx.fillStyle = fillColor;
      ctx.globalAlpha = this.globalAlpha * 0.4;
      ctx.fill();
      if (noisePattern) {
        ctx.fillStyle = noisePattern;
        ctx.globalAlpha = this.globalAlpha * 0.35;
        ctx.fill();
      }
      ctx.globalAlpha = this.globalAlpha;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    ctx.restore();
  }
}

export function spawnParticles(count, zones, axis, config) {
  const types = ['solid', 'solid', 'outline', 'textured'];
  const particles = [];
  const zone = zones.start;
  const { circleSizeMin, circleSizeMax } = config;

  for (let i = 0; i < count; i++) {
    const x = zone.x1 + Math.random() * (zone.x2 - zone.x1);
    const y = zone.y1 + Math.random() * (zone.y2 - zone.y1);
    const radius = circleSizeMin + Math.random() * (circleSizeMax - circleSizeMin);
    const type = types[Math.floor(Math.random() * types.length)];
    particles.push(new Particle({ x, y, radius, type }));
  }
  return particles;
}
