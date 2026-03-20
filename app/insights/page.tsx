'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { useLanguage } from '@/lib/i18n'
import { useEffect, useState } from 'react'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

// Posts predefinidos para static export
const staticPosts: Post[] = [
  {
    slug: 'bitcoin-analysis-q1-2026',
    title: 'Bitcoin Analysis Q1 2026',
    date: '2026-01-15',
    excerpt: 'Comprehensive analysis of Bitcoin market trends and predictions for Q1 2026.',
    tags: ['bitcoin', 'analysis', 'trading']
  },
  {
    slug: 'understanding-market-volatility',
    title: 'Understanding Market Volatility',
    date: '2026-01-10',
    excerpt: 'Learn how to navigate and profit from market volatility in trading.',
    tags: ['trading', 'education', 'volatility']
  }
]

export default function InsightsPage() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<Post[]>(staticPosts)

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">{t('insights.title')}</h1>
          <p className="mt-4 text-text-secondary max-w-2xl">
            {t('insights.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">{t('insights.empty')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  tags={post.tags}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
