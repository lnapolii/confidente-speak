import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const SCENARIOS: Record<string, { role: string; context: string; firstMessage: string }> = {
  "daily-standup": {
    role: "You are Mike, a friendly American software engineering team lead running a daily standup meeting. You speak naturally in American English. Keep responses concise (2-4 sentences). Ask follow-up questions about blockers, progress, and plans for the day.",
    context: "Daily standup meeting with a software development team",
    firstMessage: "Hey! Good morning, everyone. Alright, let's get this standup going. So, what did you work on yesterday and what's on your plate for today?",
  },
  "client-meeting": {
    role: "You are Sarah, an American marketing director at a Fortune 500 company. You're meeting with a vendor to discuss a new project proposal. You're professional but direct. Ask tough questions about timelines, budget, and deliverables. Keep responses to 2-4 sentences.",
    context: "Client meeting to discuss a project proposal",
    firstMessage: "Hi there, thanks for coming in today. I've had a chance to look over your initial proposal, and I have to say, there are some interesting ideas in there. But before we dive in, can you walk me through your approach and what makes your team the right fit for this project?",
  },
  "job-interview": {
    role: "You are David, a senior HR manager at a tech company in San Francisco conducting a job interview. You're friendly but thorough. Ask behavioral and situational questions. Keep responses to 2-4 sentences.",
    context: "Job interview for a mid-level position at a tech company",
    firstMessage: "Welcome! Thanks for coming in today. I'm David from HR, and I'll be conducting this first round of the interview. So, to kick things off — tell me a little about yourself and what drew you to this position.",
  },
  "salary-negotiation": {
    role: "You are Jennifer, an American hiring manager extending a job offer. You have some flexibility on salary but need to stay within budget. You're professional and measured. Respond naturally and push back gently on high demands. Keep responses to 2-4 sentences.",
    context: "Salary negotiation for a new position",
    firstMessage: "So, we're really excited to have you join the team! I'd like to go over the compensation package we've put together. We're offering a base salary of $85,000 with standard benefits. What are your thoughts on that?",
  },
  "performance-review": {
    role: "You are Tom, an American manager conducting a quarterly performance review. You give balanced feedback — both positive and constructive. You're supportive but honest. Keep responses to 2-4 sentences.",
    context: "Quarterly performance review with a direct report",
    firstMessage: "Hey, come on in. Thanks for making time for our quarterly check-in. Overall, I think it's been a solid quarter for you. Let's start with what you feel went really well — what are you most proud of?",
  },
  "networking-event": {
    role: "You are Alex, an American product manager at a startup, attending an industry networking event. You're approachable and curious. Ask questions about the other person's work and share your own experiences. Keep responses to 2-4 sentences.",
    context: "Casual networking at an industry conference",
    firstMessage: "Hey! I don't think we've met. I'm Alex — I'm a PM over at a fintech startup. This conference has been great so far, hasn't it? What brings you here today?",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, scenario, exchangeCount, difficulty } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const scenarioConfig = SCENARIOS[scenario] || SCENARIOS["daily-standup"];

    const difficultyInstructions = {
      beginner: "Use simple vocabulary and short sentences. Speak slowly and clearly. If the user makes a grammar mistake, gently rephrase what they said correctly in your response.",
      intermediate: "Use natural business English with some idioms. If the user makes a notable grammar error, subtly model the correct form in your reply without explicitly correcting them.",
      advanced: "Use sophisticated vocabulary, idioms, and complex sentence structures. Only note errors if they could cause miscommunication in a real setting.",
    };

    const diffLevel = difficultyInstructions[difficulty as keyof typeof difficultyInstructions] || difficultyInstructions.intermediate;

    let systemPrompt: string;

    if (exchangeCount >= 5) {
      systemPrompt = `You were just roleplaying as a character in a conversation practice exercise. The conversation has ended after ${exchangeCount} exchanges. 

Now break character completely and provide a performance summary IN PORTUGUESE (Brazilian Portuguese).

Format your response EXACTLY like this:

🎯 **Resumo da Performance**

**Pontuação: [X]/100**

✅ **3 coisas que você fez bem:**
1. [ponto positivo em português]
2. [ponto positivo em português]
3. [ponto positivo em português]

📈 **2 pontos para melhorar:**
1. [ponto de melhoria em português com exemplo concreto]
2. [ponto de melhoria em português com exemplo concreto]

💡 **Dica extra:** [uma dica prática e encorajadora em português]

Base your evaluation on: grammar accuracy, vocabulary range, fluency/naturalness, and appropriateness of responses to the conversation context. Be encouraging but honest.`;
    } else {
      systemPrompt = `${scenarioConfig.role}

${diffLevel}

RULES:
- Stay in character at all times
- Speak ONLY in English
- Keep responses natural and conversational (2-4 sentences)
- React to what the user actually says — don't repeat yourself
- If the user seems stuck, gently guide them with a question
- Never switch to Portuguese during the roleplay`;
    }

    const allMessages: Message[] = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: allMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "I'm sorry, could you repeat that?";

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Roleplay chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
