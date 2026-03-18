export interface ExerciseDuration {
  text: string;
  wordCount: number;
  estimatedTime: number;
  keywords: string[];
  focusPoints: string[];
  culturalTips?: string[];
  advancedVocabulary?: string[];
}

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  tags: string[];
  durations: {
    5: ExerciseDuration;
    10: ExerciseDuration;
    15: ExerciseDuration;
  };
}

export type ExerciseCategory =
  | 'meetings'
  | 'presentations'
  | 'daily-work'
  | 'negotiations'
  | 'networking'
  | 'daily-life'
  | 'travel'
  | 'social'
  | 'interviews'
  | 'conflict-resolution';

export interface CategoryInfo {
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Record<ExerciseCategory, CategoryInfo> = {
  meetings: {
    name: 'Reuniões',
    icon: '👥',
    description: 'Situações de reuniões corporativas',
  },
  presentations: {
    name: 'Apresentações',
    icon: '📊',
    description: 'Apresentações e pitches profissionais',
  },
  'daily-work': {
    name: 'Dia a Dia',
    icon: '💼',
    description: 'Comunicação diária no trabalho',
  },
  negotiations: {
    name: 'Negociações',
    icon: '🤝',
    description: 'Negociações e acordos',
  },
  networking: {
    name: 'Networking',
    icon: '🌐',
    description: 'Conexões profissionais',
  },
  'daily-life': {
    name: 'Vida Diária',
    icon: '🏠',
    description: 'Situações do cotidiano',
  },
  travel: {
    name: 'Viagens',
    icon: '✈️',
    description: 'Situações em viagens',
  },
  social: {
    name: 'Social',
    icon: '🎉',
    description: 'Eventos sociais e casual',
  },
};
