import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SavedItem {
  id: string;
  item_id: string;
  item_type: 'lesson' | 'exercise' | 'vocabulary';
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

export const useSavedItems = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSavedItems = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('saved_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSavedItems(data as SavedItem[]);
      setSavedItemIds(new Set(data.map((item: any) => `${item.item_type}:${item.item_id}`)));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSavedItems();
  }, [fetchSavedItems]);

  const toggleSave = async (item: {
    item_id: string;
    item_type: 'lesson' | 'exercise' | 'vocabulary';
    title: string;
    description?: string;
    category?: string;
    level?: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Faça login para salvar itens", variant: "destructive" });
      return;
    }

    const key = `${item.item_type}:${item.item_id}`;
    const isSaved = savedItemIds.has(key);

    if (isSaved) {
      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', item.item_id)
        .eq('item_type', item.item_type);

      if (!error) {
        setSavedItemIds(prev => { const next = new Set(prev); next.delete(key); return next; });
        setSavedItems(prev => prev.filter(s => !(s.item_id === item.item_id && s.item_type === item.item_type)));
        toast({ title: "Removido da biblioteca" });
      }
    } else {
      const { data, error } = await supabase
        .from('saved_items')
        .insert({
          user_id: user.id,
          item_id: item.item_id,
          item_type: item.item_type,
          title: item.title,
          description: item.description || null,
          category: item.category || null,
          level: item.level || null,
        })
        .select()
        .single();

      if (!error && data) {
        setSavedItemIds(prev => new Set([...prev, key]));
        setSavedItems(prev => [data as SavedItem, ...prev]);
        toast({ title: "Salvo na biblioteca! 📚" });
      }
    }
  };

  const isSaved = (itemId: string, itemType: string) => savedItemIds.has(`${itemType}:${itemId}`);

  return { savedItems, loading, toggleSave, isSaved, savedCount: savedItems.length, refetch: fetchSavedItems };
};
