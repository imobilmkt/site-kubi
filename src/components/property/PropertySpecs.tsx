import type { Property } from "@/lib/properties/types";
import { formatArea, formatBRL } from "@/lib/format";
import { getPropertyTypeLabel } from "@/lib/properties/types";

function Spec({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-4 border-b border-kubi-gray-100 py-2.5 text-sm">
      <dt className="text-kubi-gray">{label}</dt>
      <dd className="font-medium text-kubi-black">{value}</dd>
    </div>
  );
}

export function PropertySpecs({ property }: { property: Property }) {
  return (
    <dl>
      <Spec label="Código de referência" value={property.code} />
      <Spec label="Tipo" value={getPropertyTypeLabel(property.type)} />
      <Spec label="Área útil" value={formatArea(property.usableArea)} />
      <Spec label="Área total" value={formatArea(property.totalArea)} />
      <Spec label="Quartos" value={property.bedrooms} />
      <Spec label="Suítes" value={property.suites} />
      <Spec label="Banheiros" value={property.bathrooms} />
      <Spec label="Vagas de garagem" value={property.parkingSpots} />
      {property.floor !== undefined && <Spec label="Andar" value={property.floor} />}
      <Spec label="Condomínio" value={formatBRL(property.condoFee)} />
      <Spec label="IPTU" value={formatBRL(property.iptu)} />
      <Spec label="Mobiliado" value={property.furnished ? "Sim" : "Não"} />
      <Spec
        label="Aceita financiamento"
        value={property.acceptsFinancing ? "Sim" : "Não"}
      />
      <Spec label="Aceita permuta" value={property.acceptsTrade ? "Sim" : "Não"} />
    </dl>
  );
}
