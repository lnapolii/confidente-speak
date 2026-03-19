import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Mic,
  MicOff,
  ArrowLeft,
  MessageSquare,
  Users,
  Briefcase,
  DollarSign,
  Star,
  Globe,
  Send,
  Loader2,
  RotateCcw,
  Volume2,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  firstMessage: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "daily-standup",
    title: "Daily Standup",
    description: "Reunião diária com a equipe de desenvolvimento",
    icon: <Users className="w-6 h-6" />,
    firstMessage: "Hey! Good morning, everyone. Alright, let's get this standup going. So, what did you work on yesterday and what's on your plate for today?",
  },
  {
    id: "client-meeting",
    title: "Client Meeting",
    description: "Reunião com cliente para discutir um projeto",
    icon: <Briefcase className="w-6 h-6" />,
    firstMessage: "Hi there, thanks for coming in today. I've had a chance to look over your initial proposal, and I have to say, there are some interesting ideas in there. But before we dive in, can you walk me through your approach and what makes your team the right fit for this project?",
  },
  {
    id: "job-interview",
    title: "Job Interview",
    description: "Entrevista de emprego em uma empresa de tecnologia",
    icon: <Star className="w-6 h-6" />,
    firstMessage: "Welcome! Thanks for coming in today. I'm David from HR, and I'll be conducting this first round of the interview. So, to kick things off — tell me a little about yourself and what drew you to this position.",
  },
  {
    id: "salary-negotiation",
    title: "Salary Negotiation",
    description: "Negociação salarial para uma nova posição",
    icon: <DollarSign className="w-6 h-6" />,
    firstMessage: "So, we're really excited to have you join the team! I'd like to go over the compensation package we've put together. We're offering a base salary of $85,000 with standard benefits. What are your thoughts on that?",
  },
  {
    id: "performance-review",
    title: "Performance Review",
    description: "Avaliação trimestral de desempenho",
    icon: <MessageSquare className="w-6 h-6" />,
    firstMessage: "Hey, come on in. Thanks for making time for our quarterly check-in. Overall, I think it's been a solid quarter for you. Let's start with what you feel went really well — what are you most proud of?",
  },
  {
    id: "networking-event",
    title: "Networking Event",
    description: "Evento de networking em uma conferência",
    icon: <Globe className="w-6 h-6" />,
    firstMessage: "Hey! I don't think we've met. I'm Alex — I'm a PM over at a fintech startup. This conference has been great so far, hasn't it? What brings you here today?",
  },
];

type Difficulty = "beginner" | "intermediate" | "advanced";

const Roleplay = () => {
  const [phase, setPhase] = useState<"select" | "chat" | "summary">("select");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summaryText, setSummaryText] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiThinking]);

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([{ role: "assistant", content: scenario.firstMessage }]);
    setExchangeCount(0);
    setSummaryText("");
    setPhase("chat");
    speakText(scenario.firstMessage);
  };

  const speakText = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const americanVoice =
      voices.find((v) => v.lang === "en-US" && (v.name.includes("Google") || v.name.includes("Microsoft"))) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];
    utterance.voice = americanVoice;
    utterance.rate = 0.95;
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    try {
      setTranscript("");

      // Start SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({ title: "Navegador não suportado", description: "Use Chrome ou Edge para reconhecimento de voz.", variant: "destructive" });
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true;
      recognitionRef.current = recognition;

      let finalTranscript = "";

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += t + " ";
          } else {
            interim = t;
          }
        }
        setTranscript(finalTranscript + interim);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "aborted") {
          toast({ title: "Erro no reconhecimento", description: "Tente novamente.", variant: "destructive" });
        }
      };

      recognition.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({ title: "Erro no microfone", description: "Permita o acesso ao microfone.", variant: "destructive" });
    }
  };

  const stopRecording = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || !selectedScenario) return;

    const userMessage: ChatMessage = { role: "user", content: userText.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setTranscript("");
    const newExchangeCount = exchangeCount + 1;
    setExchangeCount(newExchangeCount);

    setIsAiThinking(true);

    try {
      const { data, error } = await supabase.functions.invoke("roleplay-chat", {
        body: {
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          scenario: selectedScenario.id,
          exchangeCount: newExchangeCount,
          difficulty,
        },
      });

      if (error) throw error;

      const aiMessage = data.message;

      if (newExchangeCount >= 5) {
        setSummaryText(aiMessage);
        setPhase("summary");
      } else {
        const assistantMsg: ChatMessage = { role: "assistant", content: aiMessage };
        setMessages((prev) => [...prev, assistantMsg]);
        speakText(aiMessage);
      }
    } catch (err) {
      console.error("Roleplay error:", err);
      toast({ title: "Erro na conversa", description: "Não foi possível obter resposta. Tente novamente.", variant: "destructive" });
    } finally {
      setIsAiThinking(false);
    }
  };

  const resetSession = () => {
    speechSynthesis.cancel();
    setPhase("select");
    setSelectedScenario(null);
    setMessages([]);
    setExchangeCount(0);
    setTranscript("");
    setSummaryText("");
  };

  // ─── SCENARIO SELECTION ────────────────────────────────────────────────
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </a>
              </Button>
              <div>
                <h1 className="font-heading font-semibold text-foreground text-lg">🎭 AI Roleplay</h1>
                <p className="text-sm text-muted-foreground">Pratique conversas reais com IA</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Difficulty selector */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Nível de dificuldade</h2>
            <div className="flex gap-2">
              {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((d) => (
                <Button
                  key={d}
                  variant={difficulty === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(d)}
                >
                  {d === "beginner" ? "🟢 Iniciante" : d === "intermediate" ? "🟡 Intermediário" : "🔴 Avançado"}
                </Button>
              ))}
            </div>
          </div>

          {/* Scenario cards */}
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Escolha um cenário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIOS.map((scenario) => (
              <Card
                key={scenario.id}
                className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                onClick={() => startScenario(scenario)}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {scenario.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ─── SUMMARY ───────────────────────────────────────────────────────────
  if (phase === "summary") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={resetSession}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="font-heading font-semibold text-foreground text-lg">📊 Resumo da Sessão</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {summaryText.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={i} className="font-bold text-foreground">{line.replace(/\*\*/g, "")}</p>;
                  }
                  if (line.includes("**")) {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={i}>
                        {parts.map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                        )}
                      </p>
                    );
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>

              <div className="mt-8 flex gap-3">
                <Button className="btn-hero" onClick={resetSession}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Nova Sessão
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard">Ir para o Dashboard</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // ─── CHAT ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={resetSession}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <div>
                <h1 className="font-heading font-semibold text-foreground text-sm">
                  🎭 {selectedScenario?.title}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {difficulty === "beginner" ? "Iniciante" : difficulty === "intermediate" ? "Intermediário" : "Avançado"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {exchangeCount}/5 trocas
              </span>
              <Progress value={(exchangeCount / 5) * 100} className="w-20 h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakText(msg.content)}
                    className="block mt-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
                    title="Ouvir novamente"
                  >
                    <Volume2 className="w-3.5 h-3.5 inline mr-1" />
                    Ouvir
                  </button>
                )}
              </div>
            </div>
          ))}

          {isAiThinking && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Pensando...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background p-4">
        <div className="container mx-auto max-w-2xl">
          {/* Live transcript preview */}
          {transcript && (
            <div className="mb-3 p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground italic">
              {transcript}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className={isRecording ? "btn-success animate-pulse shrink-0" : "shrink-0"}
              variant={isRecording ? "default" : "outline"}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAiThinking}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <div className="flex-1 text-sm text-muted-foreground">
              {isRecording
                ? "🔴 Gravando... clique para parar"
                : isAiThinking
                ? "Aguardando resposta..."
                : "Clique no microfone para responder"}
            </div>

            {transcript && !isRecording && (
              <Button
                size="lg"
                className="btn-hero shrink-0"
                onClick={() => sendMessage(transcript)}
                disabled={isAiThinking || !transcript.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roleplay;
