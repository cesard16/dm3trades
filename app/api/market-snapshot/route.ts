import { NextResponse } from 'next/server'
import { getMarketSnapshot } from '@/services/marketSnapshot'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const result = await getMarketSnapshot()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Market snapshot error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}
