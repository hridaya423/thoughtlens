/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

async function getMarketTrends(idea: string) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: "You are a market research expert. You must respond with valid JSON only, no other text.",
      messages: [{
        role: "user",
        content: `Analyze the market trends for this idea and return a JSON object with exactly this structure:
{
  "score": <number between 0-100>,
  "trends": <array of strings with current relevant trends>,
  "analysis": <string explaining the market trends analysis>
}

Idea to analyze: ${idea}

Remember to return ONLY the JSON object, no other text.`
      }]
    })

    const content = message.content[0].type === 'text' 
    ? message.content[0].text
    : '';
    return extractJSON(content)
  } catch (error) {
    console.error('Error getting market trends:', error)
    return {
      score: 0,
      trends: [],
      analysis: 'Failed to analyze market trends'
    }
  }
}

async function analyzeCompetition(idea: string, description: string) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: "You are a competitive analysis expert. You must respond with valid JSON only, no other text.",
      messages: [{
        role: "user",
        content: `Analyze the competition for this idea and return a JSON object with exactly this structure:
{
  "score": <number between 0-100>,
  "competitors": <array of strings with main competitors>,
  "analysis": <string explaining the competitive landscape>
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
    console.error('Error analyzing competition:', error)
    return {
      score: 0,
      competitors: [],
      analysis: 'Failed to analyze competition'
    }
  }
}

async function analyzeSentiment(idea: string, description: string) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: "You are a market sentiment analyst. You must respond with valid JSON only, no other text.",
      messages: [{
        role: "user",
        content: `Analyze the market sentiment for this idea and return a JSON object with exactly this structure:
{
  "score": <number between 0-100>,
  "analysis": <string explaining the market sentiment analysis>
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
    console.error('Error analyzing sentiment:', error)
    return {
      score: 0,
      analysis: 'Failed to analyze market sentiment'
    }
  }
}
async function generateRecommendations(
  idea: string,
  description: string,
  marketTrends: any,
  competition: any,
  sentiment: any
) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      system: "You are a business strategy expert. You must respond with valid JSON only, no other text.",
      messages: [{
        role: "user",
        content: `Based on the analysis provided, generate recommendations and return them as a JSON array of strings.
The response should be ONLY a JSON array like this: ["recommendation 1", "recommendation 2", ...]

Idea: ${idea}
Description: ${description}
Market Trends Analysis: ${JSON.stringify(marketTrends)}
Competition Analysis: ${JSON.stringify(competition)}
Sentiment Analysis: ${JSON.stringify(sentiment)}

Remember to return ONLY the JSON array, no other text.`
      }]
    })

    const content = message.content[0].type === 'text' 
    ? message.content[0].text
    : '';
    return extractJSON(content)
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return ['Failed to generate recommendations']
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { idea, description, category } = validateSchema.parse(body)

    const marketTrends = await getMarketTrends(idea)

    const competition = await analyzeCompetition(idea, description)

    const sentiment = await analyzeSentiment(idea, description)

    const overallScore = Math.round(
      (marketTrends.score + competition.score + sentiment.score) / 3
    )

    const recommendations = await generateRecommendations(
      idea,
      description,
      marketTrends,
      competition,
      sentiment
    )
    return NextResponse.json({
      overallScore,
      marketTrends,
      competition,
      sentiment,
      recommendations
    })
  } catch (error) {
    console.error('Validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate idea' },
      { status: 500 }
    )
  }
}