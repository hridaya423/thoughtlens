export interface ValidationType {
    overallScore: number
    marketTrends: {
      score: number
      trends: string[]
      analysis: string
    }
    competition: {
      score: number
      competitors: string[]
      analysis: string
    }
    sentiment: {
      score: number
      analysis: string
    }
    recommendations: string[]
  }