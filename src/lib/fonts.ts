/**
 * Ponto único de configuração tipográfica do site.
 *
 * A marca Kubi usa "Agrandir Grand" (fonte licenciada da Pangram Pangram) nos
 * títulos. O arquivo da fonte não está disponível em ./brand/fonts, então
 * usamos "Unbounded" (Google Fonts) como alternativa gratuita de visual
 * semelhante: larga, geométrica e moderna. Para o corpo de texto usamos
 * "Inter".
 *
 * Caso a fonte licenciada seja adquirida no futuro, troque apenas este
 * arquivo: adicione os arquivos em /public/fonts, declare com next/font/local
 * e exporte as mesmas variáveis (--font-heading / --font-body) para que
 * nenhum outro arquivo do projeto precise mudar.
 */
import { Inter, Unbounded } from "next/font/google";

export const headingFont = Unbounded({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
