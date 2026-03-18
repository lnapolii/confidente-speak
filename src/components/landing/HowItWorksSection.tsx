import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Faça o diagnóstico gratuito",
    description: "Em 3 minutos descobrimos seu nível de inglês e as áreas que você mais precisa praticar.",
    emoji: "🎯",
  },
  {
    number: "02",
    title: "Receba seu plano personalizado",
    description: "Nossa IA cria uma trilha de exercícios focada no seu setor e nas situações do seu dia a dia.",
    emoji: "📋",
  },
  {
    number: "03",
    title: "Pratique 5 minutos por dia",
    description: "Exercícios curtos de speaking com feedback instantâneo de pronúncia, fluência e clareza.",
    emoji: "🎙️",
  },
  {
    number: "04",
    title: "Evolua com confiança",
    description: "Acompanhe seu progresso, desbloqueie conquistas e ganhe confiança a cada sessão.",
    emoji: "🚀",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Como <span className="text-gradient-primary">Funciona</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um método simples e comprovado para você ganhar confiança em inglês corporativo
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%_-_12px)] w-[calc(100%_-_40px)] h-0.5 bg-border z-0" />
              )}

              <Card className="card-elevated hover-lift relative z-10 h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{step.emoji}</div>
                  <span className="inline-block text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                    Passo {step.number}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
