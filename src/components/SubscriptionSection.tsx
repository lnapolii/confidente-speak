import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createPortalSession } from "@/services/stripeService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Calendar, Clock, AlertCircle, CheckCircle2, XCircle,
  ExternalLink, Loader2, PauseCircle, FileText,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type SubStatus = "trialing" | "active" | "past_due" | "canceled" | null;

interface SubData {
  subscription_status: SubStatus;
  plan_type: string | null;
  trial_ends_at: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  last_payment_amount: number | null;
  last_payment_date: string | null;
}

const planLabels: Record<string, string> = { monthly: "Mensal", quarterly: "Trimestral", yearly: "Anual" };
const planPrices: Record<string, number> = { monthly: 49, quarterly: 39, yearly: 29 };

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
function cur(v: number | null) {
  if (v === null) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function StatusBadge({ status }: { status: SubStatus }) {
  const map = {
    trialing: { label: "Trial", icon: Clock, cls: "bg-primary/10 text-primary border-primary/20" },
    active: { label: "Ativo", icon: CheckCircle2, cls: "bg-success/10 text-success border-success/20" },
    past_due: { label: "Pagamento Pendente", icon: AlertCircle, cls: "bg-warning/10 text-warning border-warning/20" },
    canceled: { label: "Cancelado", icon: XCircle, cls: "bg-destructive/10 text-destructive border-destructive/20" },
  };
  const cfg = status ? map[status] : null;
  if (!cfg) return <Badge variant="outline" className="text-muted-foreground">Sem assinatura</Badge>;
  const Icon = cfg.icon;
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.cls}`}><Icon className="w-3.5 h-3.5" />{cfg.label}</span>;
}

const SubscriptionSection = () => {
  const [data, setData] = useState<SubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: user } = await supabase
        .from("users")
        .select("subscription_status, plan_type, trial_ends_at, current_period_end, cancel_at_period_end, last_payment_amount, last_payment_date")
        .eq("id", session.user.id)
        .single();
      setData(user as SubData | null);
      setLoading(false);
    })();
  }, []);

  const openPortal = async () => {
    setPortalLoading(true);
    try { await createPortalSession(); } catch { setPortalLoading(false); }
  };

  // Mock invoices
  const invoices = data?.last_payment_date
    ? [{ date: data.last_payment_date, amount: data.last_payment_amount, status: "Pago" }]
    : [];

  if (loading) {
    return <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}</div>;
  }

  const price = data?.plan_type ? planPrices[data.plan_type] ?? null : null;

  return (
    <div className="space-y-6">
      {/* Status & Plan */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-3 text-base">
            <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />Minha Assinatura</span>
            <StatusBadge status={data?.subscription_status ?? null} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-border text-sm">
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Plano atual</dt>
              <dd className="font-medium text-foreground">{data?.plan_type ? `Pro — ${planLabels[data.plan_type]}` : "Free"}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground flex items-center gap-1"><Calendar className="w-4 h-4" />Próxima cobrança</dt>
              <dd className="font-medium text-foreground">
                {fmt(data?.subscription_status === "trialing" ? data?.trial_ends_at ?? null : data?.current_period_end ?? null)}
                {price && <span className="text-muted-foreground ml-1">· {cur(price)}</span>}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Forma de pagamento</dt>
              <dd className="flex items-center gap-2">
                <span className="font-medium text-foreground">Cartão final ****</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs" onClick={openPortal}>Trocar</Button>
              </dd>
            </div>
          </dl>

          {data?.cancel_at_period_end && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-start gap-2 text-sm">
              <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <p className="text-muted-foreground">Cancelamento agendado. Acesso até <span className="font-medium text-foreground">{fmt(data.current_period_end)}</span>.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices */}
      {invoices.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Histórico de faturas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Data</th>
                    <th className="text-left py-2 font-medium">Valor</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-right py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 text-foreground">{fmt(inv.date)}</td>
                      <td className="py-3 text-foreground">{cur(inv.amount)}</td>
                      <td className="py-3"><Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">{inv.status}</Badge></td>
                      <td className="py-3 text-right"><Button variant="ghost" size="sm" onClick={openPortal}>Baixar PDF</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={openPortal} disabled={portalLoading}>
          {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
          Gerenciar Assinatura
        </Button>
        {data?.subscription_status === "active" && (
          <>
            <Button variant="outline" className="flex-1 gap-2" onClick={openPortal}>
              <PauseCircle className="w-4 h-4" /> Pausar por 1 mês
            </Button>
            <Button variant="outline" className="flex-1 gap-2 text-destructive hover:text-destructive" onClick={() => setCancelOpen(true)}>
              <XCircle className="w-4 h-4" /> Cancelar assinatura
            </Button>
          </>
        )}
      </div>

      {/* Cancel Dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza que quer cancelar?</DialogTitle>
            <DialogDescription>
              Antes de ir, temos uma oferta especial para você:
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-2">
            <p className="text-2xl font-bold text-primary">50% OFF</p>
            <p className="text-sm text-muted-foreground">no próximo mês. Continue praticando e mantenha seu progresso!</p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button className="btn-hero flex-1" onClick={() => { setCancelOpen(false); toast({ title: "🎉 Desconto aplicado!", description: "50% de desconto no próximo mês." }); }}>
              Aceitar 50% OFF
            </Button>
            <Button variant="ghost" className="flex-1 text-muted-foreground" onClick={() => { setCancelOpen(false); openPortal(); }}>
              Cancelar mesmo assim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionSection;
