import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">
            Pro<span className="text-gradient-primary">Speaker</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Início
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Como Funciona
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Preços
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <a href="/login">Login</a>
          </Button>
          <Button className="btn-hero hover-lift hidden md:inline-flex" asChild>
            <a href="/signup">
              <Zap className="w-4 h-4 mr-2" />
              Começar 7 Dias Grátis
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
