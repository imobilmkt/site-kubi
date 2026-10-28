import Image from "next/image";
import { siteConfig } from "@/config/site";
import { QuickSearchForm } from "./QuickSearchForm";
import heroImage from "../../../public/hero/memorial-jk.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-kubi-black">
      <Image
        src={heroImage}
        alt="Memorial JK, em homenagem a Juscelino Kubitschek, fundador de Brasília"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover opacity-70 grayscale"
      />
      {/* Foto: Memorial JK — Cayambe, Wikimedia Commons, CC BY-SA 3.0
          https://commons.wikimedia.org/wiki/File:Memorial_J_Kubitschek_Brasilia_2009.jpg */}
      <span className="sr-only">
        Foto do Memorial JK por Cayambe (Wikimedia Commons, CC BY-SA 3.0)
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-kubi-black via-kubi-black/40 to-kubi-black/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl font-semibold text-kubi-white sm:text-5xl lg:text-6xl">
            {siteConfig.slogan}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-kubi-white/85 sm:text-lg">
            A imobiliária de alto padrão de Brasília: compra, venda, locação e administração
            de imóveis no Lago Sul, Lago Norte, Plano Piloto e principais regiões do DF.
          </p>
        </div>

        <QuickSearchForm />
      </div>
    </section>
  );
}
