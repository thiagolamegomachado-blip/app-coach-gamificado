import { StoreItem } from './types'

// Store items database
export const STORE_ITEMS: StoreItem[] = [
  // VIP SUBSCRIPTION
  {
    id: 'vip_monthly',
    type: 'vip_subscription',
    title: 'EvoluaAI VIP',
    description: 'Acesso completo a todas as funcionalidades premium',
    price: 29.90,
    currency: 'BRL',
    isPopular: true,
    benefits: [
      'Todas as missões desbloqueadas',
      'IA avançada com análises profundas',
      '2x XP em todas as missões',
      'Relatórios personalizados',
      'Suporte prioritário',
      'Acesso antecipado a novos recursos',
      'Sem anúncios'
    ],
    category: 'subscription'
  },
  {
    id: 'vip_trial',
    type: 'vip_subscription',
    title: 'Teste VIP - 7 dias',
    description: 'Experimente todos os recursos premium por uma semana',
    price: 1.00,
    currency: 'BRL',
    discount: 97, // 97% off
    isLimitedTime: true,
    benefits: [
      'Acesso completo por 7 dias',
      'Todas as missões premium',
      'IA avançada',
      'Relatórios detalhados',
      'Cancele quando quiser'
    ],
    category: 'trial'
  },

  // MISSION UNLOCKS
  {
    id: 'unlock_productivity_advanced',
    type: 'mission_unlock',
    title: 'Pacote Produtividade Avançada',
    description: 'Desbloqueie 5 missões premium de produtividade',
    price: 12.90,
    currency: 'BRL',
    benefits: [
      'Análise profunda de metas',
      'Sistema GTD personalizado',
      'Otimização de energia pessoal',
      'Automação de rotinas',
      'Planejamento estratégico'
    ],
    category: 'productivity'
  },
  {
    id: 'unlock_single_mission',
    type: 'mission_unlock',
    title: 'Desbloqueio Individual',
    description: 'Desbloqueie qualquer missão premium',
    price: 4.90,
    currency: 'BRL',
    benefits: [
      'Acesso permanente à missão',
      'IA avançada para a missão',
      'Relatório detalhado',
      'Dicas personalizadas'
    ],
    category: 'individual'
  },

  // LEVEL BOOSTS
  {
    id: 'level_boost_small',
    type: 'level_boost',
    title: 'Impulso de Nível (+1)',
    description: 'Avance 1 nível instantaneamente',
    price: 7.90,
    currency: 'BRL',
    benefits: [
      '+1 nível imediato',
      'Desbloqueie novas missões',
      'Acesso a recursos do próximo nível'
    ],
    category: 'boost'
  },
  {
    id: 'level_boost_medium',
    type: 'level_boost',
    title: 'Impulso de Nível (+3)',
    description: 'Avance 3 níveis instantaneamente',
    price: 19.90,
    currency: 'BRL',
    discount: 15,
    benefits: [
      '+3 níveis imediatos',
      'Desbloqueie múltiplas missões',
      'Acesso rápido a recursos avançados'
    ],
    category: 'boost'
  },

  // POWER-UPS
  {
    id: 'xp_multiplier',
    type: 'power_up',
    title: 'Multiplicador de XP (24h)',
    description: '2x XP por 24 horas em todas as missões',
    price: 3.90,
    currency: 'BRL',
    benefits: [
      'Dobra XP por 24 horas',
      'Aplica a todas as missões',
      'Acelera progressão'
    ],
    category: 'powerup'
  },
  {
    id: 'streak_protection',
    type: 'power_up',
    title: 'Proteção de Sequência',
    description: 'Protege sua sequência por 3 dias se você esquecer',
    price: 2.90,
    currency: 'BRL',
    benefits: [
      'Mantém sequência por 3 dias',
      'Proteção automática',
      'Paz de espírito'
    ],
    category: 'powerup'
  },

  // COSMETICS
  {
    id: 'avatar_premium_pack',
    type: 'cosmetic',
    title: 'Pack de Avatares Premium',
    description: 'Coleção exclusiva de avatares personalizados',
    price: 8.90,
    currency: 'BRL',
    benefits: [
      '10 avatares exclusivos',
      'Designs únicos',
      'Mostre seu estilo',
      'Colecionável'
    ],
    category: 'cosmetic'
  },
  {
    id: 'badge_collector',
    type: 'cosmetic',
    title: 'Coleção de Badges Raras',
    description: 'Badges exclusivas para mostrar suas conquistas',
    price: 5.90,
    currency: 'BRL',
    benefits: [
      '5 badges raras',
      'Designs exclusivos',
      'Status diferenciado',
      'Colecionável'
    ],
    category: 'cosmetic'
  },

  // BUNDLES
  {
    id: 'starter_bundle',
    type: 'mission_unlock',
    title: 'Pacote Iniciante',
    description: 'Tudo que você precisa para começar forte',
    price: 24.90,
    currency: 'BRL',
    discount: 30,
    isPopular: true,
    benefits: [
      '3 missões premium desbloqueadas',
      '1 impulso de nível',
      'Multiplicador XP por 48h',
      'Pack de avatares básico',
      'Proteção de sequência'
    ],
    category: 'bundle'
  },
  {
    id: 'professional_bundle',
    type: 'mission_unlock',
    title: 'Pacote Profissional',
    description: 'Para quem quer maximizar produtividade e crescimento',
    price: 79.90,
    currency: 'BRL',
    discount: 40,
    benefits: [
      'Todas as missões de produtividade',
      'Coach de carreira IA',
      'Relatórios avançados',
      'Integração com ferramentas',
      'Suporte prioritário',
      '30 dias de VIP inclusos'
    ],
    category: 'bundle'
  },

  // LIMITED TIME OFFERS
  {
    id: 'black_friday_bundle',
    type: 'mission_unlock',
    title: 'Oferta Black Friday',
    description: 'Pacote completo com desconto especial',
    price: 49.90,
    currency: 'BRL',
    discount: 70,
    isLimitedTime: true,
    expiresAt: new Date('2024-12-01'),
    benefits: [
      'Acesso VIP por 3 meses',
      'Todas as missões desbloqueadas',
      'Pack completo de cosméticos',
      'Relatórios premium',
      'Suporte VIP'
    ],
    category: 'special'
  }
]

// Store categories
export const STORE_CATEGORIES = {
  subscription: {
    name: 'Assinaturas',
    description: 'Acesso completo e contínuo',
    icon: 'Crown'
  },
  productivity: {
    name: 'Produtividade',
    description: 'Missões para otimizar sua eficiência',
    icon: 'Target'
  },
  boost: {
    name: 'Impulsos',
    description: 'Acelere seu progresso',
    icon: 'Zap'
  },
  powerup: {
    name: 'Power-ups',
    description: 'Vantagens temporárias',
    icon: 'Star'
  },
  cosmetic: {
    name: 'Personalização',
    description: 'Customize sua experiência',
    icon: 'Palette'
  },
  bundle: {
    name: 'Pacotes',
    description: 'Ofertas especiais com desconto',
    icon: 'Gift'
  }
} as const

// Helper functions
export const getStoreItemsByCategory = (category: string): StoreItem[] => {
  return STORE_ITEMS.filter(item => item.category === category)
}

export const getPopularItems = (): StoreItem[] => {
  return STORE_ITEMS.filter(item => item.isPopular)
}

export const getLimitedTimeOffers = (): StoreItem[] => {
  const now = new Date()
  return STORE_ITEMS.filter(item => 
    item.isLimitedTime && 
    (!item.expiresAt || item.expiresAt > now)
  )
}

export const getStoreItemById = (id: string): StoreItem | undefined => {
  return STORE_ITEMS.find(item => item.id === id)
}

export const calculateDiscountedPrice = (item: StoreItem): number => {
  if (!item.discount) return item.price
  return item.price * (1 - item.discount / 100)
}

export const formatPrice = (price: number, currency: string = 'BRL'): string => {
  if (currency === 'BRL') {
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }
  return `$${price.toFixed(2)}`
}

export const getRecommendedItems = (userLevel: number, completedMissions: number): StoreItem[] => {
  const recommendations: StoreItem[] = []
  
  // Recommend VIP if user is active
  if (completedMissions >= 5) {
    const vipTrial = STORE_ITEMS.find(item => item.id === 'vip_trial')
    if (vipTrial) recommendations.push(vipTrial)
  }
  
  // Recommend level boosts if user is progressing slowly
  if (userLevel < 5 && completedMissions >= 10) {
    const levelBoost = STORE_ITEMS.find(item => item.id === 'level_boost_small')
    if (levelBoost) recommendations.push(levelBoost)
  }
  
  // Recommend productivity pack for higher level users
  if (userLevel >= 5) {
    const productivityPack = STORE_ITEMS.find(item => item.id === 'unlock_productivity_advanced')
    if (productivityPack) recommendations.push(productivityPack)
  }
  
  // Always recommend starter bundle for new users
  if (completedMissions < 3) {
    const starterBundle = STORE_ITEMS.find(item => item.id === 'starter_bundle')
    if (starterBundle) recommendations.push(starterBundle)
  }
  
  return recommendations.slice(0, 3) // Max 3 recommendations
}

// Purchase simulation (in real app, this would integrate with payment processor)
export const simulatePurchase = (itemId: string, userId: string): Promise<{
  success: boolean
  transactionId?: string
  error?: string
}> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const item = getStoreItemById(itemId)
      if (!item) {
        resolve({ success: false, error: 'Item não encontrado' })
        return
      }
      
      // Simulate 95% success rate
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        })
      } else {
        resolve({
          success: false,
          error: 'Falha no processamento do pagamento. Tente novamente.'
        })
      }
    }, 2000)
  })
}