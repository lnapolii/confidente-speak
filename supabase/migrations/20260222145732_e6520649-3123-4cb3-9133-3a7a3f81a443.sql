
-- =====================================================================
-- TABELA: exercises_completed
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.exercises_completed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  exercise_id VARCHAR(100) NOT NULL,
  exercise_title VARCHAR(255),
  duration INTEGER,

  -- Etapas
  reading_completed BOOLEAN DEFAULT FALSE,
  listening_completed BOOLEAN DEFAULT FALSE,
  speaking_completed BOOLEAN DEFAULT FALSE,

  -- Scores
  pronunciation_score INTEGER,
  clarity_score INTEGER,
  fluency_score INTEGER,
  overall_score INTEGER,

  -- Progresso
  words_consulted INTEGER DEFAULT 0,
  listen_count INTEGER DEFAULT 0,
  recording_url TEXT,

  -- XP
  xp_earned INTEGER DEFAULT 0,

  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.exercises_completed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exercises" ON public.exercises_completed
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercises" ON public.exercises_completed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercises" ON public.exercises_completed
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercises" ON public.exercises_completed
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_exercises_user ON public.exercises_completed(user_id);
CREATE INDEX IF NOT EXISTS idx_exercises_user_created ON public.exercises_completed(user_id, created_at DESC);

-- =====================================================================
-- TABELA: vocabulary
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  word VARCHAR(255) NOT NULL,
  translation TEXT NOT NULL,
  phonetic VARCHAR(100),

  -- Contexto
  context_sentence TEXT,
  exercise_id VARCHAR(100),

  -- Aprendizado
  lookup_count INTEGER DEFAULT 1,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE,
  review_count INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,

  -- Metadados
  alternatives JSONB,
  examples JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, word)
);

ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vocabulary" ON public.vocabulary
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocabulary" ON public.vocabulary
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vocabulary" ON public.vocabulary
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocabulary" ON public.vocabulary
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_vocabulary_user ON public.vocabulary(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_review ON public.vocabulary(user_id, next_review_at);

CREATE TRIGGER update_vocabulary_updated_at
  BEFORE UPDATE ON public.vocabulary
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================================
-- TABELA: user_stats
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY,

  -- Streak
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_practice_date DATE,

  -- Totais
  total_xp INTEGER DEFAULT 0,
  total_exercises INTEGER DEFAULT 0,
  total_words_learned INTEGER DEFAULT 0,

  -- Níveis
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 500,

  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================================
-- TABELA: achievements
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  achievement_code VARCHAR(100) NOT NULL,
  achievement_name VARCHAR(255),
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, achievement_code)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON public.achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON public.achievements(user_id);

-- =====================================================================
-- TRIGGER: auto-criar user_stats ao registrar usuário
-- =====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_created_init_stats
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_stats();
