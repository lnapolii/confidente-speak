import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, X, Zap, Crown, Users, Shield, ChevronDown, ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession } from "@/services/stripeService";
import { supabase } from "@/integrations/supabase/client";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planType: "monthly" | "yearly") => {
    setLoadingPlan(planType);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Login necessário", description: "Faça login para assinar.", variant: "destructive" });
        window.location.href = "/login";
        return;
      }
      await createCheckoutSession({ planType });
    } catch (error) {
      toast({ title: "Erro", description: error instanceof Error ? error.message : "Tente novamente.", variant: "destructive" });
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "R$ 0",
      subtitle: "Para experimentar",
      icon: <Zap className="w-6 h-6" />,
      popular: false,
      included: [
        "3 exercícios por dia",
        "1 trilha de aprendizado (Inglês para Reuniões)",
        "Diagnóstico de nível",
        "Feedback básico de pronúncia",
      ],
      excluded: [
        "Roleplay com IA",
        "Biblioteca completa (+100 exercícios)",
        "Feedback fonético avançado",
        "Streak freeze e benefícios premium",
      ],
      cta: "Começar grátis",
      ctaAction: () => { window.location.href = "/signup"; },
    },
    {
      id: "pro",
      name: "Pro",
      price: isAnnual ? "R$ 29" : "R$ 49",
      period: "/mês",
      subtitle: "Para profissionais que querem resultado",
      icon: <Crown className="w-6 h-6" />,
      popular: true,
      included: [
        "Exercícios ilimitados",
        "Todas as trilhas de aprendizado",
        "Feedback fonético avançado com análise de fonemas",
        "Roleplay com IA em situações corporativas",
        "Streak freeze (2x por mês)",
        "Download para prática offline",
        "Histórico completo de sessões",
        "Suporte prioritário",
      ],
      excluded: [],
      cta: "Assinar Pro — 7 dias grátis",
      ctaSubtext: "Cancele quando quiser · Sem multa",
      ctaAction: () => handleSubscribe(isAnnual ? "yearly" : "monthly"),
    },
    {
      id: "teams",
      name: "Teams",
      price: "R$ 39",
      period: "/usuário/mês",
      subtitle: "Para empresas e equipes",
      icon: <Users className="w-6 h-6" />,
      popular: false,
      included: [
        "Tudo do plano Pro",
        "Painel de administração para RH",
        "Relatórios de progresso da equipe",
        "Faturamento PJ",
        "Onboarding dedicado",
        "Mínimo 5 usuários",
      ],
      excluded: [],
      cta: "Falar com vendas",
      ctaAction: () => { window.location.href = "mailto:contato@prospeaker.com?subject=Plano Teams"; },
    },
  ];

  const faqs = [
    { q: "Posso cancelar a qualquer momento?", a: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multa. O acesso continua até o final do período pago." },
    { q: "Como funciona o reembolso?", a: "Oferecemos garantia de 7 dias. Se não gostar, devolvemos 100% do valor sem perguntas." },
    { q: "Posso trocar de plano depois?", a: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento nas configurações da conta." },
    { q: "O que acontece depois do trial de 7 dias?", a: "Após o trial, a cobrança é feita automaticamente. Você pode cancelar durante o trial sem ser cobrado." },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Escolha seu plano
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-full p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Anual
              <Badge className="bg-success text-success-foreground text-[10px] px-2 py-0">Economize 40%</Badge>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative card-elevated flex flex-col ${plan.popular ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold">
                    <Crown className="w-3 h-3 mr-1" /> Mais popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2 pt-8">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${plan.popular ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-lg font-heading">{plan.name}</CardTitle>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
                {plan.id === "pro" && isAnnual && (
                  <p className="text-xs text-success font-medium mt-1">R$ 348/ano (equivale a R$ 29/mês)</p>
                )}
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.included.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                  {plan.excluded.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X className="w-4 h-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground/60">{f}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Button
                    className={`w-full ${plan.popular ? "btn-hero" : ""}`}
                    variant={plan.popular ? "default" : plan.id === "free" ? "default" : "outline"}
                    size="lg"
                    onClick={plan.ctaAction}
                    disabled={loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? "Processando..." : plan.cta}
                  </Button>
                  {plan.ctaSubtext && (
                    <p className="text-xs text-center text-muted-foreground mt-2">{plan.ctaSubtext}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-success/5 border border-success/20">
            <Shield className="w-8 h-8 text-success" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Garantia de 7 dias</p>
              <p className="text-sm text-muted-foreground">Se não gostar, devolvemos 100% do valor. Sem perguntas.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-heading font-bold text-foreground text-center mb-8">Perguntas frequentes</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
