/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const validateSchema = z.object({
  idea: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['business', 'product', 'content']),
})

function extractJSON(text: string) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No JSON found in response')
  } catch (error) {
    console.error('Error extracting JSON:', error)
    throw error
  }
}

async function getCompleteAnalysis(idea: string, description: string) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      system: "You are a comprehensive business analyst. You must respond with valid JSON only, no other text.",
      messages: [{
        role: "user",
        content: `Analyze this business idea and return a JSON object with exactly this structure:
{
  "marketTrends": {
    "score": <number between 0-100>,
    "trends": <array of strings with current relevant trends>,
    "analysis": <string explaining the market trends analysis>
  },
  "competition": {
    "score": <number between 0-100>,
    "competitors": <array of strings with main competitors>,
    "analysis": <string explaining the competitive landscape>
  },
  "sentiment": {
    "score": <number between 0-100>,
    "analysis": <string explaining the market sentiment analysis>
  },
  "recommendations": <array of strings with strategic recommendations>,
  "overallScore": <number between 0-100 representing the average of all scores>
}

Idea: ${idea}
Description: ${description}

Remember to return ONLY the JSON object, no other text.`
      }]
    })

    const content = message.content[0].type === 'text' 
      ? message.content[0].text
      : '';
    return extractJSON(content)
  } catch (error) {
    console.error('Error in complete analysis:', error)
    return {
      marketTrends: {
        score: 0,
        trends: [],
        analysis: 'Failed to analyze market trends'
      },
      competition: {
        score: 0,
        competitors: [],
        analysis: 'Failed to analyze competition'
      },
      sentiment: {
        score: 0,
        analysis: 'Failed to analyze market sentiment'
      },
      recommendations: ['Failed to generate recommendations'],
      overallScore: 0
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { idea, description, category } = validateSchema.parse(body)

    const analysis = await getCompleteAnalysis(idea, description)
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze idea' },
      { status: 500 }
    )
  }
}
