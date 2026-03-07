import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroInterface from "@/assets/hero-interface.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in leading-tight">
            Fale inglês corporativo com confiança{" "}
            <span className="text-gradient-primary">— em 8 semanas</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up max-w-3xl mx-auto leading-relaxed">
            Exercícios práticos de speaking para reuniões, apresentações e negociações. Feedback em tempo real. Sem decorar gramática.
          </p>

          <div className="flex flex-col items-center gap-3 mb-8">
            <Button
              size="lg"
              className="bg-success hover:bg-success/90 text-success-foreground hover-lift px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl h-auto font-bold shadow-2xl min-h-[44px] w-full sm:w-auto"
              asChild
            >
              <a href="/diagnostico">
                Fazer meu diagnóstico gratuito <ArrowRight className="ml-2 w-6 h-6" />
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Leva 3 minutos · Sem cartão de crédito
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="card-elevated max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-primary/20 shadow-2xl">
              <img 
                src={heroInterface}
                alt="Interface da plataforma ProSpeaker mostrando exercícios práticos de inglês corporativo com análise de IA"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
