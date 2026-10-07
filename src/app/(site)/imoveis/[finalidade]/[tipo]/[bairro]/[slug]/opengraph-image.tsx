import { ImageResponse } from "next/og";
import { getPropertyBySlug } from "@/lib/properties";
import { getCoverPhoto } from "@/lib/properties/types";
import { getDisplayPrice } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

/** OG image dinâmico: foto de capa do imóvel + título + preço + marca, para compartilhamento em redes sociais e WhatsApp. */
export default async function Image({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  const cover = property ? getCoverPhoto(property) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#000000",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {cover && (
          <img
            src={cover.url}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.97) 38%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FF751F", fontSize: 30, fontWeight: 700 }}>Kubi</span>
            <span
              style={{
                color: "#FF751F",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Imóveis
            </span>
          </div>

          {property && (
            <>
              <div
                style={{
                  display: "flex",
                  marginTop: 28,
                  color: "#FFFFFF",
                  fontSize: 46,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  maxWidth: 1000,
                }}
              >
                {property.title}
              </div>
              <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ color: "#FF751F", fontSize: 36, fontWeight: 700 }}>
                  {getDisplayPrice(property)}
                </span>
                <span style={{ color: "#FFFFFF", fontSize: 26, opacity: 0.9 }}>
                  — {property.address.neighborhood}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    ),
    size,
  );
}
