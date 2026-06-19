'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { spawnParticles, createNoisePattern } from './particles';
import { Trail } from './trail';
import { Cursor, buildCursorPath } from './cursor';
import { generateOrganicPoints, drawOrganicBoundary } from './boundaries';
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
    // Guarantee exactly targetClickCount yellow — click any the cursor missed
    particles.filter(p => p.willBeClicked && !p.clicked).forEach(p => p.triggerClick());
    const { width, height } = state;
    const cx = width / 2;
    const cy = height / 2;
    // Max radius: small enough to stay clear of stage-1 start zone (left third + pad)
    const safeLeft = width / 3 + (config.pad ?? 56) * 0.5;
    const maxR = Math.min(cx - safeLeft, Math.min(width, height) * 0.18);
    particles.filter(p => p.colorState === 'yellow').forEach(p => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * maxR; // sqrt = uniform disk distribution
      p.targetX = cx + Math.cos(angle) * r;
      p.targetY = cy + Math.sin(angle) * r;
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
    sorted.forEach((p, i) => { p.zone = i < innerCount ? 'inner' : 'outer'; });
    yellow.forEach(p => {
      p.targetX = p.x + (Math.random() - 0.5) * 8;
      p.targetY = p.y + (Math.random() - 0.5) * 8;
    });
  }

  if (newStage === 4) {
    const outer = particles.filter(p => p.colorState === 'yellow' && p.zone === 'outer');
    const chosen = outer.sort(() => Math.random() - 0.5).slice(0, 8);
    const COLS = 2;
    const ROWS = 4;
    const spacing = config.gridSpacing ?? 38;
    const cx = (endZone.x1 + endZone.x2) / 2;
    const cy = (endZone.y1 + endZone.y2) / 2;
    const gridW = (COLS - 1) * spacing;
    const gridH = (ROWS - 1) * spacing;
    chosen.forEach((p, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      p.colorState = 'purple';
      p.colorProgress = 0;
      p.gridX = cx - gridW / 2 + col * spacing;
      p.gridY = cy - gridH / 2 + row * spacing;
      p.gridRow = col;
      p.targetX = p.gridX;
      p.targetY = p.gridY;
    });
  }

  if (newStage === 5) {
    // grid positions set in stage 4; trail continues from hover
  }

  if (newStage === 6) {
    // no rectangle — purple trail serves as visual grouping
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
        p.updateMigrate(p.targetX, p.targetY, dt, config);
        if (Math.random() < 0.18) yellowTrail.addPoint(p.x, p.y);
      } else {
        p.updateStage0(dt);
      }
    } else if (stage === 3) {
      if (p.colorState === 'yellow') {
        p.updateSettle(dt, config);
        if (Math.random() < config.settleTrailPct) yellowTrail.addPoint(p.x, p.y);
      } else p.updateStage0(dt);
    } else if (stage === 4) {
      if (p.colorState === 'purple') {
        p.colorProgress = Math.min(1, p.colorProgress + 0.02);
        p.updateMigrate(p.targetX, p.targetY, dt, config);
        if (Math.random() < 0.35) purpleTrail.addPoint(p.x, p.y);
      } else if (p.colorState === 'yellow') {
        p.updateSettle(dt, config);
        if (Math.random() < config.settleTrailPct) yellowTrail.addPoint(p.x, p.y);
      } else {
        p.updateStage0(dt);
      }
    } else if (stage === 5) {
      if (p.colorState === 'purple') {
        p.colorProgress = 1;
        p.updateGrid(dt, config);
        if (Math.random() < config.settleTrailPct) purpleTrail.addPoint(p.x, p.y);
      } else if (p.colorState === 'yellow') {
        p.updateSettle(dt, config);
        if (Math.random() < config.settleTrailPct) yellowTrail.addPoint(p.x, p.y);
      } else p.updateStage0(dt);
    } else if (stage === 6) {
      if (p.colorState === 'purple') {
        p.updateGrid(dt, config);
        if (Math.random() < config.settleTrailPct) purpleTrail.addPoint(p.x, p.y);
      } else if (p.colorState === 'yellow') {
        p.updateSettle(dt, config);
        if (Math.random() < config.settleTrailPct) yellowTrail.addPoint(p.x, p.y);
      } else p.updateStage0(dt);
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

// ---- render ----

function renderFrame(bgCtx, fgCtx, state, config) {
  const { width, height, particles, yellowTrail, purpleTrail, cursor, stage, noisePattern } = state;

  bgCtx.fillStyle = config.bgColor;
  bgCtx.fillRect(0, 0, width, height);

  yellowTrail.draw(bgCtx, config.gatherTrailColor, config);
  purpleTrail.draw(bgCtx, config.hyperlinkTrailColor, config);

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
  const lastTimeRef = useRef(0);
  const [currentStage, setCurrentStage] = useState(0);
  const restartFnRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      if (state.stage < 6 && state.stageElapsed >= (config.stageDurations ?? defaultConfig.stageDurations)[state.stage]) {
        const next = state.stage + 1;
        enterStage(state, next, config);
        setCurrentStage(next);
        onStageChange?.(next);
      }

      tickParticles(state, config, dt);

      const bgCtx = bgCanvasRef.current?.getContext('2d');
      const fgCtx = fgCanvasRef.current?.getContext('2d');
      if (bgCtx && fgCtx) renderFrame(bgCtx, fgCtx, state, config);

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
        if (bgCtx && fgCtx) renderFrame(bgCtx, fgCtx, state, config);
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

    return () => {
      stopLoop();
      ro?.disconnect();
      io?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const restart = useCallback(() => restartFnRef.current?.(), []);

  return { currentStage, restart };
}
