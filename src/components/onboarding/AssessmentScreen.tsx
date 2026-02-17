import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface AssessmentScreenProps {
  onNext: (data: { level: 'basic' | 'intermediate' | 'advanced' }) => void;
  onBack: () => void;
}

const questions = [
  {
    question: "How do you say 'Eu gostaria de agendar uma reunião'?",
    options: [
      "I would like to schedule a meeting",
      "I want make a meeting",
      "I like to do a meeting",
      "I need a meeting schedule"
    ],
    correct: 0,
    level: 1,
  },
  {
    question: "Choose the correct sentence:",
    options: [
      "She don't agree with the proposal",
      "She doesn't agrees with the proposal",
      "She doesn't agree with the proposal",
      "She not agree with the proposal"
    ],
    correct: 2,
    level: 1,
  },
  {
    question: "What does 'I'll circle back on that' mean in a business context?",
    options: [
      "Vou andar em círculos",
      "Vou retornar sobre isso depois",
      "Vou dar uma volta",
      "Vou mudar de ideia"
    ],
    correct: 1,
    level: 2,
  },
  {
    question: "Complete: 'We need to _____ the deadline by two weeks.'",
    options: [
      "push back",
      "push up",
      "pull off",
      "put down"
    ],
    correct: 0,
    level: 2,
  },
  {
    question: "What's the most professional way to disagree in a meeting?",
    options: [
      "You're wrong about that.",
      "I see your point, but I'd like to offer a different perspective.",
      "That doesn't make any sense.",
      "No, I disagree completely."
    ],
    correct: 1,
    level: 3,
  },
];

const AssessmentScreen = ({ onNext, onBack }: AssessmentScreenProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate level
      const score = newAnswers.reduce((acc, ans, idx) => 
        ans === questions[idx].correct ? acc + 1 : acc, 0);
      
      const level: 'basic' | 'intermediate' | 'advanced' = 
        score <= 1 ? 'basic' : score <= 3 ? 'intermediate' : 'advanced';
      
      onNext({ level });
    }
  };

  const q = questions[currentQ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Mini Avaliação de Nível 📝
        </h2>
        <p className="text-muted-foreground">
          Pergunta {currentQ + 1} de {questions.length}
        </p>
        <div className="flex gap-1 justify-center mt-4">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full transition-all ${
                i < currentQ ? 'bg-primary' : i === currentQ ? 'bg-primary/60' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-accent rounded-2xl p-6">
          <p className="text-lg font-semibold text-foreground">{q.question}</p>
        </div>

        <div className="grid gap-3">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selected === idx
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                  selected === idx ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between max-w-xl mx-auto">
        <Button onClick={onBack} variant="outline" size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleAnswer}
          disabled={selected === null}
          size="lg"
          className="px-8"
        >
          {currentQ < questions.length - 1 ? 'Próxima →' : 'Ver Resultado →'}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentScreen;
