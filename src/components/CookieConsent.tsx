import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg animate-slide-up">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Usamos cookies para melhorar sua experiência e analisar o uso da plataforma.
          Ao continuar, você concorda com nossa{' '}
          <a href="/privacy" className="text-primary underline">Política de Privacidade</a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Recusar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
