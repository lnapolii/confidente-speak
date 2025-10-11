import { Card, CardContent } from "@/components/ui/card";
import { Target, Mic, Zap } from "lucide-react";

const SolutionSection = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "GANHE CONFIANÇA EM 7 DIAS",
      description: "Pratique situações reais antes das reuniões de verdade. Ambiente seguro, sem julgamento.",
      feature: "→ Reuniões, apresentações, negociações"
    },
    {
      icon: "🤖",
      title: "IA ANALISA SUA PRONÚNCIA",
      description: "Feedback instantâneo e personalizado. Identifica seus erros específicos de brasileiro.",
      feature: "→ Score de clareza, fluência e pronúncia"
    },
    {
      icon: "⚡",
      title: "APENAS 5 MINUTOS POR DIA",
      description: "Micro-learning que cabe na sua rotina. Pratique no intervalo do café ou antes da reunião.",
      feature: "→ Escolha: 5, 10 ou 15 minutos"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Transforme Sua Carreira em{" "}
            <span className="text-gradient-primary">3 Passos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O método comprovado para ganhar confiança em inglês corporativo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="card-elevated hover-lift border-2 border-primary bg-white transform transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {benefit.feature}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-white border-2 border-primary/20 shadow-lg">
            <p className="text-2xl font-bold text-foreground">
              500+ profissionais
            </p>
            <p className="text-lg text-muted-foreground">
              já transformaram sua confiança
            </p>
            <div className="flex -space-x-2 mb-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-background"
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">⭐⭐⭐⭐⭐</span>
              <span className="text-xl font-bold text-foreground">4.9/5.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
