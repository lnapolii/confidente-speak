import { supabase } from '@/integrations/supabase/client';

export interface CreateCheckoutParams {
  priceId: string;
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
 * Cria uma sessão de checkout do Stripe
 * Redireciona automaticamente para o checkout
 */
export async function createCheckoutSession(
  params: CreateCheckoutParams
): Promise<CheckoutResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: params,
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }

    if (!data?.url) {
      throw new Error('No checkout URL returned');
    }

    // Redirecionar para o checkout do Stripe
    window.location.href = data.url;

    return data;
  } catch (error) {
    console.error('createCheckoutSession error:', error);
    throw error;
  }
}

/**
 * Cria uma sessão do portal de cobrança do Stripe
 * Permite ao usuário gerenciar sua assinatura
 */
export async function createPortalSession(): Promise<PortalResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: {},
    });

    if (error) {
      console.error('Error creating portal session:', error);
      throw new Error(error.message || 'Failed to create portal session');
    }

    if (!data?.url) {
      throw new Error('No portal URL returned');
    }

    // Redirecionar para o portal do Stripe
    window.location.href = data.url;

    return data;
  } catch (error) {
    console.error('createPortalSession error:', error);
    throw error;
  }
}

/**
 * Configuração dos Price IDs do Stripe
 * Estes IDs são obtidos do Stripe Dashboard após criar os produtos/preços
 */
export const STRIPE_PRICE_IDS = {
  monthly: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_monthly_placeholder',
  quarterly: import.meta.env.VITE_STRIPE_PRICE_QUARTERLY || 'price_quarterly_placeholder',
  yearly: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_yearly_placeholder',
} as const;
