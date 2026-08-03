# ECS Dashboard — Real-Time Simulation Monitor

**Live demo:** https://joseluismontezamilian12-rgb.github.io/ecs-dashboard/

Retro-terminal React SPA that monitors a **simulated** Entity-Component-System (ECS) core in real time: a telemetry loop ticking at ~60 Hz, fluctuating memory-allocation readouts, and a native `<canvas>` scene rendering 150 entities with proximity links — CRT scanlines included.

> **What this is (and isn't):** the "core" is a JavaScript simulation running entirely in the browser (`setInterval` at ~16.7 ms for telemetry + `requestAnimationFrame` for rendering). There is no WebAssembly and no backend. The point of the project is real-time front-end work: canvas rendering, animation loops, and keeping React state updates smooth at 60 FPS.

## Stack

React 19 · Vite · Tailwind CSS 4 · HTML5 Canvas · GitHub Pages (`gh-pages`)

## How it works

- **Telemetry loop** — a 16.67 ms `setInterval` increments the iteration counter and simulates memory-allocation jitter (12.4–16.8 KB) with a sine wave.
- **Canvas engine** — a `requestAnimationFrame` loop draws a telemetry grid, 150 pulsing entities bouncing inside the viewport, and sequential proximity links, with a phosphor-trail clear effect for the radar look.
- **Responsive** — the canvas re-measures on window resize; the scanline overlay is pure CSS gradients.

## Run locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run deploy    # build + publish to GitHub Pages
```

## License

MIT — see [LICENSE](LICENSE).
