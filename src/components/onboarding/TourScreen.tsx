import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Mic, Bookmark, TrendingUp } from 'lucide-react';

interface TourScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const features = [
  {
    icon: BookOpen,
    title: 'Exercícios Interativos',
    description: 'Pratique com textos reais de reuniões, apresentações e negociações. Clique nas palavras para ver traduções instantâneas.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Mic,
    title: 'Gravação de Voz',
    description: 'Grave sua pronúncia e receba análise com IA. Compare sua fala com o áudio nativo e melhore continuamente.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: Bookmark,
    title: 'Sua Biblioteca',
    description: 'Salve exercícios e palavras favoritas. Organize seu material de estudo e acesse quando quiser.',
    color: 'bg-warning/10 text-warning',
  },
  {
    icon: TrendingUp,
    title: 'Progresso & Conquistas',
    description: 'Acompanhe seu streak, XP e nível. Ganhe conquistas conforme evolui e mantenha a motivação.',
    color: 'bg-accent text-accent-foreground',
  },
];

const TourScreen = ({ onNext, onBack }: TourScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Conheça a Plataforma ✨
        </h2>
        <p className="text-muted-foreground">
          Veja o que o ProSpeaker tem para você
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                  : 'border-border hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                  {isActive && (
                    <p className="text-muted-foreground mt-1 animate-fade-in">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Button onClick={onBack} variant="outline" size="lg">
          Voltar
        </Button>
        <Button onClick={onNext} size="lg" className="px-8 shadow-lg">
          🚀 Começar a Aprender!
        </Button>
      </div>
    </div>
  );
};

export default TourScreen;
