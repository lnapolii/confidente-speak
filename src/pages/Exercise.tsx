import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

const Exercise = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
                8:32 restantes
              </div>
              <Progress value={25} className="w-24 h-2" />
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
                  <p className="mb-4">
                    Good morning everyone, and thank you for joining today's{" "}
                    <span className="word-tooltip">quarterly</span> review meeting. 
                    I'd like to start by discussing our{" "}
                    <span className="word-tooltip">performance</span> metrics from Q3.
                  </p>
                  <p className="mb-4">
                    Our team has{" "}
                    <span className="word-tooltip">exceeded</span> expectations in several key areas. 
                    Sales revenue increased by 23%, while customer{" "}
                    <span className="word-tooltip">satisfaction</span> scores reached an all-time high of 4.8 out of 5.
                  </p>
                  <p>
                    However, we still have some{" "}
                    <span className="word-tooltip">challenges</span> to address, 
                    particularly in our international markets where we're seeing slower{" "}
                    <span className="word-tooltip">adoption</span> rates.
                  </p>
                </div>

                <div className="bg-success-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-success" />
                      <span className="font-medium text-success-dark">Progresso de Compreensão</span>
                    </div>
                    <span className="text-sm text-success-dark">5/12 palavras consultadas</span>
                  </div>
                  <Progress value={42} className="mt-2 h-2" />
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
                        onClick={() => setIsPlaying(!isPlaying)}
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
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-4 h-4 mr-2" />
                        0.8x
                      </Button>
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
                    <p className="text-foreground">
                      <span className="bg-primary/20 px-1 rounded">Good morning everyone</span>, 
                      and thank you for joining today's quarterly review meeting...
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
                    onClick={() => setIsRecording(!isRecording)}
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

                {isRecording && (
                  <Card className="border-success bg-success/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                          <span className="text-sm font-medium">Análise em tempo real</span>
                        </div>
                        <span className="text-sm text-muted-foreground">0:08 gravados</span>
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
                    disabled={!isRecording}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalizar Exercício
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Exercise;