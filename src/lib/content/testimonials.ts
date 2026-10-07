/**
 * Depoimentos de clientes. TODOS os itens abaixo são placeholders — ver
 * README § Lista de [PREENCHER]. Substitua por depoimentos reais (com
 * autorização do cliente) antes do lançamento.
 */
export type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "[PREENCHER: depoimento real sobre a experiência de compra/venda com a Kubi]",
    author: "[PREENCHER NOME]",
    context: "Comprou um imóvel no Lago Sul",
  },
  {
    quote: "[PREENCHER: depoimento real sobre a administração de locação]",
    author: "[PREENCHER NOME]",
    context: "Proprietário — administração de aluguel",
  },
  {
    quote: "[PREENCHER: depoimento real sobre o processo de financiamento]",
    author: "[PREENCHER NOME]",
    context: "Comprou um imóvel no Noroeste",
  },
];
