import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface DifficultyScreenProps {
  onNext: (data: { difficulty: 'vocabulary' | 'pronunciation' | 'thinking' | 'confidence' }) => void;
  onBack: () => void;
}

const DifficultyScreen = ({ onNext, onBack }: DifficultyScreenProps) => {
  const [selected, setSelected] = useState<'vocabulary' | 'pronunciation' | 'thinking' | 'confidence' | null>(null);

  const difficulties = [
    {
      id: 'vocabulary' as const,
      icon: '📚',
      title: 'Vocabulário Corporativo',
      description: 'Não sei as palavras certas para usar',
    },
    {
      id: 'pronunciation' as const,
      icon: '🗣️',
      title: 'Pronúncia',
      description: 'Tenho sotaque forte e me preocupo',
    },
    {
      id: 'thinking' as const,
      icon: '⚡',
      title: 'Pensar Rápido',
      description: 'Demoro para formular frases',
    },
    {
      id: 'confidence' as const,
      icon: '💪',
      title: 'Confiança',
      description: 'Sei falar, mas travo por nervosismo',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-900">
          Qual sua maior dificuldade?
        </h2>
        <p className="text-lg text-gray-600">
          Vamos focar nisso primeiro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.id}
            onClick={() => setSelected(difficulty.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selected === difficulty.id
                ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              <span className="text-5xl block">{difficulty.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">
                {difficulty.title}
              </h3>
              <p className="text-gray-600 text-sm">{difficulty.description}</p>
            </div>
            <div className={`mt-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto ${
              selected === difficulty.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
            }`}>
              {selected === difficulty.id && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <Button onClick={onBack} variant="outline" size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={() => selected && onNext({ difficulty: selected })}
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

export default DifficultyScreen;
