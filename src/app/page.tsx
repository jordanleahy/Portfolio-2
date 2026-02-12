import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { LogoTicker } from "@/components/LogoTicker";
import { BlogSection } from "@/components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Hero />
      <LogoTicker />
      <WorkGrid />
      <BlogSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
