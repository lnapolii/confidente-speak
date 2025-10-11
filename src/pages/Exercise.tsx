import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import PronunciationAnalysis from "@/components/PronunciationAnalysis";
import { useExerciseContent } from "@/components/ExerciseContentGenerator";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Volume2, 
  BookOpen, 
  Headphones, 
  Target,
  CheckCircle,
  ArrowLeft,
  Clock
} from "lucide-react";

// Translation system
const WordTooltip = ({ word, isVisible, position }: { word: string; isVisible: boolean; position: { x: number; y: number } }) => {
  const translations: Record<string, string[]> = {
    quarterly: ["trimestral", "a cada três meses"],
    performance: ["desempenho", "performance"],
    exceeded: ["excedeu", "superou"],
    satisfaction: ["satisfação"],
    challenges: ["desafios", "dificuldades"],
    adoption: ["adoção", "implementação"],
    meeting: ["reunião", "encontro"],
    revenue: ["receita", "faturamento"]
  };

  const wordTranslations = translations[word.toLowerCase().replace(/[.,!?]/g, '')] || ["tradução não encontrada"];

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none"
      style={{ 
        left: position.x + 10, 
        top: position.y - 40,
        transform: position.y < 50 ? 'translateY(40px)' : 'none'
      }}
    >
      <div className="font-semibold mb-1">Traduções:</div>
      <ul className="list-disc list-inside">
        {wordTranslations.map((translation, i) => (
          <li key={i}>{translation}</li>
        ))}
      </ul>
    </div>
  );
};

const InteractiveText = ({ text, onWordClick }: { text: string; onWordClick: (word: string) => void }) => {
  const [tooltip, setTooltip] = useState<{ word: string; position: { x: number; y: number } } | null>(null);
  const [clickedWords, setClickedWords] = useState<Set<string>>(new Set());

  const handleWordHover = (word: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      word: word.toLowerCase().replace(/[.,!?]/g, ''),
      position: { x: rect.left, y: rect.top }
    });
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
    setClickedWords(prev => new Set([...prev, cleanWord]));
    onWordClick(cleanWord);
  };

  const words = text.split(' ');

  return (
    <div className="relative">
      <p className="mb-4 leading-relaxed">
        {words.map((word, index) => {
          const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
          const isClicked = clickedWords.has(cleanWord);
          
          return (
            <span 
              key={index}
              className={`cursor-pointer hover:bg-blue-100 transition-colors px-1 rounded ${
                isClicked ? 'text-blue-600 bg-blue-50' : ''
              }`}
              onMouseEnter={(e) => handleWordHover(word, e)}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => handleWordClick(word)}
            >
              {word}{index < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </p>
      
      <WordTooltip 
        word={tooltip?.word || ''} 
        isVisible={!!tooltip} 
        position={tooltip?.position || { x: 0, y: 0 }} 
      />
    </div>
  );
};

const Exercise = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordsConsulted, setWordsConsulted] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState<5 | 10 | 15>(10);
  const [exerciseTopic, setExerciseTopic] = useState("reunioes");
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const exerciseContent = useExerciseContent(exerciseTopic, exerciseDuration);
  const exerciseText = exerciseContent.text;

  // Track exercise timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSteps = 3;
    return (currentStep / totalSteps) * 100;
  };

  // TTS functionality
  const generateSpeech = async (text: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const americanVoice = voices.find(voice => 
        voice.lang === 'en-US' && (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
      
      utterance.voice = americanVoice;
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        resolve();
      };
      
      speechSynthesis.speak(utterance);
    });
  };

  // Audio recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      chunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioUrl(url);
        setRecordedAudioBlob(blob);
        
        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: "Gravação concluída!",
          description: "Sua pronúncia foi gravada com sucesso.",
        });
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      toast({
        title: "Erro no microfone",
        description: "Por favor, permita o acesso ao microfone para continuar.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Text highlighting during audio
  useEffect(() => {
    if (!isPlaying) return;
    
    const words = exerciseText.split(' ');
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      setCurrentWordIndex(wordIndex);
      wordIndex++;
      
      if (wordIndex >= words.length) {
        clearInterval(interval);
        setCurrentWordIndex(0);
      }
    }, 500); // Approximate timing
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleWordClick = (word: string) => {
    setWordsConsulted(prev => prev + 1);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      generateSpeech(exerciseText);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      speechSynthesis.cancel();
      setTimeout(() => generateSpeech(exerciseText), 100);
    }
  };

  const steps = [
    { id: 1, title: "Leitura", icon: BookOpen, status: "current" },
    { id: 2, title: "Escuta", icon: Headphones, status: "pending" },
    { id: 3, title: "Prática", icon: Mic, status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </a>
              </Button>
              <div>
                <h1 className="font-heading font-semibold text-foreground">Team Meeting Discussion</h1>
                <p className="text-sm text-muted-foreground">Exercício de 10 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {formatTime(elapsedTime)}
              </div>
              <Progress value={calculateProgress()} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id 
                      ? 'bg-gradient-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Content */}
        <Card className="exercise-card">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Etapa 1: Leitura e Compreensão
                </CardTitle>
                <p className="text-muted-foreground">
                  Leia o texto abaixo. Clique nas palavras para ver a tradução.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="reading-text p-6 bg-background-muted rounded-xl">
                  <InteractiveText text={exerciseText} onWordClick={handleWordClick} />
                </div>

                <div className="bg-success-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-success" />
                        <span className="font-medium text-success-dark">Progresso de Compreensão</span>
                      </div>
                      <span className="text-sm text-success-dark">{wordsConsulted}/15 palavras consultadas</span>
                    </div>
                    <Progress value={(wordsConsulted / 15) * 100} className="mt-2 h-2" />
                </div>

                <div className="flex justify-end">
                  <Button 
                    className="btn-success"
                    onClick={() => setCurrentStep(2)}
                  >
                    Entendi! Próxima Etapa
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  Etapa 2: Escuta Ativa
                </CardTitle>
                <p className="text-muted-foreground">
                  Ouça o áudio e acompanhe a sincronização das palavras.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="audio-player">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Button 
                        size="lg" 
                        className={isPlaying ? "btn-success" : "btn-hero"}
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">1:32</span> / 2:45
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Repetir
                      </Button>
                      <div className="flex gap-1">
                        <Button 
                          variant={playbackSpeed === 0.75 ? "default" : "ghost"} 
                          size="sm"
                          onClick={() => handleSpeedChange(0.75)}
                        >
                          0.75x
                        </Button>
                        <Button 
                          variant={playbackSpeed === 1.0 ? "default" : "ghost"} 
                          size="sm"
                          onClick={() => handleSpeedChange(1.0)}
                        >
                          1.0x
                        </Button>
                        <Button 
                          variant={playbackSpeed === 1.25 ? "default" : "ghost"} 
                          size="sm"
                          onClick={() => handleSpeedChange(1.25)}
                        >
                          1.25x
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="waveform mb-4">
                    {/* Simulated waveform */}
                    <div className="flex items-end justify-center h-full gap-1 px-4">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-primary rounded-full transition-all duration-300 ${
                            i < 15 ? 'opacity-100' : 'opacity-30'
                          }`}
                          style={{
                            width: '3px',
                            height: `${Math.random() * 40 + 20}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <p className="text-foreground leading-relaxed">
                      {exerciseText.split(' ').map((word, index) => (
                        <span 
                          key={index}
                          className={`transition-all px-1 rounded ${
                            index === currentWordIndex && isPlaying
                              ? 'bg-primary/30 font-semibold' 
                              : ''
                          }`}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Etapa Anterior
                  </Button>
                  <Button 
                    className="btn-success"
                    onClick={() => setCurrentStep(3)}
                  >
                    Próxima Etapa
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  Etapa 3: Prática de Pronúncia
                </CardTitle>
                <p className="text-muted-foreground">
                  Repita o texto após ouvir o áudio. Nossa IA analisará sua pronúncia.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-success/5 rounded-xl border-2 border-dashed border-primary/20">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    {isRecording ? (
                      <div className="w-6 h-6 bg-primary-foreground rounded-full animate-pulse" />
                    ) : (
                      <Mic className="w-12 h-12 text-primary-foreground" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {isRecording ? "Gravando..." : "Pronto para gravar"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {isRecording 
                      ? "Repita: 'Good morning everyone, and thank you for joining today's quarterly review meeting.'"
                      : "Clique no botão abaixo quando estiver pronto"
                    }
                  </p>

                  <Button
                    size="lg"
                    className={isRecording ? "btn-success animate-pulse-success" : "btn-hero"}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-6 h-6 mr-2" />
                        Parar Gravação
                      </>
                    ) : (
                      <>
                        <Mic className="w-6 h-6 mr-2" />
                        Começar Gravação
                      </>
                    )}
                  </Button>
                </div>

                {recordedAudioUrl && (
                  <Card className="border-success bg-success/5">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="text-sm font-medium">Gravação concluída!</span>
                        </div>
                        <audio src={recordedAudioUrl} controls className="w-full" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setRecordedAudioUrl(null)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Gravar Novamente
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isRecording && (
                  <Card className="border-success bg-success/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Gravando...</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Escutando sua voz</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Etapa Anterior
                  </Button>
                  <Button 
                    className="btn-success"
                    disabled={!recordedAudioUrl}
                    onClick={() => {
                      if (recordedAudioBlob) {
                        setShowAnalysis(true);
                      }
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Analisar Pronúncia
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Pronunciation Analysis Modal */}
        {showAnalysis && recordedAudioBlob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <PronunciationAnalysis
                  userAudio={recordedAudioBlob}
                  referenceText={exerciseText}
                  onComplete={() => {
                    setShowAnalysis(false);
                    toast({
                      title: "Exercício concluído! 🎉",
                      description: "Parabéns! Você ganhou XP.",
                    });
                    setTimeout(() => window.location.href = '/dashboard', 2000);
                  }}
                  onRetry={() => {
                    setShowAnalysis(false);
                    setCurrentStep(1);
                    setRecordedAudioUrl(null);
                    setRecordedAudioBlob(null);
                    setWordsConsulted(0);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Exercise;