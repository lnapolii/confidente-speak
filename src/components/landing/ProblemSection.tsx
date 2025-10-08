import { Card, CardContent } from "@/components/ui/card";
import { Frown, UserX, TrendingDown } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <Frown className="w-12 h-12" />,
      title: "Travou na reunião em inglês",
      description: "Aquele momento constrangedor quando você sabe o que quer dizer mas as palavras não saem"
    },
    {
      icon: <UserX className="w-12 h-12" />,
      title: "Evitou falar por insegurança",
      description: "Deixou de contribuir em discussões importantes por medo de errar ou não ser compreendido"
    },
    {
      icon: <TrendingDown className="w-12 h-12" />,
      title: "Perdeu oportunidades",
      description: "Viu promoções e projetos internacionais passarem por falta de confiança no inglês"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background-muted via-background to-background-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Você já passou por isso?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Se você se identificou com alguma dessas situações, saiba que não está sozinho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="card-elevated hover-lift text-center border-2 border-border/50"
            >
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center mx-auto mb-6 text-warning">
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
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-success/10 border-2 border-primary/20">
            <span className="text-2xl">💡</span>
            <p className="text-lg font-semibold text-foreground">
              É hora de mudar isso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
