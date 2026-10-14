import {
  PencilRuler,
  Scale,
  Landmark,
  FileSignature,
  FileText,
  ShieldCheck,
  PiggyBank,
  Presentation,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/lib/content/complementary-services";

const icons: Record<ServiceIconName, LucideIcon> = {
  "pencil-ruler": PencilRuler,
  scale: Scale,
  landmark: Landmark,
  "file-signature": FileSignature,
  "file-text": FileText,
  "shield-check": ShieldCheck,
  "piggy-bank": PiggyBank,
  presentation: Presentation,
  search: Search,
};

export function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
