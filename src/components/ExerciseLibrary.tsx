import { useState } from 'react';
import { useExercises, ExerciseCategory, ExerciseLevel } from '@/hooks/useExercises';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Star } from 'lucide-react';

const ExerciseLibrary = () => {
  const [category, setCategory] = useState<ExerciseCategory | undefined>();
  const [level, setLevel] = useState<ExerciseLevel | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const { exercises, loading, categories, getCategoryCount, totalCount } = useExercises({
    category,
    level,
    searchTerm
  });

  const getLevelBadgeColor = (exerciseLevel: ExerciseLevel) => {
    switch (exerciseLevel) {
      case 'básico': return 'bg-green-100 text-green-800';
      case 'intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'avançado': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          📚 Biblioteca de Exercícios
        </h1>
        <p className="text-lg text-gray-600">
          {totalCount} exercícios prontos para você praticar
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar exercícios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 text-lg"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categorias:</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!category ? 'default' : 'outline'}
              onClick={() => setCategory(undefined)}
              size="sm"
            >
              Todas ({totalCount})
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                onClick={() => setCategory(cat)}
                size="sm"
              >
                {cat} ({getCategoryCount(cat)})
              </Button>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Nível:</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!level ? 'default' : 'outline'}
              onClick={() => setLevel(undefined)}
              size="sm"
            >
              Todos
            </Button>
            {(['básico', 'intermediário', 'avançado'] as ExerciseLevel[]).map(lvl => (
              <Button
                key={lvl}
                variant={level === lvl ? 'default' : 'outline'}
                onClick={() => setLevel(lvl)}
                size="sm"
                className="capitalize"
              >
                {lvl}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600">
            Nenhum exercício encontrado
          </p>
          <Button
            onClick={() => {
              setCategory(undefined);
              setLevel(undefined);
              setSearchTerm('');
            }}
            className="mt-4"
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <Card 
              key={exercise.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getLevelBadgeColor(exercise.level)}>
                    {exercise.level}
                  </Badge>
                  <Badge variant="outline">
                    {exercise.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{exercise.title}</CardTitle>
                <CardDescription>{exercise.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exercise.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Durations */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>5min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>10min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>15min</span>
                  </div>
                </div>

                {/* Focus Points */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    📝 Foco:
                  </p>
                  <p className="text-xs text-blue-800">
                    {exercise.duration[5].focusPoints.join(' • ')}
                  </p>
                </div>

                <Button className="w-full">
                  Começar Exercício
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
