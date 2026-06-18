'use client';
import { useRef, useState } from 'react';
import CurationCanvas from './CurationCanvas';
import StageLabels from './StageLabels';
import TuningPanel from './TuningPanel';
import { defaultConfig } from './config';

const TUNING = process.env.NEXT_PUBLIC_TUNING_MODE === 'true';

export default function CurationAnimation() {
  const configRef = useRef({ ...defaultConfig });
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <section
      id="curation-animation"
      style={{ position: 'relative', minHeight: '32rem', background: defaultConfig.bgColor }}
    >
      <CurationCanvas configRef={configRef} onStageChange={setCurrentStage} />
      <StageLabels currentStage={currentStage} />
      {TUNING && <TuningPanel configRef={configRef} />}
    </section>
  );
}
