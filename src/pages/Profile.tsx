import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import DailyGoalSettings from "@/components/DailyGoalSettings";
import SubscriptionSection from "@/components/SubscriptionSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, User, BookOpen, Trophy, Settings, Search, Star, Volume2,
  Download, Flame, Target, Clock, Award, TrendingUp, Heart, RotateCcw,
  CreditCard, Briefcase, GraduationCap, Save, Loader2,
} from "lucide-react";

// ── Types ──
interface ConsultedWord {
  id: string;
  english: string;
  translation: string;
  phonetic?: string;
  category: string;
  context: string;
  firstSeen: Date;
  lastSeen: Date;
  lookupCount: number;
  isFavorite: boolean;
  examples?: Array<{ sentence: string; translation: string }>;
  synonyms?: string[];
  usageTip?: string;
  consultationHistory: Array<{ date: Date; exerciseTopic: string; exerciseDuration: number }>;
}

interface ProfileData {
  full_name: string;
  email: string;
  sector: string;
  job_title: string;
  hierarchy_level: string;
  english_uses: string[];
  preferred_accent: string;
  diagnostic_level: string;
  interface_language: string;
}

// ── Constants ──
const SECTORS = [
  "Tecnologia & Startups",
  "Finanças & Bancos",
  "Saúde & Farmácia",
  "Marketing & Vendas",
  "Engenharia & Manufatura",
  "Jurídico",
  "Educação",
  "Outro",
];

const HIERARCHY_LEVELS = [
  "Analista/Especialista",
  "Coordenador/Supervisor",
  "Gerente",
  "Diretor",
  "C-Level/VP",
  "Empreendedor",
];

const ENGLISH_USES = [
  "Reuniões com equipes internacionais",
  "Apresentações para liderança/clientes",
  "Negociações e contratos",
  "E-mails e comunicação escrita",
  "Entrevistas de emprego",
  "Eventos e networking",
  "Calls de suporte técnico",
];

const ACCENTS = [
  { value: "american", label: "Americano (EUA)" },
  { value: "british", label: "Britânico (UK)" },
  { value: "neutral", label: "Neutro (Sem preferência)" },
];

const LEVELS = ["A2", "B1", "B2", "C1"];

// ── Mock vocabulary data ──
const mockConsultedWords: ConsultedWord[] = [
  {
    id: "1", english: "quarterly", translation: "trimestral", phonetic: "ˈkwɔːr.tər.li",
    category: "Reuniões", context: "Today's quarterly review meeting",
    firstSeen: new Date("2024-01-15"), lastSeen: new Date("2024-01-20"), lookupCount: 3, isFavorite: true,
    examples: [{ sentence: "We have quarterly meetings every three months.", translation: "Temos reuniões trimestrais a cada três meses." }],
    synonyms: ["every three months", "tri-monthly"],
    usageTip: "Usado para descrever algo que acontece quatro vezes por ano",
    consultationHistory: [
      { date: new Date("2024-01-15"), exerciseTopic: "Team Meetings", exerciseDuration: 10 },
      { date: new Date("2024-01-18"), exerciseTopic: "Presentations", exerciseDuration: 5 },
      { date: new Date("2024-01-20"), exerciseTopic: "Team Meetings", exerciseDuration: 15 },
    ],
  },
  {
    id: "2", english: "exceeded", translation: "excedeu, superou", phonetic: "ɪkˈsiː.dɪd",
    category: "Resultados", context: "Our team has exceeded expectations",
    firstSeen: new Date("2024-01-16"), lastSeen: new Date("2024-01-16"), lookupCount: 1, isFavorite: false,
    examples: [{ sentence: "Sales exceeded our targets by 23%.", translation: "As vendas superaram nossas metas em 23%." }],
    synonyms: ["surpassed", "outperformed", "beat"],
    consultationHistory: [{ date: new Date("2024-01-16"), exerciseTopic: "Performance Review", exerciseDuration: 10 }],
  },
  {
    id: "3", english: "adoption rates", translation: "taxas de adoção", phonetic: "əˈdɑːp.ʃən reɪts",
    category: "Marketing", context: "slower adoption rates in international markets",
    firstSeen: new Date("2024-01-17"), lastSeen: new Date("2024-01-19"), lookupCount: 2, isFavorite: true,
    usageTip: "Refere-se à velocidade com que clientes começam a usar um produto ou serviço",
    consultationHistory: [
      { date: new Date("2024-01-17"), exerciseTopic: "Market Analysis", exerciseDuration: 15 },
      { date: new Date("2024-01-19"), exerciseTopic: "Strategy Meeting", exerciseDuration: 10 },
    ],
  },
];

// ── Sub-components ──
const VocabularyCard = ({ word }: { word: ConsultedWord }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const playWordAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) || voices.find((v) => v.lang === "en-US") || voices[0];
    utterance.voice = voice;
    utterance.rate = 0.8;
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="card-elevated hover-lift cursor-pointer transition-all">
      <CardContent className="p-6" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-foreground">{word.english}</h3>
              {word.isFavorite && <Heart className="w-5 h-5 text-warning fill-warning" />}
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); playWordAudio(word.english); }} className="h-8">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            {word.phonetic && <p className="text-muted-foreground italic mb-2">/{word.phonetic}/</p>}
            <p className="text-lg text-primary font-medium">{word.translation}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">{word.category}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <RotateCcw className="w-3 h-3" /><span>{word.lookupCount}x consultada</span>
            </div>
          </div>
        </div>
        <div className="bg-muted p-3 rounded-lg mb-4">
          <p className="text-sm italic text-muted-foreground">"{word.context}"</p>
        </div>
        {isExpanded && (
          <div className="space-y-4 border-t border-border pt-4 animate-fade-in">
            {word.examples && word.examples.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">📝 Exemplos de Uso</h4>
                {word.examples.map((ex, i) => (
                  <div key={i} className="bg-muted p-3 rounded-lg">
                    <p className="text-foreground mb-1">{ex.sentence}</p>
                    <p className="text-sm text-muted-foreground italic">{ex.translation}</p>
                  </div>
                ))}
              </div>
            )}
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">🔄 Sinônimos</h4>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((s, i) => <span key={i} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">{s}</span>)}
                </div>
              </div>
            )}
            {word.usageTip && (
              <div className="bg-success/5 border-l-4 border-success p-3 rounded">
                <h4 className="font-semibold text-success mb-1">💡 Dica de Uso</h4>
                <p className="text-sm text-foreground">{word.usageTip}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-foreground mb-2">📊 Histórico de Consultas</h4>
              {word.consultationHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                  <span className="text-foreground">{h.exerciseTopic}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3 h-3" /><span>{h.exerciseDuration} min</span>
                    <span>•</span><span>{new Date(h.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {isExpanded ? "▲ Clique para ocultar" : "▼ Clique para ver mais detalhes"}
        </div>
      </CardContent>
    </Card>
  );
};

// ── Main Profile Component ──
const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileData>({
    full_name: "", email: "", sector: "", job_title: "", hierarchy_level: "",
    english_uses: [], preferred_accent: "neutral", diagnostic_level: "", interface_language: "pt",
  });

  // Stats from DB
  const [stats, setStats] = useState({ currentStreak: 0, totalXP: 0, completedExercises: 0, totalTime: "0m" });

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const uid = session.user.id;

      const [{ data: user }, { data: statData }] = await Promise.all([
        supabase.from("users").select("full_name, email, sector, job_title, hierarchy_level, english_uses, preferred_accent, diagnostic_level, interface_language").eq("id", uid).single(),
        supabase.from("user_stats").select("current_streak, total_xp, total_exercises").eq("user_id", uid).single(),
      ]);

      if (user) {
        setProfile({
          full_name: user.full_name || "",
          email: user.email || session.user.email || "",
          sector: user.sector || "",
          job_title: user.job_title || "",
          hierarchy_level: user.hierarchy_level || "",
          english_uses: (user.english_uses as string[] | null) || [],
          preferred_accent: user.preferred_accent || "neutral",
          diagnostic_level: user.diagnostic_level || "",
          interface_language: user.interface_language || "pt",
        });
      }
      if (statData) {
        setStats({
          currentStreak: statData.current_streak || 0,
          totalXP: statData.total_xp || 0,
          completedExercises: statData.total_exercises || 0,
          totalTime: `${Math.round((statData.total_exercises || 0) * 7)}m`,
        });
      }
      setLoadingProfile(false);
    })();
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }

    const { error } = await supabase.from("users").update({
      full_name: profile.full_name,
      sector: profile.sector,
      job_title: profile.job_title,
      hierarchy_level: profile.hierarchy_level,
      english_uses: profile.english_uses as any,
      preferred_accent: profile.preferred_accent,
      diagnostic_level: profile.diagnostic_level,
      interface_language: profile.interface_language,
    }).eq("id", session.user.id);

    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado!", description: "Suas recomendações foram personalizadas ✅" });
    }
  };

  const toggleEnglishUse = (use: string) => {
    setProfile((p) => ({
      ...p,
      english_uses: p.english_uses.includes(use) ? p.english_uses.filter((u) => u !== use) : [...p.english_uses, use],
    }));
  };

  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  const tabs = [
    { id: "overview", name: "Visão Geral", icon: User },
    { id: "professional", name: "Perfil Profissional", icon: Briefcase },
    { id: "learning", name: "Aprendizado", icon: GraduationCap },
    { id: "vocabulary", name: "Vocabulário", icon: BookOpen },
    { id: "achievements", name: "Conquistas", icon: Trophy },
    { id: "subscription", name: "Assinatura", icon: CreditCard },
    { id: "settings", name: "Configurações", icon: Settings },
  ];

  const filteredWords = useMemo(() => {
    let filtered = [...mockConsultedWords];
    if (searchTerm) filtered = filtered.filter((w) => w.english.toLowerCase().includes(searchTerm.toLowerCase()) || w.translation.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filter === "recent") filtered = filtered.filter((w) => Date.now() - new Date(w.lastSeen).getTime() < 7 * 24 * 60 * 60 * 1000);
    if (filter === "favorites") filtered = filtered.filter((w) => w.isFavorite);
    if (filter === "difficult") filtered = filtered.filter((w) => w.lookupCount >= 3);
    if (sortBy === "recent") filtered.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
    if (sortBy === "alphabetical") filtered.sort((a, b) => a.english.localeCompare(b.english));
    if (sortBy === "frequency") filtered.sort((a, b) => b.lookupCount - a.lookupCount);
    return filtered;
  }, [searchTerm, filter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</a>
            </Button>
            <h1 className="font-heading font-semibold text-foreground">Meu Perfil</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header Card */}
        <Card className="bg-gradient-primary text-primary-foreground mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-3xl md:text-4xl font-bold">
                {initials}
              </div>
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-1">
                  {profile.full_name || "Usuário"}
                </h2>
                <p className="opacity-90 mb-4 text-sm">{profile.email}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Flame, value: stats.currentStreak, label: "Streak" },
                    { icon: Star, value: stats.totalXP, label: "XP" },
                    { icon: Target, value: stats.completedExercises, label: "Exercícios" },
                    { icon: Clock, value: stats.totalTime, label: "Tempo" },
                  ].map((s, i) => (
                    <div key={i} className="bg-primary-foreground/10 backdrop-blur rounded-lg p-3 text-center">
                      <s.icon className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-lg font-bold">{s.value}</div>
                      <div className="text-[10px] opacity-80">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="mb-8">
          <CardContent className="p-2">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <tab.icon className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Tab: Overview ── */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success" />Progresso do Nível</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Nível {profile.diagnostic_level || "—"}</span>
                      <span>{stats.totalXP} / 1.500 XP</span>
                    </div>
                    <Progress value={(stats.totalXP / 1500) * 100} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Faltam <span className="font-medium text-foreground">{Math.max(0, 1500 - stats.totalXP)} XP</span> para o próximo nível!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary" />Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Nome completo</Label>
                  <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-sm font-medium">E-mail</Label>
                  <Input value={profile.email} disabled className="opacity-60" />
                </div>
                <Button onClick={saveProfile} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Salvar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Tab: Professional Profile ── */}
        {activeTab === "professional" && (
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />Seu contexto profissional</CardTitle>
              <CardDescription>Usamos isso para recomendar o conteúdo mais relevante para você</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sector */}
              <div className="space-y-2">
                <Label>Setor de atuação</Label>
                <Select value={profile.sector} onValueChange={(v) => setProfile({ ...profile, sector: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione seu setor" /></SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label>Cargo atual</Label>
                <Input placeholder="Ex: Gerente de Produto" value={profile.job_title} onChange={(e) => setProfile({ ...profile, job_title: e.target.value })} maxLength={100} />
              </div>

              {/* Hierarchy Level */}
              <div className="space-y-3">
                <Label>Nível hierárquico</Label>
                <RadioGroup value={profile.hierarchy_level} onValueChange={(v) => setProfile({ ...profile, hierarchy_level: v })} className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {HIERARCHY_LEVELS.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`h-${level}`} />
                      <Label htmlFor={`h-${level}`} className="text-sm cursor-pointer">{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* English Uses */}
              <div className="space-y-3">
                <Label>Principais usos do inglês no trabalho</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ENGLISH_USES.map((use) => (
                    <div key={use} className="flex items-center space-x-2">
                      <Checkbox
                        id={`use-${use}`}
                        checked={profile.english_uses.includes(use)}
                        onCheckedChange={() => toggleEnglishUse(use)}
                      />
                      <Label htmlFor={`use-${use}`} className="text-sm cursor-pointer">{use}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Accent */}
              <div className="space-y-3">
                <Label>Sotaque alvo preferido</Label>
                <RadioGroup value={profile.preferred_accent} onValueChange={(v) => setProfile({ ...profile, preferred_accent: v })} className="flex flex-wrap gap-4">
                  {ACCENTS.map((a) => (
                    <div key={a.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={a.value} id={`accent-${a.value}`} />
                      <Label htmlFor={`accent-${a.value}`} className="text-sm cursor-pointer">{a.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button onClick={saveProfile} disabled={saving} className="btn-hero gap-2 w-full sm:w-auto">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar perfil profissional
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Tab: Learning Preferences ── */}
        {activeTab === "learning" && (
          <div className="space-y-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" />Preferências de Aprendizado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Level */}
                <div className="space-y-2">
                  <Label>Nível atual de inglês</Label>
                  <Select value={profile.diagnostic_level} onValueChange={(v) => setProfile({ ...profile, diagnostic_level: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione seu nível" /></SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Atualizado com base no seu diagnóstico. Você pode editar manualmente.</p>
                </div>

                {/* Interface Language */}
                <div className="space-y-2">
                  <Label>Idioma da interface</Label>
                  <RadioGroup value={profile.interface_language} onValueChange={(v) => setProfile({ ...profile, interface_language: v })} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pt" id="lang-pt" />
                      <Label htmlFor="lang-pt" className="text-sm cursor-pointer">Português</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="lang-en" />
                      <Label htmlFor="lang-en" className="text-sm cursor-pointer">English</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={saveProfile} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Salvar preferências
                </Button>
              </CardContent>
            </Card>

            <DailyGoalSettings />
          </div>
        )}

        {/* ── Tab: Vocabulary ── */}
        {activeTab === "vocabulary" && (
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">📚 Minha Biblioteca de Vocabulário</h2>
                <p className="text-muted-foreground mb-6">{mockConsultedWords.length} palavras/expressões consultadas</p>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Buscar palavras ou expressões..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-muted-foreground self-center">Filtrar:</span>
                      {[
                        { key: "all", label: "Todas" },
                        { key: "recent", label: "📅 Recentes" },
                        { key: "favorites", label: "⭐ Favoritas" },
                        { key: "difficult", label: "🔴 Difíceis" },
                      ].map((f) => (
                        <Button key={f.key} onClick={() => setFilter(f.key)} variant={filter === f.key ? "default" : "outline"} size="sm">{f.label}</Button>
                      ))}
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <span className="text-sm font-semibold text-muted-foreground self-center">Ordenar:</span>
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1 rounded-md border border-border bg-background text-sm">
                        <option value="recent">Mais Recentes</option>
                        <option value="alphabetical">A-Z</option>
                        <option value="frequency">Mais Consultadas</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center"><div className="text-xl font-bold text-primary">{mockConsultedWords.length}</div><div className="text-xs text-muted-foreground">Total</div></div>
                    <div className="text-center"><div className="text-xl font-bold text-success">{mockConsultedWords.filter((w) => w.lookupCount === 1).length}</div><div className="text-xs text-muted-foreground">Aprendidas</div></div>
                    <div className="text-center"><div className="text-xl font-bold text-warning">{mockConsultedWords.filter((w) => w.lookupCount >= 3).length}</div><div className="text-xs text-muted-foreground">Revisão</div></div>
                    <div className="text-center"><div className="text-xl font-bold text-accent-foreground">{mockConsultedWords.filter((w) => w.isFavorite).length}</div><div className="text-xs text-muted-foreground">Favoritas</div></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {filteredWords.length === 0 ? (
              <Card className="card-elevated"><CardContent className="p-12 text-center"><div className="text-6xl mb-4">📭</div><p className="text-xl text-muted-foreground">Nenhuma palavra encontrada</p></CardContent></Card>
            ) : (
              <div className="space-y-4">{filteredWords.map((word) => <VocabularyCard key={word.id} word={word} />)}</div>
            )}
            <div className="text-center"><Button className="btn-success"><Download className="w-4 h-4 mr-2" />Exportar Vocabulário (CSV)</Button></div>
          </div>
        )}

        {/* ── Tab: Achievements ── */}
        {activeTab === "achievements" && (
          <Card className="card-elevated">
            <CardContent className="p-6">
              <h2 className="text-2xl font-heading font-bold mb-6">🏆 Suas Conquistas</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="achievement-badge">
                  <Trophy className="w-8 h-8 text-success" />
                  <div><p className="font-bold">Primeira Semana</p><p className="text-sm text-muted-foreground">Complete 7 dias consecutivos</p></div>
                </div>
                <div className="achievement-badge locked">
                  <Flame className="w-8 h-8" />
                  <div><p className="font-bold">Maratonista</p><p className="text-sm text-muted-foreground">Complete um exercício de 15 minutos</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Tab: Subscription ── */}
        {activeTab === "subscription" && <SubscriptionSection />}

        {/* ── Tab: Settings ── */}
        {activeTab === "settings" && (
          <Card className="card-elevated">
            <CardContent className="p-6">
              <h2 className="text-2xl font-heading font-bold mb-6">⚙️ Configurações</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><Label>Nome</Label><Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
                    <div><Label>E-mail</Label><Input value={profile.email} disabled className="opacity-60" /></div>
                  </div>
                </div>
                <Button onClick={saveProfile} disabled={saving}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Profile;
