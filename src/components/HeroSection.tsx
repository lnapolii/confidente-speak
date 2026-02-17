import { Button } from "@/components/ui/button";
import { Zap, Star } from "lucide-react";
import heroInterface from "@/assets/hero-interface.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-10 md:mb-16">
          {/* Main heading - 28px mobile, scales up for desktop */}
          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 animate-fade-in leading-tight">
            Pare de Travar em{" "}
            <span className="text-gradient-primary">Reuniões em Inglês</span>
          </h1>

          {/* Slogan */}
          <p className="text-base md:text-lg font-normal text-foreground/90 mb-8 md:mb-10 animate-fade-in leading-relaxed">
            Build Your Confidence. Develop Your English. Unlock Your Life.
          </p>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-10 animate-slide-up max-w-3xl mx-auto leading-relaxed md:leading-normal">
            5 minutos por dia. IA analisa sua pronúncia.
            <br />
            <strong className="text-foreground">Resultados em 7 dias.</strong>
          </p>

          {/* Social proof badge above CTA */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {["MS", "JS", "AC", "RP", "LF", "CM"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center text-[10px] md:text-xs font-bold text-primary-foreground"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">⚡ 500+ profissionais já praticando</span>
          </div>

          {/* CTA Button - 44px min touch target */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <Button size="lg" className="btn-hero hover-lift px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl h-auto font-bold shadow-2xl min-h-[44px] w-full sm:w-auto" asChild>
              <a href="/dashboard">
                🚀 Começar 7 Dias Grátis
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              ✓ Sem cartão de crédito • ✓ Cancele quando quiser
            </p>
          </div>

          {/* Rating & stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-10 md:mb-16">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-warning text-warning" />
                ))}
              </div>
              <span className="font-semibold">4.9/5.0</span>
            </div>
            <span className="hidden sm:block text-muted-foreground/40">|</span>
            <span className="font-semibold">15.000+ exercícios feitos</span>
          </div>
        </div>

        {/* Hero visual */}
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
