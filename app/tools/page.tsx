'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/lib/i18n'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Calculator, CalendarDays, Search, ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'

export default function ToolsPage() {
  const { t } = useLanguage()

  const upcomingTools = [
    {
      title: t('tools.positionSize'),
      desc: t('tools.positionSizeDesc'),
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      title: t('tools.calendar'),
      desc: t('tools.calendarDesc'),
      icon: <CalendarDays className="w-6 h-6" />,
    },
    {
      title: t('tools.screener'),
      desc: t('tools.screenerDesc'),
      icon: <Search className="w-6 h-6" />,
    },
  ]

  return (
    <main className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-24 md:pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t('tools.title')}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('tools.subtitle')}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTools.map((tool, idx) => (
              <GlassCard key={idx} className="p-8 relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-accent group-hover:bg-accent/10 transition-colors">
                    {tool.icon}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                    <Lock className="w-3 h-3" />
                    {t('terminal.comingSoon')}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 relative z-10">{tool.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed relative z-10">{tool.desc}</p>
                
                {/* Subtle Glow Effect */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-accent/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </GlassCard>
            ))}
            
            {/* Empty placeholder */}
            <div className="rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-8 text-center text-text-secondary opacity-40 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer">
              <div className="p-3 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 opacity-30" />
              </div>
              <span className="text-sm font-medium tracking-tight">{t('tools.suggest')}</span>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
