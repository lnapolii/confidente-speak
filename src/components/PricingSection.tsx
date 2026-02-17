import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession, STRIPE_PRICE_IDS } from "@/services/stripeService";
import { supabase } from "@/integrations/supabase/client";

const PricingSection = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planType: 'monthly' | 'quarterly' | 'yearly') => {
    setLoadingPlan(planType);

    try {
      // Verificar se o usuário está autenticado
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login necessário",
          description: "Você precisa fazer login para assinar um plano",
          variant: "destructive",
        });
        // Redirecionar para login
        window.location.href = "/login";
        return;
      }

      // Obter o price ID correto
      const priceId = STRIPE_PRICE_IDS[planType];

      // Criar sessão de checkout
      await createCheckoutSession({
        priceId,
        planType,
      });

      // O redirecionamento acontece automaticamente dentro de createCheckoutSession
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Erro ao processar",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Mensal",
      price: "R$ 79,90",
      period: "por mês",
      description: "Flexibilidade total",
      features: [
        "Acesso completo à plataforma",
        "Exercícios ilimitados (5, 10 e 15 min)",
        "Análise de pronúncia por IA",
        "Biblioteca de vocabulário",
        "Sistema de gamificação",
        "Suporte prioritário"
      ],
      cta: "Começar 7 Dias Grátis",
      popular: false,
      icon: <Star className="w-5 h-5" />,
      planType: 'monthly' as const,
    },
    {
      name: "Trimestral",
      price: "R$ 59,90",
      period: "por mês",
      originalPrice: "R$ 79,90",
      savings: "Economize 25%",
      billingInfo: "R$ 179,70 cobrados a cada 3 meses",
      description: "Mais popular",
      features: [
        "Tudo do plano mensal",
        "25% de desconto",
        "R$ 60,00 de economia",
        "Relatórios mensais de progresso",
        "Metas personalizadas",
        "Acesso prioritário a novos recursos"
      ],
      cta: "Começar 7 Dias Grátis",
      popular: true,
      icon: <Crown className="w-5 h-5" />,
      planType: 'quarterly' as const,
    },
    {
      name: "Anual",
      price: "R$ 49,90",
      period: "por mês",
      originalPrice: "R$ 79,90",
      savings: "Economize 38%",
      billingInfo: "R$ 598,80 cobrados anualmente",
      description: "Melhor custo-benefício",
      features: [
        "Tudo do plano mensal",
        "38% de desconto",
        "R$ 360,00 de economia",
        "Badge exclusivo de membro anual",
        "Acesso a materiais premium",
        "Certificado de conclusão",
        "Sessões de mentoria em grupo"
      ],
      cta: "Começar 7 Dias Grátis",
      popular: false,
      icon: <Crown className="w-5 h-5" />,
      planType: 'yearly' as const,
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

        <div className="text-center mb-6">
          <span className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold animate-pulse">
            🎁 7 DIAS GRÁTIS em todos os planos
          </span>
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
                  
                  {plan.billingInfo && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {plan.billingInfo}
                    </p>
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
                  onClick={() => {
                    if (plan.planType) {
                      handleSubscribe(plan.planType);
                    }
                  }}
                  disabled={loadingPlan === plan.planType}
                >
                  {loadingPlan === plan.planType ? 'Processando...' : plan.cta}
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