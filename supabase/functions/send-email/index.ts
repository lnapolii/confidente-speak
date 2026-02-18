import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface EmailRequest {
  type: 'welcome' | 'daily_reminder' | 'progress_report' | 'payment_confirmation' | 'password_reset' | 'email_confirmation' | 'trial_reminder';
  to: string;
  data?: Record<string, any>;
}

const templates: Record<string, (data: any) => { subject: string; html: string }> = {
  welcome: (data) => ({
    subject: "Bem-vindo ao ProSpeaker! 🚀",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2563EB; font-size: 28px; margin: 0;">Pro<span style="color: #1e293b;">Speaker</span></h1>
          </div>
          <h2 style="color: #1e293b; font-size: 24px;">Bem-vindo, ${data.name || 'Aluno'}! 👋</h2>
          <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
            Estamos felizes em ter você no ProSpeaker. Sua jornada para falar inglês com confiança começa agora!
          </p>
          <h3 style="color: #1e293b;">Próximos passos:</h3>
          <ol style="color: #64748b; line-height: 2;">
            <li>Complete o onboarding para personalizar sua experiência</li>
            <li>Faça seu primeiro exercício de 5 minutos</li>
            <li>Explore a biblioteca de exercícios</li>
          </ol>
          <div style="text-align: center; margin-top: 32px;">
            <a href="${data.appUrl || 'https://confidente-speak.lovable.app'}/dashboard" 
               style="background: linear-gradient(135deg, #2563EB, #3b82f6); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block;">
              Começar Agora 🚀
            </a>
          </div>
        </div>
      </div>
    `,
  }),

  daily_reminder: (data) => ({
    subject: `Hora de praticar! 🎯 Mantenha seu streak de ${data.streak || 0} dias`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2563EB; font-size: 24px;">ProSpeaker</h1>
          </div>
          <h2 style="color: #1e293b;">Olá, ${data.name || 'Aluno'}! 🔥</h2>
          <p style="color: #64748b; font-size: 16px;">
            Você está com um streak de <strong style="color: #10B981;">${data.streak || 0} dias</strong>! 
            Não quebre agora — seu exercício de hoje leva apenas ${data.duration || 5} minutos.
          </p>
          <div style="text-align: center; margin-top: 24px;">
            <a href="${data.appUrl || 'https://confidente-speak.lovable.app'}/exercise" 
               style="background: linear-gradient(135deg, #10B981, #34d399); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block;">
              Praticar Agora
            </a>
          </div>
        </div>
      </div>
    `,
  }),

  progress_report: (data) => ({
    subject: "📊 Seu relatório semanal de progresso",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2563EB; font-size: 24px;">ProSpeaker</h1>
          </div>
          <h2 style="color: #1e293b;">Relatório Semanal 📊</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;">
            <div style="background: #f0fdf4; padding: 16px; border-radius: 12px; text-align: center;">
              <div style="font-size: 28px; font-weight: bold; color: #10B981;">${data.exercisesCompleted || 0}</div>
              <div style="font-size: 14px; color: #64748b;">Exercícios</div>
            </div>
            <div style="background: #eff6ff; padding: 16px; border-radius: 12px; text-align: center;">
              <div style="font-size: 28px; font-weight: bold; color: #2563EB;">${data.xpEarned || 0}</div>
              <div style="font-size: 14px; color: #64748b;">XP Ganhos</div>
            </div>
          </div>
          <p style="color: #64748b;">Continue assim, ${data.name || 'Aluno'}! 💪</p>
        </div>
      </div>
    `,
  }),

  payment_confirmation: (data) => ({
    subject: "✅ Pagamento confirmado - ProSpeaker",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2563EB; font-size: 24px;">ProSpeaker</h1>
          </div>
          <h2 style="color: #1e293b;">Pagamento Confirmado ✅</h2>
          <p style="color: #64748b;">Obrigado, ${data.name || 'Aluno'}! Seu plano <strong>${data.planType || 'Premium'}</strong> está ativo.</p>
          <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 4px 0; color: #1e293b;"><strong>Plano:</strong> ${data.planType || 'Premium'}</p>
            <p style="margin: 4px 0; color: #1e293b;"><strong>Valor:</strong> R$ ${data.amount || '0,00'}</p>
            <p style="margin: 4px 0; color: #1e293b;"><strong>Próxima cobrança:</strong> ${data.nextBilling || 'N/A'}</p>
          </div>
        </div>
      </div>
    `,
  }),

  password_reset: (data) => ({
    subject: "🔐 Redefinir senha - ProSpeaker",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2563EB; font-size: 24px;">ProSpeaker</h1>
          </div>
          <h2 style="color: #1e293b;">Redefinir Senha 🔐</h2>
          <p style="color: #64748b;">Clique no botão abaixo para criar uma nova senha:</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.resetUrl || '#'}" 
               style="background: linear-gradient(135deg, #2563EB, #3b82f6); color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block;">
              Redefinir Senha
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 14px;">Este link expira em 1 hora. Se você não solicitou esta alteração, ignore este email.</p>
        </div>
      </div>
    `,
  }),

  trial_reminder: (data) => ({
    subject: "⏰ Seu trial termina em 2 dias - ProSpeaker",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2563EB; font-size: 28px; margin: 0;">Pro<span style="color: #1e293b;">Speaker</span></h1>
          </div>

          <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px;">
            <div style="font-size: 48px; margin-bottom: 8px;">⏰</div>
            <p style="margin: 0; font-size: 18px; font-weight: 700; color: #92400e;">Apenas 2 dias restantes!</p>
          </div>

          <h2 style="color: #1e293b; font-size: 22px; text-align: center; margin-bottom: 16px;">
            Olá, ${data.name || 'Aluno'}! Seu trial encerra em breve.
          </h2>

          <p style="color: #64748b; font-size: 16px; line-height: 1.7; text-align: center;">
            Você tem <strong style="color: #d97706;">2 dias</strong> restantes do seu trial gratuito no ProSpeaker.<br/>
            Após esse período, sua assinatura <strong>${data.planType || 'mensal'}</strong> será ativada automaticamente.
          </p>

          <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 16px;">🎯 Seu progresso até agora:</h3>
            <ul style="margin: 0; padding: 0 0 0 20px; color: #64748b; line-height: 2;">
              <li>✅ Conta criada e configurada</li>
              <li>📚 Acesso a todos os exercícios</li>
              <li>🎤 Análise de pronúncia por IA</li>
            </ul>
          </div>

          <p style="color: #64748b; font-size: 15px; text-align: center;">
            Continue praticando e consolide seu inglês para o ambiente profissional!
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.appUrl || 'https://prospeaker.com.br'}/dashboard"
               style="background: linear-gradient(135deg, #2563EB, #3b82f6); color: white; padding: 16px 48px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 17px; display: inline-block; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
              Continuar Praticando 🚀
            </a>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 24px;">
            <p style="margin: 0; color: #94a3b8; font-size: 13px; text-align: center;">
              Quer cancelar antes do fim do trial? Acesse <a href="${data.appUrl || 'https://prospeaker.com.br'}/dashboard" style="color: #2563EB;">suas configurações</a> a qualquer momento.<br/>
              Sem cobranças, sem complicações. ❤️
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            ProSpeaker — Build your confidence. Develop your English. Unlock your life.
          </p>
        </div>
      </div>
    `,
  }),

  email_confirmation: (data) => ({
    subject: "Confirme seu email - ProSpeaker",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #2563EB; font-size: 28px; margin: 0;">Pro<span style="color: #1e293b;">Speaker</span></h1>
          </div>
          <h2 style="color: #1e293b; font-size: 22px; text-align: center;">Confirme seu email ✉️</h2>
          <p style="color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
            Olá, <strong>${data.name || 'Aluno'}</strong>! Falta só um passo para começar sua jornada de confiança em inglês.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.confirmUrl || '#'}" 
               style="background: linear-gradient(135deg, #2563EB, #3b82f6); color: white; padding: 16px 48px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
              Confirmar Email
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 24px;">
            Este link expira em 24 horas.<br/>
            Se você não criou uma conta no ProSpeaker, ignore este email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            ProSpeaker — Build your confidence. Develop your English. Unlock your life.
          </p>
        </div>
      </div>
    `,
  }),
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const { type, to, data = {} }: EmailRequest = await req.json();

    if (!type || !to) {
      return new Response(JSON.stringify({ error: 'Missing type or to' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const templateFn = templates[type];
    if (!templateFn) {
      return new Response(JSON.stringify({ error: `Unknown template: ${type}` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { subject, html } = templateFn(data);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ProSpeaker <noreply@prospeaker.com.br>',
        to: [to],
        subject,
        html,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend error:', result);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: result }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
