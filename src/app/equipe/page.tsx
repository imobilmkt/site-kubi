import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { directors, agents, type TeamMember } from "@/lib/content/team";
import { buildWhatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Nossa equipe",
  description:
    "Conheça a diretoria e os corretores da Kubi Imóveis em Brasília: atendimento exclusivo, especializado por região e por tipo de negócio.",
  alternates: { canonical: "/equipe" },
};

function TeamCard({ member }: { member: TeamMember }) {
  const whatsappHref = buildWhatsappUrl(
    `Olá, ${member.name}! Encontrei seu contato no site da Kubi Imóveis e gostaria de falar com você.`,
  );

  return (
    <div className="rounded-card border border-kubi-gray-200 p-5 text-center">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-kubi-gray-100">
        <Image src={member.photoUrl} alt={`Foto de ${member.name}`} fill sizes="112px" className="object-cover" />
      </div>
      <h3 className="mt-4 font-heading font-semibold text-kubi-black">{member.name}</h3>
      <p className="text-sm text-kubi-gray">{member.role}</p>
      <p className="mt-2 text-xs text-kubi-gray-300">{member.creci}</p>
      <p className="mt-3 text-sm text-kubi-black/80">{member.bio}</p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-semibold text-kubi-orange-dark hover:underline"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}

export default function EquipePage() {
  return (
    <main className="py-10">
      <Container>
        <Breadcrumbs items={[{ name: "Nossa equipe", url: "/equipe" }]} />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
          Nossa equipe
        </h1>
        <p className="mt-3 max-w-2xl text-kubi-gray">
          Atendimento exclusivo começa com as pessoas certas. Conheça quem está por trás
          da Kubi Imóveis.
        </p>

        <h2 className="mt-12 font-heading text-2xl font-semibold text-kubi-black">
          Diretoria
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {directors.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        <h2 className="mt-14 font-heading text-2xl font-semibold text-kubi-black">
          Corretores
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {agents.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </main>
  );
}
