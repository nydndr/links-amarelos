"use client";
import { useRef, useState } from "react";
import CurationCanvas from "./CurationCanvas";
import StageLabels from "./StageLabels";
import TuningPanel from "./TuningPanel";
import { defaultConfig } from "./config";

const TUNING = process.env.NEXT_PUBLIC_TUNING_MODE === "true";

const TEXTURE_COLS = [
  { texture: "/bg-texture-white.svg", minStage: 0 },
  { texture: "/bg-texture-yellow.svg", minStage: 3 },
  { texture: "/bg-texture-purple.svg", minStage: 5 },
];

export default function CurationAnimation() {
  const configRef = useRef({
    ...defaultConfig,
    stageDurations: [...defaultConfig.stageDurations],
  });
  const restartRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <section
      id="curation-animation"
      style={{
        position: "relative",
        minHeight: "32rem",
        background: defaultConfig.bgColor,
      }}
      className="border-x border-(--amarelo)"
    >
      <CurationCanvas
        configRef={configRef}
        onStageChange={setCurrentStage}
        restartRef={restartRef}
      />
      {TEXTURE_COLS.map((col, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${i * 33.333}%`,
            width: "33.333%",
            backgroundImage: `url(${col.texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "24px 24px",
            opacity: currentStage >= col.minStage ? 1 : 0,
            transition: "opacity 500ms cubic-bezier(0.23, 1, 0.32, 1)",
            pointerEvents: "none",
          }}
        />
      ))}
      <StageLabels currentStage={currentStage} />
      {TUNING && <TuningPanel configRef={configRef} restartRef={restartRef} />}
    </section>
  );
}
