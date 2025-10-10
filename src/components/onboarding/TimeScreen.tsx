import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface TimeScreenProps {
  onNext: (data: { time: 5 | 10 | 15 }) => void;
  onBack: () => void;
}

const TimeScreen = ({ onNext, onBack }: TimeScreenProps) => {
  const [selected, setSelected] = useState<5 | 10 | 15 | null>(null);

  const timeOptions = [
    {
      time: 5 as const,
      icon: '⚡',
      title: '5 minutos',
      subtitle: 'Rápido e eficiente',
      badge: 'Recomendado para começar',
    },
    {
      time: 10 as const,
      icon: '🎯',
      title: '10 minutos',
      subtitle: 'Equilíbrio perfeito',
    },
    {
      time: 15 as const,
      icon: '🚀',
      title: '15+ minutos',
      subtitle: 'Imersão completa',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-900">
          Quanto tempo você tem por dia?
        </h2>
        <p className="text-lg text-gray-600">
          Seja honesto! Consistência é mais importante que duração
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {timeOptions.map((option) => (
          <button
            key={option.time}
            onClick={() => setSelected(option.time)}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              selected === option.time
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {option.badge && (
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                {option.badge}
              </span>
            )}
            <div className="flex items-center gap-4">
              <span className="text-5xl">{option.icon}</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {option.title}
                </h3>
                <p className="text-gray-600">{option.subtitle}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === option.time ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
              }`}>
                {selected === option.time && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Button onClick={onBack} variant="outline" size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={() => selected && onNext({ time: selected })}
          disabled={!selected}
          size="lg"
          className="px-8"
        >
          Continuar →
        </Button>
      </div>
    </div>
  );
};

export default TimeScreen;
