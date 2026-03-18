import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#", label: "Início" },
    { href: "#how-it-works", label: "Como Funciona" },
    { href: "#pricing", label: "Preços" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden min-h-[44px] min-w-[44px]" aria-label="Abrir menu">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-heading font-bold text-foreground">
                Pro<span className="text-gradient-primary">Speaker</span>
              </span>
            </div>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.label}>
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      className="block py-3 px-4 rounded-lg text-foreground font-medium hover:bg-accent transition-colors min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-border space-y-3">
            <Button variant="outline" className="w-full min-h-[44px]" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="w-full min-h-[44px] btn-hero" asChild>
              <a href="/signup">
                <Zap className="w-4 h-4 mr-2" />
                Começar 7 Dias Grátis
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
