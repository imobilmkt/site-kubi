type KubiSymbolProps = {
  className?: string;
  /** Cor das quatro "tesourinhas". Padrão: herda de currentColor. */
  strokeColor?: string;
  /** Cor do brilho central. Padrão: laranja da marca. */
  sparkColor?: string;
};

/**
 * Símbolo da Kubi Imóveis: quatro "tesourinhas" (cruzamentos viários de
 * Brasília) dispostas em pinwheel ao redor de um brilho de quatro pontas —
 * referência ao cubo/espaço habitável e à arquitetura modernista da cidade.
 *
 * Recriado em SVG (vetorial) a partir do manual da marca para permitir
 * nitidez em qualquer tamanho e recolorização via props/currentColor.
 */
export function KubiSymbol({
  className,
  strokeColor = "currentColor",
  sparkColor = "#FF751F",
}: KubiSymbolProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Símbolo Kubi Imóveis"
    >
      <g fill="none" stroke={strokeColor} strokeWidth="7" strokeLinecap="round">
        {/* Quatro tesourinhas, uma por quadrante, rotacionadas 90° entre si */}
        <g transform="translate(50,50)">
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path d="M -4,-10 C -14,-20 -22,-26 -34,-30" />
              <path d="M -4,-10 C -8,-22 -8,-32 -6,-44" />
              <path d="M -4,-10 L -18,-24" />
            </g>
          ))}
        </g>
      </g>
      {/* Brilho central de quatro pontas */}
      <path
        d="M50,38 C51.5,45 55,48.5 62,50 C55,51.5 51.5,55 50,62 C48.5,55 45,51.5 38,50 C45,48.5 48.5,45 50,38 Z"
        fill={sparkColor}
      />
    </svg>
  );
}
