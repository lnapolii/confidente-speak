import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Preciso ter conhecimento prévio de inglês?",
      answer: "Não! A plataforma se adapta ao seu nível. Temos exercícios para iniciantes, intermediários e avançados. Durante o onboarding, você escolhe seu nível atual e personalizamos os exercícios para você."
    },
    {
      question: "Quanto tempo por dia preciso dedicar?",
      answer: "Apenas 5 minutos por dia já fazem diferença! Você pode fazer exercícios de 5, 10 ou 15 minutos, dependendo do seu tempo disponível. A consistência é mais importante que a duração."
    },
    {
      question: "Funciona no celular?",
      answer: "Sim! A plataforma é 100% responsiva e funciona perfeitamente em qualquer dispositivo - celular, tablet ou computador. Você também pode instalá-la como app no seu celular."
    },
    {
      question: "Como funciona o período gratuito?",
      answer: "São 7 dias de acesso completo a todas as funcionalidades, sem necessidade de cadastrar cartão de crédito. Após o período, você pode escolher continuar com um dos nossos planos pagos."
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento sem burocracia, direto no seu perfil. Não há multas ou taxas de cancelamento."
    },
    {
      question: "A IA realmente funciona?",
      answer: "Sim! Usamos tecnologia de ponta (OpenAI Whisper + GPT-4) para análise precisa de pronúncia. Nossa IA identifica erros específicos e oferece sugestões personalizadas baseadas nos padrões de fala de brasileiros."
    },
    {
      question: "Que temas corporativos são cobertos?",
      answer: "Cobrimos todas as situações do dia a dia corporativo: reuniões (daily standups, 1:1s), apresentações, negociações, small talk, emails formais, feedback, e muito mais. Novos exercícios são adicionados regularmente."
    },
    {
      question: "Vocês emitem nota fiscal?",
      answer: "Sim! A nota fiscal é enviada automaticamente por email após cada pagamento. Se precisar de uma nota fiscal para sua empresa, entre em contato com nosso suporte."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-background-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Perguntas{" "}
            <span className="text-gradient-primary">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre a plataforma
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-xl border-2 border-border/50 px-6 hover:border-primary/20 transition-colors"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Support */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-success/5 border-2 border-primary/10">
          <p className="text-lg text-foreground mb-4">
            Não encontrou sua resposta?
          </p>
          <a 
            href="mailto:contato@prospeaker.com.br" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <span>📧</span>
            <span>Entre em contato com nosso suporte</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
