import { Mission, MissionCategory } from './types'

// Comprehensive mission database with AI prompts
export const MISSIONS_DATABASE: Mission[] = [
  // PRODUCTIVITY MISSIONS
  {
    id: 'prod_001',
    title: 'Organize sua manhã',
    description: 'Crie um plano de 3 tarefas prioritárias para hoje usando IA',
    category: 'productivity',
    xpReward: 50,
    timeEstimate: '5 min',
    timeEstimateMinutes: 5,
    difficulty: 'easy',
    isLocked: false,
    requiredLevel: 1,
    tags: ['planejamento', 'priorização', 'manhã'],
    aiPrompt: 'Ajude o usuário a identificar e priorizar 3 tarefas importantes para hoje. Considere urgência, impacto e energia necessária. Forneça dicas de produtividade.',
    steps: [
      { id: '1', title: 'Liste suas tarefas pendentes', description: 'Anote tudo que precisa fazer hoje', isCompleted: false },
      { id: '2', title: 'Priorize por impacto', description: 'Escolha as 3 mais importantes', isCompleted: false },
      { id: '3', title: 'Defina horários', description: 'Agende quando fará cada uma', isCompleted: false }
    ],
    completionCriteria: ['3 tarefas priorizadas', 'Horários definidos', 'Plano revisado']
  },
  {
    id: 'prod_002',
    title: 'Técnica Pomodoro Inteligente',
    description: 'Use IA para otimizar seus ciclos de foco e descanso',
    category: 'productivity',
    xpReward: 75,
    timeEstimate: '25 min',
    timeEstimateMinutes: 25,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 2,
    tags: ['foco', 'pomodoro', 'concentração'],
    aiPrompt: 'Guie o usuário através de uma sessão Pomodoro personalizada. Sugira a melhor tarefa para focar, dicas para manter concentração e atividades ideais para o intervalo.',
    steps: [
      { id: '1', title: 'Escolha uma tarefa específica', description: 'Defina exatamente o que vai fazer', isCompleted: false },
      { id: '2', title: 'Configure o ambiente', description: 'Elimine distrações', isCompleted: false },
      { id: '3', title: 'Trabalhe por 25 minutos', description: 'Foque apenas na tarefa escolhida', isCompleted: false },
      { id: '4', title: 'Faça uma pausa de 5 minutos', description: 'Relaxe e recarregue', isCompleted: false }
    ],
    completionCriteria: ['25 minutos de foco', 'Tarefa avançada', 'Pausa realizada']
  },
  {
    id: 'prod_003',
    title: 'Inbox Zero Challenge',
    description: 'Organize completamente sua caixa de entrada com estratégias de IA',
    category: 'productivity',
    xpReward: 100,
    timeEstimate: '15 min',
    timeEstimateMinutes: 15,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 3,
    tags: ['email', 'organização', 'comunicação'],
    aiPrompt: 'Ajude o usuário a processar emails eficientemente usando a regra dos 2 minutos, categorização inteligente e templates de resposta.',
    steps: [
      { id: '1', title: 'Aplique a regra dos 2 minutos', description: 'Responda emails rápidos imediatamente', isCompleted: false },
      { id: '2', title: 'Categorize emails importantes', description: 'Organize por prioridade e tipo', isCompleted: false },
      { id: '3', title: 'Agende emails complexos', description: 'Defina quando vai lidar com cada um', isCompleted: false },
      { id: '4', title: 'Configure filtros automáticos', description: 'Automatize a organização futura', isCompleted: false }
    ],
    completionCriteria: ['Inbox processado', 'Emails categorizados', 'Sistema de organização criado']
  },

  // HEALTH & WELLNESS MISSIONS
  {
    id: 'health_001',
    title: 'Reflexão diária',
    description: 'Responda 3 perguntas sobre seu dia com análise de IA',
    category: 'health',
    xpReward: 60,
    timeEstimate: '8 min',
    timeEstimateMinutes: 8,
    difficulty: 'easy',
    isLocked: false,
    requiredLevel: 1,
    tags: ['reflexão', 'autoconhecimento', 'bem-estar'],
    aiPrompt: 'Conduza uma sessão de reflexão diária personalizada. Faça perguntas profundas sobre o dia do usuário e forneça insights sobre padrões e oportunidades de crescimento.',
    steps: [
      { id: '1', title: 'Reflita sobre conquistas', description: 'O que deu certo hoje?', isCompleted: false },
      { id: '2', title: 'Identifique desafios', description: 'Quais foram as dificuldades?', isCompleted: false },
      { id: '3', title: 'Planeje melhorias', description: 'Como pode ser melhor amanhã?', isCompleted: false }
    ],
    completionCriteria: ['3 reflexões completadas', 'Insights identificados', 'Plano de melhoria criado']
  },
  {
    id: 'health_002',
    title: 'Mindfulness Express',
    description: 'Sessão de mindfulness de 5 minutos guiada por IA',
    category: 'health',
    xpReward: 40,
    timeEstimate: '5 min',
    timeEstimateMinutes: 5,
    difficulty: 'easy',
    isLocked: false,
    requiredLevel: 1,
    tags: ['mindfulness', 'meditação', 'relaxamento'],
    aiPrompt: 'Guie o usuário através de uma sessão de mindfulness personalizada. Adapte as instruções ao nível de experiência e estado emocional atual.',
    steps: [
      { id: '1', title: 'Encontre uma posição confortável', description: 'Sente-se ou deite-se confortavelmente', isCompleted: false },
      { id: '2', title: 'Foque na respiração', description: 'Observe sua respiração natural', isCompleted: false },
      { id: '3', title: 'Escaneie o corpo', description: 'Note sensações sem julgamento', isCompleted: false },
      { id: '4', title: 'Retorne gentilmente', description: 'Volte ao momento presente', isCompleted: false }
    ],
    completionCriteria: ['5 minutos de prática', 'Foco mantido', 'Estado de calma alcançado']
  },
  {
    id: 'health_003',
    title: 'Análise de Energia Pessoal',
    description: 'Descubra seus picos de energia e otimize sua rotina',
    category: 'health',
    xpReward: 90,
    timeEstimate: '12 min',
    timeEstimateMinutes: 12,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 4,
    tags: ['energia', 'ritmo circadiano', 'otimização'],
    aiPrompt: 'Ajude o usuário a mapear seus níveis de energia ao longo do dia e criar estratégias para otimizar produtividade e bem-estar baseado em seu cronótipo.',
    steps: [
      { id: '1', title: 'Mapeie sua energia', description: 'Identifique picos e quedas de energia', isCompleted: false },
      { id: '2', title: 'Analise padrões', description: 'Encontre correlações com atividades', isCompleted: false },
      { id: '3', title: 'Otimize sua agenda', description: 'Alinhe tarefas com níveis de energia', isCompleted: false }
    ],
    completionCriteria: ['Mapa de energia criado', 'Padrões identificados', 'Rotina otimizada']
  },

  // SOCIAL MISSIONS
  {
    id: 'social_001',
    title: 'Networking inteligente',
    description: 'Gere uma mensagem personalizada para um contato profissional',
    category: 'social',
    xpReward: 80,
    timeEstimate: '10 min',
    timeEstimateMinutes: 10,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 2,
    tags: ['networking', 'comunicação', 'relacionamentos'],
    aiPrompt: 'Ajude o usuário a criar mensagens de networking autênticas e eficazes. Considere o contexto, objetivo e personalidade do destinatário.',
    steps: [
      { id: '1', title: 'Defina o objetivo', description: 'Por que está entrando em contato?', isCompleted: false },
      { id: '2', title: 'Pesquise o contato', description: 'Encontre pontos em comum', isCompleted: false },
      { id: '3', title: 'Crie a mensagem', description: 'Escreva de forma pessoal e autêntica', isCompleted: false },
      { id: '4', title: 'Revise e envie', description: 'Verifique tom e clareza', isCompleted: false }
    ],
    completionCriteria: ['Objetivo definido', 'Pesquisa realizada', 'Mensagem enviada']
  },
  {
    id: 'social_002',
    title: 'Gratidão Ativa',
    description: 'Expresse gratidão genuína para 3 pessoas importantes',
    category: 'social',
    xpReward: 70,
    timeEstimate: '15 min',
    timeEstimateMinutes: 15,
    difficulty: 'easy',
    isLocked: false,
    requiredLevel: 1,
    tags: ['gratidão', 'relacionamentos', 'positividade'],
    aiPrompt: 'Guie o usuário para expressar gratidão de forma significativa e específica. Ajude a identificar momentos e qualidades específicas para agradecer.',
    steps: [
      { id: '1', title: 'Identifique 3 pessoas', description: 'Escolha pessoas que impactaram sua vida', isCompleted: false },
      { id: '2', title: 'Lembre momentos específicos', description: 'Pense em situações concretas', isCompleted: false },
      { id: '3', title: 'Expresse sua gratidão', description: 'Comunique de forma genuína', isCompleted: false }
    ],
    completionCriteria: ['3 pessoas identificadas', 'Gratidão expressa', 'Conexões fortalecidas']
  },

  // LEARNING MISSIONS
  {
    id: 'learn_001',
    title: 'Aprendizado Ativo de 10 Minutos',
    description: 'Aprenda algo novo usando técnicas de retenção com IA',
    category: 'learning',
    xpReward: 85,
    timeEstimate: '10 min',
    timeEstimateMinutes: 10,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 2,
    tags: ['aprendizado', 'conhecimento', 'retenção'],
    aiPrompt: 'Guie o usuário através de uma sessão de aprendizado otimizada usando técnicas como spaced repetition, active recall e elaborative interrogation.',
    steps: [
      { id: '1', title: 'Escolha um tópico', description: 'Defina o que quer aprender', isCompleted: false },
      { id: '2', title: 'Estude ativamente', description: 'Faça perguntas e conexões', isCompleted: false },
      { id: '3', title: 'Teste seu conhecimento', description: 'Explique o que aprendeu', isCompleted: false },
      { id: '4', title: 'Planeje revisão', description: 'Agende quando vai revisar', isCompleted: false }
    ],
    completionCriteria: ['Tópico estudado', 'Conhecimento testado', 'Revisão agendada']
  },
  {
    id: 'learn_002',
    title: 'Síntese Inteligente',
    description: 'Transforme um artigo longo em insights acionáveis',
    category: 'learning',
    xpReward: 95,
    timeEstimate: '15 min',
    timeEstimateMinutes: 15,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 3,
    tags: ['síntese', 'análise', 'insights'],
    aiPrompt: 'Ajude o usuário a extrair insights valiosos de conteúdo complexo usando técnicas de síntese e análise crítica.',
    steps: [
      { id: '1', title: 'Leia com propósito', description: 'Defina o que busca no conteúdo', isCompleted: false },
      { id: '2', title: 'Identifique pontos-chave', description: 'Marque ideias principais', isCompleted: false },
      { id: '3', title: 'Crie conexões', description: 'Relacione com conhecimento prévio', isCompleted: false },
      { id: '4', title: 'Gere insights acionáveis', description: 'Transforme em ações práticas', isCompleted: false }
    ],
    completionCriteria: ['Conteúdo analisado', 'Pontos-chave identificados', 'Insights gerados']
  },

  // CREATIVITY MISSIONS
  {
    id: 'creative_001',
    title: 'Brainstorm Criativo',
    description: 'Gere 10 ideias inovadoras para um desafio pessoal',
    category: 'creativity',
    xpReward: 75,
    timeEstimate: '12 min',
    timeEstimateMinutes: 12,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 2,
    tags: ['criatividade', 'ideação', 'inovação'],
    aiPrompt: 'Facilite uma sessão de brainstorming usando técnicas como SCAMPER, pensamento lateral e associação livre para gerar ideias inovadoras.',
    steps: [
      { id: '1', title: 'Defina o desafio', description: 'Formule o problema claramente', isCompleted: false },
      { id: '2', title: 'Gere ideias livremente', description: 'Sem julgamento, quantidade primeiro', isCompleted: false },
      { id: '3', title: 'Use técnicas criativas', description: 'Aplique SCAMPER ou analogias', isCompleted: false },
      { id: '4', title: 'Selecione as melhores', description: 'Escolha 3 ideias mais promissoras', isCompleted: false }
    ],
    completionCriteria: ['Desafio definido', '10 ideias geradas', 'Top 3 selecionadas']
  },

  // FINANCE MISSIONS
  {
    id: 'finance_001',
    title: 'Análise Financeira Rápida',
    description: 'Avalie seus gastos do mês com insights de IA',
    category: 'finance',
    xpReward: 90,
    timeEstimate: '10 min',
    timeEstimateMinutes: 10,
    difficulty: 'medium',
    isLocked: false,
    requiredLevel: 3,
    tags: ['finanças', 'análise', 'orçamento'],
    aiPrompt: 'Ajude o usuário a analisar seus gastos mensais, identificar padrões e oportunidades de economia com base em princípios de educação financeira.',
    steps: [
      { id: '1', title: 'Liste gastos principais', description: 'Identifique maiores categorias de gasto', isCompleted: false },
      { id: '2', title: 'Analise padrões', description: 'Encontre tendências e surpresas', isCompleted: false },
      { id: '3', title: 'Identifique oportunidades', description: 'Onde pode economizar?', isCompleted: false },
      { id: '4', title: 'Crie plano de ação', description: 'Defina metas para próximo mês', isCompleted: false }
    ],
    completionCriteria: ['Gastos analisados', 'Padrões identificados', 'Plano criado']
  },

  // PREMIUM/LOCKED MISSIONS
  {
    id: 'premium_001',
    title: 'Análise profunda de metas',
    description: 'Use IA avançada para quebrar uma meta em micro-passos executáveis',
    category: 'productivity',
    xpReward: 150,
    timeEstimate: '20 min',
    timeEstimateMinutes: 20,
    difficulty: 'hard',
    isLocked: true,
    requiredLevel: 5,
    unlockPrice: 7,
    isPremium: true,
    tags: ['metas', 'planejamento', 'estratégia'],
    aiPrompt: 'Conduza uma análise profunda de metas usando frameworks como SMART, OKRs e backward planning. Crie um roadmap detalhado com marcos e métricas.',
    steps: [
      { id: '1', title: 'Defina meta SMART', description: 'Torne sua meta específica e mensurável', isCompleted: false },
      { id: '2', title: 'Mapeie obstáculos', description: 'Identifique possíveis desafios', isCompleted: false },
      { id: '3', title: 'Crie micro-passos', description: 'Divida em ações de 15 minutos', isCompleted: false },
      { id: '4', title: 'Defina marcos', description: 'Estabeleça pontos de verificação', isCompleted: false },
      { id: '5', title: 'Configure métricas', description: 'Como vai medir progresso?', isCompleted: false }
    ],
    completionCriteria: ['Meta SMART definida', 'Roadmap criado', 'Métricas estabelecidas']
  },
  {
    id: 'premium_002',
    title: 'Coach de Carreira IA',
    description: 'Sessão completa de coaching de carreira com análise personalizada',
    category: 'learning',
    xpReward: 200,
    timeEstimate: '25 min',
    timeEstimateMinutes: 25,
    difficulty: 'hard',
    isLocked: true,
    requiredLevel: 8,
    unlockPrice: 12,
    isPremium: true,
    tags: ['carreira', 'coaching', 'desenvolvimento'],
    aiPrompt: 'Conduza uma sessão completa de coaching de carreira, incluindo análise SWOT pessoal, mapeamento de competências e plano de desenvolvimento profissional.',
    steps: [
      { id: '1', title: 'Análise SWOT pessoal', description: 'Forças, fraquezas, oportunidades e ameaças', isCompleted: false },
      { id: '2', title: 'Mapeamento de competências', description: 'Skills atuais vs. desejadas', isCompleted: false },
      { id: '3', title: 'Visão de carreira', description: 'Onde quer estar em 2-5 anos?', isCompleted: false },
      { id: '4', title: 'Plano de desenvolvimento', description: 'Ações concretas para crescer', isCompleted: false },
      { id: '5', title: 'Network strategy', description: 'Como expandir sua rede profissional', isCompleted: false }
    ],
    completionCriteria: ['SWOT completa', 'Gap de skills identificado', 'Plano de ação criado']
  }
]

// Mission categories with metadata
export const MISSION_CATEGORIES: Record<MissionCategory, {
  name: string
  description: string
  color: string
  icon: string
  unlockLevel: number
}> = {
  productivity: {
    name: 'Produtividade',
    description: 'Organize sua vida e maximize sua eficiência',
    color: 'blue',
    icon: 'Target',
    unlockLevel: 1
  },
  health: {
    name: 'Bem-estar',
    description: 'Cuide da sua saúde mental e física',
    color: 'green',
    icon: 'Heart',
    unlockLevel: 1
  },
  social: {
    name: 'Social',
    description: 'Fortaleça relacionamentos e habilidades sociais',
    color: 'purple',
    icon: 'Users',
    unlockLevel: 2
  },
  learning: {
    name: 'Aprendizado',
    description: 'Desenvolva novas habilidades e conhecimentos',
    color: 'orange',
    icon: 'Brain',
    unlockLevel: 2
  },
  creativity: {
    name: 'Criatividade',
    description: 'Explore sua criatividade e inovação',
    color: 'pink',
    icon: 'Palette',
    unlockLevel: 3
  },
  finance: {
    name: 'Finanças',
    description: 'Gerencie melhor seu dinheiro e investimentos',
    color: 'yellow',
    icon: 'DollarSign',
    unlockLevel: 4
  }
}

// Helper functions
export const getMissionsByCategory = (category: MissionCategory): Mission[] => {
  return MISSIONS_DATABASE.filter(mission => mission.category === category)
}

export const getMissionsByLevel = (userLevel: number): Mission[] => {
  return MISSIONS_DATABASE.filter(mission => mission.requiredLevel <= userLevel)
}

export const getAvailableMissions = (userLevel: number): Mission[] => {
  return MISSIONS_DATABASE.filter(mission => 
    mission.requiredLevel <= userLevel && !mission.isLocked
  )
}

export const getLockedMissions = (userLevel: number): Mission[] => {
  return MISSIONS_DATABASE.filter(mission => 
    mission.requiredLevel <= userLevel && mission.isLocked
  )
}

export const getPremiumMissions = (): Mission[] => {
  return MISSIONS_DATABASE.filter(mission => mission.isPremium)
}

export const getMissionById = (id: string): Mission | undefined => {
  return MISSIONS_DATABASE.find(mission => mission.id === id)
}

export const getRandomMission = (category?: MissionCategory, difficulty?: 'easy' | 'medium' | 'hard'): Mission | undefined => {
  let filtered = MISSIONS_DATABASE.filter(mission => !mission.isLocked)
  
  if (category) {
    filtered = filtered.filter(mission => mission.category === category)
  }
  
  if (difficulty) {
    filtered = filtered.filter(mission => mission.difficulty === difficulty)
  }
  
  if (filtered.length === 0) return undefined
  
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export const getDailyMissions = (userLevel: number): Mission[] => {
  const available = getAvailableMissions(userLevel)
  const categories = Object.keys(MISSION_CATEGORIES) as MissionCategory[]
  const dailyMissions: Mission[] = []
  
  // Get one mission from each unlocked category
  categories.forEach(category => {
    const categoryMissions = available.filter(m => m.category === category)
    if (categoryMissions.length > 0) {
      const randomMission = categoryMissions[Math.floor(Math.random() * categoryMissions.length)]
      dailyMissions.push(randomMission)
    }
  })
  
  return dailyMissions.slice(0, 3) // Max 3 daily missions
}