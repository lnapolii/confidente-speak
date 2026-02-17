const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <a href="/" className="text-primary hover:underline text-sm mb-8 inline-block">← Voltar ao início</a>
        
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-10">Última atualização: 17 de fevereiro de 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao criar uma conta ou utilizar a plataforma ProSpeaker, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se não concordar, não utilize o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground">
              O ProSpeaker é uma plataforma de aprendizado de inglês corporativo que utiliza inteligência artificial para análise de pronúncia, exercícios interativos e acompanhamento de progresso. O serviço é oferecido em modalidade SaaS (Software as a Service).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">3. Contas de Usuário</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Você é responsável pela segurança da sua conta e senha</li>
              <li>Deve fornecer informações verdadeiras e atualizadas</li>
              <li>Não é permitido compartilhar credenciais de acesso</li>
              <li>Deve ter no mínimo 18 anos para criar uma conta</li>
              <li>Reservamos o direito de suspender contas que violem estes termos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">4. Planos e Assinatura</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Trial gratuito:</strong> 7 dias com acesso completo, sem necessidade de cartão</li>
              <li><strong className="text-foreground">Plano Mensal:</strong> R$ 79,90/mês, renovação automática</li>
              <li><strong className="text-foreground">Plano Trimestral:</strong> R$ 59,90/mês (cobrado R$ 179,70 a cada 3 meses)</li>
              <li><strong className="text-foreground">Plano Anual:</strong> R$ 49,90/mês (cobrado R$ 598,80 anualmente)</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              Os preços podem ser alterados com aviso prévio de 30 dias. A renovação é automática até o cancelamento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">5. Cancelamento e Reembolso</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Você pode cancelar sua assinatura a qualquer momento pelo seu perfil</li>
              <li>O acesso continua até o final do período já pago</li>
              <li><strong className="text-foreground">Garantia de 30 dias:</strong> reembolso integral se solicitado nos primeiros 30 dias de assinatura paga</li>
              <li>Após 30 dias, não há reembolso proporcional ao período restante</li>
              <li>Solicitações de reembolso devem ser feitas pelo e-mail suporte@prospeaker.com.br</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">6. Uso Aceitável</h2>
            <p className="mb-2 text-muted-foreground">Ao utilizar o ProSpeaker, você concorda em <strong className="text-foreground">NÃO</strong>:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Copiar, distribuir ou revender conteúdo da plataforma</li>
              <li>Utilizar bots, scripts ou ferramentas automatizadas</li>
              <li>Tentar acessar áreas restritas do sistema</li>
              <li>Compartilhar conteúdo ofensivo, ilegal ou inapropriado</li>
              <li>Utilizar a plataforma para fins diferentes do aprendizado de idiomas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">7. Propriedade Intelectual</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Todo conteúdo da plataforma (textos, exercícios, áudios, algoritmos) é propriedade do ProSpeaker</li>
              <li>As gravações de áudio que você faz são de sua propriedade</li>
              <li>Você nos concede licença para processar suas gravações com finalidade de análise de pronúncia</li>
              <li>O uso da marca ProSpeaker sem autorização é proibido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">8. Limitação de Responsabilidade</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>O serviço é fornecido "como está" sem garantias de resultado específico</li>
              <li>Não garantimos aprendizado ou fluência em prazo determinado</li>
              <li>Não somos responsáveis por interrupções temporárias do serviço para manutenção</li>
              <li>Nossa responsabilidade é limitada ao valor pago nos últimos 12 meses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">9. Alterações nos Termos</h2>
            <p className="text-muted-foreground">
              Podemos atualizar estes termos periodicamente. Mudanças significativas serão comunicadas por e-mail com 30 dias de antecedência. O uso continuado após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">10. Legislação Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos são regidos pelas leis da República Federativa do Brasil, incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e o Código de Defesa do Consumidor. 
              Foro: Comarca de São Paulo/SP.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">11. Contato</h2>
            <p className="text-muted-foreground">
              Para dúvidas sobre estes termos:
            </p>
            <p className="text-primary font-medium mt-2">📧 suporte@prospeaker.com.br</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
