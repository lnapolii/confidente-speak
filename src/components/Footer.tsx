import { Zap, Mail, MessageCircle, FileText, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-muted border-t border-border py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                Confidence<span className="text-gradient-primary">Speak</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Desenvolva confiança em inglês corporativo com exercícios práticos 
              e gamificação inteligente.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Imprensa</a></li>
            </ul>
          </div>

          {/* Legal & Suporte */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat ao Vivo
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ConfidenceSpeak. Todos os direitos reservados. 
            Feito com ❤️ para profissionais brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;