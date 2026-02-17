import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Get email from current session
    const getEmail = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // If already confirmed, redirect
        if (session.user.email_confirmed_at) {
          navigate('/onboarding', { replace: true });
          return;
        }
        setEmail(session.user.email || '');
      }
    };
    getEmail();

    // Listen for auth changes (when user confirms email in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'USER_UPDATED' && session?.user?.email_confirmed_at) {
        toast.success('Email confirmado com sucesso!');
        navigate('/onboarding', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || !email) return;
    setResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      toast.success('Email de confirmação reenviado!');
      setCooldown(60);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao reenviar email');
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '•'.repeat(Math.min(b.length, 5)) + c)
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-accent to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">
            Pro<span className="text-primary">Speaker</span>
          </span>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-card-border p-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
            Verifique seu email
          </h1>

          <p className="text-muted-foreground mb-2">
            Enviamos um link de confirmação para:
          </p>

          <p className="text-foreground font-semibold mb-6">
            {maskedEmail}
          </p>

          <div className="bg-muted rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              Abra seu email e clique em <strong className="text-foreground">"Confirmar Email"</strong>
            </p>
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              Verifique a pasta de spam se não encontrar
            </p>
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              O link expira em 24 horas
            </p>
          </div>

          <Button
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            variant="outline"
            className="w-full min-h-[44px]"
          >
            {resending ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            {cooldown > 0
              ? `Reenviar em ${cooldown}s`
              : 'Reenviar email de confirmação'}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Usou o email errado?{' '}
            <button
              onClick={() => {
                supabase.auth.signOut();
                navigate('/signup');
              }}
              className="text-primary hover:underline font-medium"
            >
              Criar nova conta
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
