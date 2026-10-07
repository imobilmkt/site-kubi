"use client";

import { useEffect } from "react";
import { trackPropertyView } from "@/lib/analytics/dataLayer";

type Props = {
  code: string;
  purpose: string;
  type: string;
  neighborhood: string;
  price?: number;
};

/** Dispara o evento property_view uma vez, na montagem da página do imóvel. */
export function PropertyViewTracker(props: Props) {
  useEffect(() => {
    trackPropertyView(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deve disparar apenas uma vez por montagem da página
  }, []);

  return null;
}
