import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, TrendingUp, Clock } from "lucide-react";

interface ExerciseStatsProps {
  accuracy: number;
  fluency: number;
  pronunciation: number;
  wordsConsulted: number;
  timeElapsed: string;
  xpEarned: number;
}

export const ExerciseStats = ({
  accuracy,
  fluency,
  pronunciation,
  wordsConsulted,
  timeElapsed,
  xpEarned
}: ExerciseStatsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Accuracy Card */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            Precisão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary mb-2">{accuracy}%</div>
          <Progress value={accuracy} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            {accuracy >= 90 ? 'Excelente!' : accuracy >= 80 ? 'Muito bom!' : 'Continue praticando!'}
          </p>
        </CardContent>
      </Card>

      {/* Fluency Card */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-success" />
            Fluência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success mb-2">{fluency}%</div>
          <Progress value={fluency} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            Ritmo e naturalidade
          </p>
        </CardContent>
      </Card>

      {/* Pronunciation Card */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5 text-warning" />
            Pronúncia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-warning mb-2">{pronunciation}%</div>
          <Progress value={pronunciation} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            Precisão dos sons
          </p>
        </CardContent>
      </Card>

      {/* Words Consulted Card */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            📚 Vocabulário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">{wordsConsulted}</div>
          <p className="text-sm text-muted-foreground">
            Palavras consultadas durante o exercício
          </p>
        </CardContent>
      </Card>

      {/* Time Card */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-primary" />
            Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">{timeElapsed}</div>
          <p className="text-sm text-muted-foreground">
            Duração do exercício
          </p>
        </CardContent>
      </Card>

      {/* XP Earned Card */}
      <Card className="card-elevated bg-gradient-success text-success-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5" />
            XP Ganhos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">+{xpEarned}</div>
          <p className="text-sm opacity-90">
            Parabéns pelo seu esforço!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
