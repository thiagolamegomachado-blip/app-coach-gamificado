// Core Types for EvoluaAI

export interface User {
  id: string
  name: string
  email?: string
  level: number
  xp: number
  xpToNext: number
  streak: number
  completedMissions: number
  totalMissions: number
  isVip: boolean
  vipExpiresAt?: Date
  joinedAt: Date
  lastActiveAt: Date
  preferences: UserPreferences
  achievements: Achievement[]
  stats: UserStats
}

export interface UserPreferences {
  notifications: boolean
  soundEffects: boolean
  theme: 'light' | 'dark' | 'auto'
  language: 'pt' | 'en'
  difficulty: 'easy' | 'medium' | 'hard' | 'adaptive'
}

export interface UserStats {
  totalTimeSpent: number // minutes
  averageSessionTime: number // minutes
  favoriteCategory: MissionCategory
  bestStreak: number
  weeklyGoal: number
  weeklyCompleted: number
  monthlyGoal: number
  monthlyCompleted: number
}

export interface Mission {
  id: string
  title: string
  description: string
  category: MissionCategory
  xpReward: number
  timeEstimate: string
  timeEstimateMinutes: number
  difficulty: 'easy' | 'medium' | 'hard'
  isLocked: boolean
  requiredLevel: number
  unlockPrice?: number
  tags: string[]
  aiPrompt: string
  steps: MissionStep[]
  completionCriteria: string[]
  isNew?: boolean
  isPremium?: boolean
}

export interface MissionStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  aiGenerated?: boolean
}

export interface CompletedMission {
  missionId: string
  completedAt: Date
  timeSpent: number // minutes
  xpEarned: number
  rating?: number // 1-5 stars
  feedback?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  category: 'streak' | 'missions' | 'xp' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface StoreItem {
  id: string
  type: 'mission_unlock' | 'level_boost' | 'vip_subscription' | 'cosmetic' | 'power_up'
  title: string
  description: string
  price: number
  currency: 'BRL' | 'USD'
  discount?: number
  isPopular?: boolean
  isLimitedTime?: boolean
  expiresAt?: Date
  benefits: string[]
  category: string
}

export interface Purchase {
  id: string
  itemId: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  purchasedAt: Date
  expiresAt?: Date
}

export interface AIResponse {
  content: string
  steps?: string[]
  tips?: string[]
  estimatedTime?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  followUp?: string[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'mission' | 'achievement' | 'streak' | 'promotion' | 'system'
  isRead: boolean
  createdAt: Date
  actionUrl?: string
  actionText?: string
}

export interface AppState {
  user: User | null
  currentScreen: Screen
  selectedMission: Mission | null
  missionTimer: number
  isMissionActive: boolean
  notifications: Notification[]
  storeItems: StoreItem[]
  isLoading: boolean
  error: string | null
}

export type Screen = 
  | 'onboarding' 
  | 'home' 
  | 'mission' 
  | 'store' 
  | 'profile' 
  | 'achievements' 
  | 'settings'
  | 'leaderboard'
  | 'analytics'

export type MissionCategory = 'productivity' | 'health' | 'social' | 'learning' | 'creativity' | 'finance'

export interface LeaderboardEntry {
  userId: string
  name: string
  level: number
  xp: number
  streak: number
  rank: number
  isCurrentUser?: boolean
}

export interface AnalyticsData {
  dailyXP: { date: string; xp: number }[]
  categoryProgress: { category: MissionCategory; completed: number; total: number }[]
  weeklyStreak: { week: string; streak: number }[]
  timeSpentByCategory: { category: MissionCategory; minutes: number }[]
}

// API Types
export interface OpenAIRequest {
  prompt: string
  missionType: MissionCategory
  userLevel: number
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit?: number
}

export interface OpenAIResponse {
  success: boolean
  data?: AIResponse
  error?: string
  usage?: {
    tokens: number
    cost: number
  }
}

// Event Types for Analytics
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: Date
  userId?: string
}

export type EventType = 
  | 'mission_started'
  | 'mission_completed' 
  | 'mission_abandoned'
  | 'level_up'
  | 'achievement_unlocked'
  | 'purchase_initiated'
  | 'purchase_completed'
  | 'vip_upgraded'
  | 'streak_broken'
  | 'streak_milestone'
  | 'app_opened'
  | 'screen_viewed'
  | 'feature_used'