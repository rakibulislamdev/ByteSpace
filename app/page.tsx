import { Hero } from "@/components/home/hero";
import {
  DiscoverSection,
  FeatureBand,
  LearningPathsSection,
  LogoStrip,
} from "@/components/home/Sections";
import { CreatorCta, TestimonialsSection } from "@/components/home/CreatorCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <main>
        <DiscoverSection />
        <LearningPathsSection />
        <FeatureBand stats={stats} />
        <CreatorCta />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
