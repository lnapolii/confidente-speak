import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina Santos",
      role: "Gerente de Projetos, Ambev",
      content: "Em 3 semanas já sentia muito mais confiança nas calls em inglês. O método realmente funciona!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Carlos Oliveira", 
      role: "Desenvolvedor Senior, iFood",
      content: "Os exercícios de 10 minutos se encaixam perfeitamente na minha rotina. Gamificação é viciante!",
      rating: 5,
      avatar: "CO"
    },
    {
      name: "Ana Paula Lima",
      role: "Diretora Comercial, Stone",
      content: "Finalmente uma plataforma focada no inglês corporativo brasileiro. Mudou minha carreira.",
      rating: 5,
      avatar: "AP"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background-accent">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            O Que Dizem Nossos{" "}
            <span className="text-gradient-success">Usuários</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Profissionais que transformaram sua comunicação em inglês
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