import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Layout do site institucional/portal: header com navegação completa + rodapé com sitemap. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
