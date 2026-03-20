'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { useLanguage } from '@/lib/i18n'

export default function ContactPage() {
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">{t('contact.title')}</h1>
          <p className="mt-4 text-text-secondary max-w-2xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">{t('contact.getTouch')}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold">{t('contact.email')}</h3>
                  <a href="mailto:contacto@dm3trades.com" className="text-accent hover:text-accent/80">
                    contacto@dm3trades.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold">{t('contact.social')}</h3>
                  <div className="space-y-1 text-text-secondary">
                    <a 
                      href="https://instagram.com/dm3trades" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:text-accent"
                    >
                      Instagram: @dm3trades
                    </a>
                    <a 
                      href="https://twitter.com/CesarDemetrio16" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:text-accent"
                    >
                      X/Twitter: @CesarDemetrio16
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold">{t('contact.academy')}</h3>
                  <a 
                    href="https://www.whop.com/dm3trades?utm_source=dm3trades&utm_medium=website" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80"
                  >
                    {language === 'es' ? 'Visita nuestra Academia →' : 'Visit our Academy →'}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary rounded-xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
