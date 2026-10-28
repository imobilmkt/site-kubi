"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/lib/properties/types";
import { getDisplayPrice } from "@/lib/format";
import { getPropertyUrl } from "@/lib/properties/url";

type PropertyMapProps = {
  properties: Property[];
  /** Centro/zoom usados quando não há imóveis com coordenadas (ex: mapa de um bairro). */
  fallbackCenter?: { lat: number; lng: number };
  heightClassName?: string;
};

/** Mapa (Leaflet/OpenStreetMap) carregado só no cliente, sob demanda. */
export function PropertyMap({
  properties,
  fallbackCenter = { lat: -15.7797, lng: -47.9297 },
  heightClassName = "h-[520px]",
}: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const withCoords = properties.filter((p) => p.coordinates);
      const center = withCoords[0]?.coordinates ?? fallbackCenter;

      map = L.map(containerRef.current, {
        center: [center.lat, center.lng],
        zoom: withCoords.length > 0 ? 12 : 13,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#FF751F;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      for (const property of withCoords) {
        const marker = L.marker([property.coordinates!.lat, property.coordinates!.lng], {
          icon: markerIcon,
          alt: property.title,
        }).addTo(map);
        marker.bindPopup(
          `<a href="${getPropertyUrl(property)}" target="_blank" rel="noopener noreferrer" style="font-weight:600;color:#000">${property.title}</a><br/>${getDisplayPrice(property)}`,
        );
        // Leaflet marca o ícone com role="button"/tabindex para navegação por
        // teclado, mas não define um nome acessível sozinho — completamos aqui.
        marker.getElement()?.setAttribute("aria-label", `Ver imóvel: ${property.title}`);
      }

      if (withCoords.length > 1) {
        map.fitBounds(withCoords.map((p) => [p.coordinates!.lat, p.coordinates!.lng]), {
          padding: [30, 30],
        });
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [properties, fallbackCenter]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-card bg-kubi-gray-100 ${heightClassName}`}
      role="region"
      aria-label="Mapa com a localização aproximada dos imóveis"
    />
  );
}
