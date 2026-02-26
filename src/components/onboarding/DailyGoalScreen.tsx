import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface DailyGoalScreenProps {
  onNext: (minutes: number) => void;
  onBack: () => void;
  initialValue?: number;
}

const options = [
  { minutes: 5, label: '5 min', tip: 'Perfeito para dias corridos' },
  { minutes: 10, label: '10 min', tip: 'Ideal para progresso consistente' },
  { minutes: 15, label: '15 min', tip: 'Ótimo para avançar rápido' },
  { minutes: 20, label: '20 min', tip: 'Máximo impacto diário' },
];

const weeksMap: Record<number, string> = {
  5: '~12 semanas',
  10: '~8 semanas',
  15: '~5 semanas',
  20: '~4 semanas',
};

const DailyGoalScreen = ({ onNext, onBack, initialValue }: DailyGoalScreenProps) => {
  const [selected, setSelected] = useState<number | null>(initialValue || null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Quantos minutos por dia você consegue praticar?
        </h2>
        <p className="text-muted-foreground">Qualquer quantidade já faz diferença!</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((opt, i) => {
          const isSelected = selected === opt.minutes;
          return (
            <motion.button
              key={opt.minutes}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(opt.minutes)}
              className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-accent shadow-md'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <Clock className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xl font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {opt.label}
              </span>
              <span className="text-xs text-muted-foreground text-center">{opt.tip}</span>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 rounded-xl bg-accent border border-primary/20"
        >
          <p className="text-sm text-foreground">
            Com <strong>{selected} min/dia</strong> você avança 1 nível em{' '}
            <strong>{weeksMap[selected]}</strong> 🚀
          </p>
        </motion.div>
      )}

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

export default DailyGoalScreen;
