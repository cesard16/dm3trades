'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { GlassCard } from './ui/GlassCard'
import { Button } from './ui/Button'
import { LineChart, LayoutGrid, GraduationCap, ArrowRight } from 'lucide-react'

export default function ValueProps() {
  const { t } = useLanguage()

  const valueProps = [
    {
      title: t('value.analysis') || 'Análisis Profundo',
      description: t('value.analysisDesc') || 'Desglosamos el mercado con reportes semanales y señales respaldadas por datos institucionales.',
      icon: <LineChart className="w-7 h-7" />,
    },
    {
      title: t('value.tools') || 'Herramientas Pro',
      description: t('value.toolsDesc') || 'Calculadoras de riesgo, screeners en tiempo real y dashboards diseñados para la máxima eficiencia.',
      icon: <LayoutGrid className="w-7 h-7" />,
    },
    {
      title: t('value.education') || 'Educación Élite',
      description: t('value.educationDesc') || 'Aprende a operar desde cero hasta nivel experto con nuestra currícula exclusiva y comunidad privada.',
      icon: <GraduationCap className="w-7 h-7" />,
    },
  ]

  return (
    <section className="bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Todo lo que necesitas para operar <span className="text-accent italic">hoy.</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Creemos en proporcionar ventajas reales. Sin señales falsas, solo datos, métricas y educación de calidad para el mercado Latinoamericano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <GlassCard key={index} className="p-8 group" gradient={index === 1}>
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                {prop.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{prop.title}</h3>
              <p className="text-text-secondary leading-relaxed">{prop.description}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/about" passHref legacyBehavior>
            <Button variant="ghost" className="gap-2 text-text-secondary hover:text-white">
              {t('value.cta') || 'Conoce más sobre nuestra metodología'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
