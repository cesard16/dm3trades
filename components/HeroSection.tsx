'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from './ui/Button'
import { GradientText } from './ui/GradientText'
import { MarketTicker } from './ui/MarketTicker'
import { ArrowRight, Activity } from 'lucide-react'
import { TextMarquee } from './ui/text-marquee'
import { WavyBackground } from './ui/wavy-background'

const dummyTicker = [
  { symbol: 'S&P 500', price: '5,123.45', change: '0.46%', positive: true },
  { symbol: 'NASDAQ', price: '16,234.89', change: '0.28%', positive: false },
  { symbol: 'BTC', price: '$67,432.10', change: '1.87%', positive: true },
  { symbol: 'VIX', price: '13.45', change: '-4.74%', positive: false },
  { symbol: 'DXY', price: '104.23', change: '0.12%', positive: true },
  { symbol: 'GOLD', price: '2,345.67', change: '0.53%', positive: true },
]

export default function HeroSection() {
  const { t, language } = useLanguage()
  const { scrollY } = useScroll()
  
  const marqueeWords = language === 'en'
    ? ['Insights', 'Analysis', 'Signals', 'Decision', 'Liquidity']
    : ['Análisis', 'Insights', 'Señales', 'Decisión']
  
  const scrollOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const scrollYOffset = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <section className="relative w-full">
      {/* Market Ticker at top, exactly below the 16px header */}
      <div className="absolute top-16 left-0 right-0 w-full z-30 border-b border-white/5 bg-primary/95 backdrop-blur-md">
        <MarketTicker items={dummyTicker} />
      </div>

      <WavyBackground
        containerClassName="min-h-[80vh] md:min-h-[90vh] bg-primary pt-32 md:pt-28 h-auto"
        className="w-full flex-1 flex items-center justify-center"
        waveOpacity={0.5}
        blur={10}
        speed="slow"
        colors={[
          "rgba(0, 208, 132, 0.15)",
          "rgba(0, 168, 107, 0.15)",
          "rgba(10, 48, 34, 0.2)",
          "rgba(0, 255, 157, 0.1)",
          "rgba(0, 143, 87, 0.15)"
        ]}
      >
        <motion.div 
          className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: scrollOpacity, y: scrollYOffset }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-text-secondary mb-8">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>{t('hero.badge')}</span>
            </div>

            <div className="flex justify-center mb-6 px-1">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
                <TextMarquee
                  key={language}
                  prefix={<span>Trading &</span>}
                  height="1.5em"
                  speed={1.5}
                  className="justify-center"
                >
                  {marqueeWords.map((word, i) => (
                    <GradientText key={i} className="pb-1">{word}</GradientText>
                  ))}
                </TextMarquee>
              </h1>
            </div>

            <p className="mt-4 text-sm sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
              {t('hero.desc')}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/insights" passHref legacyBehavior>
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  {t('hero.explore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/terminal" passHref legacyBehavior>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                  <Activity className="w-4 h-4" />
                  {t('nav.terminal')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </WavyBackground>
    </section>
  )
}
