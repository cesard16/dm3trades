import { MarketItem, MarketSnapshotResponse } from '@/lib/types'

// In-memory cache
let cache: {
  data: MarketItem[]
  timestamp: number
} | null = null

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

const MOCK_DATA: MarketItem[] = [
  { symbol: 'SPX500', name: 'S&P 500', price: 5123.45, change: 23.67, changePercent: 0.46 },
  { symbol: 'NASDAQ', name: 'NASDAQ', price: 16234.89, change: -45.23, changePercent: -0.28 },
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.10, change: 1234.56, changePercent: 1.87 },
  { symbol: 'VIX', name: 'Volatility Index', price: 13.45, change: -0.67, changePercent: -4.74 },
  { symbol: 'DXY', name: 'US Dollar Index', price: 104.23, change: 0.12, changePercent: 0.12 },
  { symbol: 'GOLD', name: 'Gold', price: 2345.67, change: 12.34, changePercent: 0.53 },
]

async function fetchFinnhubQuote(symbol: string): Promise<{ price: number; change: number } | null> {
  const apiKey = process.env.FINNHUB_API_KEY
  if (!apiKey || apiKey === 'your_finnhub_api_key_here') {
    return null
  }

  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`, {
      next: { revalidate: 300 }
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.c) return null
    return {
      price: data.c,
      change: data.d || 0
    }
  } catch {
    return null
  }
}

async function fetchBTCPrice(): Promise<{ price: number; change: number } | null> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.bitcoin) return null
    return {
      price: data.bitcoin.usd,
      change: (data.bitcoin.usd_24h_change / 100) * data.bitcoin.usd
    }
  } catch {
    return null
  }
}

export async function getMarketSnapshot(forceRefresh = false): Promise<MarketSnapshotResponse> {
  const now = Date.now()

  // Return cached data if valid
  if (!forceRefresh && cache && (now - cache.timestamp) < CACHE_TTL) {
    return {
      data: cache.data,
      cached: true,
      timestamp: cache.timestamp
    }
  }

  // Fetch fresh data
  const results = await Promise.all([
    fetchFinnhubQuote('SPX'),
    fetchFinnhubQuote('QQQ'), // NASDAQ proxy
    fetchBTCPrice(),
    fetchFinnhubQuote('VIX'),
    fetchFinnhubQuote('DXY'),
    fetchFinnhubQuote('XAU'), // Gold
  ])

  const marketData: MarketItem[] = [
    {
      symbol: 'SPX500',
      name: 'S&P 500',
      price: results[0]?.price ?? MOCK_DATA[0].price,
      change: results[0]?.change ?? MOCK_DATA[0].change,
      changePercent: results[0] ? (results[0].change / results[0].price) * 100 : MOCK_DATA[0].changePercent
    },
    {
      symbol: 'NASDAQ',
      name: 'NASDAQ',
      price: results[1]?.price ?? MOCK_DATA[1].price,
      change: results[1]?.change ?? MOCK_DATA[1].change,
      changePercent: results[1] ? (results[1].change / results[1].price) * 100 : MOCK_DATA[1].changePercent
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: results[2]?.price ?? MOCK_DATA[2].price,
      change: results[2]?.change ?? MOCK_DATA[2].change,
      changePercent: results[2] ? results[2].change : MOCK_DATA[2].changePercent
    },
    {
      symbol: 'VIX',
      name: 'Volatility Index',
      price: results[3]?.price ?? MOCK_DATA[3].price,
      change: results[3]?.change ?? MOCK_DATA[3].change,
      changePercent: results[3] ? (results[3].change / results[3].price) * 100 : MOCK_DATA[3].changePercent
    },
    {
      symbol: 'DXY',
      name: 'US Dollar Index',
      price: results[4]?.price ?? MOCK_DATA[4].price,
      change: results[4]?.change ?? MOCK_DATA[4].change,
      changePercent: results[4] ? (results[4].change / results[4].price) * 100 : MOCK_DATA[4].changePercent
    },
    {
      symbol: 'GOLD',
      name: 'Gold',
      price: results[5]?.price ?? MOCK_DATA[5].price,
      change: results[5]?.change ?? MOCK_DATA[5].change,
      changePercent: results[5] ? (results[5].change / results[5].price) * 100 : MOCK_DATA[5].changePercent
    },
  ]

  // Update cache
  cache = {
    data: marketData,
    timestamp: now
  }

  return {
    data: marketData,
    cached: false,
    timestamp: now
  }
}
