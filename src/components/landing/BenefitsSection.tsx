import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, TrendingUp, Briefcase, BookMarked, Trophy } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ganhe Confiança em 7 Dias",
      description: "Pratique em um ambiente seguro antes das reuniões reais. Sinta a diferença já na primeira semana."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Pronuncie Como um Nativo",
      description: "IA identifica e corrige seus erros específicos. Receba feedback personalizado em cada exercício."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Aprenda no Seu Ritmo",
      description: "5, 10 ou 15 minutos por dia. Você escolhe quando e quanto tempo quer praticar."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Foco no Corporativo",
      description: "Reuniões, apresentações, negociações. Inglês que você realmente usa no trabalho."
    },
    {
      icon: <BookMarked className="w-8 h-8" />,
      title: "Biblioteca Personalizada",
      description: "Todas as palavras consultadas ficam salvas para revisão. Seu vocabulário sempre acessível."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamificação Motivadora",
      description: "Streaks, conquistas e XP para manter você engajado. Transforme aprendizado em diversão."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-success/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <span>🚀</span>
            <span>Resultados Reais</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Transforme Sua{" "}
            <span className="text-gradient-success">Carreira</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Benefícios que vão além do inglês - ganhe confiança profissional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="card-elevated hover-lift border-2 border-border/50 group"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-card flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof Bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-6 rounded-2xl bg-white/50 backdrop-blur border-2 border-primary/10 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary">500+</div>
              <div className="text-sm text-muted-foreground">Profissionais</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-success">95%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Exercícios</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-success">4.9★</div>
              <div className="text-sm text-muted-foreground">Avaliação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
