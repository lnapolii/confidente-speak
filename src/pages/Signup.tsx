import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  englishLevel: string;
  learningGoal: string;
  preferredTime: string;
  acceptedTerms: boolean;
};

const STEPS = ['Dados Pessoais', 'Preferências', 'Confirmação'];

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    englishLevel: '',
    learningGoal: '',
    preferredTime: '',
    acceptedTerms: false,
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = form.fullName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.password.length >= 8;
  const isStep2Valid = !!form.englishLevel && !!form.learningGoal && !!form.preferredTime;
  const isStep3Valid = form.acceptedTerms;

  const canProceed = step === 0 ? isStep1Valid : step === 1 ? isStep2Valid : isStep3Valid;

  const handleSubmit = async () => {
    if (!canProceed) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: form.fullName,
            english_level: form.englishLevel,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        await supabase.from('users').upsert({
          id: data.user.id,
          email: form.email,
          full_name: form.fullName,
          english_level: form.englishLevel,
          job_role: form.learningGoal,
          how_did_you_hear: form.preferredTime,
        });
      }

      toast.success('Conta criada! Verifique seu e-mail para confirmar.');
      navigate('/onboarding');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-accent to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Crie sua conta <span className="text-primary">ProSpeaker</span>
          </h1>
          <p className="text-muted-foreground mt-2">Comece sua jornada de fluência em inglês</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                i < step ? 'bg-success text-success-foreground' :
                i === step ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${i === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-success' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-lg border border-card-border p-8">
          <motion.div key={step} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>

            {/* Step 1: Personal Data */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="fullName" className="mb-1.5 block">Nome Completo</Label>
                  <Input
                    id="fullName"
                    placeholder="Ex: Maria Silva"
                    value={form.fullName}
                    onChange={e => updateField('fullName', e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-1.5 block">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    maxLength={255}
                  />
                  {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <p className="text-sm text-destructive mt-1">E-mail inválido</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-1.5 block">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      value={form.password}
                      onChange={e => updateField('password', e.target.value)}
                      maxLength={128}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.password && form.password.length < 8 && (
                    <p className="text-sm text-destructive mt-1">A senha deve ter no mínimo 8 caracteres</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label className="mb-1.5 block">Nível de Inglês Atual</Label>
                  <Select value={form.englishLevel} onValueChange={v => updateField('englishLevel', v)}>
                    <SelectTrigger><SelectValue placeholder="Selecione seu nível" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Iniciante — Sei pouco ou nenhum inglês</SelectItem>
                      <SelectItem value="intermediate">Intermediário — Entendo mas travo ao falar</SelectItem>
                      <SelectItem value="advanced">Avançado — Falo bem mas quero mais fluência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5 block">Objetivo Principal</Label>
                  <Select value={form.learningGoal} onValueChange={v => updateField('learningGoal', v)}>
                    <SelectTrigger><SelectValue placeholder="Por que quer aprender?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">Carreira — Reuniões e apresentações</SelectItem>
                      <SelectItem value="travel">Viagens — Comunicação no exterior</SelectItem>
                      <SelectItem value="academic">Acadêmico — Estudos e pesquisas</SelectItem>
                      <SelectItem value="personal">Pessoal — Desenvolvimento próprio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5 block">Horário Preferido para Praticar</Label>
                  <Select value={form.preferredTime} onValueChange={v => updateField('preferredTime', v)}>
                    <SelectTrigger><SelectValue placeholder="Quando prefere estudar?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Manhã — 6h às 12h</SelectItem>
                      <SelectItem value="afternoon">Tarde — 12h às 18h</SelectItem>
                      <SelectItem value="evening">Noite — 18h às 23h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-muted rounded-xl p-5 space-y-3">
                  <h3 className="font-semibold text-foreground">Resumo do seu perfil</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Nome:</span>
                      <p className="font-medium text-foreground">{form.fullName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">E-mail:</span>
                      <p className="font-medium text-foreground">{form.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nível:</span>
                      <p className="font-medium text-foreground capitalize">{form.englishLevel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Objetivo:</span>
                      <p className="font-medium text-foreground capitalize">{form.learningGoal}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={form.acceptedTerms}
                    onCheckedChange={v => updateField('acceptedTerms', v === true)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Eu li e aceito os{' '}
                    <Link to="/terms" className="text-primary underline hover:text-primary/80">Termos de Uso</Link>{' '}
                    e a{' '}
                    <Link to="/privacy" className="text-primary underline hover:text-primary/80">Política de Privacidade</Link>.
                  </Label>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => step > 0 ? setStep(step - 1) : navigate('/')}
              disabled={loading}
            >
              {step === 0 ? 'Voltar ao site' : 'Voltar'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed || loading}
              className="min-w-[140px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {step < 2 ? 'Próximo' : 'Criar Conta'}
            </Button>
          </div>
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
