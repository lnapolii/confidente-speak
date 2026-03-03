import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Flame, CheckCircle2, Trophy } from 'lucide-react';

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  todayMinutes: number;
  dailyGoalMinutes: number;
  goalCompleted: boolean;
  loading?: boolean;
}

const StreakWidget = ({
  currentStreak,
  longestStreak,
  todayMinutes,
  dailyGoalMinutes,
  goalCompleted,
  loading,
}: StreakWidgetProps) => {
  const progressPercent = Math.min((todayMinutes / dailyGoalMinutes) * 100, 100);
  const remaining = Math.max(dailyGoalMinutes - todayMinutes, 0);

  if (loading) {
    return (
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* Flame Icon */}
          <div className="shrink-0">
            <motion.div
              animate={currentStreak > 0 ? {
                scale: [1, 1.1, 1],
                opacity: [1, 0.85, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                currentStreak > 0
                  ? 'bg-gradient-to-br from-orange-400 to-red-500'
                  : 'bg-muted'
              }`}
            >
              <Flame className={`w-8 h-8 ${currentStreak > 0 ? 'text-white' : 'text-muted-foreground'}`} />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-foreground">{currentStreak}</span>
              <span className="text-muted-foreground text-sm">
                {currentStreak === 1 ? 'dia seguido' : 'dias seguidos'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <Trophy className="w-3.5 h-3.5" />
              <span>Seu recorde: {longestStreak} dias</span>
            </div>

            {/* Daily goal progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meta do dia</span>
                <span className="font-medium text-foreground">
                  {todayMinutes} de {dailyGoalMinutes} min
                </span>
              </div>
              <Progress value={progressPercent} className="h-2.5" />

              {goalCompleted ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'hsl(var(--success))' }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Meta de hoje concluída!
                </motion.div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {remaining > 0
                    ? `Faltam ${remaining} min para manter sua sequência`
                    : 'Continue praticando!'}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakWidget;
