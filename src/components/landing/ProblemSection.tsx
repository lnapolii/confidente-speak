import { Card, CardContent } from "@/components/ui/card";
import { Frown, UserX, TrendingDown } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: "😰",
      title: "Travou na call em inglês",
      description: "Todos esperando você falar..."
    },
    {
      icon: "🤐",
      title: "Evitou falar por insegurança",
      description: "Perdeu chance de brilhar"
    },
    {
      icon: "💼",
      title: "Oportunidade perdida",
      description: "Promoção foi para outro"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Você Já Passou Por Isso?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="card-elevated hover-lift text-center border-2 border-border/50 bg-white"
            >
              <CardContent className="p-8">
                <div className="text-6xl mb-6">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl md:text-2xl font-semibold text-foreground inline-flex items-center gap-2 px-6 py-3">
            <span className="text-3xl">💡</span>
            É Hora de Mudar Isso. Definitivamente.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
