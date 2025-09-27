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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-muted text-success-dark text-sm font-medium mb-8 animate-bounce-in">
            <Star className="w-4 h-4" />
            <span>7 dias grátis • Sem cartão de crédito</span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title mb-8 animate-fade-in">
            Desenvolva{" "}
            <span className="text-gradient-primary">Confiança</span>{" "}
            em Inglês Corporativo
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mb-12 animate-slide-up">
            Pratique situações reais do ambiente corporativo com exercícios 
            gamificados de 5-15 minutos. Análise de IA para sua pronúncia 
            e progresso personalizado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="btn-hero hover-lift" asChild>
              <a href="/dashboard">
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora - Grátis
              </a>
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-accent" asChild>
              <a href="/exercise">
                <Play className="w-5 h-5 mr-2" />
                Ver Como Funciona
              </a>
            </Button>
          </div>

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