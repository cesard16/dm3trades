import Link from 'next/link'
import { format } from 'date-fns'

interface PostCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export default function PostCard({ slug, title, date, excerpt, tags }: PostCardProps) {
  return (
    <article className="bg-secondary rounded-xl p-6 hover:ring-1 hover:ring-accent/50 transition-all">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link href={`/insights/${slug}`}>
        <h3 className="text-xl font-semibold text-white hover:text-accent transition-colors">
          {title}
        </h3>
      </Link>
      
      <p className="text-text-secondary mt-2 text-sm">
        {format(new Date(date), 'MMMM d, yyyy')}
      </p>
      
      <p className="text-text-secondary mt-3 line-clamp-3">
        {excerpt}
      </p>
      
      <Link
        href={`/insights/${slug}`}
        className="inline-flex items-center mt-4 text-accent hover:text-accent/80 text-sm font-medium"
      >
        Read more
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}
