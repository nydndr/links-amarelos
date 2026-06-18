# Implementation Brief: Curation Animation Section
**Podcast website — Next.js + Canvas**
**Target: Claude Code**

---

## 1. What this section is

A canvas-based animated section that lives **below the fold** on the podcast landing page. It tells the story of how the host curates content: from raw internet browsing → Links Amarelos + Ondas Amarelas → Hyperlinks. The visual language is organic, process-driven, and personal — not a product diagram.

The animation runs in a **continuous smooth loop**, triggered by **IntersectionObserver** when the section enters the viewport. It must render two distinct compositions:
- **Desktop (≥ 768px):** Horizontal layout — stages flow left → right
- **Mobile (< 768px):** Vertical layout — stages flow top → bottom

Both share the same animation logic; only the axis, canvas dimensions, and particle density change.

---

## 2. The narrative — 8 stages

All stages blend into each other. There are no hard cuts.

### Stage 0 — Raw internet (the initial state)
- Canvas starts with **~80 circles** (tweakable) orbiting and drifting on the left third of the canvas (desktop) / top third (mobile)
- All circles are **black and white**: some filled solid, some outline-only, some with a subtle noise/grain texture
- No cursor yet. The circles feel alive but undirected — slight random drift + slow orbiting clusters

### Stage 1 — The cursor arrives and clicks
- A **custom arrow cursor** (distinct from the browser cursor — slightly larger, styled) enters from outside the canvas and moves through the circle field
- As it passes near circles, some are **"clicked"**: signalled by a brief visual pulse on the cursor + the circle rescaling slightly then snapping to a new state
- Clicked circles become **yellow** — solid yellow fill, yellow-tinted texture for textured ones, yellow outline for outline ones
- ~60% of circles get clicked over the course of this stage; the rest remain black and white

### Stage 2 — Yellow links move toward center, leaving a trail
- Clicked (yellow) circles begin migrating toward the **center zone** of the canvas
- Their movement leaves an **organic yellow trail** — implemented as stacked low-opacity radial gradient blobs along the path (same technique as operate.so's blue glow, but yellow)
- Movement is not perfectly linear — it has slight wobble/curve, feeling organic and hand-driven
- The ~40% un-clicked circles continue their background drift, some drifting off-canvas edges (they weren't captured — that's intentional)

### Stage 3 — The 60% zone: Links Amarelos + Ondas Amarelas
- The yellow circles settle into a **loose organic cluster** in the center-left area
- A **boundary line is drawn around ~60% of them** — not a perfect rectangle, more like a rounded lasso or flowing closed path
- **Two SVG logos appear** just below this boundary: Links Amarelos logo + Ondas Amarelas logo
  - SVGs are provided as files. Render via `drawImage()` after loading them as `Image` objects
  - They fade in after the boundary finishes drawing

### Stage 4 — The other 40% diverge, leaving a purple trail
- The remaining yellow circles (the ones outside the boundary) split off toward the **right side** of the canvas (desktop) / bottom (mobile)
- They leave a **purple/violet organic trail** as they move — same radial gradient blob technique, purple color
- These circles transition: yellow → purple as they travel

### Stage 5 — Purple circles organize into a structured layout
- The purple circles arrive on the right zone and **self-organize into a tight, structured arrangement** — a grid or a clean horizontal/vertical line
- This transition should feel satisfying: the wobbling organic movement suddenly snapping into order
- The circles are now solid purple/violet

### Stage 6 — Hyperlinks box appears
- A **rigid rectangular border** is drawn around the organized purple circles
- The **Hyperlinks SVG logo** appears inside or just below the box, fading in
- The scene holds for a beat, then the loop begins fading back to Stage 0

### Loop transition
- Smooth crossfade/dissolve back to Stage 0 over ~1.5s
- Yellow and purple trails fade out, circles return to black and white, cursor exits canvas

---

## 3. Visual language

### Colors (starting values — all tweakable via control panel)
```
Background dark:  #0D0D0D
Background light: #F5F4F0
Circle B&W fill:  #E8E8E8
Circle B&W stroke:#888888
Yellow:           #F5C842
Purple:           #9B7FD4
Yellow trail:     rgba(245, 200, 66, 0.06)   per blob
Purple trail:     rgba(155, 127, 212, 0.06)  per blob
Boundary stroke:  matches zone color (yellow or purple)
```

### Themes
The component accepts a `theme` prop: `"dark"` or `"light"` (string). Colors switch accordingly. Both themes should be implemented from the start so Dandara can toggle and compare.

### Circle types (ratio tweakable)
- **Solid filled** — simple `arc()` + `fill()`
- **Outline only** — `arc()` + `stroke()`, no fill
- **Textured** — filled with a canvas noise pattern (use `createPattern()` with a small offscreen canvas of Perlin-like noise, or a simple pixel noise function)

### Cursor
- SVG arrow, ~28×28px, rendered via `drawImage()` on the canvas
- Slightly larger and more graphic than the OS default — e.g. a clean geometric arrow with a 2px stroke and contrasting fill
- On "click" event in the animation: cursor scales up briefly (1.0 → 1.3 → 1.0 over ~120ms) and emits a small ripple

### Trails
- Implemented as: for each trail point stored in a history array, draw a radial gradient circle with very low opacity
- Trail points fade out over time (opacity decays with age)
- Organic appearance: slight perpendicular wobble applied to the path as circles move

### Boundary lines (Stages 3 and 6)
- Stage 3: drawn as an animated closed SVG-like path using `bezierCurveTo` — organic, slightly imperfect
- Stage 6: drawn as a clean `strokeRect` with rounded corners (`roundRect`)
- Both use a draw-on animation: the stroke appears progressively (use `setLineDash` + `lineDashOffset` trick)

---

## 4. SVG logo rendering in canvas

```js
// Preload all SVGs before animation starts
const logos = {};
async function preloadSVGs() {
  const files = {
    linksAmarelos: '/assets/logos/links-amarelos.svg',
    ondasAmarelas: '/assets/logos/ondas-amarelas.svg',
    hyperlinks:    '/assets/logos/hyperlinks.svg',
  };
  await Promise.all(
    Object.entries(files).map(([key, src]) =>
      new Promise(res => {
        const img = new Image();
        img.onload = () => { logos[key] = img; res(); };
        img.src = src;
      })
    )
  );
}

// Render with fade (globalAlpha)
ctx.globalAlpha = logoOpacity; // 0→1 on fade-in
ctx.drawImage(logos.linksAmarelos, x, y, width, height);
ctx.globalAlpha = 1;
```

Place SVG files in `/public/assets/logos/`. All three must be provided by Dandara before this step can render.

---

## 5. X-axis stage labels

A **thin label bar sits below the canvas** (not inside it — it's an HTML overlay div). It contains three labels:

```
Curadoria          Links Amarelos + Ondas Amarelas          Hyperlinks
```

- Each label starts at low opacity (`0.25`)
- As the animation reaches the corresponding stage, that label **brightens to full opacity** with a smooth transition (`transition: opacity 0.6s ease`)
- Active label also gets a small dot or underline indicator
- Implemented in HTML/CSS over the canvas, driven by a `currentStage` React state updated from inside the animation loop via a ref callback

---

## 6. Control panel (dev/tuning mode)

Wrap the section in a `TUNING_MODE` environment variable check. When `NEXT_PUBLIC_TUNING_MODE=true`, a floating panel renders alongside the canvas with the following sliders/inputs:

| Parameter | Type | Default |
|---|---|---|
| Total circles | Slider 20–200 | 80 |
| % clicked by cursor | Slider 0–100 | 60 |
| Animation speed | Slider 0.5×–3× | 1× |
| Trail opacity per blob | Slider 0.01–0.15 | 0.06 |
| Trail blob radius | Slider 20–120px | 60 |
| Circle size range min | Slider 3–20 | 5 |
| Circle size range max | Slider 10–40 | 18 |
| Cursor size | Slider 16–48 | 28 |
| Yellow color | Color picker | #F5C842 |
| Purple color | Color picker | #9B7FD4 |
| Theme | Toggle dark/light | dark |
| Boundary style | Toggle organic/rigid | organic |

All parameters flow into the animation as a single `config` object. Changes update in real-time without restarting the loop.

---

## 7. Mobile adaptation

Detect via `window.innerWidth < 768` (or Next.js `useMediaQuery`).

| Property | Desktop | Mobile |
|---|---|---|
| Canvas orientation | Horizontal (wide) | Vertical (tall) |
| Flow direction | Left → right | Top → bottom |
| Circle count | Full (`config.totalCircles`) | `config.totalCircles * 0.5` |
| Stage zones | Left third / center / right third | Top third / center / bottom third |
| Trail length | Full | 60% |
| Logo size | Full | 70% |

The same `drawFrame(ctx, config, state)` function handles both — just pass different `width`, `height`, and `axis: 'horizontal' | 'vertical'` values.

---

## 8. React component structure

```
/components/CurationAnimation/
  index.jsx              ← exports the section wrapper
  CurationCanvas.jsx     ← canvas + animation loop (useRef, useEffect)
  useAnimationLoop.js    ← rAF loop, IntersectionObserver, stage state machine
  particles.js           ← Particle class: position, velocity, state, type, color
  trail.js               ← Trail class: point history, decay, radial blob draw
  cursor.js              ← Cursor class: position, click animation, SVG render
  boundaries.js          ← drawOrganicBoundary(), drawRigidBoundary()
  config.js              ← default config object + JSDoc comments
  TuningPanel.jsx        ← control panel (only rendered if TUNING_MODE)
  StageLabels.jsx        ← HTML label bar below canvas
```

---

## 9. Performance notes

- Use **two canvas layers**: one offscreen for the static background + trails (repaint only when needed), one for moving particles + cursor (repaint every frame). Composite with `drawImage()`.
- Respect `prefers-reduced-motion`: if set, skip the animation entirely and render a static snapshot of Stage 3 (the settled state).
- Cancel `requestAnimationFrame` on component unmount (return from `useEffect`).
- Handle HiDPI: `canvas.width = width * devicePixelRatio`, then `ctx.scale(dpr, dpr)`.
- On mobile, reduce particle count and trail history length to maintain 60fps.

---

## 10. Files Dandara needs to provide before implementation is complete

1. `/public/assets/logos/links-amarelos.svg`
2. `/public/assets/logos/ondas-amarelas.svg`
3. `/public/assets/logos/hyperlinks.svg`
4. Confirmation of the site's existing color tokens (if any Tailwind theme is already configured)

---

## 11. Sequence for Claude Code

1. Scaffold the component folder structure
2. Implement `config.js` with all defaults
3. Build `particles.js` — Particle class with all states
4. Build `trail.js` — trail point history + draw method
5. Build `cursor.js` — cursor render + click animation
6. Wire `useAnimationLoop.js` — stage state machine (0→6→loop), rAF, IntersectionObserver
7. Implement `CurationCanvas.jsx` — canvas setup, HiDPI, two-layer composite
8. Add `boundaries.js` — organic lasso + rigid rect draw-on animations
9. Add SVG logo rendering with preload
10. Build `StageLabels.jsx` — HTML overlay, stage-driven opacity
11. Build `TuningPanel.jsx` — all sliders wired to config
12. Add mobile adaptation logic
13. Add `prefers-reduced-motion` fallback
14. Integrate into section wrapper with correct scroll trigger
