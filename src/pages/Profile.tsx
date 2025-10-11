import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  User, 
  BookOpen, 
  Trophy, 
  Settings, 
  Search, 
  Star, 
  Volume2,
  Download,
  Flame,
  Target,
  Clock,
  Award,
  TrendingUp,
  Heart,
  RotateCcw
} from "lucide-react";

interface ConsultedWord {
  id: string;
  english: string;
  translation: string;
  phonetic?: string;
  category: string;
  context: string;
  firstSeen: Date;
  lastSeen: Date;
  lookupCount: number;
  isFavorite: boolean;
  examples?: Array<{
    sentence: string;
    translation: string;
  }>;
  synonyms?: string[];
  usageTip?: string;
  consultationHistory: Array<{
    date: Date;
    exerciseTopic: string;
    exerciseDuration: number;
  }>;
}

// Mock data - in real app, this would come from your backend
const mockUserData = {
  name: "Marina Silva",
  email: "marina@empresa.com",
  avatar: "👩‍💼",
  level: "Intermediário",
  stats: {
    currentStreak: 12,
    totalXP: 1247,
    completedExercises: 28,
    totalTime: "3h 24m",
    achievements: 8
  }
};

const mockConsultedWords: ConsultedWord[] = [
  {
    id: "1",
    english: "quarterly",
    translation: "trimestral",
    phonetic: "ˈkwɔːr.tər.li",
    category: "Reuniões",
    context: "Today's quarterly review meeting",
    firstSeen: new Date('2024-01-15'),
    lastSeen: new Date('2024-01-20'),
    lookupCount: 3,
    isFavorite: true,
    examples: [
      { sentence: "We have quarterly meetings every three months.", translation: "Temos reuniões trimestrais a cada três meses." }
    ],
    synonyms: ["every three months", "tri-monthly"],
    usageTip: "Usado para descrever algo que acontece quatro vezes por ano",
    consultationHistory: [
      { date: new Date('2024-01-15'), exerciseTopic: "Team Meetings", exerciseDuration: 10 },
      { date: new Date('2024-01-18'), exerciseTopic: "Presentations", exerciseDuration: 5 },
      { date: new Date('2024-01-20'), exerciseTopic: "Team Meetings", exerciseDuration: 15 }
    ]
  },
  {
    id: "2",
    english: "exceeded",
    translation: "excedeu, superou",
    phonetic: "ɪkˈsiː.dɪd",
    category: "Resultados",
    context: "Our team has exceeded expectations",
    firstSeen: new Date('2024-01-16'),
    lastSeen: new Date('2024-01-16'),
    lookupCount: 1,
    isFavorite: false,
    examples: [
      { sentence: "Sales exceeded our targets by 23%.", translation: "As vendas superaram nossas metas em 23%." }
    ],
    synonyms: ["surpassed", "outperformed", "beat"],
    consultationHistory: [
      { date: new Date('2024-01-16'), exerciseTopic: "Performance Review", exerciseDuration: 10 }
    ]
  },
  {
    id: "3",
    english: "adoption rates",
    translation: "taxas de adoção",
    phonetic: "əˈdɑːp.ʃən reɪts",
    category: "Marketing",
    context: "slower adoption rates in international markets",
    firstSeen: new Date('2024-01-17'),
    lastSeen: new Date('2024-01-19'),
    lookupCount: 2,
    isFavorite: true,
    usageTip: "Refere-se à velocidade com que clientes começam a usar um produto ou serviço",
    consultationHistory: [
      { date: new Date('2024-01-17'), exerciseTopic: "Market Analysis", exerciseDuration: 15 },
      { date: new Date('2024-01-19'), exerciseTopic: "Strategy Meeting", exerciseDuration: 10 }
    ]
  }
];

// Vocabulary Card Component
const VocabularyCard = ({ word }: { word: ConsultedWord }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const playWordAudio = async (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const americanVoice = voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
    
    utterance.voice = americanVoice;
    utterance.rate = 0.8;
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="card-elevated hover-lift cursor-pointer transition-all">
      <CardContent className="p-6" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-foreground">{word.english}</h3>
              {word.isFavorite && <Heart className="w-5 h-5 text-warning fill-warning" />}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  playWordAudio(word.english);
                }}
                className="h-8"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            {word.phonetic && (
              <p className="text-muted-foreground italic mb-2">/{word.phonetic}/</p>
            )}
            <p className="text-lg text-primary font-medium">{word.translation}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {word.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <RotateCcw className="w-3 h-3" />
              <span>{word.lookupCount}x consultada</span>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="bg-muted p-3 rounded-lg mb-4">
          <p className="text-sm italic text-muted-foreground">
            "{word.context}"
          </p>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 border-t border-border pt-4 animate-fade-in">
            {/* Examples */}
            {word.examples && word.examples.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span>📝</span> Exemplos de Uso
                </h4>
                <div className="space-y-2">
                  {word.examples.map((example, idx) => (
                    <div key={idx} className="bg-background-muted p-3 rounded-lg">
                      <p className="text-foreground mb-1">{example.sentence}</p>
                      <p className="text-sm text-muted-foreground italic">{example.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synonyms */}
            {word.synonyms && word.synonyms.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span>🔄</span> Sinônimos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((syn, idx) => (
                    <span key={idx} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Usage Tip */}
            {word.usageTip && (
              <div className="bg-success-muted border-l-4 border-success p-3 rounded">
                <h4 className="font-semibold text-success-dark mb-1 flex items-center gap-2">
                  <span>💡</span> Dica de Uso
                </h4>
                <p className="text-sm text-foreground">{word.usageTip}</p>
              </div>
            )}

            {/* Consultation History */}
            <div>
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span>📊</span> Histórico de Consultas
              </h4>
              <div className="space-y-2">
                {word.consultationHistory.map((history, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm bg-background-muted p-2 rounded">
                    <span className="text-foreground">{history.exerciseTopic}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{history.exerciseDuration} min</span>
                      <span>•</span>
                      <span>{new Date(history.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expand/Collapse Indicator */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {isExpanded ? '▲ Clique para ocultar' : '▼ Clique para ver mais detalhes'}
        </div>
      </CardContent>
    </Card>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: User },
    { id: 'vocabulary', name: 'Meu Vocabulário', icon: BookOpen },
    { id: 'achievements', name: 'Conquistas', icon: Trophy },
    { id: 'settings', name: 'Configurações', icon: Settings }
  ];

  const filteredWords = useMemo(() => {
    let filtered = mockConsultedWords;

    // Aplicar busca
    if (searchTerm) {
      filtered = filtered.filter(word =>
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro
    switch(filter) {
      case 'recent':
        filtered = filtered.filter(w => 
          Date.now() - new Date(w.lastSeen).getTime() < 7 * 24 * 60 * 60 * 1000
        );
        break;
      case 'favorites':
        filtered = filtered.filter(w => w.isFavorite);
        break;
      case 'difficult':
        filtered = filtered.filter(w => w.lookupCount >= 3);
        break;
    }

    // Aplicar ordenação
    switch(sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.english.localeCompare(b.english));
        break;
      case 'frequency':
        filtered.sort((a, b) => b.lookupCount - a.lookupCount);
        break;
    }

    return filtered;
  }, [searchTerm, filter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </a>
            </Button>
            <h1 className="font-heading font-semibold text-foreground">Meu Perfil</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="bg-gradient-primary text-primary-foreground mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-4xl">
                {mockUserData.avatar}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-heading font-bold mb-2">{mockUserData.name}</h1>
                <p className="opacity-90 mb-4">{mockUserData.email}</p>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-3 text-center">
                    <Flame className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">{mockUserData.stats.currentStreak}</div>
                    <div className="text-xs opacity-80">Dias de Streak</div>
                  </div>
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-3 text-center">
                    <Star className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">{mockUserData.stats.totalXP}</div>
                    <div className="text-xs opacity-80">XP Total</div>
                  </div>
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-3 text-center">
                    <Target className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">{mockUserData.stats.completedExercises}</div>
                    <div className="text-xs opacity-80">Exercícios</div>
                  </div>
                  <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-3 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">{mockUserData.stats.totalTime}</div>
                    <div className="text-xs opacity-80">Tempo Total</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Card className="mb-8">
          <CardContent className="p-2">
            <div className="flex gap-2">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="flex-1"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Progresso do Nível
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Nível {mockUserData.level}</span>
                      <span>{mockUserData.stats.totalXP} / 1,500 XP</span>
                    </div>
                    <Progress value={(mockUserData.stats.totalXP / 1500) * 100} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você precisa de mais <span className="font-medium text-foreground">253 XP</span> para alcançar o nível Avançado!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Conquistas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="achievement-badge">
                    <Trophy className="w-6 h-6 text-success" />
                    <div>
                      <p className="font-medium text-sm">Primeira Semana</p>
                      <p className="text-xs text-muted-foreground">7 dias consecutivos</p>
                    </div>
                  </div>
                  <div className="achievement-badge locked">
                    <Flame className="w-6 h-6" />
                    <div>
                      <p className="font-medium text-sm">Maratonista</p>
                      <p className="text-xs text-muted-foreground">Complete um exercício de 15 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="space-y-6">
            {/* Vocabulary Library Header */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  📚 Minha Biblioteca de Vocabulário
                </h2>
                <p className="text-muted-foreground mb-6">
                  {mockConsultedWords.length} palavras/expressões consultadas
                </p>

                {/* Search and Filters */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar palavras ou expressões..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex gap-2">
                      <span className="text-sm font-semibold text-muted-foreground self-center">Filtrar:</span>
                      {[
                        { key: 'all', label: 'Todas' },
                        { key: 'recent', label: '📅 Recentes' },
                        { key: 'favorites', label: '⭐ Favoritas' },
                        { key: 'difficult', label: '🔴 Difíceis' }
                      ].map(f => (
                        <Button
                          key={f.key}
                          onClick={() => setFilter(f.key)}
                          variant={filter === f.key ? "default" : "outline"}
                          size="sm"
                        >
                          {f.label}
                        </Button>
                      ))}
                    </div>

                    <div className="flex gap-2 ml-auto">
                      <span className="text-sm font-semibold text-muted-foreground self-center">Ordenar:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1 rounded-md border border-border bg-background text-sm"
                      >
                        <option value="recent">Mais Recentes</option>
                        <option value="alphabetical">A-Z</option>
                        <option value="frequency">Mais Consultadas</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{mockConsultedWords.length}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-success">
                        {mockConsultedWords.filter(w => w.lookupCount === 1).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Aprendidas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-warning">
                        {mockConsultedWords.filter(w => w.lookupCount >= 3).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Revisão</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {mockConsultedWords.filter(w => w.isFavorite).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Favoritas</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Words List */}
            {filteredWords.length === 0 ? (
              <Card className="card-elevated">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-xl text-muted-foreground">Nenhuma palavra encontrada</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredWords.map((word) => (
                  <VocabularyCard key={word.id} word={word} />
                ))}
              </div>
            )}

            {/* Export Button */}
            <div className="text-center">
              <Button className="btn-success">
                <Download className="w-4 h-4 mr-2" />
                Exportar Vocabulário (CSV)
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <Card className="card-elevated">
            <CardContent className="p-6">
              <h2 className="text-2xl font-heading font-bold mb-6">🏆 Suas Conquistas</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="achievement-badge">
                  <Trophy className="w-8 h-8 text-success" />
                  <div>
                    <p className="font-bold">Primeira Semana</p>
                    <p className="text-sm text-muted-foreground">Complete 7 dias consecutivos</p>
                  </div>
                </div>
                <div className="achievement-badge locked">
                  <Flame className="w-8 h-8" />
                  <div>
                    <p className="font-bold">Maratonista</p>
                    <p className="text-sm text-muted-foreground">Complete um exercício de 15 minutos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="card-elevated">
            <CardContent className="p-6">
              <h2 className="text-2xl font-heading font-bold mb-6">⚙️ Configurações</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <Input defaultValue={mockUserData.name} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue={mockUserData.email} />
                    </div>
                  </div>
                </div>
                <Button className="btn-primary">Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Profile;