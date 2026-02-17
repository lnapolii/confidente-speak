
-- Create saved_items table for My Library feature
CREATE TABLE public.saved_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('lesson', 'exercise', 'vocabulary')),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  level TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Unique constraint to prevent duplicate saves
ALTER TABLE public.saved_items ADD CONSTRAINT unique_user_item UNIQUE (user_id, item_id, item_type);

-- Enable RLS
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own saved items"
ON public.saved_items FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can save items"
ON public.saved_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved items"
ON public.saved_items FOR DELETE
USING (auth.uid() = user_id);

-- Index for fast lookups
CREATE INDEX idx_saved_items_user_id ON public.saved_items(user_id);
CREATE INDEX idx_saved_items_type ON public.saved_items(user_id, item_type);
