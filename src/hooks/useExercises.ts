import { useState, useEffect, useMemo } from 'react';
import { EXERCISES_LIBRARY } from '@/data/exercisesLibrary';
import type { Exercise, ExerciseCategory } from '@/types/exercises';
import { CATEGORIES } from '@/types/exercises';

export type { Exercise, ExerciseCategory };
export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface UseExercisesOptions {
  category?: ExerciseCategory;
  difficulty?: ExerciseDifficulty;
  searchTerm?: string;
}

export const useExercises = (options?: UseExercisesOptions) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setExercises(EXERCISES_LIBRARY);
      setLoading(false);
    }, 300);
  }, []);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (options?.category) {
      filtered = filtered.filter(ex => ex.category === options.category);
    }

    if (options?.difficulty) {
      filtered = filtered.filter(ex => ex.difficulty === options.difficulty);
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

  const getRecommendedExercise = (difficulty?: ExerciseDifficulty): Exercise | undefined => {
    const filtered = difficulty
      ? exercises.filter(ex => ex.difficulty === difficulty)
      : exercises;
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const categories = Object.keys(CATEGORIES) as ExerciseCategory[];

  const getCategoryCount = (category: ExerciseCategory): number => {
    return exercises.filter(ex => ex.category === category).length;
  };

  const getCategoryInfo = (category: ExerciseCategory) => CATEGORIES[category];

  return {
    exercises: filteredExercises,
    allExercises: exercises,
    loading,
    getExerciseById,
    getExercisesByCategory,
    getRecommendedExercise,
    categories,
    getCategoryCount,
    getCategoryInfo,
    totalCount: exercises.length,
  };
};
