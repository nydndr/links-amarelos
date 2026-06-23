"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";

const LINKS = [
  { title: "Link 01", url: "https://placeholder.com/01" },
  { title: "Link 02", url: "https://placeholder.com/02" },
  { title: "Link 03", url: "https://placeholder.com/03" },
  { title: "Link 04", url: "https://placeholder.com/04" },
  { title: "Link 05", url: "https://placeholder.com/05" },
  { title: "Link 06", url: "https://placeholder.com/06" },
  { title: "Link 07", url: "https://placeholder.com/07" },
  { title: "Link 08", url: "https://placeholder.com/08" },
  { title: "Link 09", url: "https://placeholder.com/09" },
  { title: "Link 10", url: "https://placeholder.com/10" },
];

const HOLD_MS = 800;
const CIRCLE_R = 36;
const SETTLE_SPEED = 0.5;
const SETTLE_FRAMES = 80;

// ── Pixel trail tuning ───────────────────────────────────────────────────────
const TRAIL_PIXEL_SIZE = 5; // size of each pixel block (px)
const TRAIL_SPEED = 1.8; // head movement per frame (px)
const TRAIL_FADE = 0.025; // opacity lost per frame — lower = longer tail
const TRAIL_PAUSE_MS = 2800; // rest between sweeps (ms)
const TRAIL_COLOR = "255,255,255";
const TRAIL_OPACITY = 0.5; // peak opacity of the leading edge
const TRAIL_CURVE_AMP = 10; // horizontal bend at peak (px) — 0 = straight
const TRAIL_CURVE_FREQ = 0.5; // sine cycles along height (0.5=lean, 1=S-curve, 2=wave)
// ─────────────────────────────────────────────────────────────────────────────

export default function ExperimenteSection() {
  const [linksRemaining, setLinksRemaining] = useState(10);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const [settledCircles, setSettledCircles] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const btnCanvasRef = useRef(null);
  const holdRafRef = useRef(null);
  const holdStartRef = useRef(null);
  const holdProgressRef = useRef(0);
  const isHoldingRef = useRef(false);
  const linkIdxRef = useRef(0);
  const circlesRef = useRef([]);
  const settledCirclesRef = useRef([]);
  const engineRef = useRef(null);
  const trailCmdRef = useRef(null);     // 'dismiss' | null
  const isBtnHoveredRef = useRef(false);

  // Physics setup
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const { width, height } = section.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const engine = Matter.Engine.create({ gravity: { y: 1.2 } });
    engineRef.current = engine;

    const wall = { isStatic: true };
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(width / 2, -25, width, 50, wall),
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wall),
      Matter.Bodies.rectangle(-25, height / 2, 50, height, wall),
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wall),
    ]);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    Matter.Events.on(engine, "afterUpdate", () => {
      const circles = circlesRef.current;
      let changed = false;

      const updated = circles.map((c) => {
        if (c.settled) return c;
        const { x: vx, y: vy } = c.body.velocity;
        const speed = Math.sqrt(vx * vx + vy * vy);
        const frames = speed < SETTLE_SPEED ? c.settledFrames + 1 : 0;
        if (frames >= SETTLE_FRAMES) {
          Matter.Body.setStatic(c.body, true);
          changed = true;
          return {
            ...c,
            settled: true,
            settledFrames: frames,
            sx: c.body.position.x,
            sy: c.body.position.y,
          };
        }
        return { ...c, settledFrames: frames };
      });

      circlesRef.current = updated;

      if (changed) {
        const s = updated
          .filter((c) => c.settled)
          .map(({ id, title, url, sx, sy }) => ({
            id,
            title,
            url,
            x: sx,
            y: sy,
          }));
        settledCirclesRef.current = s;
        setSettledCircles([...s]);
      }

      // Render circles
      ctx.clearRect(0, 0, width, height);
      for (const c of updated) {
        const x = c.settled ? c.sx : c.body.position.x;
        const y = c.settled ? c.sy : c.body.position.y;
        ctx.beginPath();
        ctx.arc(x, y, CIRCLE_R, 0, Math.PI * 2);
        ctx.fillStyle = "#ffcc00";
        ctx.fill();
        ctx.strokeStyle = "rgba(180,140,0,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  // Pixel trail on button canvas
  useEffect(() => {
    const canvas = btnCanvasRef.current;
    if (!canvas) return;
    const btn = canvas.parentElement;
    const { width: W, height: H } = btn.getBoundingClientRect();
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    const totalRows = Math.ceil(H / TRAIL_PIXEL_SIZE);
    let head = -TRAIL_PIXEL_SIZE * 2;
    let trail = []; // [{ col, opacity }]
    let rafId;
    let timeoutId;
    let stopped = false;

    const restart = () => {
      if (isBtnHoveredRef.current) {
        timeoutId = setTimeout(restart, TRAIL_PAUSE_MS);
        return;
      }
      head = -TRAIL_PIXEL_SIZE * 2;
      trail = [];
      rafId = requestAnimationFrame(frame);
    };

    function frame() {
      if (stopped) return;

      // Dismiss: clear and hand off to restart timer
      if (trailCmdRef.current === "dismiss") {
        trailCmdRef.current = null;
        ctx.clearRect(0, 0, W, H);
        trail = [];
        timeoutId = setTimeout(restart, TRAIL_PAUSE_MS);
        return;
      }

      if (isHoldingRef.current) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      head += TRAIL_SPEED;
      const col = Math.floor(head / TRAIL_PIXEL_SIZE);
      if (!trail.length || trail[trail.length - 1].col !== col) {
        trail.push({ col, opacity: TRAIL_OPACITY });
      }

      trail = trail
        .map((b) => ({ ...b, opacity: b.opacity - TRAIL_FADE }))
        .filter((b) => b.opacity > 0);

      // Draw curved vertical bar — each row offset by sine to bow the line
      for (const b of trail) {
        ctx.fillStyle = `rgba(${TRAIL_COLOR},${b.opacity})`;
        for (let row = 0; row < totalRows; row++) {
          const t = row / totalRows;
          const curveOffset =
            Math.round(
              (Math.sin(t * Math.PI * 2 * TRAIL_CURVE_FREQ) * TRAIL_CURVE_AMP) /
                TRAIL_PIXEL_SIZE,
            ) * TRAIL_PIXEL_SIZE;
          ctx.fillRect(
            b.col * TRAIL_PIXEL_SIZE + curveOffset,
            row * TRAIL_PIXEL_SIZE,
            TRAIL_PIXEL_SIZE,
            TRAIL_PIXEL_SIZE,
          );
        }
      }

      const tailClear = head - (TRAIL_OPACITY / TRAIL_FADE) * TRAIL_PIXEL_SIZE;
      if (tailClear > W) {
        ctx.clearRect(0, 0, W, H);
        timeoutId = setTimeout(restart, TRAIL_PAUSE_MS);
        return;
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Scroll to apoie on exhaust
  useEffect(() => {
    if (!isExhausted) return;
    const t = setTimeout(() => {
      document.getElementById("apoie")?.scrollIntoView({ behavior: "smooth" });
    }, 600);
    return () => clearTimeout(t);
  }, [isExhausted]);

  const spawnCircle = useCallback(() => {
    const section = sectionRef.current;
    const engine = engineRef.current;
    if (!section || !engine) return;
    const idx = linkIdxRef.current;
    if (idx >= LINKS.length) return;
    linkIdxRef.current += 1;

    const { width } = section.getBoundingClientRect();
    const body = Matter.Bodies.circle(width / 2, 20, CIRCLE_R, {
      restitution: 0.72,
      friction: 0,
      frictionAir: 0.006,
    });
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 4,
      y: -8,
    });
    Matter.Composite.add(engine.world, body);
    circlesRef.current = [
      ...circlesRef.current,
      {
        id: idx,
        title: LINKS[idx].title,
        url: LINKS[idx].url,
        body,
        settledFrames: 0,
        settled: false,
      },
    ];
  }, []);

  const startHold = useCallback(
    (e) => {
      e.preventDefault();
      if (isExhausted || isHoldingRef.current) return;
      isHoldingRef.current = true;
      setIsHolding(true);
      setHoveredId(null);
      setHasInteracted(true);
      holdStartRef.current = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - holdStartRef.current) / HOLD_MS, 1);
        holdProgressRef.current = progress;
        setHoldProgress(progress);

        if (progress < 1) {
          holdRafRef.current = requestAnimationFrame(animate);
        } else {
          isHoldingRef.current = false;
          setIsHolding(false);
          holdProgressRef.current = 0;
          setHoldProgress(0);
          spawnCircle();
          setLinksRemaining((prev) => {
            const next = prev - 1;
            if (next <= 0) setIsExhausted(true);
            return next;
          });
        }
      };
      holdRafRef.current = requestAnimationFrame(animate);
    },
    [isExhausted, spawnCircle],
  );

  const cancelHold = useCallback(() => {
    if (!isHoldingRef.current) return;
    cancelAnimationFrame(holdRafRef.current);
    isHoldingRef.current = false;
    setIsHolding(false);

    const decay = () => {
      holdProgressRef.current *= 0.82;
      setHoldProgress(holdProgressRef.current);
      if (holdProgressRef.current > 0.005) {
        holdRafRef.current = requestAnimationFrame(decay);
      } else {
        holdProgressRef.current = 0;
        setHoldProgress(0);
      }
    };
    holdRafRef.current = requestAnimationFrame(decay);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let found = null;
    for (const c of settledCirclesRef.current) {
      const dx = mx - c.x;
      const dy = my - c.y;
      if (Math.sqrt(dx * dx + dy * dy) <= CIRCLE_R) {
        found = c.id;
        break;
      }
    }
    setHoveredId(found);
  }, []);

  const scale = 1 + holdProgress * 0.18;

  return (
    <section
      ref={sectionRef}
      id="experimente"
      className="relative font-manrope text-center py-20 space-y-12 bg-[url('/bg-circles.svg')] bg-repeat overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Physics canvas — in front of text, behind hover cards */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      />

      {/* Hover cards */}
      {settledCircles
        .filter((c) => c.id === hoveredId)
        .map((c) => (
          <div
            key={c.id}
            className="absolute pointer-events-auto flex flex-col items-center"
            style={{
              left: c.x,
              top: c.y - CIRCLE_R - 52,
              transform: "translateX(-50%)",
              zIndex: 30,
            }}
          >
            <div className="bg-white border border-amber-200 rounded-sm shadow-sm px-3 py-2 flex items-center gap-2">
              <span className="font-manrope font-semibold text-sm text-stone-900 whitespace-nowrap">
                {c.title}
              </span>
              <button
                onClick={() =>
                  window.open(c.url, "_blank", "noopener,noreferrer")
                }
                className="text-amber-500 hover:text-blue-500 transition-colors duration-150"
                title="Abrir link"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
            </div>
            <div className="w-2.5 h-2.5 bg-white border-r border-b border-amber-200 rotate-45 -mt-1.5" />
          </div>
        ))}

      {/* Text content */}
      <div className="relative space-y-6" style={{ zIndex: 5 }}>
        <p className="lowercase rounded-full text-sm font-space-mono px-2 py-0.5 bg-amber-100/20 border border-amber-100 text-white w-fit mx-auto">
          experimente
        </p>
        <div className="space-y-2">
          <p className="font-manrope text-2xl tracking-tight text-balance font-semibold">
            Não tem certeza se essa curadoria é pra você?
          </p>
          <p className="font-manrope text-lg lowercase">
            Faz um test-drive com alguns links já curados
          </p>
        </div>
      </div>

      {/* Button + counter */}
      <div className="relative space-y-2" style={{ zIndex: 5 }}>
        <button
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={(e) => {
            cancelHold();
            isBtnHoveredRef.current = false;
          }}
          onMouseEnter={() => {
            isBtnHoveredRef.current = true;
            trailCmdRef.current = "dismiss";
          }}
          onMouseLeave={() => {
            isBtnHoveredRef.current = false;
          }}
          disabled={isExhausted}
          className="relative overflow-hidden bg-blue-500 text-white px-8 py-3 rounded-full text-xl lowercase font-space-mono select-none touch-none disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ transform: `scale(${scale})` }}
        >
          <canvas
            ref={btnCanvasRef}
            className="absolute inset-0 pointer-events-none rounded-full"
          />
          {/* base label */}
          <span className="relative">Degustar link</span>
          {/* inverted fill — sweeps left→right matching hold progress */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-white text-blue-500 rounded-full font-space-mono text-xl lowercase pointer-events-none"
            style={{
              clipPath: `inset(0 ${((1 - holdProgress) * 100).toFixed(1)}% 0 0)`,
            }}
          >
            Degustar link
          </span>
        </button>
        <p
          className="font-space-mono text-xs text-blue-200 transition-opacity duration-700"
          style={{ opacity: hasInteracted ? 1 : 0 }}
        >
          {isExhausted
            ? "todos os links foram gerados"
            : `${linksRemaining} link${linksRemaining !== 1 ? "s" : ""} restante${linksRemaining !== 1 ? "s" : ""}`}
        </p>
      </div>
    </section>
  );
}
