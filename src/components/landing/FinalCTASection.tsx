import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-success overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Slogan repetido - memorável */}
        <div className="mb-8">
          <p className="text-3xl md:text-4xl font-light text-white mb-6 leading-relaxed">
            Build your confidence.
            <br />
            Develop your English.
            <br />
            Unlock your life.
          </p>
          <p className="text-lg text-white/80 italic">
            (Construa sua confiança. Desenvolva seu inglês. Desbloqueie sua vida.)
          </p>
        </div>

        {/* CTA Button */}
        <div className="space-y-6 mb-8">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-2xl px-16 py-8 h-auto font-bold shadow-2xl hover:scale-105 transition-transform"
            asChild
          >
            <a href="/dashboard">
              🚀 Começar Agora Grátis
            </a>
          </Button>
          
          <p className="text-white text-base">
            7 dias grátis • Sem cartão de crédito • 500+ profissionais confiam
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-semibold">Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-semibold">Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-2xl">⭐</span>
            <span className="text-sm font-semibold">4.9/5 Avaliação</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
