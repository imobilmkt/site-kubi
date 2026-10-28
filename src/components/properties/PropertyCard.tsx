import Image from "next/image";
import Link from "@/components/ui/Link";
import type { Property } from "@/lib/properties/types";
import { getCoverPhoto } from "@/lib/properties/types";
import { getPropertyUrl } from "@/lib/properties/url";
import { getDisplayPrice, formatArea } from "@/lib/format";

const STATUS_LABEL: Record<Property["status"], string | null> = {
  disponivel: null,
  lancamento: "Lançamento",
  reservado: "Reservado",
  vendido: "Vendido",
  alugado: "Alugado",
};

export function PropertyCard({ property }: { property: Property }) {
  const cover = getCoverPhoto(property);
  const statusLabel = STATUS_LABEL[property.status];
  const isUnavailable = property.status === "vendido" || property.status === "alugado";

  return (
    <Link
      href={getPropertyUrl(property)}
      className="group block overflow-hidden rounded-card border border-kubi-gray-200 bg-kubi-white transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-kubi-gray-100">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              isUnavailable ? "grayscale" : ""
            }`}
          />
        )}
        {statusLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-kubi-black/85 px-3 py-1 text-xs font-semibold text-kubi-white">
            {statusLabel}
          </span>
        )}
        {property.featured && !statusLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-kubi-orange px-3 py-1 text-xs font-semibold text-kubi-black">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="font-heading text-lg font-semibold text-kubi-black">
          {getDisplayPrice(property)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-kubi-black">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-kubi-gray">{property.address.neighborhood}</p>

        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-kubi-gray-700">
          {property.usableArea && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Área</dt>
              <dd>{formatArea(property.usableArea)}</dd>
            </div>
          )}
          {!!property.bedrooms && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Quartos</dt>
              <dd>{property.bedrooms} quartos</dd>
            </div>
          )}
          {!!property.parkingSpots && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Vagas</dt>
              <dd>{property.parkingSpots} vagas</dd>
            </div>
          )}
        </dl>

        <p className="mt-3 text-xs text-kubi-gray">Ref. {property.code}</p>
      </div>
    </Link>
  );
}
