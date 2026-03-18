import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Wraps premium content. Shows children if user has active/trialing subscription,
 * otherwise shows an upgrade prompt.
 */
const PremiumGate = ({ children, fallback }: PremiumGateProps) => {
  const { isPremium, loading } = useSubscription();
  const navigate = useNavigate();

  if (loading) return null;

  if (isPremium) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <div className="relative rounded-xl border border-border bg-muted/30 p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Lock className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-heading font-bold text-foreground mb-2">Conteúdo Premium</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
        Este recurso está disponível para assinantes Pro. Comece com 7 dias grátis!
      </p>
      <Button className="btn-hero gap-2" onClick={() => navigate('/#pricing')}>
        <Crown className="w-4 h-4" />
        Assinar Pro
      </Button>
    </div>
  );
};

export default PremiumGate;
