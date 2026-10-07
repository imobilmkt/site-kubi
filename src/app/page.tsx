import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-kubi-white px-6 py-24 text-center">
      <Logo layout="stacked" tone="dark" />
      <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
        {siteConfig.slogan}
      </h1>
      <p className="max-w-xl text-kubi-gray">{siteConfig.description}</p>
    </main>
  );
}
