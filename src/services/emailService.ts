import { supabase } from '@/integrations/supabase/client';

export type EmailType = 'welcome' | 'daily_reminder' | 'progress_report' | 'payment_confirmation' | 'password_reset';

export const sendEmail = async (
  type: EmailType,
  to: string,
  data?: Record<string, any>
) => {
  const { data: result, error } = await supabase.functions.invoke('send-email', {
    body: { type, to, data },
  });

  if (error) {
    console.error('Email send error:', error);
    throw error;
  }

  return result;
};

export const sendWelcomeEmail = (email: string, name: string, appUrl?: string) =>
  sendEmail('welcome', email, { name, appUrl: appUrl || window.location.origin });

export const sendPaymentConfirmation = (email: string, name: string, planType: string, amount: string, nextBilling: string) =>
  sendEmail('payment_confirmation', email, { name, planType, amount, nextBilling });
