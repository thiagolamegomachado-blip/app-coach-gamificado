'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  Play, 
  Gift,
  Crown,
  Flame,
  Users,
  Brain,
  Sparkles,
  Settings,
  Award,
  TrendingUp,
  ShoppingCart,
  Bell,
  ArrowLeft,
  Pause,
  RotateCcw,
  Share2,
  Heart,
  DollarSign,
  Palette,
  ChevronRight,
  Lock,
  Unlock,
  Info,
  X,
  Rocket,
  Lightning,
  Gem,
  Shield,
  Infinity,
  Wand2,
  Coins,
  Calendar,
  BarChart3,
  Globe,
  Headphones,
  Camera,
  FileText,
  Download,
  Upload,
  MessageSquare,
  Video,
  Mic,
  Image as ImageIcon,
  Code,
  Database,
  Smartphone,
  Monitor,
  Wifi,
  Battery,
  Volume2
} from 'lucide-react'

// Import our custom libraries
import { User, Mission, StoreItem, Achievement, Screen, CompletedMission } from '@/lib/types'
import { 
  loadUser, 
  saveUser, 
  updateUser, 
  addXP, 
  updateStreak, 
  trackEvent, 
  addNotification,
  getNotifications,
  markNotificationAsRead,
  generateId,
  formatTime,
  formatXP,
  getGreeting
} from '@/lib/storage'
import { 
  MISSIONS_DATABASE, 
  getMissionsByCategory, 
  getAvailableMissions, 
  getLockedMissions,
  getDailyMissions,
  getMissionById
} from '@/lib/missions'
import { 
  STORE_ITEMS, 
  getPopularItems, 
  getLimitedTimeOffers,
  getRecommendedItems,
  formatPrice,
  calculateDiscountedPrice,
  simulatePurchase
} from '@/lib/store'
import { 
  ACHIEVEMENTS,
  checkStreakAchievements,
  checkMissionAchievements,
  checkXPAchievements,
  getAchievementProgress,
  RARITY_CONFIG
} from '@/lib/achievements'
import { aiService, generateMissionGuidance } from '@/lib/ai-service'

export default function EvoluaAI() {
  // Core state
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Mission state
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [missionTimer, setMissionTimer] = useState(0)
  const [isMissionActive, setIsMissionActive] = useState(false)
  const [missionSteps, setMissionSteps] = useState<any[]>([])
  const [aiGuidance, setAiGuidance] = useState<string>('')
  
  // UI state
  const [userName, setUserName] = useState('')
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null)
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null)

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true)
      
      // Load user data
      const savedUser = loadUser()
      if (savedUser) {
        setUser(savedUser)
        setCurrentScreen('home')
        
        // Update streak
        const updatedUser = updateStreak()
        if (updatedUser) {
          setUser(updatedUser)
        }
        
        // Track app open
        trackEvent('app_opened', {
          userLevel: savedUser.level,
          streak: savedUser.streak
        })
      }
      
      // Load notifications
      const userNotifications = getNotifications()
      setNotifications(userNotifications)
      
      setIsLoading(false)
    }
    
    initializeApp()
  }, [])

  // Mission timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isMissionActive && missionTimer > 0) {
      interval = setInterval(() => {
        setMissionTimer(prev => {
          if (prev <= 1) {
            setIsMissionActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isMissionActive, missionTimer])

  // Helper functions
  const createUser = (name: string): User => {
    const newUser: User = {
      id: generateId(),
      name,
      level: 1,
      xp: 0,
      xpToNext: 100,
      streak: 0,
      completedMissions: 0,
      totalMissions: MISSIONS_DATABASE.length,
      isVip: false,
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      preferences: {
        notifications: true,
        soundEffects: true,
        theme: 'light',
        language: 'pt',
        difficulty: 'adaptive'
      },
      achievements: [],
      stats: {
        totalTimeSpent: 0,
        averageSessionTime: 0,
        favoriteCategory: 'productivity',
        bestStreak: 0,
        weeklyGoal: 7,
        weeklyCompleted: 0,
        monthlyGoal: 30,
        monthlyCompleted: 0
      }
    }
    
    saveUser(newUser)
    return newUser
  }

  const startOnboarding = () => {
    if (userName.trim()) {
      const newUser = createUser(userName.trim())
      setUser(newUser)
      setCurrentScreen('home')
      
      trackEvent('user_registered', {
        userName: userName.trim()
      })
      
      addNotification({
        title: 'Bem-vindo ao EvoluaAI! 🎉',
        message: 'Sua jornada de evolução pessoal começou!',
        type: 'system',
        isRead: false
      })
    }
  }

  const startMission = async (mission: Mission) => {
    if (!user) return
    
    setSelectedMission(mission)
    setCurrentScreen('mission')
    setMissionTimer(mission.timeEstimateMinutes * 60) // Convert to seconds
    
    // Generate AI guidance
    try {
      const guidance = await generateMissionGuidance(mission.id, user.level, mission.aiPrompt)
      setAiGuidance(guidance.content)
      setMissionSteps(guidance.steps || mission.steps)
    } catch (error) {
      setAiGuidance('Vamos trabalhar juntos nesta missão! Siga os passos para completar seu objetivo.')
      setMissionSteps(mission.steps)
    }
    
    trackEvent('mission_started', {
      missionId: mission.id,
      category: mission.category,
      difficulty: mission.difficulty,
      userLevel: user.level
    })
  }

  const completeMission = () => {
    if (!selectedMission || !user) return
    
    const timeSpent = selectedMission.timeEstimateMinutes - Math.floor(missionTimer / 60)
    const completedMission: CompletedMission = {
      missionId: selectedMission.id,
      completedAt: new Date(),
      timeSpent,
      xpEarned: selectedMission.xpReward,
      rating: 5 // Default rating
    }
    
    // Add XP and update user
    const updatedUser = addXP(selectedMission.xpReward)
    if (updatedUser) {
      const finalUser = updateUser({
        completedMissions: updatedUser.completedMissions + 1,
        stats: {
          ...updatedUser.stats,
          totalTimeSpent: updatedUser.stats.totalTimeSpent + timeSpent
        }
      })
      
      if (finalUser) {
        setUser(finalUser)
        
        // Check for achievements
        const newAchievements = [
          ...checkMissionAchievements(finalUser.completedMissions),
          ...checkXPAchievements(finalUser.xp),
          ...checkStreakAchievements(finalUser.streak)
        ]
        
        if (newAchievements.length > 0) {
          setShowAchievement(newAchievements[0])
          
          addNotification({
            title: 'Nova conquista desbloqueada! 🏆',
            message: `Você conquistou: ${newAchievements[0].title}`,
            type: 'achievement',
            isRead: false
          })
        }
      }
    }
    
    trackEvent('mission_completed', {
      missionId: selectedMission.id,
      timeSpent,
      xpEarned: selectedMission.xpReward,
      userLevel: user.level
    })
    
    addNotification({
      title: 'Missão concluída! ✅',
      message: `+${selectedMission.xpReward} XP conquistados`,
      type: 'mission',
      isRead: false
    })
    
    setCurrentScreen('home')
    setSelectedMission(null)
    setIsMissionActive(false)
    setMissionTimer(0)
  }

  const purchaseItem = async (item: StoreItem) => {
    if (!user) return
    
    setPurchaseLoading(item.id)
    
    try {
      const result = await simulatePurchase(item.id, user.id)
      
      if (result.success) {
        // Apply purchase effects
        let updates: Partial<User> = {}
        
        switch (item.type) {
          case 'vip_subscription':
            updates.isVip = true
            updates.vipExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            break
          case 'level_boost':
            const levelBoost = item.id.includes('small') ? 1 : 3
            updates.level = user.level + levelBoost
            break
          case 'mission_unlock':
            // Unlock specific missions (would be handled in real implementation)
            break
        }
        
        if (Object.keys(updates).length > 0) {
          const updatedUser = updateUser(updates)
          if (updatedUser) setUser(updatedUser)
        }
        
        trackEvent('purchase_completed', {
          itemId: item.id,
          amount: calculateDiscountedPrice(item),
          type: item.type
        })
        
        addNotification({
          title: 'Compra realizada! 🎉',
          message: `${item.title} foi adicionado à sua conta`,
          type: 'system',
          isRead: false
        })
      } else {
        addNotification({
          title: 'Erro na compra',
          message: result.error || 'Tente novamente mais tarde',
          type: 'system',
          isRead: false
        })
      }
    } catch (error) {
      addNotification({
        title: 'Erro na compra',
        message: 'Falha na conexão. Tente novamente.',
        type: 'system',
        isRead: false
      })
    } finally {
      setPurchaseLoading(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      productivity: <Target className="w-4 h-4" />,
      health: <Heart className="w-4 h-4" />,
      social: <Users className="w-4 h-4" />,
      learning: <Brain className="w-4 h-4" />,
      creativity: <Palette className="w-4 h-4" />,
      finance: <DollarSign className="w-4 h-4" />
    }
    return icons[category as keyof typeof icons] || <Star className="w-4 h-4" />
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-emerald-500',
      medium: 'bg-amber-500',
      hard: 'bg-red-500'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-500'
  }

  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <p className="text-white/80 text-lg font-medium">Carregando EvoluaAI...</p>
          <div className="mt-4 w-48 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Screen
  if (currentScreen === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="relative mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EvoluaAI
              </CardTitle>
              <CardDescription className="text-white/80 text-lg mt-3 font-medium">
                Seu coach de IA gamificado
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-6 pb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Complete missões e evolua por níveis</p>
                  <p className="text-white/60 text-sm">Sistema de progressão gamificado</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Desbloqueie poderes de IA avançados</p>
                  <p className="text-white/60 text-sm">Assistente inteligente personalizado</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Transforme hábitos em conquistas</p>
                  <p className="text-white/60 text-sm">Motivação através de recompensas</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Como você gostaria de ser chamado?"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-center bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && startOnboarding()}
              />
              <Button 
                onClick={startOnboarding}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={!userName.trim()}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Começar minha evolução
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-white/60 text-sm">
                Grátis para sempre • Desbloqueios opcionais
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium">100% Seguro</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) return null

  // Home Screen
  if (currentScreen === 'home') {
    const availableMissions = getAvailableMissions(user.level)
    const lockedMissions = getLockedMissions(user.level)
    const dailyMissions = getDailyMissions(user.level)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">{getGreeting(user.name)}</h1>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600">Nível {user.level}</p>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-600">{user.streak} dias</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative hover:bg-white/50 rounded-xl"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
              {user.isVip && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                  <Crown className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/60 backdrop-blur-xl border-b border-white/20 px-4 py-3 sticky top-[73px] z-40">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={currentScreen === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className={`rounded-full px-4 ${currentScreen === 'home' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'hover:bg-white/50'}`}
            >
              <Target className="w-4 h-4 mr-2" />
              Missões
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('store')}
              className="rounded-full px-4 hover:bg-white/50"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Loja
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('achievements')}
              className="rounded-full px-4 hover:bg-white/50"
            >
              <Award className="w-4 h-4 mr-2" />
              Conquistas
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('profile')}
              className="rounded-full px-4 hover:bg-white/50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Progress Card */}
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Progresso do Nível</h3>
                  <p className="text-white/80">{formatXP(user.xp)}/{formatXP(user.xpToNext)} XP</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">Nível {user.level}</div>
                  <div className="text-white/80 text-sm">Próximo: {user.level + 1}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={(user.xp / user.xpToNext) * 100} className="h-3 bg-white/20" />
                <div className="flex justify-between text-sm text-white/80">
                  <span>{Math.round((user.xp / user.xpToNext) * 100)}% completo</span>
                  <span>{formatXP(user.xpToNext - user.xp)} XP restante</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-emerald-400 to-cyan-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <p className="text-2xl font-bold">{user.completedMissions}</p>
                <p className="text-xs text-white/80">Missões</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <p className="text-2xl font-bold">{formatXP(user.xp)}</p>
                <p className="text-xs text-white/80">XP Total</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <p className="text-2xl font-bold">{user.streak}</p>
                <p className="text-xs text-white/80">Sequência</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Missions */}
          {dailyMissions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  Missões Diárias
                </h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-full px-3">
                  {dailyMissions.length} disponíveis
                </Badge>
              </div>
              <div className="space-y-4">
                {dailyMissions.map((mission) => (
                  <Card key={mission.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              {getCategoryIcon(mission.category)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{mission.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(mission.difficulty)}`} />
                                <span className="text-xs text-gray-500 capitalize">{mission.difficulty}</span>
                                {mission.isNew && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 rounded-full">Novo</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{mission.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" />
                              {mission.timeEstimate}
                            </span>
                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3" />
                              +{mission.xpReward} XP
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => startMission(mission)}
                          className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Iniciar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Missions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                Todas as Missões
              </h2>
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen('store')} className="rounded-full">
                <Gift className="w-4 h-4 mr-1" />
                Loja
              </Button>
            </div>

            <Tabs defaultValue="available" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm rounded-xl p-1">
                <TabsTrigger value="available" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  Disponíveis ({availableMissions.length})
                </TabsTrigger>
                <TabsTrigger value="locked" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  Bloqueadas ({lockedMissions.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="space-y-4 mt-6">
                {availableMissions.map((mission) => (
                  <Card key={mission.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              {getCategoryIcon(mission.category)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{mission.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize rounded-full">
                                  {mission.category}
                                </Badge>
                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(mission.difficulty)}`} />
                                <span className="text-xs text-gray-500 capitalize">{mission.difficulty}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{mission.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" />
                              {mission.timeEstimate}
                            </span>
                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3" />
                              +{mission.xpReward} XP
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => startMission(mission)}
                          className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Iniciar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="locked" className="space-y-4 mt-6">
                {lockedMissions.map((mission) => (
                  <Card key={mission.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg opacity-75">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center">
                              <Lock className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-700">{mission.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs rounded-full">
                                  Nível {mission.requiredLevel}
                                </Badge>
                                {mission.isPremium && (
                                  <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">{mission.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" />
                              {mission.timeEstimate}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3" />
                              +{mission.xpReward} XP
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="ml-4 rounded-xl"
                          onClick={() => setCurrentScreen('store')}
                        >
                          {mission.unlockPrice ? `R$ ${mission.unlockPrice}` : 'Desbloquear'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* VIP Upgrade */}
          {!user.isVip && (
            <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-yellow-200" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Upgrade para VIP</h3>
                      <p className="text-white/90 text-sm">Desbloqueie tudo + 2x XP + IA avançada</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Infinity className="w-4 h-4 text-yellow-200" />
                        <span className="text-xs text-white/80">Acesso ilimitado</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setCurrentScreen('store')}
                    className="bg-white text-orange-600 hover:bg-white/90 font-semibold rounded-xl shadow-lg"
                  >
                    R$ 29,90/mês
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Mission Screen
  if (currentScreen === 'mission' && selectedMission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="rounded-xl hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900">{selectedMission.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-purple-600 font-medium">+{selectedMission.xpReward} XP</span>
                <span className="text-sm text-gray-500">{selectedMission.timeEstimate}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="rounded-xl hover:bg-white/50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Mission Info */}
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {getCategoryIcon(selectedMission.category)}
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="capitalize mb-2 bg-white/20 text-white border-white/30">
                    {selectedMission.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(selectedMission.difficulty)}`} />
                    <span className="text-sm text-white/80 capitalize">{selectedMission.difficulty}</span>
                  </div>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">{selectedMission.description}</p>
            </CardContent>
          </Card>

          {/* Timer */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {formatTimer(missionTimer)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10"></div>
              </div>
              <p className="text-gray-600 mb-6">
                Tempo estimado: <span className="font-semibold">{selectedMission.timeEstimate}</span>
              </p>
              
              <div className="flex gap-3 justify-center">
                {!isMissionActive ? (
                  <Button 
                    onClick={() => setIsMissionActive(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Começar Missão
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={() => setIsMissionActive(false)}
                      variant="outline"
                      className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </Button>
                    <Button 
                      onClick={completeMission}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Concluir
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Assistente IA
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {aiGuidance || 'Carregando orientações personalizadas da IA...'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  Passos sugeridos:
                </h4>
                {missionSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1 bg-white/60 p-3 rounded-xl">
                      <p className="font-medium text-gray-900">{step.title || step}</p>
                      {step.description && (
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightning className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900 mb-1">💡 Dica da IA</p>
                    <p className="text-blue-700 text-sm">Mantenha o foco e celebre cada pequeno progresso! A consistência é mais importante que a perfeição.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
              <Star className="w-5 h-5" />
              <span className="font-semibold">+{selectedMission.xpReward} XP ao completar</span>
              <Gem className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Store Screen
  if (currentScreen === 'store') {
    const popularItems = getPopularItems()
    const limitedOffers = getLimitedTimeOffers()
    const recommendations = getRecommendedItems(user.level, user.completedMissions)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="rounded-xl hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 text-lg">Loja EvoluaAI</h1>
              <p className="text-sm text-gray-600">Acelere sua evolução</p>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">Loja Premium</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-8 pb-20">
          {/* Limited Time Offers */}
          {limitedOffers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Ofertas Limitadas</h2>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full animate-pulse">
                  Tempo limitado!
                </Badge>
              </div>
              <div className="space-y-4">
                {limitedOffers.map((item) => (
                  <Card key={item.id} className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                              <Gift className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                              {item.discount && (
                                <Badge variant="destructive" className="rounded-full animate-pulse">
                                  -{item.discount}% OFF
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {item.benefits.slice(0, 3).map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-emerald-600 mb-1">
                            {formatPrice(calculateDiscountedPrice(item))}
                          </div>
                          {item.discount && (
                            <div className="text-lg text-gray-500 line-through mb-3">
                              {formatPrice(item.price)}
                            </div>
                          )}
                          <Button 
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => purchaseItem(item)}
                            disabled={purchaseLoading === item.id}
                          >
                            {purchaseLoading === item.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processando...
                              </div>
                            ) : (
                              <>
                                <Lightning className="w-4 h-4 mr-2" />
                                Comprar Agora
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Recomendado para Você</h2>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Personalizado
                </Badge>
              </div>
              <div className="grid gap-4">
                {recommendations.map((item) => (
                  <Card key={item.id} className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                              {item.isPopular && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {item.benefits.slice(0, 3).map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-purple-600 mb-3">
                            {formatPrice(calculateDiscountedPrice(item))}
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => purchaseItem(item)}
                            disabled={purchaseLoading === item.id}
                          >
                            {purchaseLoading === item.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processando...
                              </div>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Comprar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Items */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Todos os Itens</h2>
            </div>
            <Tabs defaultValue="subscription" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm rounded-xl p-1">
                <TabsTrigger value="subscription" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <Crown className="w-4 h-4 mr-1" />
                  VIP
                </TabsTrigger>
                <TabsTrigger value="boost" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <Zap className="w-4 h-4 mr-1" />
                  Impulsos
                </TabsTrigger>
                <TabsTrigger value="bundle" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md">
                  <Gift className="w-4 h-4 mr-1" />
                  Pacotes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="subscription" className="space-y-4 mt-6">
                {STORE_ITEMS.filter(item => item.type === 'vip_subscription').map((item) => (
                  <Card key={item.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                              <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                                <Infinity className="w-3 h-3 mr-1" />
                                Ilimitado
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {item.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-3xl font-bold text-orange-600 mb-3">
                            {formatPrice(item.price)}
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold"
                            onClick={() => purchaseItem(item)}
                            disabled={purchaseLoading === item.id}
                          >
                            {purchaseLoading === item.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processando...
                              </div>
                            ) : (
                              <>
                                <Crown className="w-4 h-4 mr-2" />
                                Assinar VIP
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="boost" className="space-y-4 mt-6">
                {STORE_ITEMS.filter(item => item.type === 'level_boost' || item.type === 'power_up').map((item) => (
                  <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="space-y-2">
                            {item.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-blue-600 mb-3">
                            {formatPrice(item.price)}
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => purchaseItem(item)}
                            disabled={purchaseLoading === item.id}
                          >
                            {purchaseLoading === item.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processando...
                              </div>
                            ) : (
                              <>
                                <Lightning className="w-4 h-4 mr-2" />
                                Comprar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="bundle" className="space-y-4 mt-6">
                {STORE_ITEMS.filter(item => item.category === 'bundle').map((item) => (
                  <Card key={item.id} className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                              <Gift className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                              {item.discount && (
                                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full">
                                  Economize {item.discount}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {item.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-emerald-600 mb-1">
                            {formatPrice(calculateDiscountedPrice(item))}
                          </div>
                          {item.discount && (
                            <div className="text-lg text-gray-500 line-through mb-3">
                              {formatPrice(item.price)}
                            </div>
                          )}
                          <Button 
                            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => purchaseItem(item)}
                            disabled={purchaseLoading === item.id}
                          >
                            {purchaseLoading === item.id ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Processando...
                              </div>
                            ) : (
                              <>
                                <Gift className="w-4 h-4 mr-2" />
                                Comprar Pacote
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  // Achievements Screen
  if (currentScreen === 'achievements') {
    const userAchievements = user.achievements || []
    const streakProgress = getAchievementProgress('streak', user.streak)
    const missionProgress = getAchievementProgress('missions', user.completedMissions)
    const xpProgress = getAchievementProgress('xp', user.xp)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="rounded-xl hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 text-lg">Conquistas</h1>
              <p className="text-sm text-gray-600">{userAchievements.length} de {ACHIEVEMENTS.length} desbloqueadas</p>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">{Math.round((userAchievements.length / ACHIEVEMENTS.length) * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-8 pb-20">
          {/* Progress Overview */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-orange-400 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
                <p className="text-2xl font-bold">{user.streak}</p>
                <p className="text-xs text-white/80 mb-2">Sequência</p>
                {streakProgress.nextAchievement && (
                  <div className="space-y-1">
                    <Progress value={streakProgress.progress} className="h-1 bg-white/20" />
                    <p className="text-xs text-white/70">
                      {streakProgress.target - user.streak} para próxima
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
                <p className="text-2xl font-bold">{user.completedMissions}</p>
                <p className="text-xs text-white/80 mb-2">Missões</p>
                {missionProgress.nextAchievement && (
                  <div className="space-y-1">
                    <Progress value={missionProgress.progress} className="h-1 bg-white/20" />
                    <p className="text-xs text-white/70">
                      {missionProgress.target - user.completedMissions} para próxima
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
                <p className="text-2xl font-bold">{formatXP(user.xp)}</p>
                <p className="text-xs text-white/80 mb-2">XP Total</p>
                {xpProgress.nextAchievement && (
                  <div className="space-y-1">
                    <Progress value={xpProgress.progress} className="h-1 bg-white/20" />
                    <p className="text-xs text-white/70">
                      {formatXP(xpProgress.target - user.xp)} para próxima
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements List */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Todas as Conquistas</h2>
            </div>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = userAchievements.some(ua => ua.id === achievement.id)
                const rarityConfig = RARITY_CONFIG[achievement.rarity]
                
                return (
                  <Card 
                    key={achievement.id} 
                    className={`${isUnlocked ? `${rarityConfig.borderColor} border-2 bg-gradient-to-r ${rarityConfig.bgColor}/10` : 'bg-white/60 border-gray-200'} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          isUnlocked ? `bg-gradient-to-r ${rarityConfig.bgColor}` : 'bg-gray-200'
                        } shadow-lg`}>
                          {isUnlocked ? (
                            <Award className={`w-8 h-8 text-white`} />
                          ) : (
                            <Lock className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                              {achievement.title}
                            </h3>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${isUnlocked ? `${rarityConfig.textColor} ${rarityConfig.borderColor}` : 'text-gray-400 border-gray-300'} rounded-full`}
                            >
                              {rarityConfig.name}
                            </Badge>
                          </div>
                          <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'} mb-3`}>
                            {achievement.description}
                          </p>
                          {isUnlocked && (
                            <div className="flex items-center gap-3">
                              <p className="text-xs text-gray-500">
                                Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </p>
                              <Button variant="ghost" size="sm" className="rounded-full">
                                <Share2 className="w-4 h-4 mr-1" />
                                Compartilhar
                              </Button>
                            </div>
                          )}
                        </div>
                        {isUnlocked && (
                          <div className="text-center">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${rarityConfig.bgColor} flex items-center justify-center mb-2`}>
                              <Gem className="w-6 h-6 text-white" />
                            </div>
                            <Badge className={`bg-gradient-to-r ${rarityConfig.bgColor} text-white rounded-full text-xs`}>
                              Conquistada
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Profile Screen
  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('home')}
              className="rounded-xl hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 text-lg">Perfil</h1>
              <p className="text-sm text-gray-600">Suas estatísticas e configurações</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-white/50">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-8 pb-20">
          {/* User Info */}
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-2xl">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <p className="text-white/90 text-lg mb-3">Nível {user.level}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 rounded-full px-3 py-1">
                      <Flame className="w-4 h-4 mr-1" />
                      {user.streak} dias
                    </Badge>
                    {user.isVip && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-3 py-1">
                        <Crown className="w-4 h-4 mr-1" />
                        VIP Ativo
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600 mb-1">{user.completedMissions}</p>
                  <p className="text-sm text-gray-600">Missões Concluídas</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600 mb-1">{formatXP(user.xp)}</p>
                  <p className="text-sm text-gray-600">XP Total</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <p className="text-3xl font-bold text-orange-600 mb-1">{user.stats.bestStreak}</p>
                  <p className="text-sm text-gray-600">Melhor Sequência</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-emerald-600 mb-1">{formatTime(user.stats.totalTimeSpent)}</p>
                  <p className="text-sm text-gray-600">Tempo Total</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-900">Progresso Semanal</span>
                    <span className="text-sm text-gray-600">{user.stats.weeklyCompleted}/{user.stats.weeklyGoal}</span>
                  </div>
                  <Progress value={(user.stats.weeklyCompleted / user.stats.weeklyGoal) * 100} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-900">Progresso Mensal</span>
                    <span className="text-sm text-gray-600">{user.stats.monthlyCompleted}/{user.stats.monthlyGoal}</span>
                  </div>
                  <Progress value={(user.stats.monthlyCompleted / user.stats.monthlyGoal) * 100} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-500" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-300">
                <Share2 className="w-4 h-4 mr-3" />
                Compartilhar Progresso
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
                <Settings className="w-4 h-4 mr-3" />
                Configurações
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-green-50 hover:border-green-200 transition-all duration-300">
                <Info className="w-4 h-4 mr-3" />
                Sobre o EvoluaAI
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-xl hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-300">
                <Bell className="w-4 h-4 mr-3" />
                Notificações
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Membro desde:</span>
                <span className="font-medium text-gray-900">{new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Último acesso:</span>
                <span className="font-medium text-gray-900">{new Date(user.lastActiveAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Status:</span>
                <Badge className={user.isVip ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-500'}>
                  {user.isVip ? (
                    <>
                      <Crown className="w-3 h-3 mr-1" />
                      VIP Ativo
                    </>
                  ) : (
                    'Gratuito'
                  )}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">ID do usuário:</span>
                <span className="font-mono text-xs text-gray-500">{user.id.slice(0, 8)}...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Notifications Dialog
  return (
    <>
      {/* Achievement Popup */}
      {showAchievement && (
        <Dialog open={!!showAchievement} onOpenChange={() => setShowAchievement(null)}>
          <DialogContent className="sm:max-w-md bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">🎉 Nova Conquista!</DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-6 py-4">
              <div className="relative mx-auto">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-12 h-12 text-yellow-200" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{showAchievement.title}</h3>
                <p className="text-white/90 text-lg">{showAchievement.description}</p>
              </div>
              <Button 
                onClick={() => setShowAchievement(null)} 
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl py-3 font-semibold backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continuar Evoluindo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Notifications Dialog */}
      {showNotifications && (
        <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
          <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notificações
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                      notification.isRead 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.isRead 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}>
                        <Bell className={`w-4 h-4 ${notification.isRead ? 'text-gray-500' : 'text-white'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}