import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photoWidth = 456; // 38% of the width, matching the hero split

// A still frame of the hero's field lines across the text side, pointing at the same rest point.
function fieldSegments() {
  const spacing = 38;
  const area = size.width - photoWidth;
  const target = { x: area * 0.78, y: size.height * 0.6 };
  const segments: { x1: number; y1: number; x2: number; y2: number; t: number }[] = [];
  for (let y = spacing / 2; y < size.height; y += spacing) {
    for (let x = spacing / 2; x < area; x += spacing) {
      const dx = target.x - x;
      const dy = target.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const t = Math.max(0, 1 - dist / 320) ** 2;
      const half = (9 + 15 * t) / 2;
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

// ImageResponse needs ttf, otf, or woff (not the site's woff2), so the weights it uses are bundled here.
function loadFont(weight: 400 | 600 | 800) {
  return readFile(join(process.cwd(), `assets/fonts/PlusJakartaSans-${weight}.woff`));
}

export default async function OpengraphImage() {
  const [regular, semibold, extrabold] = await Promise.all([loadFont(400), loadFont(600), loadFont(800)]);
  const photo = profile.headshot
    ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", profile.headshot.src))).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFFFFF",
          color: "#101820",
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div style={{ display: "flex", width: photoWidth, height: "100%", background: "#EEF3F3" }}>
          {photo && (
            <img
              src={photo}
              alt=""
              width={photoWidth}
              height={size.height}
              style={{ objectFit: "cover", objectPosition: "50% 20%" }}
            />
          )}
        </div>
        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          <svg
            width={size.width - photoWidth}
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
                stroke="#0F766E"
                strokeWidth={2 + s.t}
                strokeLinecap="round"
                opacity={0.1 + 0.55 * s.t}
              />
            ))}
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 64px",
              width: "100%",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 600, color: "#0F766E" }}>Hi, I&apos;m</div>
            <div style={{ marginTop: 8, fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.035em" }}>
              {profile.name}
            </div>
            <div style={{ marginTop: 28, fontSize: 36, lineHeight: 1.3, color: "#2C3640" }}>
              {profile.headline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: regular, weight: 400, style: "normal" },
        { name: "Plus Jakarta Sans", data: semibold, weight: 600, style: "normal" },
        { name: "Plus Jakarta Sans", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );
}
