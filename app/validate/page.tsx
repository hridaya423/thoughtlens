/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Brain, Sparkles } from 'lucide-react'
import ValidationResults from '@/components/ValidationResult'
import { ValidationType } from '@/types'

export default function Home() {
  const [idea, setIdea] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('business')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ValidationType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateIdea = async () => {
    if (!idea.trim() || !description.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea,
          description,
          category,
        }),
      })

      if (!response.ok) {
        throw new Error('Validation failed')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError('Failed to validate idea. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Validate Your Vision
        </h1>
        
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Idea Validation
              </CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Get real-time market insights and AI-powered validation for your idea
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="idea" className="text-gray-700">Your Idea</Label>
                <Input
                  id="idea"
                  placeholder="Enter your idea title"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-32 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-700">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="business">Business</option>
                  <option value="product">Product</option>
                  <option value="content">Content</option>
                </select>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={validateIdea} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105 group"
              >
                {isLoading ? (
                  'Analyzing...'
                ) : (
                  <span className="flex items-center justify-center">
                    <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Validate Idea
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && <ValidationResults results={results} />}
      </div>
    </main>
  )
}