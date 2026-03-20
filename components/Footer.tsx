import Link from 'next/link'
import { Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand - Span 4 columns */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-white">
                DM3<span className="text-accent">TRADES</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Tu plataforma de inteligencia financiera y educación para dominar los mercados.
            </p>
          </div>

          {/* Contact & Socials - Span 4 columns */}
          <div className="md:col-span-4">
            <h3 className="text-white font-semibold mb-6">Redes y Contacto</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.whop.com/dm3trades?utm_source=dm3trades&utm_medium=website" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Academia DM3 en Whop"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="w-5 h-5" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.29654 0.0205078C3.70387 0.0205078 1.92397 1.15863 0.565903 2.45194C0.565903 2.45194 0.0206171 2.96927 0.0309055 2.98996L5.71011 8.70125L11.3893 2.98996C10.309 1.50006 8.28221 0.0205078 6.29654 0.0205078Z" fill="currentColor"></path>
                  <path d="M20.3194 0.0205078C17.7267 0.0205078 15.9468 1.16897 14.5888 2.45194C14.5888 2.45194 14.0949 2.95892 14.0641 2.98996L7.04736 10.0463L12.7163 15.7472L25.4019 2.98996C24.3216 1.50006 22.2948 0.0205078 20.3194 0.0205078Z" fill="currentColor"></path>
                  <path d="M34.3738 0.0205078C31.7811 0.0205078 30.0012 1.16897 28.6431 2.45194C28.6431 2.45194 28.1287 2.95893 28.1081 2.98997L14.0645 17.1026L15.546 18.5925C17.8403 20.8998 21.6059 20.8998 23.9105 18.5925L39.4357 2.98997C38.3657 1.50006 36.3594 0.0205078 34.3738 0.0205078Z" fill="currentColor"></path>
                </svg>
                <span className="sr-only">Whop</span>
              </a>
              <a 
                href="mailto:contacto@dm3trades.com" 
                title="Email"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/dm3trades" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/CesarDemetrio16" 
                target="_blank" 
                rel="noopener noreferrer"
                title="X / Twitter"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:bg-accent/20 hover:text-accent hover:border-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links - Span 4 columns */}
          <div className="md:col-span-4">
            <h3 className="text-white font-semibold mb-6">Enlaces Rápidos</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-text-secondary">
              <Link href="/insights" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Insights
              </Link>
              <Link href="/terminal" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Terminal
              </Link>
              <Link href="/tools" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Herramientas
              </Link>
              <Link href="/academy" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Academia VIP
              </Link>
              <Link href="/about" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Nosotros
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">
                Contacto
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          <p>© {currentYear} DM3Trades. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
