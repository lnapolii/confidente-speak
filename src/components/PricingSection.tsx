import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Trial Gratuito",
      price: "Grátis",
      period: "7 dias",
      description: "Experimente todos os recursos",
      features: [
        "Acesso completo por 7 dias",
        "Todos os exercícios disponíveis", 
        "Análise de IA ilimitada",
        "Sistema de gamificação",
        "Progresso detalhado"
      ],
      cta: "Começar Grátis",
      popular: false,
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Mensal",
      price: "R$ 29,90",
      period: "por mês",
      description: "Flexibilidade total",
      features: [
        "Exercícios ilimitados",
        "Análise avançada de pronúncia",
        "Todos os cenários corporativos",
        "Conquistas e badges",
        "Suporte prioritário",
        "Novos conteúdos mensais"
      ],
      cta: "Assinar Mensal",
      popular: false,
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "Anual",
      price: "R$ 19,90",
      period: "por mês",
      originalPrice: "R$ 29,90",
      savings: "33% de economia",
      description: "Melhor custo-benefício",
      features: [
        "Tudo do plano mensal",
        "2 meses grátis (R$ 238,80/ano)",
        "Acesso antecipado a novidades",
        "Sessões de coaching mensais",
        "Certificado de conclusão",
        "Garantia de 30 dias"
      ],
      cta: "Assinar Anual",
      popular: true,
      icon: <Crown className="w-5 h-5" />
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Escolha Seu{" "}
            <span className="text-gradient-primary">Plano Ideal</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece grátis e evolua no seu ritmo. Sem permanência, 
            cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative card-elevated hover-lift ${
                plan.popular ? 'ring-2 ring-primary shadow-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center mx-auto mb-4 ${
                  plan.popular ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-xl font-heading">
                  {plan.name}
                </CardTitle>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                      <span className="text-sm text-success font-medium">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'btn-hero' 
                      : index === 0 
                        ? 'btn-success' 
                        : ''
                  }`}
                  variant={!plan.popular && index !== 0 ? "outline" : "default"}
                  asChild
                >
                  <a href="/dashboard">{plan.cta}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-muted text-success-dark text-sm">
            <Check className="w-4 h-4" />
            <span>Garantia de 30 dias • Cancele a qualquer momento</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;