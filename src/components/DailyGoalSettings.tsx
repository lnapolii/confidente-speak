import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Clock, Bell, Check } from 'lucide-react';

const GOAL_OPTIONS = [5, 10, 15, 20];
const TIME_OPTIONS = ['08:00', '12:00', '19:00', '21:00'];

const DailyGoalSettings = () => {
  const [dailyGoal, setDailyGoal] = useState(10);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('19:00');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('users')
        .select('daily_goal_minutes, reminder_enabled, reminder_time')
        .eq('id', user.id).single();
      if (data) {
        setDailyGoal(data.daily_goal_minutes || 10);
        setReminderEnabled(data.reminder_enabled || false);
        setReminderTime(data.reminder_time || '19:00');
      }
      setLoaded(true);
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from('users').update({
        daily_goal_minutes: dailyGoal,
        reminder_enabled: reminderEnabled,
        reminder_time: reminderTime,
      }).eq('id', user.id);
      toast({ title: '✅ Preferências salvas!' });
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const levelUpWeeks = Math.round(80 / (dailyGoal * 7) * 7);

  if (!loaded) return null;

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Minha Meta Diária
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goal selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Minutos por dia</Label>
          <div className="grid grid-cols-4 gap-3">
            {GOAL_OPTIONS.map((mins) => (
              <button
                key={mins}
                onClick={() => setDailyGoal(mins)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  dailyGoal === mins
                    ? 'border-primary bg-accent text-primary font-bold'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-lg font-bold">{mins}</div>
                <div className="text-xs">min</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Com {dailyGoal} min/dia você avança 1 nível em ~{levelUpWeeks} semanas
          </p>
        </div>

        {/* Reminder toggle */}
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <Label htmlFor="reminder-toggle" className="text-sm font-medium">
                Receber lembrete diário
              </Label>
            </div>
            <Switch
              id="reminder-toggle"
              checked={reminderEnabled}
              onCheckedChange={setReminderEnabled}
            />
          </div>

          {reminderEnabled && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Horário do lembrete</Label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_OPTIONS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setReminderTime(time)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                      reminderTime === time
                        ? 'border-primary bg-accent text-primary font-semibold'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button onClick={save} disabled={saving} className="w-full">
          <Check className="w-4 h-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar preferências'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyGoalSettings;
