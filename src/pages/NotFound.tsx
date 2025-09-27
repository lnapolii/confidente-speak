import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-heading font-bold text-foreground">
            Confidence<span className="text-gradient-primary">Speak</span>
          </h1>
        </div>

        {/* Error Content */}
        <div className="card-elevated p-8 mb-8">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-muted-foreground mb-6">
            Ops! A página que você está procurando não existe ou foi movida. 
            Que tal voltar e continuar praticando seu inglês?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-hero" asChild>
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ir para Dashboard
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
