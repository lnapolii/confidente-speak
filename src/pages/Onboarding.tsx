import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import AssessmentScreen from '@/components/onboarding/AssessmentScreen';
import GoalScreen from '@/components/onboarding/GoalScreen';
import TourScreen from '@/components/onboarding/TourScreen';

export type OnboardingData = {
  level?: 'basic' | 'intermediate' | 'advanced';
  difficulty?: 'vocabulary' | 'pronunciation' | 'thinking' | 'confidence';
  time?: 5 | 10 | 15;
  weeklyGoal?: number;
  reminderTime?: string;
  enableReminders?: boolean;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = (stepData: Partial<OnboardingData>) => {
    const updated = { ...data, ...stepData };
    setData(updated);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboardingData', JSON.stringify(updated));
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/dashboard?firstTime=true');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    const defaultData: OnboardingData = {
      level: 'intermediate',
      difficulty: 'confidence',
      time: 5,
      weeklyGoal: 5,
      enableReminders: false,
    };
    localStorage.setItem('onboardingData', JSON.stringify(defaultData));
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/dashboard');
  };

  const screens = [
    <WelcomeScreen key="welcome" onNext={() => handleNext({})} />,
    <AssessmentScreen key="assessment" onNext={handleNext} onBack={handleBack} />,
    <GoalScreen key="goal" onNext={handleNext} onBack={handleBack} />,
    <TourScreen key="tour" onNext={() => handleNext({})} onBack={handleBack} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-muted h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-muted"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Pular onboarding
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {screens[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 pb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentStep ? 'bg-primary w-8' : i < currentStep ? 'bg-primary/60' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
