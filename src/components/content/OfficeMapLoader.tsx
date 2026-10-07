"use client";

import dynamic from "next/dynamic";

const OfficeMap = dynamic(() => import("./OfficeMap").then((m) => m.OfficeMap), {
  ssr: false,
  loading: () => <div className="h-[360px] w-full rounded-card bg-kubi-gray-100" />,
});

export function OfficeMapLoader() {
  return <OfficeMap />;
}
