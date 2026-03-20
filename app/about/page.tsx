'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/lib/i18n'

export default function AboutPage() {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white">{t('about.title')}</h1>
            
            <div className="mt-8 space-y-6 text-text-secondary">
              <p>{t('about.intro')}</p>
              
              <p>{t('about.name')}</p>

              <h2 className="text-2xl font-semibold text-white mt-8">{t('about.offer')}</h2>
              
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>{language === 'es' ? 'Análisis diario del mercado y insights' : 'Daily market analysis and insights'}</li>
                <li>{language === 'es' ? 'Contenido educativo desde principiante hasta avanzado' : 'Educational content from beginner to advanced'}</li>
                <li>{language === 'es' ? 'Herramientas de trading y calculadoras' : 'Trading tools and calculators'}</li>
                <li>{language === 'es' ? 'Terminal de mercado con IA (próximamente)' : 'AI-powered market terminal (coming soon)'}</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-8">{t('about.philosophy')}</h2>
              
              <p className="mt-4">
                {t('about.philosophyText')}
              </p>

              <h2 className="text-2xl font-semibold text-white mt-8">{t('about.join')}</h2>
              
              <p className="mt-4">
                {t('about.joinText')}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-2xl font-semibold text-white mb-4">{t('about.connect')}</h2>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/CesarDemetrio16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80"
                >
                  Twitter/X
                </a>
                <a
                  href="https://instagram.com/dm3trades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80"
                >
                  Instagram
                </a>
                <a
                  href="mailto:contacto@dm3trades.com"
                  className="text-accent hover:text-accent/80"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
