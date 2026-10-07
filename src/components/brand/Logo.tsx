import { KubiSymbol } from "./KubiSymbol";

type LogoProps = {
  className?: string;
  /** "dark" = texto escuro (uso sobre fundos claros). "light" = texto branco (uso sobre fundos escuros/pretos). */
  tone?: "dark" | "light";
  /** "horizontal" para header/footer. "stacked" para capas e materiais. */
  layout?: "horizontal" | "stacked";
  showWordmark?: boolean;
};

/** Logotipo completo da Kubi Imóveis (símbolo + wordmark), tema claro/escuro. */
export function Logo({
  className,
  tone = "dark",
  layout = "horizontal",
  showWordmark = true,
}: LogoProps) {
  const textColor = tone === "dark" ? "text-kubi-black" : "text-kubi-white";
  const isStacked = layout === "stacked";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${
        isStacked ? "flex-col text-center" : "flex-row"
      } ${className ?? ""}`}
    >
      <KubiSymbol
        className={isStacked ? "h-12 w-12 shrink-0" : "h-8 w-8 shrink-0"}
        strokeColor={tone === "dark" ? "#000000" : "#FFFFFF"}
      />
      {showWordmark && (
        <span className={`font-heading leading-none ${textColor}`}>
          <span
            className={isStacked ? "text-2xl font-semibold" : "text-xl font-semibold"}
          >
            Kubi
          </span>
          <span className="block text-[0.55em] font-medium tracking-[0.2em] text-kubi-orange uppercase">
            imóveis
          </span>
        </span>
      )}
    </span>
  );
}
