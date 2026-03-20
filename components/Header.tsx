'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { href: '/insights', labelKey: 'nav.insights' },
    { href: '/terminal', labelKey: 'nav.terminal' },
    { href: '/tools', labelKey: 'nav.tools' },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  // Handle scroll to add border/blur to header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-primary/70 backdrop-blur-xl border-white/10 shadow-lg"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded shrink-0 overflow-hidden mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity">
              <img src="/logo.jpg" alt="DM3Trades Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
              DM3<span className="text-accent">TRADES</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1"
              >
                {t(link.labelKey)}
              </Link>
            ))}

            <Link
              href="/academy"
              className="bg-accent text-primary px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,208,132,0.3)] hover:shadow-[0_0_25px_rgba(0,208,132,0.5)] hover:scale-105 transition-all"
            >
              {t('nav.academy') || 'Academia VIP'}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-white rounded-full hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Globe className="w-4 h-4" />
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-primary/95 backdrop-blur-xl"
          >
            <nav className="px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-white transition-colors font-medium text-lg px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}

              <Link
                href="/academy"
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent text-primary text-center mt-2 px-5 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(0,208,132,0.3)]"
              >
                {t('nav.academy') || 'Academia VIP'}
              </Link>

              <div className="pt-4 mt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    toggleLanguage()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-2 text-text-secondary hover:text-white font-medium text-lg px-2"
                >
                  <Globe className="w-5 h-5" />
                  {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
