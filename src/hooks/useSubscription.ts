import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | null;

export interface SubscriptionData {
  status: SubscriptionStatus;
  planType: string | null;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  lastPaymentFailedAt: string | null;
}

export function useSubscription() {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data: user } = await supabase
        .from('users')
        .select('subscription_status, plan_type, trial_ends_at, current_period_end, cancel_at_period_end, last_payment_failed_at')
        .eq('id', session.user.id)
        .single();

      if (user) {
        setData({
          status: user.subscription_status as SubscriptionStatus,
          planType: user.plan_type,
          trialEndsAt: user.trial_ends_at,
          currentPeriodEnd: user.current_period_end,
          cancelAtPeriodEnd: user.cancel_at_period_end ?? false,
          lastPaymentFailedAt: user.last_payment_failed_at,
        });
      }
      setLoading(false);
    })();
  }, []);

  const isPremium = data?.status === 'active' || data?.status === 'trialing';
  const isCanceled = data?.status === 'canceled';
  const isPastDue = data?.status === 'past_due';
  const isFree = !data?.status;

  return { ...data, loading, isPremium, isCanceled, isPastDue, isFree };
}
