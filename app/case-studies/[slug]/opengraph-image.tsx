import { ImageResponse } from "next/og";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";

export const alt = "Impact Conversion case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

const INK = "#14172a";
const CREAM = "#faf7f2";
const MUTED = "#a8aec9";
const PURPLE = "#7c5aec";
const PURPLE2 = "#9b8ce8";

export default async function CaseStudyOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return new ImageResponse(<div />, size);
  }

  const stats = (study.stats?.length ? study.stats : study.heroStats).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(ellipse at 28% 26%, ${PURPLE}59 0%, ${PURPLE}1A 55%, ${INK} 100%), ${INK}`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark + tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 40,
                fontWeight: 900,
                color: CREAM,
                letterSpacing: "-0.02em",
              }}
            >
              <span>IMPACT</span>
              <span style={{ color: PURPLE2 }}>.</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 13,
                fontWeight: 700,
                color: MUTED,
                letterSpacing: "0.4em",
                marginTop: 2,
              }}
            >
              CONVERSION
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 20px",
              borderRadius: 999,
              border: `1px solid ${PURPLE2}55`,
              background: `${PURPLE}1F`,
              fontSize: 20,
              fontWeight: 600,
              color: CREAM,
            }}
          >
            <span style={{ display: "flex" }}>Case study</span>
            <span style={{ display: "flex", color: MUTED }}>·</span>
            <span style={{ display: "flex", color: MUTED }}>{study.industry}</span>
          </div>
        </div>

        {/* Middle: scoreboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 6,
              borderRadius: 3,
              background: PURPLE,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 56,
              alignItems: "flex-end",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.l}
                style={{ display: "flex", flexDirection: "column", maxWidth: 320 }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 96,
                    fontWeight: 900,
                    color: CREAM,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 22,
                    fontWeight: 600,
                    color: MUTED,
                    marginTop: 14,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: client name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 16,
              fontWeight: 700,
              color: MUTED,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Client
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 800,
              color: CREAM,
              letterSpacing: "-0.01em",
            }}
          >
            {study.name}
          </div>
        </div>
      </div>
    ),
    size
  );
}
