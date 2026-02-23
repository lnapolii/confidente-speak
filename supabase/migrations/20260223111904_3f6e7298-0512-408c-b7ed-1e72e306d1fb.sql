
-- Function to increment lookup_count for existing vocabulary words
CREATE OR REPLACE FUNCTION public.increment_lookup_count(p_user_id UUID, p_word VARCHAR)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE vocabulary
  SET lookup_count = lookup_count + 1,
      last_reviewed_at = now(),
      updated_at = now()
  WHERE user_id = p_user_id AND word = p_word;
END;
$$;
