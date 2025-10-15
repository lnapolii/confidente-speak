import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Zap, Target, Rocket } from 'lucide-react';

interface DurationSelectorProps {
  onSelect: (duration: number) => void;
  selectedDuration?: number;
}

const DurationSelector = ({ onSelect, selectedDuration = 10 }: DurationSelectorProps) => {
  const [selected, setSelected] = useState(selectedDuration);

  const durations = [
    {
      value: 5,
      icon: Zap,
      emoji: '⚡',
      label: 'Rápido e Eficiente',
      description: 'Perfeito para prática rápida no intervalo'
    },
    {
      value: 10,
      icon: Target,
      emoji: '🎯',
      label: 'Equilíbrio Ideal',
      description: 'Tempo ideal para aprendizado consistente'
    },
    {
      value: 15,
      icon: Rocket,
      emoji: '🚀',
      label: 'Imersão Completa',
      description: 'Experiência completa com vocabulário avançado'
    }
  ];

  const handleSelect = (value: number) => {
    setSelected(value);
    onSelect(value);
  };

  const currentDuration = durations.find(d => d.value === selected);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Quanto tempo você tem hoje?
        </h3>
        <p className="text-muted-foreground">
          Escolha a duração do seu exercício
        </p>
      </div>

      {/* Botões em linha - responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {durations.map((duration) => {
          const Icon = duration.icon;
          const isSelected = selected === duration.value;
          
          return (
            <button
              key={duration.value}
              onClick={() => handleSelect(duration.value)}
              className={`
                group relative flex flex-col items-center justify-center
                px-6 py-8 rounded-2xl font-bold text-center
                transition-all duration-200 border-2
                hover:shadow-lg hover:scale-[1.02]
                ${isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105'
                  : 'bg-card text-card-foreground border-border hover:border-primary/50'
                }
              `}
            >
              {/* Ícone/Emoji */}
              <div className="text-5xl mb-3">
                {duration.emoji}
              </div>
              
              {/* Número */}
              <div className="text-4xl font-black mb-1">
                {duration.value}
              </div>
              
              {/* Texto "minutos" */}
              <div className="text-lg mb-2">
                minutos
              </div>
              
              {/* Label */}
              <div className={`text-sm font-semibold ${isSelected ? 'opacity-100' : 'opacity-75'}`}>
                {duration.label}
              </div>

              {/* Indicador de seleção */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Preview do exercício selecionado */}
      {currentDuration && (
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-foreground mb-1">
                  Exercício de {selected} minutos
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentDuration.description}
                </p>
                {selected === 15 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      ⭐ Versão Avançada
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      📚 Vocabulário Extra
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      🌍 Dicas Culturais
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DurationSelector;
