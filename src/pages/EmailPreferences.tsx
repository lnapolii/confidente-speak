import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Bell, BarChart3, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailPreferences = () => {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState({
    welcome: true,
    dailyReminder: true,
    weeklyReport: true,
    paymentNotifications: true,
    marketingEmails: false,
  });
  const [reminderTime, setReminderTime] = useState('19:00');

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('emailPreferences', JSON.stringify({ ...prefs, reminderTime }));
    toast({ title: "Preferências salvas! ✅" });
  };

  const options = [
    { key: 'dailyReminder' as const, icon: Bell, title: 'Lembretes Diários', description: 'Receba um lembrete para praticar no horário que preferir' },
    { key: 'weeklyReport' as const, icon: BarChart3, title: 'Relatório Semanal', description: 'Resumo de exercícios, XP e conquistas da semana' },
    { key: 'paymentNotifications' as const, icon: CreditCard, title: 'Notificações de Pagamento', description: 'Confirmações de pagamento e avisos de renovação' },
    { key: 'marketingEmails' as const, icon: Mail, title: 'Novidades e Dicas', description: 'Dicas de inglês, novos conteúdos e promoções' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/profile">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </a>
            </Button>
            <h1 className="font-heading font-semibold text-foreground">Preferências de Email</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Gerenciar Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {options.map(opt => {
              const Icon = opt.icon;
              return (
                <div key={opt.key} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <Label className="font-medium text-foreground">{opt.title}</Label>
                      <p className="text-sm text-muted-foreground">{opt.description}</p>
                    </div>
                  </div>
                  <Switch checked={prefs[opt.key]} onCheckedChange={() => togglePref(opt.key)} />
                </div>
              );
            })}

            {prefs.dailyReminder && (
              <div className="p-4 bg-accent rounded-xl space-y-2">
                <Label className="font-medium">Horário do lembrete</Label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:outline-none"
                />
              </div>
            )}

            <Button className="w-full btn-hero" onClick={handleSave}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Salvar Preferências
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmailPreferences;
