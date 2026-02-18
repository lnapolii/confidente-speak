import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const PRICE_IDS: Record<string, string> = {
  monthly: Deno.env.get('STRIPE_PRICE_MONTHLY') || '',
  quarterly: Deno.env.get('STRIPE_PRICE_QUARTERLY') || '',
  yearly: Deno.env.get('STRIPE_PRICE_YEARLY') || '',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);

    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = claimsData.claims.sub;
    const userEmail = claimsData.claims.email;

    const { planType } = await req.json();

    if (!planType || !PRICE_IDS[planType]) {
      return new Response(JSON.stringify({ error: 'Invalid or missing planType. Must be monthly, quarterly, or yearly.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const priceId = PRICE_IDS[planType];

    // Buscar dados do usuário
    const { data: userData } = await supabaseClient
      .from('users')
      .select('email, full_name, stripe_customer_id')
      .eq('id', userId)
      .single();

    const customerEmail = userData?.email || userEmail;
    const domain = Deno.env.get('DOMAIN') || 'https://prospeaker.com.br';

    console.log('Creating checkout session for:', customerEmail, 'plan:', planType);

    // Reusar stripe_customer_id existente se disponível
    let customerParams: { customer?: string; customer_email?: string } = {};
    if (userData?.stripe_customer_id) {
      customerParams = { customer: userData.stripe_customer_id };
    } else {
      customerParams = { customer_email: customerEmail };
    }

    const session = await stripe.checkout.sessions.create({
      ...customerParams,
      client_reference_id: userId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${domain}/dashboard?success=true`,
      cancel_url: `${domain}/#pricing?canceled=true`,
      metadata: {
        userId,
        planType,
      },
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          userId,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    console.log('✅ Checkout session created:', session.id);

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error creating checkout session:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
