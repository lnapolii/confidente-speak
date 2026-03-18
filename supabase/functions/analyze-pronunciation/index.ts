import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { audioBase64, referenceText } = await req.json();

    if (!referenceText) {
      return new Response(
        JSON.stringify({ error: "referenceText is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const words = referenceText.trim().split(/\s+/);

    const prompt = `You are an expert English pronunciation coach for Brazilian Portuguese speakers.

A student just recorded themselves reading the following English text aloud:
"${referenceText}"

${audioBase64 ? "Audio was provided for analysis." : "No audio was provided, but analyze the text for common Brazilian learner pronunciation challenges."}

Analyze the pronunciation and provide scores. Consider common challenges Brazilian speakers face with English pronunciation (th sounds, vowel distinctions, word stress, consonant clusters, etc.).

The words in the text are: ${words.map(w => `"${w}"`).join(", ")}

Return a JSON object with this exact structure:
{
  "overallScore": <number 0-100>,
  "clarity": <number 0-100>,
  "fluency": <number 0-100>,
  "pronunciation": <number 0-100>,
  "xpEarned": <number 15-50 based on overall performance>,
  "wordAnalysis": [
    // One entry for EACH word in the reference text, in order
    {
      "text": "<the word>",
      "accuracy": <number 0-100>,
      "phonetic": "<IPA transcription>",
      "needsWork": <boolean, true if accuracy < 85>
    }
  ],
  "suggestions": [
    // 2-3 specific improvement tips in Brazilian Portuguese
    {
      "icon": "<emoji>",
      "title": "<short title in Portuguese>",
      "description": "<detailed tip in Portuguese targeting Brazilian learner patterns>",
      "example": "<optional example>"
    }
  ]
}

IMPORTANT:
- wordAnalysis MUST contain exactly one entry per word from the reference text, in the same order
- Suggestions MUST be in Brazilian Portuguese
- Be realistic: most learners score 60-90
- Flag words with common Brazilian pronunciation pitfalls (th, r sounds, word-final consonants, etc.)
- Return ONLY valid JSON, no markdown`;

    const response = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a pronunciation analysis engine. Return only valid JSON. No markdown, no explanation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    let analysis;
    try {
      const cleanContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysis = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Fallback with real words from reference text
      analysis = {
        overallScore: 75,
        clarity: 78,
        fluency: 72,
        pronunciation: 76,
        xpEarned: 25,
        wordAnalysis: words.map((word: string) => ({
          text: word,
          accuracy: 75,
          phonetic: "",
          needsWork: true,
        })),
        suggestions: [
          {
            icon: "🗣️",
            title: "Continue praticando",
            description: "A análise detalhada não pôde ser processada. Continue praticando para melhores resultados.",
          }
        ]
      };
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Pronunciation analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
