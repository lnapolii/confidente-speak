import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Presentation, Globe, Briefcase, Handshake, TrendingUp } from 'lucide-react';

interface ObjectiveScreenProps {
  onNext: (objective: string) => void;
  onBack: () => void;
  initialValue?: string;
}

const objectives = [
  { id: 'meetings', label: 'Reuniões e calls internacionais', icon: Users },
  { id: 'presentations', label: 'Apresentações e pitches', icon: Presentation },
  { id: 'leadership', label: 'Liderança de equipes globais', icon: Globe },
  { id: 'interviews', label: 'Entrevistas de emprego em inglês', icon: Briefcase },
  { id: 'negotiations', label: 'Negociações com clientes/parceiros', icon: Handshake },
  { id: 'career', label: 'Crescimento de carreira geral', icon: TrendingUp },
];

const ObjectiveScreen = ({ onNext, onBack, initialValue }: ObjectiveScreenProps) => {
  const [selected, setSelected] = useState<string | null>(initialValue || null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Por que você quer melhorar seu inglês corporativo?
        </h2>
        <p className="text-muted-foreground">Selecione seu objetivo principal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {objectives.map((obj, i) => {
          const Icon = obj.icon;
          const isSelected = selected === obj.id;
          return (
            <motion.button
              key={obj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(obj.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-accent shadow-md'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                {obj.label}
              </span>
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

export default ObjectiveScreen;
