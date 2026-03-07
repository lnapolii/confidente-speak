import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    name: "Mariana R.",
    role: "Gerente de Produto · Fintech",
    content: "Em 6 semanas comecei a liderar calls em inglês sem travar. O feedback de pronúncia me mostrou exatamente o que estava errado.",
    avatar: "MR",
    avatarColor: "bg-primary",
  },
  {
    name: "Felipe S.",
    role: "Engenheiro Sênior · Startup",
    content: "Passei em uma entrevista técnica em inglês para uma empresa americana. O módulo de entrevistas do ProSpeaker foi decisivo.",
    avatar: "FS",
    avatarColor: "bg-purple-600",
  },
  {
    name: "Carla A.",
    role: "Diretora Comercial · Multinacional",
    content: "Minha confiança em negociações internacionais aumentou muito. Agora sei exatamente como estruturar meu argumento em inglês.",
    avatar: "CA",
    avatarColor: "bg-success",
  },
];

const metrics = [
  { number: "+12.000", label: "profissionais treinados" },
  { number: "89%", label: "relataram mais confiança em 4 semanas" },
  { number: "4.8/5", label: "avaliação média na plataforma" },
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85;
      setActiveIndex(Math.round(scrollLeft / cardWidth));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className="py-20 px-4 bg-background-accent">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-center text-xl md:text-2xl font-heading font-semibold text-muted-foreground mb-12">
          Profissionais que transformaram seu inglês
        </h2>

        {/* Cards */}
        {isMobile ? (
          <>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} className="min-w-[85%] snap-center" />
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">{m.number}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({ testimonial, className = "" }: { testimonial: typeof testimonials[0]; className?: string }) {
  return (
    <Card className={`card-elevated hover-lift ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-warning text-warning" />
          ))}
        </div>

        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
          <p className="text-foreground italic relative z-10 pl-6">"{testimonial.content}"</p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-primary-foreground font-semibold`}>
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-medium text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialsSection;
