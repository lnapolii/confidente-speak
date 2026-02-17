const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <a href="/" className="text-primary hover:underline text-sm mb-8 inline-block">← Voltar ao início</a>
        
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Política de Cookies</h1>
        <p className="text-sm text-muted-foreground mb-10">Última atualização: 17 de fevereiro de 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/90">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">1. O que são Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles ajudam o site a lembrar de suas preferências e melhorar sua experiência de uso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">2. Cookies que Utilizamos</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">🔒 Cookies Essenciais (Obrigatórios)</h3>
                <p className="text-sm text-muted-foreground mb-2">Necessários para o funcionamento básico da plataforma. Não podem ser desativados.</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Sessão de autenticação:</strong> mantém você logado na plataforma</li>
                  <li><strong className="text-foreground">Preferências de idioma:</strong> armazena sua configuração de idioma</li>
                  <li><strong className="text-foreground">Consentimento de cookies:</strong> registra sua escolha sobre cookies</li>
                  <li><strong className="text-foreground">Segurança (CSRF):</strong> proteção contra ataques maliciosos</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">📊 Cookies de Análise (Opcionais)</h3>
                <p className="text-sm text-muted-foreground mb-2">Utilizados apenas com seu consentimento explícito para entender como você usa a plataforma.</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Google Analytics (_ga, _gid):</strong> dados anonimizados de navegação, páginas visitadas, tempo no site</li>
                  <li><strong className="text-foreground">Duração:</strong> até 2 anos</li>
                  <li><strong className="text-foreground">Finalidade:</strong> melhorar a experiência do usuário e o conteúdo da plataforma</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">3. Cookies de Terceiros</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Stripe:</strong> cookies para processamento seguro de pagamentos</li>
              <li><strong className="text-foreground">Google Analytics:</strong> análise de uso (apenas com consentimento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">4. Como Gerenciar seus Cookies</h2>
            <p className="mb-2 text-muted-foreground">Você pode controlar os cookies de várias formas:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Banner de cookies:</strong> aceite ou recuse cookies opcionais ao acessar o site</li>
              <li><strong className="text-foreground">Configurações do navegador:</strong> bloqueie ou exclua cookies diretamente no seu navegador</li>
              <li><strong className="text-foreground">Google Analytics Opt-out:</strong> instale o complemento de desativação do Google Analytics</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              Nota: desativar cookies essenciais pode prejudicar o funcionamento da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">5. Base Legal</h2>
            <p className="text-muted-foreground">
              Cookies essenciais são utilizados com base em nosso legítimo interesse para fornecer o serviço. Cookies de análise são utilizados apenas mediante seu consentimento (Art. 7º, I, LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-3">6. Contato</h2>
            <p className="text-muted-foreground">
              Dúvidas sobre cookies? Entre em contato:
            </p>
            <p className="text-primary font-medium mt-2">📧 privacidade@prospeaker.com.br</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
