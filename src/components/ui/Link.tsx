import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Wrapper de next/link que abre toda navegação interna em uma nova aba,
 * a pedido do cliente. Ponto único de configuração: para reverter esse
 * comportamento no futuro, basta remover os defaults de target/rel aqui.
 */
type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: ReactNode;
  };

export default function Link({ target = "_blank", rel = "noopener noreferrer", ...props }: Props) {
  return <NextLink target={target} rel={rel} {...props} />;
}
