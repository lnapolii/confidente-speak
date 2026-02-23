import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Volume2, X, Loader2 } from "lucide-react";
import { translateWordWithCache, type TranslationResult } from "@/services/translationService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReadingExerciseProps {
  text: string;
  exerciseId?: string;
  exerciseTitle?: string;
  onComplete: () => void;
}

const ReadingExercise = ({ text, exerciseId, exerciseTitle, onComplete }: ReadingExerciseProps) => {
  const [consultedWords, setConsultedWords] = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<{ word: string; original: string } | null>(null);
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const MINIMUM_WORDS = 5;
  const totalWords = text.split(' ').filter(w => w.length > 3).length;
  const progressPercentage = (consultedWords.size / MINIMUM_WORDS) * 100;
  const canProceed = consultedWords.size >= MINIMUM_WORDS;

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

  const handleWordClick = async (cleanWord: string, originalWord: string) => {
    if (activeWord?.word === cleanWord) {
      setActiveWord(null);
      setTranslation(null);
      return;
    }

    setLoading(true);
    setActiveWord({ word: cleanWord, original: originalWord });
    
    try {
      // Buscar tradução com IA (com cache e fallback)
      const translationData = await translateWordWithCache(cleanWord, text);
      setTranslation(translationData);
      setConsultedWords(prev => new Set([...prev, cleanWord]));

      // Salvar palavra na biblioteca de vocabulário
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { error: upsertError } = await supabase
          .from('vocabulary')
          .upsert(
            {
              user_id: session.user.id,
              word: cleanWord,
              translation: translationData.primary,
              phonetic: translationData.phonetic || null,
              context_sentence: text.substring(0, 500),
              exercise_id: exerciseId || null,
              alternatives: translationData.alternatives || [],
              examples: translationData.example
                ? [{ sentence: translationData.example, tip: translationData.tip }]
                : [],
            },
            { onConflict: 'user_id,word', ignoreDuplicates: false }
          );

        if (upsertError) {
          // Word may already exist — increment lookup count
          if (upsertError.code === '23505') {
            await supabase.rpc('increment_lookup_count', {
              p_user_id: session.user.id,
              p_word: cleanWord,
            });
          } else {
            console.warn('Vocabulary save error:', upsertError);
          }
        }

        toast.success('📚 Palavra salva na biblioteca!', { duration: 2000 });
      }
    } catch (error) {
      console.error('Erro ao traduzir palavra:', error);
      setTranslation({
        primary: "erro ao carregar tradução",
        alternatives: ["tente novamente"],
      });
    } finally {
      setLoading(false);
    }
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
            Palavras Consultadas
          </span>
          <span className={`text-lg font-bold ${canProceed ? 'text-green-600' : 'text-blue-600'}`}>
            {consultedWords.size} / {MINIMUM_WORDS} mínimo
          </span>
        </div>
        <Progress 
          value={Math.min(progressPercentage, 100)} 
          className={`h-3 ${canProceed ? '[&>div]:bg-green-500' : ''}`}
        />
        {canProceed ? (
          <p className="text-sm text-green-600 font-semibold mt-2 flex items-center gap-2">
            ✓ Pronto! Você pode continuar para a próxima etapa.
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-2">
            Clique em pelo menos {MINIMUM_WORDS - consultedWords.size} palavra(s) mais para continuar
          </p>
        )}
      </div>

      {/* Instrução */}
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-gray-700">
          💡 <strong>Dica:</strong> Clique em pelo menos {MINIMUM_WORDS} palavras para ver suas traduções e poder avançar.
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
            {canProceed 
              ? 'Continuar para Listening →' 
              : `Consulte mais ${MINIMUM_WORDS - consultedWords.size} palavra(s)`
            }
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

              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                  <p className="text-sm text-gray-500">Traduzindo...</p>
                </div>
              ) : translation ? (
                <>
                  {/* Fonética */}
                  {translation.phonetic && (
                    <p className="text-gray-500 italic mb-4">/{translation.phonetic}/</p>
                  )}

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
                        Exemplo corporativo:
                      </span>
                      <p className="text-sm text-gray-700 italic mt-1">
                        "{translation.example}"
                      </p>
                    </div>
                  )}

                  {/* Dica de aprendizado */}
                  {translation.tip && (
                    <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <span className="text-xs text-gray-700 font-semibold">💡 Dica:</span>
                      <p className="text-sm text-gray-700 mt-1">{translation.tip}</p>
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

                  {/* Badge IA */}
                  <p className="text-xs text-center text-gray-400 mt-3">
                    ✨ Traduzido com IA | ✓ Salvo na biblioteca
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReadingExercise;
