"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { siteConfig } from "@/config/site";

/** Mapa com a localização exata do escritório da Kubi (página de Contato). */
export function OfficeMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const center: [number, number] = [siteConfig.geo.latitude, siteConfig.geo.longitude];
      map = L.map(containerRef.current, { center, zoom: 15, scrollWheelZoom: false });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#FF751F;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker(center, { icon, alt: siteConfig.name })
        .addTo(map)
        .bindPopup(`<strong>${siteConfig.name}</strong><br/>${siteConfig.address.full}`)
        .openPopup();
      marker.getElement()?.setAttribute("aria-label", `${siteConfig.name} — ${siteConfig.address.full}`);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[360px] w-full overflow-hidden rounded-card bg-kubi-gray-100"
      role="region"
      aria-label="Mapa com o endereço da Kubi Imóveis"
    />
  );
}
