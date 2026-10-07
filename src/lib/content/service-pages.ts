import type { FaqItem } from "@/components/content/Faq";

export type ServicePageDef = {
  slug: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  intro: string;
  benefits: { title: string; description: string }[];
  steps?: { title: string; description: string }[];
  faq: FaqItem[];
  formType: "contato" | "captacao" | "avaliacao" | "financiamento" | "consorcio";
  formTitle: string;
};

export const servicePages: ServicePageDef[] = [
  {
    slug: "comprar-imovel",
    eyebrow: "Comprar imóvel",
    title: "Comprar imóvel em Brasília com segurança e exclusividade",
    metaDescription:
      "Encontre seu imóvel em Brasília com a Kubi: curadoria de apartamentos e casas à venda no Lago Sul, Lago Norte, Plano Piloto e mais. Atendimento exclusivo.",
    intro:
      "Comprar um imóvel em Brasília envolve muito mais do que encontrar o endereço certo — envolve negociação, documentação e segurança jurídica. A Kubi Imóveis acompanha cada etapa da compra, do primeiro contato à assinatura da escritura, com acesso a oportunidades de alto padrão no Lago Sul, Lago Norte, Plano Piloto, Sudoeste, Noroeste, Park Way, Jardim Botânico e Águas Claras.",
    benefits: [
      {
        title: "Curadoria de imóveis",
        description:
          "Selecionamos apenas imóveis que realmente combinam com o seu perfil e orçamento, evitando visitas e negociações que não levam a lugar nenhum.",
      },
      {
        title: "Análise documental completa",
        description:
          "Vamos além do exigido por lei: checamos matrícula, certidões e situação do vendedor antes de qualquer proposta avançar.",
      },
      {
        title: "Negociação conduzida por especialistas",
        description:
          "Nossa equipe negocia condições, prazos e valores em seu nome, com transparência em cada etapa.",
      },
      {
        title: "Conexão com financiamento e crédito",
        description:
          "Se precisar financiar, conectamos você diretamente à nossa equipe de crédito para condições competitivas junto aos principais bancos.",
      },
    ],
    steps: [
      { title: "Entenda sua necessidade", description: "Conversamos sobre orçamento, região, tipo de imóvel e prazo para entender exatamente o que você procura." },
      { title: "Curadoria de oportunidades", description: "Selecionamos imóveis disponíveis — e também, muitas vezes, oportunidades que ainda não estão publicadas no site." },
      { title: "Visitas e negociação", description: "Agendamos visitas e conduzimos toda a negociação de valores e condições junto ao proprietário." },
      { title: "Documentação e escritura", description: "Acompanhamos a análise documental, o contrato e a escritura até a entrega das chaves." },
    ],
    faq: [
      {
        question: "Quais documentos preciso para comprar um imóvel em Brasília?",
        answer:
          "Para pessoa física, geralmente são necessários RG, CPF, comprovante de residência, comprovante de renda (se houver financiamento) e certidão de estado civil. Do lado do imóvel, verificamos matrícula atualizada, certidões negativas e situação de IPTU. A Kubi monta o checklist completo para o seu caso específico.",
      },
      {
        question: "Quanto custa a escritura e o ITBI no DF?",
        answer:
          "O ITBI (Imposto de Transmissão de Bens Imóveis) no Distrito Federal é calculado sobre o valor de venda ou o valor venal do imóvel (o que for maior) e a escritura tem custo de cartório proporcional ao valor do negócio. Os percentuais e tabelas mudam periodicamente — nossa equipe calcula o valor atualizado antes de você fechar negócio.",
      },
      {
        question: "A Kubi ajuda a conseguir financiamento?",
        answer:
          "Sim. Temos uma área dedicada a financiamento imobiliário e crédito, que conecta você às melhores condições disponíveis nos principais bancos, com simulação e acompanhamento do processo.",
      },
      {
        question: "Quanto tempo leva para comprar um imóvel do zero até a escritura?",
        answer:
          "Depende da forma de pagamento (à vista ou financiado) e da complexidade documental, mas uma compra à vista pode ser concluída em poucas semanas; com financiamento bancário, o prazo médio costuma ficar entre 30 e 60 dias após a aprovação do crédito.",
      },
    ],
    formType: "contato",
    formTitle: "Quero encontrar meu imóvel",
  },
  {
    slug: "anuncie-seu-imovel",
    eyebrow: "Anuncie seu imóvel",
    title: "Anuncie e venda seu imóvel em Brasília com a Kubi",
    metaDescription:
      "Quem compra imóvel rápido em Brasília? Anuncie seu imóvel com a Kubi: captação profissional, fotos, divulgação qualificada e atendimento dedicado.",
    intro:
      "Quem vende imóvel rápido em Brasília é quem conta com captação profissional: fotos de qualidade, anúncio bem escrito, divulgação nos canais certos e um corretor que filtra interessados de verdade. Preencha os dados do seu imóvel abaixo e nossa equipe entra em contato para montar a estratégia de venda ou locação.",
    benefits: [
      { title: "Captação profissional", description: "Visita técnica, fotos de qualidade e redação de anúncio que destaca os diferenciais do seu imóvel." },
      { title: "Divulgação qualificada", description: "Seu imóvel ganha visibilidade no site da Kubi e nos principais canais de divulgação do mercado." },
      { title: "Filtro de interessados", description: "Só levamos até você quem realmente tem potencial de fechar negócio, poupando seu tempo." },
      { title: "Negociação acompanhada", description: "Da proposta à assinatura, nossa equipe conduz a negociação com transparência para as duas partes." },
    ],
    steps: [
      { title: "Conte sobre o imóvel", description: "Preencha o formulário com tipo, bairro, área, quartos e valor pretendido." },
      { title: "Visita de avaliação", description: "Um corretor Kubi visita o imóvel (ou avalia remotamente) para definir a estratégia de preço e divulgação." },
      { title: "Captação e divulgação", description: "Fotos, anúncio e divulgação nos canais da Kubi e parceiros." },
      { title: "Negociação e fechamento", description: "Conduzimos propostas, negociação e documentação até a assinatura." },
    ],
    faq: [
      {
        question: "Quanto custa anunciar meu imóvel com a Kubi?",
        answer:
          "A captação e divulgação não têm custo antecipado para o proprietário — a remuneração da Kubi ocorre apenas quando o negócio é concluído, conforme contrato de intermediação.",
      },
      {
        question: "Preciso ter fotos prontas para anunciar?",
        answer:
          "Não — você pode enviar fotos que já tiver (mesmo do celular) só para uma primeira análise. Para o anúncio final, nossa equipe organiza a produção de fotos de qualidade.",
      },
      {
        question: "Em quanto tempo meu imóvel entra no ar depois de anunciar?",
        answer:
          "Após a visita de avaliação e definição do valor, o anúncio costuma entrar no ar em poucos dias.",
      },
      {
        question: "A Kubi também administra o imóvel depois de alugado?",
        answer:
          "Sim — se o objetivo for locação, a Kubi pode cuidar de toda a administração do contrato depois de encontrado o inquilino. Veja mais em administração de imóveis.",
      },
    ],
    formType: "captacao",
    formTitle: "Quero anunciar meu imóvel",
  },
  {
    slug: "alugar-imovel",
    eyebrow: "Alugar imóvel",
    title: "Alugar imóvel em Brasília com atendimento próximo",
    metaDescription:
      "Apartamentos e casas para alugar em Brasília com a Kubi Imóveis: Asa Norte, Asa Sul, Lago Sul e mais. Processo de locação ágil e transparente.",
    intro:
      "Alugar um imóvel em Brasília com a Kubi é simples: cuidamos da seleção de imóveis, da análise cadastral e da formalização do contrato para que você se mude com tranquilidade — seja um apartamento na Asa Norte, uma casa no Lago Sul ou um imóvel comercial no Plano Piloto.",
    benefits: [
      { title: "Imóveis verificados", description: "Cada imóvel anunciado passa por checagem de documentação antes de ir ao ar." },
      { title: "Garantias locatícias flexíveis", description: "Trabalhamos com as principais modalidades de garantia aceitas no mercado, para agilizar sua aprovação." },
      { title: "Processo 100% acompanhado", description: "Da visita à assinatura do contrato, você tem um corretor dedicado para tirar dúvidas." },
      { title: "Suporte durante todo o contrato", description: "Nossa equipe de administração segue disponível durante toda a locação, não só na assinatura." },
    ],
    faq: [
      {
        question: "Quais garantias locatícias a Kubi aceita?",
        answer:
          "Trabalhamos com as modalidades mais comuns do mercado — fiador, caução (depósito) e seguro-fiança — e orientamos qual delas tende a agilizar mais a aprovação para o seu perfil.",
      },
      {
        question: "Quanto tempo leva para aprovar um cadastro de locação?",
        answer:
          "Com a documentação completa em mãos, a análise cadastral costuma ser concluída em 1 a 3 dias úteis.",
      },
      {
        question: "Posso alugar um imóvel estando fora de Brasília?",
        answer:
          "Sim — conduzimos boa parte do processo (documentação, assinatura digital de contrato) remotamente, mas recomendamos sempre uma visita presencial ou por videochamada antes da assinatura.",
      },
      {
        question: "O que está incluso no valor do aluguel?",
        answer:
          "O valor do aluguel é informado separadamente do condomínio e do IPTU em todos os nossos anúncios, para que não haja surpresas no seu orçamento mensal.",
      },
    ],
    formType: "contato",
    formTitle: "Quero alugar um imóvel",
  },
  {
    slug: "administracao-de-imoveis",
    eyebrow: "Administração de imóveis",
    title: "Administradora de aluguel em Brasília para o seu imóvel",
    metaDescription:
      "Administração de imóveis e gestão de locação em Brasília: cobrança, repasse, vistoria e contratos com a Kubi Imóveis. Peça uma proposta.",
    intro:
      "Quem administra aluguel no Lago Sul e nas principais regiões de Brasília precisa resolver cobrança, repasse, vistoria, contratos, manutenção e garantias — tudo isso com agilidade para o proprietário e para o inquilino. É exatamente isso que o time de administração da Kubi faz todos os dias, para que seu imóvel gere renda sem gerar dor de cabeça.",
    benefits: [
      { title: "Cobrança e repasse pontuais", description: "Acompanhamento de boletos, juros e repasse do aluguel na data certa, com extrato claro." },
      { title: "Vistoria de entrada e saída", description: "Registro fotográfico detalhado para evitar divergências ao final do contrato." },
      { title: "Contratos revisados juridicamente", description: "Cláusulas claras sobre reajuste, garantias e responsabilidades de cada parte." },
      { title: "Suporte para manutenção", description: "Intermediamos solicitações de manutenção e reparos, preservando o valor do seu imóvel." },
    ],
    faq: [
      {
        question: "Como funciona a administração de aluguel na Kubi?",
        answer:
          "Cuidamos da divulgação, seleção de inquilinos, contrato, cobrança mensal, repasse ao proprietário, vistorias e suporte durante toda a locação — você acompanha tudo com extratos e contato direto com nossa equipe.",
      },
      {
        question: "Quais garantias locatícias vocês aceitam para novos inquilinos?",
        answer:
          "Fiador, caução e seguro-fiança são as modalidades mais usadas. Avaliamos o perfil de cada candidato para recomendar a garantia mais adequada, sempre priorizando a segurança do proprietário.",
      },
      {
        question: "O que acontece se o inquilino atrasar o aluguel?",
        answer:
          "Nossa equipe realiza a cobrança ativa desde o primeiro dia de atraso, seguindo o que está previsto em contrato, para resolver a situação da forma mais rápida possível para o proprietário.",
      },
      {
        question: "Quanto custa a administração de um imóvel?",
        answer:
          "O percentual de administração varia conforme o tipo de imóvel e os serviços incluídos. Fale com a Kubi para receber uma proposta personalizada para o seu caso.",
      },
    ],
    formType: "contato",
    formTitle: "Quero administrar meu imóvel com a Kubi",
  },
  {
    slug: "intermediacao-imobiliaria",
    eyebrow: "Intermediação e assessoria",
    title: "Intermediação imobiliária e assessoria documental em Brasília",
    metaDescription:
      "Assessoria documental completa em negociações imobiliárias em Brasília. A Kubi analisa cada detalhe para garantir segurança jurídica ao seu negócio.",
    intro:
      "Todo negócio imobiliário envolve risco documental — e é justamente aí que a Kubi mais agrega valor. Nossa assessoria vai além do que a lei exige: revisamos matrícula, ônus, certidões e cláusulas contratuais para que compradores, vendedores, locadores e locatários fechem negócio com segurança.",
    benefits: [
      { title: "Due diligence completa", description: "Checagem de matrícula, ônus reais, certidões pessoais e fiscais de todas as partes envolvidas." },
      { title: "Revisão de contratos", description: "Cláusulas de preço, prazo, multas e garantias revisadas antes da assinatura." },
      { title: "Mediação entre as partes", description: "Conduzimos a negociação com transparência, evitando ruídos entre comprador e vendedor ou locador e locatário." },
      { title: "Acompanhamento até o registro", description: "Seguimos com você até o registro em cartório, não só até a assinatura do contrato." },
    ],
    faq: [
      {
        question: "O que é intermediação imobiliária, exatamente?",
        answer:
          "É o serviço de conectar e assessorar as partes de um negócio imobiliário — compra, venda ou locação — cuidando da negociação, da documentação e da formalização do contrato.",
      },
      {
        question: "Por que contratar assessoria documental se já existe um contrato pronto?",
        answer:
          "Porque um contrato só é tão seguro quanto a documentação por trás dele. Já evitamos negócios problemáticos identificando pendências em matrícula, processos judiciais e dívidas do imóvel antes da assinatura.",
      },
      {
        question: "A Kubi atua em negócios entre particulares, sem imóvel anunciado no site?",
        answer:
          "Sim, oferecemos assessoria mesmo quando o imóvel já foi encontrado por conta própria — fale com nossa equipe para entender como podemos ajudar no seu caso.",
      },
    ],
    formType: "contato",
    formTitle: "Quero assessoria para o meu negócio",
  },
  {
    slug: "financiamento-imobiliario",
    eyebrow: "Financiamento e crédito",
    title: "Financiamento imobiliário em Brasília: condições e simulação",
    metaDescription:
      "Financiamento imobiliário em Brasília com a Kubi: encontramos as melhores condições de crédito junto aos principais bancos para o seu imóvel.",
    intro:
      "Financiar um imóvel é uma decisão de longo prazo — e pequenas diferenças de taxa fazem enorme diferença no total pago ao final do contrato. A equipe de crédito da Kubi, liderada por quem vive o mercado financeiro de Brasília, ajuda você a comparar instituições e condições antes de assinar qualquer proposta.",
    benefits: [
      { title: "Comparação entre bancos", description: "Levantamos condições em diferentes instituições para encontrar a melhor taxa para o seu perfil." },
      { title: "Simulação sem compromisso", description: "Simule o financiamento do imóvel de interesse antes de iniciar o processo formal de crédito." },
      { title: "Acompanhamento da aprovação", description: "Ajudamos a organizar a documentação exigida pelo banco para evitar atrasos na aprovação." },
      { title: "Integração com a compra", description: "O financiamento é conduzido junto com a negociação do imóvel, sem perda de tempo entre as etapas." },
    ],
    faq: [
      {
        question: "Quais documentos são necessários para financiar um imóvel?",
        answer:
          "Em geral: documentos pessoais, comprovante de renda dos últimos meses, declaração de Imposto de Renda e extratos bancários. Bancos podem solicitar itens adicionais conforme o perfil de crédito.",
      },
      {
        question: "Qual o valor mínimo de entrada para financiar?",
        answer:
          "Costuma variar entre 10% e 30% do valor do imóvel, dependendo do banco, do programa de financiamento e da análise de crédito do comprador.",
      },
      {
        question: "A Kubi cobra alguma taxa para ajudar no financiamento?",
        answer:
          "Converse com nossa equipe de crédito para entender as condições do nosso serviço de assessoria — isso é esclarecido antes de qualquer etapa do processo.",
      },
    ],
    formType: "financiamento",
    formTitle: "Quero simular meu financiamento",
  },
  {
    slug: "consorcio-imobiliario",
    eyebrow: "Consórcio imobiliário",
    title: "Consórcio imobiliário: alternativa sem juros para comprar seu imóvel",
    metaDescription:
      "Consórcio imobiliário em Brasília com a Kubi: planejamento sem juros para conquistar seu imóvel. Entenda como funciona e simule sua carta de crédito.",
    intro:
      "Para quem pode planejar a compra com mais tempo, o consórcio imobiliário é uma alternativa sem juros ao financiamento tradicional — só taxa de administração. A Kubi orienta sobre cartas de crédito, prazos e estratégias de lance para acelerar a contemplação.",
    benefits: [
      { title: "Sem juros", description: "Diferente do financiamento, o consórcio cobra apenas taxa de administração, não juros sobre o saldo devedor." },
      { title: "Parcelas planejadas", description: "Você escolhe o valor da carta de crédito e o prazo que cabe no seu orçamento." },
      { title: "Estratégias de lance", description: "Orientamos sobre lances livres e embutidos para aumentar as chances de contemplação antecipada." },
      { title: "Uso flexível", description: "A carta de crédito pode ser usada para comprar, construir ou reformar um imóvel." },
    ],
    faq: [
      {
        question: "Qual a diferença entre consórcio e financiamento imobiliário?",
        answer:
          "No financiamento, o banco empresta o dinheiro e cobra juros desde o início. No consórcio, um grupo de pessoas contribui mensalmente e, por sorteio ou lance, alguém é contemplado com a carta de crédito a cada mês — sem cobrança de juros, apenas taxa de administração.",
      },
      {
        question: "Quanto tempo leva para ser contemplado em um consórcio?",
        answer:
          "Pode acontecer já no primeiro mês (por sorteio ou lance) ou apenas perto do fim do grupo. Por isso, o consórcio é mais indicado para quem tem flexibilidade de prazo na compra do imóvel.",
      },
      {
        question: "Posso usar o FGTS no consórcio imobiliário?",
        answer:
          "Em muitos casos sim, tanto para complementar um lance quanto para amortizar o saldo devedor após a contemplação, seguindo as regras vigentes da Caixa Econômica Federal.",
      },
    ],
    formType: "consorcio",
    formTitle: "Quero entender o consórcio imobiliário",
  },
  {
    slug: "avaliacao-de-imovel",
    eyebrow: "Avaliação de imóvel",
    title: "Avaliação gratuita de imóvel em Brasília: quanto vale o seu?",
    metaDescription:
      "Avaliação gratuita de imóvel em Brasília com a Kubi. Descubra quanto vale seu imóvel no Lago Sul, Lago Norte, Plano Piloto e demais regiões do DF.",
    intro:
      "\"Quanto vale meu imóvel?\" é a pergunta que mais recebemos de quem está pensando em vender, alugar ou simplesmente entender seu patrimônio. A avaliação da Kubi cruza dados de mercado da região com as características específicas do seu imóvel para chegar a uma faixa de valor realista — sem compromisso.",
    benefits: [
      { title: "Totalmente gratuita", description: "Você recebe a avaliação sem custo e sem compromisso de fechar negócio com a Kubi." },
      { title: "Baseada em dados reais do mercado", description: "Cruzamos o histórico de negociações da região com as características do seu imóvel." },
      { title: "Criteriosa", description: "Levamos em conta estado de conservação, posição solar, vista, infraestrutura do condomínio e muito mais." },
      { title: "Sem enrolação", description: "Retorno objetivo, em linguagem simples, com os próximos passos caso você queira vender ou alugar." },
    ],
    faq: [
      {
        question: "Quanto custa a avaliação de imóvel da Kubi?",
        answer: "A avaliação é totalmente gratuita e sem compromisso.",
      },
      {
        question: "Quanto tempo leva para receber o resultado da avaliação?",
        answer:
          "Normalmente retornamos em até 2 dias úteis após o recebimento das informações do imóvel, podendo variar conforme a necessidade de visita presencial.",
      },
      {
        question: "A avaliação da Kubi serve para qualquer finalidade (venda, herança, divórcio)?",
        answer:
          "A avaliação de mercado da Kubi é voltada para apoiar decisões de venda, locação ou gestão de patrimônio. Para fins jurídicos específicos (judiciais, inventário), recomendamos um laudo de avaliação formal, assinado por profissional habilitado.",
      },
    ],
    formType: "avaliacao",
    formTitle: "Quero saber quanto vale meu imóvel",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}
