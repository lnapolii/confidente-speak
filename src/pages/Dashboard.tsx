import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressChart } from "@/components/ProgressChart";
import StreakWidget from "@/components/StreakWidget";
import { useStreak } from "@/hooks/useStreak";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { createPortalSession } from "@/services/stripeService";
import {
  Flame, Trophy, Zap, Target, Calendar, TrendingUp, Play, Clock,
  Star, Award, Bookmark, CreditCard, AlertTriangle, Crown,
  CheckCircle2, Loader2, ArrowRight, LogOut,
} from "lucide-react";
import SubscriptionBanner from "@/components/SubscriptionBanner";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UserStats {
  totalXp: number;
  totalExercises: number;
  currentLevel: number;
  xpToNextLevel: number;
}

interface LastExercise {
  exercise_id: string;
  exercise_title: string | null;
  overall_score: number | null;
  completed_at: string | null;
}

const Dashboard = () => {
  const streak = useStreak();
  const sub = useSubscription();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState<UserStats | null>(null);
  const [lastExercise, setLastExercise] = useState<LastExercise | null>(null);
  const [recentExercises, setRecentExercises] = useState<LastExercise[]>([]);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [userRes, statsRes, recentRes] = await Promise.all([
        supabase.from("users").select("full_name").eq("id", user.id).single(),
        supabase.from("user_stats").select("total_xp, total_exercises, current_level, xp_to_next_level").eq("user_id", user.id).single(),
        supabase.from("exercises_completed")
          .select("exercise_id, exercise_title, overall_score, completed_at")
          .eq("user_id", user.id)
          .order("completed_at", { ascending: false })
          .limit(5),
      ]);

      setUserName(userRes.data?.full_name?.split(" ")[0] || "Usuário");

      if (statsRes.data) {
        setStats({
          totalXp: statsRes.data.total_xp ?? 0,
          totalExercises: statsRes.data.total_exercises ?? 0,
          currentLevel: statsRes.data.current_level ?? 1,
          xpToNextLevel: statsRes.data.xp_to_next_level ?? 500,
        });
      }

      const exercises = recentRes.data || [];
      if (exercises.length > 0) {
        setLastExercise(exercises[0]);
        setRecentExercises(exercises);
      }
    };
    load();
  }, []);

  const handleManagePlan = async () => {
    setPortalLoading(true);
    try { await createPortalSession(); } catch { setPortalLoading(false); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Subscription helpers
  const getSubDaysRemaining = () => {
    const endDate = sub.status === "trialing" ? sub.trialEndsAt : sub.currentPeriodEnd;
    if (!endDate) return null;
    const diff = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const subDays = getSubDaysRemaining();
  const xpProgress = stats ? Math.min(100, (stats.totalXp / stats.xpToNextLevel) * 100) : 0;

  const levelLabels: Record<number, string> = {
    1: "Iniciante", 2: "Básico", 3: "Intermediário", 4: "Avançado", 5: "Fluente",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-bold text-foreground">
              Pro<span className="text-gradient-primary">Speaker</span>
            </span>
          </a>
          <div className="flex items-center gap-2 md:gap-4">
            {stats && (
              <div className="xp-badge">
                <Star className="w-4 h-4" />
                {stats.totalXp.toLocaleString("pt-BR")} XP
              </div>
            )}
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="/library"><Bookmark className="w-4 h-4 mr-1" />Biblioteca</a>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="/profile">Perfil</a>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleLogout} title="Sair">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Subscription Banner (expired/canceled/free) */}
        <SubscriptionBanner />

        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
            Olá, {userName}! 👋
          </h2>
          <p className="text-muted-foreground">
            Continue praticando para alcançar o próximo nível.
          </p>
        </div>

        {/* Top Row: Sub Status + Streak */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Subscription Status Card */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Assinatura
                </span>
                <SubStatusBadge status={sub.status} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sub.loading ? (
                <div className="h-12 rounded bg-muted animate-pulse" />
              ) : (
                <>
                  {sub.status === "trialing" && subDays !== null && (
                    <p className="text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 inline mr-1 text-primary" />
                      {subDays} dia{subDays !== 1 ? "s" : ""} restante{subDays !== 1 ? "s" : ""} no trial gratuito
                    </p>
                  )}
                  {sub.status === "active" && subDays !== null && (
                    <p className="text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 inline mr-1 text-success" />
                      Próxima renovação em {subDays} dia{subDays !== 1 ? "s" : ""}
                    </p>
                  )}
                  {(sub.isFree || sub.isCanceled) && (
                    <p className="text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 inline mr-1 text-warning" />
                      Sem assinatura ativa
                    </p>
                  )}
                  <Button
                    variant={sub.isPremium ? "outline" : "default"}
                    size="sm"
                    className={`w-full gap-2 ${!sub.isPremium ? "btn-hero" : ""}`}
                    onClick={sub.isPremium ? handleManagePlan : () => navigate("/#pricing")}
                    disabled={portalLoading}
                  >
                    {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : sub.isPremium ? (
                      <><CreditCard className="w-4 h-4" />Gerenciar plano</>
                    ) : (
                      <><Crown className="w-4 h-4" />Assinar Pro</>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Streak Widget */}
          <StreakWidget
            currentStreak={streak.currentStreak}
            longestStreak={streak.longestStreak}
            todayMinutes={streak.todayMinutes}
            dailyGoalMinutes={streak.dailyGoalMinutes}
            goalCompleted={streak.goalCompleted}
            loading={streak.loading}
          />
        </div>

        {/* Continue Where You Left Off */}
        {lastExercise && (
          <Card className="card-elevated mb-8 border-primary/20">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Continuar de onde parou</p>
                  <p className="font-heading font-bold text-foreground">
                    {lastExercise.exercise_title || "Exercício"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lastExercise.completed_at
                      ? formatDistanceToNow(new Date(lastExercise.completed_at), { addSuffix: true, locale: ptBR })
                      : ""}
                    {lastExercise.overall_score != null && ` · Score: ${lastExercise.overall_score}%`}
                  </p>
                </div>
              </div>
              <Button className="btn-hero gap-2 shrink-0" asChild>
                <a href="/exercise">
                  Continuar <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Target className="w-5 h-5 text-primary-foreground" />}
            iconBg="bg-gradient-primary"
            value={stats?.totalExercises?.toString() || "0"}
            label="Exercícios feitos"
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-primary-foreground" />}
            iconBg="bg-gradient-primary"
            value={stats?.totalXp?.toLocaleString("pt-BR") || "0"}
            label="XP Total"
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-warning" />}
            iconBg="bg-warning/10"
            value={`${streak.currentStreak}d`}
            label="Streak atual"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-success" />}
            iconBg="bg-success/10"
            value={`${streak.longestStreak}d`}
            label="Maior streak"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Practice */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Prática Rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="btn-hero h-auto p-4 flex-col" asChild>
                    <a href="/exercise">
                      <Clock className="w-6 h-6 mb-2" />
                      <span className="text-base font-medium">5 min</span>
                      <span className="text-xs opacity-80">Meeting Skills</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col border-2" asChild>
                    <a href="/exercise">
                      <Target className="w-6 h-6 mb-2" />
                      <span className="text-base font-medium">10 min</span>
                      <span className="text-xs opacity-60">Presentation</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Exercises */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Últimos Exercícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentExercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Nenhum exercício concluído ainda. Comece agora!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentExercises.map((ex, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-background-muted rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {ex.exercise_title || ex.exercise_id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ex.completed_at
                              ? formatDistanceToNow(new Date(ex.completed_at), { addSuffix: true, locale: ptBR })
                              : ""}
                          </p>
                        </div>
                        {ex.overall_score != null && (
                          <div className="text-right ml-3">
                            <span className="text-lg font-bold text-success">{ex.overall_score}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">
                  {levelLabels[stats?.currentLevel ?? 1] || `Nível ${stats?.currentLevel ?? 1}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="text-foreground font-medium">
                      {stats?.totalXp?.toLocaleString("pt-BR") || 0} / {stats?.xpToNextLevel?.toLocaleString("pt-BR") || 500} XP
                    </span>
                  </div>
                  <Progress value={xpProgress} className="h-3" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Faltam <span className="font-medium text-foreground">
                    {((stats?.xpToNextLevel ?? 500) - (stats?.totalXp ?? 0)).toLocaleString("pt-BR")} XP
                  </span> para o próximo nível!
                </p>
              </CardContent>
            </Card>

            {/* Daily Goal */}
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
                      ? "Parabéns! Meta do dia concluída! 🎉"
                      : "Complete um exercício para manter seu streak!"}
                  </p>
                  <Button className="btn-success w-full" asChild>
                    <a href="/exercise">Começar Exercício</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
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
          </div>
        </div>
      </main>
    </div>
  );
};

function SubStatusBadge({ status }: { status: string | null | undefined }) {
  const map: Record<string, { label: string; cls: string }> = {
    trialing: { label: "Trial", cls: "bg-primary/10 text-primary border-primary/20" },
    active: { label: "Ativo", cls: "bg-success/10 text-success border-success/20" },
    past_due: { label: "Pendente", cls: "bg-warning/10 text-warning border-warning/20" },
    canceled: { label: "Cancelado", cls: "bg-destructive/10 text-destructive border-destructive/20" },
  };
  const cfg = status ? map[status] : null;
  if (!cfg) return <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">Free</span>;
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.cls}`}>{cfg.label}</span>;
}

function StatCard({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string; label: string }) {
  return (
    <Card className="card-elevated">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold text-foreground leading-tight">{value}</p>
            <p className="text-xs text-muted-foreground truncate">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
