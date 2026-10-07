/**
 * Equipe exibida em /equipe. Diretoria com dados reais (ver src/config/site.ts
 * para nomes/funções); fotos, CRECI individual e WhatsApp direto são
 * placeholders — ver README § Lista de [PREENCHER].
 */
export type TeamMember = {
  name: string;
  role: string;
  creci: string;
  whatsapp: string;
  photoUrl: string;
  bio: string;
};

export const directors: TeamMember[] = [
  {
    name: "Ingrid Eing",
    role: "Diretora — Administrativo, Locação, Consórcio e Jurídico",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Responsável pela administração de locação, consórcio e pela área jurídica da Kubi, Ingrid garante que cada contrato e cada detalhe documental estejam impecáveis.",
  },
  {
    name: "Cleia",
    role: "Diretora — Comercial e Equipe de Vendas",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    bio: "Lidera a equipe comercial da Kubi, conduzindo a estratégia de vendas e o atendimento a quem busca comprar um imóvel de alto padrão em Brasília.",
  },
  {
    name: "Luana de Paula",
    role: "Diretora — Financiamento",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    bio: "À frente da área de financiamento e crédito, ajuda cada cliente a encontrar as melhores condições para viabilizar a compra do imóvel.",
  },
];

/** Corretores — dados fictícios de exemplo, substituir pela equipe real. */
export const agents: TeamMember[] = [
  {
    name: "Rafael Moura",
    role: "Corretor de imóveis",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Especialista em imóveis residenciais no Plano Piloto e Sudoeste.",
  },
  {
    name: "Beatriz Aquino",
    role: "Corretora de imóveis",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Atende o Lago Sul e o Lago Norte, com foco em imóveis de alto padrão.",
  },
  {
    name: "[PREENCHER NOME]",
    role: "Corretor(a) de imóveis",
    creci: "CRECI-DF [PREENCHER]",
    whatsapp: "556100000000",
    photoUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    bio: "[PREENCHER: mini biografia do corretor]",
  },
];
