import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mic, 
  Brain, 
  Trophy, 
  Clock, 
  Target, 
  BarChart3, 
  Users, 
  Gamepad2 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Análise de Pronúncia com IA",
      description: "Feedback instantâneo sobre sua pronúncia com sugestões personalizadas para melhoria.",
      color: "text-primary"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Exercícios de 5-15 minutos",
      description: "Micro-learning que se encaixa na sua rotina. Pratique durante o café ou entre reuniões.",
      color: "text-success"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Sistema de Gamificação", 
      description: "Streaks, XP, conquistas e níveis. Transforme o aprendizado em um jogo viciante.",
      color: "text-warning"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Cenários Corporativos Reais",
      description: "Reuniões, apresentações, networking e negociações. Pratique situações do seu dia a dia.",
      color: "text-primary"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Método de 3 Etapas",
      description: "Leitura → Escuta Ativa → Produção. Metodologia comprovada para desenvolver confiança.",
      color: "text-success"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progresso Detalhado",
      description: "Acompanhe sua evolução com métricas claras e insights personalizados sobre seu desempenho.",
      color: "text-warning"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-background-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Funcionalidades que{" "}
            <span className="text-gradient-success">Aceleram</span>{" "}
            Seu Progresso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa projetada especificamente para profissionais 
            brasileiros que querem ganhar confiança na comunicação em inglês.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-elevated hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-heading">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process flow */}
        <div className="mt-20">
          <h3 className="text-2xl font-heading font-bold text-center text-foreground mb-12">
            Como Funciona o Método ConfidenceSpeak
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Leitura Ativa",
                description: "Leia textos corporativos com tradução instantânea e compreenda o contexto.",
                icon: <Users className="w-8 h-8" />
              },
              {
                step: "2", 
                title: "Escuta Sincronizada",
                description: "Ouça nativos falando com destaque sincronizado das palavras.",
                icon: <Target className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Prática Guiada",
                description: "Grave sua fala e receba análise detalhada da IA sobre sua performance.",
                icon: <Gamepad2 className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h4 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {step.title}
                </h4>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;