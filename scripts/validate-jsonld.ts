/**
 * Validação estrutural dos builders de JSON-LD (src/lib/seo/jsonld.ts).
 * Não é um validador completo de schema.org (para isso, use o Rich Results
 * Test do Google após o deploy) — mas garante que cada builder produz um
 * objeto bem formado, com os campos obrigatórios que usamos, e falha o
 * build/CI se alguém quebrar isso sem perceber.
 *
 * Rodar com: npm run validate:jsonld
 */
import {
  organizationJsonLd,
  realEstateAgentJsonLd,
  websiteJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  propertyJsonLd,
} from "../src/lib/seo/jsonld";
import { mockProperties } from "../src/lib/properties/mock-data";

type Check = { label: string; pass: boolean; detail?: string };

const checks: Check[] = [];

function assert(label: string, condition: unknown, detail?: string) {
  checks.push({ label, pass: Boolean(condition), detail });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// --- Organization ---
const org = organizationJsonLd();
assert("Organization: @context", org["@context"] === "https://schema.org");
assert("Organization: @type", org["@type"] === "Organization");
assert("Organization: name", isNonEmptyString(org.name));
assert("Organization: url", isNonEmptyString(org.url));
assert("Organization: sameAs é array", Array.isArray(org.sameAs));

// --- RealEstateAgent / LocalBusiness ---
const biz = realEstateAgentJsonLd();
assert("RealEstateAgent: @type inclui RealEstateAgent e LocalBusiness", Array.isArray(biz["@type"]) && (biz["@type"] as string[]).includes("RealEstateAgent") && (biz["@type"] as string[]).includes("LocalBusiness"));
assert("RealEstateAgent: name", isNonEmptyString(biz.name));
assert("RealEstateAgent: address.streetAddress", isNonEmptyString(biz.address?.streetAddress));
assert("RealEstateAgent: geo.latitude/longitude são number", typeof biz.geo?.latitude === "number" && typeof biz.geo?.longitude === "number");
assert("RealEstateAgent: identifier CRECI-DF", biz.identifier?.name === "CRECI-DF" && isNonEmptyString(biz.identifier?.value));
assert("RealEstateAgent: openingHoursSpecification não vazio", Array.isArray(biz.openingHoursSpecification) && biz.openingHoursSpecification.length > 0);

// --- WebSite ---
const site = websiteJsonLd();
assert("WebSite: potentialAction.target contém {search_term_string}", isNonEmptyString(site.potentialAction?.target) && site.potentialAction.target.includes("{search_term_string}"));

// --- BreadcrumbList ---
const crumbs = breadcrumbJsonLd([
  { name: "Imóveis", url: "/imoveis" },
  { name: "Lago Sul", url: "/imoveis/venda/casa/lago-sul" },
]);
assert("BreadcrumbList: @type", crumbs["@type"] === "BreadcrumbList");
assert(
  "BreadcrumbList: cada item tem position numérica e item com URL absoluta",
  crumbs.itemListElement.every(
    (item) => typeof item.position === "number" && isNonEmptyString(item.item) && item.item.startsWith("http"),
  ),
);

// --- FAQPage ---
const faq = faqJsonLd([{ question: "Pergunta?", answer: "Resposta." }]);
assert("FAQPage: @type", faq["@type"] === "FAQPage");
assert(
  "FAQPage: mainEntity com Question/Answer",
  faq.mainEntity.every((q) => q["@type"] === "Question" && q.acceptedAnswer?.["@type"] === "Answer"),
);

// --- Property (Residence/Offer) ---
if (mockProperties.length === 0) {
  assert("Property: existe ao menos 1 imóvel mock para validar", false);
} else {
  for (const property of mockProperties.slice(0, 3)) {
    const ld = propertyJsonLd(property, `https://example.com/imoveis/venda/${property.type}/${property.address.neighborhoodSlug}/${property.slug}`);
    assert(`Property ${property.code}: @type definido`, isNonEmptyString(ld["@type"]));
    assert(`Property ${property.code}: name`, isNonEmptyString(ld.name));
    assert(`Property ${property.code}: offers.priceCurrency = BRL`, ld.offers.priceCurrency === "BRL");
    assert(`Property ${property.code}: offers.availability é URL schema.org`, isNonEmptyString(ld.offers.availability) && ld.offers.availability.startsWith("https://schema.org/"));
    assert(`Property ${property.code}: image é array não vazio`, Array.isArray(ld.image) && ld.image.length > 0);
  }
}

// --- Relatório ---
const failed = checks.filter((c) => !c.pass);
for (const check of checks) {
  console.log(`${check.pass ? "✅" : "❌"} ${check.label}${check.detail ? ` — ${check.detail}` : ""}`);
}

console.log(`\n${checks.length - failed.length}/${checks.length} verificações passaram.`);

if (failed.length > 0) {
  console.error(`\n${failed.length} verificação(ões) de JSON-LD falharam.`);
  process.exit(1);
}
