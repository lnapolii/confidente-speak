import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Headphones, Mic } from "lucide-react";

const SolutionSection = () => {
  const steps = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      number: "1",
      title: "Leia e Compreenda",
      description: "Textos contextualizados sobre situações corporativas reais. Clique nas palavras para ver traduções instantâneas.",
      feature: "📖 Tradução instantânea ao passar o mouse"
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      number: "2",
      title: "Escute e Pratique",
      description: "Áudio nativo americano com texto sincronizado. Ajuste a velocidade e pratique quantas vezes precisar.",
      feature: "🎧 Controle de velocidade: 0.75x, 1x, 1.25x"
    },
    {
      icon: <Mic className="w-12 h-12" />,
      number: "3",
      title: "Grave e Receba Feedback",
      description: "Nossa IA analisa sua pronúncia em tempo real e dá sugestões personalizadas de melhoria.",
      feature: "🤖 Análise detalhada com score e sugestões"
    }
  ];

  return (
    <section id="solution" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-muted text-success-dark text-sm font-medium mb-6">
            <span>✨</span>
            <span>Metodologia Comprovada</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            O Método dos{" "}
            <span className="text-gradient-primary">3 Passos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprenda praticando situações reais do dia a dia corporativo
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="card-elevated hover-lift border-2 border-primary/10"
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-muted text-sm font-medium">
                      <span className="text-success">✓</span>
                      <span>{step.feature}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visual Flow */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/5 to-success/5 border-2 border-primary/10">
            <span className="text-3xl">📖</span>
            <span className="text-2xl text-muted-foreground">→</span>
            <span className="text-3xl">🎧</span>
            <span className="text-2xl text-muted-foreground">→</span>
            <span className="text-3xl">🎤</span>
            <span className="text-2xl text-muted-foreground">=</span>
            <span className="text-3xl">🏆</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Apenas 5-15 minutos por dia para resultados reais
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
