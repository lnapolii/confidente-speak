import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSent(true);
      toast.success('Email de redefinição enviado!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-accent to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">
              Pro<span className="text-primary">Speaker</span>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Esqueceu sua senha?
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sem problemas! Enviaremos um link para redefinir.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-card-border p-6 md:p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-heading font-bold text-foreground">Email enviado!</h2>
              <p className="text-muted-foreground text-sm">
                Enviamos um link de redefinição para <strong className="text-foreground">{email}</strong>.
                Verifique sua caixa de entrada e spam.
              </p>
              <p className="text-xs text-muted-foreground">O link expira em 1 hora.</p>
              <Button variant="outline" className="w-full min-h-[44px]" onClick={() => setSent(false)}>
                <Mail className="w-4 h-4 mr-2" />
                Enviar para outro email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="mb-1.5 block">Seu e-mail de cadastro</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  maxLength={255}
                  className="min-h-[44px]"
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full btn-hero min-h-[48px] text-lg font-bold"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Mail className="w-5 h-5 mr-2" />}
                Enviar link de redefinição
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/login" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
