'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { 
  Users, 
  BookOpen, 
  Crown, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  MessageSquare, 
  Radio, 
  BarChart3, 
  GraduationCap, 
  Zap, 
  TrendingUp,
  Lock 
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

const WHOP_URL = 'https://www.whop.com/dm3trades?utm_source=dm3trades&utm_medium=website'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

const staggeredContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AcademyPage() {
  const { t } = useLanguage()

  const mainFeatures = [
    { 
      icon: <Bot className="w-5 h-5" />, 
      title: t('academy.feat1_title'), 
      desc: t('academy.feat1_desc') 
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />, 
      title: t('academy.feat2_title'), 
      desc: t('academy.feat2_desc') 
    },
    { 
      icon: <Radio className="w-5 h-5" />, 
      title: t('academy.feat3_title'), 
      desc: t('academy.feat3_desc') 
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      title: t('academy.feat4_title'), 
      desc: t('academy.feat4_desc') 
    }
  ]

  const includes = [
    { 
      icon: <GraduationCap className="w-5 h-5" />, 
      title: t('academy.incl1_title'), 
      desc: t('academy.incl1_desc') 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      title: t('academy.incl2_title'), 
      desc: t('academy.incl2_desc') 
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      title: t('academy.incl3_title'), 
      desc: t('academy.incl3_desc') 
    }
  ]

  const roadmap = [
    { 
      title: t('academy.roadmap1'), 
      status: t('academy.roadmap1_status'), 
      dot: 'bg-accent', 
      badge: 'bg-accent/10 text-accent border-accent/20' 
    },
    { 
      title: t('academy.roadmap2'), 
      status: t('academy.roadmap2_status'), 
      dot: 'bg-yellow-400', 
      badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' 
    },
    { 
      title: t('academy.roadmap3'), 
      status: t('academy.roadmap3_status'), 
      dot: 'bg-white/30', 
      badge: 'bg-white/5 text-white/40 border-white/10' 
    }
  ]

  return (
    <main className="min-h-screen bg-[#080b09] text-white selection:bg-accent/30 flex flex-col">
      <Header />

      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-green opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,208,132,0.15)_0,transparent_70%)]" />
      </div>

      <section className="flex-1 flex items-center pt-20 md:pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <motion.div 
              variants={staggeredContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* VIP Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {t('academy.vipBadge')}
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                {t('academy.headline1')}
                <span className="text-accent block mt-1">
                  {t('academy.headline2')}
                </span>
              </motion.h1>

              {/* Social Proof */}
              <motion.div variants={fadeInUp} className="max-w-sm">
                <GlassCard className="p-3 flex items-center gap-3 bg-white/[0.02] border-white/5">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080b09] bg-secondary flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 42}`} 
                          alt="Trader"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] font-medium text-white/70 leading-snug">
                    {t('academy.socialProof')}
                  </p>
                </GlassCard>
              </motion.div>

              {/* Features Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {mainFeatures.map((feat, i) => (
                  <div 
                    key={i} 
                    className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/40 transition-all duration-300 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`${feat.title}: ${feat.desc}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform shrink-0" aria-hidden="true">
                        {feat.icon}
                      </div>
                      <h3 className="text-lg font-bold">{feat.title}</h3>
                    </div>
                    <p className="text-[13px] text-white/40 leading-relaxed font-sans">{feat.desc}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Membership Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative lg:ml-auto w-full max-w-[340px] sm:max-w-sm mx-auto lg:mx-0"
            >
              {/* Main Card with Hover Border */}
              <HoverBorderGradient 
                containerClassName="rounded-3xl p-[1px]"
                className="bg-transparent"
                duration={3}
              >
                <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-[3rem] opacity-20 group-hover:opacity-40 transition-opacity" />
                <GlassCard className="relative overflow-visible p-0 border-none bg-[#0c100d]/90 rounded-[inherit] shadow-2xl cursor-default backdrop-blur-xl">
                  <div className="relative">
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-2 block">
                        {t('academy.cardLabel')}
                      </span>
                      <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
                        {t('academy.cardTitle')}
                      </h2>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold text-white">
                          {t('academy.cardPrice')}
                        </span>
                        <span className="text-[12px] font-bold text-white/40 uppercase self-end mb-1">USD</span>
                        <span className="text-white/40 font-medium text-sm">{t('academy.cardPeriod')}</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 border-y border-white/5 py-5 px-3 bg-white/[0.01]" role="list">
                      <div className="text-center px-1 space-y-1" role="listitem">
                        <div className="text-sm font-bold">50+</div>
                        <div className="text-[10px] text-white/30 uppercase font-bold tracking-tight leading-none">{t('academy.statsMembers')}</div>
                      </div>
                      <div className="text-center px-1 border-x border-white/5 space-y-1" role="listitem">
                        <div className="text-lg font-extrabold text-accent">4.9★</div>
                        <div className="text-[10px] text-white/40 uppercase font-extrabold tracking-tight leading-none">{t('academy.statsRating')}</div>
                      </div>
                      <div className="text-center px-1 space-y-1" role="listitem">
                        <div className="text-sm font-bold flex items-center justify-center gap-1">
                          7d <span className="text-[10px] font-normal opacity-30 tracking-widest">FREE</span>
                        </div>
                        <div className="text-[10px] text-white/30 uppercase font-bold tracking-tight leading-none">{t('academy.statsTrial')}</div>
                      </div>
                    </div>

                    {/* Includes Section */}
                    <div className="p-6 py-5 space-y-4">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                        {t('academy.inclTitle')}
                      </h4>
                      <div className="space-y-4" role="list">
                        {includes.map((item, i) => (
                          <div key={i} className="flex items-start gap-4 group cursor-help" role="listitem" title={item.desc}>
                            <div className="relative w-8 h-8 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-lg bg-accent opacity-[0.08] group-hover:opacity-[0.12] transition-opacity" />
                              <div className="relative text-accent" aria-hidden="true">
                                {item.icon}
                              </div>
                            </div>
                            <div className="flex-1 pr-6 pt-0.5">
                              <h5 className="text-sm font-bold mb-0.5">{item.title}</h5>
                              <p className="text-[11px] text-white/40 leading-snug">{item.desc}</p>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1 opacity-80" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Container */}
                    <div className="p-6 pt-6 space-y-3">
                      <a href={WHOP_URL} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-lg transition-shadow">
                        <Button 
                          className="w-full py-5 text-[14px] font-bold bg-accent hover:bg-accent-light text-black rounded-lg shadow-[0_0_15px_rgba(0,208,132,0.15)] hover:shadow-[0_0_20px_rgba(0,208,132,0.3)] transition-all duration-300 active:scale-[0.98]"
                        >
                          {t('academy.cta')}
                        </Button>
                      </a>
                      <div className="flex items-center justify-center gap-2 text-white/30" aria-hidden="true">
                        <Lock className="w-3 h-3" />
                        <span className="text-[10px] font-medium">{t('academy.ctaSubtext')}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </HoverBorderGradient>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Roadmap Scroll Section */}
      <section className="py-16 md:py-24 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">
              {t('academy.roadmapTitle')}
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Nuestra visión para el ecosistema DM3 en 2025. Innovación constante para tu ventaja competitiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-8 h-full bg-white/[0.01] border-white/5 hover:border-accent/20 transition-all duration-500 group">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={cn("w-3 h-3 rounded-full mb-6 blur-[0.1px] shadow-[0_0_15px] shadow-current transition-transform group-hover:scale-125", item.dot)} aria-hidden="true" />
                  <h3 className="text-lg font-bold mb-4 flex-1">
                    {item.title}
                  </h3>
                  <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full border tracking-wider", item.badge)}>
                    {item.status}
                  </span>
                </div>
              </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
