import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Brand tokens (from app/globals.css)
const INK = "#14172a";
const CREAM = "#faf7f2";
const MUTED = "#a8aec9";
const PURPLE = "#7c5aec";
const PURPLE2 = "#9b8ce8";

const logoPath = fileURLToPath(new URL("../public/assets/logo.png", import.meta.url));

// Recolour the dark logo to cream while preserving its alpha (the site does this
// with `brightness-0 invert` on dark backgrounds).
const meta = await sharp(logoPath).metadata();
const alpha = await sharp(logoPath).ensureAlpha().extractChannel(3).toBuffer();
const creamLogo = await sharp({
  create: { width: meta.width, height: meta.height, channels: 3, background: { r: 250, g: 247, b: 242 } },
})
  .joinChannel(alpha)
  .png()
  .toBuffer();
const logoSized = await sharp(creamLogo).resize({ height: 60 }).png().toBuffer();

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="28%" cy="26%" r="60%">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="${PURPLE}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${PURPLE}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- subtle diagonal lines, echoing the site hero -->
  <g stroke="${PURPLE2}" stroke-opacity="0.10" stroke-width="2">
    <line x1="780" y1="0" x2="1200" y2="300"/>
    <line x1="880" y1="0" x2="1200" y2="200"/>
    <line x1="980" y1="0" x2="1200" y2="120"/>
  </g>

  <!-- accent bar -->
  <rect x="80" y="172" width="64" height="6" rx="3" fill="${PURPLE}"/>

  <!-- headline -->
  <text x="80" y="338" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="78" fill="${CREAM}" letter-spacing="-2">More revenue from the</text>
  <text x="80" y="426" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="78" fill="${CREAM}" letter-spacing="-2">traffic you already have.</text>

  <!-- category descriptor -->
  <text x="80" y="528" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="30" fill="${MUTED}">Conversion rate optimisation for D2C brands.</text>
</svg>`;

const buf = await sharp(Buffer.from(svg))
  .composite([{ input: logoSized, top: 72, left: 80 }])
  .png()
  .toBuffer();

writeFileSync(new URL("../public/assets/og-default.png", import.meta.url), buf);
console.log("wrote public/assets/og-default.png", buf.length, "bytes");
