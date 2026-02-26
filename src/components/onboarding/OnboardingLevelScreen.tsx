import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface OnboardingLevelScreenProps {
  onNext: (level: string) => void;
  onBack: () => void;
  initialValue?: string;
}

const levels = [
  {
    id: 'beginner',
    title: 'Iniciante',
    description: 'Entendo pouco, me travo para falar',
    emoji: '🌱',
  },
  {
    id: 'intermediate',
    title: 'Intermediário',
    description: 'Me comunico, mas perco confiança',
    emoji: '📈',
  },
  {
    id: 'advanced',
    title: 'Avançado',
    description: 'Me comunico bem, quero refinar',
    emoji: '🎯',
  },
];

const OnboardingLevelScreen = ({ onNext, onBack, initialValue }: OnboardingLevelScreenProps) => {
  const [selected, setSelected] = useState<string | null>(initialValue || null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Como você se descreve hoje em inglês?
        </h2>
        <p className="text-muted-foreground">Isso nos ajuda a escolher exercícios no seu nível</p>
      </div>

      <div className="grid gap-4">
        {levels.map((level, i) => {
          const isSelected = selected === level.id;
          return (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(level.id)}
              className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-accent shadow-md'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <span className="text-3xl">{level.emoji}</span>
              <div>
                <h3 className={`font-semibold text-lg ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                  {level.title}
                </h3>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Voltar
        </Button>
        <Button onClick={() => selected && onNext(selected)} disabled={!selected} className="flex-1">
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLevelScreen;
