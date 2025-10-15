// Translation Service with AI Integration
// Supports: OpenAI, Google Translate, and LibreTranslate (fallback)

export interface TranslationResult {
  primary: string;
  alternatives: string[];
  phonetic?: string;
  example?: string;
  tip?: string;
}

// Dicionário offline (fallback) - palavras corporativas mais comuns
const offlineDictionary: Record<string, TranslationResult> = {
  meeting: {
    primary: "reunião",
    alternatives: ["encontro", "assembleia"],
    phonetic: "ˈmiːtɪŋ",
    example: "We have a meeting at 3 PM",
    tip: "Pronuncie o 'ee' longo: miiiiting"
  },
  deadline: {
    primary: "prazo",
    alternatives: ["prazo final", "data limite"],
    phonetic: "ˈdedlaɪn",
    example: "The deadline is next Friday",
    tip: "Dead (morto) + line (linha) = linha morta = prazo!"
  },
  productive: {
    primary: "produtivo",
    alternatives: ["eficiente", "eficaz"],
    phonetic: "prəˈdʌktɪv",
    example: "We had a very productive meeting",
    tip: "Relacionado a 'product' (produto)"
  },
  feedback: {
    primary: "feedback",
    alternatives: ["retorno", "avaliação", "opinião"],
    phonetic: "ˈfiːdbæk",
    example: "I'd love to get your feedback",
    tip: "Feed (alimentar) + back (volta) = retorno"
  },
  blocker: {
    primary: "bloqueio",
    alternatives: ["impedimento", "obstáculo"],
    phonetic: "ˈblɒkər",
    example: "Do you have any blockers?",
    tip: "Comum em metodologias ágeis"
  },
  stakeholder: {
    primary: "stakeholder",
    alternatives: ["parte interessada", "envolvido"],
    phonetic: "ˈsteɪkhoʊldər",
    example: "We need stakeholder approval",
    tip: "Stake (aposta/interesse) + holder (detentor)"
  },
  prototype: {
    primary: "protótipo",
    alternatives: ["modelo", "esboço"],
    phonetic: "ˈproʊtətaɪp",
    example: "I'll have a prototype ready by Friday",
    tip: "Proto (primeiro) + type (tipo)"
  },
  wrapped: {
    primary: "finalizei",
    alternatives: ["concluí", "terminei", "completei"],
    phonetic: "ræpt",
    example: "I wrapped up the documentation",
    tip: "Comum no corporativo: 'wrap up' = finalizar"
  },
  circulated: {
    primary: "circulei",
    alternatives: ["distribuí", "compartilhei"],
    phonetic: "ˈsɜːrkjʊleɪtɪd",
    example: "I circulated the document to everyone",
    tip: "Relacionado a 'circle' (circular)"
  },
  incorporate: {
    primary: "incorporar",
    alternatives: ["incluir", "integrar", "adicionar"],
    phonetic: "ɪnˈkɔːrpəreɪt",
    example: "We'll incorporate your feedback",
    tip: "Corporar = corpo, incorporar = colocar dentro"
  },
  guidance: {
    primary: "orientação",
    alternatives: ["direção", "ajuda", "guia"],
    phonetic: "ˈɡaɪdns",
    example: "I might need some guidance",
    tip: "Guide (guiar) + ance (substantivo)"
  },
  anticipate: {
    primary: "antecipar",
    alternatives: ["prever", "esperar"],
    phonetic: "ænˈtɪsɪpeɪt",
    example: "I anticipate I might need help",
    tip: "Anti (antes) + cipate (pegar) = pegar antes"
  },
  swamped: {
    primary: "sobrecarregado",
    alternatives: ["atolado", "ocupado demais"],
    phonetic: "swɒmpt",
    example: "I know they're absolutely swamped",
    tip: "Swamp = pântano, estar 'swamped' = afundado em trabalho"
  },
  knocked: {
    primary: "finalizamos",
    alternatives: ["concluímos", "resolvemos"],
    phonetic: "nɒkt",
    example: "We knocked out that module",
    tip: "'Knock out' = nocautear/finalizar rapidamente"
  },
  edge: {
    primary: "casos extremos",
    alternatives: ["situações limite", "bordas"],
    phonetic: "edʒ",
    example: "We need to handle edge cases",
    tip: "Edge = borda, 'edge cases' = casos nas bordas/extremos"
  },
  pivot: {
    primary: "mudar de direção",
    alternatives: ["ajustar estratégia", "girar"],
    phonetic: "ˈpɪvət",
    example: "We might need to pivot our approach",
    tip: "Pivot = pivô, ponto de rotação"
  },
  update: {
    primary: "atualização",
    alternatives: ["informar", "reportar"],
    phonetic: "ʌpˈdeɪt",
    example: "Here's my update for today",
    tip: "Up (para cima) + date (data) = atualizar"
  },
  bottleneck: {
    primary: "gargalo",
    alternatives: ["bloqueio", "impedimento"],
    phonetic: "ˈbɒtlnek",
    example: "This was becoming a bottleneck",
    tip: "Bottle (garrafa) + neck (pescoço) = gargalo"
  },
  backlog: {
    primary: "backlog",
    alternatives: ["acúmulo", "fila de tarefas"],
    phonetic: "ˈbæklɒɡ",
    example: "It's been sitting in our backlog",
    tip: "Back (atrás) + log (registro) = acúmulo de tarefas"
  },
  bandwidth: {
    primary: "capacidade",
    alternatives: ["tempo disponível", "recursos"],
    phonetic: "ˈbændwɪdθ",
    example: "Do you have bandwidth for this?",
    tip: "Banda larga metafórica = capacidade de fazer coisas"
  },
  sync: {
    primary: "sincronizar",
    alternatives: ["alinhar", "reunir"],
    phonetic: "sɪŋk",
    example: "Let's sync up on this tomorrow",
    tip: "Sync = sincronizar, alinhar informações"
  },
  scope: {
    primary: "escopo",
    alternatives: ["alcance", "amplitude"],
    phonetic: "skoʊp",
    example: "This is out of scope",
    tip: "Scope = telescópio/alcance, definir limites"
  },
  milestone: {
    primary: "marco",
    alternatives: ["etapa importante", "objetivo"],
    phonetic: "ˈmaɪlstoʊn",
    example: "We hit an important milestone",
    tip: "Mile (milha) + stone (pedra) = marco de distância"
  },
  deliverable: {
    primary: "entregável",
    alternatives: ["resultado", "produto"],
    phonetic: "dɪˈlɪvərəbl",
    example: "What are the deliverables?",
    tip: "Deliver (entregar) + able (possível) = pode ser entregue"
  },
  actionable: {
    primary: "acionável",
    alternatives: ["prático", "aplicável"],
    phonetic: "ˈækʃənəbl",
    example: "We need actionable insights",
    tip: "Action (ação) + able = pode ser colocado em ação"
  },
  escalate: {
    primary: "escalar",
    alternatives: ["elevar", "reportar superiormente"],
    phonetic: "ˈeskəleɪt",
    example: "We need to escalate this issue",
    tip: "Escalar = subir na hierarquia/prioridade"
  },
  transparent: {
    primary: "transparente",
    alternatives: ["honesto", "claro", "aberto"],
    phonetic: "trænsˈpærənt",
    example: "I'm being totally transparent here",
    tip: "Ser transparente = ser honesto e aberto"
  },
  leverage: {
    primary: "aproveitar",
    alternatives: ["usar", "alavancar"],
    phonetic: "ˈlevərɪdʒ",
    example: "We should leverage our resources",
    tip: "Lever (alavanca) + age = usar alavancagem"
  },
  touch: {
    primary: "tocar",
    alternatives: ["contatar", "falar sobre"],
    phonetic: "tʌtʃ",
    example: "Let's touch base on this",
    tip: "'Touch base' = fazer contato, alinhar"
  }
};

/**
 * Translate word using AI (OpenAI, Google Translate) or fallback to offline dictionary
 */
export const translateWord = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  const cleanWord = word.toLowerCase().trim();

  // Try AI translation first (if API keys are configured)
  try {
    // Check if OpenAI is configured
    if (import.meta.env.VITE_OPENAI_API_KEY) {
      return await translateWithOpenAI(cleanWord, context);
    }

    // Check if Google Translate is configured
    if (import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY) {
      return await translateWithGoogle(cleanWord, context);
    }

    // If no API keys, use LibreTranslate (free, no key needed)
    return await translateWithLibre(cleanWord, context);

  } catch (error) {
    console.warn('AI translation failed, using offline dictionary:', error);
    // Fallback to offline dictionary
    return getFallbackTranslation(cleanWord);
  }
};

/**
 * OpenAI GPT Translation (best quality, requires API key)
 */
const translateWithOpenAI = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  const prompt = `You are a Portuguese-English translator specialized in corporate/business English.

Word to translate: "${word}"
${context ? `Context: "${context}"` : ''}

Provide a JSON response with:
1. "primary": The most common Portuguese translation
2. "alternatives": Array of 2-3 alternative translations
3. "phonetic": IPA phonetic transcription
4. "example": A corporate/business example sentence in English
5. "tip": A quick learning tip for Brazilian learners

Return ONLY valid JSON, no other text.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3
    })
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};

/**
 * Google Translate API (good quality, cheaper)
 */
const translateWithGoogle = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: word,
        source: 'en',
        target: 'pt',
        format: 'text'
      })
    }
  );

  if (!response.ok) {
    throw new Error('Google Translate API request failed');
  }

  const data = await response.json();
  return {
    primary: data.data.translations[0].translatedText,
    alternatives: [],
    phonetic: '',
    example: '',
    tip: ''
  };
};

/**
 * LibreTranslate (free, open source, no API key needed)
 */
const translateWithLibre = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  const response = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: word,
      source: 'en',
      target: 'pt',
      format: 'text'
    })
  });

  if (!response.ok) {
    throw new Error('LibreTranslate request failed');
  }

  const data = await response.json();
  return {
    primary: data.translatedText,
    alternatives: [],
    phonetic: '',
    example: '',
    tip: ''
  };
};

/**
 * Fallback to offline dictionary
 */
const getFallbackTranslation = (word: string): TranslationResult => {
  const cleanWord = word.toLowerCase().trim();
  
  if (offlineDictionary[cleanWord]) {
    return offlineDictionary[cleanWord];
  }

  // If not in dictionary, return basic translation
  return {
    primary: cleanWord,
    alternatives: [],
    phonetic: '',
    example: '',
    tip: 'Tradução não disponível offline. Adicione uma API key para tradução com IA.'
  };
};

/**
 * Get cached translation from localStorage
 */
export const getCachedTranslation = (word: string): TranslationResult | null => {
  try {
    const cached = localStorage.getItem(`translation_${word.toLowerCase()}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn('Failed to get cached translation:', error);
  }
  return null;
};

/**
 * Cache translation in localStorage
 */
export const cacheTranslation = (word: string, translation: TranslationResult): void => {
  try {
    localStorage.setItem(
      `translation_${word.toLowerCase()}`,
      JSON.stringify(translation)
    );
  } catch (error) {
    console.warn('Failed to cache translation:', error);
  }
};

/**
 * Translate word with caching
 */
export const translateWordWithCache = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  // Check cache first
  const cached = getCachedTranslation(word);
  if (cached) {
    return cached;
  }

  // Translate and cache
  const translation = await translateWord(word, context);
  cacheTranslation(word, translation);
  
  return translation;
};
