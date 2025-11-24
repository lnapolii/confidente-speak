import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    console.error('❌ Missing signature or webhook secret');
    return new Response('Webhook Error: Missing signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    console.log('✅ Webhook recebido:', event.type);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, supabase);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object, supabase);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object, supabase);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object, supabase);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object, supabase);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object, supabase);
        break;

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object, supabase);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook error:', errorMessage);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }
});

// HANDLERS DOS EVENTOS

async function handleCheckoutCompleted(session: any, supabase: any) {
  console.log('💳 Checkout completado:', session.id);
  
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription;
  const customerId = session.customer;
  
  if (!userId) {
    console.error('❌ Missing client_reference_id (userId)');
    return;
  }

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7); // 7 dias de trial

  const { error } = await supabase
    .from('users')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: 'trialing',
      trial_ends_at: trialEnd.toISOString(),
      plan_type: session.metadata?.planType || 'monthly',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('❌ Error updating user:', error);
  } else {
    console.log('✅ User updated successfully');
  }

  // TODO: Enviar email de boas-vindas
  // await sendWelcomeEmail(session.customer_email, userId);
}

async function handleSubscriptionCreated(subscription: any, supabase: any) {
  console.log('📝 Subscription created:', subscription.id);

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (!user) {
    console.error('❌ User not found for customer:', subscription.customer);
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      plan_type: subscription.items.data[0]?.price?.recurring?.interval || 'month',
      trial_ends_at: subscription.trial_end 
        ? new Date(subscription.trial_end * 1000).toISOString() 
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Error updating subscription:', error);
  } else {
    console.log('✅ Subscription updated successfully');
  }
}

async function handleSubscriptionUpdated(subscription: any, supabase: any) {
  console.log('🔄 Subscription updated:', subscription.id);

  const { data: user } = await supabase
    .from('users')
    .select('id, subscription_status')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!user) {
    console.error('❌ User not found for subscription:', subscription.id);
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Error updating subscription:', error);
  } else {
    console.log('✅ Subscription updated successfully');
  }

  // Se mudou de trialing para active
  if (subscription.status === 'active' && user.subscription_status === 'trialing') {
    console.log('✅ Trial converted to active subscription');
    // TODO: Enviar email de conversão
    // await sendTrialConvertedEmail(subscription.customer);
  }
}

async function handleSubscriptionDeleted(subscription: any, supabase: any) {
  console.log('❌ Subscription deleted:', subscription.id);

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!user) {
    console.error('❌ User not found for subscription:', subscription.id);
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'canceled',
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Error updating user:', error);
  } else {
    console.log('✅ User subscription canceled successfully');
  }

  // TODO: Enviar email de cancelamento
  // await sendCancellationEmail(subscription.customer);
}

async function handlePaymentSucceeded(invoice: any, supabase: any) {
  console.log('✅ Payment succeeded:', invoice.id);

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (!user) {
    console.error('❌ User not found for customer:', invoice.customer);
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({
      last_payment_date: new Date().toISOString(),
      last_payment_amount: invoice.amount_paid / 100,
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Error updating payment:', error);
  } else {
    console.log('✅ Payment recorded successfully');
  }

  // TODO: Enviar recibo por email
  // await sendReceiptEmail(invoice);
}

async function handlePaymentFailed(invoice: any, supabase: any) {
  console.log('⚠️ Payment failed:', invoice.id);

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (!user) {
    console.error('❌ User not found for customer:', invoice.customer);
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'past_due',
      last_payment_failed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Error updating payment failure:', error);
  } else {
    console.log('✅ Payment failure recorded successfully');
  }

  // TODO: Enviar email urgente de pagamento falhou
  // await sendPaymentFailedEmail(invoice.customer);
}

async function handleTrialWillEnd(subscription: any, supabase: any) {
  console.log('⏰ Trial ending soon:', subscription.id);

  const { data: user } = await supabase
    .from('users')
    .select('id, email, full_name')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!user) {
    console.error('❌ User not found for subscription:', subscription.id);
    return;
  }

  console.log('ℹ️ User trial ending in 3 days:', user.email);

  // TODO: Enviar email de trial terminando
  // await sendTrialEndingEmail(user);
}
