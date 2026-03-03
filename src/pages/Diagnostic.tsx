import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, ArrowRight, Brain, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Your manager says 'Let's circle back on this.' What does she mean?",
    options: [
      "Let's discuss this in circles",
      "Let's return to this topic later",
      "Let's cancel this meeting",
      "Let's write this in a report",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "In a meeting, you want to disagree politely. Which is MOST appropriate?",
    options: [
      '"That\'s wrong."',
      '"I see your point, however..."',
      '"No, I don\'t think so."',
      '"You are mistaken."',
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Choose the correct sentence for a business email closing:",
    options: [
      '"Waiting for your answer."',
      '"I look forward to hearing from you."',
      '"Answer me soon."',
      '"Please respond quickly."',
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "What does 'bandwidth' mean in a corporate context?",
    options: [
      "Internet speed",
      "A type of salary",
      "Available time/capacity to take on work",
      "A software tool",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "How would you professionally say you missed a deadline?",
    options: [
      '"I forgot."',
      '"It was not my fault."',
      '"I apologize for the delay — I\'ll have it ready by [date]."',
      '"The deadline was not clear."',
    ],
    correctIndex: 2,
  },
];

const getLevelFromScore = (score: number): { level: string; label: string; description: string } => {
  if (score <= 2) return {
    level: 'A2',
    label: 'Nível A2',
    description: 'Você tem base, mas precisa de prática guiada',
  };
  if (score === 3) return {
    level: 'B1',
    label: 'Nível B1',
    description: 'Você se comunica, mas perde confiança em situações de pressão',
  };
  return {
    level: 'B2',
    label: 'Nível B2',
    description: 'Você é fluente, mas pode refinar para soar mais natural e profissional',
  };
};

const Diagnostic = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [saving, setSaving] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;

  const score = answers.reduce((acc, ans, i) => acc + (ans === QUESTIONS[i].correctIndex ? 1 : 0), 0);
  const levelInfo = getLevelFromScore(score);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelectedAnswer(index);
    setRevealed(true);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setRevealed(false);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      saveResult(newAnswers);
    }
  };

  const saveResult = async (finalAnswers: number[]) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const finalScore = finalAnswers.reduce(
        (acc, ans, i) => acc + (ans === QUESTIONS[i].correctIndex ? 1 : 0), 0
      );
      const { level } = getLevelFromScore(finalScore);

      const englishLevelMap: Record<string, string> = {
        'A2': 'beginner',
        'B1': 'intermediate',
        'B2': 'advanced',
      };

      await supabase.from('users').update({
        diagnostic_score: finalScore,
        diagnostic_level: level,
        english_level: englishLevelMap[level] || 'intermediate',
      }).eq('id', user.id);
    } catch (err) {
      toast({ title: 'Erro ao salvar resultado', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const optionLetter = (i: number) => ['A', 'B', 'C', 'D'][i];

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Brain className="w-16 h-16 text-primary mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground">Resultado do Diagnóstico</h1>
            <p className="text-lg text-muted-foreground">
              Você acertou <span className="font-bold text-primary">{score} de {QUESTIONS.length}</span>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-lg">
              {levelInfo.label}
            </div>
            <p className="text-muted-foreground text-lg">{levelInfo.description}</p>
          </div>

          {/* Show answers summary */}
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => {
              const correct = answers[i] === q.correctIndex;
              return (
                <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                  {correct ? (
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                  )}
                  <span className="text-sm text-foreground truncate">Q{i + 1}: {q.question.slice(0, 50)}...</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full text-lg py-6"
              onClick={() => navigate('/dashboard')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver minha trilha recomendada para nível {levelInfo.level}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/dashboard')}>
              Ir para o Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Diagnóstico rápido de inglês corporativo</h1>
          <p className="text-muted-foreground">5 questões · ~3 minutos · resultado imediato</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Questão {currentQuestion + 1} de {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <h2 className="text-lg font-semibold text-foreground leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === question.correctIndex;

                let borderClass = 'border-border hover:border-primary/50';
                let bgClass = 'bg-card';

                if (revealed) {
                  if (isCorrect) {
                    borderClass = 'border-[hsl(var(--success))]';
                    bgClass = 'bg-[hsl(var(--success-muted))]';
                  } else if (isSelected && !isCorrect) {
                    borderClass = 'border-destructive';
                    bgClass = 'bg-destructive/10';
                  }
                } else if (isSelected) {
                  borderClass = 'border-primary';
                  bgClass = 'bg-accent';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderClass} ${bgClass} flex items-start gap-3`}
                  >
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {optionLetter(i)}
                    </span>
                    <span className="text-foreground text-sm leading-relaxed pt-1">{option}</span>
                    {revealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] ml-auto shrink-0 mt-1" />
                    )}
                    {revealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Button size="lg" className="w-full" onClick={handleNext}>
              {currentQuestion < QUESTIONS.length - 1 ? 'Próxima questão' : 'Ver resultado'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Diagnostic;
