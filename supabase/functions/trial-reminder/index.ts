import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const APP_URL = Deno.env.get('DOMAIN') || 'https://prospeaker.com.br';
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Encontrar usuários cujo trial termina entre 1.5 e 2.5 dias a partir de agora
    // (janela de 24h para não enviar duplicado se o cron rodar levemente fora do horário)
    const now = new Date();
    const windowStart = new Date(now.getTime() + 1.5 * 24 * 60 * 60 * 1000); // 36h
    const windowEnd = new Date(now.getTime() + 2.5 * 24 * 60 * 60 * 1000);   // 60h

    console.log(`🔍 Buscando usuários com trial terminando entre ${windowStart.toISOString()} e ${windowEnd.toISOString()}`);

    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, full_name, trial_ends_at, plan_type')
      .eq('subscription_status', 'trialing')
      .gte('trial_ends_at', windowStart.toISOString())
      .lte('trial_ends_at', windowEnd.toISOString());

    if (error) {
      console.error('❌ Error querying users:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📧 ${users?.length || 0} usuários para notificar`);

    const results = [];

    for (const user of (users || [])) {
      try {
        const planLabels: Record<string, string> = {
          monthly: 'Mensal (R$ 79,90/mês)',
          quarterly: 'Trimestral (R$ 59,90/mês)',
          yearly: 'Anual (R$ 49,90/mês)',
        };

        const planLabel = planLabels[user.plan_type || 'monthly'] || 'Mensal';

        const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'trial_reminder',
            to: user.email,
            data: {
              name: user.name || user.email.split('@')[0],
              planType: planLabel,
              trialEndsAt: user.trial_ends_at,
              appUrl: APP_URL,
            },
          }),
        });

        const emailResult = await emailRes.json();

        if (emailRes.ok) {
          console.log(`✅ Email enviado para ${user.email}`);
          results.push({ userId: user.id, email: user.email, status: 'sent' });
        } else {
          console.error(`❌ Erro ao enviar para ${user.email}:`, emailResult);
          results.push({ userId: user.id, email: user.email, status: 'error', error: emailResult });
        }
      } catch (err) {
        console.error(`❌ Exception para ${user.email}:`, err);
        results.push({ userId: user.id, email: user.email, status: 'exception' });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: results.length,
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Fatal error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
