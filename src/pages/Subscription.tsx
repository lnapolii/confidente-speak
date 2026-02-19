import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { createPortalSession } from "@/services/stripeService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  CreditCard,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";

type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled" | "incomplete" | null;
type PlanType = "monthly" | "quarterly" | "yearly" | null;

interface UserSubscription {
  subscription_status: SubscriptionStatus;
  plan_type: PlanType;
  trial_ends_at: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  last_payment_amount: number | null;
  last_payment_date: string | null;
  last_payment_failed_at: string | null;
}

const planLabels: Record<string, string> = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  yearly: "Anual",
};

const planPrices: Record<string, { amount: number; interval: string }> = {
  monthly: { amount: 79.90, interval: "mês" },
  quarterly: { amount: 59.90, interval: "mês" },
  yearly: { amount: 49.90, interval: "mês" },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getTrialDaysLeft(trialEndsAt: string | null): number {
  if (!trialEndsAt) return 0;
  const now = new Date();
  const end = new Date(trialEndsAt);
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function StatusBadge({ status }: { status: SubscriptionStatus }) {
  const config = {
    trialing: {
      label: "Trial Ativo",
      icon: Clock,
      className: "bg-primary/10 text-primary border-primary/20",
    },
    active: {
      label: "Ativa",
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
    },
    past_due: {
      label: "Pagamento Pendente",
      icon: AlertCircle,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    canceled: {
      label: "Cancelada",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    incomplete: {
      label: "Incompleta",
      icon: AlertCircle,
      className: "bg-muted text-muted-foreground border-border",
    },
  };

  const cfg = status ? config[status] : null;
  if (!cfg) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        Sem assinatura
      </Badge>
    );
  }

  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${cfg.className}`}
    >
      <Icon className="w-4 h-4" />
      {cfg.label}
    </span>
  );
}

const Subscription = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: user } = await supabase
        .from("users")
        .select(
          "subscription_status, plan_type, trial_ends_at, current_period_end, cancel_at_period_end, last_payment_amount, last_payment_date, last_payment_failed_at"
        )
        .eq("id", session.user.id)
        .single();

      setData(user as UserSubscription | null);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleManage = async () => {
    setPortalLoading(true);
    try {
      await createPortalSession();
    } catch (err) {
      console.error(err);
      setPortalLoading(false);
    }
  };

  const trialDaysLeft = data?.subscription_status === "trialing"
    ? getTrialDaysLeft(data.trial_ends_at)
    : 0;

  const price = data?.plan_type ? planPrices[data.plan_type] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-heading font-bold text-foreground">
              Pro<span className="text-gradient-primary">Speaker</span>
            </h1>
          </div>
          <span className="text-muted-foreground">/ Assinatura</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
            Minha Assinatura
          </h2>
          <p className="text-muted-foreground">
            Gerencie seu plano, método de pagamento e histórico de cobranças.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Status Card */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between flex-wrap gap-3">
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Status da Assinatura
                  </span>
                  <StatusBadge status={data?.subscription_status ?? null} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.subscription_status === "trialing" && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">
                        {trialDaysLeft > 0
                          ? `${trialDaysLeft} dia${trialDaysLeft !== 1 ? "s" : ""} restantes no trial`
                          : "Trial encerrado"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Seu trial gratuito termina em{" "}
                        <span className="font-medium text-foreground">
                          {formatDate(data.trial_ends_at)}
                        </span>
                        . Após esta data, a cobrança será iniciada automaticamente.
                      </p>
                    </div>
                  </div>
                )}

                {data?.subscription_status === "past_due" && (
                  <div className="p-4 rounded-lg bg-warning/5 border border-warning/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Pagamento com problema</p>
                      <p className="text-sm text-muted-foreground">
                        Houve uma falha no seu último pagamento. Clique em "Gerenciar Assinatura"
                        para atualizar seu cartão.
                      </p>
                    </div>
                  </div>
                )}

                {data?.cancel_at_period_end && (
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Cancelamento agendado</p>
                      <p className="text-sm text-muted-foreground">
                        Sua assinatura será cancelada em{" "}
                        <span className="font-medium text-foreground">
                          {formatDate(data.current_period_end)}
                        </span>
                        . Você ainda tem acesso até essa data.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Plan Details */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="w-5 h-5 text-primary" />
                  Detalhes do Plano
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="divide-y divide-border">
                  <div className="flex justify-between py-3">
                    <dt className="text-muted-foreground">Plano atual</dt>
                    <dd className="font-medium text-foreground">
                      {data?.plan_type ? planLabels[data.plan_type] : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-muted-foreground">Valor</dt>
                    <dd className="font-medium text-foreground">
                      {price
                        ? `${formatCurrency(price.amount)}/${price.interval}`
                        : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Próxima cobrança
                    </dt>
                    <dd className="font-medium text-foreground">
                      {data?.subscription_status === "trialing"
                        ? formatDate(data.trial_ends_at)
                        : formatDate(data?.current_period_end ?? null)}
                    </dd>
                  </div>
                  {data?.last_payment_date && (
                    <div className="flex justify-between py-3">
                      <dt className="text-muted-foreground">Último pagamento</dt>
                      <dd className="font-medium text-foreground">
                        {formatCurrency(data.last_payment_amount)} —{" "}
                        {formatDate(data.last_payment_date)}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Manage Button */}
            <Card className="card-elevated">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground mb-1">Portal de Cobrança</p>
                    <p className="text-sm text-muted-foreground">
                      Atualize cartão, mude de plano, cancele ou veja o histórico de pagamentos.
                    </p>
                  </div>
                  <Button
                    className="btn-hero shrink-0 gap-2"
                    onClick={handleManage}
                    disabled={portalLoading}
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                    Gerenciar Assinatura
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What you can do */}
            <Card className="card-elevated bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  No portal você pode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Atualizar cartão de crédito",
                    "Mudar de plano (Mensal, Trimestral ou Anual)",
                    "Cancelar assinatura a qualquer momento",
                    "Ver histórico completo de pagamentos",
                    "Baixar notas fiscais",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <p className="text-xs text-center text-muted-foreground pt-2 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Dados atualizados em tempo real via Stripe
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Subscription;
