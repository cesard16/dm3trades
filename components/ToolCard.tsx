import Link from 'next/link'

interface ToolCardProps {
  title: string
  description: string
  status: 'available' | 'coming_soon'
  href?: string
}

export default function ToolCard({ title, description, status, href = '#' }: ToolCardProps) {
  return (
    <div className="bg-secondary rounded-xl p-6 hover:ring-1 hover:ring-accent/50 transition-all">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            status === 'available'
              ? 'bg-success/10 text-success'
              : 'bg-yellow-500/10 text-yellow-500'
          }`}
        >
          {status === 'available' ? 'Available' : 'Coming Soon'}
        </span>
      </div>
      
      <p className="text-text-secondary mt-2">{description}</p>
      
      {status === 'available' ? (
        <Link
          href={href}
          className="inline-flex items-center mt-4 text-accent hover:text-accent/80 text-sm font-medium"
        >
          Open Tool
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      ) : (
        <p className="mt-4 text-text-secondary text-sm italic">Stay tuned!</p>
      )}
    </div>
  )
}
