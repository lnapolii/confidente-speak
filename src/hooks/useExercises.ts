import { useState, useEffect, useMemo } from 'react';
import exercisesData from '@/data/exercises.json';

export type ExerciseDuration = 5 | 10 | 15;

export type ExerciseLevel = 'básico' | 'intermediário' | 'avançado';

export type ExerciseCategory = 
  | 'Reuniões' 
  | 'Apresentações' 
  | 'Comunicação Diária' 
  | 'Negociações' 
  | 'Networking';

export interface ExerciseDurationContent {
  text: string;
  keywords: string[];
  focusPoints: string[];
  culturalTips?: string[];
}

export interface Exercise {
  id: string;
  category: ExerciseCategory;
  title: string;
  description: string;
  level: ExerciseLevel;
  tags: string[];
  duration: {
    5: ExerciseDurationContent;
    10: ExerciseDurationContent;
    15: ExerciseDurationContent;
  };
  audioGenerated: boolean;
  estimatedTime: {
    5: number;
    10: number;
    15: number;
  };
}

interface UseExercisesOptions {
  category?: ExerciseCategory;
  level?: ExerciseLevel;
  searchTerm?: string;
}

export const useExercises = (options?: UseExercisesOptions) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    setTimeout(() => {
      setExercises(exercisesData as Exercise[]);
      setLoading(false);
    }, 300);
  }, []);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (options?.category) {
      filtered = filtered.filter(ex => ex.category === options.category);
    }

    if (options?.level) {
      filtered = filtered.filter(ex => ex.level === options.level);
    }

    if (options?.searchTerm) {
      const term = options.searchTerm.toLowerCase();
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(term) ||
        ex.description.toLowerCase().includes(term) ||
        ex.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [exercises, options]);

  const getExerciseById = (id: string): Exercise | undefined => {
    return exercises.find(ex => ex.id === id);
  };

  const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
    return exercises.filter(ex => ex.category === category);
  };

  const getRecommendedExercise = (userLevel?: ExerciseLevel): Exercise | undefined => {
    // Lógica simples de recomendação
    const levelExercises = userLevel 
      ? exercises.filter(ex => ex.level === userLevel)
      : exercises;

    // Retorna um exercício aleatório do nível apropriado
    return levelExercises[Math.floor(Math.random() * levelExercises.length)];
  };

  const categories: ExerciseCategory[] = [
    'Reuniões',
    'Apresentações',
    'Comunicação Diária',
    'Negociações',
    'Networking'
  ];

  const getCategoryCount = (category: ExerciseCategory): number => {
    return exercises.filter(ex => ex.category === category).length;
  };

  return {
    exercises: filteredExercises,
    allExercises: exercises,
    loading,
    getExerciseById,
    getExercisesByCategory,
    getRecommendedExercise,
    categories,
    getCategoryCount,
    totalCount: exercises.length
  };
};
