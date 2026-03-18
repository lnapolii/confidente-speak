import { useSubscription } from '@/hooks/useSubscription';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, XCircle, CreditCard, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortalSession } from '@/services/stripeService';
import { useState } from 'react';

const SubscriptionBanner = () => {
  const { isPastDue, isCanceled, isFree, loading } = useSubscription();
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = useState(false);

  const handlePortal = async () => {
    setPortalLoading(true);
    try { await createPortalSession(); } catch { setPortalLoading(false); }
  };

  if (loading) return null;

  if (isPastDue) {
    return (
      <Alert className="border-warning/30 bg-warning/5 mb-6">
        <AlertCircle className="h-5 w-5 text-warning" />
        <AlertTitle className="text-foreground font-semibold">Problema no pagamento</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Não conseguimos processar seu último pagamento. Atualize seu método de pagamento para manter o acesso ao conteúdo premium.
          <Button
            variant="outline"
            size="sm"
            className="ml-3 gap-1.5 border-warning/30 text-warning hover:text-warning"
            onClick={handlePortal}
            disabled={portalLoading}
          >
            <CreditCard className="w-3.5 h-3.5" />
            {portalLoading ? 'Abrindo...' : 'Atualizar pagamento'}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isCanceled) {
    return (
      <Alert className="border-destructive/30 bg-destructive/5 mb-6">
        <XCircle className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-foreground font-semibold">Assinatura cancelada</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Sua assinatura foi cancelada. Reative para continuar acessando todo o conteúdo premium.
          <Button
            size="sm"
            className="ml-3 gap-1.5 btn-hero"
            onClick={() => navigate('/#pricing')}
          >
            <Crown className="w-3.5 h-3.5" />
            Reativar assinatura
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isFree) {
    return (
      <Alert className="border-primary/30 bg-primary/5 mb-6">
        <Crown className="h-5 w-5 text-primary" />
        <AlertTitle className="text-foreground font-semibold">Desbloqueie todo o conteúdo</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Você está no plano gratuito. Assine o Pro para exercícios ilimitados, roleplay com IA e muito mais.
          <Button
            size="sm"
            className="ml-3 gap-1.5 btn-hero"
            onClick={() => navigate('/#pricing')}
          >
            <Crown className="w-3.5 h-3.5" />
            Assinar Pro — 7 dias grátis
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default SubscriptionBanner;
