'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { spawnParticles, createNoisePattern } from './particles';
import { Trail } from './trail';
import { Cursor, buildCursorPath } from './cursor';
import { generateOrganicPoints, drawOrganicBoundary, drawRigidBoundary } from './boundaries';
import { defaultConfig } from './config';

// ---- zone helpers ----

function computeZones(w, h, axis, config) {
  const pad = config.pad ?? 56;
  if (axis === 'horizontal') {
    return {
      start: { x1: pad, y1: pad, x2: w / 3, y2: h - pad },
      center: { x1: w / 3, y1: pad, x2: (2 * w) / 3, y2: h - pad },
      end: { x1: (2 * w) / 3, y1: pad, x2: w - pad, y2: h - pad },
    };
  }
  return {
    start: { x1: pad, y1: pad, x2: w - pad, y2: h / 3 },
    center: { x1: pad, y1: h / 3, x2: w - pad, y2: (2 * h) / 3 },
    end: { x1: pad, y1: (2 * h) / 3, x2: w - pad, y2: h - pad },
  };
}

// ---- state factory ----

function createInitialState(w, h, config) {
  const axis = w >= 768 ? 'horizontal' : 'vertical';
  const zones = computeZones(w, h, axis, config);
  const count = axis === 'horizontal' ? config.totalCircles : Math.floor(config.totalCircles * 0.5);
  const particles = spawnParticles(count, zones, axis, config);

  return {
    stage: 0,
    stageElapsed: 0, // animation-ms (real ms × speed)
    particles,
    yellowTrail: new Trail(),
    purpleTrail: new Trail(),
    cursor: new Cursor(),
    organicBoundaryPoints: null,
    organicBoundaryProgress: 0,
    rigidBoundaryRect: null,
    rigidBoundaryProgress: 0,
    logoOpacity: { linksAmarelos: 0, ondasAmarelas: 0, hyperlinks: 0 },
    noisePattern: null,
    axis,
    zones,
    width: w,
    height: h,
    targetClickCount: Math.floor(count * config.clickedPct),
    clickedCount: 0,
  };
}

// ---- stage transitions ----

function enterStage(state, newStage, config) {
  if (newStage === 0) {
    const saved = state.noisePattern;
    const next = createInitialState(state.width, state.height, config);
    Object.assign(state, next);
    state.noisePattern = saved;
    return;
  }

  state.stage = newStage;
  state.stageElapsed = 0;

  const { particles, zones, axis, cursor } = state;
  const centerZone = zones.center;
  const endZone = zones.end;

  if (newStage === 1) {
    state.targetClickCount = Math.floor(particles.length * config.clickedPct);
    state.clickedCount = 0;
    // Pre-mark exactly targetClickCount particles — cursor clicks only these
    const shuffled = [...particles].sort(() => Math.random() - 0.5);
    shuffled.forEach((p, i) => { p.willBeClicked = i < state.targetClickCount; });
    const waypoints = buildCursorPath(particles, zones, axis);
    cursor.setPath(waypoints);
  }

  if (newStage === 2) {
    cursor.exit();
    particles.filter(p => p.colorState === 'yellow').forEach(p => {
      p.targetX = centerZone.x1 + Math.random() * (centerZone.x2 - centerZone.x1) * 0.65;
      p.targetY = centerZone.y1 + Math.random() * (centerZone.y2 - centerZone.y1);
    });
  }

  if (newStage === 3) {
    const yellow = particles.filter(p => p.colorState === 'yellow');
    const cx = yellow.reduce((s, p) => s + p.x, 0) / (yellow.length || 1);
    const cy = yellow.reduce((s, p) => s + p.y, 0) / (yellow.length || 1);
    const sorted = [...yellow].sort((a, b) =>
      Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy)
    );
    const innerCount = Math.floor(sorted.length * 0.6);
    const edgeP = sorted[Math.min(innerCount, sorted.length - 1)];
    const boundaryR = Math.hypot(edgeP.x - cx, edgeP.y - cy) + 30;
    sorted.forEach((p, i) => { p.zone = i < innerCount ? 'inner' : 'outer'; });
    state.organicBoundaryPoints = generateOrganicPoints(cx, cy, boundaryR);
    state.organicBoundaryProgress = 0;
    yellow.forEach(p => {
      p.targetX = p.x + (Math.random() - 0.5) * 8;
      p.targetY = p.y + (Math.random() - 0.5) * 8;
    });
  }

  if (newStage === 4) {
    particles.filter(p => p.colorState === 'yellow' && p.zone === 'outer').forEach(p => {
      p.colorState = 'purple';
      p.colorProgress = 0;
      p.targetX = endZone.x1 + Math.random() * (endZone.x2 - endZone.x1);
      p.targetY = endZone.y1 + Math.random() * (endZone.y2 - endZone.y1);
    });
  }

  if (newStage === 5) {
    const purple = particles.filter(p => p.colorState === 'purple');
    const cols = Math.max(2, Math.ceil(Math.sqrt(purple.length * 0.8)));
    const rows = Math.ceil(purple.length / cols);
    const zW = endZone.x2 - endZone.x1;
    const zH = endZone.y2 - endZone.y1;
    purple.forEach((p, i) => {
      p.gridX = endZone.x1 + (zW / (cols + 1)) * ((i % cols) + 1);
      p.gridY = endZone.y1 + (zH / (rows + 1)) * (Math.floor(i / cols) + 1);
    });
  }

  if (newStage === 6) {
    const purple = particles.filter(p => p.colorState === 'purple');
    if (purple.length > 0) {
      const xs = purple.map(p => p.gridX);
      const ys = purple.map(p => p.gridY);
      const pad = 20;
      state.rigidBoundaryRect = {
        x: Math.min(...xs) - pad,
        y: Math.min(...ys) - pad,
        w: Math.max(...xs) - Math.min(...xs) + pad * 2,
        h: Math.max(...ys) - Math.min(...ys) + pad * 2,
      };
      state.rigidBoundaryProgress = 0;
    }
  }
}

// ---- per-frame particle updates ----

function tickParticles(state, config, dt) {
  const { stage, stageElapsed, particles, cursor, yellowTrail, purpleTrail } = state;

  for (const p of particles) {
    p.updateClickAnim(dt);

    if (stage <= 1) {
      p.updateStage0(dt);
    } else if (stage === 2) {
      if (p.colorState === 'yellow') {
        p.updateMigrate(p.targetX, p.targetY, dt);
        if (Math.random() < 0.4) yellowTrail.addPoint(p.x, p.y);
      } else {
        p.updateStage0(dt);
      }
    } else if (stage === 3) {
      if (p.colorState === 'yellow') p.updateSettle(dt);
      else p.updateStage0(dt);
    } else if (stage === 4) {
      if (p.colorState === 'purple') {
        p.colorProgress = Math.min(1, p.colorProgress + 0.02);
        p.updateMigrate(p.targetX, p.targetY, dt);
        if (Math.random() < 0.35) purpleTrail.addPoint(p.x, p.y);
      } else if (p.colorState === 'yellow') {
        p.updateSettle(dt);
      } else {
        p.updateStage0(dt);
      }
    } else if (stage === 5) {
      if (p.colorState === 'purple') { p.colorProgress = 1; p.updateGrid(dt); }
      else if (p.colorState === 'yellow') p.updateSettle(dt);
      else p.updateStage0(dt);
    } else if (stage === 6) {
      if (p.colorState === 'purple') p.updateGrid(dt);
      else if (p.colorState === 'yellow') p.updateSettle(dt);
      else p.updateStage0(dt);
    } else if (stage === 7) {
      const t = 1 - Math.min(1, stageElapsed / (config.stageDurations ?? defaultConfig.stageDurations)[7]);
      p.globalAlpha = t;
    }
  }

  // Click detection during stage 1 — only pre-marked particles, no proximity gate
  if (stage === 1) {
    cursor.update(dt, config);
    const clickR = config.cursorSize * 3;
    if (state.clickedCount < state.targetClickCount) {
      for (const p of particles) {
        if (p.willBeClicked && !p.clicked && cursor.isNear(p.x, p.y, clickR)) {
          p.triggerClick();
          state.clickedCount++;
          break;
        }
      }
    }
  }

  yellowTrail.update();
  purpleTrail.update();

  // Boundary + logo progress (uses animation-ms)
  const sd = config.stageDurations ?? defaultConfig.stageDurations;
  const d3 = sd[3];
  const d6 = sd[6];

  if (stage === 3) {
    state.organicBoundaryProgress = Math.min(1, stageElapsed / (d3 * 0.45));
    const logoT = Math.max(0, stageElapsed / d3 - 0.55) / 0.45;
    state.logoOpacity.linksAmarelos = Math.min(1, logoT);
    state.logoOpacity.ondasAmarelas = Math.min(1, logoT);
  }
  if (stage >= 4 && stage <= 6) {
    state.organicBoundaryProgress = 1;
    state.logoOpacity.linksAmarelos = 1;
    state.logoOpacity.ondasAmarelas = 1;
  }
  if (stage === 6) {
    state.rigidBoundaryProgress = Math.min(1, stageElapsed / (d6 * 0.4));
    const ht = Math.max(0, stageElapsed / d6 - 0.5) / 0.5;
    state.logoOpacity.hyperlinks = Math.min(1, ht);
  }
  if (stage === 7) {
    const t = 1 - Math.min(1, stageElapsed / sd[7]);
    state.logoOpacity.linksAmarelos = t;
    state.logoOpacity.ondasAmarelas = t;
    state.logoOpacity.hyperlinks = t;
    state.organicBoundaryProgress = t;
    state.rigidBoundaryProgress = t;
    yellowTrail.maxAge = Math.max(5, Math.floor(60 * t));
    purpleTrail.maxAge = Math.max(5, Math.floor(60 * t));
  }
}

// ---- logo drawing ----

function drawLogo(ctx, img, cx, bottomY, maxW, maxH, opacity) {
  if (!img || opacity <= 0) return;
  const aspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height || 1);
  let w = maxW;
  let h = w / aspect;
  if (h > maxH) { h = maxH; w = h * aspect; }
  ctx.save();
  ctx.globalAlpha = Math.min(1, opacity);
  ctx.drawImage(img, cx - w / 2, bottomY - h, w, h);
  ctx.restore();
}

// ---- render ----

function renderFrame(bgCtx, fgCtx, state, config, logos) {
  const { width, height, particles, yellowTrail, purpleTrail, cursor, stage,
          organicBoundaryPoints, organicBoundaryProgress,
          rigidBoundaryRect, rigidBoundaryProgress,
          logoOpacity, zones, noisePattern } = state;

  bgCtx.fillStyle = config.bgColor;
  bgCtx.fillRect(0, 0, width, height);

  yellowTrail.draw(bgCtx, config.yellow, config);
  purpleTrail.draw(bgCtx, config.purple, config);

  if (stage >= 3 && organicBoundaryPoints) {
    drawOrganicBoundary(bgCtx, organicBoundaryPoints, organicBoundaryProgress, config.yellow);
  }
  if (stage >= 6 && rigidBoundaryRect) {
    drawRigidBoundary(bgCtx, rigidBoundaryRect, rigidBoundaryProgress, config.purple);
  }

  const cz = zones.center;
  const ez = zones.end;
  const logoH = 28;

  const pad = config.pad ?? 56;
  if (logos.linksAmarelos) {
    const logoMaxW = (cz.x2 - cz.x1) * 0.45;
    drawLogo(bgCtx, logos.linksAmarelos,
      cz.x1 + (cz.x2 - cz.x1) * 0.28, height - pad, logoMaxW, logoH, logoOpacity.linksAmarelos);
  }
  if (logos.ondasAmarelas) {
    const logoMaxW = (cz.x2 - cz.x1) * 0.45;
    drawLogo(bgCtx, logos.ondasAmarelas,
      cz.x1 + (cz.x2 - cz.x1) * 0.72, height - pad, logoMaxW, logoH, logoOpacity.ondasAmarelas);
  }
  if (logos.hyperlinks) {
    const logoMaxW = (ez.x2 - ez.x1) * 0.65;
    drawLogo(bgCtx, logos.hyperlinks,
      (ez.x1 + ez.x2) / 2, height - pad, logoMaxW, logoH, logoOpacity.hyperlinks);
  }

  fgCtx.clearRect(0, 0, width, height);
  for (const p of particles) {
    p.draw(fgCtx, config, noisePattern);
  }
  if (stage === 1) cursor.draw(fgCtx, config);
}

// ---- hook ----

export function useAnimationLoop(containerRef, bgCanvasRef, fgCanvasRef, configRef, onStageChange) {
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const logosRef = useRef({});
  const lastTimeRef = useRef(0);
  const [currentStage, setCurrentStage] = useState(0);
  const restartFnRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    async function preloadLogos() {
      const files = {
        linksAmarelos: '/brand/links-logotype-long.svg',
        ondasAmarelas: '/brand/ondas-logotype-long.svg',
        hyperlinks: '/brand/hyperlinks-logotype-logo.svg',
      };
      await Promise.all(
        Object.entries(files).map(([key, src]) =>
          new Promise(resolve => {
            const img = new Image();
            img.onload = () => { logosRef.current[key] = img; resolve(); };
            img.onerror = resolve;
            img.src = src;
          })
        )
      );
    }

    function setupCanvas(canvas, w, h) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initAll(w, h) {
      const config = configRef.current;
      setupCanvas(bgCanvasRef.current, w, h);
      setupCanvas(fgCanvasRef.current, w, h);
      const state = createInitialState(w, h, config);
      const bgCtx = bgCanvasRef.current.getContext('2d');
      state.noisePattern = createNoisePattern(bgCtx);
      stateRef.current = state;
    }

    let running = false;

    function startLoop() {
      if (running) return;
      running = true;
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }

    function stopLoop() {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    function tick(timestamp) {
      if (!running) return;
      const dt = Math.min(50, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      const state = stateRef.current;
      const config = configRef.current;
      if (!state) { rafRef.current = requestAnimationFrame(tick); return; }

      // Advance animation time (speed-scaled)
      state.stageElapsed += dt * config.speed;

      if (state.stageElapsed >= (config.stageDurations ?? defaultConfig.stageDurations)[state.stage]) {
        const next = (state.stage + 1) % 8;
        enterStage(state, next, config);
        setCurrentStage(next);
        onStageChange?.(next);
      }

      tickParticles(state, config, dt);

      const bgCtx = bgCanvasRef.current?.getContext('2d');
      const fgCtx = fgCanvasRef.current?.getContext('2d');
      if (bgCtx && fgCtx) renderFrame(bgCtx, fgCtx, state, config, logosRef.current);

      rafRef.current = requestAnimationFrame(tick);
    }

    const container = containerRef.current;
    let ro, io;

    if (container) {
      ro = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect;
        if (width > 0 && height > 0) initAll(width, height);
      });
      ro.observe(container);

      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) initAll(rect.width, rect.height);
    }

    if (reducedMotion) {
      // static Stage 3 snapshot
      setTimeout(() => {
        const state = stateRef.current;
        const config = configRef.current;
        if (!state) return;
        // quick-advance: mark 60% yellow/inner, place in center zone
        const yellow = state.particles.slice(0, Math.floor(state.particles.length * 0.6));
        yellow.forEach((p, i) => {
          p.colorState = 'yellow';
          p.clicked = true;
          p.zone = 'inner';
          p.x = state.zones.center.x1 + Math.random() * (state.zones.center.x2 - state.zones.center.x1) * 0.7;
          p.y = state.zones.center.y1 + Math.random() * (state.zones.center.y2 - state.zones.center.y1);
        });
        enterStage(state, 3, config);
        state.organicBoundaryProgress = 1;
        state.logoOpacity = { linksAmarelos: 1, ondasAmarelas: 1, hyperlinks: 0 };
        state.stage = 3;
        const bgCtx = bgCanvasRef.current?.getContext('2d');
        const fgCtx = fgCanvasRef.current?.getContext('2d');
        if (bgCtx && fgCtx) renderFrame(bgCtx, fgCtx, state, config, logosRef.current);
      }, 300);
    } else {
      io = new IntersectionObserver(entries => {
        entries[0].isIntersecting ? startLoop() : stopLoop();
      }, { threshold: 0.1 });
      if (container) io.observe(container);
    }

    restartFnRef.current = () => {
      const state = stateRef.current;
      if (!state) return;
      enterStage(state, 0, configRef.current);
      setCurrentStage(0);
      onStageChange?.(0);
    };

    preloadLogos();

    return () => {
      stopLoop();
      ro?.disconnect();
      io?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const restart = useCallback(() => restartFnRef.current?.(), []);

  return { currentStage, restart };
}
