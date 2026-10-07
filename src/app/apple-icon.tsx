import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0c" }}>
        <div style={{ width: 120, height: 120, borderRadius: 999, border: "2px solid #c9a86a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 62, height: 62, borderRadius: 999, border: "8px solid #c9a86a" }} />
        </div>
      </div>
    ),
    size,
  );
}
