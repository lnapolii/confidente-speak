import { supabase } from '@/integrations/supabase/client';

export interface CreateCheckoutParams {
  planType: 'monthly' | 'quarterly' | 'yearly';
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface PortalResponse {
  url: string;
}

/**
 * Cria uma sessão de checkout do Stripe e redireciona para o Stripe
 */
export async function createCheckoutSession(
  params: CreateCheckoutParams
): Promise<CheckoutResponse> {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { planType: params.planType },
  });

  if (error) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }

  if (!data?.url) {
    throw new Error(data?.error || 'No checkout URL returned');
  }

  // Redirecionar para o checkout do Stripe
  window.location.href = data.url;

  return data;
}

/**
 * Cria uma sessão do portal de cobrança do Stripe
 */
export async function createPortalSession(): Promise<PortalResponse> {
  const { data, error } = await supabase.functions.invoke('create-portal-session', {
    body: {},
  });

  if (error) {
    console.error('Error creating portal session:', error);
    throw new Error(error.message || 'Failed to create portal session');
  }

  if (!data?.url) {
    throw new Error(data?.error || 'No portal URL returned');
  }

  // Redirecionar para o portal do Stripe
  window.location.href = data.url;

  return data;
}
