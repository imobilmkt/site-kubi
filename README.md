# Kubi Imóveis — site institucional e portal de imóveis

Site da Kubi Imóveis (Brasília/DF), construído em Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4, com arquitetura de dados pronta para a futura
integração com o CRM Nidotec.

## Stack

- **Next.js 16** (App Router, Cache Components/PPR) + **TypeScript**
- **Tailwind CSS v4** (tokens da marca em `src/app/globals.css`)
- **zod + react-hook-form** para formulários, com honeypot + Cloudflare Turnstile
- **MDX** (`next-mdx-remote/rsc` + `remark-gfm`) para o blog
- **Leaflet / OpenStreetMap** para os mapas (carregado sob demanda, client-side)
- Deploy previsto na **Vercel**

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha o que puder (veja seção de variáveis abaixo)
npm run dev
```

Abra http://localhost:3000.

Scripts disponíveis:

| Script | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run validate:jsonld` | Valida estruturalmente os builders de JSON-LD (`scripts/validate-jsonld.ts`) |

## Variáveis de ambiente

Veja `.env.example` para a lista completa com comentários. Resumo:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (metadata, sitemap, JSON-LD) |
| `PROPERTY_PROVIDER` | `mock` (padrão) ou `nidotec` — ver seção Nidotec abaixo |
| `NIDOTEC_API_BASE_URL`, `NIDOTEC_API_TOKEN`, `NIDOTEC_FEED_URL` | Integração com o CRM Nidotec (preencher quando a documentação chegar) |
| `REVALIDATE_TOKEN` | Token do endpoint `POST /api/revalidate`, chamado pelo CRM |
| `NEXT_PUBLIC_GTM_ID` | ID do Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Só para referência — a implementação de fato é feita dentro do próprio GTM |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Meta tag de verificação do Search Console |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (anti-spam dos formulários). Sem essas chaves, os formulários continuam funcionando protegidos só pelo honeypot |
| `LEADS_WEBHOOK_URL` | URL (seu CRM, Zapier, Make etc.) para onde todo lead enviado pelos formulários é encaminhado via `POST` JSON |
| `LEADS_EMAIL_TO` | Reservado para quando um envio de e-mail for configurado (ver TODO abaixo) |

**TODO de e-mail**: hoje `/api/leads` encaminha cada lead para `LEADS_WEBHOOK_URL`
(ou só loga no servidor, se a variável não estiver definida). Não há envio de
e-mail transacional configurado — se quiser isso além do webhook, adicione um
provedor (ex: Resend) em `src/app/api/leads/route.ts`.

## Arquitetura de dados de imóveis (pronta para o Nidotec)

- `src/lib/properties/types.ts` — modelo de dados (`Property`) estável. Toda a
  camada de apresentação (listagens, página do imóvel, SEO/JSON-LD) consome
  só esse tipo — nunca o formato bruto de uma fonte específica.
- `src/lib/properties/provider.ts` — interface `PropertyProvider`
  (Repository/Adapter): `list`, `getBySlug`, `getByCode`, `listFeatured`,
  `listSimilar`, `listAll`.
- `src/lib/properties/mock-provider.ts` + `mock-data.ts` — provider ativo por
  padrão, com 20 imóveis **fictícios** (`isFictional: true`) de Brasília.
- `src/lib/properties/nidotec-provider.ts` — **esqueleto** do provider real.
  Todos os métodos lançam erro "não implementado" — não há nenhum endpoint
  inventado. Cada método tem um comentário `TODO(integração Nidotec)`
  explicando o que fazer quando a documentação da API chegar.
- `src/lib/properties/index.ts` — fábrica que escolhe o provider via
  `PROPERTY_PROVIDER` (env) e expõe funções cacheadas (`'use cache'` +
  `cacheTag`/`cacheLife('hours')`) usadas pelo resto do app.

### Como ligar a Nidotec quando a documentação chegar

1. Abra `src/lib/properties/nidotec-provider.ts`.
2. Implemente `mapNidotecPropertyToProperty` — o único lugar que deve conhecer
   o formato bruto da Nidotec, mapeando campo a campo para o tipo `Property`.
3. Implemente os métodos de `NidotecProvider` (`list`, `getBySlug` etc.),
   usando `fetch` com `next: { revalidate: 3600, tags: ["properties"] }` (REST)
   ou um parser de feed XML (se for esse o formato — a interface já foi
   desenhada para suportar os dois).
4. Rode `npm run validate:jsonld` depois de mapear um imóvel real, para
   garantir que o schema.org gerado continua válido.
5. Defina `PROPERTY_PROVIDER=nidotec` e as variáveis `NIDOTEC_*` no ambiente.
6. Configure o CRM para chamar `POST /api/revalidate` (`Authorization: Bearer
   $REVALIDATE_TOKEN`) sempre que um imóvel for criado/alterado/removido —
   isso revalida sob demanda a página do imóvel, as listagens e o sitemap. Há
   também uma revalidação periódica de segurança a cada 1h, mesmo sem chamada.

### Por que imóvel vendido/alugado não dá 404

Ver `src/app/(site)/imoveis/[finalidade]/[tipo]/[bairro]/[slug]/page.tsx`
(função `resolveProperty`, com o raciocínio comentado no código):

- Imóvel existe mas foi **vendido/alugado**: a página continua no ar, com um
  aviso de indisponibilidade + imóveis semelhantes (`noindex, follow` —
  preserva o link e eventuais backlinks, mas não compete por posição no
  Google).
- **Slug não existe** (imóvel removido do feed): redirect 301 para a
  listagem da mesma finalidade/tipo/bairro pedida na URL.
- **Segmentos da URL não batem com o imóvel** (ex.: tipo errado): redirect
  301 para a URL canônica do imóvel.

## Como publicar um post no blog

Os posts ficam em `src/content/blog/*.mdx`. Para criar um novo:

1. Crie um arquivo `meu-post.mdx` nessa pasta.
2. Preencha o frontmatter (todos os campos são obrigatórios):

   ```mdx
   ---
   title: "Título do post"
   description: "Descrição para SEO (até ~155 caracteres)"
   date: "2026-06-01"
   category: "comprar" # ver src/lib/blog/categories.ts para as opções
   coverImage: "https://images.unsplash.com/photo-..."
   coverImageAlt: "Texto alternativo descritivo da imagem"
   author: "Equipe Kubi Imóveis"
   ---

   Conteúdo em Markdown normal aqui. Tabelas, listas e links funcionam.
   ```

3. Pronto — o post aparece automaticamente em `/blog`, em
   `/blog/categoria/[categoria]` e no sitemap, sem precisar mexer em código.

## Como trocar fotos e textos

- **Fotos de imóveis (mock)**: `src/lib/properties/mock-data.ts` — troque a
  URL em cada chamada `photo(...)`.
- **Fotos de bairro**: `src/lib/properties/neighborhood-images.ts`.
- **Textos institucionais** (Sobre, Missão/Visão/Valores, SSS): direto em
  `src/app/(site)/sobre/page.tsx`.
- **Equipe**: `src/lib/content/team.ts`.
- **Depoimentos**: `src/lib/content/testimonials.ts`.
- **Textos de serviço/FAQ por serviço**: `src/lib/content/service-pages.ts`.
- **FAQ geral**: `src/lib/content/general-faq.ts`.
- **Logo/símbolo**: `src/components/brand/Logo.tsx` e `KubiSymbol.tsx` (SVG
  inline, recriado a partir do manual da marca — ver nota sobre fontes
  abaixo).
- **Fonte de títulos**: ver `src/lib/fonts.ts`. A marca usa "Agrandir Grand"
  (licenciada), que não estava disponível em `./brand/fonts`; está sendo
  usada a alternativa gratuita "Unbounded". Se a fonte licenciada for
  adquirida, troque apenas esse arquivo (use `next/font/local`) — nenhum
  outro arquivo do projeto precisa mudar.

## Eventos de conversão (dataLayer)

Implementados em `src/lib/analytics/dataLayer.ts`. Use esta lista para
configurar as tags/gatilhos no GA4, Google Ads e Meta Pixel (via GTM):

| Evento | Quando dispara | Payload principal |
|---|---|---|
| `form_submit` | Qualquer formulário enviado com sucesso | `form_type`: `contato`\|`visita`\|`captacao`\|`avaliacao`\|`trabalhe_conosco`\|`financiamento`\|`consorcio`; `page` |
| `whatsapp_click` | Clique em qualquer botão/link de WhatsApp | `property_code` (quando aplicável), `click_context` |
| `phone_click` | Clique em link `tel:` | `click_context` |
| `email_click` | Clique em link `mailto:` | `click_context` |
| `property_view` | Visualização da página de um imóvel | `property_code`, `property_purpose`, `property_type`, `property_neighborhood`, `property_price` |

Além disso:

- **UTMs e click IDs** (`utm_source`, `utm_medium`, `utm_campaign`,
  `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`, `fbclid`) são
  capturados no primeiro acesso (`src/lib/analytics/attribution.ts`) e
  anexados a todo lead enviado via `/api/leads` — use isso para alimentar
  conversões offline no Google Ads e a API de Conversões da Meta.
- **Consent Mode v2**: consentimento começa como `denied` (ver
  `src/lib/analytics/consent.ts`), e só muda para `granted` quando a pessoa
  aceita o banner de cookies. Configure os gatilhos de tag no próprio GTM
  para respeitar esses sinais de consentimento.
- **Enhanced Conversions**: os dados dos formulários (nome, e-mail, telefone)
  já chegam ao `dataLayer` via `form_submit` — falta fazer o hash (SHA-256)
  e configurar isso no Google Ads, respeitando o consentimento.

## Checklist pós-lançamento

- [ ] Preencher todos os `[PREENCHER]` (lista completa abaixo)
- [ ] Trocar `PROPERTY_PROVIDER=mock` por `nidotec` quando a integração estiver pronta
- [ ] Google Search Console: verificar o domínio e enviar `/sitemap.xml`
- [ ] Configurar `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- [ ] Criar o container do GTM e configurar `NEXT_PUBLIC_GTM_ID`
- [ ] No GTM: configurar tags do GA4, Google Ads (conversões) e Meta Pixel,
      usando os eventos documentados acima
- [ ] Configurar Enhanced Conversions no Google Ads
- [ ] Gerar chaves do Cloudflare Turnstile e preencher
      `TURNSTILE_SECRET_KEY`/`NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] Definir `LEADS_WEBHOOK_URL` (ou implementar envio de e-mail)
- [ ] Gerar um `REVALIDATE_TOKEN` forte e configurar o CRM para chamá-lo
- [ ] Google Meu Negócio: apontar o site e o link "como chegar" para o domínio final
- [ ] Rodar o Rich Results Test do Google nas páginas principais (home, um
      imóvel, um post do blog) e `npm run validate:jsonld`
- [ ] Lighthouse mobile em produção (home, listagem, imóvel, blog) — ver
      metas na seção abaixo
- [ ] Revisão jurídica da Política de Privacidade e dos Termos de Uso

## Lista completa de [PREENCHER]

### Dados institucionais (`src/config/site.ts`)
- Domínio (`domain`) — site hoje só publicado no domínio padrão da Vercel
~~Telefone, WhatsApp, e-mail, CRECI-DF, Instagram, horário de atendimento, endereço, link do Google Meu Negócio e coordenadas exatas~~ — preenchidos.

### Equipe (`src/lib/content/team.ts`, `src/lib/properties/mock-data.ts`)
- CRECI individual de cada diretora (Ingrid Eing, Cleia, Luana de Paula) e de cada corretor
- Nome, CRECI, foto e bio dos corretores reais da equipe (hoje são 3 nomes fictícios de exemplo: Rafael Moura, Beatriz Aquino e um terceiro em branco)
- Fotos reais da equipe (hoje são fotos de banco de imagens)

### Depoimentos (`src/lib/content/testimonials.ts`)
- Todos os 6 depoimentos são placeholders — substituir por depoimentos reais, com autorização do cliente

### Números/credibilidade (`src/components/home/StatsSection.tsx`)
- Quantidade de imóveis administrados, negócios fechados, anos de experiência, clientes satisfeitos

### Legal
- Data de "última atualização" da Política de Privacidade, Termos de Uso e Política de Cookies
- Revisão jurídica completa dos 3 textos antes de publicar (incluem um aviso nesse sentido no rodapé de cada página)

### Imóveis
- Todo o conteúdo de `src/lib/properties/mock-data.ts` é fictício
  (`isFictional: true`) — será substituído pelos dados reais assim que a
  integração com a Nidotec estiver no ar

### Fonte da marca
- Arquivo da fonte "Agrandir Grand" (ver `src/lib/fonts.ts`) — hoje usando "Unbounded" como alternativa gratuita

## Build, lint e Lighthouse

```bash
npm run build
npm run lint
npm run validate:jsonld
```

Resultados da última rodada (Lighthouse mobile, `next start` local —
`npm run build && npm run start`, throttling simulado, sem cache de CDN):

| Página | Performance | Acessibilidade | Boas Práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 93 | 97 | 100 | 100 | 3,2s | 0 | 10ms |
| Listagem (`/imoveis/venda/casa/lago-sul`) | 98 | 97 | 100 | 100 | 2,5s | 0 | 10ms |
| Imóvel (`/imoveis/.../casa-5-suites-lago-sul-qi-11-KB1001`) | 91 | 97 | 100 | 100 | 3,4s | 0 | 10ms |
| Blog (post) | 94 | 96 | 100 | 100 | 3,1s | 0 | 10ms |

Boas Práticas e SEO em 100 em todas; CLS e TBT (proxy de INP) bem abaixo
das metas (<0,1 e <200ms) em todas. Acessibilidade 96–97: o único item
restante é o texto "imóveis" do logotipo (laranja puro `#FF751F` sobre
branco, ~2,7:1) — a WCAG 2.1 SC 1.4.3 isenta texto de logotipo/marca do
contraste mínimo, então foi mantido fiel ao manual da marca em vez de
alterar a cor oficial.

Performance abaixo de 95 em Home/Imóvel: o LCP (maior elemento visível)
nessas páginas é uma foto do Unsplash, buscada através do otimizador de
imagens do Next.js a partir de um link externo — isso soma uma latência
de rede que não existe quando as fotos são hospedadas no próprio domínio
ou numa CDN de imagens dedicada. Depois de trocar as fotos placeholder
pelas fotos reais dos imóveis (ver seção "Como trocar fotos e textos") e
medir num deploy real na Vercel (CDN de borda, HTTP/2, sem o custo do
`next start` local), o LCP tende a cair substancialmente. Se ainda assim
ficar acima da meta, considere pré-otimizar as fotos antes do upload
(AVIF/WebP, ≤1920px de largura) em vez de depender só da otimização em
tempo de requisição.
