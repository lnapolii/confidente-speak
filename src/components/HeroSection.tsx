import { Button } from "@/components/ui/button";
import { Play, Star, Zap, Users } from "lucide-react";
import heroInterface from "@/assets/hero-interface.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-success-muted text-success-dark text-sm font-bold mb-8 animate-bounce-in shadow-lg border-2 border-success/20">
            <Star className="w-5 h-5 fill-success text-success" />
            <span>7 dias grátis • Sem cartão de crédito • Sem compromisso</span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title mb-6 animate-fade-in">
            Fale Inglês com{" "}
            <span className="text-gradient-primary">Confiança</span>{" "}
            em Reuniões Corporativas
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mb-10 animate-slide-up">
            Apenas 5 minutos por dia. IA analisa sua pronúncia em tempo real.
            <br />
            <strong className="text-foreground">Transforme insegurança em confiança profissional.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" className="btn-hero hover-lift px-10 py-7 text-xl h-auto font-bold shadow-xl" asChild>
              <a href="/dashboard">
                <Zap className="w-6 h-6 mr-2" />
                🚀 Começar 7 Dias Grátis
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-7 text-xl h-auto border-2 hover:bg-accent font-semibold" asChild>
              <a href="/exercise">
                <Play className="w-6 h-6 mr-2" />
                Ver Demonstração
              </a>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-muted-foreground mb-16 animate-fade-in">
            ✓ Sem cartão de crédito • ✓ Cancele quando quiser
          </p>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"
                  />
                ))}
              </div>
              <span>+500 profissionais já praticando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <span>4.9/5 (127 avaliações)</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative">
          <div className="card-elevated max-w-4xl mx-auto p-8 animate-fade-in">
            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <img 
                src={heroInterface}
                alt="Interface da plataforma ConfidenceSpeak mostrando exercícios práticos de inglês corporativo"
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