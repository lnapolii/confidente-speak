import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, CheckCircle, Star, TrendingUp, Volume2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalysisResult {
  overallScore: number;
  clarity: number;
  fluency: number;
  pronunciation: number;
  xpEarned: number;
  suggestions: Array<{
    icon: string;
    title: string;
    description: string;
    example?: string;
  }>;
  wordAnalysis: Array<{
    text: string;
    accuracy: number;
    phonetic?: string;
    needsWork: boolean;
  }>;
}

interface PronunciationAnalysisProps {
  userAudio: Blob;
  referenceText: string;
  onComplete: (result: AnalysisResult) => void;
  onRetry: () => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const PronunciationAnalysis = ({ userAudio, referenceText, onComplete, onRetry }: PronunciationAnalysisProps) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyzePronunciation();
  }, []);

  const analyzePronunciation = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert audio blob to base64
      const audioBase64 = await blobToBase64(userAudio);

      const { data, error: fnError } = await supabase.functions.invoke("analyze-pronunciation", {
        body: { audioBase64, referenceText },
      });

      if (fnError) {
        throw new Error(fnError.message || "Erro ao analisar pronúncia");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis(data as AnalysisResult);
    } catch (err) {
      console.error("Pronunciation analysis failed:", err);
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      toast.error("Erro na análise de pronúncia", { description: message });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="analysis-loading flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-primary" />
          </div>
        </div>
        <p className="text-lg font-semibold text-foreground mt-4">Analisando sua pronúncia...</p>
        <p className="text-sm text-muted-foreground mt-2">Nossa IA está processando seu áudio</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-lg font-semibold text-foreground">Não foi possível analisar sua pronúncia</p>
        <p className="text-sm text-muted-foreground text-center max-w-md">{error}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Gravar novamente
          </Button>
          <Button onClick={analyzePronunciation}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="pronunciation-analysis space-y-8">
      {/* Header com Score Geral */}
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
          Análise da Sua Pronúncia
        </h2>
        
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              className="text-muted"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="64"
              cy="64"
            />
            <circle
              className="text-primary transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={`${(analysis.overallScore / 100) * 326.7} 326.7`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {analysis.overallScore}%
            </span>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground">
          {analysis.overallScore >= 90 ? '🎉 Excelente trabalho!' : 
           analysis.overallScore >= 80 ? '👍 Muito bem!' : 
           analysis.overallScore >= 70 ? '✨ Bom progresso!' :
           '💪 Continue praticando!'}
        </p>
      </div>

      {/* Métricas Detalhadas */}
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard
          icon="🗣️"
          title="Clareza"
          score={analysis.clarity}
          description="Quão claro você falou"
          color="blue"
        />
        <MetricCard
          icon="⚡"
          title="Fluência"
          score={analysis.fluency}
          description="Ritmo e naturalidade"
          color="green"
        />
        <MetricCard
          icon="🎯"
          title="Pronúncia"
          score={analysis.pronunciation}
          description="Precisão dos sons"
          color="purple"
        />
      </div>

      {/* Análise Palavra por Palavra */}
      {analysis.wordAnalysis && analysis.wordAnalysis.length > 0 && (
        <Card className="card-elevated">
          <CardContent className="p-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <span>📝</span>
              Análise Detalhada por Palavra
            </h3>
            <div className="space-y-3">
              {analysis.wordAnalysis.map((word, index) => (
                <WordAnalysisItem key={index} word={word} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sugestões de Melhoria */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <span>💡</span>
              Sugestões de Melhoria
            </h3>
            <div className="space-y-4">
              {analysis.suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pontos de XP Ganhos */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <div className="text-5xl mb-2">🏆</div>
          <h3 className="text-2xl font-bold mb-2">
            +{analysis.xpEarned} XP
          </h3>
          <p className="opacity-90">
            Parabéns! Continue assim para alcançar o próximo nível!
          </p>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Refazer Exercício
        </Button>
        <Button
          onClick={() => analysis && onComplete(analysis)}
          className="flex-1 btn-success"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Finalizar e Ver Progresso
        </Button>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, score, description, color }: {
  icon: string;
  title: string;
  score: number;
  description: string;
  color: 'blue' | 'green' | 'purple';
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'text-primary';
      case 'green': return 'text-success';
      case 'purple': return 'text-warning';
      default: return 'text-primary';
    }
  };

  return (
    <Card className="card-elevated text-center">
      <CardContent className="p-6">
        <div className="text-4xl mb-3">{icon}</div>
        <h4 className="text-lg font-bold text-foreground mb-2">{title}</h4>
        <div className={`text-3xl font-bold ${getColorClasses()} mb-2`}>
          {score}%
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-3">
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

const WordAnalysisItem = ({ word }: { word: any }) => {
  const getStatusColor = (accuracy: number) => {
    if (accuracy >= 90) return 'border-success bg-success/10 text-success-dark';
    if (accuracy >= 70) return 'border-warning bg-warning/10 text-warning-dark';
    return 'border-destructive bg-destructive/10 text-destructive-dark';
  };

  const playWordAudio = async (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const americanVoice = voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
    
    utterance.voice = americanVoice;
    utterance.rate = 0.8;
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${getStatusColor(word.accuracy)}`}>
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">{word.text}</span>
        {word.phonetic && (
          <span className="text-sm text-muted-foreground italic">/{word.phonetic}/</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold">{word.accuracy}%</span>
        {word.needsWork && (
          <Button 
            size="sm"
            variant="outline"
            onClick={() => playWordAudio(word.text)}
            className="text-xs h-8"
          >
            <Volume2 className="w-3 h-3 mr-1" />
            Ouvir
          </Button>
        )}
      </div>
    </div>
  );
};

const SuggestionCard = ({ suggestion }: { suggestion: any }) => {
  return (
    <div className="bg-background rounded-lg p-4 border border-border">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{suggestion.icon}</span>
        <div className="flex-1">
          <h4 className="font-bold text-foreground mb-1">{suggestion.title}</h4>
          <p className="text-muted-foreground mb-2">{suggestion.description}</p>
          {suggestion.example && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <span className="font-semibold">Exemplo:</span> {suggestion.example}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PronunciationAnalysis;