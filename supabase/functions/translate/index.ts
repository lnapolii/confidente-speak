import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { word, context } = await req.json();

    if (!word) {
      return new Response(
        JSON.stringify({ error: "Word is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const prompt = `You are a Portuguese-English translator specialized in corporate/business English for Brazilian professionals.

Word to translate: "${word}"
${context ? `Context: "${context.substring(0, 500)}"` : ""}

Provide a JSON response with:
1. "primary": The most common Portuguese translation for this word in a corporate context
2. "alternatives": Array of 2-3 alternative translations (can be empty if none)
3. "phonetic": IPA phonetic transcription for English pronunciation
4. "example": A corporate/business example sentence in English using this word
5. "tip": A quick memorable learning tip for Brazilian learners (use etymology, mnemonics, or common mistakes)

Return ONLY valid JSON, no markdown, no explanation.`;

    const response = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "You are a professional EN-PT translator for corporate vocabulary. Always respond with valid JSON only, no markdown."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response (handle potential markdown wrapping)
    let translation;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      translation = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Return a basic fallback
      translation = {
        primary: word,
        alternatives: [],
        phonetic: "",
        example: "",
        tip: "Tradução automática não disponível"
      };
    }

    return new Response(
      JSON.stringify(translation),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Translation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        primary: "",
        alternatives: [],
        phonetic: "",
        example: "",
        tip: ""
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});