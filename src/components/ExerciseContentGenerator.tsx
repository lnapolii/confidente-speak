import { useMemo } from "react";

export interface ExerciseContent {
  text: string;
  wordCount: number;
  complexity: 'basic' | 'intermediate' | 'advanced';
  focusPoints: string[];
  additionalSections?: Array<{
    title: string;
    content: string;
  }>;
  culturalTips?: string[];
}

const exerciseDatabase = {
  'reunioes': {
    5: {
      text: `Good morning everyone, and thank you for joining today's quarterly review meeting. I'd like to start by discussing our performance metrics from Q3. Our team has exceeded expectations in several key areas. Sales revenue increased by 23%, while customer satisfaction scores reached an all-time high of 4.8 out of 5. However, we still have some challenges to address, particularly in our international markets where we're seeing slower adoption rates.`,
      complexity: 'basic' as const,
      focusPoints: ['vocabulário básico', 'frases simples', 'estrutura de reunião']
    },
    10: {
      text: `Good morning everyone, I hope you all had a productive week. Let's dive into our quarterly review meeting and keep it focused as we have quite a bit to cover today.

I'd like to start by highlighting our Q3 performance metrics, which have been quite impressive across the board. Our sales team has not only met but actually exceeded their targets by 23%, which is remarkable considering the challenging market conditions we've been facing. Additionally, our customer satisfaction scores have reached an all-time high of 4.8 out of 5, which speaks volumes about the quality improvements we've implemented.

However, I want to be transparent about the areas where we're still facing headwinds. Our international expansion, particularly in the European and Asian markets, hasn't gained the traction we anticipated. The adoption rates in these regions are notably slower, and we need to reassess our market entry strategies.`,
      complexity: 'intermediate' as const,
      focusPoints: ['vocabulário intermediário', 'expressões corporativas', 'conectivos', 'estruturas compostas']
    },
    15: {
      text: `Good morning everyone, I hope you all had a productive week and managed to recharge over the weekend. Before we jump into the agenda, I wanted to quickly acknowledge the outstanding work everyone's been putting in – it really shows in our numbers.

Let's dive into our quarterly review meeting. I know we have quite a bit to cover today, so I'll try to keep my remarks concise while still hitting the key points that matter most to our strategic direction moving forward.

I'd like to kick things off by highlighting our Q3 performance metrics, which have been quite impressive across virtually every dimension we track. Our sales team has not only met but actually exceeded their ambitious targets by a substantial 23%, which is particularly remarkable when you consider the challenging macroeconomic headwinds and increased competitive pressure we've been navigating this quarter.

What's equally encouraging is that our customer satisfaction scores have reached an all-time high of 4.8 out of 5. This isn't just a number – it's a testament to the quality improvements and customer-centric initiatives we've been rolling out systematically over the past six months. The feedback we're getting consistently highlights our responsiveness and attention to detail.

That said, I want to be completely transparent about the areas where we're still encountering some resistance and haven't quite hit our stride yet. Our international expansion initiative, particularly our market penetration efforts in the European and Asian markets, hasn't gained the traction we initially projected in our business plan. The adoption rates in these regions are notably slower than our domestic market, and frankly, we need to take a step back and reassess our market entry strategies, cultural adaptation, and perhaps even our pricing models for these diverse markets.`,
      complexity: 'advanced' as const,
      focusPoints: ['vocabulário avançado', 'nuances culturais', 'gírias corporativas', 'estruturas complexas', 'variações de registro'],
      culturalTips: [
        'Americanos valorizam transparência e dados concretos',
        'Reconhecer conquistas antes de abordar problemas é uma prática comum',
        'Usar "frankly" demonstra honestidade e autenticidade',
        'Expressões como "hit our stride" são comuns no ambiente corporativo'
      ]
    }
  },
  'apresentacoes': {
    5: {
      text: `Thank you for your attention today. I'm excited to present our new product roadmap for the next quarter. This initiative represents a significant step forward in our company's growth strategy. We've identified three key areas for development: user experience improvements, mobile optimization, and enhanced security features. Each of these areas directly addresses feedback we've received from our valued customers and aligns with industry best practices.`,
      complexity: 'basic' as const,
      focusPoints: ['apresentação básica', 'estrutura clara', 'vocabulário essencial']
    },
    10: {
      text: `Thank you all for taking the time to join us today. I'm genuinely excited to walk you through our comprehensive product roadmap for Q4 and beyond. What I'm about to share represents not just our next quarter's priorities, but a fundamental shift in how we approach product development and customer satisfaction.

This strategic initiative represents a significant milestone in our company's evolution and growth trajectory. After extensive market research and countless hours of customer interviews, we've identified three critical areas that will define our competitive advantage: comprehensive user experience improvements, seamless mobile optimization, and robust security enhancements.

Each of these pillars directly addresses the most pressing feedback we've consistently received from our valued customer base, while simultaneously aligning with emerging industry best practices and regulatory requirements.`,
      complexity: 'intermediate' as const,
      focusPoints: ['apresentação estruturada', 'linguagem persuasiva', 'conexão com audiência', 'dados e evidências']
    },
    15: {
      text: `Good afternoon everyone, and thank you so much for carving out time in what I know are incredibly busy schedules to join us today. I want to start by saying how genuinely excited and energized I am to walk you through what we've been working on behind the scenes – our comprehensive product roadmap for Q4 and the strategic vision that will carry us well into next year.

What I'm about to share with you today represents far more than just our next quarter's tactical priorities. This is really about a fundamental paradigm shift in how we approach product development, customer satisfaction, and market positioning. We're not just iterating; we're innovating with purpose and intention.

This strategic initiative that we're unveiling today represents what I consider to be a pivotal milestone in our company's evolution and growth trajectory. It's the culmination of extensive market research, hundreds of hours of in-depth customer interviews, competitive analysis, and honestly, some pretty intense soul-searching about where we want to position ourselves in this rapidly evolving marketplace.

Through this comprehensive discovery process, we've identified three absolutely critical areas that we believe will not only differentiate us from our competitors but will fundamentally redefine our competitive advantage: comprehensive user experience improvements that go beyond surface-level changes, seamless mobile optimization that anticipates user behavior patterns, and robust security enhancements that address both current threats and emerging vulnerabilities.

Each of these strategic pillars directly addresses the most pressing and consistent feedback we've received from our valued customer base over the past year, while simultaneously ensuring we're not just keeping pace with but actually leading industry best practices and staying ahead of evolving regulatory requirements and compliance standards.`,
      complexity: 'advanced' as const,
      focusPoints: ['storytelling corporativo', 'linguagem inspiracional', 'construção de narrativa', 'elementos persuasivos avançados'],
      culturalTips: [
        'Começar agradecendo o tempo da audiência é essencial',
        'Usar "behind the scenes" cria senso de exclusividade',
        'Expressões como "paradigm shift" são comuns em apresentações estratégicas',
        'Combinar dados com elementos emocionais aumenta o engajamento'
      ]
    }
  },
  'negociacoes': {
    5: {
      text: `I appreciate you taking the time to meet with us today. We've carefully reviewed your proposal and believe there's definitely room for collaboration. However, we'd like to discuss a few adjustments to the terms that would make this partnership more mutually beneficial. Our main concerns center around the delivery timeline and the pricing structure. We're confident we can find a solution that works for both parties.`,
      complexity: 'basic' as const,
      focusPoints: ['negociação básica', 'diplomacia', 'propostas simples']
    },
    10: {
      text: `I really appreciate you and your team taking the time to meet with us today, especially given the tight timeline we're all working under. We've had a chance to thoroughly review your comprehensive proposal, and I want to be upfront – there's definitely significant potential for a strategic partnership here that could benefit both our organizations.

That being said, we'd like to have an open dialogue about a few key adjustments to the current terms that we believe would make this collaboration more mutually beneficial and sustainable long-term. Our primary concerns center around two main areas: the proposed delivery timeline, which seems quite aggressive given the scope of work, and the pricing structure, which we feel doesn't fully reflect the value we're bringing to the table.

We're confident that with some creative problem-solving and flexibility from both sides, we can find an arrangement that not only works for both parties but actually exceeds our initial expectations.`,
      complexity: 'intermediate' as const,
      focusPoints: ['negociação diplomática', 'expressão de preocupações', 'busca de soluções', 'linguagem colaborativa']
    },
    15: {
      text: `Good morning, and I want to start by saying how much I genuinely appreciate you and your entire team making the time to meet with us today, especially considering the complex scheduling challenges we've all been navigating and the tight timeline that's been driving our decision-making process. I know everyone's calendars are absolutely packed, so the fact that we're all here speaks to the mutual interest and potential we see in this opportunity.

We've had the opportunity to thoroughly review and analyze your comprehensive proposal, and I want to be completely transparent and upfront with you from the get-go – there's definitely significant strategic potential for a partnership here that could create real value and competitive advantages for both our organizations in ways that extend far beyond the immediate scope of this project.

That being said, in the spirit of building a strong foundation for what we hope will be a long-term collaborative relationship, we'd like to have a very open and constructive dialogue about several key areas where we believe some thoughtful adjustments to the current terms and structure would make this collaboration not just more mutually beneficial, but actually more sustainable and scalable for the long haul.

Our primary concerns, and I hope you'll see these as opportunities for creative problem-solving rather than obstacles, center around two main areas that are absolutely critical to the success of this initiative. First, the proposed delivery timeline, which, while ambitious and I certainly appreciate the urgency, seems quite aggressive when we really drill down into the scope of work and the quality standards we both want to maintain. Second, the current pricing structure, which we feel doesn't fully capture and reflect the substantial value, expertise, and resources we're bringing to the table, particularly in areas where we have unique competitive advantages.

That said, we're not here to simply point out challenges – we're genuinely confident that with some creative problem-solving, mutual flexibility, and a collaborative approach from both sides, we can architect an arrangement that not only works effectively for both parties but actually exceeds our initial expectations and sets us up for continued success.`,
      complexity: 'advanced' as const,
      focusPoints: ['negociação sofisticada', 'diplomacia avançada', 'construção de relacionamento', 'linguagem estratégica'],
      culturalTips: [
        'Reconhecer o tempo e esforço da outra parte demonstra respeito',
        'Usar "transparent" e "upfront" constrói confiança',
        'Apresentar problemas como "oportunidades" é uma técnica avançada',
        'Enfatizar benefícios mútuos é fundamental em negociações americanas'
      ]
    }
  }
};

export const useExerciseContent = (topic: string, duration: 5 | 10 | 15): ExerciseContent => {
  return useMemo(() => {
    const topicKey = topic.toLowerCase().replace(/\s+/g, '-');
    const topicData = exerciseDatabase[topicKey as keyof typeof exerciseDatabase] || exerciseDatabase.reunioes;
    const content = topicData[duration];
    
    const wordCount = content.text.split(' ').length;
    
    return {
      ...content,
      wordCount,
      additionalSections: duration > 5 ? [
        {
          title: duration === 10 ? 'Contexto Expandido' : 'Contexto Completo',
          content: `Este exercício simula uma situação real de ${topic.toLowerCase()} no ambiente corporativo americano.`
        },
        ...(duration === 15 ? [{
          title: 'Dicas Culturais',
          content: (content as any).culturalTips?.join('. ') || 'Elementos culturais importantes para comunicação efetiva.'
        }] : [])
      ] : undefined
    };
  }, [topic, duration]);
};

export default useExerciseContent;