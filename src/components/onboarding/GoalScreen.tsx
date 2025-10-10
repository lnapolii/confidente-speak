import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface GoalScreenProps {
  onNext: (data: { weeklyGoal: number; enableReminders: boolean; reminderTime?: string }) => void;
  onBack: () => void;
}

const GoalScreen = ({ onNext, onBack }: GoalScreenProps) => {
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [enableReminders, setEnableReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('19:00');

  const handleComplete = () => {
    onNext({
      weeklyGoal,
      enableReminders,
      reminderTime: enableReminders ? reminderTime : undefined,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-900">
          Vamos criar sua meta semanal!
        </h2>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Ilustração */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-3xl">
            <Calendar className="w-24 h-24 text-blue-600" />
          </div>
        </div>

        {/* Recomendação */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
          <p className="text-center text-gray-700 mb-4 font-semibold">
            Baseado no seu perfil, recomendamos:
          </p>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              📅 Praticar 5 dias por semana
            </div>
            <p className="text-gray-600 text-sm">
              Segundas, Terças, Quartas, Quintas e Sextas
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-900">
            Ou escolha você mesmo:
          </Label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="3"
              max="7"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="w-16 text-center">
              <span className="text-3xl font-bold text-blue-600">{weeklyGoal}</span>
              <p className="text-xs text-gray-600">dias</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>3 dias</span>
            <span>7 dias</span>
          </div>
        </div>

        {/* Lembretes */}
        <div className="space-y-4 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center justify-between">
            <Label htmlFor="reminders" className="text-lg font-semibold text-gray-900">
              Receber lembretes diários
            </Label>
            <Switch
              id="reminders"
              checked={enableReminders}
              onCheckedChange={setEnableReminders}
            />
          </div>

          {enableReminders && (
            <div className="bg-blue-50 rounded-xl p-4 space-y-3 animate-fade-in">
              <Label className="text-sm font-semibold text-gray-700">
                Que horas você prefere?
              </Label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg font-semibold"
              />
              <p className="text-xs text-gray-600">
                💡 Escolha um horário em que você costuma estar disponível
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between max-w-xl mx-auto">
        <Button onClick={onBack} variant="outline" size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleComplete}
          size="lg"
          className="px-8 shadow-lg"
        >
          ✅ Criar Meta e Começar
        </Button>
      </div>
    </div>
  );
};

export default GoalScreen;
