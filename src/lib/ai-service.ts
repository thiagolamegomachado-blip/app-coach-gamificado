import { OpenAIRequest, OpenAIResponse, AIResponse } from './types'

// OpenAI API Configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

// AI Service Class
export class AIService {
  private static instance: AIService
  private apiKey: string | null = null

  private constructor() {
    this.apiKey = OPENAI_API_KEY || null
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey
  }

  public hasApiKey(): boolean {
    return !!this.apiKey
  }

  // Main AI interaction method
  public async generateMissionContent(request: OpenAIRequest): Promise<OpenAIResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'API key não configurada. Configure sua chave OpenAI nas configurações.'
      }
    }

    try {
      const systemPrompt = this.buildSystemPrompt(request)
      const userPrompt = this.buildUserPrompt(request)

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: `Erro da API: ${errorData.error?.message || 'Erro desconhecido'}`
        }
      }

      const data = await response.json()
      const content = JSON.parse(data.choices[0].message.content)

      return {
        success: true,
        data: content,
        usage: {
          tokens: data.usage?.total_tokens || 0,
          cost: this.calculateCost(data.usage?.total_tokens || 0)
        }
      }
    } catch (error) {
      console.error('AI Service Error:', error)
      return {
        success: false,
        error: 'Erro ao conectar com a IA. Tente novamente.'
      }
    }
  }

  // Build system prompt based on mission type and user level
  private buildSystemPrompt(request: OpenAIRequest): string {
    const basePrompt = `Você é um coach de IA especializado em produtividade e desenvolvimento pessoal. 
    Sua função é guiar usuários através de missões práticas e acionáveis.

    REGRAS IMPORTANTES:
    - Seja prático e específico
    - Forneça passos claros e executáveis
    - Adapte o conteúdo ao nível do usuário (${request.userLevel})
    - Mantenha um tom motivacional mas profissional
    - Sempre retorne JSON válido no formato especificado
    - Foque em resultados tangíveis

    FORMATO DE RESPOSTA (JSON):
    {
      "content": "Mensagem principal personalizada",
      "steps": ["Passo 1", "Passo 2", "Passo 3"],
      "tips": ["Dica 1", "Dica 2"],
      "estimatedTime": número_em_minutos,
      "difficulty": "easy|medium|hard",
      "followUp": ["Pergunta de acompanhamento 1", "Pergunta 2"]
    }`

    const categoryPrompts = {
      productivity: `
      Especialização: PRODUTIVIDADE
      - Foque em eficiência e organização
      - Use frameworks como GTD, Pomodoro, Eisenhower
      - Priorize ações que economizam tempo
      - Sugira ferramentas e técnicas práticas`,
      
      health: `
      Especialização: BEM-ESTAR
      - Foque em saúde mental e física
      - Use técnicas de mindfulness e autocuidado
      - Promova hábitos saudáveis sustentáveis
      - Seja sensível a questões emocionais`,
      
      social: `
      Especialização: RELACIONAMENTOS
      - Foque em comunicação e networking
      - Use princípios de inteligência emocional
      - Promova conexões autênticas
      - Sugira abordagens práticas para interação`,
      
      learning: `
      Especialização: APRENDIZADO
      - Foque em técnicas de estudo eficazes
      - Use princípios de neurociência do aprendizado
      - Promova pensamento crítico
      - Sugira métodos de retenção e aplicação`,
      
      creativity: `
      Especialização: CRIATIVIDADE
      - Foque em técnicas de ideação
      - Use métodos como SCAMPER, brainstorming
      - Promova pensamento divergente
      - Sugira exercícios práticos de criatividade`,
      
      finance: `
      Especialização: FINANÇAS PESSOAIS
      - Foque em educação financeira prática
      - Use princípios de orçamento e investimento
      - Promova decisões financeiras conscientes
      - Sugira ferramentas de controle financeiro`
    }

    return basePrompt + '\n\n' + categoryPrompts[request.missionType]
  }

  // Build user prompt with context
  private buildUserPrompt(request: OpenAIRequest): string {
    let prompt = `CONTEXTO DA MISSÃO:
    Categoria: ${request.missionType}
    Nível do usuário: ${request.userLevel}
    Dificuldade desejada: ${request.difficulty}
    ${request.timeLimit ? `Tempo disponível: ${request.timeLimit} minutos` : ''}

    SOLICITAÇÃO:
    ${request.prompt}

    Por favor, gere uma resposta personalizada seguindo exatamente o formato JSON especificado.`

    return prompt
  }

  // Calculate approximate cost (GPT-4o-mini pricing)
  private calculateCost(tokens: number): number {
    // GPT-4o-mini: ~$0.00015 per 1K tokens (input) + $0.0006 per 1K tokens (output)
    // Simplified calculation assuming 50/50 split
    return (tokens / 1000) * 0.0004
  }

  // Fallback responses when AI is not available
  public getFallbackResponse(missionType: string, difficulty: string): AIResponse {
    const fallbackResponses = {
      productivity: {
        easy: {
          content: "Vamos organizar suas tarefas de forma simples e eficaz! Comece identificando suas 3 prioridades principais para hoje.",
          steps: [
            "Liste todas as tarefas pendentes",
            "Identifique as 3 mais importantes",
            "Defina horários específicos para cada uma",
            "Elimine ou delegue tarefas menos importantes"
          ],
          tips: [
            "Use a regra dos 2 minutos: se leva menos que isso, faça agora",
            "Comece pela tarefa mais desafiadora quando sua energia estiver alta"
          ],
          estimatedTime: 10,
          difficulty: 'easy' as const,
          followUp: [
            "Qual tarefa você considera mais importante hoje?",
            "Que obstáculos podem impedir seu progresso?"
          ]
        },
        medium: {
          content: "Vamos implementar um sistema de produtividade mais robusto usando técnicas comprovadas.",
          steps: [
            "Aplique a matriz de Eisenhower para priorizar",
            "Configure blocos de tempo para trabalho focado",
            "Implemente a técnica Pomodoro",
            "Revise e ajuste seu sistema"
          ],
          tips: [
            "Mantenha um log de como gasta seu tempo por uma semana",
            "Configure seu ambiente para minimizar distrações"
          ],
          estimatedTime: 20,
          difficulty: 'medium' as const,
          followUp: [
            "Quais são suas maiores fontes de distração?",
            "Como você mede sua produtividade atualmente?"
          ]
        }
      },
      health: {
        easy: {
          content: "Vamos começar com práticas simples de bem-estar que você pode implementar hoje mesmo.",
          steps: [
            "Faça 5 respirações profundas e conscientes",
            "Reflita sobre 3 coisas pelas quais é grato",
            "Identifique uma emoção que está sentindo agora",
            "Planeje uma atividade prazerosa para hoje"
          ],
          tips: [
            "Pequenos momentos de autocuidado fazem grande diferença",
            "A consistência é mais importante que a perfeição"
          ],
          estimatedTime: 8,
          difficulty: 'easy' as const,
          followUp: [
            "Como você se sente após este exercício?",
            "Que outras práticas de bem-estar gostaria de explorar?"
          ]
        }
      }
    }

    const categoryResponses = fallbackResponses[missionType as keyof typeof fallbackResponses]
    if (!categoryResponses) {
      return this.getGenericFallback()
    }

    const difficultyResponse = categoryResponses[difficulty as keyof typeof categoryResponses]
    return difficultyResponse || this.getGenericFallback()
  }

  private getGenericFallback(): AIResponse {
    return {
      content: "Vamos trabalhar juntos nesta missão! Siga os passos abaixo para completar seu objetivo.",
      steps: [
        "Defina claramente o que quer alcançar",
        "Divida em pequenas ações executáveis",
        "Execute uma ação por vez",
        "Reflita sobre o progresso feito"
      ],
      tips: [
        "Foque no progresso, não na perfeição",
        "Celebre pequenas vitórias ao longo do caminho"
      ],
      estimatedTime: 15,
      difficulty: 'medium',
      followUp: [
        "Como se sente sobre este desafio?",
        "Que recursos você tem disponíveis para ajudar?"
      ]
    }
  }

  // Test AI connection
  public async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      return { success: false, error: 'API key não configurada' }
    }

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Test connection' }],
          max_tokens: 10
        })
      })

      if (response.ok) {
        return { success: true }
      } else {
        const errorData = await response.json()
        return { success: false, error: errorData.error?.message || 'Erro de conexão' }
      }
    } catch (error) {
      return { success: false, error: 'Erro de rede' }
    }
  }
}

// Singleton instance
export const aiService = AIService.getInstance()

// Helper functions
export const generateMissionGuidance = async (
  missionId: string,
  userLevel: number,
  customPrompt?: string
): Promise<AIResponse> => {
  const request: OpenAIRequest = {
    prompt: customPrompt || `Guie o usuário através desta missão de forma personalizada e prática.`,
    missionType: 'productivity', // This would be determined by mission
    userLevel,
    difficulty: 'medium'
  }

  const response = await aiService.generateMissionContent(request)
  
  if (response.success && response.data) {
    return response.data
  } else {
    // Return fallback response
    return aiService.getFallbackResponse('productivity', 'medium')
  }
}

export const generatePersonalizedTips = async (
  category: string,
  userLevel: number,
  context: string
): Promise<string[]> => {
  const request: OpenAIRequest = {
    prompt: `Gere 3 dicas personalizadas para ${category} considerando: ${context}`,
    missionType: category as any,
    userLevel,
    difficulty: 'medium'
  }

  const response = await aiService.generateMissionContent(request)
  
  if (response.success && response.data?.tips) {
    return response.data.tips
  } else {
    // Return fallback tips
    return [
      "Mantenha consistência em pequenas ações diárias",
      "Foque no progresso, não na perfeição",
      "Celebre suas conquistas, por menores que sejam"
    ]
  }
}