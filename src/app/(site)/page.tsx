import { Hero } from "@/components/home/Hero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { NeighborhoodShowcase } from "@/components/home/NeighborhoodShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SssSection } from "@/components/home/SssSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <FeaturedProperties />
      <NeighborhoodShowcase />
      <ServicesGrid />
      <SssSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <FinalCta />
    </main>
  );
}
