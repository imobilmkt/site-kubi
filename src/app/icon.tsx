import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon gerado a partir do símbolo "kb" da marca (ver manual, logo tipo 04). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#FF751F",
            fontFamily: "sans-serif",
            letterSpacing: "-0.04em",
          }}
        >
          kb
        </span>
      </div>
    ),
    size,
  );
}
