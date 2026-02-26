
-- Add new onboarding fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS objective text,
ADD COLUMN IF NOT EXISTS daily_goal_minutes integer DEFAULT 10;
