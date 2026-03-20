'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/lib/i18n'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Lock, Brain, LineChart, ShieldAlert, Sparkles } from 'lucide-react'

const marketCards = [
  { label: 'S&P 500', value: '5,123.45', change: '+0.46%', positive: true },
  { label: 'NASDAQ', value: '16,234.89', change: '-0.28%', positive: false },
  { label: 'BTC/USD', value: '67,432.10', change: '+1.87%', positive: true },
  { label: 'VIX', value: '13.45', change: '-4.74%', positive: false },
  { label: 'DXY', value: '104.23', change: '+0.12%', positive: true },
  { label: 'GOLD', value: '2,345.67', change: '+0.53%', positive: true },
]

const aiModules = [
  {
    titleKey: 'terminal.sentiment',
    descKey: 'terminal.sentimentDesc',
    icon: <Brain className="w-5 h-5" />,
    status: 'coming_soon',
  },
  {
    titleKey: 'terminal.predictions',
    descKey: 'terminal.predictionsDesc',
    icon: <Sparkles className="w-5 h-5" />,
    status: 'coming_soon',
  },
  {
    titleKey: 'terminal.patterns',
    descKey: 'terminal.patternsDesc',
    icon: <LineChart className="w-5 h-5" />,
    status: 'coming_soon',
  },
  {
    titleKey: 'terminal.risk',
    descKey: 'terminal.riskDesc',
    icon: <ShieldAlert className="w-5 h-5" />,
    status: 'coming_soon',
  },
]

const translations: Record<string, Record<string, string>> = {
  'terminal.sentiment': { es: 'Sentimiento del Mercado', en: 'Market Sentiment' },
  'terminal.sentimentDesc': { es: 'Análisis de sentimiento impulsado por IA', en: 'AI-powered sentiment analysis' },
  'terminal.predictions': { es: 'Predicciones de Precio', en: 'Price Predictions' },
  'terminal.predictionsDesc': { es: 'Modelos de ML para forecasting', en: 'ML models for price forecasting' },
  'terminal.patterns': { es: 'Reconocimiento de Patrones', en: 'Pattern Recognition' },
  'terminal.patternsDesc': { es: 'Detección automática de patrones', en: 'Automated chart pattern detection' },
  'terminal.risk': { es: 'Evaluación de Riesgo', en: 'Risk Assessment' },
  'terminal.riskDesc': { es: 'Análisis de riesgo de portafolio', en: 'Portfolio risk analysis' },
}

export default function TerminalPage() {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t('terminal.title')}</h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl">
              {t('terminal.subtitle') || 'Monitorización en tiempo real y análisis potenciado por Inteligencia Artificial.'}
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Market Data & Modules */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              {/* Market Summary */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-accent" />
                  {t('terminal.summary') || 'Resumen de Mercado'}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {marketCards.map((card) => (
                    <GlassCard key={card.label} className="p-4 group cursor-default">
                      <p className="text-text-secondary text-sm font-medium">{card.label}</p>
                      <p className="text-white font-mono text-xl font-bold mt-1 tracking-tight">{card.value}</p>
                      <p className={`text-sm font-mono mt-1 ${card.positive ? 'text-success' : 'text-error'}`}>
                        {card.change}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </div>

              {/* Quick Access Modules */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-accent" />
                  {t('terminal.modules') || 'Módulos Analíticos'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiModules.map((module) => (
                    <GlassCard key={module.titleKey} className="p-5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-accent">
                          {module.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/20 text-accent rounded-full">
                          {t('terminal.comingSoon') || 'Próximamente'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1 relative z-10">
                        {translations[module.titleKey]?.[language] || module.titleKey}
                      </h3>
                      <p className="text-text-secondary text-sm relative z-10">
                        {translations[module.descKey]?.[language] || module.descKey}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: AI Analysis Panel */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-24">
                <GlassCard className="p-8 h-full flex flex-col items-center text-center border-accent/20 bg-gradient-to-b from-white/[0.05] to-transparent relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                  
                  <div className="w-20 h-20 bg-primary border border-white/10 rounded-full mb-6 relative mx-auto">
                    <div className="absolute inset-0 rounded-full border border-accent/30 animate-[spin_4s_linear_infinite]" />
                    <Lock className="w-8 h-8 text-text-secondary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t('terminal.aiTitle') || 'DM3 AI Engine'}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed mb-8">
                    {t('terminal.aiUnlock')}
                  </p>
                  
                  <div className="w-full space-y-4 mb-8">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent/50 w-2/3 rounded-full" />
                    </div>
                    <p className="text-xs text-text-secondary font-mono">{t('terminal.beta')}</p>
                  </div>

                  <Button className="w-full group">
                    <Lock className="w-4 h-4 mr-2" />
                    {t('terminal.vipAccess')}
                  </Button>
                </GlassCard>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function LayoutGrid(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}
