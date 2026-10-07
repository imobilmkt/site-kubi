"use client";

import { useState } from "react";
import Image from "next/image";
import type { PropertyPhoto } from "@/lib/properties/types";

export function Gallery({ photos, title }: { photos: PropertyPhoto[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  if (photos.length === 0) return null;

  function go(delta: number) {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-kubi-gray-100 sm:aspect-[16/9]">
        <Image
          src={photos[index].url}
          alt={photos[index].alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="absolute bottom-3 right-3 rounded-full bg-kubi-black/75 px-3 py-1.5 text-xs font-medium text-kubi-white"
        >
          Ver em tela cheia ({index + 1}/{photos.length})
        </button>
        {photos.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-kubi-white/90 text-kubi-black shadow"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Próxima foto"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-kubi-white/90 text-kubi-black shadow"
            >
              ›
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === index ? "border-kubi-orange" : "border-transparent"
              }`}
            >
              <Image src={photo.url} alt={photo.alt} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-kubi-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos — ${title}`}
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Fechar galeria"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-kubi-white/10 text-kubi-white hover:bg-kubi-white/20"
          >
            ✕
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image
              src={photos[index].url}
              alt={photos[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-kubi-white/10 text-kubi-white hover:bg-kubi-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Próxima foto"
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-kubi-white/10 text-kubi-white hover:bg-kubi-white/20"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
