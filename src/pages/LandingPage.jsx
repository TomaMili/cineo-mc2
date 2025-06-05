import Hero from "../features/landing/Hero";
import FeatureTabsSection from "../features/landing/FeatureTabsSection";
import TestimonialsSection from "../features/landing/TestimonialSection";
import WatchTogetherSection from "../features/landing/WatchTogetherSection";
import TrackMoviesSection from "../features/landing/TrackMoviesSection";
import DiscoverMoviesSection from "../features/landing/DiscoverMoviesSection";
import FooterLanding from "../features/landing/FooterLanding";
import PricingSection from "../features/landing/PricingSection";

export default function LandingPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <FeatureTabsSection />
      <TrackMoviesSection />
      <DiscoverMoviesSection />
      <TestimonialsSection />
      <PricingSection />
      <WatchTogetherSection />
      <FooterLanding />
    </main>
  );
}
