import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Static post data - same as insights page
const postsData: Record<string, {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
}> = {
  'bitcoin-analysis-q1-2026': {
    slug: 'bitcoin-analysis-q1-2026',
    title: 'Bitcoin Analysis Q1 2026',
    date: '2026-01-15',
    excerpt: 'Comprehensive analysis of Bitcoin market trends and predictions for Q1 2026.',
    tags: ['bitcoin', 'analysis', 'trading'],
    content: `## Bitcoin Analysis Q1 2026

Bitcoin has shown remarkable resilience in early 2026. Our analysis indicates several key trends:

### Key Findings

1. **Institutional Adoption**: Major financial institutions continue to allocate to Bitcoin
2. **Network Growth**: Active addresses on the rise
3. **Market Maturity**: Volatility decreasing compared to previous cycles

### Technical Analysis

The charts show strong support at current levels with key resistance at the all-time highs.

### Conclusion

We remain bullish on Bitcoin for Q1 2026.`
  },
  'understanding-market-volatility': {
    slug: 'understanding-market-volatility',
    title: 'Understanding Market Volatility',
    date: '2026-01-10',
    excerpt: 'Learn how to navigate and profit from market volatility in trading.',
    tags: ['trading', 'education', 'volatility'],
    content: `## Understanding Market Volatility

Volatility is a trader's best friend when understood correctly.

### What is Volatility?

Volatility measures how much the price of an asset moves up and down.

### Trading Strategies

1. **Range Trading**: Buy at support, sell at resistance
2. **Breakout Trading**: Enter when price breaks key levels
3. **Volatility Indicators**: Use ATR, Bollinger Bands

### Risk Management

Always use stop-losses and position sizing.`
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = postsData[slug]

  if (!post) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl text-white">Post not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold text-white">{post.title}</h1>
            
            <p className="mt-4 text-text-secondary">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
          </header>

          <div className="prose prose-invert prose-accent max-w-none">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-text-secondary ml-4">{line.replace('- ', '')}</li>
              }
              if (line.match(/^\d+\./)) {
                return <li key={i} className="text-text-secondary ml-4">{line.replace(/^\d+\.\s*/, '')}</li>
              }
              if (line.trim() === '') {
                return <br key={i} />
              }
              return <p key={i} className="text-text-secondary mb-2">{line}</p>
            })}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

// Static params for SSG
export function generateStaticParams() {
  return [
    { slug: 'bitcoin-analysis-q1-2026' },
    { slug: 'understanding-market-volatility' }
  ]
}
