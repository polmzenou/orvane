import { ImageResponse } from "next/og";

export const alt = "ORVANE Genève";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const line = locale === "en" ? "Fine watchmaking since 1891" : "Haute horlogerie depuis 1891";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 35%, #2a2418 0%, #0b0b0c 65%)",
          color: "#f3eee4",
        }}
      >
        <div style={{ width: 150, height: 150, borderRadius: 999, border: "2px solid #c9a86a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 76, height: 76, borderRadius: 999, border: "9px solid #c9a86a" }} />
        </div>
        <div style={{ marginTop: 48, fontSize: 92, letterSpacing: 28, fontFamily: "serif" }}>ORVANE</div>
        <div style={{ marginTop: 12, fontSize: 22, letterSpacing: 14, color: "#c9a86a" }}>GENÈVE · 1891</div>
        <div style={{ marginTop: 40, fontSize: 34, fontStyle: "italic", color: "#e6d3a3", fontFamily: "serif" }}>{line}</div>
      </div>
    ),
    size,
  );
}
