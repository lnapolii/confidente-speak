import { useState } from 'react';
import { useExercises, ExerciseCategory, ExerciseDifficulty } from '@/hooks/useExercises';
import { CATEGORIES } from '@/types/exercises';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Star } from 'lucide-react';

const ExerciseLibrary = () => {
  const [category, setCategory] = useState<ExerciseCategory | undefined>();
  const [difficulty, setDifficulty] = useState<ExerciseDifficulty | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const { exercises, loading, categories, getCategoryCount, getCategoryInfo, totalCount } = useExercises({
    category,
    difficulty,
    searchTerm,
  });

  const getDifficultyBadge = (d: ExerciseDifficulty) => {
    switch (d) {
      case 'beginner': return { label: 'Básico', className: 'bg-green-100 text-green-800' };
      case 'intermediate': return { label: 'Intermediário', className: 'bg-yellow-100 text-yellow-800' };
      case 'advanced': return { label: 'Avançado', className: 'bg-red-100 text-red-800' };
    }
  };

  const difficultyOptions: { key: ExerciseDifficulty; label: string }[] = [
    { key: 'beginner', label: 'Básico' },
    { key: 'intermediate', label: 'Intermediário' },
    { key: 'advanced', label: 'Avançado' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">📚 Biblioteca de Exercícios</h1>
        <p className="text-lg text-muted-foreground">{totalCount} exercícios prontos para você praticar</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input type="text" placeholder="Buscar exercícios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 py-6 text-lg" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Categorias:</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant={!category ? 'default' : 'outline'} onClick={() => setCategory(undefined)} size="sm">
              Todas ({totalCount})
            </Button>
            {categories.map(cat => {
              const info = getCategoryInfo(cat);
              const count = getCategoryCount(cat);
              if (count === 0) return null;
              return (
                <Button key={cat} variant={category === cat ? 'default' : 'outline'} onClick={() => setCategory(cat)} size="sm">
                  {info.icon} {info.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Nível:</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant={!difficulty ? 'default' : 'outline'} onClick={() => setDifficulty(undefined)} size="sm">Todos</Button>
            {difficultyOptions.map(opt => (
              <Button key={opt.key} variant={difficulty === opt.key ? 'default' : 'outline'} onClick={() => setDifficulty(opt.key)} size="sm">
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader><div className="h-6 bg-muted rounded w-3/4 mb-2" /><div className="h-4 bg-muted rounded w-full" /></CardHeader>
              <CardContent><div className="h-20 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-muted-foreground">Nenhum exercício encontrado</p>
          <Button onClick={() => { setCategory(undefined); setDifficulty(undefined); setSearchTerm(''); }} className="mt-4">Limpar filtros</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => {
            const badge = getDifficultyBadge(exercise.difficulty);
            const catInfo = CATEGORIES[exercise.category];
            return (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={badge.className}>{badge.label}</Badge>
                    <Badge variant="outline">{catInfo.icon} {catInfo.name}</Badge>
                  </div>
                  <CardTitle className="text-xl">{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {exercise.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {([5, 10, 15] as const).map(d => (
                      <Badge key={d} variant="outline" className="text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {d} min {d === 5 && '⚡'}{d === 10 && '🎯'}{d === 15 && '🚀'}
                      </Badge>
                    ))}
                  </div>
                  {exercise.durations[15]?.culturalTips && (
                    <div className="flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">Versão Avançada com Dicas Culturais</span>
                    </div>
                  )}
                  <div className="bg-accent rounded-lg p-3">
                    <p className="text-xs font-semibold text-accent-foreground mb-1">📝 Foco:</p>
                    <p className="text-xs text-muted-foreground">{exercise.durations[5].focusPoints.join(' • ')}</p>
                  </div>
                  <Button className="w-full" asChild>
                    <a href={`/exercise?id=${exercise.id}`}>Começar Exercício</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
