import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A still frame of the hero's field lines, pointing at the same rest point.
function fieldSegments() {
  const spacing = 40;
  const target = { x: size.width * 0.78, y: size.height * 0.6 };
  const segments: { x1: number; y1: number; x2: number; y2: number; t: number }[] = [];
  for (let y = spacing / 2; y < size.height; y += spacing) {
    for (let x = spacing / 2; x < size.width; x += spacing) {
      const dx = target.x - x;
      const dy = target.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const t = Math.max(0, 1 - dist / 360) ** 2;
      const half = (10 + 16 * t) / 2;
      segments.push({
        x1: x - (dx / dist) * half,
        y1: y - (dy / dist) * half,
        x2: x + (dx / dist) * half,
        y2: y + (dy / dist) * half,
        t,
      });
    }
  }
  return segments;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#121A2B",
          color: "#E9EDF7",
        }}
      >
        <svg
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {fieldSegments().map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="#7C92FF"
              strokeWidth={2 + s.t}
              strokeLinecap="round"
              opacity={0.1 + 0.6 * s.t}
            />
          ))}
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            width: 860,
          }}
        >
          <div style={{ fontSize: 32, color: "#93A0C2" }}>
            {`${profile.name}, ${profile.role.toLowerCase()}`}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.headline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
