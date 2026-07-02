"use client";

import { useEffect, useRef } from "react";

// Same sweep tuning as ExperimenteSection's button pixel trail
const TRAIL_PIXEL_SIZE = 5;
const TRAIL_SPEED = 1.8;
const TRAIL_FADE = 0.025;
const TRAIL_PAUSE_MS = 2800;
const TRAIL_COLOR = "255,255,255";
const TRAIL_OPACITY = 0.5;
const TRAIL_CURVE_AMP = 10;
const TRAIL_CURVE_FREQ = 0.5;

export default function YellowCircle({ filled = false, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!filled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width: W, height: H } = canvas.getBoundingClientRect();
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const r = Math.min(W, H) / 2;

    const totalRows = Math.ceil(H / TRAIL_PIXEL_SIZE);
    let head = -TRAIL_PIXEL_SIZE * 2;
    let trail = [];
    let rafId;
    let timeoutId;
    let stopped = false;

    const restart = () => {
      head = -TRAIL_PIXEL_SIZE * 2;
      trail = [];
      rafId = requestAnimationFrame(frame);
    };

    function frame() {
      if (stopped) return;

      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(0, 0, W, H);

      head += TRAIL_SPEED;
      const col = Math.floor(head / TRAIL_PIXEL_SIZE);
      if (!trail.length || trail[trail.length - 1].col !== col) {
        trail.push({ col, opacity: TRAIL_OPACITY });
      }
      trail = trail
        .map((b) => ({ ...b, opacity: b.opacity - TRAIL_FADE }))
        .filter((b) => b.opacity > 0);

      for (const b of trail) {
        ctx.fillStyle = `rgba(${TRAIL_COLOR},${b.opacity})`;
        for (let row = 0; row < totalRows; row++) {
          const t = row / totalRows;
          const curveOffset =
            Math.round(
              (Math.sin(t * Math.PI * 2 * TRAIL_CURVE_FREQ) *
                TRAIL_CURVE_AMP) /
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
      ctx.restore();

      ctx.strokeStyle = "rgba(180,140,0,0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r - 1, 0, Math.PI * 2);
      ctx.stroke();

      const tailClear =
        head - (TRAIL_OPACITY / TRAIL_FADE) * TRAIL_PIXEL_SIZE;
      if (tailClear > W) {
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
  }, [filled]);

  if (!filled) {
    return <div className={`rounded-full border-2 border-amber-400 ${className}`} />;
  }

  return <canvas ref={canvasRef} className={`rounded-full ${className}`} />;
}
