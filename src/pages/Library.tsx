import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSavedItems } from '@/hooks/useSavedItems';
import BookmarkButton from '@/components/BookmarkButton';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Mic,
  Target,
  Library as LibraryIcon,
  Bookmark,
} from 'lucide-react';

const typeIcons: Record<string, typeof BookOpen> = {
  lesson: BookOpen,
  exercise: Target,
  vocabulary: Mic,
};

const typeLabels: Record<string, string> = {
  lesson: 'Lição',
  exercise: 'Exercício',
  vocabulary: 'Vocabulário',
};

const Library = () => {
  const { savedItems, loading, toggleSave, savedCount } = useSavedItems();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'lesson' | 'exercise' | 'vocabulary'>('all');

  const filtered = savedItems.filter(item => {
    const matchesSearch = !search || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.description?.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filter === 'all' || item.item_type === filter;
    return matchesSearch && matchesType;
  });

  const filters = [
    { id: 'all' as const, label: 'Todos', count: savedItems.length },
    { id: 'lesson' as const, label: 'Lições', count: savedItems.filter(i => i.item_type === 'lesson').length },
    { id: 'exercise' as const, label: 'Exercícios', count: savedItems.filter(i => i.item_type === 'exercise').length },
    { id: 'vocabulary' as const, label: 'Vocabulário', count: savedItems.filter(i => i.item_type === 'vocabulary').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </a>
            </Button>
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-primary" />
              <h1 className="font-heading font-semibold text-foreground">Minha Biblioteca</h1>
            </div>
            {savedCount > 0 && (
              <span className="ml-auto text-sm text-muted-foreground">{savedCount} itens salvos</span>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar itens salvos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <Button
                key={f.id}
                variant={filter === f.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.id)}
              >
                {f.label} ({f.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
              {savedItems.length === 0
                ? 'Sua biblioteca está vazia'
                : 'Nenhum resultado encontrado'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {savedItems.length === 0
                ? 'Comece salvando suas lições e exercícios favoritos para criar sua biblioteca pessoal.'
                : 'Tente buscar com outros termos ou limpar os filtros.'}
            </p>
            {savedItems.length === 0 && (
              <Button className="btn-hero" asChild>
                <a href="/exercise">Explorar Exercícios</a>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(item => {
              const Icon = typeIcons[item.item_type] || BookOpen;
              return (
                <Card key={item.id} className="card-elevated">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
                            {typeLabels[item.item_type]}
                          </span>
                          {item.category && (
                            <span className="text-xs text-muted-foreground">{item.category}</span>
                          )}
                          {item.level && (
                            <span className="text-xs text-muted-foreground">• {item.level}</span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">{item.description}</p>
                        )}
                      </div>
                      <BookmarkButton
                        isSaved={true}
                        onToggle={() => toggleSave({
                          item_id: item.item_id,
                          item_type: item.item_type,
                          title: item.title,
                          description: item.description || undefined,
                          category: item.category || undefined,
                          level: item.level || undefined,
                        })}
                        size="sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
