import { User, Mission, StoreItem, Achievement, CompletedMission, Notification, AnalyticsEvent } from './types'

// Storage Keys
const STORAGE_KEYS = {
  USER: 'evolua_ai_user',
  COMPLETED_MISSIONS: 'evolua_ai_completed_missions',
  NOTIFICATIONS: 'evolua_ai_notifications',
  ANALYTICS: 'evolua_ai_analytics',
  SETTINGS: 'evolua_ai_settings',
  PURCHASES: 'evolua_ai_purchases'
} as const

// User Management
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  } catch (error) {
    console.error('Error saving user:', error)
  }
}

export const loadUser = (): User | null => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER)
    if (!userData) return null
    
    const user = JSON.parse(userData)
    // Convert date strings back to Date objects
    user.joinedAt = new Date(user.joinedAt)
    user.lastActiveAt = new Date(user.lastActiveAt)
    if (user.vipExpiresAt) {
      user.vipExpiresAt = new Date(user.vipExpiresAt)
    }
    user.achievements = user.achievements.map((achievement: any) => ({
      ...achievement,
      unlockedAt: new Date(achievement.unlockedAt)
    }))
    
    return user
  } catch (error) {
    console.error('Error loading user:', error)
    return null
  }
}

export const updateUser = (updates: Partial<User>): User | null => {
  const currentUser = loadUser()
  if (!currentUser) return null
  
  const updatedUser = {
    ...currentUser,
    ...updates,
    lastActiveAt: new Date()
  }
  
  saveUser(updatedUser)
  return updatedUser
}

// Mission Management
export const saveCompletedMission = (mission: CompletedMission): void => {
  try {
    const completed = getCompletedMissions()
    completed.push(mission)
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MISSIONS, JSON.stringify(completed))
  } catch (error) {
    console.error('Error saving completed mission:', error)
  }
}

export const getCompletedMissions = (): CompletedMission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_MISSIONS)
    if (!data) return []
    
    const missions = JSON.parse(data)
    return missions.map((mission: any) => ({
      ...mission,
      completedAt: new Date(mission.completedAt)
    }))
  } catch (error) {
    console.error('Error loading completed missions:', error)
    return []
  }
}

export const getMissionHistory = (days: number = 30): CompletedMission[] => {
  const completed = getCompletedMissions()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return completed.filter(mission => mission.completedAt >= cutoffDate)
}

// Notifications
export const saveNotifications = (notifications: Notification[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
  } catch (error) {
    console.error('Error saving notifications:', error)
  }
}

export const getNotifications = (): Notification[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
    if (!data) return []
    
    const notifications = JSON.parse(data)
    return notifications.map((notification: any) => ({
      ...notification,
      createdAt: new Date(notification.createdAt)
    }))
  } catch (error) {
    console.error('Error loading notifications:', error)
    return []
  }
}

export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>): void => {
  const notifications = getNotifications()
  const newNotification: Notification = {
    ...notification,
    id: generateId(),
    createdAt: new Date()
  }
  
  notifications.unshift(newNotification)
  
  // Keep only last 50 notifications
  if (notifications.length > 50) {
    notifications.splice(50)
  }
  
  saveNotifications(notifications)
}

export const markNotificationAsRead = (notificationId: string): void => {
  const notifications = getNotifications()
  const notification = notifications.find(n => n.id === notificationId)
  if (notification) {
    notification.isRead = true
    saveNotifications(notifications)
  }
}

// Analytics
export const trackEvent = (event: string, properties: Record<string, any> = {}): void => {
  try {
    const user = loadUser()
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
      userId: user?.id
    }
    
    const events = getAnalyticsEvents()
    events.push(analyticsEvent)
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000)
    }
    
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(events))
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export const getAnalyticsEvents = (): AnalyticsEvent[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS)
    if (!data) return []
    
    const events = JSON.parse(data)
    return events.map((event: any) => ({
      ...event,
      timestamp: new Date(event.timestamp)
    }))
  } catch (error) {
    console.error('Error loading analytics events:', error)
    return []
  }
}

// Level and XP Calculations
export const calculateLevel = (xp: number): number => {
  // Level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export const calculateXPForLevel = (level: number): number => {
  // XP needed for level: xp = (level - 1)^2 * 100
  return Math.pow(level - 1, 2) * 100
}

export const calculateXPToNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP)
  const nextLevelXP = calculateXPForLevel(currentLevel + 1)
  return nextLevelXP - currentXP
}

export const addXP = (amount: number): User | null => {
  const user = loadUser()
  if (!user) return null
  
  const oldLevel = user.level
  const newXP = user.xp + amount
  const newLevel = calculateLevel(newXP)
  const xpToNext = calculateXPToNextLevel(newXP)
  
  const updatedUser = updateUser({
    xp: newXP,
    level: newLevel,
    xpToNext
  })
  
  // Check for level up
  if (newLevel > oldLevel) {
    trackEvent('level_up', {
      oldLevel,
      newLevel,
      totalXP: newXP
    })
    
    addNotification({
      title: 'Parabéns! 🎉',
      message: `Você subiu para o nível ${newLevel}!`,
      type: 'achievement',
      isRead: false
    })
  }
  
  return updatedUser
}

// Streak Management
export const updateStreak = (): User | null => {
  const user = loadUser()
  if (!user) return null
  
  const today = new Date()
  const lastActive = new Date(user.lastActiveAt)
  const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
  
  let newStreak = user.streak
  
  if (daysDiff === 0) {
    // Same day, no change
    return user
  } else if (daysDiff === 1) {
    // Next day, increment streak
    newStreak = user.streak + 1
  } else {
    // Streak broken
    if (user.streak > 0) {
      trackEvent('streak_broken', {
        streakLength: user.streak,
        daysMissed: daysDiff
      })
      
      addNotification({
        title: 'Streak perdida 😔',
        message: `Sua sequência de ${user.streak} dias foi perdida. Vamos recomeçar!`,
        type: 'streak',
        isRead: false
      })
    }
    newStreak = 1
  }
  
  // Check for streak milestones
  if (newStreak > user.streak && [7, 14, 30, 60, 100].includes(newStreak)) {
    trackEvent('streak_milestone', {
      streakLength: newStreak
    })
    
    addNotification({
      title: `${newStreak} dias seguidos! 🔥`,
      message: 'Você está em uma sequência incrível!',
      type: 'streak',
      isRead: false
    })
  }
  
  // Update best streak
  const bestStreak = Math.max(user.stats.bestStreak, newStreak)
  
  return updateUser({
    streak: newStreak,
    stats: {
      ...user.stats,
      bestStreak
    }
  })
}

// Utility Functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}min`
}

export const formatXP = (xp: number): string => {
  if (xp < 1000) {
    return xp.toString()
  }
  
  if (xp < 1000000) {
    return `${(xp / 1000).toFixed(1)}k`
  }
  
  return `${(xp / 1000000).toFixed(1)}M`
}

export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 22) return 'evening'
  return 'night'
}

export const getGreeting = (name: string): string => {
  const timeOfDay = getTimeOfDay()
  
  const greetings = {
    morning: [`Bom dia, ${name}!`, `Olá, ${name}! Pronto para um novo dia?`],
    afternoon: [`Boa tarde, ${name}!`, `Olá, ${name}! Como está o seu dia?`],
    evening: [`Boa noite, ${name}!`, `Olá, ${name}! Vamos finalizar o dia bem?`],
    night: [`Boa noite, ${name}!`, `Olá, ${name}! Ainda acordado?`]
  }
  
  const options = greetings[timeOfDay]
  return options[Math.floor(Math.random() * options.length)]
}

// Data Migration and Cleanup
export const migrateData = (): void => {
  // Future data migration logic
  console.log('Data migration completed')
}

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}

export const exportUserData = (): string => {
  const data = {
    user: loadUser(),
    completedMissions: getCompletedMissions(),
    notifications: getNotifications(),
    analytics: getAnalyticsEvents()
  }
  
  return JSON.stringify(data, null, 2)
}