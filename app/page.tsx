import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import MarketSnapshot from '@/components/MarketSnapshot'
import ValueProps from '@/components/ValueProps'
import { getMarketSnapshot } from '@/services/marketSnapshot'

export default async function Home() {
  // Server-side initial fetch for SEO and fast first paint
  let initialData: Awaited<ReturnType<typeof getMarketSnapshot>> | null = null
  
  try {
    initialData = await getMarketSnapshot()
  } catch (error) {
    console.error('Failed to fetch market snapshot:', error)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MarketSnapshot 
        initialData={initialData?.data} 
        initialTimestamp={initialData?.timestamp}
      />
      <ValueProps />
      <Footer />
    </main>
  )
}
