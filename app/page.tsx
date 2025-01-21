'use client'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles,     
  TrendingUp, 
  Users, 
  LineChart,
  Brain,
  Rocket,
  Zap
} from 'lucide-react'
import { useEffect, useState } from 'react'

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2 group">
          <div className="relative">
            <Brain className="h-8 w-8 text-blue-600 transition-transform group-hover:scale-110" />
            <div className="absolute -inset-1 bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            ThoughtLens
          </span>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            <span className="flex items-center">
              Get Started
              <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
            </span>
          </Button>
      </nav>
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="max-w-4xl mx-auto relative">
          <FloatingElement>
            <h1 className="text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Turn Ideas into
              </span>
              <br />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Validated Success
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 100 10">
                  <path d="M0 5 Q25 0, 50 5 T100 5" fill="none" stroke="url(#gradient)" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </FloatingElement>
          
          <FloatingElement delay={0.2}>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Transform your ideas into validated opportunities with our AI-powered analysis.
              Get real-time insights into market trends, competition, and sentiment.
            </p>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <Link href="/validate">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16 px-12 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                <span className="flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 group-hover:animate-pulse" />
                  Validate Your Idea
                  <Zap className="ml-2 h-6 w-6 group-hover:animate-bounce" />
                </span>
              </Button>
            </Link>
          </FloatingElement>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 relative">
        <FloatingElement>
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Make Informed Decisions
          </h2>
        </FloatingElement>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FloatingElement delay={0.2}>
            <Card className="p-8 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-blue-100 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Market Trend Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get real-time insights into market trends and opportunities that align with your idea.
                </p>
              </div>
            </Card>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <Card className="p-8 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-purple-100 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Competitive Landscape</h3>
                <p className="text-gray-600 leading-relaxed">
                  Understand your competition and identify gaps in the market you can exploit.
                </p>
              </div>
            </Card>
          </FloatingElement>
          <FloatingElement delay={0.6}>
            <Card className="p-8 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="bg-pink-100 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <LineChart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Sentiment Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gauge market reception and validate demand for your idea before investing resources.
                </p>
              </div>
            </Card>
          </FloatingElement>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 relative">
        <FloatingElement>
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            How ThoughtLens Works
          </h2>
        </FloatingElement>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>
          
          <div className="space-y-16">
            <FloatingElement delay={0.2}>
              <div className="relative pl-24">
                <div className="absolute left-0 bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-semibold mb-4">Share Your Idea</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Describe your idea and select its category. Our AI understands the context 
                    and nuances of your vision, ensuring accurate analysis.
                  </p>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.4}>
              <div className="relative pl-24">
                <div className="absolute left-0 bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our advanced AI analyzes market trends, competition, and sentiment to provide 
                    comprehensive insights that guide your decision-making.
                  </p>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.6}>
              <div className="relative pl-24">
                <div className="absolute left-0 bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl">
                  <Rocket className="h-8 w-8 text-pink-600" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-semibold mb-4">Get Actionable Insights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Receive a detailed report with validation scores, market analysis, and 
                    strategic recommendations to refine and improve your idea.
                  </p>
                </div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 relative">
            <FloatingElement>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-90"></div>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff33_1px,transparent_1px),linear-gradient(180deg,#ffffff33_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
                <div className="relative p-12 text-center">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Ready to Validate Your Idea?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join innovative entrepreneurs and businesses using ThoughtLens to validate 
                    their ideas and make data-driven decisions.
                  </p>
                  <Link href="/validate">
                    <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 group">
                      Get Started Now
                      <Sparkles className="ml-2 h-5 w-5 text-purple-600 group-hover:animate-pulse" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FloatingElement>
          </section>
    </div>
  )
}