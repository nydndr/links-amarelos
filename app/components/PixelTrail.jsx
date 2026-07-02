"use client";

import { useEffect, useRef } from "react";

// Same sweep tuning as YellowCircle / ExperimenteSection's button trail —
// keep it identical everywhere so the effect reads as one consistent motif.
const TRAIL_PIXEL_SIZE = 5;
const TRAIL_SPEED = 1.8;
const TRAIL_FADE = 0.025;
const TRAIL_PAUSE_MS = 2800;
const TRAIL_OPACITY = 0.5;
const TRAIL_CURVE_AMP = 10;
const TRAIL_CURVE_FREQ = 0.5;

export default function PixelTrail({ color = "255,255,255", paused = false }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        const { width: W, height: H } = parent.getBoundingClientRect();
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");

        const totalRows = Math.ceil(H / TRAIL_PIXEL_SIZE);
        let head = -TRAIL_PIXEL_SIZE * 2;
        let trail = [];
        let rafId;
        let timeoutId;
        let stopped = false;

        const restart = () => {
            if (paused) {
                timeoutId = setTimeout(restart, TRAIL_PAUSE_MS);
                return;
            }
            head = -TRAIL_PIXEL_SIZE * 2;
            trail = [];
            rafId = requestAnimationFrame(frame);
        };

        function frame() {
            if (stopped) return;

            if (paused) {
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

            for (const b of trail) {
                ctx.fillStyle = `rgba(${color},${b.opacity})`;
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

            const tailClear =
                head - (TRAIL_OPACITY / TRAIL_FADE) * TRAIL_PIXEL_SIZE;
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
    }, [color, paused]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
        />
    );
}
