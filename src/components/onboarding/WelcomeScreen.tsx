import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-bounce-in">
          <Rocket className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Bem-vindo ao ConfidenceSpeak! 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          Em apenas 3 minutos você estará fazendo seu primeiro exercício e ganhando confiança para falar inglês.
        </p>
      </div>

      <Button
        onClick={onNext}
        size="lg"
        className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
      >
        Vamos lá! 🚀
      </Button>
    </div>
  );
};

export default WelcomeScreen;
