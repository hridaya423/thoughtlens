import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ValidationType } from '@/types'
import { TrendingUp, Users, LineChart, Lightbulb } from 'lucide-react'

export default function ValidationResults({ results }: { results: ValidationType }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-400 to-green-600'
    if (score >= 60) return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    return 'bg-gradient-to-r from-red-400 to-red-600'
  }

  const renderIcon = (type: string) => {
    const iconClass = "h-6 w-6 text-blue-600"
    switch(type) {
      case 'market': return <TrendingUp className={iconClass} />
      case 'competition': return <Users className={iconClass} />
      case 'sentiment': return <LineChart className={iconClass} />
      default: return <Lightbulb className={iconClass} />
    }
  }

  return (
    <div className="mt-8 space-y-6 max-w-2xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="bg-blue-50/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Overall Score</h3>
              <Progress value={results.overallScore} className={getScoreColor(results.overallScore)} />
              <p className="mt-2 text-sm text-gray-600">{results.overallScore}% Viability Score</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    {renderIcon('market')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Market Trends</h3>
                </div>
                <Progress value={results.marketTrends.score} className={getScoreColor(results.marketTrends.score)} />
                <p className="mt-4 text-gray-700">{results.marketTrends.analysis}</p>
                <ul className="mt-4 space-y-2">
                  {results.marketTrends.trends.map((trend, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span>{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    {renderIcon('competition')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Competition Analysis</h3>
                </div>
                <Progress value={results.competition.score} className={getScoreColor(results.competition.score)} />
                <p className="mt-4 text-gray-700">{results.competition.analysis}</p>
                <ul className="mt-4 space-y-2">
                  {results.competition.competitors.map((competitor, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      <span>{competitor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-pink-100 p-2 rounded-xl">
                    {renderIcon('sentiment')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Market Sentiment</h3>
                </div>
                <Progress value={results.sentiment.score} className={getScoreColor(results.sentiment.score)} />
                <p className="mt-4 text-gray-700">{results.sentiment.analysis}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-xl">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2"></span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}