import { Button } from "@/components/ui/button";
import { Medal, Zap, Users, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-heading font-bold text-foreground">
            Confidence<span className="text-gradient-primary">Speak</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Funcionalidades
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <a href="/dashboard">Entrar</a>
          </Button>
          <Button className="btn-hero" asChild>
            <a href="/dashboard">Começar Grátis</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;