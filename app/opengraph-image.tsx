import { ImageResponse } from "next/og";

export const alt = "Impact Conversion · Turn existing traffic into revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse at 30% 20%, #7c5aec 0%, #1a1529 55%, #0e0b1a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 800,
            color: "#f9f5ec",
            letterSpacing: "-0.02em",
          }}
        >
          <span>IMPACT</span>
          <span style={{ color: "#a48dff" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#a48dff",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            Research-led CRO
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#f9f5ec",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            Turn existing traffic into revenue.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#d4c7f5",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            $1M+ extra revenue generated. 35% win rate on tests shipped.
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#a48dff",
            display: "flex",
            gap: 32,
          }}
        >
          <span>impactconversion.com</span>
          <span>·</span>
          <span>D2C + Online Education</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
