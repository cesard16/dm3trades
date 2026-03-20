'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en'

interface Translations {
  [key: string]: {
    es: string
    en: string
  }
}

const translations: Translations = {
  'nav.insights': { es: 'Insights', en: 'Insights' },
  'nav.terminal': { es: 'Terminal', en: 'Terminal' },
  'nav.tools': { es: 'Herramientas', en: 'Tools' },
  'nav.academy': { es: 'Academia', en: 'Academy' },
  'nav.about': { es: 'Nosotros', en: 'About' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  'hero.title': { es: 'Trading & Market', en: 'Trading & Market' },
  'hero.titleAccent': { es: 'Insights', en: 'Insights' },
  'hero.subtitle': { es: 'Análisis profesional del mercado, herramientas de trading y recursos educativos para ayudarte a tomar mejores decisiones de inversión.', en: 'Professional market analysis, trading tools, and educational resources to help you make smarter investment decisions.' },
  'hero.badge': { es: 'Inteligencia Financiera Avanzada', en: 'Advanced Financial Intelligence' },
  'hero.desc': { es: 'Domina los mercados financieros con herramientas profesionales, análisis de IA y una comunidad de traders de alto nivel.', en: 'Master the financial markets with professional tools, AI analysis, and a high-level community of traders.' },
  'hero.cta1': { es: 'Leer Insights', en: 'Read Insights' },
  'hero.cta2': { es: 'Abrir Terminal', en: 'Open Terminal' },
  'market.title': { es: 'Resumen del Mercado', en: 'Market Snapshot' },
  'market.updated': { es: 'Actualizado hace', en: 'Updated' },
  'market.refresh': { es: 'Actualizar', en: 'Refresh' },
  'market.refreshing': { es: 'Actualizando...', en: 'Refreshing...' },
  'market.error': { es: 'Error al cargar datos', en: 'Error loading data' },
  'market.retry': { es: 'Intentar de nuevo', en: 'Try again' },
  'value.title': { es: '¿Por qué DM3Trades?', en: 'Why DM3Trades?' },
  'value.subtitle': { es: 'Insights de trading de grado profesional y herramientas para navegar los mercados con confianza.', en: 'Professional-grade trading insights and tools to help you navigate the markets with confidence.' },
  'value.cta': { es: 'Conoce más sobre nosotros', en: 'Learn more about us' },
  'value.analysis': { es: 'Análisis de Mercado', en: 'Market Analysis' },
  'value.analysisDesc': { es: 'Insights diarios sobre SPX, NASDAQ, Cripto y Forex.', en: 'Daily insights on SPX, NASDAQ, Crypto, and Forex markets.' },
  'value.tools': { es: 'Herramientas de Trading', en: 'Trading Tools' },
  'value.toolsDesc': { es: 'Calculadora de tamaño de posición, calendario económico y más.', en: 'Position size calculator, economic calendar, and more.' },
  'value.education': { es: 'Contenido Educativo', en: 'Educational Content' },
  'value.educationDesc': { es: 'Aprende estrategias de trading desde básico hasta avanzado.', en: 'Learn trading strategies from beginner to advanced.' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.links': { es: 'Enlaces', en: 'Links' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  'insights.title': { es: 'Insights', en: 'Insights' },
  'insights.subtitle': { es: 'Análisis de mercado, estrategias de trading y contenido educativo.', en: 'Market analysis, trading strategies, and educational content.' },
  'insights.empty': { es: 'Aún no hay artículos. ¡Vuelve pronto!', en: 'No posts yet. Check back soon!' },
  'terminal.title': { es: 'Terminal de Mercado IA', en: 'AI Market Terminal' },
  'terminal.subtitle': { es: 'Terminal de trading de grado profesional con análisis impulsado por IA.', en: 'Professional-grade trading terminal with AI-powered analysis and insights.' },
  'terminal.summary': { es: 'Resumen del Mercado', en: 'Market Summary' },
  'terminal.aiTitle': { es: 'Análisis IA', en: 'AI Analysis' },
  'terminal.aiDesc': { es: 'Nuestro análisis de mercado con IA está siendo entrenado. Mantente atento para insights inteligentes.', en: 'Our AI-powered market analysis is being trained on historical data. Stay tuned for intelligent insights.' },
  'terminal.comingSoon': { es: 'Próximamente', en: 'Coming Soon' },
  'terminal.modules': { es: 'Módulos de Acceso Rápido', en: 'Quick Access Modules' },
  'tools.title': { es: 'Herramientas de Trading', en: 'Trading Tools' },
  'tools.subtitle': { es: 'Herramientas profesionales para analizar mercados y tomar mejores decisiones.', en: 'Professional trading tools to help you analyze markets and make better decisions.' },
  'tools.available': { es: 'Disponible', en: 'Available' },
  'tools.comingSoon': { es: 'Próximamente', en: 'Coming Soon' },
  'tools.open': { es: 'Abrir Herramienta', en: 'Open Tool' },
  'tools.stayTuned': { es: '¡Mantente atento!', en: 'Stay tuned!' },
  'terminal.aiUnlock': { es: 'Desbloquea análisis predictivo en tiempo real, detección de liquidez institucional y estrategias generadas por inteligencia artificial exclusivas para miembros VIP.', en: 'Unlock real-time predictive analysis, institutional liquidity detection, and AI-generated strategies exclusive for VIP members.' },
  'terminal.vipAccess': { es: 'Acceso Anticipado VIP', en: 'VIP Early Access' },
  'terminal.beta': { es: 'Fase Beta - 67% Completado', en: 'Beta Phase - 67% Completed' },
  'tools.moreComing': { es: 'Más herramientas próximamente', en: 'More tools coming soon' },
  'tools.suggest': { es: 'Sugiérenos una herramienta', en: 'Suggest a tool' },
  'tools.positionSize': { es: 'Calculadora de Posición', en: 'Position Size Calculator' },
  'tools.positionSizeDesc': { es: 'Calcula el tamaño óptimo de tu posición y el riesgo exacto por operación.', en: 'Calculate optimal position size and exact risk per trade.' },
  'tools.calendar': { es: 'Calendario Económico', en: 'Economic Calendar' },
  'tools.calendarDesc': { es: 'Mantente informado sobre eventos macroeconómicos.', en: 'Stay informed about macroeconomic events.' },
  'tools.screener': { es: 'Buscador de Mercados', en: 'Market Screener' },
  'tools.screenerDesc': { es: 'Encuentra las mejores oportunidades con filtros avanzados.', en: 'Find the best opportunities with advanced filters.' },
  'academy.vipBadge': { es: 'Acceso VIP Disponible', en: 'VIP Access Available' },
  'academy.headline1': { es: 'Únete a la élite del ', en: 'Join the trading ' },
  'academy.headline2': { es: 'Trading', en: 'Elite' },
  'academy.socialProof': { es: '★★★★★ +50 traders activos ya operan con ventaja', en: '★★★★★ +50 active traders already trading with an edge' },
  'academy.feat1_title': { es: '🤖 IA de Mercado', en: '🤖 Market AI' },
  'academy.feat1_desc': { es: 'Inteligencia avanzada y predicción de tendencias.', en: 'Advanced intelligence and trend prediction.' },
  'academy.feat2_title': { es: '💬 Discord Privado', en: '💬 Private Discord' },
  'academy.feat2_desc': { es: 'Comunidad exclusiva de traders profesionales.', en: 'Exclusive community of professional traders.' },
  'academy.feat3_title': { es: '📡 Señales & Ideas', en: '📡 Signals & Ideas' },
  'academy.feat3_desc': { es: 'Oportunidades reales de mercado en tiempo real.', en: 'Real-time market opportunities.' },
  'academy.feat4_title': { es: '📊 Análisis Técnico', en: '📊 Technical Analysis' },
  'academy.feat4_desc': { es: 'Análisis profundo de la estructura de mercado.', en: 'Deep market structure analysis.' },
  'academy.cardLabel': { es: 'MEMBRESÍA COMPLETA', en: 'FULL MEMBERSHIP' },
  'academy.cardTitle': { es: 'DM3 VIP Pass', en: 'DM3 VIP Pass' },
  'academy.cardPrice': { es: '$25', en: '$25' },
  'academy.cardPeriod': { es: '/mes', en: '/month' },
  'academy.cardSubtext': { es: '≈ menos de $0,85 USD al día · cancela cuando quieras', en: '≈ less than $0.85 USD per day · cancel anytime' },
  'academy.stat1': { es: '50+ Miembros activos', en: '50+ Active members' },
  'academy.stat2': { es: '4.9★ Calificación', en: '4.9★ Rating' },
  'academy.stat3': { es: '7 días Prueba gratis', en: '7-day free trial' },
  'academy.statsMembers': { es: 'Miembros', en: 'Members' },
  'academy.statsRating': { es: 'Rating', en: 'Rating' },
  'academy.statsTrial': { es: 'Prueba', en: 'Trial' },
  'academy.inclTitle': { es: 'Incluye', en: 'Includes' },
  'academy.incl1_title': { es: '🏛️ Universidad DM3', en: '🏛️ DM3 University' },
  'academy.incl1_desc': { es: 'Fundamentos, Análisis técnico, Psicotrading, gestión de riesgo y mas', en: 'Fundamentals, Technical analysis, Psychology, risk management and more' },
  'academy.incl2_title': { es: '⚡ Herramientas con IA', en: '⚡ AI Tools' },
  'academy.incl2_desc': { es: 'Terminal, calculadoras y análisis automatizado', en: 'Terminal, calculators and automated analysis' },
  'academy.incl3_title': { es: '🇺🇸 Enfoque US Stocks', en: '🇺🇸 US Stocks Focus' },
  'academy.incl3_desc': { es: 'S&P500, Nasdaq, Dólar, y mercado de acciones cubierto', en: 'S&P500, Nasdaq, Dollar, and stock market covered' },
  'academy.roadmapTitle': { es: 'ROADMAP 2025', en: '2025 ROADMAP' },
  'academy.roadmap1': { es: 'Comunidad Discord + Señales', en: 'Discord Community + Signals' },
  'academy.roadmap1_status': { es: 'Live', en: 'Live' },
  'academy.roadmap2': { es: 'Universidad DM3 (cursos)', en: 'DM3 University (Courses)' },
  'academy.roadmap2_status': { es: 'En curso', en: 'In Progress' },
  'academy.roadmap3': { es: 'Terminal IA + Multi-idioma', en: 'AI Terminal + Multi-language' },
  'academy.roadmap3_status': { es: 'Q3 2025', en: 'Q3 2025' },
  'academy.cta': { es: 'Unirse a la Academia →', en: 'Join the Academy →' },
  'academy.ctaSubtext': { es: 'Prueba gratuita de 7 días · Sin compromiso', en: '7-day free trial · No commitment' },
  'hero.explore': { es: 'Explorar Insights', en: 'Explore Insights' },
  'about.title': { es: 'Sobre DM3Trades', en: 'About DM3Trades' },
  'about.intro': { es: 'Bienvenido a DM3Trades, tu fuente confiable de insights de trading y análisis del mercado.', en: 'Welcome to DM3Trades, your trusted source for professional trading insights and market analysis.' },
  'about.name': { es: 'Soy César Demetrio, un trader y educator apasionado dedicado a ayudar a otros a navegar los mercados financieros.', en: "I'm César Demetrio, a passionate trader and educator dedicated to helping others navigate the financial markets." },
  'about.offer': { es: 'Lo que Ofrecemos', en: 'What We Offer' },
  'about.offerList': { 
    es: 'Análisis diario del mercado y insights\nContenido educativo desde principiante hasta avanzado\nHerramientas de trading y calculadoras\nTerminal de mercado con IA (próximamente)',
    en: 'Daily market analysis and insights\nEducational content from beginner to advanced\nTrading tools and calculators\nAI-powered market terminal (coming soon)'
  },
  'about.philosophy': { es: 'Nuestra Filosofía', en: 'Our Philosophy' },
  'about.philosophyText': { es: 'Creemos en el trading disciplinado y consciente del riesgo. El éxito en los mercados no viene de estrategias complejas, sino de entender la mecánica del mercado, gestionar el riesgo y mantener disciplina emocional.', en: 'We believe in disciplined, risk-aware trading. Success in the markets doesn\'t come from complex strategies—it comes from understanding market mechanics, managing risk, and maintaining emotional discipline.' },
  'about.join': { es: 'Únete a Nosotros', en: 'Join Us' },
  'about.joinText': { es: 'Ya sea que busques aprender trading, encontrar insights del mercado o acceder a herramientas profesionales, DM3Trades tiene algo para ti.', en: 'Whether you\'re looking to learn trading, find market insights, or access professional tools, DM3Trades has something for you.' },
  'about.connect': { es: 'Conectar', en: 'Connect' },
  'contact.title': { es: 'Contáctanos', en: 'Contact Us' },
  'contact.subtitle': { es: '¿Tienes preguntas? ¿Quieres colaborar? Nos encantaría saber de ti.', en: 'Have questions? Want to collaborate? We\'d love to hear from you.' },
  'contact.getTouch': { es: 'Encuéntranos', en: 'Get in Touch' },
  'contact.email': { es: 'Correo', en: 'Email' },
  'contact.social': { es: 'Redes Sociales', en: 'Social Media' },
  'contact.academy': { es: 'Academia', en: 'Academy' },
  'form.name': { es: 'Nombre', en: 'Name' },
  'form.email': { es: 'Correo', en: 'Email' },
  'form.subject': { es: 'Asunto', en: 'Subject' },
  'form.message': { es: 'Mensaje', en: 'Message' },
  'form.namePlaceholder': { es: 'Tu nombre', en: 'Your name' },
  'form.emailPlaceholder': { es: 'tu@correo.com', en: 'your@email.com' },
  'form.subjectPlaceholder': { es: '¿De qué trata?', en: 'What\'s this about?' },
  'form.messagePlaceholder': { es: 'Cuéntanos qué tienes en mente...', en: 'Tell us what\'s on your mind...' },
  'form.send': { es: 'Enviar Mensaje', en: 'Send Message' },
  'form.sending': { es: 'Enviando...', en: 'Sending...' },
  'form.success': { es: '¡Mensaje enviado! Te responderemos pronto.', en: 'Message sent successfully! We\'ll get back to you soon.' },
  'form.error': { es: 'Error al enviar. Intenta de nuevo.', en: 'Failed to send message. Please try again.' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('dm3trades-lang') as Language
    if (saved) setLanguage(saved)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('dm3trades-lang', lang)
  }

  const t = (key: string): string => {
    if (!mounted) return translations[key]?.es || key
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
