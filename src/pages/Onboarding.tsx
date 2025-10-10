import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import LevelScreen from '@/components/onboarding/LevelScreen';
import DifficultyScreen from '@/components/onboarding/DifficultyScreen';
import TimeScreen from '@/components/onboarding/TimeScreen';
import GoalScreen from '@/components/onboarding/GoalScreen';

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

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData({ ...data, ...stepData });
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar dados e ir para dashboard
      localStorage.setItem('onboardingData', JSON.stringify({ ...data, ...stepData }));
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/dashboard?firstTime=true');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Valores default
    const defaultData: OnboardingData = {
      level: 'intermediate',
      difficulty: 'confidence',
      time: 5,
      weeklyGoal: 5,
      enableReminders: false
    };
    localStorage.setItem('onboardingData', JSON.stringify(defaultData));
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/dashboard');
  };

  const screens = [
    <WelcomeScreen onNext={() => handleNext({})} />,
    <LevelScreen onNext={handleNext} onBack={handleBack} />,
    <DifficultyScreen onNext={handleNext} onBack={handleBack} />,
    <TimeScreen onNext={handleNext} onBack={handleBack} />,
    <GoalScreen onNext={handleNext} onBack={handleBack} />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
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

      {/* Progress Indicator */}
      <div className="text-center pb-8 text-sm text-gray-500">
        Etapa {currentStep + 1} de {totalSteps}
      </div>
    </div>
  );
};

export default Onboarding;
