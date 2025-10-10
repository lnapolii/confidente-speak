import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface LevelScreenProps {
  onNext: (data: { level: 'basic' | 'intermediate' | 'advanced' }) => void;
  onBack: () => void;
}

const LevelScreen = ({ onNext, onBack }: LevelScreenProps) => {
  const [selected, setSelected] = useState<'basic' | 'intermediate' | 'advanced' | null>(null);

  const levels = [
    {
      id: 'basic' as const,
      icon: '🌱',
      title: 'BÁSICO',
      description: 'Entendo pouco e tenho dificuldade para falar',
    },
    {
      id: 'intermediate' as const,
      icon: '🌿',
      title: 'INTERMEDIÁRIO',
      description: 'Entendo bem, mas trava na hora de falar',
      recommended: true,
    },
    {
      id: 'advanced' as const,
      icon: '🌳',
      title: 'AVANÇADO',
      description: 'Falo bem, só preciso ganhar confiança',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-900">
          Qual seu nível atual de inglês?
        </h2>
        <p className="text-lg text-gray-600">
          Isso nos ajuda a recomendar exercícios ideais para você
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelected(level.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              selected === level.id
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {level.recommended && (
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                RECOMENDADO
              </span>
            )}
            <div className="flex items-start gap-4">
              <span className="text-5xl">{level.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {level.title}
                </h3>
                <p className="text-gray-600">{level.description}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === level.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
              }`}>
                {selected === level.id && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={() => selected && onNext({ level: selected })}
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

export default LevelScreen;
