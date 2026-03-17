import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';

const translateAuthError = (message: string): string => {
  if (message.includes('Invalid login credentials')) return 'Email ou senha incorretos. Verifique e tente novamente.';
  if (message.includes('Email not confirmed')) return 'Seu email ainda não foi confirmado. Verifique sua caixa de entrada.';
  if (message.includes('User not found')) return 'Nenhuma conta encontrada com esse email.';
  if (message.includes('Too many requests')) return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
  if (message.includes('Network')) return 'Erro de conexão. Verifique sua internet.';
  return message || 'Erro ao fazer login. Tente novamente.';
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 1;

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error('Erro ao entrar com Google. Tente novamente.');
      }
    } catch {
      toast.error('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        navigate('/verify-email');
        return;
      }

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(translateAuthError(error.message));
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
            Entrar na sua conta
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Continue sua jornada de confiança em inglês</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-card-border p-6 md:p-8 space-y-5">
          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full min-h-[48px] text-base font-medium gap-3"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Entrar com Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium">ou</span>
            <Separator className="flex-1" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="mb-1.5 block">E-mail</Label>
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password">Senha</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  maxLength={128}
                  className="min-h-[44px] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isValid || loading || googleLoading}
              className="w-full btn-hero min-h-[48px] text-lg font-bold"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Entrar
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Não tem uma conta?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">Criar conta grátis</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
