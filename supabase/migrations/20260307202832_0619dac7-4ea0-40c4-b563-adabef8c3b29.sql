
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS sector text,
  ADD COLUMN IF NOT EXISTS job_title text,
  ADD COLUMN IF NOT EXISTS hierarchy_level text,
  ADD COLUMN IF NOT EXISTS english_uses jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS preferred_accent text DEFAULT 'neutral',
  ADD COLUMN IF NOT EXISTS interface_language text DEFAULT 'pt';
