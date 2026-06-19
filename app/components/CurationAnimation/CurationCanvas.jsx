'use client';
import { useRef } from 'react';
import { useAnimationLoop } from './useAnimationLoop';

export default function CurationCanvas({ configRef, onStageChange, restartRef }) {
  const containerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const fgCanvasRef = useRef(null);

  const { restart } = useAnimationLoop(containerRef, bgCanvasRef, fgCanvasRef, configRef, onStageChange);
  if (restartRef) restartRef.current = restart;

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0 }}
    >
      <canvas
        ref={bgCanvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <canvas
        ref={fgCanvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  );
}
