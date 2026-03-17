import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from 'sonner';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  englishLevel: string;
  jobRole: string;
  howDidYouHear: string;
  acceptedTerms: boolean;
  acceptedMarketing: boolean;
};

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const getPasswordStrength = (password: string): { label: string; color: string; width: string } => {
  if (!password) return { label: '', color: '', width: '0%' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Fraca', color: 'bg-destructive', width: '33%' };
  if (score <= 3) return { label: 'Média', color: 'bg-warning', width: '66%' };
  return { label: 'Forte', color: 'bg-success', width: '100%' };
};

const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
};

const translateSignupError = (message: string): string => {
  if (message.includes('User already registered')) return 'Este email já possui uma conta. Tente fazer login.';
  if (message.includes('Password should be')) return 'A senha deve ter no mínimo 8 caracteres.';
  if (message.includes('Unable to validate email')) return 'Email inválido. Verifique e tente novamente.';
  if (message.includes('Too many requests')) return 'Muitas tentativas. Aguarde alguns minutos.';
  return message || 'Erro ao criar conta. Tente novamente.';
};

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    englishLevel: '',
    jobRole: '',
    howDidYouHear: '',
    acceptedTerms: false,
    acceptedMarketing: false,
  });

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const markTouched = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const errors: Partial<Record<keyof FormData, string>> = {};
  if (form.fullName.trim().length > 0 && form.fullName.trim().length < 3) errors.fullName = 'Mínimo 3 caracteres';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-mail inválido';
  if (form.phone && !isValidPhone(form.phone)) errors.phone = 'Formato: (11) 99999-9999';
  if (form.password && form.password.length < 8) errors.password = 'Mínimo 8 caracteres';
  if (form.confirmPassword && form.confirmPassword !== form.password) errors.confirmPassword = 'Senhas não conferem';

  const strength = getPasswordStrength(form.password);

  const isFormValid =
    form.fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    isValidPhone(form.phone) &&
    form.password.length >= 8 &&
    form.confirmPassword === form.password &&
    !!form.englishLevel &&
    form.acceptedTerms;

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error('Erro ao criar conta com Google. Tente novamente.');
      }
    } catch {
      toast.error('Erro ao criar conta com Google. Tente novamente.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: form.fullName.trim(),
            english_level: form.englishLevel,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        await supabase.from('users').upsert({
          id: data.user.id,
          email: form.email.trim(),
          full_name: form.fullName.trim(),
          english_level: form.englishLevel,
          phone: form.phone.replace(/\D/g, ''),
          job_role: form.jobRole.trim() || null,
          how_did_you_hear: form.howDidYouHear || null,
        });
      }

      toast.success('Conta criada! Verifique seu e-mail para confirmar.');
      navigate('/verify-email');
    } catch (error: any) {
      toast.error(translateSignupError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ field }: { field: keyof FormData }) => (
    touched[field] && errors[field] ? (
      <p className="text-sm text-destructive mt-1">{errors[field]}</p>
    ) : null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-accent to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
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
            Crie sua conta gratuita
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">7 dias grátis • Sem cartão de crédito</p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-card-border p-6 md:p-8 space-y-5">
          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
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
            Criar conta com Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground font-medium">ou preencha o formulário</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <Label htmlFor="fullName" className="mb-1.5 block">Nome Completo *</Label>
              <Input
                id="fullName"
                placeholder="Ex: Maria Silva"
                value={form.fullName}
                onChange={e => updateField('fullName', e.target.value)}
                onBlur={() => markTouched('fullName')}
                maxLength={100}
                className="min-h-[44px]"
              />
              <FieldError field="fullName" />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-1.5 block">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
                onBlur={() => markTouched('email')}
                maxLength={255}
                className="min-h-[44px]"
              />
              <FieldError field="email" />
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone" className="mb-1.5 block">WhatsApp / Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChange={e => updateField('phone', formatPhone(e.target.value))}
                onBlur={() => markTouched('phone')}
                className="min-h-[44px]"
              />
              <FieldError field="phone" />
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password" className="mb-1.5 block">Senha *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={e => updateField('password', e.target.value)}
                  onBlur={() => markTouched('password')}
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
              <FieldError field="password" />
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} transition-all duration-300 rounded-full`} style={{ width: strength.width }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Força: <span className="font-medium">{strength.label}</span></p>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <Label htmlFor="confirmPassword" className="mb-1.5 block">Confirmar Senha *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repita a senha"
                  value={form.confirmPassword}
                  onChange={e => updateField('confirmPassword', e.target.value)}
                  onBlur={() => markTouched('confirmPassword')}
                  maxLength={128}
                  className="min-h-[44px] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <FieldError field="confirmPassword" />
            </div>

            {/* Nível de inglês */}
            <div>
              <Label className="mb-1.5 block">Seu nível de inglês *</Label>
              <Select value={form.englishLevel} onValueChange={v => updateField('englishLevel', v)}>
                <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Selecione seu nível" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico — Entendo pouco</SelectItem>
                  <SelectItem value="intermediate">Intermediário — Entendo bem, trava ao falar</SelectItem>
                  <SelectItem value="advanced">Avançado — Só preciso de confiança</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cargo */}
            <div>
              <Label htmlFor="jobRole" className="mb-1.5 block">Cargo ou Área <span className="text-muted-foreground text-xs">(opcional)</span></Label>
              <Input
                id="jobRole"
                placeholder="Ex: Desenvolvedor, Product Manager, Analista..."
                value={form.jobRole}
                onChange={e => updateField('jobRole', e.target.value)}
                maxLength={100}
                className="min-h-[44px]"
              />
            </div>

            {/* Como conheceu */}
            <div>
              <Label className="mb-1.5 block">Como conheceu o ProSpeaker? <span className="text-muted-foreground text-xs">(opcional)</span></Label>
              <Select value={form.howDidYouHear} onValueChange={v => updateField('howDidYouHear', v)}>
                <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Selecione uma opção" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="friend">Indicação de amigo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Termos */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={form.acceptedTerms}
                  onCheckedChange={v => updateField('acceptedTerms', v === true)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Aceito os{' '}
                  <Link to="/terms" className="text-primary underline hover:text-primary/80">Termos de Uso</Link>{' '}
                  e a{' '}
                  <Link to="/privacy" className="text-primary underline hover:text-primary/80">Política de Privacidade</Link> *
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="marketing"
                  checked={form.acceptedMarketing}
                  onCheckedChange={v => updateField('acceptedMarketing', v === true)}
                />
                <Label htmlFor="marketing" className="text-sm leading-relaxed cursor-pointer text-muted-foreground">
                  Quero receber dicas e conteúdos por email
                </Label>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isFormValid || loading || googleLoading}
              className="w-full btn-hero min-h-[48px] text-lg font-bold"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              🚀 Começar 7 Dias Grátis
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              ✓ Sem cartão de crédito • ✓ Cancele quando quiser
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
