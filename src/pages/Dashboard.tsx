import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressChart } from "@/components/ProgressChart";
import StreakWidget from "@/components/StreakWidget";
import { useStreak } from "@/hooks/useStreak";
import { supabase } from "@/integrations/supabase/client";
import { 
  Flame, Trophy, Zap, Target, Calendar, TrendingUp, Play, Clock,
  Star, Award, Bookmark, CreditCard
} from "lucide-react";
import SubscriptionBanner from "@/components/SubscriptionBanner";

const mockProgressData = [
  { date: '15/01', score: 78, exercises: 2 },
  { date: '16/01', score: 82, exercises: 3 },
  { date: '17/01', score: 85, exercises: 2 },
  { date: '18/01', score: 88, exercises: 4 },
  { date: '19/01', score: 90, exercises: 3 },
  { date: '20/01', score: 87, exercises: 2 },
];

const Dashboard = () => {
  const streak = useStreak();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('users').select('full_name').eq('id', user.id).single();
      setUserName(data?.full_name?.split(' ')[0] || 'Usuário');
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-heading font-bold text-foreground">
              Pro<span className="text-gradient-primary">Speaker</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="xp-badge">
              <Star className="w-4 h-4" />
              1,247 XP
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href="/library">
                <Bookmark className="w-4 h-4 mr-1" />
                Biblioteca
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/profile">Perfil</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Bom dia, {userName}! 👋
          </h2>
          <p className="text-muted-foreground">
            Continue praticando para alcançar o próximo nível.
          </p>
        </div>

        {/* Streak Widget */}
        <div className="mb-8">
          <StreakWidget
            currentStreak={streak.currentStreak}
            longestStreak={streak.longestStreak}
            todayMinutes={streak.todayMinutes}
            dailyGoalMinutes={streak.dailyGoalMinutes}
            goalCompleted={streak.goalCompleted}
            loading={streak.loading}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-sm text-muted-foreground">Precisão Média</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center text-warning">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3h 24m</p>
                  <p className="text-sm text-muted-foreground">Tempo Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center text-success">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Conquistas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Practice Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Prática Rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="btn-hero h-auto p-4 flex-col" asChild>
                    <a href="/exercise">
                      <Clock className="w-6 h-6 mb-2" />
                      <span className="text-base font-medium">Exercício 5min</span>
                      <span className="text-xs opacity-80">Meeting Skills</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col border-2" asChild>
                    <a href="/exercise">
                      <Target className="w-6 h-6 mb-2" />
                      <span className="text-base font-medium">Exercício 10min</span>
                      <span className="text-xs opacity-60">Presentation Skills</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <ProgressChart data={mockProgressData} title="Seu Progresso Semanal" />

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Últimos Exercícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Team Meeting Discussion", score: 92, time: "2h atrás", category: "Reuniões" },
                    { title: "Client Presentation", score: 88, time: "1 dia atrás", category: "Apresentações" },
                    { title: "Negotiation Tactics", score: 95, time: "2 dias atrás", category: "Negociações" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background-muted rounded-lg hover-lift transition-all">
                      <div className="flex-1">
                        <p className="font-medium text-foreground mb-1">{item.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{item.category}</span>
                          <span className="text-sm text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">{item.score}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Nível Intermediário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso para Avançado</span>
                      <span>1,247 / 1,500 XP</span>
                    </div>
                    <Progress value={83} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você precisa de mais <span className="font-medium text-foreground">253 XP</span> para o próximo nível!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Conquistas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="achievement-badge">
                    <Trophy className="w-6 h-6 text-success" />
                    <div>
                      <p className="font-medium text-sm">Primeira Semana</p>
                      <p className="text-xs text-muted-foreground">7 dias consecutivos</p>
                    </div>
                  </div>
                  <div className="achievement-badge locked">
                    <Flame className="w-6 h-6" />
                    <div>
                      <p className="font-medium text-sm">Maratonista</p>
                      <p className="text-xs text-muted-foreground">15 min de prática</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Meta de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-success-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {streak.goalCompleted
                      ? 'Parabéns! Meta do dia concluída! 🎉'
                      : 'Complete um exercício para manter seu streak!'}
                  </p>
                  <Button className="btn-success w-full" asChild>
                    <a href="/exercise">Começar Exercício</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
