'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TickerItem {
  symbol: string
  price: string
  change: string
  positive: boolean
}

export interface MarketTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TickerItem[]
}

export function MarketTicker({ items, className, ...props }: MarketTickerProps) {
  // Duplicate items for seamless infinite scroll
  const scrollItems = [...items, ...items, ...items]

  return (
    <div 
      className={cn(
        "flex overflow-hidden w-full bg-secondary/50 border-y border-white/5 py-3", 
        className
      )}
      {...props}
    >
      <motion.div
        className="flex space-x-12 whitespace-nowrap px-4"
        animate={{
          x: ['0%', '-33.33%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        }}
      >
        {scrollItems.map((item, idx) => (
          <div key={`${item.symbol}-${idx}`} className="flex items-center space-x-3 text-sm font-mono">
            <span className="text-text-secondary font-semibold">{item.symbol}</span>
            <span className="text-white">{item.price}</span>
            <span className={cn(
              "flex items-center",
              item.positive ? "text-success" : "text-error"
            )}>
              {item.positive ? '↑' : '↓'} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
