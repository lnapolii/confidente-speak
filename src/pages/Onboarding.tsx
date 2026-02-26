import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import ObjectiveScreen from '@/components/onboarding/ObjectiveScreen';
import OnboardingLevelScreen from '@/components/onboarding/OnboardingLevelScreen';
import DailyGoalScreen from '@/components/onboarding/DailyGoalScreen';
import ConfirmationScreen from '@/components/onboarding/ConfirmationScreen';

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState('');

  // Collected data
  const [objective, setObjective] = useState('');
  const [level, setLevel] = useState('');
  const [dailyGoal, setDailyGoal] = useState<number>(0);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('users')
        .select('full_name, onboarding_completed')
        .eq('id', user.id)
        .single();
      if (data?.onboarding_completed) {
        navigate('/dashboard', { replace: true });
        return;
      }
      setUserName(data?.full_name || user.user_metadata?.full_name || '');
    };
    loadUser();
  }, [navigate]);

  const saveOnboarding = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('users')
        .update({
          objective,
          english_level: level,
          daily_goal_minutes: dailyGoal,
          onboarding_completed: true,
        })
        .eq('id', user.id);

      if (error) throw error;

      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/dashboard?firstTime=true');
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => setStep(1)} />,
    <ObjectiveScreen
      key="objective"
      initialValue={objective}
      onNext={(v) => { setObjective(v); setStep(2); }}
      onBack={() => setStep(0)}
    />,
    <OnboardingLevelScreen
      key="level"
      initialValue={level}
      onNext={(v) => { setLevel(v); setStep(3); }}
      onBack={() => setStep(1)}
    />,
    <DailyGoalScreen
      key="goal"
      initialValue={dailyGoal || undefined}
      onNext={(v) => { setDailyGoal(v); setStep(4); }}
      onBack={() => setStep(2)}
    />,
    <ConfirmationScreen
      key="confirmation"
      userName={userName}
      objective={objective}
      level={level}
      dailyGoal={dailyGoal}
      onFinish={saveOnboarding}
      onViewTrail={() => { saveOnboarding().then(() => navigate('/library')); }}
      onBack={() => setStep(3)}
      loading={saving}
    />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-muted h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-muted"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step indicator */}
      <div className="text-center pt-4 text-sm text-muted-foreground">
        {step + 1} de {TOTAL_STEPS}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl"
          >
            {screens[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all ${
              i === step ? 'bg-primary w-8' : i < step ? 'bg-primary/60 w-2.5' : 'bg-muted-foreground/30 w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
