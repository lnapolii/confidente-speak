import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Volume2, X } from "lucide-react";

interface ReadingExerciseProps {
  text: string;
  onComplete: () => void;
}

// Dicionário offline básico
const dictionary: Record<string, { primary: string; alternatives: string[]; example?: string }> = {
  meeting: { primary: "reunião", alternatives: ["encontro", "assembleia"], example: "We have a meeting at 3 PM" },
  deadline: { primary: "prazo", alternatives: ["prazo final", "data limite"] },
  productive: { primary: "produtivo", alternatives: ["eficiente", "eficaz"] },
  feedback: { primary: "feedback", alternatives: ["retorno", "avaliação"] },
  blocker: { primary: "bloqueio", alternatives: ["impedimento", "obstáculo"] },
  stakeholder: { primary: "stakeholder", alternatives: ["parte interessada"] },
  prototype: { primary: "protótipo", alternatives: ["modelo", "esboço"] },
  wrapped: { primary: "finalizei", alternatives: ["concluí", "terminei"] },
  circulated: { primary: "circulei", alternatives: ["distribuí", "compartilhei"] },
  incorporate: { primary: "incorporar", alternatives: ["incluir", "integrar"] },
  guidance: { primary: "orientação", alternatives: ["direção", "ajuda"] },
  anticipate: { primary: "antecipar", alternatives: ["prever", "esperar"] },
  swamped: { primary: "sobrecarregado", alternatives: ["atolado", "ocupado demais"] },
  knocked: { primary: "finalizamos", alternatives: ["concluímos", "resolvemos"] },
  edge: { primary: "casos extremos", alternatives: ["situações limite"] },
  pivot: { primary: "mudar de direção", alternatives: ["ajustar estratégia"] },
};

const ReadingExercise = ({ text, onComplete }: ReadingExerciseProps) => {
  const [consultedWords, setConsultedWords] = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<{ word: string; original: string } | null>(null);
  const [translation, setTranslation] = useState<{ primary: string; alternatives: string[]; example?: string } | null>(null);

  const totalWords = text.split(' ').filter(w => w.length > 3).length;
  const progressPercentage = (consultedWords.size / totalWords) * 100;
  const canProceed = progressPercentage >= 30; // Reduzido para 30% para facilitar teste

  const processText = (text: string) => {
    const sentences = text.split('\n');
    
    return sentences.map((sentence, sentenceIndex) => {
      if (!sentence.trim()) return <br key={sentenceIndex} />;
      
      const words = sentence.split(' ');
      
      return (
        <p key={sentenceIndex} className="mb-4 text-lg leading-relaxed">
          {words.map((wordWithPunctuation, wordIndex) => {
            const cleanWord = wordWithPunctuation.replace(/[.,!?;:]/g, '').toLowerCase();
            const punctuation = wordWithPunctuation.match(/[.,!?;:]/g)?.[0] || '';
            
            if (cleanWord.length <= 2) return <span key={`${sentenceIndex}-${wordIndex}`}>{wordWithPunctuation} </span>;
            
            const isConsulted = consultedWords.has(cleanWord);
            const isActive = activeWord?.word === cleanWord;
            
            return (
              <span key={`${sentenceIndex}-${wordIndex}`}>
                <span
                  onClick={() => handleWordClick(cleanWord, wordWithPunctuation)}
                  className={`
                    inline-block cursor-pointer px-1 py-0.5 rounded transition-all
                    hover:bg-blue-100 hover:scale-105
                    ${isConsulted ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-900'}
                    ${isActive ? 'bg-blue-200 ring-2 ring-blue-400' : ''}
                  `}
                >
                  {wordWithPunctuation.replace(/[.,!?;:]/g, '')}
                </span>
                {punctuation}{' '}
              </span>
            );
          })}
        </p>
      );
    });
  };

  const handleWordClick = (cleanWord: string, originalWord: string) => {
    if (activeWord?.word === cleanWord) {
      setActiveWord(null);
      setTranslation(null);
      return;
    }

    setActiveWord({ word: cleanWord, original: originalWord });
    
    // Buscar tradução no dicionário
    const translationData = dictionary[cleanWord] || {
      primary: "tradução não disponível",
      alternatives: ["consulte um dicionário online"]
    };
    
    setTranslation(translationData);
    setConsultedWords(prev => new Set([...prev, cleanWord]));
  };

  const handleCloseTranslation = () => {
    setActiveWord(null);
    setTranslation(null);
  };

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📖 Etapa 1: Leitura e Compreensão
        </CardTitle>
        <p className="text-muted-foreground">
          Clique nas palavras para ver a tradução e salvar na sua biblioteca.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progresso */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progresso de Leitura
            </span>
            <span className="text-sm text-gray-600">
              {consultedWords.size} / {totalWords} palavras consultadas
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2.5" />
          {canProceed && (
            <p className="text-sm text-green-600 font-semibold mt-2">
              ✓ Compreensão atingida! Você pode continuar.
            </p>
          )}
        </div>

        {/* Instrução */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-gray-700">
            💡 <strong>Dica:</strong> Clique nas palavras que não conhece para ver a tradução.
            Meta: entender pelo menos 30% do texto.
          </p>
        </div>

        {/* Texto do exercício */}
        <div className="bg-white p-8 rounded-xl shadow-md relative">
          {processText(text)}
        </div>

        {/* Botão para próxima etapa */}
        <div className="flex justify-end">
          <Button
            onClick={onComplete}
            disabled={!canProceed}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg transition-all
              ${canProceed 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {canProceed ? 'Continuar para Listening →' : 'Consulte mais palavras para continuar'}
          </Button>
        </div>

        {/* Contador de palavras consultadas (badge fixo) */}
        <div className="fixed bottom-8 left-8 bg-white rounded-full shadow-xl px-6 py-3 flex items-center gap-3 z-40 border-2 border-blue-500">
          <span className="text-2xl">📚</span>
          <div>
            <p className="text-xs text-gray-500">Palavras novas</p>
            <p className="text-xl font-bold text-blue-600">{consultedWords.size}</p>
          </div>
        </div>
      </CardContent>

      {/* Modal de Tradução */}
      {activeWord && translation && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-50"
            onClick={handleCloseTranslation}
          />
          
          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-500 animate-scale-in">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeWord.original}
                </h3>
                <button 
                  onClick={handleCloseTranslation}
                  className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tradução principal */}
              <div className="mb-4">
                <span className="text-sm text-gray-500 font-semibold">
                  Tradução Principal:
                </span>
                <p className="text-xl text-blue-600 font-bold mt-1">
                  {translation.primary}
                </p>
              </div>

              {/* Traduções alternativas */}
              {translation.alternatives && translation.alternatives.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 font-semibold">
                    Outras Traduções:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {translation.alternatives.map((alt, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Exemplo de uso */}
              {translation.example && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <span className="text-xs text-gray-500 font-semibold">
                    Exemplo:
                  </span>
                  <p className="text-sm text-gray-700 italic mt-1">
                    "{translation.example}"
                  </p>
                </div>
              )}

              {/* Botão de áudio */}
              <button 
                onClick={() => speakWord(activeWord.word)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                Ouvir Pronúncia
              </button>

              {/* Indicador de salvamento */}
              <p className="text-xs text-center text-green-600 mt-3 font-semibold">
                ✓ Salvo na sua biblioteca
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReadingExercise;
