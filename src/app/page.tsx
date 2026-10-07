import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold text-kubi-black sm:text-4xl">
        {siteConfig.slogan}
      </h1>
      <p className="max-w-xl text-kubi-gray">{siteConfig.description}</p>
    </main>
  );
}
