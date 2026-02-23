import { useMemo } from "react";
import { EXERCISES_LIBRARY } from "@/data/exercisesLibrary";

export interface ExerciseContent {
  text: string;
  wordCount: number;
  complexity: 'basic' | 'intermediate' | 'advanced';
  focusPoints: string[];
  keywords: string[];
  additionalSections?: Array<{ title: string; content: string }>;
  culturalTips?: string[];
}

export const useExerciseContent = (exerciseId: string, duration: 5 | 10 | 15): ExerciseContent => {
  return useMemo(() => {
    const exercise = EXERCISES_LIBRARY.find(ex => ex.id === exerciseId);

    if (!exercise) {
      // Fallback: try matching by old topic keys
      const topicMap: Record<string, string> = {
        reunioes: 'meeting-001',
        apresentacoes: 'presentation-001',
        negociacoes: 'negotiation-001',
      };
      const mappedId = topicMap[exerciseId.toLowerCase()] || 'meeting-001';
      const fallback = EXERCISES_LIBRARY.find(ex => ex.id === mappedId) || EXERCISES_LIBRARY[0];
      const content = fallback.durations[duration];
      return {
        text: content.text,
        wordCount: content.wordCount,
        complexity: fallback.difficulty === 'beginner' ? 'basic' as const : fallback.difficulty === 'intermediate' ? 'intermediate' as const : 'advanced' as const,
        focusPoints: content.focusPoints,
        keywords: content.keywords,
        culturalTips: content.culturalTips,
      };
    }

    const content = exercise.durations[duration];
    const complexity = exercise.difficulty === 'beginner' ? 'basic' as const : exercise.difficulty === 'intermediate' ? 'intermediate' as const : 'advanced' as const;

    return {
      text: content.text,
      wordCount: content.wordCount,
      complexity,
      focusPoints: content.focusPoints,
      keywords: content.keywords,
      additionalSections: duration > 5 ? [
        {
          title: duration === 10 ? 'Contexto Expandido' : 'Contexto Completo',
          content: `Este exercício simula uma situação real de ${exercise.title} no ambiente corporativo.`,
        },
        ...(content.culturalTips ? [{
          title: 'Dicas Culturais',
          content: content.culturalTips.join('. '),
        }] : []),
      ] : undefined,
      culturalTips: content.culturalTips,
    };
  }, [exerciseId, duration]);
};

export default useExerciseContent;
