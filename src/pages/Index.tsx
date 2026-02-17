import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. Problemas */}
        <ProblemSection />
        {/* 3. Solução/Benefícios */}
        <SolutionSection />
        {/* 4. Social Proof */}
        <TestimonialsSection />
        {/* 5. Preços */}
        <PricingSection />
        {/* 6. CTA Final */}
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
