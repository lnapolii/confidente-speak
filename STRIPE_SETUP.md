# 🔧 CONFIGURAÇÃO COMPLETA DO STRIPE - ProSpeaker

## 📋 CHECKLIST RÁPIDO

- [ ] Criar conta no Stripe
- [ ] Criar produtos e preços
- [ ] Configurar secrets no Supabase
- [ ] Configurar webhook
- [ ] Testar fluxo completo
- [ ] Ativar modo produção

---

## 1️⃣ CRIAR CONTA NO STRIPE

1. Acesse: https://dashboard.stripe.com/register
2. Crie sua conta
3. Complete o onboarding
4. **IMPORTANTE**: Começe no modo TEST para testar tudo antes de aceitar pagamentos reais

---

## 2️⃣ CRIAR PRODUTOS E PREÇOS

### Produto 1: Plano Mensal

1. No Stripe Dashboard, vá em: **Produtos** → **+ Adicionar produto**
2. Preencha:
   - **Nome**: ProSpeaker - Plano Mensal
   - **Descrição**: Acesso completo mensal à plataforma ProSpeaker
   - **Modelo de preço**: Pagamento recorrente
   - **Preço**: R$ 79,90 BRL
   - **Frequência de cobrança**: Mensal
   - **Trial gratuito**: 7 dias
3. Clique em **Salvar produto**
4. **COPIE O PRICE ID** (começa com `price_...`)
   - Exemplo: `price_1Xxxxxxxxxxxxxxxxxxxxxxxx`
   - Você precisará deste ID depois!

### Produto 2: Plano Trimestral

1. **Produtos** → **+ Adicionar produto**
2. Preencha:
   - **Nome**: ProSpeaker - Plano Trimestral
   - **Descrição**: Acesso completo trimestral à plataforma ProSpeaker (25% de desconto)
   - **Modelo de preço**: Pagamento recorrente
   - **Preço**: R$ 179,70 BRL
   - **Frequência de cobrança**: A cada 3 meses
   - **Trial gratuito**: 7 dias
3. Clique em **Salvar produto**
4. **COPIE O PRICE ID**

### Produto 3: Plano Anual

1. **Produtos** → **+ Adicionar produto**
2. Preencha:
   - **Nome**: ProSpeaker - Plano Anual
   - **Descrição**: Acesso completo anual à plataforma ProSpeaker (38% de desconto)
   - **Modelo de preço**: Pagamento recorrente
   - **Preço**: R$ 598,80 BRL
   - **Frequência de cobrança**: Anualmente
   - **Trial gratuito**: 7 dias
3. Clique em **Salvar produto**
4. **COPIE O PRICE ID**

---

## 3️⃣ CONFIGURAR SECRETS NO SUPABASE

Você precisa adicionar 6 secrets no Supabase:

### 3.1. Obter suas chaves do Stripe

1. No Stripe Dashboard, vá em: **Desenvolvedores** → **Chaves de API**
2. Você verá:
   - **Publishable key** (começa com `pk_test_...`)
   - **Secret key** (clique em "Revelar chave" - começa com `sk_test_...`)
3. **COPIE AMBAS AS CHAVES**

### 3.2. Adicionar secrets no Lovable

No chat do Lovable, digite:

```
Adicionar os seguintes secrets do Stripe:
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET (deixar em branco por enquanto)
- STRIPE_PRICE_MONTHLY
- STRIPE_PRICE_QUARTERLY
- STRIPE_PRICE_YEARLY
```

Quando aparecer o formulário, cole:
- **STRIPE_SECRET_KEY**: `sk_test_seu_secret_key_aqui`
- **STRIPE_PUBLISHABLE_KEY**: `pk_test_seu_publishable_key_aqui`
- **STRIPE_WEBHOOK_SECRET**: (deixar vazio por enquanto)
- **STRIPE_PRICE_MONTHLY**: `price_... (do plano mensal)`
- **STRIPE_PRICE_QUARTERLY**: `price_... (do plano trimestral)`
- **STRIPE_PRICE_YEARLY**: `price_... (do plano anual)`

### 3.3. Adicionar variáveis de ambiente no frontend

Adicione ao arquivo `.env`:

```env
VITE_STRIPE_PRICE_MONTHLY=price_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_QUARTERLY=price_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_YEARLY=price_xxxxxxxxxxxxx
```

---

## 4️⃣ CONFIGURAR WEBHOOK

### 4.1. Obter URL do webhook

A URL do seu webhook será:
```
https://nlytekhjmumtuabzhsur.supabase.co/functions/v1/stripe-webhook
```

### 4.2. Configurar no Stripe Dashboard

1. Vá em: **Desenvolvedores** → **Webhooks**
2. Clique em **+ Adicionar endpoint**
3. **URL do endpoint**: Cole a URL acima
4. **Descrição**: ProSpeaker Webhooks
5. **Eventos a ouvir**: Selecione **todos os eventos** ou especificamente:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
6. Clique em **Adicionar endpoint**

### 4.3. Obter Webhook Secret

1. Depois de criar o webhook, clique nele
2. Na seção **Signing secret**, clique em **Revelar**
3. **COPIE O WEBHOOK SECRET** (começa com `whsec_...`)
4. Volte ao Lovable e atualize o secret `STRIPE_WEBHOOK_SECRET` com este valor

---

## 5️⃣ TESTAR FLUXO COMPLETO

### 5.1. Testar localmente com Stripe CLI (Opcional)

```bash
# Instalar Stripe CLI
# Mac: brew install stripe/stripe-cli/stripe
# Windows: scoop install stripe

# Login
stripe login

# Escutar webhooks
stripe listen --forward-to https://nlytekhjmumtuabzhsur.supabase.co/functions/v1/stripe-webhook

# Em outro terminal, trigger eventos de teste
stripe trigger checkout.session.completed
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
```

### 5.2. Testar no navegador

1. Acesse sua aplicação
2. Vá para a página de pricing
3. Clique em **Assinar Mensal** (ou qualquer plano)
4. Você será redirecionado para o Stripe Checkout
5. Use um **cartão de teste**:
   - **Número**: `4242 4242 4242 4242`
   - **Data**: Qualquer data futura
   - **CVC**: Qualquer 3 dígitos
   - **CEP**: Qualquer CEP válido
6. Complete o checkout
7. Verifique:
   - ✅ Redirecionamento para `/dashboard?success=true`
   - ✅ Webhook recebido (veja logs da edge function)
   - ✅ Dados do usuário atualizados no banco
   - ✅ Status da assinatura: `trialing`

### 5.3. Verificar logs

No Supabase:
1. Vá em **Edge Functions** → **stripe-webhook**
2. Clique em **Logs**
3. Você deve ver:
   ```
   ✅ Webhook recebido: checkout.session.completed
   💳 Checkout completado: cs_test_...
   ✅ User updated successfully
   ```

### 5.4. Verificar banco de dados

No Supabase:
1. Vá em **Database** → **users**
2. Encontre o usuário que fez o checkout
3. Verifique os campos:
   - `stripe_customer_id`: Preenchido
   - `stripe_subscription_id`: Preenchido
   - `subscription_status`: `trialing`
   - `trial_ends_at`: Data 7 dias no futuro
   - `plan_type`: `monthly` (ou o plano escolhido)

---

## 6️⃣ TESTAR CANCELAMENTO

1. No Stripe Dashboard, vá em **Clientes**
2. Encontre o cliente que você criou
3. Clique na assinatura
4. Clique em **Cancelar assinatura**
5. Escolha **Cancelar imediatamente**
6. Verifique:
   - ✅ Webhook `customer.subscription.deleted` recebido
   - ✅ Status atualizado para `canceled` no banco
   - ✅ Campo `canceled_at` preenchido

---

## 7️⃣ TESTAR PORTAL DE GERENCIAMENTO

1. Faça login na aplicação
2. Vá para **Dashboard** ou **Perfil**
3. Clique em **Gerenciar Assinatura**
4. Você será redirecionado para o Stripe Customer Portal
5. No portal você pode:
   - Ver histórico de pagamentos
   - Atualizar método de pagamento
   - Cancelar assinatura
   - Baixar faturas

---

## 8️⃣ ATIVAR MODO PRODUÇÃO

⚠️ **ATENÇÃO**: Só faça isso quando estiver 100% testado!

### 8.1. Ativar sua conta Stripe

1. No Stripe Dashboard, clique em **Ativar conta**
2. Preencha todas as informações solicitadas:
   - Dados da empresa
   - Dados bancários para receber pagamentos
   - Documentos (se solicitados)

### 8.2. Atualizar chaves para produção

1. Vá em **Desenvolvedores** → **Chaves de API**
2. Mude para **Modo de visualização: Dados ativos**
3. Copie as novas chaves (começam com `sk_live_...` e `pk_live_...`)
4. Atualize os secrets no Supabase:
   - `STRIPE_SECRET_KEY`: Nova secret key de produção
   - `STRIPE_PUBLISHABLE_KEY`: Nova publishable key de produção

### 8.3. Recriar produtos em produção

**IMPORTANTE**: Os Price IDs de teste NÃO funcionam em produção!

1. Recrie os 3 produtos (Mensal, Trimestral, Anual) em modo produção
2. Copie os novos Price IDs
3. Atualize os secrets:
   - `STRIPE_PRICE_MONTHLY`
   - `STRIPE_PRICE_QUARTERLY`
   - `STRIPE_PRICE_YEARLY`
4. Atualize o `.env`:
   - `VITE_STRIPE_PRICE_MONTHLY`
   - `VITE_STRIPE_PRICE_QUARTERLY`
   - `VITE_STRIPE_PRICE_YEARLY`

### 8.4. Reconfigurar webhook para produção

1. Vá em **Desenvolvedores** → **Webhooks**
2. Mude para **Modo de visualização: Dados ativos**
3. Adicione o endpoint novamente (mesma URL)
4. Copie o novo Webhook Secret de produção
5. Atualize o secret `STRIPE_WEBHOOK_SECRET`

### 8.5. Fazer deploy da aplicação

```bash
# Fazer commit das mudanças no .env
git add .env
git commit -m "Update Stripe to production mode"
git push

# Ou publicar via Lovable
```

---

## 9️⃣ MONITORAMENTO E MANUTENÇÃO

### 9.1. Logs importantes

Monitore diariamente:
- **Supabase Edge Functions Logs**: Erros nos webhooks
- **Stripe Dashboard → Eventos**: Status de webhooks
- **Stripe Dashboard → Logs**: Chamadas de API

### 9.2. Alertas recomendados

Configure alertas no Stripe para:
- Falhas de pagamento
- Erros de webhook
- Assinaturas canceladas
- Chargebacks

### 9.3. Webhook retry

Se um webhook falhar:
1. Stripe tenta novamente automaticamente (até 3 dias)
2. Você pode reenviar manualmente em **Desenvolvedores** → **Webhooks** → **[seu webhook]** → **Eventos**

---

## 🆘 TROUBLESHOOTING

### Erro: "Webhook signature verification failed"

**Causa**: `STRIPE_WEBHOOK_SECRET` incorreto

**Solução**:
1. Verifique o secret no Stripe Dashboard
2. Certifique-se de que copiou corretamente (incluindo `whsec_`)
3. Atualize o secret no Supabase

### Erro: "No checkout URL returned"

**Causa**: Price ID inválido ou expirado

**Solução**:
1. Verifique se os Price IDs estão corretos
2. Certifique-se de usar Price IDs de teste em modo test
3. Certifique-se de usar Price IDs de produção em modo live

### Erro: "User not found"

**Causa**: `client_reference_id` não foi passado corretamente

**Solução**:
1. Verifique se o usuário está autenticado
2. Verifique se o `user.id` está sendo passado no checkout

### Webhook não está sendo recebido

**Verificar**:
1. URL do webhook está correta?
2. Edge function `stripe-webhook` foi deployada?
3. Edge function tem `verify_jwt = false` no config.toml?
4. Firewall bloqueando requisições do Stripe?

**Testar**:
```bash
curl -X POST https://nlytekhjmumtuabzhsur.supabase.co/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## ✅ CHECKLIST FINAL

Antes de lançar em produção:

- [ ] Todos os produtos criados e testados
- [ ] Webhook configurado e testando (ver logs)
- [ ] Fluxo completo testado com cartão de teste
- [ ] Cancelamento testado
- [ ] Portal de gerenciamento testado
- [ ] Secrets de produção configurados
- [ ] Price IDs de produção configurados
- [ ] Webhook de produção configurado
- [ ] Conta Stripe ativada e verificada
- [ ] Dados bancários configurados para receber pagamentos
- [ ] Testado com pagamento real (R$ 1,00)
- [ ] Monitoramento e alertas configurados

---

## 📚 RECURSOS ÚTEIS

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Documentação Stripe](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Cartões de Teste](https://stripe.com/docs/testing)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## 💡 PRÓXIMOS PASSOS

Após configurar o Stripe:

1. ✅ **Implementar emails transacionais** (welcome, receipt, failed payment)
2. ✅ **Coleta completa de dados do usuário** (nome, telefone, etc.)
3. ✅ **Páginas legais** (Termos de Uso, Privacidade - LGPD)
4. ✅ **Analytics e tracking** (Google Analytics, Facebook Pixel)
5. ✅ **Onboarding melhorado** (tour guiado, checklist)

---

**🎉 Parabéns! Seu sistema de pagamentos está configurado!**
