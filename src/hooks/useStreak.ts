import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  dailyGoalMinutes: number;
  todayMinutes: number;
  goalCompleted: boolean;
  loading: boolean;
}

const MILESTONES = [
  { days: 3, emoji: '🔥', message: '3 dias seguidos! Você está criando um hábito!' },
  { days: 7, emoji: '⚡', message: 'Uma semana seguida! Incrível!' },
  { days: 30, emoji: '🏆', message: '30 dias! Você é imparável!' },
];

export const useStreak = () => {
  const [data, setData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    dailyGoalMinutes: 10,
    todayMinutes: 0,
    goalCompleted: false,
    loading: true,
  });

  const fetchStreakData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user stats and daily goal in parallel
      const [statsRes, userRes, todayRes] = await Promise.all([
        supabase.from('user_stats').select('current_streak, longest_streak, last_practice_date').eq('user_id', user.id).single(),
        supabase.from('users').select('daily_goal_minutes').eq('id', user.id).single(),
        supabase.from('exercises_completed')
          .select('duration')
          .eq('user_id', user.id)
          .gte('completed_at', new Date().toISOString().split('T')[0])
      ]);

      const stats = statsRes.data;
      const userProfile = userRes.data;
      const todayExercises = todayRes.data || [];

      const todayMinutes = todayExercises.reduce((sum, e) => sum + (e.duration || 0), 0);
      const dailyGoal = userProfile?.daily_goal_minutes || 10;
      
      // Check if streak should be reset (missed a day)
      let currentStreak = stats?.current_streak || 0;
      const lastPractice = stats?.last_practice_date;
      
      if (lastPractice) {
        const lastDate = new Date(lastPractice);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        lastDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          // Streak broken - reset
          currentStreak = 0;
          await supabase.from('user_stats').update({ current_streak: 0 }).eq('user_id', user.id);
        }
      }

      setData({
        currentStreak,
        longestStreak: stats?.longest_streak || 0,
        lastPracticeDate: lastPractice || null,
        dailyGoalMinutes: dailyGoal,
        todayMinutes,
        goalCompleted: todayMinutes >= dailyGoal,
        loading: false,
      });
    } catch {
      setData(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const recordPractice = useCallback(async (durationMinutes: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];

      // Get current stats
      const { data: stats } = await supabase.from('user_stats')
        .select('current_streak, longest_streak, last_practice_date')
        .eq('user_id', user.id).single();

      let newStreak = stats?.current_streak || 0;
      const lastPractice = stats?.last_practice_date;

      if (lastPractice !== today) {
        // New day of practice
        const lastDate = lastPractice ? new Date(lastPractice) : null;
        const todayDate = new Date(today);

        if (lastDate) {
          lastDate.setHours(0, 0, 0, 0);
          todayDate.setHours(0, 0, 0, 0);
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          newStreak = diffDays === 1 ? newStreak + 1 : 1;
        } else {
          newStreak = 1;
        }
      }

      const newLongest = Math.max(newStreak, stats?.longest_streak || 0);

      await supabase.from('user_stats').update({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_practice_date: today,
      }).eq('user_id', user.id);

      // Check milestones
      const milestone = MILESTONES.find(m => m.days === newStreak);
      if (milestone) {
        toast({
          title: `${milestone.emoji} ${milestone.message}`,
          duration: 6000,
        });
      }

      // Refresh data
      await fetchStreakData();
    } catch (err) {
      console.error('Error recording practice:', err);
    }
  }, [fetchStreakData]);

  useEffect(() => {
    fetchStreakData();
  }, [fetchStreakData]);

  return { ...data, recordPractice, refresh: fetchStreakData };
};
