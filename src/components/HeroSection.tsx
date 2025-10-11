import { Button } from "@/components/ui/button";
import { Zap, Star } from "lucide-react";
import heroInterface from "@/assets/hero-interface.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          {/* Slogan Principal - Destaque */}
          <div className="mb-12 animate-fade-in">
            <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-4 leading-relaxed">
              Build your confidence.
              <br />
              Develop your English.
              <br />
              Unlock your life.
            </p>
            <p className="text-sm text-muted-foreground italic">
              (Construa sua confiança. Desenvolva seu inglês. Desbloqueie sua vida.)
            </p>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in leading-tight">
            Pare de Travar em{" "}
            <span className="text-gradient-primary">Reuniões em Inglês</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-slide-up max-w-3xl mx-auto">
            5 minutos por dia. IA analisa sua pronúncia.
            <br />
            <strong className="text-foreground">Resultados em 7 dias.</strong>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <Button size="lg" className="btn-hero hover-lift px-12 py-8 text-2xl h-auto font-bold shadow-2xl" asChild>
              <a href="/dashboard">
                🚀 Começar 7 Dias Grátis
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              ✓ Sem cartão • ✓ Cancele quando quiser
            </p>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mb-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-background"
                  />
                ))}
              </div>
              <span className="font-semibold">+500 profissionais já praticando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              <span className="font-semibold">4.9/5.0</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative">
          <div className="card-elevated max-w-4xl mx-auto p-8 animate-fade-in">
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-primary/20 shadow-2xl">
              <img 
                src={heroInterface}
                alt="Interface da plataforma ProSpeaker mostrando exercícios práticos de inglês corporativo com análise de IA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
