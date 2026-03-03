import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, BarChart3, Clock } from 'lucide-react';

interface ConfirmationScreenProps {
  userName: string;
  objective: string;
  level: string;
  dailyGoal: number;
  onFinish: () => void;
  onViewTrail: () => void;
  onDiagnostic?: () => void;
  onBack: () => void;
  loading?: boolean;
}

const objectiveLabels: Record<string, string> = {
  meetings: 'Reuniões e calls internacionais',
  presentations: 'Apresentações e pitches',
  leadership: 'Liderança de equipes globais',
  interviews: 'Entrevistas de emprego',
  negotiations: 'Negociações com clientes',
  career: 'Crescimento de carreira',
};

const levelLabels: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

const ConfirmationScreen = ({
  userName,
  objective,
  level,
  dailyGoal,
  onFinish,
  onViewTrail,
  onDiagnostic,
  onBack,
  loading,
}: ConfirmationScreenProps) => {
  const firstName = userName?.split(' ')[0] || 'Usuário';

  const items = [
    { icon: Target, label: 'Objetivo', value: objectiveLabels[objective] || objective },
    { icon: BarChart3, label: 'Nível', value: levelLabels[level] || level },
    { icon: Clock, label: 'Meta diária', value: `${dailyGoal} minutos` },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold text-foreground">
          Tudo pronto, {firstName}! 🎉
        </h2>
        <p className="text-muted-foreground">Seu perfil personalizado foi criado</p>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-3">
        {level === 'intermediate' && onDiagnostic && (
          <Button
            variant="outline"
            size="lg"
            className="w-full text-lg py-6 border-primary text-primary hover:bg-accent"
            onClick={onDiagnostic}
          >
            🧠 Fazer diagnóstico de nível (3 min)
          </Button>
        )}
        <Button onClick={onFinish} size="lg" className="w-full text-lg py-6" disabled={loading}>
          {loading ? 'Salvando...' : 'Iniciar minha primeira sessão'}
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Voltar
          </Button>
          <Button variant="ghost" onClick={onViewTrail} className="flex-1 text-muted-foreground">
            Ver minha trilha recomendada
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
