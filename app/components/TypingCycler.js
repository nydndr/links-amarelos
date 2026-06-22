"use client";

import { TypeAnimation } from "react-type-animation";

export default function TypingCycler() {
  return (
    <TypeAnimation
      sequence={["insta", 2000, "tiktok", 2000, "x", 2000]}
      repeat={Infinity}
      cursor={true}
      speed={60}
      deletionSpeed={80}
    />
  );
}
