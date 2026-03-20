'use client'

import { useState, useEffect, useCallback } from 'react'
import { MarketItem } from '@/lib/types'
import { useLanguage } from '@/lib/i18n'
import { GlassCard } from './ui/GlassCard'
import { RefreshCcw } from 'lucide-react'

interface MarketSnapshotProps {
  initialData?: MarketItem[]
  initialTimestamp?: number
}

function SkeletonCard() {
  return (
    <GlassCard className="p-5 animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-4 w-16 bg-white/10 rounded mb-3" />
          <div className="h-7 w-24 bg-white/10 rounded" />
        </div>
        <div className="h-5 w-14 bg-white/10 rounded" />
      </div>
    </GlassCard>
  )
}

function MarketCard({ item }: { item: MarketItem }) {
  const isPositive = item.change >= 0
  const changeColor = isPositive ? 'text-success' : 'text-error'

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === 'BTC') {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    if (symbol === 'VIX' || symbol === 'DXY') {
      return price.toFixed(2)
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <GlassCard className="p-5 flex flex-col justify-between group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-text-secondary font-medium tracking-wide">{item.name}</p>
        <div className={`font-mono text-sm px-2 py-0.5 rounded-md bg-white/5 ${changeColor}`}>
          {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
        </div>
      </div>
      <div>
        <p className="text-white font-mono text-2xl font-bold tracking-tight">
          {formatPrice(item.price, item.symbol)}
        </p>
        <div className={`text-sm font-mono mt-1 flex items-center gap-1 ${changeColor}`}>
          <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
          {Math.abs(item.change).toFixed(2)}
        </div>
      </div>
    </GlassCard>
  )
}

export default function MarketSnapshot({ initialData, initialTimestamp }: MarketSnapshotProps) {
  const [data, setData] = useState<MarketItem[] | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    initialTimestamp ? new Date(initialTimestamp) : null
  )
  const [refreshing, setRefreshing] = useState(false)
  const { t } = useLanguage()

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const res = await fetch('/api/market-snapshot', {
        cache: 'no-store'
      })
      if (!res.ok) throw new Error('Failed to fetch market data')
      const result = await res.json()
      setData(result.data)
      setLastUpdated(new Date(result.timestamp))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (!initialData) {
      fetchData()
    }
  }, [initialData, fetchData])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(true)
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [fetchData])

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes === 1) return '1 min ago'
    return `${minutes} min ago`
  }

  return (
    <section className="bg-primary relative py-12 md:py-24">
      {/* Centered optical glow focused mostly behind the snapshot cards, tightly feathered to not spill heavily into adjacent sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[250px] bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('market.title')}</h2>
            <p className="text-text-secondary">Visión general de los principales activos en tiempo real.</p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-text-secondary text-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {formatTimeAgo(lastUpdated)}
              </span>
            )}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="text-text-secondary hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 transition-colors disabled:opacity-50"
              title={t('market.refresh')}
            >
              <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-xl p-4 mb-8 flex justify-between items-center">
            <p className="text-error text-sm">{t('market.error')}</p>
            <button
              onClick={() => fetchData()}
              className="text-error font-medium underline text-sm"
            >
              {t('market.retry')}
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {data.map((item) => (
              <MarketCard key={item.symbol} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary bg-white/5 rounded-2xl border border-white/10">
            No market data available
          </div>
        )}
      </div>
    </section>
  )
}
