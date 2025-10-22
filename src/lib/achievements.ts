import { Achievement } from './types'

// Achievements database
export const ACHIEVEMENTS: Achievement[] = [
  // STREAK ACHIEVEMENTS
  {
    id: 'streak_3',
    title: 'Começando Bem',
    description: 'Complete missões por 3 dias seguidos',
    icon: 'Flame',
    category: 'streak',
    rarity: 'common',
    unlockedAt: new Date() // Will be set when unlocked
  },
  {
    id: 'streak_7',
    title: 'Uma Semana Forte',
    description: 'Mantenha uma sequência de 7 dias',
    icon: 'Fire',
    category: 'streak',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'streak_30',
    title: 'Mestre da Consistência',
    description: 'Sequência incrível de 30 dias',
    icon: 'Crown',
    category: 'streak',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'streak_100',
    title: 'Lenda da Disciplina',
    description: 'Sequência épica de 100 dias',
    icon: 'Trophy',
    category: 'streak',
    rarity: 'legendary',
    unlockedAt: new Date()
  },

  // MISSION ACHIEVEMENTS
  {
    id: 'missions_10',
    title: 'Explorador',
    description: 'Complete 10 missões',
    icon: 'Map',
    category: 'missions',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'missions_50',
    title: 'Aventureiro',
    description: 'Complete 50 missões',
    icon: 'Compass',
    category: 'missions',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'missions_100',
    title: 'Veterano',
    description: 'Complete 100 missões',
    icon: 'Shield',
    category: 'missions',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'missions_500',
    title: 'Mestre das Missões',
    description: 'Complete 500 missões',
    icon: 'Star',
    category: 'missions',
    rarity: 'epic',
    unlockedAt: new Date()
  },

  // XP ACHIEVEMENTS
  {
    id: 'xp_1000',
    title: 'Primeiro Milhar',
    description: 'Acumule 1.000 XP',
    icon: 'Zap',
    category: 'xp',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'xp_10000',
    title: 'Colecionador de XP',
    description: 'Acumule 10.000 XP',
    icon: 'Battery',
    category: 'xp',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'xp_50000',
    title: 'Fonte de Energia',
    description: 'Acumule 50.000 XP',
    icon: 'Bolt',
    category: 'xp',
    rarity: 'epic',
    unlockedAt: new Date()
  },

  // SOCIAL ACHIEVEMENTS
  {
    id: 'social_first_share',
    title: 'Compartilhador',
    description: 'Compartilhe sua primeira conquista',
    icon: 'Share2',
    category: 'social',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'social_invite_friend',
    title: 'Recrutador',
    description: 'Convide um amigo para o EvoluaAI',
    icon: 'UserPlus',
    category: 'social',
    rarity: 'common',
    unlockedAt: new Date()
  },

  // SPECIAL ACHIEVEMENTS
  {
    id: 'special_early_adopter',
    title: 'Pioneiro',
    description: 'Um dos primeiros usuários do EvoluaAI',
    icon: 'Rocket',
    category: 'special',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'special_perfect_week',
    title: 'Semana Perfeita',
    description: 'Complete todas as missões diárias por uma semana',
    icon: 'CheckCircle2',
    category: 'special',
    rarity: 'epic',
    unlockedAt: new Date()
  },
  {
    id: 'special_night_owl',
    title: 'Coruja Noturna',
    description: 'Complete 10 missões após 22h',
    icon: 'Moon',
    category: 'special',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'special_early_bird',
    title: 'Madrugador',
    description: 'Complete 10 missões antes das 7h',
    icon: 'Sun',
    category: 'special',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'special_speed_demon',
    title: 'Velocista',
    description: 'Complete uma missão em menos da metade do tempo estimado',
    icon: 'Gauge',
    category: 'special',
    rarity: 'rare',
    unlockedAt: new Date()
  },
  {
    id: 'special_perfectionist',
    title: 'Perfeccionista',
    description: 'Complete 20 missões com avaliação 5 estrelas',
    icon: 'Award',
    category: 'special',
    rarity: 'epic',
    unlockedAt: new Date()
  }
]

// Achievement categories with metadata
export const ACHIEVEMENT_CATEGORIES = {
  streak: {
    name: 'Sequência',
    description: 'Conquistas relacionadas à consistência',
    color: 'orange',
    icon: 'Flame'
  },
  missions: {
    name: 'Missões',
    description: 'Conquistas por completar missões',
    color: 'blue',
    icon: 'Target'
  },
  xp: {
    name: 'Experiência',
    description: 'Conquistas por acumular XP',
    color: 'purple',
    icon: 'Zap'
  },
  social: {
    name: 'Social',
    description: 'Conquistas sociais e de compartilhamento',
    color: 'green',
    icon: 'Users'
  },
  special: {
    name: 'Especiais',
    description: 'Conquistas únicas e raras',
    color: 'yellow',
    icon: 'Star'
  }
} as const

// Rarity configuration
export const RARITY_CONFIG = {
  common: {
    name: 'Comum',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300'
  },
  rare: {
    name: 'Raro',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-300'
  },
  epic: {
    name: 'Épico',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300'
  },
  legendary: {
    name: 'Lendário',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-300'
  }
} as const

// Helper functions
export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(achievement => achievement.id === id)
}

export const getAchievementsByCategory = (category: string): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.category === category)
}

export const getAchievementsByRarity = (rarity: string): Achievement[] => {
  return ACHIEVEMENTS.filter(achievement => achievement.rarity === rarity)
}

// Achievement checking functions
export const checkStreakAchievements = (streak: number): Achievement[] => {
  const unlockedAchievements: Achievement[] = []
  
  const streakMilestones = [
    { streak: 3, id: 'streak_3' },
    { streak: 7, id: 'streak_7' },
    { streak: 30, id: 'streak_30' },
    { streak: 100, id: 'streak_100' }
  ]
  
  streakMilestones.forEach(milestone => {
    if (streak >= milestone.streak) {
      const achievement = getAchievementById(milestone.id)
      if (achievement) {
        unlockedAchievements.push({
          ...achievement,
          unlockedAt: new Date()
        })
      }
    }
  })
  
  return unlockedAchievements
}

export const checkMissionAchievements = (completedMissions: number): Achievement[] => {
  const unlockedAchievements: Achievement[] = []
  
  const missionMilestones = [
    { count: 10, id: 'missions_10' },
    { count: 50, id: 'missions_50' },
    { count: 100, id: 'missions_100' },
    { count: 500, id: 'missions_500' }
  ]
  
  missionMilestones.forEach(milestone => {
    if (completedMissions >= milestone.count) {
      const achievement = getAchievementById(milestone.id)
      if (achievement) {
        unlockedAchievements.push({
          ...achievement,
          unlockedAt: new Date()
        })
      }
    }
  })
  
  return unlockedAchievements
}

export const checkXPAchievements = (totalXP: number): Achievement[] => {
  const unlockedAchievements: Achievement[] = []
  
  const xpMilestones = [
    { xp: 1000, id: 'xp_1000' },
    { xp: 10000, id: 'xp_10000' },
    { xp: 50000, id: 'xp_50000' }
  ]
  
  xpMilestones.forEach(milestone => {
    if (totalXP >= milestone.xp) {
      const achievement = getAchievementById(milestone.id)
      if (achievement) {
        unlockedAchievements.push({
          ...achievement,
          unlockedAt: new Date()
        })
      }
    }
  })
  
  return unlockedAchievements
}

export const checkSpecialAchievements = (context: {
  missionTime?: number
  estimatedTime?: number
  rating?: number
  completionHour?: number
  perfectWeek?: boolean
}): Achievement[] => {
  const unlockedAchievements: Achievement[] = []
  
  // Speed demon - completed in less than half the estimated time
  if (context.missionTime && context.estimatedTime && 
      context.missionTime < context.estimatedTime / 2) {
    const achievement = getAchievementById('special_speed_demon')
    if (achievement) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  }
  
  // Night owl - completed after 22h
  if (context.completionHour && context.completionHour >= 22) {
    const achievement = getAchievementById('special_night_owl')
    if (achievement) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  }
  
  // Early bird - completed before 7h
  if (context.completionHour && context.completionHour < 7) {
    const achievement = getAchievementById('special_early_bird')
    if (achievement) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  }
  
  // Perfect week
  if (context.perfectWeek) {
    const achievement = getAchievementById('special_perfect_week')
    if (achievement) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  }
  
  return unlockedAchievements
}

// Get progress towards next achievement
export const getAchievementProgress = (category: string, currentValue: number): {
  nextAchievement: Achievement | null
  progress: number
  target: number
} => {
  let milestones: { value: number; id: string }[] = []
  
  switch (category) {
    case 'streak':
      milestones = [
        { value: 3, id: 'streak_3' },
        { value: 7, id: 'streak_7' },
        { value: 30, id: 'streak_30' },
        { value: 100, id: 'streak_100' }
      ]
      break
    case 'missions':
      milestones = [
        { value: 10, id: 'missions_10' },
        { value: 50, id: 'missions_50' },
        { value: 100, id: 'missions_100' },
        { value: 500, id: 'missions_500' }
      ]
      break
    case 'xp':
      milestones = [
        { value: 1000, id: 'xp_1000' },
        { value: 10000, id: 'xp_10000' },
        { value: 50000, id: 'xp_50000' }
      ]
      break
  }
  
  // Find next milestone
  const nextMilestone = milestones.find(m => m.value > currentValue)
  
  if (!nextMilestone) {
    return {
      nextAchievement: null,
      progress: 100,
      target: currentValue
    }
  }
  
  const achievement = getAchievementById(nextMilestone.id)
  const progress = Math.min((currentValue / nextMilestone.value) * 100, 100)
  
  return {
    nextAchievement: achievement || null,
    progress,
    target: nextMilestone.value
  }
}

// Get user's achievement stats
export const getAchievementStats = (userAchievements: Achievement[]): {
  total: number
  byRarity: Record<string, number>
  byCategory: Record<string, number>
  completionPercentage: number
} => {
  const stats = {
    total: userAchievements.length,
    byRarity: { common: 0, rare: 0, epic: 0, legendary: 0 },
    byCategory: { streak: 0, missions: 0, xp: 0, social: 0, special: 0 },
    completionPercentage: (userAchievements.length / ACHIEVEMENTS.length) * 100
  }
  
  userAchievements.forEach(achievement => {
    stats.byRarity[achievement.rarity]++
    stats.byCategory[achievement.category]++
  })
  
  return stats
}