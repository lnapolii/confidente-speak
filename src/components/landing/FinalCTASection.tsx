import { Button } from "@/components/ui/button";
import { Zap, Check } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-success overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>Oferta Especial</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          Pronto Para Falar com Confiança?
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Comece agora mesmo. 7 dias grátis para você experimentar tudo.
          Sem cartão de crédito. Sem compromisso.
        </p>

        {/* Benefits List */}
        <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto text-left">
          {[
            "7 dias de acesso completo grátis",
            "Cancele quando quiser, sem multas",
            "Suporte dedicado em português",
            "Novos exercícios toda semana"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-white">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-lg">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-7 h-auto font-bold shadow-2xl hover:scale-105 transition-transform"
            asChild
          >
            <a href="/dashboard">
              <Zap className="w-6 h-6 mr-2" />
              Começar Agora Grátis
            </a>
          </Button>
          
          <p className="text-white/80 text-sm">
            Junte-se a <strong className="text-white">500+ profissionais</strong> praticando hoje
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">🔒</span>
            <span className="text-sm">Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">✅</span>
            <span className="text-sm">Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">⭐</span>
            <span className="text-sm">4.9/5 Avaliação</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
