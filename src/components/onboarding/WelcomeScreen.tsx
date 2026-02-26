import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center"
      >
        <div className="w-28 h-28 bg-gradient-to-br from-primary to-primary-muted rounded-3xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-14 h-14 text-primary-foreground" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Bem-vindo ao ProSpeaker 👋
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Vamos personalizar sua experiência em 2 minutos
        </p>
        <p className="text-base text-muted-foreground/80 max-w-lg mx-auto">
          Pratique inglês corporativo com exercícios de leitura, escuta e fala — tudo adaptado ao seu nível e objetivo profissional.
        </p>
      </div>

      <Button
        onClick={onNext}
        size="lg"
        className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all"
      >
        Vamos começar 🚀
      </Button>
    </div>
  );
};

export default WelcomeScreen;
