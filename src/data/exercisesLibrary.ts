import type { Exercise } from '@/types/exercises';

export const EXERCISES_LIBRARY: Exercise[] = [
  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: REUNIÕES
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'meeting-001',
    title: 'Daily Standup',
    category: 'meetings',
    difficulty: 'beginner',
    description: 'Reunião diária rápida de alinhamento do time',
    tags: ['agile', 'scrum', 'daily', 'team-sync'],
    durations: {
      5: {
        text: `Good morning everyone. Let's start our daily standup.\n\nI'll go first. Yesterday, I finished the user authentication module. Today, I'm working on the dashboard design. I don't have any blockers right now.\n\nThat's all from me. Over to you, Sarah.`,
        wordCount: 45,
        estimatedTime: 3,
        keywords: ['standup', 'finished', 'working on', 'blockers', 'over to you'],
        focusPoints: ['Estrutura básica de daily', 'Vocabulário essencial'],
      },
      10: {
        text: `Good morning everyone. Hope you all had a good weekend.\n\nLet's dive into our daily standup. I'll kick things off.\n\nYesterday was quite productive. I managed to finish the entire user authentication module, which was a bit challenging but I'm happy with the result. I also had a quick sync with the design team to align on the new dashboard mockups.\n\nToday, I'm focusing on implementing the dashboard design. The plan is to have the first version ready by end of day, so we can review it together tomorrow morning.\n\nIn terms of blockers, I'm in pretty good shape. However, I might need Sarah's input on the API integration later this afternoon. Other than that, everything is on track.\n\nThat's all from my side. Sarah, over to you.`,
        wordCount: 130,
        estimatedTime: 7,
        keywords: ['productive', 'managed to', 'challenging', 'quick sync', 'align on', 'focusing on', 'end of day', 'in terms of', 'on track', 'from my side'],
        focusPoints: ['Detalhamento de tarefas', 'Linguagem natural', 'Conectivos'],
      },
      15: {
        text: `Good morning team! I hope everyone had a relaxing weekend. Before we start, quick question - did anyone get a chance to review the architecture proposal I shared on Friday? I'd love to hear your thoughts when we wrap up today.\n\nAnyway, let's jump into our daily standup. As usual, I'll get us started and we'll go around the room.\n\nSo, yesterday turned out to be quite productive, actually. I managed to complete the entire user authentication module that's been on our backlog for a while. It was definitely more challenging than I initially anticipated - especially handling the OAuth integration with multiple providers. But I'm really happy with how it turned out, and the test coverage is solid at about 95%.\n\nI also had a productive sync session with the design team yesterday afternoon. We spent about 30 minutes aligning on the new dashboard mockups and discussing some UX concerns that marketing had raised. I think we're all on the same page now, which is great.\n\nMoving to today's plan - I'm laser-focused on implementing the new dashboard design. The goal is to have the first working version ready by end of day. This should give us enough time to run it through QA tomorrow and make any necessary adjustments before Friday's demo to stakeholders.\n\nIn terms of blockers and dependencies - I'm in pretty good shape overall. However, I do anticipate I'll need Sarah's expertise on the API integration later this afternoon, probably around 3 PM. Sarah, would you have about 30 minutes free around that time? I want to make sure we're following the latest API standards we discussed last sprint.\n\nOne more thing I wanted to flag - I noticed our test environment was a bit slow yesterday. Not a critical blocker, but something we might want to look into when we have capacity. Just putting it on everyone's radar.\n\nThat's everything from my side. Thanks for listening, and Sarah, I'll pass it over to you now.`,
        wordCount: 320,
        estimatedTime: 12,
        keywords: [
          'relaxing weekend', 'get a chance', 'wrap up', 'jump into',
          'get us started', 'go around', 'turned out', 'on our backlog',
          'initially anticipated', 'solid', 'productive sync', 'on the same page',
          'laser-focused', 'run it through', 'in terms of', 'anticipate',
          'expertise', 'putting it on radar', 'from my side', 'pass it over',
        ],
        focusPoints: [
          'Comunicação natural e fluida',
          'Small talk profissional',
          'Antecipação de problemas',
          'Coordenação de time',
        ],
        culturalTips: [
          'Iniciar com small talk sobre o fim de semana é comum e cria rapport',
          'Antecipar necessidade de ajuda (não esperar o problema acontecer) é valorizado',
          'Ser específico sobre timing ("around 3 PM", "30 minutes") demonstra organização',
        ],
        advancedVocabulary: [
          'on our backlog', 'initially anticipated', 'on the same page',
          'laser-focused', 'run it through QA', 'putting it on radar',
        ],
      },
    },
  },

  {
    id: 'meeting-002',
    title: 'Apresentação de Projeto',
    category: 'meetings',
    difficulty: 'intermediate',
    description: 'Apresentar status e resultados de um projeto',
    tags: ['presentation', 'project-update', 'stakeholders'],
    durations: {
      5: {
        text: `Good afternoon everyone. I'm here to present our Q1 project results.\n\nWe launched the new mobile app successfully. We had 10,000 downloads in the first week. User feedback has been positive, with a 4.5-star rating.\n\nOur next steps include adding new features and improving performance. We expect to complete Phase 2 by March.\n\nThank you. Any questions?`,
        wordCount: 60,
        estimatedTime: 3,
        keywords: ['present', 'results', 'launched', 'successfully', 'downloads', 'feedback', 'next steps'],
        focusPoints: ['Estrutura de apresentação', 'Dados objetivos'],
      },
      10: {
        text: `Good afternoon everyone. Thank you for joining today's meeting. I'm excited to present our Q1 project results and discuss our path forward.\n\nFirst, let me give you some context. Three months ago, we set out to launch our new mobile application. The goal was to reach 5,000 downloads in the first month and achieve at least a 4.0-star rating.\n\nI'm pleased to report that we exceeded our targets. We launched successfully on January 15th, and within the first week alone, we had 10,000 downloads - double our monthly goal. The user feedback has been overwhelmingly positive. We're currently sitting at a 4.5-star rating on both iOS and Android, with over 500 reviews.\n\nHowever, we did face some challenges. The initial server load was higher than anticipated, causing some performance issues during peak hours. Our team worked around the clock to optimize our infrastructure, and we resolved those issues within 48 hours.\n\nLooking ahead, we have clear next steps. We're planning to add three major features: real-time notifications, social sharing, and dark mode. We're also focusing heavily on performance improvements based on user feedback.\n\nWe expect to complete Phase 2 by the end of March, which aligns with our original timeline. The budget is on track, and we have full team capacity allocated.\n\nThat covers the main points. I'm happy to take any questions now.`,
        wordCount: 240,
        estimatedTime: 8,
        keywords: [
          'excited to present', 'give you context', 'set out to', 'pleased to report',
          'exceeded our targets', 'within the first week', 'sitting at', 'face challenges',
          'worked around the clock', 'looking ahead', 'on track', 'happy to take questions',
        ],
        focusPoints: ['Apresentação estruturada', 'Dados e contexto', 'Transparência sobre desafios'],
      },
      15: {
        text: `Good afternoon everyone, and thank you all for making time for today's presentation. I know everyone's schedule is packed this quarter, so I really appreciate you being here.\n\nToday, I'm excited to walk you through our Q1 project results, discuss the lessons we learned, and outline our strategic direction for the next phase. The presentation should take about 15 minutes, and I'll leave plenty of time for questions at the end.\n\nLet me start by setting some context. If you remember, three months ago we kicked off this initiative with a clear mission: to launch our first mobile application and establish a strong presence in the mobile space. We set ambitious but achievable targets - 5,000 downloads in the first month and at least a 4.0-star user rating. These targets were based on comprehensive market research and competitive analysis.\n\nNow, I'm genuinely pleased to report that we not only met but exceeded all our key performance indicators. We successfully launched on January 15th, right on schedule. And here's where it gets exciting - within just the first week, we hit 10,000 downloads. That's double our entire monthly goal, achieved in just seven days.\n\nThe momentum has continued since then. We're now at 45,000 total downloads, and the growth curve is looking very healthy. More importantly, the quality metrics are strong. We're currently sitting at a 4.5-star average rating across both iOS and Android platforms, with over 500 detailed reviews. Users are particularly praising the intuitive interface and the seamless onboarding experience.\n\nNow, I want to be transparent about the challenges we faced - because there were some significant hurdles. The biggest issue was something we didn't fully anticipate: the server load during our launch week was nearly three times higher than our worst-case projections. This caused some performance degradation during peak hours, particularly in the evenings when usage spiked.\n\nHowever, I'm proud of how the team responded. We had engineers working around the clock - and I mean literally around the clock - to optimize our infrastructure. We implemented several critical fixes, including better caching strategies and load balancing improvements. Within 48 hours, we had completely resolved the performance issues, and we haven't seen any similar problems since.\n\nLooking ahead to Phase 2, we have a clear roadmap based on user feedback and market opportunities. We're planning to roll out three major feature sets over the next quarter. First, real-time push notifications, which was the number one requested feature in our user surveys. Second, social sharing capabilities to drive organic growth. And third, dark mode, because apparently everyone wants dark mode these days.\n\nBeyond features, we're also investing heavily in performance optimization and scalability. We want to ensure we can handle 10x our current user base without breaking a sweat.\n\nTimeline-wise, we're targeting end of March for Phase 2 completion, which keeps us aligned with our original project plan. The budget remains on track - we're actually about 5% under budget so far. And we have full team capacity allocated, with two additional developers joining us next week to help accelerate development.\n\nBefore I wrap up, I want to acknowledge the incredible work of the entire team. This success is really a testament to everyone's dedication, creativity, and resilience, especially during those tough first few days of launch.\n\nThat covers everything I wanted to share today. I know I've thrown a lot of information at you, so I'm happy to dive deeper into any specific area. What questions do you have?`,
        wordCount: 550,
        estimatedTime: 14,
        keywords: [
          'walk you through', 'lessons learned', 'strategic direction', 'kicked off',
          'establish presence', 'comprehensive market research', 'genuinely pleased',
          'key performance indicators', 'momentum', 'growth curve', 'transparent about',
          'significant hurdles', 'worst-case projections', 'performance degradation',
          'working around the clock', 'implemented critical fixes', 'roadmap',
          'roll out', 'drive organic growth', 'breaking a sweat', 'on track',
          'testament to', 'thrown information at you', 'dive deeper',
        ],
        focusPoints: [
          'Apresentação profissional completa',
          'Storytelling com dados',
          'Transparência e honestidade',
          'Reconhecimento do time',
        ],
        culturalTips: [
          'Agradecer a audiência no início mostra respeito pelo tempo deles',
          'Ser transparente sobre problemas (não esconder) gera confiança',
          'Reconhecer o time publicamente é essencial na cultura americana',
          'Perguntar "What questions do you have?" é melhor que "Any questions?" pois assume que há perguntas',
        ],
        advancedVocabulary: [
          'kicked off this initiative', 'establish presence', 'exceeded all KPIs',
          'momentum has continued', 'worst-case projections', 'working around the clock',
          'drive organic growth', 'without breaking a sweat', 'testament to',
        ],
      },
    },
  },

  {
    id: 'meeting-003',
    title: 'Retrospectiva de Sprint',
    category: 'meetings',
    difficulty: 'intermediate',
    description: 'Participe efetivamente de retrospectivas ágeis',
    tags: ['retrospective', 'agile', 'scrum', 'feedback'],
    durations: {
      5: {
        text: `Thanks everyone for joining our sprint retrospective.\n\nWhat went well: We shipped all committed features on time. The team collaboration was great.\n\nWhat didn't go well: We had too many interruptions from urgent bugs. Our estimation was off on the authentication feature.\n\nAction items: Let's schedule a dedicated bug fixing day next sprint and spend more time on estimation.`,
        wordCount: 60,
        estimatedTime: 3,
        keywords: ['retrospective', 'went well', 'shipped', 'collaboration', 'didn\'t go well', 'interruptions', 'estimation', 'action items'],
        focusPoints: ['Estrutura: good/bad/actions', 'Ser construtivo'],
      },
      10: {
        text: `Thanks everyone for joining our sprint retrospective. Let's reflect on the last two weeks.\n\nStarting with what went well: First, we successfully shipped all committed features on time, which is a big win. The team collaboration was excellent - I particularly appreciated how quickly everyone responded to questions in Slack. Also, our code review process felt smoother this sprint.\n\nNow, what didn't go well: We had too many interruptions from production bugs. About 30% of our time went to firefighting instead of planned work. Our estimation was also way off on the authentication feature - we estimated 3 days but it took a full week. That threw off our sprint planning.\n\nFor action items: I propose we schedule a dedicated bug fixing day at the start of each sprint to reduce interruptions. We should also spend more time on estimation, maybe using planning poker. Finally, let's document the authentication patterns we learned for future reference.\n\nWhat does everyone think?`,
        wordCount: 170,
        estimatedTime: 7,
        keywords: [
          'reflect on', 'went well', 'shipped', 'big win', 'collaboration', 'code review process',
          'didn\'t go well', 'interruptions', 'firefighting', 'estimation was off', 'threw off',
          'action items', 'propose', 'planning poker', 'for future reference',
        ],
        focusPoints: ['Dar exemplos concretos', 'Usar dados', 'Propor melhorias acionáveis'],
      },
      15: {
        text: `Thanks everyone for joining our sprint retrospective. I really appreciate everyone taking the time for this - I know it's been a busy couple of weeks. Let's take a step back and reflect honestly on what happened over the past sprint.\n\nBefore we dive in, I want to set the tone: this is a safe space. There are no wrong answers, and the goal is continuous improvement, not blame. So let's be open, constructive, and solution-oriented.\n\nStarting with what went well - and there's quite a bit to celebrate here. First and foremost, we successfully shipped all five committed features on time, which is a significant achievement given the complexity involved. The team collaboration was outstanding this sprint. I particularly want to call out how responsive everyone was in Slack - average response time was under 30 minutes, which really kept things moving.\n\nOur code review process also improved noticeably. Reviews were thorough yet timely, and I saw great knowledge sharing happening in the comments. That's exactly the kind of team culture we want to build.\n\nNow, let's talk about what didn't go as smoothly. The biggest pain point was unplanned work from production bugs. I did a quick analysis, and approximately 30% of our sprint capacity went to firefighting instead of planned work. That's a significant chunk and it directly impacted team morale and predictability.\n\nThe second major issue was estimation accuracy. The authentication feature was a clear miss - we estimated 3 story points, roughly 3 days of work, but it ended up taking a full week. In hindsight, we underestimated the complexity of the third-party integration and didn't account for the testing requirements adequately. This cascading effect threw off our entire sprint plan.\n\nSo let's talk solutions. I have three concrete proposals. First, I propose we institute a dedicated bug-fixing day at the start of each sprint - let's call it "Stability Monday." This creates a buffer for production issues and protects the rest of the sprint for planned work.\n\nSecond, for estimation, I'd like us to adopt planning poker and also add a "complexity check" step where we identify external dependencies and integration risks before committing to estimates.\n\nThird, let's create a shared knowledge base where we document patterns and lessons learned, starting with the authentication work. This will help us improve estimates and avoid repeating mistakes.\n\nI'd love to hear everyone's thoughts on these proposals. What resonates? What would you add or change? And are there other things we should discuss that I haven't covered?`,
        wordCount: 380,
        estimatedTime: 13,
        keywords: [
          'take a step back', 'reflect honestly', 'safe space', 'continuous improvement',
          'solution-oriented', 'call out', 'kept things moving', 'knowledge sharing',
          'pain point', 'unplanned work', 'firefighting', 'sprint capacity',
          'team morale', 'predictability', 'in hindsight', 'underestimated',
          'cascading effect', 'threw off', 'concrete proposals', 'institute',
          'buffer', 'complexity check', 'knowledge base', 'resonates',
        ],
        focusPoints: [
          'Facilitar discussões construtivas',
          'Usar dados para embasar argumentos',
          'Propor soluções concretas',
          'Criar ambiente seguro de feedback',
        ],
        culturalTips: [
          'Criar "safe space" é fundamental para feedback honesto',
          'Usar dados (30%, 3 vs 5 dias) dá credibilidade',
          'Dar nomes criativos (Stability Monday) ajuda na adoção',
          'Perguntar "what resonates?" convida participação genuína',
        ],
        advancedVocabulary: [
          'safe space', 'firefighting', 'cascading effect',
          'institute', 'complexity check', 'knowledge base', 'resonates',
        ],
      },
    },
  },

  {
    id: 'meeting-004',
    title: '1:1 com Manager',
    category: 'meetings',
    difficulty: 'intermediate',
    description: 'Tenha conversas produtivas de one-on-one',
    tags: ['1:1', 'manager', 'feedback', 'career'],
    durations: {
      5: {
        text: `Hi Sarah, thanks for making time for our 1:1.\n\nI wanted to discuss my career growth. I've been in this role for about a year now, and I'm interested in taking on more responsibility.\n\nSpecifically, I'd like to work on more complex projects and maybe mentor junior developers. What do you think would be a good next step for me?`,
        wordCount: 60,
        estimatedTime: 3,
        keywords: ['making time', 'career growth', 'taking on', 'responsibility', 'mentor', 'next step'],
        focusPoints: ['Pedir feedback', 'Discutir carreira'],
      },
      10: {
        text: `Hi Sarah, thanks for making time for our 1:1 today. I really appreciate these check-ins.\n\nI wanted to use our time today to discuss my career development. I've been in my current role for about a year now, and I feel like I've grown a lot. I'm consistently delivering projects on time, my code reviews have been positive, and I've been getting good feedback from the team.\n\nGiven that progress, I'm interested in taking on more responsibility and challenges. Specifically, I'd like to work on more complex, high-impact projects. I'm also interested in developing my leadership skills - maybe by mentoring junior developers or leading a small project team.\n\nI wanted to get your perspective on this. What do you think would be a good next step for me? Are there any areas where you think I should focus on improving first?\n\nAlso, I'd love to hear your honest feedback on my performance. What am I doing well, and where do you see room for growth?`,
        wordCount: 170,
        estimatedTime: 7,
        keywords: [
          'making time', 'check-ins', 'career development', 'grown a lot',
          'consistently delivering', 'high-impact', 'leadership skills', 'mentoring',
          'get your perspective', 'honest feedback', 'room for growth',
        ],
        focusPoints: ['Mostrar progresso', 'Pedir feedback específico', 'Demonstrar ambição saudável'],
      },
      15: {
        text: `Hi Sarah, thanks so much for making time for our 1:1 today. I know your schedule has been crazy lately, so I really appreciate you prioritizing this.\n\nI wanted to use our time today to have a conversation about my career development and get your input on some ideas I've been thinking about.\n\nFirst, let me share where I feel I'm at professionally. I've been in my current role for about a year now, and I genuinely feel like I've grown a lot during this time. I'm consistently delivering projects on time and within scope, my code reviews have been overwhelmingly positive, and I've been getting really encouraging feedback from teammates about my collaboration and communication skills.\n\nThat said, I'm starting to feel like I'm ready for new challenges. Don't get me wrong - I love what I'm doing, but I think I've reached a point where I'm comfortable with my current responsibilities, and I'm eager to stretch myself further.\n\nSpecifically, I'm interested in taking on more responsibility in a couple of areas. First, I'd love to work on more complex, high-impact projects - the kind that really move the needle for the business. I think I've proven I can handle the technical challenges, and I'm excited to tackle bigger problems.\n\nSecond, I'm really interested in developing my leadership skills. I've been thinking it might be valuable for me to mentor some of our junior developers. I remember how helpful my early mentors were to me, and I'd love to pay that forward. Plus, I think explaining concepts to others would strengthen my own understanding.\n\nI've also been wondering if there might be opportunities to lead a small project team in the future. Nothing massive to start - maybe a 2-3 person team on a shorter initiative - just to get some experience with the coordination and people management side of things.\n\nSo I wanted to get your perspective on all of this. What do you think would be a good next step for me? Are these realistic goals given where I am in my career? And are there any areas where you think I should focus on improving first?\n\nAlso, I'd really value your honest feedback on my overall performance. What do you see as my biggest strengths? And where do you see the most significant room for growth? I want to make sure I'm being self-aware about my abilities and my gaps.\n\nFinally, is there anything specific you think I should be working on or demonstrating to position myself for that next level? I'm committed to putting in the work - I just want to make sure I'm focused on the right things.\n\nI know that's a lot, so please feel free to be candid. I can handle constructive criticism - it's actually what I'm looking for!`,
        wordCount: 430,
        estimatedTime: 14,
        keywords: [
          'making time', 'schedule has been crazy', 'prioritizing this', 'career development',
          'get your input', 'grown a lot', 'consistently delivering', 'within scope',
          'overwhelmingly positive', 'don\'t get me wrong', 'stretch myself',
          'move the needle', 'proven I can handle', 'pay that forward',
          'people management', 'get your perspective', 'realistic goals',
          'self-aware', 'position myself', 'committed to putting in the work',
          'handle constructive criticism',
        ],
        focusPoints: [
          'Comunicação estruturada',
          'Demonstrar autoconsciência',
          'Mostrar ambição com humildade',
          'Estar aberto a críticas construtivas',
        ],
        culturalTips: [
          'Americanos valorizam iniciativa e ambição',
          'Pedir feedback direto é visto positivamente',
          'Ser específico sobre objetivos ajuda o manager a te apoiar',
        ],
        advancedVocabulary: [
          'stretch myself', 'move the needle', 'pay that forward',
          'position myself', 'constructive criticism',
        ],
      },
    },
  },

  {
    id: 'meeting-005',
    title: 'Brainstorming de Produto',
    category: 'meetings',
    difficulty: 'advanced',
    description: 'Sessão criativa para novas ideias de produto',
    tags: ['brainstorming', 'product', 'innovation', 'ideas'],
    durations: {
      5: {
        text: `Alright team, let's brainstorm some ideas for our new feature set.\n\nI've been thinking about what our users really need. The data shows that onboarding is where we lose most users. What if we created a guided walkthrough experience?\n\nI also think we should consider gamification elements. Things like progress badges and streaks could really boost engagement.\n\nWhat ideas do you all have?`,
        wordCount: 65,
        estimatedTime: 3,
        keywords: ['brainstorm', 'feature set', 'onboarding', 'guided walkthrough', 'gamification', 'engagement'],
        focusPoints: ['Propor ideias', 'Usar dados para embasar'],
      },
      10: {
        text: `Alright team, I'm really excited about today's brainstorming session. Before we start throwing ideas around, let me set some ground rules. First, there are no bad ideas - we're going for quantity over quality at this stage. Second, let's build on each other's ideas rather than shutting them down.\n\nSo here's the challenge we're trying to solve. Our analytics clearly show that we're losing about 40% of new users during the first week. The drop-off is particularly steep after day two. This tells me that our current onboarding experience isn't doing enough to demonstrate value quickly.\n\nI've been noodling on a few ideas myself. What if we created a guided walkthrough experience that adapts to each user's goals? Instead of a one-size-fits-all approach, we personalize the first five minutes based on what they tell us they want to achieve.\n\nAnother angle I've been exploring is gamification. We know from behavioral psychology that things like progress badges, daily streaks, and achievement milestones can significantly boost engagement and retention. What if we baked that into the core experience?\n\nBut I don't want to dominate the conversation. I'd love to hear what everyone else has been thinking. Who wants to go first?`,
        wordCount: 195,
        estimatedTime: 7,
        keywords: [
          'brainstorming session', 'ground rules', 'throwing ideas around', 'build on',
          'shutting them down', 'analytics', 'drop-off', 'demonstrate value',
          'noodling on', 'guided walkthrough', 'one-size-fits-all', 'personalize',
          'behavioral psychology', 'baked into', 'dominate the conversation',
        ],
        focusPoints: ['Facilitar discussão criativa', 'Usar dados', 'Encorajar participação'],
      },
      15: {
        text: `Alright team, welcome to what I hope will be one of the most energizing and creative sessions we've had in a while. I'm genuinely excited about the potential here, and I think if we put our heads together, we can come up with something truly transformative for our product.\n\nBefore we dive into ideation, let me establish a few ground rules to make sure we get the most out of our time. First and most importantly, there are absolutely no bad ideas in this room today. We're going for volume and creativity at this stage - we'll filter and prioritize later. Second, I want us to adopt a "yes, and" mindset. When someone shares an idea, let's build on it rather than poking holes in it. We'll have plenty of time for critical analysis later.\n\nNow, let me frame the challenge we're trying to solve, because I think having a clear problem statement will help focus our creativity productively. Our analytics paint a pretty clear picture: we're losing approximately 40% of new users within their first week, and the drop-off is particularly steep after day two. When we dig deeper into the data, we can see that users who don't complete at least three core actions in their first 48 hours have a 90% chance of churning within the month.\n\nThis tells me something fundamental about our current experience. We're not doing a good enough job of demonstrating value quickly and creating those "aha moments" that hook users in.\n\nI've been noodling on a few seed ideas that I want to throw out as starting points - not final solutions, just conversation starters. First, what if we completely reimagined our onboarding as a guided, adaptive walkthrough? Instead of the current one-size-fits-all approach, we personalize the entire first experience based on the user's stated goals, their role, and their experience level. Think of it like a choose-your-own-adventure for getting started.\n\nSecond, I've been exploring the idea of deeply integrating gamification into our core experience. The research from behavioral psychology is compelling - things like progress visualization, daily streaks, achievement badges, and social comparison elements can dramatically boost both engagement and long-term retention. Companies like Duolingo and Peloton have basically built their entire businesses around these mechanics.\n\nThird - and this is a bit more out there - what about creating a community-driven content layer? User-generated tips, success stories, peer mentoring. This could solve the engagement problem while simultaneously building a moat around our product.\n\nBut honestly, I'm just scratching the surface, and I'm probably biased toward certain types of solutions. That's exactly why we need everyone's perspective. I'd love to hear what's been bouncing around in your heads. Who wants to kick us off?`,
        wordCount: 420,
        estimatedTime: 14,
        keywords: [
          'put our heads together', 'transformative', 'ground rules', 'yes and mindset',
          'poking holes', 'critical analysis', 'frame the challenge', 'problem statement',
          'paint a clear picture', 'drop-off', 'dig deeper', 'churning',
          'aha moments', 'hook users', 'noodling on', 'seed ideas',
          'conversation starters', 'reimagined', 'one-size-fits-all',
          'choose-your-own-adventure', 'behavioral psychology', 'social comparison',
          'out there', 'building a moat', 'scratching the surface', 'bouncing around',
        ],
        focusPoints: [
          'Liderar sessão criativa',
          'Usar dados estrategicamente',
          'Técnicas de facilitação avançadas',
          'Referências de mercado',
        ],
        culturalTips: [
          '"Yes, and" vem da improvisação e é muito usado em empresas americanas',
          'Compartilhar dados antes de pedir ideias é prática padrão',
          'Referenciar empresas conhecidas (Duolingo, Peloton) dá credibilidade',
          'Admitir vieses pessoais mostra maturidade e encoraja diversidade de ideias',
        ],
        advancedVocabulary: [
          'put our heads together', 'yes and mindset', 'aha moments',
          'choose-your-own-adventure', 'building a moat', 'scratching the surface',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: DIA A DIA NO TRABALHO
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'daily-001',
    title: 'Coffee Break - Small Talk',
    category: 'daily-work',
    difficulty: 'beginner',
    description: 'Conversa casual durante o intervalo do café',
    tags: ['casual', 'small-talk', 'break'],
    durations: {
      5: {
        text: `Hey! How's it going?\n\nGood, thanks! Just grabbing some coffee. How about you?\n\nPretty good. Busy week, but managing. Did you watch the game last night?\n\nNo, I missed it. Who won?\n\nThe home team! It was a close one. Anyway, how's your project going?\n\nIt's going well. We're launching next week.\n\nThat's awesome! Good luck with that.`,
        wordCount: 65,
        estimatedTime: 3,
        keywords: ['how\'s it going', 'grabbing coffee', 'managing', 'missed it', 'close one', 'going well', 'good luck'],
        focusPoints: ['Small talk básico', 'Cumprimentos informais'],
      },
      10: {
        text: `Hey! How's your morning going so far?\n\nOh hey! Not bad at all, thanks. Just needed a quick caffeine fix. These early meetings are killing me. How about you?\n\nI hear you. Same here - I've been in back-to-back meetings since 8 AM. Finally getting a breather. Hey, did you catch the game last night?\n\nNo, I completely missed it. Was it any good? Who won?\n\nOh man, you missed a good one! It went into overtime. The home team pulled off a crazy comeback in the last quarter. Final score was 98-95.\n\nWow, sounds intense! I'll have to catch the highlights later.\n\nDefinitely worth watching. Anyway, changing subjects - how's that big project you've been working on? I remember you mentioning it was going to production soon.\n\nYeah, actually we're launching next week! The team's been working really hard on it. A bit nervous but also excited, you know?\n\nThat's fantastic! I'm sure it'll go smoothly. Your team always delivers. Let me know if you need any extra hands for the launch.\n\nThanks, I appreciate that! I'll definitely keep you in the loop.`,
        wordCount: 200,
        estimatedTime: 8,
        keywords: [
          'so far', 'not bad', 'caffeine fix', 'killing me', 'back-to-back meetings',
          'getting a breather', 'catch the game', 'missed it', 'good one',
          'went into overtime', 'pulled off', 'comeback', 'sounds intense',
          'catch the highlights', 'changing subjects', 'going to production',
          'working hard', 'go smoothly', 'always delivers', 'keep you in the loop',
        ],
        focusPoints: ['Small talk estendido', 'Transições naturais', 'Demonstrar interesse'],
      },
      15: {
        text: `Hey there! How's your morning treating you so far?\n\nOh hey! Not too bad, thanks for asking. Just desperately needed a quick caffeine fix before my next meeting. These early morning meetings are absolutely killing me this week. How's your day going?\n\nI totally hear you on that. Same boat here - I've been stuck in back-to-back meetings since literally 8 AM. This is the first moment I've had to breathe all morning. Actually, I was starting to think coffee was just a myth at this point!\n\nHa! I know that feeling. Sometimes I wonder if we actually work here or just live in meeting rooms. By the way, did you happen to catch the game last night? I know you're a big fan.\n\nMan, I wish I had! But I ended up working late finishing up that presentation for today. Was it any good? I saw people talking about it in Slack this morning.\n\nOh dude, you missed an absolute thriller! It was insane. The game went into overtime, and the home team somehow managed to pull off this crazy comeback in the final quarter. They were down by 15 points with just 8 minutes left, and everyone thought it was over. But they just kept fighting, hit some incredible three-pointers, and boom - won 98-95.\n\nNo way! That sounds absolutely intense. I'm definitely going to have to catch the highlights during lunch. Those comeback games are always the best to watch.\n\nFor sure. The energy was unreal. Anyway, completely changing subjects here - I remember you mentioning a few weeks ago that you were working on some big project. How's that coming along? Wasn't it supposed to go to production soon?\n\nOh yeah, good memory! Actually, we're officially launching next week, which is both super exciting and terrifying at the same time. The whole team's been working incredibly hard on it for the past three months. We've been doing tons of testing, but you know how launches go - there's always that little voice in your head wondering what could go wrong.\n\nI completely get that pre-launch anxiety. But honestly, knowing your team and how thorough you guys always are, I'm sure it's going to go smoothly. You folks always deliver quality work. What day is the actual launch?\n\nWednesday morning, 6 AM. We picked that time to minimize user impact in case anything unexpected happens. Got the whole team on standby for the first 24 hours.\n\nSmart move. Hey, if you need any extra hands during the launch or if anything comes up that we could help with, just give me a shout. Seriously, happy to help however I can.\n\nThanks, I really appreciate that offer. It's good to know we've got backup if needed. I'll definitely keep you in the loop and let you know how it goes.\n\nPlease do! I'll be crossing my fingers for you. Alright, I better head back - my next meeting starts in five. Let's grab lunch sometime next week after your launch craziness dies down?\n\nThat sounds perfect. I'll need to celebrate if it goes well, or commiserate if it doesn't!\n\nHa! Either way, we'll have a good time. Talk to you later!`,
        wordCount: 520,
        estimatedTime: 14,
        keywords: [
          'treating you', 'desperately needed', 'caffeine fix', 'absolutely killing me',
          'totally hear you', 'same boat', 'stuck in', 'moment to breathe',
          'absolute thriller', 'went into overtime', 'managed to pull off',
          'crazy comeback', 'no way', 'absolutely intense', 'catch the highlights',
          'completely changing subjects', 'good memory', 'officially launching',
          'both exciting and terrifying', 'tons of testing', 'little voice in your head',
          'pre-launch anxiety', 'go smoothly', 'always deliver',
          'on standby', 'smart move', 'give me a shout', 'keep you in the loop',
          'crossing my fingers', 'better head back', 'grab lunch',
          'craziness dies down', 'commiserate',
        ],
        focusPoints: [
          'Conversa casual natural',
          'Múltiplas transições de assunto',
          'Demonstrar apoio e interesse genuíno',
          'Linguagem informal mas profissional',
        ],
        culturalTips: [
          'Small talk sobre esportes é extremamente comum nos EUA',
          'Oferecer ajuda ("give me a shout") é valorizado e cria bonds',
          'Expressar ansiedade de forma leve ("terrifying") humaniza e cria conexão',
          'Sugerir encontros futuros ("grab lunch") mantém o networking ativo',
        ],
        advancedVocabulary: [
          'absolutely killing me', 'same boat', 'moment to breathe',
          'absolute thriller', 'pull off a comeback', 'pre-launch anxiety',
          'give me a shout', 'craziness dies down', 'cross my fingers',
        ],
      },
    },
  },

  {
    id: 'daily-002',
    title: 'Pedindo Ajuda a um Colega',
    category: 'daily-work',
    difficulty: 'beginner',
    description: 'Como pedir ajuda de forma educada e profissional',
    tags: ['help', 'collaboration', 'teamwork'],
    durations: {
      5: {
        text: `Hey Mike, do you have a minute? I'm stuck on something and could really use your help.\n\nSure, what's up?\n\nI'm trying to set up the database connection, but I keep getting a timeout error. Have you ever dealt with something like this?\n\nOh yeah, that happened to me last week. Check your connection string - you might be missing the port number.\n\nThat was it! Thanks so much, you saved me a lot of time!`,
        wordCount: 75,
        estimatedTime: 3,
        keywords: ['have a minute', 'stuck on', 'could use your help', 'what\'s up', 'dealt with', 'that was it', 'saved me'],
        focusPoints: ['Pedir ajuda educadamente', 'Agradecer genuinamente'],
      },
      10: {
        text: `Hey Mike, I hope I'm not catching you at a bad time. Do you have about 10 minutes? I've been banging my head against a problem for the last hour and could really use a fresh pair of eyes.\n\nOf course, no problem at all. What are you working on?\n\nSo I'm trying to set up the database connection for the new microservice, but I keep getting this persistent timeout error. I've checked the obvious stuff - the credentials are correct, the VPN is connected, and the database server is up and running. But every time I try to establish a connection, it times out after 30 seconds.\n\nHmm, that's interesting. Let me think... Oh wait, have you checked the connection string format? I ran into almost the exact same issue last week. Turned out I was missing the port number in the connection string. The default port isn't always assumed.\n\nOh my god, that's exactly it! I just added the port and it connected immediately. I can't believe I spent an hour on that. Thanks so much, Mike - you literally saved me the rest of my afternoon!\n\nHa, don't worry about it. We've all been there. That's what teammates are for. Feel free to ping me anytime you get stuck.`,
        wordCount: 210,
        estimatedTime: 7,
        keywords: [
          'catching you at a bad time', 'banging my head', 'fresh pair of eyes',
          'no problem at all', 'persistent', 'obvious stuff', 'credentials',
          'up and running', 'establish a connection', 'ran into', 'turned out',
          'oh my god', 'literally saved me', 'we\'ve all been there',
          'what teammates are for', 'ping me anytime',
        ],
        focusPoints: ['Contextualizar o problema', 'Mostrar que tentou antes', 'Agradecer genuinamente'],
      },
      15: {
        text: `Hey Mike, I hope I'm not interrupting anything important. I noticed you're not in a meeting right now - do you have maybe 10 to 15 minutes? I've been absolutely banging my head against this problem for the past hour and I think I've reached the point where I need a fresh pair of eyes on it.\n\nOf course! Actually, your timing is perfect - I just finished my last task and was about to grab coffee. What's going on?\n\nSo here's the situation. I'm working on setting up the database connection for the new microservice we discussed in yesterday's planning meeting. Everything seemed straightforward initially, but I keep running into this persistent timeout error that I cannot figure out for the life of me.\n\nLet me tell you what I've already tried so I don't waste your time. First, I double-checked all the credentials against what's in our password manager - they're correct. Second, I confirmed the VPN is connected and I can ping the database server directly. Third, I verified the database server itself is up and running with no reported issues. Fourth, I even tried creating a completely new connection from scratch, thinking maybe something was corrupted. But every single time, it gets to the connection step and just sits there for 30 seconds before timing out.\n\nI've also Googled the error message and checked Stack Overflow, but the solutions I found either don't apply to our setup or I've already tried them. At this point, I'm genuinely stumped.\n\nHmm, that's a really thorough debugging process - nice job covering the basics first. Let me think about this for a second... Actually, you know what, I bet I know exactly what this is. I ran into what sounds like the identical issue just last week when I was setting up the reporting service.\n\nThe culprit in my case was embarrassingly simple - I was missing the port number in the connection string. The documentation kind of implies that the default port is assumed, but our infrastructure team actually configured it on a non-standard port. Did you check that?\n\nOh. My. God. Let me check right now... You're absolutely right! I just added the port number and it connected instantly. I honestly cannot believe I spent over an hour on something that took two seconds to fix. Mike, you literally just saved me the entire rest of my afternoon. I owe you one!\n\nHa! Don't beat yourself up about it - we've literally all been there. I probably spent twice as long on the exact same issue last week. That's the nature of these things - it's always something small and obvious in hindsight. And seriously, don't feel like you owe me anything. That's what teammates are for, right? We're all in this together.\n\nFeel free to ping me anytime you get stuck on something. Sometimes all you need is that second pair of eyes, and I'm always happy to help.\n\nI really appreciate that, Mike. And next time you're stuck on something, don't hesitate to come find me either. I'll buy you a coffee sometime this week as a thank you.\n\nNow we're talking! I never say no to free coffee. Good luck with the rest of the setup - sounds like you're in good shape now!`,
        wordCount: 500,
        estimatedTime: 14,
        keywords: [
          'interrupting anything', 'timing is perfect', 'banging my head',
          'fresh pair of eyes', 'straightforward initially', 'persistent timeout',
          'for the life of me', 'waste your time', 'double-checked',
          'from scratch', 'corrupted', 'sits there', 'genuinely stumped',
          'thorough debugging', 'covering the basics', 'identical issue',
          'the culprit', 'embarrassingly simple', 'non-standard port',
          'connected instantly', 'I owe you one', 'don\'t beat yourself up',
          'we\'ve all been there', 'nature of these things', 'obvious in hindsight',
          'all in this together', 'ping me anytime', 'second pair of eyes',
          'don\'t hesitate', 'now we\'re talking',
        ],
        focusPoints: [
          'Pedir ajuda de forma profissional',
          'Demonstrar que tentou resolver sozinho',
          'Gratidão genuína',
          'Oferecer reciprocidade',
        ],
        culturalTips: [
          'Mostrar o que já tentou demonstra respeito pelo tempo do colega',
          'Humor sobre erros simples ("embarrassingly simple") é muito usado',
          '"I owe you one" é uma expressão comum para demonstrar gratidão',
          'Oferecer café é um gesto de agradecimento muito americano',
        ],
        advancedVocabulary: [
          'for the life of me', 'from scratch', 'genuinely stumped',
          'the culprit', 'obvious in hindsight', 'don\'t beat yourself up',
          'now we\'re talking',
        ],
      },
    },
  },

  {
    id: 'daily-003',
    title: 'E-mail Profissional',
    category: 'daily-work',
    difficulty: 'beginner',
    description: 'Escrever e discutir e-mails profissionais em inglês',
    tags: ['email', 'writing', 'communication'],
    durations: {
      5: {
        text: `Hey, can you help me with this email? I need to write to a client about a project delay.\n\nSure! Keep it short and professional. Start with something like "Dear Mr. Johnson, I hope this email finds you well."\n\nOkay, and how do I explain the delay?\n\nBe honest but positive. Something like "I wanted to give you an update on the timeline. Due to some unexpected technical challenges, we need an additional week to ensure the highest quality delivery."\n\nThat sounds great. Thanks!`,
        wordCount: 85,
        estimatedTime: 3,
        keywords: ['email', 'client', 'project delay', 'professional', 'update', 'timeline', 'unexpected', 'quality delivery'],
        focusPoints: ['Estrutura de e-mail', 'Tom profissional'],
      },
      10: {
        text: `Hey Lisa, I need your help with something. I have to write a pretty delicate email to our biggest client about a project delay, and I want to make sure I get the tone right.\n\nOh, that's tricky. What happened with the project?\n\nWe hit some unexpected technical issues with the payment integration. Nothing we can't fix, but it's going to push our delivery date back by about a week.\n\nOkay, I see. The key is to be transparent without being alarmist. Here's what I'd suggest. Start with a warm greeting - "Dear Mr. Johnson, I hope this message finds you well." Then get straight to the point - don't bury the lead.\n\nWhat do you mean by "bury the lead"?\n\nIt means don't hide the main point behind a lot of small talk. Clients appreciate directness. So after the greeting, go right into it: "I'm writing to provide you with an important update regarding the Project Atlas timeline."\n\nThen explain the situation clearly and concisely: "During our final testing phase, we identified some technical complexities in the payment integration that require additional development time. To ensure we deliver the robust, secure solution you expect, we're requesting an extension of one week, with the new target delivery date being March 15th."\n\nEnd with reassurance and next steps: "Our team is fully committed to this project, and I've personally allocated additional resources to ensure we meet this revised timeline. I'd be happy to schedule a call to discuss this further if you'd prefer."\n\nWow, that's really well structured. Can I also add something about what we're doing to prevent this in the future?\n\nAbsolutely! That shows accountability. Add something like: "We're also implementing additional quality checkpoints in our development process to prevent similar situations going forward."\n\nPerfect. Thanks so much, Lisa. You're a lifesaver!`,
        wordCount: 290,
        estimatedTime: 8,
        keywords: [
          'delicate email', 'get the tone right', 'tricky', 'transparent',
          'alarmist', 'warm greeting', 'get straight to the point', 'bury the lead',
          'appreciate directness', 'important update', 'regarding',
          'technical complexities', 'requesting an extension', 'revised timeline',
          'personally allocated', 'additional resources', 'accountability',
          'quality checkpoints', 'going forward', 'lifesaver',
        ],
        focusPoints: ['Estrutura de e-mail profissional', 'Comunicar más notícias diplomaticamente', 'Tom adequado'],
      },
      15: {
        text: `Hey Lisa, I need your help with something. I have to write a pretty delicate email to our biggest client about a project delay, and honestly, I'm kind of dreading it. I want to make sure I get the tone absolutely right because this relationship is really important to us.\n\nOh, I totally understand that anxiety. What happened with the project exactly?\n\nSo we hit some unexpected technical issues with the payment integration module. The third-party API we're using changed their authentication flow without much notice, and it's taking longer than expected to adapt our implementation. Nothing we can't fix - the team is actually really close to resolving it - but it's going to push our delivery date back by about a week.\n\nOkay, I see. This is actually more common than you'd think, so don't beat yourself up about it. The key with these kinds of communications is to be completely transparent without being alarmist. You want the client to feel informed and confident that you have things under control, not panicked.\n\nThat makes sense. So where do I start?\n\nGreat question. Let's build this step by step. First, start with a professional but warm greeting: "Dear Mr. Johnson, I hope this message finds you well and that you had a great start to the week." Keep it brief but genuine.\n\nThen, get straight to the point. There's a concept in writing called "don't bury the lead" - it means don't hide the main message behind a wall of pleasantries or small talk. Busy executives appreciate directness.\n\nSo right after the greeting, transition with something like: "I'm reaching out to provide you with an important update regarding the Project Atlas timeline that I want to share with you proactively."\n\nNotice the word "proactively" there. It signals that you're on top of things, not scrambling to cover up a problem.\n\nOh, that's clever. I wouldn't have thought of that.\n\nExactly - word choice matters a lot in these situations. Next, explain the situation clearly and concisely. Don't over-explain or get too technical: "During our comprehensive final testing phase, our engineering team identified some technical complexities in the payment integration component that require additional development time to resolve properly. Specifically, a recent change to the third-party authentication flow necessitated modifications to ensure the highest level of security and reliability."\n\nNotice I didn't say "the API broke" or "we hit a problem." The framing is important. We're being honest about what happened but positioning it as thorough quality assurance rather than a failure.\n\nThen state the impact and new timeline clearly: "To ensure we deliver the robust, enterprise-grade solution you and your team expect, we're requesting a timeline extension of one business week, with the new target delivery date being Friday, March 15th."\n\nNow here's the crucial part - reassurance and commitment: "I want to assure you that our entire team remains fully committed to Project Atlas. I've personally allocated two additional senior engineers to the effort to ensure we not only meet but exceed the quality standards outlined in our agreement. I'm also available for a call at your earliest convenience if you'd like to discuss this in more detail."\n\nAnd then close with forward-looking accountability: "Additionally, we're implementing enhanced monitoring and earlier quality checkpoints in our development pipeline to prevent similar timeline adjustments going forward. Your project's success remains our absolute top priority."\n\nSign off warmly: "Thank you for your understanding and continued partnership. I look forward to delivering an exceptional final product. Warm regards, [Your name]."\n\nLisa, this is incredible. I'm literally going to use every single line you suggested. The way you framed everything is so much better than what I would have written. Can I ask you one more thing - should I CC our manager?\n\nGreat question. Yes, I'd CC your manager as a courtesy. It shows transparency within our organization too, and your manager should be aware. But don't CC the client's boss - let the client manage their own internal communications.\n\nPerfect advice. Thank you so much - you're an absolute lifesaver. I'm sending this right now!`,
        wordCount: 650,
        estimatedTime: 14,
        keywords: [
          'delicate email', 'dreading it', 'get the tone right', 'relationship is important',
          'understand that anxiety', 'don\'t beat yourself up', 'completely transparent',
          'alarmist', 'under control', 'build this step by step', 'warm greeting',
          'get straight to the point', 'bury the lead', 'reaching out', 'proactively',
          'on top of things', 'scrambling', 'word choice matters', 'framing is important',
          'positioning it', 'quality assurance', 'enterprise-grade', 'timeline extension',
          'earliest convenience', 'forward-looking', 'accountability',
          'pipeline', 'top priority', 'continued partnership', 'CC your manager',
          'as a courtesy', 'internal communications', 'absolute lifesaver',
        ],
        focusPoints: [
          'Escrita profissional avançada',
          'Comunicar más notícias com diplomacia',
          'Framing e word choice',
          'Protocolo de comunicação empresarial',
        ],
        culturalTips: [
          '"Proactively" comunica que você está no controle',
          'Framing positivo (quality assurance vs failure) é fundamental',
          'Oferecer uma call demonstra disponibilidade e transparência',
          'CC do manager é prática padrão para transparência interna',
        ],
        advancedVocabulary: [
          'dreading it', 'don\'t beat yourself up', 'bury the lead',
          'on top of things', 'scrambling', 'enterprise-grade',
          'earliest convenience', 'pipeline', 'as a courtesy',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: APRESENTAÇÕES
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'presentation-001',
    title: 'Pitch de Produto',
    category: 'presentations',
    difficulty: 'intermediate',
    description: 'Apresentar um novo produto para potenciais investidores',
    tags: ['pitch', 'product', 'investors', 'startup'],
    durations: {
      5: {
        text: `Good morning everyone. Thank you for being here today. I'm excited to introduce our product, TaskFlow.\n\nTaskFlow is a project management tool designed specifically for remote teams. We solve a simple but critical problem: remote teams waste an average of 5 hours per week on miscommunication.\n\nOur solution uses AI to automatically organize tasks, track dependencies, and flag potential delays before they happen.\n\nWe're seeking 2 million dollars in funding to scale our platform. Any questions?`,
        wordCount: 80,
        estimatedTime: 3,
        keywords: ['introduce', 'designed specifically', 'solve a problem', 'critical', 'miscommunication', 'solution', 'seeking funding', 'scale'],
        focusPoints: ['Elevator pitch', 'Estrutura problema-solução'],
      },
      10: {
        text: `Good morning everyone, and thank you for taking the time to hear our pitch today. My name is Alex, and I'm the founder and CEO of TaskFlow.\n\nLet me start with a question: How many hours does your team waste every week due to miscommunication? For most remote teams, the answer is shocking - an average of 5 hours per person per week. That's almost an entire working day lost.\n\nTaskFlow is a next-generation project management platform designed specifically for the way remote teams actually work. Unlike traditional tools that simply digitize to-do lists, TaskFlow uses AI to understand how your team communicates and automatically organizes tasks, tracks dependencies, and - most importantly - flags potential delays before they become real problems.\n\nLet me show you what this looks like in practice. When a team member updates their status, our AI analyzes the impact on every connected task and immediately notifies anyone who might be affected. No more "I didn't know you were waiting on me" moments.\n\nWe launched our beta six months ago, and the results speak for themselves. Our 200 pilot teams reported a 40% reduction in missed deadlines and a 60% improvement in team satisfaction scores.\n\nOur business model is SaaS-based, with pricing starting at $12 per user per month. We're currently at $500K in annual recurring revenue and growing 25% month over month.\n\nWe're seeking 2 million dollars in Series A funding to scale our engineering team, expand into enterprise markets, and accelerate our go-to-market strategy.\n\nThank you. I'm happy to take your questions.`,
        wordCount: 250,
        estimatedTime: 8,
        keywords: [
          'hear our pitch', 'founder and CEO', 'shocking', 'next-generation',
          'designed specifically', 'unlike traditional', 'digitize',
          'flags potential delays', 'in practice', 'speak for themselves',
          'pilot teams', 'reduction', 'improvement', 'SaaS-based',
          'annual recurring revenue', 'month over month', 'Series A',
          'go-to-market strategy',
        ],
        focusPoints: ['Pitch estruturado', 'Usar dados persuasivos', 'Call to action'],
      },
      15: {
        text: `Good morning everyone, and thank you so much for carving out time from your busy schedules to hear our pitch today. My name is Alex Chen, I'm the founder and CEO of TaskFlow, and I have to tell you - I've been looking forward to this conversation because I genuinely believe we're sitting on something that could transform how millions of people work together.\n\nBut before I tell you about our product, I want to start with a story. Last year, I was leading a 30-person engineering team distributed across 4 time zones. One Monday morning, I discovered that two sub-teams had been working on the same feature for three weeks without knowing it. Three weeks of duplicated effort - that's roughly $50,000 in wasted engineering time. And the worst part? We were using three different project management tools at the time.\n\nThat was my "aha" moment. The problem isn't that remote teams don't have enough tools - it's that existing tools don't actually understand how remote teams work. They're essentially digital bulletin boards, and they put the burden of coordination entirely on humans.\n\nSo here's the hard data. Remote teams waste an average of 5 hours per person per week on coordination overhead - figuring out who's doing what, chasing status updates, discovering conflicts too late. For a 100-person company, that's 26,000 hours per year. At an average cost of $50 per hour, that's $1.3 million annually. Just. On. Miscommunication.\n\nTaskFlow is a next-generation project management platform that fundamentally reimagines how remote teams coordinate. Unlike every other tool on the market that simply digitizes to-do lists, TaskFlow uses advanced AI to understand your team's communication patterns, automatically organize and prioritize work, track dependencies in real-time, and - this is the game changer - proactively flag potential delays and conflicts before they ever become real problems.\n\nLet me paint a picture of what this looks like in practice. Imagine Sarah on your engineering team pushes a commit at 3 PM. Within seconds, TaskFlow's AI analyzes the impact across every connected task and project. It notices that Sarah's change affects the API that the mobile team in London is depending on. Before anyone even thinks to send a message, TaskFlow has already notified the London team, suggested a 2-day timeline adjustment, and proposed an alternative approach that would minimize disruption. All automatically.\n\nNo more "I didn't know you were waiting on me." No more Monday morning surprises. No more duplicated work.\n\nNow let's talk results. We launched our beta six months ago with 50 pilot teams. Today, we're at 200 teams and growing organically. The outcomes have exceeded even our most optimistic projections. Teams using TaskFlow reported a 40% reduction in missed deadlines, a 60% improvement in team satisfaction scores, and a 35% decrease in time spent on status meetings.\n\nBut here's the number I'm most proud of: our Net Promoter Score is 72. For context, Slack is at 55, and Asana is at 40. Our users don't just like TaskFlow - they love it, and they're telling everyone about it.\n\nOur business model is straightforward SaaS. Teams start at $12 per user per month for our Professional tier, with Enterprise pricing at $25 per user. We're currently at $500K in annual recurring revenue, growing at 25% month over month. Our customer acquisition cost is just $150, with a lifetime value of $3,600 - that's a 24x LTV-to-CAC ratio.\n\nOur competitive advantages are threefold. First, our proprietary AI engine, which we've trained on over 2 million real-world project interactions. Second, our team - we have PhDs from Stanford and MIT focused on organizational behavior AI. Third, our first-mover advantage in AI-native project management.\n\nWe're seeking $2 million in Series A funding. Here's exactly how we'll deploy that capital. Forty percent goes to engineering - specifically, scaling our AI capabilities and building our enterprise features. Thirty percent goes to sales and marketing to accelerate our go-to-market in the enterprise segment. Twenty percent goes to customer success to maintain our exceptional NPS. And ten percent is reserved for operations.\n\nOur 18-month roadmap targets 2,000 paying teams, $5 million in ARR, and a clear path to profitability.\n\nThe remote work revolution isn't going away - if anything, it's accelerating. The global project management software market is projected to reach $15 billion by 2028. And right now, there is no AI-native solution that truly solves the coordination problem for distributed teams. That's the gap we're filling.\n\nThank you for your time and attention. I'd love to open the floor for questions.`,
        wordCount: 720,
        estimatedTime: 15,
        keywords: [
          'carving out time', 'sitting on something', 'transform',
          'aha moment', 'digital bulletin boards', 'burden of coordination',
          'hard data', 'coordination overhead', 'fundamentally reimagines',
          'game changer', 'proactively flag', 'paint a picture',
          'minimize disruption', 'exceeded projections', 'net promoter score',
          'straightforward SaaS', 'annual recurring revenue', 'lifetime value',
          'competitive advantages', 'proprietary', 'first-mover advantage',
          'deploy that capital', 'go-to-market', 'path to profitability',
          'remote work revolution', 'filling the gap', 'open the floor',
        ],
        focusPoints: [
          'Pitch completo para investidores',
          'Storytelling com dados',
          'Linguagem persuasiva',
          'Métricas e unit economics',
        ],
        culturalTips: [
          'Começar com uma história pessoal cria conexão emocional',
          'Investidores americanos valorizam métricas específicas e unit economics',
          'Especificar uso do capital mostra maturidade e planejamento',
          '"Open the floor" é mais convidativo que "any questions"',
        ],
        advancedVocabulary: [
          'carving out time', 'aha moment', 'game changer',
          'proactively flag', 'net promoter score', 'first-mover advantage',
          'deploy capital', 'path to profitability', 'filling the gap',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: NEGOCIAÇÕES
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'negotiation-001',
    title: 'Negociação de Contrato',
    category: 'negotiations',
    difficulty: 'advanced',
    description: 'Negociar termos de um contrato comercial',
    tags: ['contract', 'negotiation', 'business', 'terms'],
    durations: {
      5: {
        text: `I appreciate you taking the time to meet with us today. We've carefully reviewed your proposal and believe there's definitely room for collaboration.\n\nHowever, we'd like to discuss a few adjustments to the terms. Our main concerns center around the delivery timeline and the pricing structure.\n\nWe're confident we can find a solution that works for both parties. What are your thoughts?`,
        wordCount: 60,
        estimatedTime: 3,
        keywords: ['appreciate', 'reviewed', 'proposal', 'room for collaboration', 'adjustments', 'concerns', 'both parties'],
        focusPoints: ['Abertura diplomática', 'Expressar preocupações'],
      },
      10: {
        text: `I really appreciate you and your team taking the time to meet with us today, especially given the tight timeline we're all working under. We've had a chance to thoroughly review your comprehensive proposal, and I want to be upfront - there's definitely significant potential for a strategic partnership here.\n\nThat being said, we'd like to have an open dialogue about a few key adjustments to the current terms. Our primary concerns center around two main areas: the proposed delivery timeline, which seems quite aggressive given the scope, and the pricing structure, which we feel doesn't fully reflect the value we're bringing to the table.\n\nRegarding the timeline, we'd like to propose extending the first milestone by two weeks. This would allow us to ensure proper quality assurance without cutting corners. We believe this small adjustment would actually save both of us significant costs in the long run.\n\nOn pricing, we've done some market research, and we believe a 15% adjustment would be more aligned with industry standards while still maintaining healthy margins for both sides.\n\nWe're confident that with some creative problem-solving and flexibility from both sides, we can find an arrangement that not only works but actually exceeds our initial expectations. What are your thoughts on these points?`,
        wordCount: 210,
        estimatedTime: 7,
        keywords: [
          'be upfront', 'strategic partnership', 'open dialogue', 'adjustments',
          'aggressive', 'bringing to the table', 'propose extending', 'quality assurance',
          'cutting corners', 'in the long run', 'market research', 'industry standards',
          'healthy margins', 'creative problem-solving', 'flexibility', 'exceeds expectations',
        ],
        focusPoints: ['Negociação diplomática', 'Propor soluções concretas', 'Win-win mindset'],
      },
      15: {
        text: `Good morning, and I want to start by expressing how much we genuinely appreciate you and your entire team making the time to meet with us today. I know everyone's calendars are incredibly busy, and the fact that we're all here speaks to the mutual interest and potential we see in this opportunity.\n\nWe've had the opportunity to thoroughly review and analyze your comprehensive proposal, and I want to be completely transparent and upfront from the very beginning - there is significant strategic potential for a partnership here that could create real value for both our organizations.\n\nThat being said, in the spirit of building a strong foundation for what we hope will be a long-term collaborative relationship, we'd like to have a very open and constructive dialogue about several areas where we believe some thoughtful adjustments would make this collaboration more sustainable and beneficial for the long haul.\n\nOur first concern relates to the proposed delivery timeline. While I certainly appreciate the ambitious approach - and believe me, I'm a big fan of moving fast - the current schedule seems quite aggressive when we really drill down into the scope of work. We've done a detailed analysis with our technical team, and there are several integration points that carry higher complexity than initially scoped.\n\nWhat we'd like to propose is extending the first major milestone by two weeks. I know that might sound like a lot, but hear me out. This additional time would allow us to implement proper quality assurance protocols, thorough testing cycles, and adequate documentation. In our experience, this kind of upfront investment actually saves both parties significant costs downstream - typically in the range of 3 to 5x what you'd spend on rushing and then fixing issues later.\n\nOur second area of discussion relates to the pricing structure. I want to approach this carefully because I have tremendous respect for the work your team does. However, after conducting thorough market research and benchmarking against similar partnerships in our industry, we believe a 15% adjustment to the proposed rates would be more closely aligned with current market standards.\n\nI want to emphasize that this isn't about trying to undervalue your contribution - quite the opposite. We want this partnership to be financially sustainable for both sides over the long term. A rate that's too high creates internal pressure for us, while a rate that's too low doesn't attract the caliber of attention and commitment a project like this deserves. We're looking for that sweet spot.\n\nFinally, I'd like to discuss the intellectual property terms. The current proposal assigns all IP exclusively to one party. We'd like to propose a shared licensing model where both parties retain usage rights for their core business activities, while jointly owning any innovations that emerge directly from this collaboration.\n\nI've brought a detailed comparison matrix that outlines our proposed adjustments side by side with the current terms, along with the rationale for each change. I'm happy to walk through this document together if that would be helpful.\n\nUltimately, our goal is not to simply negotiate favorable terms for ourselves, but to architect an arrangement that both teams feel genuinely excited about - one where everyone feels they're getting fair value. The best partnerships are the ones where both sides walk away from the table feeling like winners.\n\nI'm very open to hearing your perspective on all of this. What are your initial thoughts?`,
        wordCount: 500,
        estimatedTime: 14,
        keywords: [
          'genuinely appreciate', 'mutual interest', 'transparent and upfront',
          'strategic potential', 'strong foundation', 'long-term collaborative',
          'constructive dialogue', 'for the long haul', 'drill down',
          'higher complexity than scoped', 'hear me out', 'quality assurance protocols',
          'upfront investment', 'downstream', 'benchmarking', 'market standards',
          'undervalue your contribution', 'financially sustainable', 'caliber',
          'sweet spot', 'intellectual property', 'shared licensing model',
          'comparison matrix', 'side by side', 'rationale', 'architect an arrangement',
          'walk away from the table', 'fair value', 'initial thoughts',
        ],
        focusPoints: [
          'Negociação avançada e diplomática',
          'Argumentação baseada em dados',
          'Construção de confiança',
          'Abordagem win-win',
        ],
        culturalTips: [
          'Começar com apreciação genuína estabelece tom colaborativo',
          '"Hear me out" é usado para pedir atenção antes de um argumento forte',
          'Trazer dados (3-5x custos) fortalece argumentos sem parecer agressivo',
          '"Walk away from the table feeling like winners" é ideal em negociações',
        ],
        advancedVocabulary: [
          'drill down', 'downstream', 'benchmarking', 'sweet spot',
          'shared licensing model', 'comparison matrix', 'architect an arrangement',
          'walk away from the table',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: NETWORKING
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'networking-001',
    title: 'Conferência de Tecnologia',
    category: 'networking',
    difficulty: 'intermediate',
    description: 'Networking em uma conferência profissional',
    tags: ['conference', 'networking', 'technology', 'connections'],
    durations: {
      5: {
        text: `Hi there! Great presentation, by the way. I really enjoyed your talk on AI in healthcare.\n\nThank you so much! I'm glad you found it useful. What brings you to the conference?\n\nI work in health tech too. We're building a patient data platform. Your insights on data privacy were really relevant to what we're doing.\n\nOh, that sounds fascinating! I'd love to hear more about it. Do you have a card?\n\nHere you go. Let's definitely stay in touch!`,
        wordCount: 80,
        estimatedTime: 3,
        keywords: ['great presentation', 'enjoyed your talk', 'what brings you', 'insights', 'relevant', 'fascinating', 'stay in touch'],
        focusPoints: ['Iniciar conversas', 'Fazer conexões'],
      },
      10: {
        text: `Hi there! Mind if I join you? That was a fantastic presentation, by the way. Your insights on implementing AI in healthcare diagnostics really resonated with me.\n\nThank you so much, that means a lot! It's always nice to hear that the message landed well. What's your background? What brings you to the conference?\n\nI'm Alex, I work as a product lead at MedTech Solutions. We're actually building a patient data platform that uses machine learning for early disease detection, so your talk was incredibly relevant to the challenges we're facing right now.\n\nOh wow, that sounds absolutely fascinating! Early detection is one of the areas I'm most passionate about. What stage is your product at?\n\nWe just completed our pilot program with three hospital systems. The results have been really promising - we're seeing about 30% improvement in early detection rates for certain conditions.\n\nThat's impressive. You know, I've been doing some research on similar approaches in radiology that might be relevant to your work. Would you be interested in chatting more about it? Maybe we could grab coffee sometime next week?\n\nI'd love that! Here's my card. And I'll send you a LinkedIn connection request so we can keep the conversation going.\n\nPerfect. It was really great meeting you, Alex. I have a feeling we'll find some interesting ways to collaborate.`,
        wordCount: 220,
        estimatedTime: 7,
        keywords: [
          'mind if I join', 'resonated with me', 'means a lot', 'message landed',
          'background', 'incredibly relevant', 'challenges we\'re facing',
          'absolutely fascinating', 'most passionate about', 'what stage',
          'pilot program', 'promising', 'improvement', 'relevant to your work',
          'grab coffee', 'LinkedIn connection', 'keep the conversation going',
          'great meeting you', 'find ways to collaborate',
        ],
        focusPoints: ['Networking natural', 'Demonstrar interesse genuíno', 'Criar conexões'],
      },
      15: {
        text: `Excuse me, hi there! Mind if I join you for a moment? I just wanted to say - that was an absolutely fantastic presentation. Your insights on implementing AI in healthcare diagnostics really resonated with me, especially the part about balancing innovation with patient privacy. That's something I think about constantly in my own work.\n\nWow, thank you so much - that really means a lot to hear, especially from someone who clearly works in the field. Honestly, that talk was the result of about six months of research, so it's incredibly gratifying when it lands with the right audience. I'm sorry, I didn't catch your name?\n\nOf course, I'm Alex Martinez. I'm a product lead at MedTech Solutions - we're a Series B healthtech startup based in San Francisco. We're actually building a patient data platform that uses machine learning for early disease detection, so your talk today was incredibly relevant to the exact challenges we're navigating right now.\n\nOh wow, early disease detection - that is one of the areas I'm personally most passionate about. There's so much untapped potential there. I'd love to hear more. What stage is your product at, and what conditions are you focusing on initially?\n\nGreat questions. So we just completed our first pilot program with three major hospital systems on the East Coast. We focused initially on cardiac conditions and certain types of cancer screening. The results have been really promising - we're seeing roughly a 30% improvement in early detection rates compared to traditional screening methods, and the false positive rate is actually lower than we projected.\n\nThat is genuinely impressive, especially the false positive piece. That's usually where these systems struggle. You know, it's funny you mention cardiac conditions - I've been doing some cutting-edge research on similar approaches in radiology, specifically using advanced imaging analysis to detect micro-anomalies that human radiologists often miss. I think there might be some really interesting overlap with what you're doing.\n\nI was actually thinking the same thing! Our data science team has been looking into imaging-based approaches, but we don't have deep expertise in that area internally.\n\nWell, that's exactly the kind of gap where collaboration could be really powerful. Listen, I don't want to monopolize your time at the conference, but I would love to continue this conversation in more depth. Would you be open to grabbing coffee sometime next week? I'm in San Francisco on Tuesday and Wednesday.\n\nAbsolutely, that would be fantastic! Let me give you my card. And I'll send you a LinkedIn connection request tonight so we don't lose touch. I'll also send you some of the pilot data we've published - I think you'll find it really interesting in the context of your research.\n\nThat would be amazing, thank you. And I'll share some of my recent papers with you as well. You know, Alex, I have to say - this is exactly why I love coming to these conferences. You never know when you're going to meet someone whose work aligns so perfectly with yours. I have a genuine feeling we'll find some really interesting ways to collaborate.\n\nI completely agree. Sometimes the best partnerships come from the most unexpected conversations. It was truly a pleasure meeting you, and I'm really looking forward to continuing our discussion next week.\n\nLikewise! Have a wonderful rest of the conference, and enjoy the networking reception tonight. I'll see you soon!`,
        wordCount: 530,
        estimatedTime: 14,
        keywords: [
          'mind if I join', 'resonated with me', 'means a lot', 'incredibly gratifying',
          'lands with the right audience', 'didn\'t catch your name', 'Series B',
          'navigating right now', 'untapped potential', 'focusing on initially',
          'pilot program', 'false positive rate', 'lower than projected',
          'genuinely impressive', 'cutting-edge research', 'micro-anomalies',
          'interesting overlap', 'deep expertise', 'exactly the kind of gap',
          'monopolize your time', 'continue this conversation', 'open to grabbing coffee',
          'don\'t lose touch', 'in the context of', 'aligns so perfectly',
          'unexpected conversations', 'truly a pleasure', 'looking forward to',
        ],
        focusPoints: [
          'Networking avançado e genuíno',
          'Construir rapport profissional',
          'Identificar oportunidades de colaboração',
          'Manter conexões ativas',
        ],
        culturalTips: [
          'Elogiar apresentações é forma natural de iniciar conversa',
          'Compartilhar resultados concretos gera credibilidade imediata',
          'Sugerir café é forma americana clássica de aprofundar conexões',
          'LinkedIn é a forma padrão de manter contato profissional nos EUA',
        ],
        advancedVocabulary: [
          'resonated with me', 'incredibly gratifying', 'untapped potential',
          'cutting-edge research', 'monopolize your time', 'unexpected conversations',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: VIAGENS
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'travel-001',
    title: 'Check-in no Hotel',
    category: 'travel',
    difficulty: 'beginner',
    description: 'Fazer check-in em um hotel internacional',
    tags: ['hotel', 'check-in', 'accommodation'],
    durations: {
      5: {
        text: `Good evening. I have a reservation under John Smith.\n\nYes, Mr. Smith. I have your reservation here. You're staying for three nights, correct?\n\nThat's right.\n\nPerfect. May I see your ID and credit card, please?\n\nHere you go.\n\nThank you. Your room is 305 on the third floor. Breakfast is served from 7 to 10 AM. Here's your key card.\n\nGreat, thank you!`,
        wordCount: 70,
        estimatedTime: 3,
        keywords: ['reservation', 'staying', 'nights', 'ID', 'credit card', 'floor', 'breakfast', 'key card'],
        focusPoints: ['Vocabulário de hotel', 'Frases essenciais'],
      },
      10: {
        text: `Good evening. Welcome to the Grand Hotel. How may I help you today?\n\nHello! I have a reservation under the name John Smith. I should be checking in for three nights.\n\nPerfect, let me pull that up for you. Yes, I have your reservation right here. Mr. Smith, you've booked a deluxe king room for three nights, checking out on Friday morning. Is that correct?\n\nYes, that's exactly right.\n\nWonderful. Now, for check-in, I'll need to see a valid photo ID and the credit card used for the reservation, please.\n\nOf course, here's my driver's license and credit card.\n\nThank you so much. Just one moment while I process this... Okay, all set! I've assigned you room 305 on the third floor. It's a beautiful room with a city view.\n\nOh, that sounds great!\n\nYou'll find complimentary Wi-Fi throughout the hotel - the password is on the information card in your room. Breakfast is served daily in our restaurant on the ground floor from 7 to 10 AM. The gym and pool are on the second floor, open 24/7.\n\nPerfect, thank you for all that information.\n\nMy pleasure! Here are your key cards - you have two. The elevators are just to your left. Is there anything else I can help you with?\n\nNo, that's everything. Thank you!\n\nYou're very welcome. Enjoy your stay!`,
        wordCount: 250,
        estimatedTime: 8,
        keywords: [
          'pull that up', 'deluxe king room', 'checking out', 'exactly right',
          'valid photo ID', 'process this', 'all set', 'assigned you',
          'city view', 'sounds great', 'complimentary Wi-Fi', 'information card',
          'ground floor', 'open 24/7', 'my pleasure', 'key cards',
          'to your left', 'enjoy your stay',
        ],
        focusPoints: ['Diálogo completo de check-in', 'Informações do hotel', 'Cortesia profissional'],
      },
      15: {
        text: `Good evening and welcome to the Grand Plaza Hotel! How may I assist you this evening?\n\nHi there! Good evening. I have a reservation and I'd like to check in, please. The name should be under John Smith.\n\nWonderful, Mr. Smith. Let me look that up for you right away... Okay, yes, I have your reservation right here in our system. I see you've booked a deluxe king room with us for three nights, with checkout scheduled for this Friday morning at 11 AM. Does that all sound correct to you?\n\nYes, that's perfect. Actually, I was wondering - is there any chance I could get a late checkout on Friday? My flight's not until the evening.\n\nAbsolutely, let me check availability for you... Good news! I can definitely arrange a late checkout until 2 PM at no additional charge. Would that work for you?\n\nThat would be fantastic, thank you so much!\n\nMy pleasure! Now, for the check-in process, I'll need to see a valid government-issued photo ID and the credit card that was used to guarantee the reservation, please.\n\nOf course, no problem. Here's my driver's license and here's my credit card.\n\nPerfect, thank you. Just give me one moment while I process everything... Okay, wonderful, you're all set! I've gone ahead and assigned you to room 305 on the third floor. It's one of our newly renovated rooms with a beautiful view of the city skyline. I think you're really going to love it.\n\nOh that sounds amazing! I'm looking forward to it.\n\nI'm sure you'll enjoy it. Now, let me give you some information about our amenities. We offer complimentary high-speed Wi-Fi throughout the entire property - the network name and password are on the information card you'll find in your room.\n\nOur complimentary breakfast buffet is served daily in our main restaurant, which is located here on the ground floor. It runs from 7 AM to 10 AM, and we have both hot and cold options, including made-to-order omelets.\n\nThe fitness center and indoor swimming pool are located on the second floor, and they're accessible 24 hours a day, 7 days a week. You'll need your room key to access that floor after 10 PM for security purposes.\n\nWe also have a business center on the ground floor if you need to print anything or use a computer - that's also complimentary. And our concierge desk, just over there to your right, can help with restaurant recommendations, booking tours, or arranging transportation.\n\nIs there any specific service or information you need that I haven't covered?\n\nThat all sounds wonderful, thank you. Actually, one quick question - what time does the hotel restaurant close for dinner?\n\nGreat question! Our restaurant serves dinner until 10 PM, but the bar stays open until midnight if you'd like lighter fare or just drinks. We also offer 24-hour room service if you prefer to dine in your room.\n\nPerfect, that's really helpful. Thank you so much for all the information.\n\nYou're absolutely welcome! Now, here are your two key cards. The elevators are located just to your left, past the seating area. Your room is on the third floor - just turn right when you exit the elevator, and you'll see room 305 about halfway down the hallway on your right side.\n\nIs there anything else at all I can help you with before you head up?\n\nNo, I think you've covered everything. Thanks again for being so helpful!\n\nIt's truly my pleasure, Mr. Smith. We're delighted to have you staying with us. If you need anything at all during your stay - absolutely anything - please don't hesitate to call the front desk. We're available 24/7. Have a wonderful evening and enjoy your stay!\n\nThank you, you too!`,
        wordCount: 615,
        estimatedTime: 14,
        keywords: [
          'assist you', 'look that up', 'right away', 'in our system',
          'checkout scheduled', 'any chance', 'late checkout', 'check availability',
          'at no additional charge', 'government-issued', 'guarantee the reservation',
          'give me one moment', 'all set', 'gone ahead', 'assigned you to',
          'newly renovated', 'city skyline', 'looking forward to', 'complimentary',
          'throughout the property', 'breakfast buffet', 'made-to-order',
          'fitness center', 'accessible', 'security purposes', 'business center',
          'concierge desk', 'arranging transportation', 'lighter fare',
          'room service', 'prefer to dine', 'absolutely welcome',
          'about halfway down', 'covered everything', 'truly my pleasure',
          'delighted to have you', 'don\'t hesitate',
        ],
        focusPoints: [
          'Check-in profissional completo',
          'Pedidos especiais (late checkout)',
          'Informações detalhadas do hotel',
          'Cortesia e hospitalidade',
        ],
        culturalTips: [
          'Staff de hotéis americanos é extremamente cordial e prestativo',
          'Pedir late checkout é normal e geralmente possível sem custo',
          'É apropriado fazer perguntas sobre amenities - o staff espera isso',
          '"My pleasure" é mais usado que "you\'re welcome" em contexto de serviço',
        ],
        advancedVocabulary: [
          'at no additional charge', 'gone ahead and assigned',
          'newly renovated', 'made-to-order', 'lighter fare',
          'prefer to dine', 'don\'t hesitate', 'delighted to have you',
        ],
      },
    },
  },

  {
    id: 'travel-002',
    title: 'No Aeroporto',
    category: 'travel',
    difficulty: 'beginner',
    description: 'Situações comuns no aeroporto',
    tags: ['airport', 'flight', 'boarding'],
    durations: {
      5: {
        text: `Hi, I'd like to check in for my flight to New York.\n\nOf course. Can I see your passport and booking confirmation?\n\nHere you go.\n\nThank you. Would you like a window or aisle seat?\n\nWindow, please.\n\nPerfect. Your flight departs from Gate B12 at 3:30 PM. Boarding starts at 3:00. Do you have any luggage to check?\n\nYes, one suitcase.\n\nAlright, that's all set. Have a pleasant flight!`,
        wordCount: 75,
        estimatedTime: 3,
        keywords: ['check in', 'flight', 'passport', 'booking confirmation', 'window', 'aisle', 'departs', 'gate', 'boarding', 'luggage', 'check'],
        focusPoints: ['Vocabulário de aeroporto', 'Frases essenciais'],
      },
      10: {
        text: `Good afternoon. I'd like to check in for my flight to New York, please. Here's my passport and booking confirmation.\n\nGood afternoon, sir. Let me pull up your reservation... Okay, I have you on Flight AA245 to JFK, departing at 3:30 PM today. Is that correct?\n\nYes, that's right.\n\nGreat. Do you have a seat preference? Window or aisle?\n\nWindow, if possible. And somewhere near the front of the plane would be great.\n\nLet me see what's available... I can get you seat 14A, which is a window seat about midway through the cabin. Unfortunately, the front rows are all taken.\n\nThat works perfectly, thank you.\n\nDo you have any checked luggage today?\n\nYes, one suitcase. It's this one here.\n\nAlright, let me weigh that for you... It's 22 kilos, well within the limit. Here's your luggage tag. Now, your flight departs from Terminal 2, Gate B12. Boarding begins at 3:00 PM, so I'd recommend heading through security soon.\n\nIs there anything else I can help you with?\n\nActually, is there a lounge I can use while I wait?\n\nYes! There's a business lounge on the second floor, past security on your right. You can access it with your boarding pass if you have a membership or a premium credit card.\n\nPerfect, thank you for all your help!\n\nYou're welcome! Have a wonderful flight!`,
        wordCount: 230,
        estimatedTime: 7,
        keywords: [
          'pull up your reservation', 'departing at', 'seat preference', 'window or aisle',
          'near the front', 'midway through the cabin', 'works perfectly',
          'checked luggage', 'weigh that', 'within the limit', 'luggage tag',
          'boarding begins', 'heading through security', 'lounge', 'boarding pass',
          'membership', 'wonderful flight',
        ],
        focusPoints: ['Check-in detalhado', 'Fazer pedidos específicos', 'Informações de voo'],
      },
      15: {
        text: `Good afternoon! Welcome to the check-in counter. How can I help you today?\n\nHi, good afternoon! I'd like to check in for my flight to New York, please. I believe it's the 3:30 departure. Here's my passport and my booking confirmation.\n\nThank you very much. Let me pull up your reservation... Okay, I have you confirmed on Flight AA245 to John F. Kennedy International Airport, departing at 3:30 PM today with an estimated arrival time of 9:45 PM Eastern. Is everything looking correct?\n\nYes, that all sounds right.\n\nPerfect. Now, before I assign your seat, do you have any preferences? We have both window and aisle seats available.\n\nI'd love a window seat if possible. And if you could get me something near the front of the plane, that would be great. I have a connecting flight and want to be among the first to deplane.\n\nI completely understand. Let me see what I can do for you... Unfortunately, the first few rows are fully booked. However, I do have seat 8A available, which is a window seat in the premium economy section. It's just behind the first-class cabin, so you'd be among the first economy passengers to deplane. The catch is there's a $45 upgrade fee for premium economy. Would you be interested?\n\nActually, yes, that sounds worth it given my tight connection. Let's do that.\n\nExcellent choice! I'll process that upgrade for you right now... All done. Seat 8A it is. You'll enjoy a bit more legroom and priority boarding as well.\n\nNow, do you have any luggage you'd like to check today?\n\nYes, I have one large suitcase and this carry-on. The carry-on should be fine for overhead storage, right?\n\nLet me check the dimensions on that... Yes, your carry-on is within our size requirements, so that's perfectly fine for the overhead bin. Now let me weigh your checked bag... It's coming in at 22 kilos, which is well within the 23-kilo allowance. Here's your luggage tag - keep the receipt portion for your records.\n\nPerfect. Can I also ask about my connecting flight? I'm flying from JFK to Boston.\n\nAbsolutely. Let me pull that up... Your connection is on Flight AA1287, departing JFK at 11:15 PM from Terminal 8, Gate C22. You'll have about an hour and a half for your layover, which should be plenty of time. Your bags will be automatically transferred, so you don't need to worry about picking them up at JFK.\n\nOh, that's a relief! I was worried about that.\n\nNo need to worry at all. Now, for today's departure, your flight leaves from Terminal 2, Gate B12. Boarding begins at 3:00 PM, and as a premium economy passenger, you'll board in Group 2. I'd recommend heading through security fairly soon, as there can sometimes be longer wait times at this hour.\n\nOne last question - is there a lounge I can access while I wait?\n\nGreat question! Yes, there's the Skyview Business Lounge on the second floor, just past security on your right. With your premium economy upgrade, you actually get complimentary access today. They have comfortable seating, free Wi-Fi, snacks, and a full bar.\n\nThat's amazing! What a nice surprise. Thank you so much for all your help today.\n\nIt's my pleasure! Here's your boarding pass with both flights printed. Have a wonderful journey, and I hope you enjoy the lounge!`,
        wordCount: 530,
        estimatedTime: 14,
        keywords: [
          'check-in counter', 'pull up your reservation', 'confirmed on',
          'estimated arrival time', 'assign your seat', 'preferences',
          'connecting flight', 'deplane', 'fully booked', 'premium economy',
          'upgrade fee', 'tight connection', 'excellent choice', 'process that upgrade',
          'legroom', 'priority boarding', 'carry-on', 'overhead storage',
          'size requirements', 'overhead bin', 'within the allowance', 'luggage tag',
          'keep the receipt', 'layover', 'automatically transferred',
          'that\'s a relief', 'longer wait times', 'complimentary access',
          'boarding pass', 'wonderful journey',
        ],
        focusPoints: [
          'Situações complexas de aeroporto',
          'Negociar upgrades',
          'Perguntar sobre conexões',
          'Vocabulário avançado de viagem',
        ],
        culturalTips: [
          'Perguntar sobre upgrades é completamente normal nos EUA',
          'Staff de companhias aéreas americanas geralmente oferece opções proativamente',
          'Manter recibos de bagagem é importante em voos internacionais',
          'Lounges de aeroporto são um benefício comum para passageiros premium',
        ],
        advancedVocabulary: [
          'deplane', 'premium economy', 'tight connection',
          'legroom', 'overhead bin', 'layover',
          'automatically transferred', 'complimentary access',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: VIDA DIÁRIA
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'daily-life-001',
    title: 'No Supermercado',
    category: 'daily-life',
    difficulty: 'beginner',
    description: 'Fazer compras no supermercado',
    tags: ['shopping', 'grocery', 'daily-routine'],
    durations: {
      5: {
        text: `Excuse me, where can I find the milk?\n\nThe dairy section is in aisle 5, at the back of the store.\n\nThank you. And where are the apples?\n\nFresh produce is right at the entrance, on your left.\n\nPerfect, thanks!\n\nYou're welcome. Have a good day!`,
        wordCount: 50,
        estimatedTime: 3,
        keywords: ['excuse me', 'find', 'dairy section', 'aisle', 'back of the store', 'produce', 'entrance', 'on your left'],
        focusPoints: ['Pedir direções', 'Vocabulário de supermercado'],
      },
      10: {
        text: `Excuse me, hi! I'm looking for the dairy section. Could you point me in the right direction?\n\nOf course! The dairy products are in aisle 5, all the way at the back of the store. You'll find milk, yogurt, cheese, everything dairy there.\n\nGreat, thank you! And while I have you, do you know where I can find fresh apples? I walked around but couldn't spot them.\n\nNo problem! Fresh produce is actually right at the main entrance, on your left side as you walk in. We have a big selection of apples today - Gala, Fuji, Granny Smith.\n\nPerfect! Oh, one more thing - do you have organic options?\n\nYes, we do! In the produce section, organic items are clearly marked with green labels. And we also have a separate organic section in aisle 12 for packaged goods.\n\nThat's really helpful, thanks so much!\n\nYou're very welcome! Is there anything else I can help you find today?\n\nNo, I think that's everything. Thank you!\n\nMy pleasure. Enjoy your shopping!`,
        wordCount: 175,
        estimatedTime: 7,
        keywords: [
          'looking for', 'point me in the right direction', 'all the way',
          'back of the store', 'while I have you', 'couldn\'t spot them',
          'main entrance', 'on your left side', 'big selection',
          'one more thing', 'clearly marked', 'separate section',
          'packaged goods', 'really helpful', 'help you find',
          'my pleasure', 'enjoy your shopping',
        ],
        focusPoints: ['Conversa mais natural', 'Múltiplas perguntas', 'Cortesia'],
      },
      15: {
        text: `Excuse me, hi there! Sorry to bother you, but I'm having a bit of trouble finding what I'm looking for. Could you possibly help me out?\n\nOf course, no bother at all! That's what I'm here for. What are you trying to find today?\n\nWell, I'm looking for the dairy section. I need to grab some milk and cheese, but I've been walking around for a few minutes and I'm a bit turned around.\n\nNo worries at all, it happens! The dairy products are located in aisle 5, all the way at the very back of the store on the left-hand side. You'll find everything dairy there - milk, yogurt, cheese, butter, eggs, the whole works.\n\nAh, perfect! Thank you so much. And actually, while I have you here, I'm also looking for fresh apples but I walked past where I thought produce would be and didn't see them.\n\nOh, you might have walked right past them! Fresh produce is actually positioned right at the main entrance on your left side as you first walk in. It's before you even get to the aisles. We have a really nice selection of apples today, actually. We've got Gala, Fuji, Granny Smith, Honeycrisp - pretty much any variety you could want.\n\nOh wonderful, I must have missed it when I came in. I was probably too focused on finding the dairy section! Quick question though - do you carry organic options? I try to buy organic when possible.\n\nWe absolutely do! That's a great question. In the produce section, all of our organic items are clearly labeled with bright green tags, so they're easy to spot. And for other organic products - like cereals, snacks, canned goods - we have a dedicated organic section in aisle 12, right near the health food items.\n\nThat's really helpful to know, thank you. Oh, and I just thought of something - where would I find olive oil? I need to stock up on that as well.\n\nOlive oil! You'll find that in aisle 8, with all the other cooking oils and vinegars. It's right in the middle of the store. We have quite a variety - everything from basic olive oil to extra virgin, imported Italian brands, flavored oils. Depends on what you're looking for.\n\nExcellent. I think extra virgin is what I need. You've been incredibly helpful - I really appreciate you taking the time to answer all my questions!\n\nOh, it's absolutely my pleasure! That's what I'm here for. Is there anything else at all I can help you locate before you continue shopping?\n\nNo, I think you've covered everything I needed. You've been wonderful, thank you so much!\n\nYou're very welcome! If you need anything else while you're shopping, don't hesitate to ask any of our staff - we're all happy to help. Enjoy the rest of your shopping!\n\nThank you, I will!`,
        wordCount: 450,
        estimatedTime: 14,
        keywords: [
          'sorry to bother you', 'help me out', 'no bother at all', 'turned around',
          'no worries', 'on the left-hand side', 'the whole works',
          'while I have you here', 'walked right past', 'positioned right at',
          'pretty much any variety', 'must have missed it', 'carry organic options',
          'clearly labeled', 'easy to spot', 'dedicated section',
          'stock up on', 'quite a variety', 'extra virgin', 'incredibly helpful',
          'taking the time', 'absolutely my pleasure', 'covered everything',
          'don\'t hesitate to ask',
        ],
        focusPoints: [
          'Conversa natural e fluida',
          'Vocabulário completo de supermercado',
          'Pedir ajuda educadamente',
          'Cortesia americana',
        ],
        culturalTips: [
          'Funcionários de supermercado nos EUA são geralmente muito prestativos',
          '"Sorry to bother you" é uma forma educada comum de abordar alguém',
          'Orgânicos são muito populares e fáceis de encontrar nos EUA',
          '"Don\'t hesitate to ask" é convite genuíno, não apenas formalidade',
        ],
        advancedVocabulary: [
          'turned around', 'the whole works', 'walked right past',
          'stock up on', 'quite a variety', 'don\'t hesitate to ask',
        ],
      },
    },
  },

  {
    id: 'daily-life-002',
    title: 'No Restaurante',
    category: 'daily-life',
    difficulty: 'beginner',
    description: 'Pedir comida em um restaurante',
    tags: ['restaurant', 'food', 'ordering'],
    durations: {
      5: {
        text: `Hi, table for two, please.\n\nRight this way. Here are your menus. Can I start you off with some drinks?\n\nI'll have a water, and she'll have an iced tea.\n\nAre you ready to order, or do you need a few more minutes?\n\nI think we're ready. I'll have the grilled chicken with a side salad.\n\nExcellent choice. And for you, ma'am?\n\nI'll have the pasta, please.\n\nGreat. Your food will be out shortly!`,
        wordCount: 75,
        estimatedTime: 3,
        keywords: ['table for two', 'menus', 'start you off', 'drinks', 'ready to order', 'a few more minutes', 'side salad', 'excellent choice', 'out shortly'],
        focusPoints: ['Vocabulário de restaurante', 'Frases essenciais para pedir'],
      },
      10: {
        text: `Good evening! Welcome to Bella's. Do you have a reservation?\n\nHi! No, we don't. Is there a table available for two?\n\nLet me check... Yes, we have a nice table by the window. Would that work for you?\n\nThat would be perfect!\n\nWonderful. Right this way, please. Here are your menus. Our specials tonight are a pan-seared salmon with roasted vegetables and a mushroom risotto. Can I start you off with something to drink?\n\nI'll have a glass of the house red wine, please.\n\nAnd for you?\n\nJust a sparkling water for me, thanks.\n\nI'll get those right away. Take your time with the menu.\n\n... \n\nHere are your drinks. Are you ready to order, or would you like a few more minutes?\n\nI think we're ready. I have a quick question though - is the salmon gluten-free?\n\nYes, it is! The salmon is served with a lemon butter sauce and seasonal roasted vegetables. No gluten.\n\nPerfect, I'll go with that then.\n\nAnd I'll have the mushroom risotto, please. Could I also get a side Caesar salad to start?\n\nOf course! So that's one salmon, one risotto, and a Caesar to start. I'll put that in right away. Enjoy your evening!\n\nThank you!`,
        wordCount: 210,
        estimatedTime: 7,
        keywords: [
          'reservation', 'table available', 'by the window', 'right this way',
          'specials tonight', 'pan-seared', 'roasted vegetables', 'start you off',
          'house red wine', 'sparkling water', 'right away', 'take your time',
          'ready to order', 'a few more minutes', 'gluten-free', 'lemon butter sauce',
          'seasonal', 'go with that', 'side Caesar salad', 'put that in',
        ],
        focusPoints: ['Pedir mesa sem reserva', 'Perguntar sobre o menu', 'Fazer pedidos específicos'],
      },
      15: {
        text: `Good evening and welcome to Bella's Italian Kitchen! How are you folks doing tonight?\n\nHi there! We're great, thanks. We don't have a reservation, but we were hoping you might have a table for two available?\n\nLet me take a look at what we've got... You're actually in luck! We just had a cancellation, and I have a lovely table by the window that just opened up. Would that work for you?\n\nOh, that would be perfect! We love sitting by the window.\n\nWonderful! Right this way, please. Make yourselves comfortable. Here are your menus, and this is our wine list. Before I go over our specials, can I start you off with something to drink?\n\nI'd love a glass of wine, but I'm not sure what to choose. What would you recommend with pasta?\n\nGreat question! For pasta dishes, I'd suggest either our house Chianti, which is a lovely Italian red with cherry notes, or if you prefer white, we have a beautiful Pinot Grigio that pairs wonderfully with our lighter pasta dishes. It really depends on what you're in the mood for.\n\nThe Chianti sounds perfect. I'll try a glass of that.\n\nExcellent taste! And for you, sir?\n\nI'll just have a sparkling water for now, please. With a slice of lemon if possible.\n\nAbsolutely, coming right up! While I get your drinks, let me tell you about our specials tonight. Our chef has prepared a pan-seared wild salmon with a lemon butter cream sauce, served on a bed of seasonal roasted vegetables. It's been really popular tonight. We also have a wild mushroom risotto with truffle oil and aged parmesan - it's one of our signature dishes and it's absolutely divine.\n\nI'll give you a few minutes to look over the menu, and I'll be right back with your drinks.\n\n... \n\nHere we go - one Chianti and one sparkling water with lemon. Have you had a chance to decide, or would you like a few more minutes?\n\nI think we're almost ready. I do have a couple of questions first though. Is the salmon gluten-free? I have a mild sensitivity.\n\nYes, absolutely! The salmon is completely gluten-free. The sauce is made with butter, lemon, and fresh herbs - no flour or gluten-containing ingredients. And the vegetables are just seasoned with olive oil, salt, and pepper.\n\nPerfect, that's exactly what I needed to hear. I'll go with the salmon then.\n\nWonderful choice! And for you?\n\nI'm torn between the risotto and the chicken parmesan. How big are the portions? I'm pretty hungry.\n\nHonestly, both are quite generous portions. The chicken parm comes with a side of spaghetti, so it's definitely the heartier option. The risotto is filling but a bit lighter.\n\nOkay, I'll go with the chicken parmesan then. And could we also share a Caesar salad to start?\n\nAbsolutely! So that's one salmon, one chicken parmesan, and a Caesar salad to share. Can I interest you in some fresh bread and olive oil for the table while you wait?\n\nYes, please! That sounds wonderful.\n\nPerfect! I'll get everything started for you right away. The salad should be out in about five minutes, and your main courses will follow shortly after. Enjoy your evening!\n\nThank you so much. Everything sounds delicious!`,
        wordCount: 510,
        estimatedTime: 14,
        keywords: [
          'how are you folks', 'we were hoping', 'in luck', 'cancellation',
          'just opened up', 'make yourselves comfortable', 'wine list',
          'go over our specials', 'start you off', 'what would you recommend',
          'pairs wonderfully', 'in the mood for', 'excellent taste', 'coming right up',
          'popular tonight', 'signature dishes', 'absolutely divine',
          'had a chance to decide', 'mild sensitivity', 'completely gluten-free',
          'no gluten-containing ingredients', 'I\'m torn between', 'how big are the portions',
          'quite generous', 'heartier option', 'can I interest you in',
          'for the table', 'get everything started', 'follow shortly after',
        ],
        focusPoints: [
          'Experiência completa de restaurante',
          'Pedir recomendações',
          'Alergias e restrições alimentares',
          'Conversa natural com staff',
        ],
        culturalTips: [
          'É normal pedir recomendações ao garçom nos EUA',
          'Informar sobre alergias é esperado e tratado com seriedade',
          'Bread basket é cortesia em muitos restaurantes americanos',
          'Gorjeta de 18-20% é padrão nos EUA (não inclusa na conta)',
        ],
        advancedVocabulary: [
          'in luck', 'pairs wonderfully', 'in the mood for',
          'absolutely divine', 'I\'m torn between', 'heartier option',
          'can I interest you in',
        ],
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIA: SOCIAL
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'social-001',
    title: 'Happy Hour com Colegas',
    category: 'social',
    difficulty: 'beginner',
    description: 'Socializar com colegas após o trabalho',
    tags: ['happy-hour', 'casual', 'coworkers', 'drinks'],
    durations: {
      5: {
        text: `Hey everyone! Glad you could make it. What's everyone drinking?\n\nI'll have a beer, whatever's on tap.\n\nI'll take a margarita.\n\nSo, how's everyone feeling about the week? Pretty crazy, right?\n\nTell me about it. That deadline on Wednesday nearly killed me.\n\nSame here. But we made it! Cheers to surviving another week!\n\nCheers!`,
        wordCount: 60,
        estimatedTime: 3,
        keywords: ['glad you could make it', 'on tap', 'how\'s everyone feeling', 'pretty crazy', 'tell me about it', 'nearly killed me', 'cheers to'],
        focusPoints: ['Socialização casual', 'Expressões informais'],
      },
      10: {
        text: `Hey everyone! So glad you guys could make it tonight. This place is great - have you been here before?\n\nFirst time! It's got a really cool vibe. What's everyone drinking?\n\nI'll have a craft beer - whatever IPA they have on tap.\n\nI'm in the mood for something different. Maybe a cocktail. What's good here?\n\nTheir signature Old Fashioned is amazing. I had it last time and it was probably the best one I've ever had.\n\nSold! I'll go with that.\n\nSo, how's everyone feeling about the week? I feel like it was absolutely insane.\n\nOh my god, tell me about it. That deadline on Wednesday almost broke me. I was up until midnight Tuesday getting everything ready.\n\nSame here. I barely slept. But honestly, the presentation went really well, so it was worth it in the end.\n\nThat's true. Our manager even said it was one of the best ones she'd seen. So maybe all the stress paid off!\n\nDefinitely. Hey, speaking of good news - did you guys hear about the team outing next month? Apparently they're planning something fun.\n\nNo way! What is it?\n\nI heard it might be go-karting. Don't quote me on that though.\n\nThat would be amazing! I'd totally destroy you guys at that.\n\nOh, it's on! I'm pretty competitive when it comes to racing.\n\nHa! We'll see about that. Anyway, cheers to surviving another week and to good times ahead!\n\nCheers!`,
        wordCount: 230,
        estimatedTime: 8,
        keywords: [
          'glad you could make it', 'cool vibe', 'on tap', 'in the mood for',
          'signature', 'sold', 'absolutely insane', 'tell me about it',
          'almost broke me', 'up until midnight', 'worth it in the end',
          'stress paid off', 'speaking of', 'team outing', 'don\'t quote me',
          'totally destroy', 'it\'s on', 'competitive', 'cheers to',
        ],
        focusPoints: ['Happy hour casual', 'Humor e camaradagem', 'Transições naturais'],
      },
      15: {
        text: `Hey hey! Look who finally made it! I was starting to think you guys bailed on me.\n\nSorry, sorry! Traffic was absolutely brutal tonight. I thought I'd never get here. But we're here now - that's what counts!\n\nNo worries at all! I already snagged us this awesome booth in the corner. Have you been to this place before? It just opened like two months ago.\n\nFirst time for me! I love the atmosphere though. Very chill, great music. This might become our new regular spot.\n\nRight? That's exactly what I was thinking! Okay, so what's everyone drinking? First round's on me.\n\nOh wow, generous! In that case, I'll have a craft beer. Whatever IPA they have on tap looks good.\n\nI'm feeling adventurous tonight. What do they have for cocktails?\n\nTheir cocktail menu is actually incredible. I had their signature Old Fashioned last time I was here, and I kid you not, it was probably the best one I've ever had in my life. They use this smoked bourbon that's absolutely phenomenal.\n\nSay no more - I'm sold! I'll go with that.\n\nGreat choice! I'll grab a gin and tonic for myself. Be right back.\n\n...\n\nHere we go! Drinks are served. So - let's talk about the elephant in the room. How's everyone feeling about this week? Because personally, I'm pretty sure it shaved at least five years off my life.\n\nOh my god, tell me about it. That deadline on Wednesday was absolutely brutal. I was literally at my desk until midnight on Tuesday, and I'm pretty sure I survived on nothing but coffee and stress.\n\nSame! My partner thought I'd moved into the office permanently. But I have to say, when I finally submitted that presentation, it felt amazing. Like this massive weight just lifted off my shoulders.\n\nI totally know that feeling. And you know what? It was worth it. Did you hear what our manager said? She told me privately that our presentation was one of the best she'd seen all quarter. She's even planning to share it with the executive team.\n\nSeriously?! That's incredible! See, all that stress actually paid off.\n\nAbsolutely. I think we should be proud of ourselves. We pulled together as a team when it really mattered.\n\nSpeaking of the team - did you guys hear about the team outing they're planning for next month? I got a sneak peek at the options.\n\nNo way! Spill the beans! What is it?\n\nOkay, so don't quote me on this, but I heard it's going to be go-karting, followed by dinner at that new Brazilian steakhouse downtown.\n\nOh. My. God. That sounds absolutely amazing! I am so competitive when it comes to racing. I'm already mentally preparing to destroy you all.\n\nBring it on! I'll have you know I was the go-kart champion at my friend's birthday party last year. Undefeated.\n\nHa! Big words coming from someone who can barely parallel park!\n\nOkay, low blow! That was ONE time, and it was raining!\n\nI'm just messing with you. But seriously, it's going to be so much fun. These are the kinds of things that make working together actually enjoyable, you know?\n\nTotally agree. We spend so much time stressed about deadlines and deliverables, it's nice to just hang out and be normal humans for a change.\n\nAbsolutely. Alright, I want to make a toast. Here's to surviving another crazy week, to an amazing team, and to whatever adventures next month brings. Cheers!\n\nCheers! 🥂`,
        wordCount: 530,
        estimatedTime: 14,
        keywords: [
          'look who finally made it', 'bailed on me', 'traffic was brutal',
          'that\'s what counts', 'snagged us', 'regular spot', 'first round\'s on me',
          'feeling adventurous', 'I kid you not', 'phenomenal', 'say no more', 'sold',
          'elephant in the room', 'shaved years off my life', 'tell me about it',
          'survived on nothing but', 'moved into the office', 'weight lifted off',
          'paid off', 'pulled together', 'sneak peek', 'spill the beans',
          'don\'t quote me', 'mentally preparing', 'bring it on', 'undefeated',
          'low blow', 'just messing with you', 'for a change',
          'make a toast', 'cheers',
        ],
        focusPoints: [
          'Socialização natural e divertida',
          'Humor entre amigos/colegas',
          'Gírias e expressões informais',
          'Fazer brindades',
        ],
        culturalTips: [
          'Happy hour é tradição importante na cultura corporativa americana',
          '"First round\'s on me" é gesto generoso e comum entre amigos',
          'Humor leve e provocações amigáveis são parte da camaradagem',
          'Brindar é geralmente casual: "Cheers to..." seguido do motivo',
        ],
        advancedVocabulary: [
          'bailed on me', 'snagged us', 'I kid you not',
          'elephant in the room', 'spill the beans', 'low blow',
          'just messing with you', 'for a change',
        ],
      },
    },
  },
];
