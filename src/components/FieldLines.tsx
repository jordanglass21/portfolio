"use client";

import { useEffect, useRef } from "react";

const SPACING = 32;
const RADIUS = 280;
const EASE = 0.14;
const MIN_LEN = 8;
const MAX_LEN = 22;
const MIN_WIDTH = 1.5;
const MAX_WIDTH = 2.5;
const MIN_ALPHA = 0.1;
const MAX_ALPHA = 0.7;
const DIM = 0.45;
const REST_X = 0.78;
const REST_Y = 0.6;
// Segments are batched into this many intensity levels so each frame is a few strokes, not thousands.
const LEVELS = 16;

type Point = { x: number; y: number };
type Rect = { left: number; top: number; right: number; bottom: number };

/**
 * A grid of short segments behind the hero that turn toward the pointer.
 * Fills its positioned parent. Elements in the parent marked `data-field-dim`
 * get dimmer segments behind them so text keeps its contrast.
 */
export function FieldLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    let width = 0;
    let height = 0;
    let color = "";
    let dimRects: Rect[] = [];
    let visible = true;
    let frame = 0;
    let pointerActive = false;
    const current: Point = { x: 0, y: 0 };
    const goal: Point = { x: 0, y: 0 };

    const restPoint = (): Point => ({ x: width * REST_X, y: height * REST_Y });

    const isDimmed = (x: number, y: number) =>
      dimRects.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineCap = "round";

      // One path per (level, dimmed) bucket.
      const buckets: Path2D[] = Array.from({ length: LEVELS * 2 }, () => new Path2D());
      const offset = (SPACING / 2) | 0;

      for (let y = offset; y < height; y += SPACING) {
        for (let x = offset; x < width; x += SPACING) {
          const dx = current.x - x;
          const dy = current.y - y;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / RADIUS);
          const level = Math.min(LEVELS - 1, Math.round(t * t * (LEVELS - 1)));
          const len = MIN_LEN + (MAX_LEN - MIN_LEN) * (level / (LEVELS - 1));
          const half = len / 2;
          const ux = dist > 0 ? dx / dist : 1;
          const uy = dist > 0 ? dy / dist : 0;
          const path = buckets[level + (isDimmed(x, y) ? LEVELS : 0)];
          path.moveTo(x - ux * half, y - uy * half);
          path.lineTo(x + ux * half, y + uy * half);
        }
      }

      buckets.forEach((path, i) => {
        const level = i % LEVELS;
        const k = level / (LEVELS - 1);
        const alpha = MIN_ALPHA + (MAX_ALPHA - MIN_ALPHA) * k;
        ctx.globalAlpha = i >= LEVELS ? alpha * DIM : alpha;
        ctx.lineWidth = MIN_WIDTH + (MAX_WIDTH - MIN_WIDTH) * k;
        ctx.stroke(path);
      });
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      frame = 0;
      if (!visible) return;
      current.x += (goal.x - current.x) * EASE;
      current.y += (goal.y - current.y) * EASE;
      const settled = Math.abs(goal.x - current.x) < 0.1 && Math.abs(goal.y - current.y) < 0.1;
      if (settled) {
        current.x = goal.x;
        current.y = goal.y;
      }
      draw();
      if (!settled) frame = requestAnimationFrame(tick);
    };

    const moveTo = (point: Point) => {
      goal.x = point.x;
      goal.y = point.y;
      if (reducedMotion.matches) {
        current.x = goal.x;
        current.y = goal.y;
        if (visible) draw();
        return;
      }
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const readColor = () => {
      color = getComputedStyle(canvas).getPropertyValue("--field").trim() || "#7c92ff";
    };

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      const box = host.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRects = Array.from(host.querySelectorAll<HTMLElement>("[data-field-dim]"), (el) => {
        const r = el.getBoundingClientRect();
        const pad = SPACING / 2;
        return {
          left: r.left - box.left - pad,
          top: r.top - box.top - pad,
          right: r.right - box.left + pad,
          bottom: r.bottom - box.top + pad,
        };
      });
      if (!pointerActive) {
        const rest = restPoint();
        current.x = goal.x = rest.x;
        current.y = goal.y = rest.y;
      }
      draw();
    };

    const toLocal = (e: PointerEvent): Point => {
      const box = canvas.getBoundingClientRect();
      return { x: e.clientX - box.left, y: e.clientY - box.top };
    };

    const onPointerMove = (e: PointerEvent) => {
      // Touch only steers the field while a finger is down.
      if (e.pointerType === "touch" && e.buttons === 0) return;
      pointerActive = true;
      moveTo(toLocal(e));
    };

    const onPointerRelease = (e: PointerEvent) => {
      if (e.type !== "pointerleave" && e.pointerType !== "touch") return;
      pointerActive = false;
      moveTo(restPoint());
    };

    const onSchemeChange = () => {
      readColor();
      draw();
    };

    readColor();
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        draw();
        if (!frame && (current.x !== goal.x || current.y !== goal.y)) {
          frame = requestAnimationFrame(tick);
        }
      }
    });
    intersectionObserver.observe(host);

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerdown", onPointerMove);
    host.addEventListener("pointerleave", onPointerRelease);
    host.addEventListener("pointerup", onPointerRelease);
    host.addEventListener("pointercancel", onPointerRelease);
    darkScheme.addEventListener("change", onSchemeChange);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerMove);
      host.removeEventListener("pointerleave", onPointerRelease);
      host.removeEventListener("pointerup", onPointerRelease);
      host.removeEventListener("pointercancel", onPointerRelease);
      darkScheme.removeEventListener("change", onSchemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
