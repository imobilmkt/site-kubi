import { siteConfig } from "@/config/site";

/** Mapa (Google Maps) com a localização exata do escritório da Kubi (página de Contato). */
export function OfficeMap() {
  const { latitude, longitude } = siteConfig.geo;

  return (
    <iframe
      title={`Mapa com o endereço da ${siteConfig.name}`}
      src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${latitude},${longitude}!6i17`}
      className="h-[360px] w-full overflow-hidden rounded-card border-0 bg-kubi-gray-100"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
