// Translation Service with Lovable AI Integration
import { supabase } from "@/integrations/supabase/client";

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
  leverage: {
    primary: "aproveitar",
    alternatives: ["usar", "alavancar"],
    phonetic: "ˈlevərɪdʒ",
    example: "We should leverage our resources",
    tip: "Lever (alavanca) + age = usar alavancagem"
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
  touch: {
    primary: "tocar",
    alternatives: ["contatar", "falar sobre"],
    phonetic: "tʌtʃ",
    example: "Let's touch base on this",
    tip: "'Touch base' = fazer contato, alinhar"
  }
};

/**
 * Fallback to offline dictionary
 */
const getFallbackTranslation = (word: string): TranslationResult => {
  const cleanWord = word.toLowerCase().trim();
  
  if (offlineDictionary[cleanWord]) {
    return offlineDictionary[cleanWord];
  }

  return {
    primary: cleanWord,
    alternatives: [],
    phonetic: "",
    example: "",
    tip: "Palavra não encontrada no dicionário offline."
  };
};

/**
 * Translate word using Lovable AI or fallback to offline dictionary
 */
export const translateWord = async (
  word: string,
  context?: string
): Promise<TranslationResult> => {
  const cleanWord = word.toLowerCase().trim();

  // Check offline dictionary first for common words (faster)
  if (offlineDictionary[cleanWord]) {
    return offlineDictionary[cleanWord];
  }

  // Try AI translation via Edge Function
  try {
    const { data, error } = await supabase.functions.invoke("translate", {
      body: { word: cleanWord, context }
    });

    if (error) {
      console.warn("AI translation failed:", error);
      return getFallbackTranslation(cleanWord);
    }

    if (data.error) {
      console.warn("Translation error:", data.error);
      return getFallbackTranslation(cleanWord);
    }

    return {
      primary: data.primary || cleanWord,
      alternatives: data.alternatives || [],
      phonetic: data.phonetic || "",
      example: data.example || "",
      tip: data.tip || ""
    };

  } catch (error) {
    console.warn("AI translation failed, using offline dictionary:", error);
    return getFallbackTranslation(cleanWord);
  }
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
    console.warn("Failed to get cached translation:", error);
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
    console.warn("Failed to cache translation:", error);
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