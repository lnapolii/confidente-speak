const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <a href="/" className="text-primary hover:underline text-sm mb-8 inline-block">← Voltar ao início</a>
        
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-10">Última atualização: 17 de fevereiro de 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">1. Dados que Coletamos</h2>
            <p className="mb-2">Coletamos as seguintes informações quando você utiliza o ProSpeaker:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Dados de cadastro:</strong> nome completo, e-mail, telefone (opcional)</li>
              <li><strong className="text-foreground">Dados de uso:</strong> exercícios realizados, tempo de prática, pontuações, progresso</li>
              <li><strong className="text-foreground">Gravações de áudio:</strong> gravações de voz para análise de pronúncia por IA</li>
              <li><strong className="text-foreground">Dados de pagamento:</strong> processados de forma segura pelo Stripe (não armazenamos dados de cartão)</li>
              <li><strong className="text-foreground">Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional, cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">2. Como Usamos Seus Dados</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Fornecer e personalizar a experiência de aprendizado</li>
              <li>Analisar sua pronúncia utilizando inteligência artificial</li>
              <li>Acompanhar seu progresso e gerar relatórios</li>
              <li>Processar pagamentos e gerenciar sua assinatura</li>
              <li>Enviar comunicações sobre sua conta e novidades (com seu consentimento)</li>
              <li>Melhorar nossos serviços e algoritmos de IA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">3. Compartilhamento com Terceiros</h2>
            <p className="mb-2">Compartilhamos dados apenas com os seguintes parceiros essenciais:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Stripe:</strong> processamento seguro de pagamentos</li>
              <li><strong className="text-foreground">Resend:</strong> envio de e-mails transacionais e comunicações</li>
              <li><strong className="text-foreground">Google Analytics:</strong> análise de uso do site (dados anonimizados, apenas com consentimento)</li>
            </ul>
            <p className="mt-2 text-muted-foreground">Nunca vendemos seus dados pessoais a terceiros.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">4. Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies de análise (Google Analytics) apenas com seu consentimento explícito. 
              Consulte nossa <a href="/cookies" className="text-primary hover:underline">Política de Cookies</a> para mais detalhes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">5. Armazenamento e Segurança</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Dados armazenados em servidores seguros com criptografia em trânsito e em repouso</li>
              <li>Acesso restrito a funcionários autorizados</li>
              <li>Gravações de áudio são processadas e podem ser excluídas a qualquer momento</li>
              <li>Backups regulares para proteção contra perda de dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">6. Seus Direitos (LGPD / GDPR)</h2>
            <p className="mb-2">Você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Acesso:</strong> solicitar uma cópia de todos os seus dados pessoais</li>
              <li><strong className="text-foreground">Correção:</strong> atualizar dados incorretos ou desatualizados</li>
              <li><strong className="text-foreground">Exclusão:</strong> solicitar a exclusão permanente dos seus dados</li>
              <li><strong className="text-foreground">Portabilidade:</strong> receber seus dados em formato estruturado</li>
              <li><strong className="text-foreground">Revogação:</strong> retirar consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">7. Retenção de Dados</h2>
            <p className="text-muted-foreground">
              Mantemos seus dados enquanto sua conta estiver ativa. Após o cancelamento, seus dados são retidos por 30 dias para possível reativação e, em seguida, excluídos permanentemente, exceto quando a retenção for exigida por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">8. Contato do Encarregado (DPO)</h2>
            <p className="text-muted-foreground">
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso Encarregado de Proteção de Dados:
            </p>
            <p className="text-primary font-medium mt-2">📧 privacidade@prospeaker.com.br</p>
            <p className="text-muted-foreground text-sm mt-1">Respondemos em até 15 dias úteis.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
