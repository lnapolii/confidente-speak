import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Product Manager na Nubank",
      content: "Em 2 semanas já me sentia confiante para conduzir reuniões em inglês. O feedback da IA é cirúrgico!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Tech Lead na VTEX",
      content: "Finalmente um app que foca no que realmente importa: comunicação prática do dia a dia.",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Engineering Manager na Mercado Livre",
      content: "5 minutos por dia mudaram completamente minha performance em calls internacionais.",
      rating: 5,
      avatar: "AC"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background-accent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Profissionais que Já Transformaram{" "}
            <span className="text-gradient-success">Sua Comunicação</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que dizem quem já está falando com confiança
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-foreground italic relative z-10 pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "500+", label: "Profissionais Ativos" },
            { number: "10k+", label: "Exercícios Completados" },
            { number: "95%", label: "Taxa de Satisfação" },
            { number: "4.9★", label: "Avaliação Média" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;